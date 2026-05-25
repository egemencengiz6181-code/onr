import type { Metadata } from "next";
import TeslimatVeIadeClient from "@/components/pages/TeslimatVeIadeClient";

export const metadata: Metadata = {
  title: "Teslimat & İade Politikası — Sigortalı Kargo",
  description:
    "ONR Mücevherat teslimat koşulları: sigortalı kargo, 14 gün iade hakkı ve ücretsiz teslimat detayları. Güvenli mücevher alışverişi.",
  keywords: [
    "mücevher teslimat",
    "mücevher iade politikası",
    "sigortalı kargo mücevher",
    "ONR teslimat koşulları",
    "14 gün iade hakkı",
    "güvenli mücevher alışveriş",
  ],
  alternates: { canonical: "https://www.onrmucevherat.com/teslimat-ve-iade" },
  openGraph: {
    title: "Teslimat & İade | ONR Mücevherat",
    description: "Sigortalı kargo ve 14 gün iade hakkı ile güvenli alışveriş.",
    url: "https://www.onrmucevherat.com/teslimat-ve-iade",
  },
};

export default function TeslimatVeIadePage() {
  return <TeslimatVeIadeClient />;
}
