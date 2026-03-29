import type { Metadata } from "next";
import BakimVeOnarimClient from "@/components/pages/BakimVeOnarimClient";

export const metadata: Metadata = {
  title: "Bakım & Onarım — ONR Mücevherat",
  description:
    "Mücevherlerinizin ömrünü uzatmak için profesyonel bakım tavsiyeleri ve onarım hizmetleri.",
};

export default function BakimVeOnarimPage() {
  return <BakimVeOnarimClient />;
}
