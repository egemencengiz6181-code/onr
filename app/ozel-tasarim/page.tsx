import type { Metadata } from "next";
import BespokeClient from "@/components/bespoke/BespokeClient";

export const metadata: Metadata = {
  title: "Özel Tasarım Mücevher — Bespoke Atölyesi",
  description:
    "Hayalinizdeki mücevheri ONR Bespoke Atölyesi ile birlikte tasarlayın. Metal tercihi, taş seçimi ve kişisel vizyon — benzersiz mücevheriniz için randevu alın.",
  keywords: [
    "özel tasarım mücevher",
    "bespoke mücevher Ankara",
    "kişiye özel yüzük",
    "özel tasarım pırlanta",
    "mücevher atölyesi Ankara",
    "sipariş üzerine mücevher",
    "ONR bespoke",
  ],
  alternates: { canonical: "https://www.onrmucevherat.com/ozel-tasarim" },
  openGraph: {
    title: "Özel Tasarım Mücevher | ONR Mücevherat",
    description: "Hayalinizdeki mücevheri ONR Bespoke Atölyesi ile birlikte tasarlayın.",
    url: "https://www.onrmucevherat.com/ozel-tasarim",
    images: [{ url: "/images/mucevher/mucevher.jpg", width: 1200, height: 630, alt: "ONR Özel Tasarım Mücevher" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Özel Tasarım Mücevher | ONR Mücevherat",
    description: "Hayalinizdeki mücevheri ONR Bespoke Atölyesi ile birlikte tasarlayın.",
    images: ["/images/mucevher/mucevher.jpg"],
  },
};

export default function OzelTasarimPage() {
  return <BespokeClient />;
}
