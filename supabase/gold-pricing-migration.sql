-- ============================================================
-- ONR Mücevherat — Milyem (altın) fiyatlama
-- Supabase Dashboard → SQL Editor'e yapıştırıp çalıştırın.
-- Tekrar çalıştırmak zararsızdır.
-- ============================================================

-- ── 1. Ürünlere milyem alanları ───────────────────────────────
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS price_by_milyem BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS gram   NUMERIC(10,3),
  ADD COLUMN IF NOT EXISTS milyem NUMERIC(10,2);

COMMENT ON COLUMN public.products.price_by_milyem IS
  'Açıksa fiyat gram × milyem çarpanı ile otomatik hesaplanır (altın ürünler).';

-- Altın fiyatı güncellenirken sadece bu ürünler taranır.
CREATE INDEX IF NOT EXISTS products_price_by_milyem_idx
  ON public.products (price_by_milyem) WHERE price_by_milyem;

-- ── 2. Altın fiyat ayarları (tek satır) ───────────────────────
CREATE TABLE IF NOT EXISTS public.gold_settings (
  id                 INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  -- Çarpan tablosunun yazıldığı andaki gram altın fiyatı
  base_gram_price    NUMERIC(12,2) NOT NULL,
  -- Şu an geçerli gram altın fiyatı
  current_gram_price NUMERIC(12,2) NOT NULL,
  -- [{ "milyem": 130, "rate": 6650 }, ...]
  tiers              JSONB NOT NULL,
  auto_update        BOOLEAN NOT NULL DEFAULT TRUE,
  last_synced_at     TIMESTAMPTZ,
  last_source        TEXT,
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

-- Sadece service_role (admin API) erişir; policy tanımlanmadığı için
-- anon/authenticated istemciler bu tabloyu göremez.
ALTER TABLE public.gold_settings ENABLE ROW LEVEL SECURITY;

INSERT INTO public.gold_settings (id, base_gram_price, current_gram_price, tiers)
VALUES (
  1,
  6737.19,
  6737.19,
  '[{"milyem":130,"rate":6650},
    {"milyem":150,"rate":6850},
    {"milyem":170,"rate":6950},
    {"milyem":200,"rate":7190},
    {"milyem":250,"rate":7400},
    {"milyem":300,"rate":7600},
    {"milyem":350,"rate":8000},
    {"milyem":400,"rate":8200}]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- ── 3. Fiyat geçmişi (opsiyonel, denetim için) ─────────────────
CREATE TABLE IF NOT EXISTS public.gold_price_log (
  id             BIGSERIAL PRIMARY KEY,
  gram_price     NUMERIC(12,2) NOT NULL,
  source         TEXT,
  products_updated INT NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.gold_price_log ENABLE ROW LEVEL SECURITY;
