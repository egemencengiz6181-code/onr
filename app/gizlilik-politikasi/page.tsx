import type { Metadata } from "next";
import GizlilikPolitikasiClient from "@/components/pages/GizlilikPolitikasiClient";

export const metadata: Metadata = {
  title: "Gizlilik Politikası — ONR Mücevherat",
  description:
    "ONR Mücevherat gizlilik politikası — kişisel verilerin korunması ve KVKK uyumu.",
};

export default function GizlilikPolitikasiPage() {
  return <GizlilikPolitikasiClient />;
}
