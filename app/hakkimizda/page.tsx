import type { Metadata } from "next";
import HakkimizdaClient from "@/components/pages/HakkimizdaClient";

export const metadata: Metadata = {
  title: "Hakkımızda | ONR Mücevherat",
  description:
    "ONR Mücevherat'ın mirası, nesiller boyu süren zanaatkarlık ve tasarım felsefesi.",
};

export default function HakkimizdaPage() {
  return <HakkimizdaClient />;
}
