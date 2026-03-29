import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, blogPosts } from "@/lib/blogPosts";
import BlogDetailClient from "@/components/pages/BlogDetailClient";

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
  return {
    title: `${post.title} — ONR Mücevherat Blog`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return <BlogDetailClient post={post} />;
}
