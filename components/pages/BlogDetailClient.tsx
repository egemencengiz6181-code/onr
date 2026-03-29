"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import type { BlogPost } from "@/lib/blogPosts";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

interface Props {
  post: BlogPost;
}

export default function BlogDetailClient({ post }: Props) {
  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen bg-[#FAF9F6]">

        {/* ── Header ─────────────────────────── */}
        <section className="pt-36 pb-10 lg:pt-44 lg:pb-14 px-8 lg:px-20 max-w-3xl mx-auto lg:max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="text-gold text-[10px] tracking-[0.25em] uppercase font-sans">
              {post.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-charcoal/30" />
            <span className="text-charcoal/40 text-[10px] tracking-[0.15em] uppercase font-sans">
              {post.date}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease }}
            className="font-serif text-charcoal text-3xl lg:text-5xl xl:text-6xl leading-tight"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="w-12 h-px bg-gold mx-auto mt-8"
          />
        </section>

        {/* ── Hero Image ─────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease }}
          className="max-w-5xl mx-auto px-8 lg:px-20 xl:px-0 pb-14 lg:pb-20"
        >
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </motion.section>

        {/* ── Article Body ───────────────────── */}
        <article className="max-w-2xl mx-auto px-8 lg:px-0 pb-24 lg:pb-36">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
            className="font-serif text-charcoal text-xl lg:text-2xl leading-relaxed mb-10"
          >
            {post.excerpt}
          </motion.p>

          <div className="space-y-10">
            {post.content.map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.6, delay: 0.05 * i, ease }}
              >
                {block.heading && (
                  <h2 className="font-serif text-charcoal text-xl lg:text-2xl mb-4">
                    {block.heading}
                  </h2>
                )}
                <p className="text-charcoal/65 font-sans font-light text-[15px] leading-[1.9]">
                  {block.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 pt-10 border-t border-charcoal/8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-charcoal/50 hover:text-gold transition-colors duration-300 font-sans"
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="w-4 h-4"
              >
                <path d="M13 4l-6 6 6 6" />
              </svg>
              Tüm Yazılar
            </Link>
          </motion.div>
        </article>

      </main>
      <Footer />
    </PageWrapper>
  );
}
