import type { Metadata } from "next";
import YuzukOlcuRehberiClient from "@/components/pages/YuzukOlcuRehberiClient";

export const metadata: Metadata = {
  title: "Yüzük Ölçü Rehberi — ONR Mücevherat",
  description:
    "Evde yüzük ölçünüzü kolayca öğrenin. Türk yüzük ölçü tablosu ile doğru bedeni seçin.",
};

export default function YuzukOlcuRehberiPage() {
  return <YuzukOlcuRehberiClient />;
}
