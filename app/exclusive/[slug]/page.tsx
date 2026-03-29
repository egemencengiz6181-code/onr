import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExclusiveProducts, getProductBySlug } from "@/lib/products";
import ExclusiveDetailClient from "@/components/exclusive/ExclusiveDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getExclusiveProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(decodeURIComponent(slug));
  if (!product) return { title: "Exclusive — ONR Mücevherat" };
  return {
    title: `${product.name} — Exclusive | ONR Mücevherat`,
    description: product.shortDescription,
  };
}

export default async function ExclusiveSlugPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(decodeURIComponent(slug));

  if (!product || !product.isExclusive) notFound();

  return <ExclusiveDetailClient product={product} />;
}
