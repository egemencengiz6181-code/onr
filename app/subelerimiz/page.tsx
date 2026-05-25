import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import SubelerClient from "@/components/pages/SubelerClient";

export const metadata: Metadata = {
  title: "Mağazalarımız & Şubeler — Ankara & İstanbul",
  description:
    "ONR Mücevherat mağaza lokasyonları. Ankara Çankaya showroom ve İstanbul şubelerimizi ziyaret edin. Adres, telefon ve çalışma saatleri.",
  keywords: [
    "ONR Mücevherat mağaza",
    "Ankara mücevher mağazası",
    "mücevher showroom Ankara",
    "ONR şubeler",
    "Çankaya kuyumcu",
    "lüks mücevher mağazası adresi",
  ],
  alternates: { canonical: "https://www.onrmucevherat.com/subelerimiz" },
  openGraph: {
    title: "Mağazalarımız | ONR Mücevherat",
    description: "ONR Mücevherat mağaza lokasyonları, adres ve çalışma saatleri.",
    url: "https://www.onrmucevherat.com/subelerimiz",
    images: [{ url: "/images/mucevher/mucevher.jpg", width: 1200, height: 630, alt: "ONR Mücevherat Mağazaları" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mağazalarımız | ONR Mücevherat",
    description: "ONR Mücevherat mağaza lokasyonları.",
    images: ["/images/mucevher/mucevher.jpg"],
  },
};

export default function SubelerPage() {
  return (
    <PageWrapper>
      <Navbar />
      <SubelerClient />
      <Footer />
    </PageWrapper>
  );
}
