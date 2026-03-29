import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import ProductDetailClient from "@/components/product/ProductDetailClient";

// Static params for SSG
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(decodeURIComponent(slug));
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
  const product = getProductBySlug(decodeURIComponent(slug));
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
