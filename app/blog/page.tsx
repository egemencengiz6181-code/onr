import type { Metadata } from "next";
import BlogClient from "@/components/pages/BlogClient";

export const metadata: Metadata = {
  title: "Mücevher Blog — Trendler, Rehberler & Zanaat",
  description:
    "Mücevher dünyasından ilham veren yazılar, pırlanta seçim rehberleri, 2026 trendleri ve zanaatkarlık hikayeleri. ONR Mücevherat uzman blogu.",
  keywords: [
    "mücevher blog",
    "pırlanta rehberi",
    "mücevher trendleri 2026",
    "pırlanta seçimi",
    "lüks mücevher makalesi",
    "mücevher zanaat",
    "ONR blog",
  ],
  alternates: { canonical: "https://www.onrmucevherat.com/blog" },
  openGraph: {
    title: "Mücevher Blog | ONR Mücevherat",
    description: "Pırlanta rehberleri, trendler ve mücevher zanaatı üzerine uzman yazıları.",
    url: "https://www.onrmucevherat.com/blog",
    images: [{ url: "/images/mucevher/mucevher.jpg", width: 1200, height: 630, alt: "ONR Mücevherat Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mücevher Blog | ONR Mücevherat",
    description: "Pırlanta rehberleri, trendler ve mücevher zanaatı.",
    images: ["/images/mucevher/mucevher.jpg"],
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
