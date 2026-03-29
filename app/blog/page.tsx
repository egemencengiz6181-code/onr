import type { Metadata } from "next";
import BlogClient from "@/components/pages/BlogClient";

export const metadata: Metadata = {
  title: "Blog — ONR Mücevherat",
  description:
    "Mücevher dünyasından ilham veren yazılar, trendler ve uzman rehberleri.",
};

export default function BlogPage() {
  return <BlogClient />;
}
