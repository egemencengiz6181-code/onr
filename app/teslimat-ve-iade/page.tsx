import type { Metadata } from "next";
import TeslimatVeIadeClient from "@/components/pages/TeslimatVeIadeClient";

export const metadata: Metadata = {
  title: "Teslimat & İade — ONR Mücevherat",
  description:
    "ONR Mücevherat teslimat koşulları, sigortalı kargo ve 14 gün iade politikası.",
};

export default function TeslimatVeIadePage() {
  return <TeslimatVeIadeClient />;
}
