import { createClient } from "./server";
import type { Product } from "@/lib/types";

// ── Supabase row shape ────────────────────────────────────────────
export interface SupabaseProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  category_slug: string;
  sku: string | null;
  price: number;
  original_price: number | null;
  short_description: string | null;
  description: string | null;
  images: { src: string; alt: string }[] | null;
  stone_specs: { label: string; value: string }[] | null;
  certificate_info: { label: string; value: string }[] | null;
  karat_details: { label: string; value: string }[] | null;
  chain_options: { value: string; label: string }[] | null;
  materials: string[] | null;
  tags: string[] | null;
  gender: string[] | null;
  is_exclusive: boolean;
  is_new: boolean;
  is_mothers_day: boolean;
  is_published: boolean;
  stock_count: number;
  limited_pieces: number | null;
  created_at: string;
  updated_at: string;
}

// ── Map Supabase row → Product type ──────────────────────────────
export function mapDbToProduct(row: SupabaseProduct): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    categorySlug: row.category_slug,
    price: Number(row.price),
    priceFormatted: `₺${Number(row.price).toLocaleString("tr-TR")}`,
    shortDescription: row.short_description ?? "",
    description: row.description ?? "",
    images: row.images ?? [],
    stoneSpecs: row.stone_specs ?? [],
    certificateInfo: row.certificate_info ?? [],
    karatDetails: row.karat_details ?? [],
    materials: row.materials ?? [],
    tags: row.tags ?? [],
    gender: row.gender ?? [],
    isExclusive: row.is_exclusive ?? false,
    isNew: row.is_new ?? false,
    isMothersDay: row.is_mothers_day ?? false,
    limitedPieces: row.limited_pieces ?? undefined,
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    originalPriceFormatted: row.original_price
      ? `₺${Number(row.original_price).toLocaleString("tr-TR")}`
      : undefined,
    chainOptions: row.chain_options ?? [],
  };
}

// ── Fetch all published products (optionally by category) ─────────
export async function getProductsFromDB(categorySlug?: string): Promise<Product[]> {
  try {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = supabase
      .from("products")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (categorySlug) {
      query = query.eq("category_slug", categorySlug);
    }

    const { data, error } = await query;
    if (error || !data) return [];
    return (data as SupabaseProduct[]).map(mapDbToProduct);
  } catch {
    return [];
  }
}

// ── Fetch single published product by slug ────────────────────────
export async function getProductBySlugFromDB(slug: string): Promise<Product | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();
    if (error || !data) return null;
    return mapDbToProduct(data as SupabaseProduct);
  } catch {
    return null;
  }
}

// ── Fetch all published exclusive products ────────────────────────
export async function getExclusiveProductsFromDB(): Promise<Product[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_published", true)
      .eq("is_exclusive", true)
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return (data as SupabaseProduct[]).map(mapDbToProduct);
  } catch {
    return [];
  }
}

// ── Fetch published bebek-ozel products filtered by sub-tag ───────
export async function getBebekOzelSubProductsFromDB(subTag: string): Promise<Product[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_published", true)
      .eq("category_slug", "bebek-ozel")
      .contains("tags", [subTag])
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return (data as SupabaseProduct[]).map(mapDbToProduct);
  } catch {
    return [];
  }
}
