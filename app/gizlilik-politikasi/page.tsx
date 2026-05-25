import type { Metadata } from "next";
import GizlilikPolitikasiClient from "@/components/pages/GizlilikPolitikasiClient";

export const metadata: Metadata = {
  title: "Gizlilik Politikası — KVKK & Kişisel Veri",
  description:
    "ONR Mücevherat gizlilik politikası — kişisel verilerin korunması ve KVKK uyumu. 6698 sayılı kanun kapsamında veri işleme bilgilendirmesi.",
  keywords: ["gizlilik politikası", "KVKK", "kişisel veri koruma", "ONR Mücevherat KVKK"],
  alternates: { canonical: "https://www.onrmucevherat.com/gizlilik-politikasi" },
  robots: { index: false, follow: false },
};

export default function GizlilikPolitikasiPage() {
  return <GizlilikPolitikasiClient />;
}
