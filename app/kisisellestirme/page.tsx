import type { Metadata } from "next";
import KisisellestirmeClient from "@/components/pages/KisisellestirmeClient";

export const metadata: Metadata = {
  title: "Mücevher Kişiselleştirme — Gravür & Özel Tasarım",
  description:
    "Mücevherinizi kişiselleştirin. Gravür yazıtı, beden uyarlaması, özel taş seçimi ve kaplama hizmetleri için ONR Kişiselleştirme Atölyesi — Ankara.",
  keywords: [
    "mücevher kişiselleştirme",
    "yüzük gravür",
    "kolye gravür",
    "mücevher beden uyarlama",
    "özel taş seçimi",
    "kişiye özel mücevher",
    "ONR kişiselleştirme",
  ],
  alternates: { canonical: "https://www.onrmucevherat.com/kisisellestirme" },
  openGraph: {
    title: "Mücevher Kişiselleştirme | ONR Mücevherat",
    description: "Gravür, beden uyarlama ve özel taş seçimi ile mücevherinizi kişiselleştirin.",
    url: "https://www.onrmucevherat.com/kisisellestirme",
    images: [{ url: "/images/mucevher/mucevher.jpg", width: 1200, height: 630, alt: "Mücevher Kişiselleştirme" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mücevher Kişiselleştirme | ONR Mücevherat",
    description: "Gravür ve özel tasarım ile mücevherinizi kişiselleştirin.",
    images: ["/images/mucevher/mucevher.jpg"],
  },
};

export default function KisisellestirmePage() {
  return <KisisellestirmeClient />;
}
