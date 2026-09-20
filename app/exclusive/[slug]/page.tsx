import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExclusiveProductsFromDB, getProductBySlugFromDB } from "@/lib/supabase/products";
import ExclusiveDetailClient from "@/components/exclusive/ExclusiveDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getExclusiveProductsFromDB();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const product = await getProductBySlugFromDB(decoded);
  if (!product) return { title: "Exclusive — ONR Mücevherat" };
  return {
    title: `${product.name} — Exclusive | ONR Mücevherat`,
    description: product.shortDescription,
  };
}

export default async function ExclusiveSlugPage({ params }: Props) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  // Yalnızca admin panelindeki gerçek ürünler; statik demo katalogdan çözülmez.
  const product = await getProductBySlugFromDB(decoded);

  if (!product || !product.isExclusive) notFound();

  return <ExclusiveDetailClient product={product} />;
}
