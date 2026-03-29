import type { Metadata } from "next";
import KisisellestirmeClient from "@/components/pages/KisisellestirmeClient";

export const metadata: Metadata = {
  title: "Kişiselleştirme — ONR Mücevherat",
  description: "Mücevherinizi kişiselleştirin. Gravür, beden uyarlaması ve özel taş seçimi için ONR Kişiselleştirme Atölyesi.",
};

export default function KisisellestirmePage() {
  return <KisisellestirmeClient />;
}
