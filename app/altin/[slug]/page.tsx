import { notFound } from "next/navigation";
import CategoryPageClient from "@/components/product/CategoryPageClient";
import { getProductsFromDB } from "@/lib/supabase/products";

export const revalidate = 60;

const VALID_SLUGS = [
  "bileklikler",
  "kolyeler",
  "kupeler",
  "halkalar",
  "setler",
  "bebek-ozel",
] as const;

type ValidSlug = (typeof VALID_SLUGS)[number];

export default async function AltinCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as ValidSlug)) return notFound();

  // Altın products are stored with category_slug prefixed with "altin-"
  // e.g. /altin/bileklikler → queries "altin-bileklikler"
  const altinSlug = slug === "bebek-ozel" ? "bebek-ozel" : `altin-${slug}`;
  const products = await getProductsFromDB(altinSlug);

  return <CategoryPageClient slug={altinSlug} initialProducts={products} />;
}
