import type { Metadata } from "next";
import IletisimClient from "@/components/pages/IletisimClient";

export const metadata: Metadata = {
  title: "İletişim — Bize Ulaşın",
  description:
    "ONR Mücevherat ile iletişime geçin. Ankara showroom ziyareti, özel tasarım talebi veya sipariş bilgisi için bize yazın. Tel: +90 (312) 426 46 66",
  keywords: [
    "ONR Mücevherat iletişim",
    "mücevher mağazası Ankara iletişim",
    "Ankara kuyumcu iletişim",
    "özel tasarım mücevher randevu",
    "mücevher showroom Ankara",
    "pırlanta danışmanlık",
  ],
  alternates: { canonical: "https://www.onrmucevherat.com/iletisim" },
  openGraph: {
    title: "İletişim | ONR Mücevherat",
    description:
      "ONR Mücevherat ile iletişime geçin. Ankara showroom ziyareti, özel tasarım veya sipariş için bize yazın.",
    url: "https://www.onrmucevherat.com/iletisim",
    images: [
      {
        url: "/images/mucevher/mucevher.jpg",
        width: 1200,
        height: 630,
        alt: "ONR Mücevherat İletişim",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "İletişim | ONR Mücevherat",
    description: "ONR Mücevherat ile iletişime geçin.",
    images: ["/images/mucevher/mucevher.jpg"],
  },
};

export default function IletisimPage() {
  return <IletisimClient />;
}
