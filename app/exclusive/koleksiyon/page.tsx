import type { Metadata } from "next";
import ExclusiveKoleksiyonClient from "@/components/exclusive/ExclusiveKoleksiyonClient";

export const metadata: Metadata = {
  title: "Exclusive Koleksiyon — ONR Mücevherat",
  description:
    "Dünyada yalnızca birkaç adetten oluşan ONR Exclusive Koleksiyon. Her biri nadir taşlarla hayata geçirilmiş eşsiz mücevherler.",
};

export default function ExclusiveKoleksiyonPage() {
  return <ExclusiveKoleksiyonClient />;
}
