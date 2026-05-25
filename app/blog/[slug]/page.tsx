import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, blogPosts } from "@/lib/blogPosts";
import BlogDetailClient from "@/components/pages/BlogDetailClient";

const BASE_URL = "https://www.onrmucevherat.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const canonicalUrl = `${BASE_URL}/blog/${slug}`;

  return {
    title: `${post.title} — ONR Mücevherat Blog`,
    description: post.excerpt,
    keywords: [
      post.title,
      post.category,
      "mücevher blog",
      "pırlanta rehberi",
      "mücevher trendleri",
      "ONR Mücevherat",
      "lüks mücevher",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${post.title} — ONR Mücevherat Blog`,
      description: post.excerpt,
      url: canonicalUrl,
      type: "article",
      images: [{ url: post.image, width: 1400, height: 900, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — ONR Mücevherat Blog`,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: { "@type": "Organization", name: "ONR Mücevherat" },
    publisher: {
      "@type": "Organization",
      name: "ONR Mücevherat",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo/onr-logo-siyah.png`,
      },
    },
    datePublished: post.date,
    mainEntityOfPage: `${BASE_URL}/blog/${slug}`,
    url: `${BASE_URL}/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogDetailClient post={post} />
    </>
  );
}
