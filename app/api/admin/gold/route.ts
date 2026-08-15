import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  createGoldClient,
  fetchGramGoldPrice,
  getGoldSettings,
  GoldSettingsMissingError,
  repriceGoldProducts,
  syncGoldPrice,
} from "@/lib/supabase/gold";
import type { GoldSettings, MilyemTier } from "@/lib/goldPricing";

async function verifyAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (adminEmail && adminEmail !== "*" && user.email !== adminEmail) return null;
  return user;
}

function handleError(error: unknown) {
  if (error instanceof GoldSettingsMissingError) {
    return NextResponse.json({ error: error.message, needsMigration: true }, { status: 503 });
  }
  const message = error instanceof Error ? error.message : "Beklenmeyen hata";
  return NextResponse.json({ error: message }, { status: 500 });
}

/** Ayarlar + panelde göstermek için canlı gram altın kotasyonu. */
export async function GET() {
  const user = await verifyAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const supabase = createGoldClient();
    const settings = await getGoldSettings(supabase);

    const [{ count }, live] = await Promise.all([
      supabase
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("price_by_milyem", true),
      fetchGramGoldPrice(),
    ]);

    return NextResponse.json({ settings, live, milyemProductCount: count ?? 0 });
  } catch (error) {
    return handleError(error);
  }
}

/** Çarpan tablosu / baz kur / manuel gram altın kaydeder ve fiyatları yeniler. */
export async function PATCH(request: Request) {
  const user = await verifyAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const supabase = createGoldClient();
    const current = await getGoldSettings(supabase);

    const tiers: MilyemTier[] = Array.isArray(body.tiers)
      ? body.tiers
          .map((t: MilyemTier) => ({ milyem: Number(t.milyem), rate: Number(t.rate) }))
          .filter((t: MilyemTier) => Number.isFinite(t.milyem) && Number.isFinite(t.rate) && t.milyem > 0 && t.rate > 0)
          .sort((a: MilyemTier, b: MilyemTier) => a.milyem - b.milyem)
      : current.tiers;

    if (tiers.length === 0) {
      return NextResponse.json({ error: "En az bir milyem basamağı gerekli" }, { status: 400 });
    }

    const baseGramPrice = Number(body.baseGramPrice ?? current.baseGramPrice);
    const currentGramPrice = Number(body.currentGramPrice ?? current.currentGramPrice);

    if (!(baseGramPrice > 0) || !(currentGramPrice > 0)) {
      return NextResponse.json({ error: "Gram altın fiyatları sıfırdan büyük olmalı" }, { status: 400 });
    }

    const next: GoldSettings = {
      ...current,
      tiers,
      baseGramPrice,
      currentGramPrice,
      autoUpdate: typeof body.autoUpdate === "boolean" ? body.autoUpdate : current.autoUpdate,
    };

    const { error } = await supabase
      .from("gold_settings")
      .update({
        tiers: next.tiers,
        base_gram_price: next.baseGramPrice,
        current_gram_price: next.currentGramPrice,
        auto_update: next.autoUpdate,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const result = await repriceGoldProducts(next, supabase);
    return NextResponse.json({ settings: next, updated: result.updated, skipped: result.skipped });
  } catch (error) {
    return handleError(error);
  }
}

/** "Şimdi güncelle" — canlı kuru çekip altın ürünleri yeniden fiyatlar. */
export async function POST() {
  const user = await verifyAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // Otomatik güncelleme kapalı olsa da elle tetikleme çalışsın.
    const result = await syncGoldPrice({ force: true });
    if (!result.quote) {
      return NextResponse.json(
        { error: "Gram altın fiyatı çekilemedi. Fiyatı elle girip kaydedebilirsiniz.", settings: result.settings },
        { status: 502 }
      );
    }
    return NextResponse.json({
      settings: result.settings,
      quote: result.quote,
      updated: result.updated,
      skipped: result.skipped,
    });
  } catch (error) {
    return handleError(error);
  }
}
