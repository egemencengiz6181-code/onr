import type { Metadata } from "next";
import KoleksiyonlarLandingClient from "@/components/product/KoleksiyonlarLandingClient";

export const metadata: Metadata = {
  title: "Tüm Mücevher Koleksiyonları — Pırlanta, Altın & İnci",
  description:
    "ONR Mücevherat koleksiyonlarını keşfedin: Pırlanta yüzükler, altın kolyeler, bileklikler, küpeler, inci ve özel setler. Ankara merkezli lüks mücevher.",
  keywords: [
    "mücevher koleksiyonları",
    "pırlanta koleksiyon",
    "altın mücevher koleksiyon",
    "yüzük koleksiyonu",
    "kolye koleksiyonu",
    "bilezik koleksiyonu",
    "küpe koleksiyonu",
    "inci koleksiyon",
    "mücevher seti",
    "ONR koleksiyonlar",
  ],
  alternates: { canonical: "https://www.onrmucevherat.com/koleksiyonlar" },
  openGraph: {
    title: "Tüm Koleksiyonlar | ONR Mücevherat",
    description: "Pırlanta yüzükler, altın kolyeler, bileklikler, küpeler, inci ve özel setler.",
    url: "https://www.onrmucevherat.com/koleksiyonlar",
    images: [{ url: "/images/mucevher/mucevher.jpg", width: 1200, height: 630, alt: "ONR Mücevherat Koleksiyonları" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tüm Koleksiyonlar | ONR Mücevherat",
    description: "Pırlanta, altın ve inci mücevher koleksiyonları.",
    images: ["/images/mucevher/mucevher.jpg"],
  },
};

export default function KoleksiyonlarPage() {
  return <KoleksiyonlarLandingClient />;
}
