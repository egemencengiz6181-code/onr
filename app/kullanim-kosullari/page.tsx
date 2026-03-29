import type { Metadata } from "next";
import KullanimKosullariClient from "@/components/pages/KullanimKosullariClient";

export const metadata: Metadata = {
  title: "Kullanım Koşulları — ONR Mücevherat",
  description:
    "ONR Mücevherat web sitesi kullanım koşulları ve yasal bilgiler.",
};

export default function KullanimKosullariPage() {
  return <KullanimKosullariClient />;
}
