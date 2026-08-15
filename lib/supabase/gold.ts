import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  DEFAULT_TIERS,
  computeMilyemPrice,
  type GoldSettings,
  type MilyemTier,
} from "@/lib/goldPricing";

/**
 * Çerez taşımayan service-role istemcisi. Cron gibi oturumsuz bağlamlardan da
 * çağrıldığı için cookies() bağımlılığı olan admin client'ı kullanmıyoruz.
 */
export function createGoldClient(): SupabaseClient {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

interface GoldSettingsRow {
  base_gram_price: number | string;
  current_gram_price: number | string;
  tiers: MilyemTier[] | null;
  auto_update: boolean;
  last_synced_at: string | null;
  last_source: string | null;
}

function mapRow(row: GoldSettingsRow): GoldSettings {
  return {
    baseGramPrice: Number(row.base_gram_price),
    currentGramPrice: Number(row.current_gram_price),
    tiers: (row.tiers?.length ? row.tiers : DEFAULT_TIERS).map((t) => ({
      milyem: Number(t.milyem),
      rate: Number(t.rate),
    })),
    autoUpdate: row.auto_update,
    lastSyncedAt: row.last_synced_at,
    lastSource: row.last_source,
  };
}

export class GoldSettingsMissingError extends Error {
  constructor() {
    super(
      "Altın fiyat ayarları bulunamadı. supabase/gold-pricing-migration.sql dosyasını Supabase SQL Editor'de çalıştırın."
    );
    this.name = "GoldSettingsMissingError";
  }
}

export async function getGoldSettings(client?: SupabaseClient): Promise<GoldSettings> {
  const supabase = client ?? createGoldClient();
  const { data, error } = await supabase
    .from("gold_settings")
    .select("base_gram_price, current_gram_price, tiers, auto_update, last_synced_at, last_source")
    .eq("id", 1)
    .maybeSingle();

  if (error || !data) throw new GoldSettingsMissingError();
  return mapRow(data as GoldSettingsRow);
}

// ── Canlı gram altın fiyatı ───────────────────────────────────────
export interface GramGoldQuote {
  price: number;
  source: string;
}

/**
 * Gram altın (24 ayar) satış fiyatını çeker. Tek kaynağa bağlı kalmamak için
 * sırayla denenir; hepsi düşerse null döner ve çağıran son bilinen fiyatta kalır.
 */
export async function fetchGramGoldPrice(): Promise<GramGoldQuote | null> {
  const sources: { name: string; url: string; pick: (json: unknown) => number | null }[] = [
    {
      name: "truncgil",
      url: "https://finans.truncgil.com/v4/today.json",
      pick: (json) => {
        const d = json as Record<string, { Selling?: number; Buying?: number }>;
        const gram = d?.GRA ?? d?.HAS;
        const value = Number(gram?.Selling ?? gram?.Buying);
        return Number.isFinite(value) && value > 0 ? value : null;
      },
    },
  ];

  for (const source of sources) {
    try {
      const res = await fetch(source.url, {
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) continue;
      const price = source.pick(await res.json());
      if (price) return { price, source: source.name };
    } catch {
      // sıradaki kaynağı dene
    }
  }
  return null;
}

// ── Fiyat yeniden hesaplama ───────────────────────────────────────
export interface RepriceResult {
  updated: number;
  skipped: number;
  settings: GoldSettings;
}

/**
 * price_by_milyem açık tüm ürünlerin fiyatını verilen ayarlarla yeniden yazar.
 * Fiyatı değişmeyen ürüne yazma yapılmaz.
 */
export async function repriceGoldProducts(
  settings: GoldSettings,
  client?: SupabaseClient
): Promise<RepriceResult> {
  const supabase = client ?? createGoldClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, gram, milyem, price")
    .eq("price_by_milyem", true);

  if (error) throw new Error(error.message);

  const rows = (data ?? []) as { id: string; gram: number | null; milyem: number | null; price: number }[];
  let updated = 0;
  let skipped = 0;

  for (const row of rows) {
    const next = computeMilyemPrice(Number(row.gram), Number(row.milyem), settings);
    // Gram/milyem girilmemiş ürünün fiyatını sıfırlamayalım.
    if (next <= 0) { skipped++; continue; }
    if (next === Number(row.price)) { skipped++; continue; }

    const { error: updateError } = await supabase
      .from("products")
      .update({ price: next, updated_at: new Date().toISOString() })
      .eq("id", row.id);

    if (updateError) throw new Error(updateError.message);
    updated++;
  }

  return { updated, skipped, settings };
}

/**
 * Canlı gram altını çekip kaydeder ve altın ürünleri yeniden fiyatlar.
 * Kaynak ulaşılamazsa mevcut fiyatla yeniden hesaplama yapılır.
 */
export async function syncGoldPrice(
  options: { force?: boolean } = {}
): Promise<RepriceResult & { quote: GramGoldQuote | null }> {
  const supabase = createGoldClient();
  const settings = await getGoldSettings(supabase);

  if (!settings.autoUpdate && !options.force) {
    return { updated: 0, skipped: 0, settings, quote: null };
  }

  const quote = await fetchGramGoldPrice();
  const next: GoldSettings = quote
    ? { ...settings, currentGramPrice: quote.price, lastSource: quote.source, lastSyncedAt: new Date().toISOString() }
    : settings;

  if (quote) {
    const { error } = await supabase
      .from("gold_settings")
      .update({
        current_gram_price: quote.price,
        last_source: quote.source,
        last_synced_at: next.lastSyncedAt,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);
    if (error) throw new Error(error.message);
  }

  const result = await repriceGoldProducts(next, supabase);

  if (quote) {
    await supabase.from("gold_price_log").insert({
      gram_price: quote.price,
      source: quote.source,
      products_updated: result.updated,
    });
  }

  return { ...result, quote };
}
