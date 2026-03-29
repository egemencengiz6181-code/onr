"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import { products } from "@/lib/products";

const newProducts = products.filter((p) => p.isNew && !p.isExclusive);

function EditorialCard({
  product,
  index,
}: {
  product: (typeof newProducts)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`grid lg:grid-cols-2 gap-0 min-h-[90vh] ${
        isEven ? "" : "lg:[direction:rtl]"
      }`}
    >
      {/* Image Panel */}
      <div
        className={`relative overflow-hidden bg-stone-100 min-h-[55vw] lg:min-h-0 ${
          isEven ? "" : "lg:[direction:ltr]"
        }`}
      >
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          className="object-cover transition-transform duration-[1.4s] ease-out hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Season badge */}
        <div className="absolute top-6 left-6 bg-onyx/80 backdrop-blur-sm px-4 py-2">
          <span className="text-gold text-[11px] tracking-[0.2em] uppercase font-light">
            2026 Koleksiyon
          </span>
        </div>
      </div>

      {/* Content Panel */}
      <div
        className={`flex items-center bg-ivory px-10 py-16 lg:px-16 xl:px-24 ${
          isEven ? "" : "lg:[direction:ltr]"
        }`}
      >
        <div className="max-w-md w-full">
          {/* Category */}
          <p className="text-gold text-[11px] tracking-[0.25em] uppercase mb-6">
            {product.category}
          </p>

          {/* Name */}
          <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl text-onyx leading-tight mb-5">
            {product.name}
          </h2>

          {/* Divider */}
          <div className="w-12 h-px bg-gold/60 mb-6" />

          {/* Description */}
          <p className="text-charcoal/70 text-sm lg:text-base leading-relaxed mb-8">
            {product.description.slice(0, 180)}
            {product.description.length > 180 ? "…" : ""}
          </p>

          {/* Key specs */}
          {product.stoneSpecs.slice(0, 3).map((spec) => (
            <div
              key={spec.label}
              className="flex justify-between text-sm text-charcoal/60 border-b border-stone-200 py-2.5 last:border-0"
            >
              <span className="tracking-wide">{spec.label}</span>
              <span className="font-medium text-onyx">{spec.value}</span>
            </div>
          ))}

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-10">
            <div>
              <p className="text-[11px] text-charcoal/50 uppercase tracking-widest mb-1">
                Fiyat
              </p>
              <p className="font-serif text-2xl text-onyx">
                {product.priceFormatted}
              </p>
            </div>
            <Link
              href={`/urun/${encodeURIComponent(product.slug)}`}
              className="inline-flex items-center gap-3 border border-onyx px-7 py-3 text-sm tracking-[0.12em] uppercase text-onyx hover:bg-onyx hover:text-ivory transition-all duration-300"
            >
              İncele
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
      </div>
    </motion.div>
  );
}

export default function YeniTasarimlarClient() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <PageWrapper>
      <Navbar />
      <div className="bg-ivory min-h-screen">
      {/* ── Hero ─────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative h-[70vh] lg:h-[80vh] flex items-end overflow-hidden bg-onyx"
      >
        <Image
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1800&q=85&fit=crop"
          alt="Yeni Tasarımlar hero"
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-onyx/70 via-transparent to-transparent" />

        <div className="relative z-10 px-8 pb-16 lg:px-20 lg:pb-24 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gold text-[11px] tracking-[0.3em] uppercase mb-5"
          >
            Yeni Koleksiyon — 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-ivory text-4xl lg:text-6xl xl:text-7xl leading-tight"
          >
            Bu Sezonun
            <br />
            <em className="not-italic text-gold">Parlayanları</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-ivory/60 text-sm lg:text-base mt-6 max-w-lg leading-relaxed"
          >
            ONR atölyesinin bu sezona özel tasarımları; her biri sınırlı sayıda
            üretilmiş, benzersiz parçalar.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 right-10 flex flex-col items-center gap-2"
        >
          <span className="text-ivory/40 text-[10px] tracking-[0.2em] uppercase rotate-90 origin-center">
            Keşfet
          </span>
          <div className="w-px h-12 bg-ivory/20 animate-pulse" />
        </motion.div>
      </div>

      {/* ── Editorial intro ──────────────────────────────── */}
      <div className="max-w-2xl mx-auto text-center px-8 py-20 lg:py-28">
        <p className="text-charcoal/60 text-sm lg:text-base leading-relaxed tracking-wide">
          Her parça, bir hikaye taşır. Bu sezon ONR; zamansız tasarım dilini
          çağdaş detaylarla harmanlayarak{" "}
          <span className="text-onyx font-medium">{newProducts.length} yeni eser</span>{" "}
          sunuyor.
        </p>
      </div>

      {/* ── Product Editorial Cards ───────────────────────── */}
      <div className="divide-y divide-stone-200">
        {newProducts.map((product, i) => (
          <EditorialCard key={product.id} product={product} index={i} />
        ))}
      </div>

      {/* ── Footer CTA ───────────────────────────────────── */}
      <div className="bg-onyx text-ivory text-center px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-6">
            Tüm Koleksiyon
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl mb-8">
            Daha Fazlasını Keşfet
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/koleksiyonlar"
              className="border border-ivory/30 text-ivory px-10 py-3.5 text-sm tracking-[0.15em] uppercase hover:bg-ivory hover:text-onyx transition-all duration-300"
            >
              Tüm Koleksiyonlar
            </Link>
            <Link
              href="/exclusive"
              className="bg-gold/90 text-onyx px-10 py-3.5 text-sm tracking-[0.15em] uppercase hover:bg-gold transition-all duration-300"
            >
              Exclusive Seçki
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
    <Footer />
    </PageWrapper>
  );
}
