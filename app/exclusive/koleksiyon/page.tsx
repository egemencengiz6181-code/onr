import type { Metadata } from "next";
import ExclusiveKoleksiyonClient from "@/components/exclusive/ExclusiveKoleksiyonClient";
import { getExclusiveProductsFromDB } from "@/lib/supabase/products";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Exclusive Koleksiyon — ONR Mücevherat",
  description:
    "Dünyada yalnızca birkaç adetten oluşan ONR Exclusive Koleksiyon. Her biri nadir taşlarla hayata geçirilmiş eşsiz mücevherler.",
};

export default async function ExclusiveKoleksiyonPage() {
  const dbProducts = await getExclusiveProductsFromDB();
  return <ExclusiveKoleksiyonClient initialProducts={dbProducts.length > 0 ? dbProducts : undefined} />;
}
