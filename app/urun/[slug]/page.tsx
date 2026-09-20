import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/products";
import { getProductBySlugFromDB } from "@/lib/supabase/products";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import { isPriceHidden } from "@/lib/priceDisplay";

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
    // Sitede gizlenen fiyatı (tükendi ya da henüz fiyatlanmamış ürün) arama
    // sonuçlarında da yayınlamıyoruz; yalnızca stok durumunu bildiriyoruz.
    offers: {
      "@type": "Offer",
      availability: product.isSoldOut
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      ...(isPriceHidden(product)
        ? {}
        : { priceCurrency: "TRY", price: product.price.toString() }),
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
