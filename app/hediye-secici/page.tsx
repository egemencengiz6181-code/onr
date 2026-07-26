import type { Metadata } from "next";
import HediyeSeciciClient from "@/components/pages/HediyeSeciciClient";
import { getAllPublishedProductsFromDB } from "@/lib/supabase/products";

export const metadata: Metadata = {
  title: "Mücevher Hediye Seçici — Kişisel Danışman",
  description:
    "Sevdiklerinize mükemmel mücevheri bulmak için ONR Hediye Danışmanı'nı kullanın. Bütçe, kişilik ve özel güne göre kişiselleştirilmiş mücevher önerileri.",
  keywords: [
    "mücevher hediye seçici",
    "hediye mücevher önerileri",
    "kişiselleştirilmiş mücevher hediye",
    "mücevher danışmanı",
    "özel gün mücevher",
    "doğum günü mücevher hediye",
    "ONR hediye danışmanı",
  ],
  alternates: { canonical: "https://www.onrmucevherat.com/hediye-secici" },
  openGraph: {
    title: "Mücevher Hediye Seçici | ONR Mücevherat",
    description: "Kişiselleştirilmiş mücevher hediye önerileri için danışmanımızı kullanın.",
    url: "https://www.onrmucevherat.com/hediye-secici",
    images: [{ url: "/images/mucevher/mucevher.jpg", width: 1200, height: 630, alt: "Mücevher Hediye Seçici" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mücevher Hediye Seçici | ONR Mücevherat",
    description: "Kişiselleştirilmiş mücevher hediye önerileri.",
    images: ["/images/mucevher/mucevher.jpg"],
  },
};

export const revalidate = 60;

export default async function HediyeSeciciPage() {
  const products = await getAllPublishedProductsFromDB();
  return <HediyeSeciciClient initialProducts={products} />;
}
