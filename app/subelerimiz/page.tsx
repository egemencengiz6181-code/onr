import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import SubelerClient from "@/components/pages/SubelerClient";

export const metadata: Metadata = {
  title: "Şubelerimiz — ONR Mücevherat",
  description: "ONR Mücevherat şube lokasyonları. Nişantaşı, İstinyePark, Zorlu Center ve Kanyon mağazalarımızı ziyaret edin.",
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
