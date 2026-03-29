import type { Metadata } from "next";
import ExclusivePageClient from "@/components/exclusive/ExclusivePageClient";

export const metadata: Metadata = {
  title: "Exclusive — ONR Mücevherat Private Collection",
  description:
    "Yalnızca seçkinlere özel. Nadir taşlar, sınırlı üretim ve kişisel danışmanlık. Fiyatlar talep üzerine paylaşılır.",
};

export default function ExclusivePage() {
  return <ExclusivePageClient />;
}
