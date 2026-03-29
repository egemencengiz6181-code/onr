"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import { blogPosts } from "@/lib/blogPosts";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const categories = ["Tümü", "Zanaat", "Trendler", "Pırlanta Rehberi", "Tasarım"] as const;

export default function BlogClient() {
  const [active, setActive] = useState<string>("Tümü");

  const filtered =
    active === "Tümü"
      ? blogPosts
      : blogPosts.filter((p) => p.category === active);

  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen bg-[#FAF9F6]">

        {/* ── Header ─────────────────────────── */}
        <section className="pt-36 pb-12 lg:pt-44 lg:pb-16 px-8 lg:px-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4"
          >
            Mücevher Dünyasından
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="font-serif text-charcoal text-4xl lg:text-5xl"
          >
            Blog
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="w-12 h-px bg-gold mx-auto mt-6"
          />
        </section>

        {/* ── Category Filter ─────────────────── */}
        <section className="max-w-screen-xl mx-auto px-8 lg:px-20 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 text-[11px] tracking-[0.18em] uppercase font-sans transition-all duration-300 ${
                  active === cat
                    ? "bg-onyx text-ivory"
                    : "border border-charcoal/20 text-charcoal/60 hover:border-charcoal/50 hover:text-charcoal"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </section>

        {/* ── Grid ───────────────────────────── */}
        <section className="max-w-screen-xl mx-auto px-8 lg:px-20 pb-28 lg:pb-36">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease }}
              className="grid md:grid-cols-3 gap-8"
            >
              {filtered.length === 0 ? (
                <div className="md:col-span-3 text-center py-20 text-charcoal/40 font-sans text-[14px]">
                  Bu kategoride henüz yazı bulunmuyor.
                </div>
              ) : (
                filtered.map((post, i) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * i, ease }}
                    className="group"
                  >
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative aspect-[4/5] overflow-hidden mb-6">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-onyx/70 backdrop-blur-sm text-ivory text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 font-sans">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <p className="text-charcoal/40 text-[11px] tracking-[0.15em] uppercase font-sans mb-3">
                        {post.date}
                      </p>
                      <h2 className="font-serif text-charcoal text-xl lg:text-[22px] leading-snug mb-3 group-hover:text-gold transition-colors duration-300">
                        {post.title}
                      </h2>
                      <p className="text-charcoal/50 font-sans font-light text-[13px] leading-[1.8] mb-5 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <span className="inline-block text-[10px] tracking-[0.2em] uppercase text-charcoal/60 border-b border-charcoal/20 pb-0.5 group-hover:text-gold group-hover:border-gold/40 transition-all duration-300">
                        Devamını Oku
                      </span>
                    </Link>
                  </motion.article>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </section>

      </main>
      <Footer />
    </PageWrapper>
  );
}
