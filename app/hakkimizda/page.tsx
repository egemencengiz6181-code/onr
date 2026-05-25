import type { Metadata } from "next";
import HakkimizdaClient from "@/components/pages/HakkimizdaClient";

export const metadata: Metadata = {
  title: "Hakkımızda — ONR Mücevherat'ın Hikâyesi",
  description:
    "ONR Mücevherat'ın mirası, nesiller boyu süren zanaatkarlık ve tasarım felsefesi. Ankara merkezli ultra-lüks mücevher markasının hikâyesini keşfedin.",
  keywords: [
    "ONR Mücevherat hakkında",
    "Ankara lüks mücevher markası",
    "mücevher tasarım felsefesi",
    "Türk mücevher zanaatkarlığı",
    "ONR Mücevherat tarihi",
  ],
  alternates: { canonical: "https://www.onrmucevherat.com/hakkimizda" },
  openGraph: {
    title: "Hakkımızda | ONR Mücevherat",
    description: "Ankara merkezli ultra-lüks mücevher markasının hikâyesi ve tasarım felsefesi.",
    url: "https://www.onrmucevherat.com/hakkimizda",
    images: [{ url: "/images/mucevher/mucevher.jpg", width: 1200, height: 630, alt: "ONR Mücevherat Hakkında" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkımızda | ONR Mücevherat",
    description: "Ankara merkezli ultra-lüks mücevher markasının hikâyesi.",
    images: ["/images/mucevher/mucevher.jpg"],
  },
};

export default function HakkimizdaPage() {
  return <HakkimizdaClient />;
}
