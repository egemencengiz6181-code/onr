import type { Metadata } from "next";
import BakimVeOnarimClient from "@/components/pages/BakimVeOnarimClient";

export const metadata: Metadata = {
  title: "Mücevher Bakım & Onarım Hizmetleri — Ankara",
  description:
    "ONR Mücevherat profesyonel bakım ve onarım hizmetleri. Pırlanta temizleme, yüzük boyutlandırma, rodaj yenileme ve mücevher restorasyonu — Ankara.",
  keywords: [
    "mücevher bakım",
    "mücevher onarım Ankara",
    "pırlanta temizleme",
    "yüzük boyutlandırma",
    "altın rodaj",
    "mücevher restorasyon",
    "kuyumcu onarım Ankara",
    "ONR bakım hizmeti",
  ],
  alternates: { canonical: "https://www.onrmucevherat.com/bakim-ve-onarim" },
  openGraph: {
    title: "Mücevher Bakım & Onarım | ONR Mücevherat",
    description: "Profesyonel mücevher bakım ve onarım hizmetleri Ankara.",
    url: "https://www.onrmucevherat.com/bakim-ve-onarim",
    images: [{ url: "/images/mucevher/mucevher.jpg", width: 1200, height: 630, alt: "Mücevher Bakım Onarım" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mücevher Bakım & Onarım | ONR Mücevherat",
    description: "Profesyonel mücevher bakım ve onarım hizmetleri.",
    images: ["/images/mucevher/mucevher.jpg"],
  },
};

export default function BakimVeOnarimPage() {
  return <BakimVeOnarimClient />;
}
