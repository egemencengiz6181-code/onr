-- ============================================================
-- ONR Mücevherat — "Tükendi / Gelince haber ver"
-- Supabase Dashboard → SQL Editor'e yapıştırıp çalıştırın.
-- Tekrar çalıştırmak zararsızdır.
-- ============================================================

-- ── 1. Ürüne "tükendi" bayrağı ────────────────────────────────
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS is_sold_out BOOLEAN NOT NULL DEFAULT FALSE;

COMMENT ON COLUMN public.products.is_sold_out IS
  'Açıkken ürün yayında kalır ama sepete eklenemez; yerine "Gelince Haber Ver" formu çıkar.';

-- ── 2. Haber ver talepleri ────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.stock_notifications (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id   UUID REFERENCES public.products(id) ON DELETE SET NULL,
  -- Ürün silinse de talebin hangi ürüne ait olduğu kaybolmasın.
  product_name TEXT NOT NULL,
  product_slug TEXT,
  email        TEXT NOT NULL,
  phone        TEXT NOT NULL,
  is_notified  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Aynı kişi aynı ürüne iki kez kaydolmasın.
CREATE UNIQUE INDEX IF NOT EXISTS stock_notifications_product_email_idx
  ON public.stock_notifications (product_id, lower(email));

CREATE INDEX IF NOT EXISTS stock_notifications_created_at_idx
  ON public.stock_notifications (created_at DESC);

-- Kayıtlar sadece service_role üzerinden (API route) yazılır/okunur.
ALTER TABLE public.stock_notifications ENABLE ROW LEVEL SECURITY;
