import BebekOzelClient from "@/components/pages/BebekOzelClient";
import { getBebekOzelProductsFromDB } from "@/lib/supabase/products";

export const metadata = {
  title: "Bebek Özel — Petit Luxury | ONR Mücevherat",
  description:
    "Bebeğinizin ilk mücevheri. Emzik, künye, iğne, bileklik, kolye ve yüzük — 14-22 ayar altın, hipoalerjenik el işçiliği.",
};

export const revalidate = 60;

export default async function BebekOzelPage() {
  const products = await getBebekOzelProductsFromDB();
  return <BebekOzelClient initialProducts={products} />;
}
