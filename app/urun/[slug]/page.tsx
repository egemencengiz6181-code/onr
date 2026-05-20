import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { getProductBySlugFromDB } from "@/lib/supabase/products";
import ProductDetailClient from "@/components/product/ProductDetailClient";

// Always render dynamically so Supabase changes reflect immediately
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const product = (await getProductBySlugFromDB(decoded)) ?? getProductBySlug(decoded);
  if (!product) return {};
  return {
    title: `${product.name} — ONR Mücevherat`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  // Try DB first, fall back to static data
  const product = (await getProductBySlugFromDB(decoded)) ?? getProductBySlug(decoded);
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
