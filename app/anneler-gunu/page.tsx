import { Metadata } from "next";
import AnnelerGunuClient from "@/components/pages/AnnelerGunuClient";
import { getMothersDayProductsFromDB } from "@/lib/supabase/products";

export const metadata: Metadata = {
  title: "Anneler Günü Özel Koleksiyonu — Pırlanta & Altın Hediye",
  description:
    "Annenize en anlamlı hediyeyi ONR Mücevherat'ın Anneler Günü özel koleksiyonuyla verin. Pırlanta, inci ve altın mücevherlerden özenle seçilmiş parçalar.",
  keywords: [
    "anneler günü hediye",
    "anneler günü mücevher",
    "annelere pırlanta",
    "annelere altın hediye",
    "anneler günü inci",
    "anneye özel mücevher",
    "ONR anneler günü",
  ],
  alternates: { canonical: "https://www.onrmucevherat.com/anneler-gunu" },
  openGraph: {
    title: "Anneler Günü Koleksiyonu | ONR Mücevherat",
    description: "Annenize en anlamlı hediyeyi pırlanta, inci ve altın mücevherlerle verin.",
    url: "https://www.onrmucevherat.com/anneler-gunu",
    images: [{ url: "/images/mucevher/mucevher.jpg", width: 1200, height: 630, alt: "Anneler Günü Mücevher" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anneler Günü Koleksiyonu | ONR Mücevherat",
    description: "Annenize en anlamlı hediyeyi pırlanta ve altın mücevherlerle verin.",
    images: ["/images/mucevher/mucevher.jpg"],
  },
};

export const revalidate = 60;

export default async function AnnelerGunuPage() {
  const products = await getMothersDayProductsFromDB();
  return <AnnelerGunuClient initialProducts={products} />;
}
