-- ============================================================
-- ONR Mücevherat — Supabase Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ── 1. Profiles Table ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name   TEXT,
  email       TEXT,
  phone       TEXT,
  default_address JSONB,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ── 2. Orders Table ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number          TEXT UNIQUE NOT NULL,
  user_id               UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email            TEXT NOT NULL,
  status                TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed','processing','shipped','delivered','cancelled')),
  items                 JSONB NOT NULL DEFAULT '[]',
  subtotal              NUMERIC(12,2) NOT NULL DEFAULT 0,
  shipping_cost         NUMERIC(12,2) NOT NULL DEFAULT 0,
  total                 NUMERIC(12,2) NOT NULL DEFAULT 0,
  shipping_address      JSONB NOT NULL DEFAULT '{}',
  billing_address_same  BOOLEAN DEFAULT TRUE,
  billing_address       JSONB,
  payment_method        TEXT DEFAULT 'mock',
  notes                 TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. Row Level Security ────────────────────────────────────

-- Profiles: users can only read/write their own profile
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Orders: users can only read their own orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ── 4. Indexes ───────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS orders_order_number_idx ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON public.orders(created_at DESC);

-- ── 5. Updated At Trigger ────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

DROP TRIGGER IF EXISTS set_orders_updated_at ON public.orders;
CREATE TRIGGER set_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
