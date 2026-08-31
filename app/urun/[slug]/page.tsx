import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/products";
import { getProductBySlugFromDB } from "@/lib/supabase/products";
import ProductDetailClient from "@/components/product/ProductDetailClient";

const BASE_URL = "https://www.onrmucevherat.com";

// Always render dynamically so Supabase changes reflect immediately
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const product = (await getProductBySlugFromDB(decoded)) ?? getProductBySlug(decoded);
  if (!product) return {};

  const canonicalUrl = `${BASE_URL}/urun/${slug}`;
  const ogImage = product.images[0]
    ? product.images[0].src.startsWith("http")
      ? product.images[0].src
      : `${BASE_URL}${product.images[0].src}`
    : `${BASE_URL}/images/mucevher/mucevher.jpg`;

  return {
    title: `${product.name} — ONR Mücevherat`,
    description: product.shortDescription,
    keywords: [
      product.name,
      product.category,
      "ONR Mücevherat",
      "lüks mücevher",
      "pırlanta",
      "altın",
      "Ankara mücevher",
      ...(product.materials ?? []),
      ...(product.tags ?? []),
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${product.name} — ONR Mücevherat`,
      description: product.shortDescription,
      url: canonicalUrl,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 900, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — ONR Mücevherat`,
      description: product.shortDescription,
      images: [ogImage],
    },
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

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((img) =>
      img.src.startsWith("http") ? img.src : `${BASE_URL}${img.src}`
    ),
    brand: { "@type": "Brand", name: "ONR Mücevherat" },
    // Tükenen üründe fiyat sitede gösterilmiyor; arama sonuçlarında da
    // yayınlamıyoruz, sadece stok durumunu bildiriyoruz.
    offers: {
      "@type": "Offer",
      ...(product.isSoldOut
        ? { availability: "https://schema.org/OutOfStock" }
        : {
            priceCurrency: "TRY",
            price: product.price.toString(),
            availability: "https://schema.org/InStock",
          }),
      url: `${BASE_URL}/urun/${slug}`,
      seller: { "@type": "Organization", name: "ONR Mücevherat" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
