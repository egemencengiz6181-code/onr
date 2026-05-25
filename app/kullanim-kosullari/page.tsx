import type { Metadata } from "next";
import KullanimKosullariClient from "@/components/pages/KullanimKosullariClient";

export const metadata: Metadata = {
  title: "Kullanım Koşulları — ONR Mücevherat",
  description:
    "ONR Mücevherat web sitesi kullanım koşulları ve yasal bilgiler. Site kullanımında geçerli şartlar ve sorumluluklar.",
  keywords: ["kullanım koşulları", "yasal bilgiler", "ONR Mücevherat şartlar"],
  alternates: { canonical: "https://www.onrmucevherat.com/kullanim-kosullari" },
  robots: { index: false, follow: false },
};

export default function KullanimKosullariPage() {
  return <KullanimKosullariClient />;
}
