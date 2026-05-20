-- ============================================================
-- ONR Mücevherat — Full Database Setup
-- ============================================================

-- ── 0. Helper Function (Zaman Damgası Güncelleyici) ─────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── 1. PROFILES TABLOSU (Eksik Olan Ana Tablo) ────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Yeni kayıt olan kullanıcıyı profiles tablosuna otomatik ekleme
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql security definer;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ── 2. ORDERS TABLOSU (Siparişler Tablosu) ────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  total_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'bekliyor',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- ── 3. PRODUCTS TABLOSU (Ürünler) ─────────────────────────────
CREATE TABLE IF NOT EXISTS public.products (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug              TEXT UNIQUE NOT NULL,
  name              TEXT NOT NULL,
  category          TEXT NOT NULL,
  category_slug     TEXT NOT NULL,
  sku               TEXT UNIQUE,
  price             NUMERIC(12,2) NOT NULL DEFAULT 0,
  original_price    NUMERIC(12,2),
  short_description TEXT,
  description       TEXT,
  images            JSONB  DEFAULT '[]',
  stone_specs       JSONB  DEFAULT '[]',
  certificate_info  JSONB  DEFAULT '[]',
  karat_details     JSONB  DEFAULT '[]',
  chain_options     JSONB  DEFAULT '[]',
  materials         TEXT[] DEFAULT '{}',
  tags              TEXT[] DEFAULT '{}',
  gender            TEXT[] DEFAULT '{}',
  is_exclusive      BOOLEAN DEFAULT FALSE,
  is_new            BOOLEAN DEFAULT FALSE,
  is_mothers_day    BOOLEAN DEFAULT FALSE,
  is_published      BOOLEAN DEFAULT TRUE,
  stock_count       INTEGER DEFAULT 0,
  limited_pieces    INTEGER,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- ── 4. ROW LEVEL SECURITY (Güvenlik Politikaları) ─────────────

-- Profiller için RLS
CREATE POLICY "Kullanıcılar kendi profillerini görebilir" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Adminler tüm profilleri görebilir" ON public.profiles FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Ürünler için RLS
CREATE POLICY "Herkes yayındaki ürünleri görebilir" ON public.products FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Adminler tüm ürünleri okuyabilir" ON public.products FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Adminler ürün ekleyebilir" ON public.products FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Adminler ürün güncelleyebilir" ON public.products FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Adminler ürün silebilir" ON public.products FOR DELETE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Siparişler için RLS
CREATE POLICY "Kullanıcılar kendi siparişlerini görebilir" ON public.orders FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Adminler tüm siparişleri görebilir" ON public.orders FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Adminler sipariş güncelleyebilir" ON public.orders FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── 5. TETİKLEYİCİLER VE İNDEKSLER ────────────────────────────
DROP TRIGGER IF EXISTS set_products_updated_at ON public.products;
CREATE TRIGGER set_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

CREATE INDEX IF NOT EXISTS products_category_slug_idx ON public.products(category_slug);
CREATE INDEX IF NOT EXISTS products_is_published_idx ON public.products(is_published);
CREATE INDEX IF NOT EXISTS products_created_at_idx ON public.products(created_at DESC);

-- ── 6. STORAGE (Ürün Görselleri Deposu) ───────────────────────
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public read product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Admin can upload product images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin can delete product images" ON storage.objects FOR DELETE USING (bucket_id = 'product-images' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));