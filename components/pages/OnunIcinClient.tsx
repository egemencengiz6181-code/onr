"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import { products } from "@/lib/products";

const womenCategories = ["Kolyeler", "Küpeler", "Bileklikler"];
const menCategories = ["Halkalar", "Bileklikler"];

const womenProducts = products
  .filter((p) => !p.isExclusive && womenCategories.includes(p.category))
  .slice(0, 3);

const menProducts = products
  .filter((p) => !p.isExclusive && menCategories.includes(p.category))
  .slice(0, 3);

type Side = "women" | "men" | null;

function ProductRow({
  product,
}: {
  product: (typeof womenProducts)[0];
}) {
  return (
    <Link
      href={`/urun/${encodeURIComponent(product.slug)}`}
      className="group flex items-center gap-4 py-4 border-b border-white/10 hover:border-white/30 transition-colors duration-300"
    >
      <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden bg-white/5">
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="56px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white/90 text-sm font-light truncate group-hover:text-white transition-colors">
          {product.name}
        </p>
        <p className="text-white/60 text-xs mt-0.5">{product.category}</p>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-white/90 text-sm font-light">{product.priceFormatted}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-all duration-300 ml-auto mt-1 group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

export default function OnunIcinClient() {
  const [hovered, setHovered] = useState<Side>(null);

  return (
    <PageWrapper>
      <Navbar />
      <div className="bg-onyx min-h-screen">
      {/* ── Page Header ──────────────────────────────────── */}
      <div className="text-center pt-24 pb-12 px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4"
        >
          Hediye Rehberi
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-ivory text-3xl lg:text-5xl"
        >
          Onun İçin Mücevher
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-ivory/70 text-sm mt-4 max-w-md mx-auto leading-relaxed"
        >
          Sevdiklerinize özel, titizlikle seçilmiş mücevher önerileri.
        </motion.p>
      </div>

      {/* ── Split Screen ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col lg:flex-row"
        style={{ minHeight: "80vh" }}
      >
        {/* ── Left: Kadın ─────────────────────────────────── */}
        <motion.div
          className="relative flex-1 overflow-hidden cursor-default"
          animate={{
            flex: hovered === "women" ? 1.35 : hovered === "men" ? 0.65 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setHovered("women")}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=80&fit=crop"
              alt="Kadın für mücevher"
              fill
              className="object-cover transition-transform duration-[1.2s] ease-out"
              style={{ transform: hovered === "women" ? "scale(1.04)" : "scale(1)" }}
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx/95 via-onyx/40 to-onyx/20" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end px-8 py-12 lg:px-12 lg:py-16 min-h-[50vh] lg:min-h-0">
            {/* Label */}
            <div className="mb-8">
              <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2">
                Kadın için
              </p>
              <h2 className="font-serif text-ivory text-3xl lg:text-4xl leading-snug">
                Onun İçin
                <br />
                <span className="text-ivory/90 text-xl lg:text-2xl font-light">
                  Kolyeler, Küpeler & Bileklikler
                </span>
              </h2>
            </div>

            {/* Products list */}
            <AnimatePresence>
              {(hovered === "women" || hovered === null) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}
                  className="mb-8"
                >
                  {womenProducts.map((p) => (
                    <ProductRow key={p.id} product={p} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/koleksiyonlar/kolyeler"
                className="text-[11px] tracking-[0.2em] uppercase text-ivory/60 hover:text-ivory border-b border-ivory/20 hover:border-ivory/60 pb-0.5 transition-all duration-300"
              >
                Kolyeler
              </Link>
              <span className="text-ivory/20">·</span>
              <Link
                href="/koleksiyonlar/kupeler"
                className="text-[11px] tracking-[0.2em] uppercase text-ivory/60 hover:text-ivory border-b border-ivory/20 hover:border-ivory/60 pb-0.5 transition-all duration-300"
              >
                Küpeler
              </Link>
              <span className="text-ivory/20">·</span>
              <Link
                href="/koleksiyonlar/bileklikler"
                className="text-[11px] tracking-[0.2em] uppercase text-ivory/60 hover:text-ivory border-b border-ivory/20 hover:border-ivory/60 pb-0.5 transition-all duration-300"
              >
                Bileklikler
              </Link>
            </div>
          </div>

          {/* Vertical divider line */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-white/10 z-20" />
        </motion.div>

        {/* ── Right: Erkek ────────────────────────────────── */}
        <motion.div
          className="relative flex-1 overflow-hidden cursor-default"
          animate={{
            flex: hovered === "men" ? 1.35 : hovered === "women" ? 0.65 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setHovered("men")}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80&fit=crop&crop=right"
              alt="Erkek için mücevher"
              fill
              className="object-cover transition-transform duration-[1.2s] ease-out"
              style={{ transform: hovered === "men" ? "scale(1.04)" : "scale(1)" }}
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx/95 via-onyx/50 to-onyx/30" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end px-8 py-12 lg:px-12 lg:py-16 min-h-[50vh] lg:min-h-0">
            {/* Label */}
            <div className="mb-8">
              <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2">
                Erkek için
              </p>
              <h2 className="font-serif text-ivory text-3xl lg:text-4xl leading-snug">
                Onun İçin
                <br />
                <span className="text-ivory/90 text-xl lg:text-2xl font-light">
                  Yüzükler & Bileklikler
                </span>
              </h2>
            </div>

            {/* Products list */}
            <AnimatePresence>
              {(hovered === "men" || hovered === null) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}
                  className="mb-8"
                >
                  {menProducts.map((p) => (
                    <ProductRow key={p.id} product={p} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/halkalar"
                className="text-[11px] tracking-[0.2em] uppercase text-ivory/60 hover:text-ivory border-b border-ivory/20 hover:border-ivory/60 pb-0.5 transition-all duration-300"
              >
                Yüzükler
              </Link>
              <span className="text-ivory/20">·</span>
              <Link
                href="/bileklikler"
                className="text-[11px] tracking-[0.2em] uppercase text-ivory/60 hover:text-ivory border-b border-ivory/20 hover:border-ivory/60 pb-0.5 transition-all duration-300"
              >
                Bileklikler
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Hediye Seçici CTA ────────────────────────────── */}
      <div className="text-center px-8 py-20 border-t border-white/5">
        <p className="text-ivory/70 text-sm mb-3">
          Hâlâ kararsız mısınız?
        </p>
        <h3 className="font-serif text-ivory text-xl lg:text-2xl mb-6">
          Hediye Seçici ile doğru parçayı bulun
        </h3>
        <Link
          href="/hediye-secici"
          className="inline-flex items-center gap-3 border border-gold/40 px-10 py-3.5 text-sm tracking-[0.15em] uppercase text-gold hover:bg-gold hover:text-onyx transition-all duration-300"
        >
          Hediye Seçiciye Git
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
    <Footer />
    </PageWrapper>
  );
}
