import type { Metadata } from "next";
import HediyeSeciciClient from "@/components/pages/HediyeSeciciClient";

export const metadata: Metadata = {
  title: "Hediye Seçici — ONR Mücevherat",
  description: "Sevdiklerinize mükemmel mücevheri bulmak için ONR Hediye Danışmanı'nı kullanın.",
};

export default function HediyeSeciciPage() {
  return <HediyeSeciciClient />;
}
