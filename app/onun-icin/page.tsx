import type { Metadata } from "next";
import OnunIcinClient from "@/components/pages/OnunIcinClient";
import { getAllPublishedProductsFromDB } from "@/lib/supabase/products";

export const metadata: Metadata = {
  title: "Onun İçin Mücevher Hediyesi — Sevgiliye Özel",
  description:
    "Sevdiklerinize özel seçilmiş mücevher önerileri. Kadın ve erkek için zamansız tasarımlar. Doğum günü, yıldönümü ve özel günler için mücevher hediyesi.",
  keywords: [
    "sevgiliye mücevher hediye",
    "kadına mücevher hediye",
    "erkeğe mücevher hediye",
    "doğum günü mücevher",
    "yıldönümü mücevher",
    "özel gün mücevher hediye",
    "ONR hediye önerileri",
  ],
  alternates: { canonical: "https://www.onrmucevherat.com/onun-icin" },
  openGraph: {
    title: "Onun İçin Mücevher | ONR Mücevherat",
    description: "Sevdiklerinize özel seçilmiş mücevher hediye önerileri.",
    url: "https://www.onrmucevherat.com/onun-icin",
    images: [{ url: "/images/mucevher/mucevher.jpg", width: 1200, height: 630, alt: "Mücevher Hediye Önerileri" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Onun İçin Mücevher | ONR Mücevherat",
    description: "Sevdiklerinize özel mücevher hediye önerileri.",
    images: ["/images/mucevher/mucevher.jpg"],
  },
};

export const revalidate = 60;

export default async function OnunIcinPage() {
  const products = await getAllPublishedProductsFromDB();
  return <OnunIcinClient initialProducts={products} />;
}
