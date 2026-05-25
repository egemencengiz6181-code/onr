import type { Metadata } from "next";
import YuzukOlcuRehberiClient from "@/components/pages/YuzukOlcuRehberiClient";

export const metadata: Metadata = {
  title: "Yüzük Ölçü Rehberi — Türk Yüzük Numarası Tablosu",
  description:
    "Evde yüzük ölçünüzü kolayca öğrenin. Türk yüzük ölçü tablosu, parmak çevresi hesaplama ve uluslararası numara dönüşümü ile doğru bedeni seçin.",
  keywords: [
    "yüzük ölçü rehberi",
    "Türk yüzük numarası",
    "parmak ölçüsü",
    "yüzük beden tablosu",
    "yüzük ölçme",
    "nişan yüzüğü beden",
    "pırlanta yüzük ölçü",
  ],
  alternates: { canonical: "https://www.onrmucevherat.com/yuzuk-olcu-rehberi" },
  openGraph: {
    title: "Yüzük Ölçü Rehberi | ONR Mücevherat",
    description: "Türk yüzük numarası tablosu ve evde parmak ölçüsü alma rehberi.",
    url: "https://www.onrmucevherat.com/yuzuk-olcu-rehberi",
    images: [{ url: "/images/mucevher/mucevher.jpg", width: 1200, height: 630, alt: "Yüzük Ölçü Rehberi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yüzük Ölçü Rehberi | ONR Mücevherat",
    description: "Türk yüzük numarası tablosu ve evde parmak ölçüsü alma.",
    images: ["/images/mucevher/mucevher.jpg"],
  },
};

export default function YuzukOlcuRehberiPage() {
  return <YuzukOlcuRehberiClient />;
}
