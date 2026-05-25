import type { Metadata } from "next";
import ExclusivePageClient from "@/components/exclusive/ExclusivePageClient";

export const metadata: Metadata = {
  title: "Exclusive Private Collection — Nadir Mücevherler",
  description:
    "ONR Mücevherat Exclusive koleksiyonu: Yalnızca seçkinlere özel nadir taşlar, sınırlı üretim parçalar ve kişisel danışmanlık. Fiyatlar talep üzerine paylaşılır.",
  keywords: [
    "exclusive mücevher",
    "nadir taş mücevher",
    "sınırlı üretim mücevher",
    "lüks özel koleksiyon",
    "VIP mücevher Ankara",
    "pırlanta özel seri",
    "ONR exclusive",
  ],
  alternates: { canonical: "https://www.onrmucevherat.com/exclusive" },
  openGraph: {
    title: "Exclusive Private Collection | ONR Mücevherat",
    description: "Yalnızca seçkinlere özel nadir taşlar ve sınırlı üretim mücevherler.",
    url: "https://www.onrmucevherat.com/exclusive",
    images: [{ url: "/images/mucevher/mucevher.jpg", width: 1200, height: 630, alt: "ONR Exclusive Collection" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exclusive Collection | ONR Mücevherat",
    description: "Yalnızca seçkinlere özel nadir taşlar ve sınırlı üretim mücevherler.",
    images: ["/images/mucevher/mucevher.jpg"],
  },
};

export default function ExclusivePage() {
  return <ExclusivePageClient />;
}
