import type { Metadata } from "next";
import OnunIcinClient from "@/components/pages/OnunIcinClient";

export const metadata: Metadata = {
  title: "Onun İçin Mücevher | ONR Mücevherat",
  description:
    "Sevdiklerinize özel seçilmiş mücevher önerileri. Kadın ve erkek için zamansız tasarımlar.",
};

export default function OnunIcinPage() {
  return <OnunIcinClient />;
}
