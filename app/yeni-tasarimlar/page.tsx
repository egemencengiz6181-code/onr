import type { Metadata } from "next";
import YeniTasarimlarClient from "@/components/pages/YeniTasarimlarClient";
import { getNewProductsFromDB } from "@/lib/supabase/products";

export const metadata: Metadata = {
  title: "En Yeni Mücevher Tasarımları 2026 — Sınırlı Koleksiyon",
  description:
    "ONR atölyesinden bu sezonun en yeni pırlanta tasarımları. Sınırlı sayıda üretilen özel mücevherler — 2026 yeni koleksiyonu.",
  keywords: [
    "yeni mücevher tasarımları 2026",
    "yeni pırlanta koleksiyonu",
    "sınırlı üretim mücevher",
    "sezon yeni tasarımlar",
    "ONR yeni koleksiyon",
    "lüks yeni mücevher",
  ],
  alternates: { canonical: "https://www.onrmucevherat.com/yeni-tasarimlar" },
  openGraph: {
    title: "En Yeni Tasarımlar 2026 | ONR Mücevherat",
    description: "Bu sezonun en yeni pırlanta tasarımları — sınırlı üretim.",
    url: "https://www.onrmucevherat.com/yeni-tasarimlar",
    images: [{ url: "/images/mucevher/mucevher.jpg", width: 1200, height: 630, alt: "ONR Yeni Mücevher Tasarımları" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "En Yeni Tasarımlar 2026 | ONR Mücevherat",
    description: "Bu sezonun en yeni pırlanta tasarımları — sınırlı üretim.",
    images: ["/images/mucevher/mucevher.jpg"],
  },
};

export const revalidate = 60;

export default async function YeniTasarimlarPage() {
  const products = await getNewProductsFromDB();
  return <YeniTasarimlarClient initialProducts={products} />;
}
