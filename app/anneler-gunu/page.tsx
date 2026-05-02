import { Metadata } from "next";
import AnnelerGunuClient from "@/components/pages/AnnelerGunuClient";

export const metadata: Metadata = {
  title: "Anneler Günü Özel Koleksiyonu — ONR Mücevherat",
  description:
    "Annenize en anlamlı hediyeyi ONR Mücevherat'ın Anneler Günü özel koleksiyonuyla verin. Pırlanta, inci ve altın mücevherlerden özenle seçilmiş parçalar.",
};

export default function AnnelerGunuPage() {
  return <AnnelerGunuClient />;
}
