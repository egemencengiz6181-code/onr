// ─── Altın (milyem) fiyatlama mantığı ─────────────────────────────
// Fiyat = gram × (milyemin denk geldiği TL çarpanı) × (güncel gram altın / baz gram altın)
//
// Çarpan tablosu bir gün belirli bir gram altın fiyatında yazılır (baz).
// Gram altın sonradan değiştikçe tüm çarpanlar aynı oranda revize edilir,
// böylece tabloyu elle güncellemeye gerek kalmaz.

export interface MilyemTier {
  /** Bu satırın üst sınırı — milyem bu değere kadar (dahil) bu çarpanı kullanır */
  milyem: number;
  /** Gram başına TL çarpanı */
  rate: number;
}

export interface GoldSettings {
  /** Çarpan tablosunun yazıldığı andaki gram altın fiyatı */
  baseGramPrice: number;
  /** Şu an geçerli gram altın fiyatı */
  currentGramPrice: number;
  tiers: MilyemTier[];
  autoUpdate: boolean;
  lastSyncedAt: string | null;
  lastSource: string | null;
}

export const DEFAULT_TIERS: MilyemTier[] = [
  { milyem: 130, rate: 6650 },
  { milyem: 150, rate: 6850 },
  { milyem: 170, rate: 6950 },
  { milyem: 200, rate: 7190 },
  { milyem: 250, rate: 7400 },
  { milyem: 300, rate: 7600 },
  { milyem: 350, rate: 8000 },
  { milyem: 400, rate: 8200 },
];

/**
 * Milyem değerini bir üst basamağa yuvarlayıp o basamağın çarpanını verir.
 * 130 → 6650, 140 → 6850 (150 basamağı), 400 üstü → en yüksek basamak.
 */
export function resolveTierRate(milyem: number, tiers: MilyemTier[] = DEFAULT_TIERS): number {
  const sorted = [...tiers].filter((t) => Number.isFinite(t.milyem) && Number.isFinite(t.rate))
    .sort((a, b) => a.milyem - b.milyem);
  if (sorted.length === 0) return 0;
  const match = sorted.find((t) => milyem <= t.milyem);
  // Tablonun üstüne taşan milyem değerleri en yüksek basamaktan fiyatlanır.
  return (match ?? sorted[sorted.length - 1]).rate;
}

/** Gram altındaki değişimin çarpanlara uygulanacak oranı. */
export function goldRatio(settings: Pick<GoldSettings, "baseGramPrice" | "currentGramPrice">): number {
  const { baseGramPrice, currentGramPrice } = settings;
  if (!baseGramPrice || !currentGramPrice || baseGramPrice <= 0) return 1;
  return currentGramPrice / baseGramPrice;
}

/**
 * Bir altın ürünün güncel satış fiyatı. Geçersiz gram/milyem'de 0 döner —
 * çağıran taraf bunu "henüz fiyatlanmadı" olarak ele alır.
 */
export function computeMilyemPrice(
  gram: number,
  milyem: number,
  settings: GoldSettings
): number {
  if (!Number.isFinite(gram) || !Number.isFinite(milyem) || gram <= 0 || milyem <= 0) return 0;
  const rate = resolveTierRate(milyem, settings.tiers);
  return Math.round(gram * rate * goldRatio(settings));
}

/** Çarpanın gram altın değişimiyle güncellenmiş hâli — panelde göstermek için. */
export function effectiveRate(milyem: number, settings: GoldSettings): number {
  return Math.round(resolveTierRate(milyem, settings.tiers) * goldRatio(settings) * 100) / 100;
}

export function formatTRY(value: number): string {
  return `₺${value.toLocaleString("tr-TR", { maximumFractionDigits: 2 })}`;
}
