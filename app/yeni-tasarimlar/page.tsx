import type { Metadata } from "next";
import YeniTasarimlarClient from "@/components/pages/YeniTasarimlarClient";

export const metadata: Metadata = {
  title: "En Yeni Tasarımlar | ONR Mücevherat",
  description:
    "ONR atölyesinden bu sezonun en yeni pırlanta tasarımları. Sınırlı sayıda üretilen, özel mücevherler.",
};

export default function YeniTasarimlarPage() {
  return <YeniTasarimlarClient />;
}
