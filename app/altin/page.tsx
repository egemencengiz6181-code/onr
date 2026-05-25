import type { Metadata } from "next";
import AltinLandingClient from "@/components/product/AltinLandingClient";

export const metadata: Metadata = {
  title: "Altın Mücevher Koleksiyonu — 18K & 14K Altın",
  description:
    "ONR Mücevherat altın koleksiyonlarını keşfedin: 18K ve 14K altın yüzükler, kolyeler, bileklikler, küpeler, özel setler ve bebek mücevherleri.",
  keywords: [
    "altın mücevher",
    "18K altın koleksiyon",
    "14K altın koleksiyon",
    "altın yüzük",
    "altın kolye",
    "altın bilezik",
    "altın küpe",
    "bebek altın",
    "altın set",
    "ONR altın koleksiyonu",
  ],
  alternates: { canonical: "https://www.onrmucevherat.com/altin" },
  openGraph: {
    title: "Altın Mücevher Koleksiyonu | ONR Mücevherat",
    description: "18K ve 14K altın yüzükler, kolyeler, bileklikler ve küpeler.",
    url: "https://www.onrmucevherat.com/altin",
    images: [{ url: "/images/mucevher/mucevher.jpg", width: 1200, height: 630, alt: "Altın Mücevher Koleksiyonu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Altın Mücevher Koleksiyonu | ONR Mücevherat",
    description: "18K ve 14K altın mücevher koleksiyonları.",
    images: ["/images/mucevher/mucevher.jpg"],
  },
};

export default function AltinPage() {
  return <AltinLandingClient />;
}
