"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/lib/products";

/* ── Palette ─────────────────────────────────────────────────── */
const BABY_BLUE = "#CFDFEF";
const DUSTY_PINK = "#F5D9DD";
const CHAMPAGNE = "#D4AF37";

/* ── Category Cards ──────────────────────────────────────────── */
const CATEGORIES = [
  {
    label: "Emzik",
    slug: "emzik",
    image:
      "https://images.unsplash.com/photo-1590080876351-941da357a4e4?w=600&q=80&fit=crop",
    bg: BABY_BLUE,
  },
  {
    label: "Künye",
    slug: "kunye",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&q=80&fit=crop",
    bg: DUSTY_PINK,
  },
  {
    label: "İğne",
    slug: "igne",
    image:
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=600&q=80&fit=crop",
    bg: BABY_BLUE,
  },
  {
    label: "Bileklik",
    slug: "bileklik",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80&fit=crop",
    bg: DUSTY_PINK,
  },
  {
    label: "Kolye",
    slug: "kolye",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80&fit=crop",
    bg: BABY_BLUE,
  },
  {
    label: "Yüzük",
    slug: "yuzuk",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80&fit=crop",
    bg: DUSTY_PINK,
  },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

/* ── Baby products ───────────────────────────────────────────── */
const babyProducts = products.filter(
  (p) =>
    p.tags?.some((t) => t.toLowerCase().includes("bebek")) ||
    p.categorySlug === "bebek-ozel"
);

/* ── Component ───────────────────────────────────────────────── */
export default function BebekOzelClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const catRef = useRef<HTMLDivElement>(null);
  const catInView = useInView(catRef, { once: true, margin: "-80px" });

  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen bg-[#FBF5F6]">
        {/* ─── Hero ─────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative w-full min-h-[70vh] md:min-h-[75vh] overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${BABY_BLUE} 0%, ${DUSTY_PINK} 50%, #FFF8F0 100%)` }}
        >
          {/* Decorative blurred circles */}
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-60 blur-3xl pointer-events-none"
            style={{ background: DUSTY_PINK }}
          />
          <div
            className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full opacity-50 blur-3xl pointer-events-none"
            style={{ background: BABY_BLUE }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center gap-12 pt-32 pb-20 lg:pt-40 lg:pb-28">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease }}
              className="flex-1 text-center lg:text-left"
            >
              <p
                className="text-[11px] tracking-[0.3em] uppercase font-sans mb-5"
                style={{ color: CHAMPAGNE }}
              >
                Petit Luxury Collection
              </p>
              <h1 className="font-serif text-4xl md:text-5xl xl:text-6xl text-onyx leading-[1.15] mb-6">
                Bebeğimin İlk
                <br />
                <span style={{ color: CHAMPAGNE }}>Mücevheri</span>
              </h1>
              <div className="w-16 h-px mx-auto lg:mx-0 mb-6" style={{ background: CHAMPAGNE }} />
              <p className="text-charcoal/70 text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                Minik parmaklara, ilk gülümsemeye ve sonsuz sevgiye özel…
                Her parça 14-22 ayar altın ve hipoalerjenik malzemelerle,
                en yüksek güvenlik standartlarında el işçiliğiyle üretilmiştir.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="#kategoriler"
                  className="inline-flex items-center gap-2 px-7 py-3 text-xs tracking-[0.15em] uppercase font-sans text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ background: CHAMPAGNE }}
                >
                  Koleksiyonu Keşfet
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.1, ease, delay: 0.2 }}
              className="flex-1 max-w-md lg:max-w-lg"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
                <Image
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=85&fit=crop"
                  alt="Bebek altın bileklik"
                  fill
                  priority
                  sizes="(max-width:768px) 90vw, 450px"
                  className="object-cover"
                />
                {/* Soft overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Category Cards ───────────────────────────────── */}
        <section
          id="kategoriler"
          ref={catRef}
          className="max-w-7xl mx-auto px-6 lg:px-16 py-20 lg:py-28"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={catInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            className="text-center mb-14"
          >
            <p
              className="text-[10px] tracking-[0.25em] uppercase font-sans mb-3"
              style={{ color: CHAMPAGNE }}
            >
              Kategoriler
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-onyx">
              Minik Hazineler
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-7">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={catInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              >
                <Link
                  href={`/koleksiyonlar/bebek-ozel?kategori=${cat.slug}`}
                  className="group block rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1"
                  style={{ background: cat.bg }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      sizes="(max-width:640px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                  <div className="px-5 py-4 text-center">
                    <h3 className="font-serif text-lg text-onyx group-hover:text-gold transition-colors duration-300">
                      {cat.label}
                    </h3>
                    <span
                      className="text-[9px] tracking-[0.2em] uppercase font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: CHAMPAGNE }}
                    >
                      Keşfet →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── Product Grid ─────────────────────────────────── */}
        {babyProducts.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-16 pb-24 lg:pb-32">
            <div className="text-center mb-14">
              <p
                className="text-[10px] tracking-[0.25em] uppercase font-sans mb-3"
                style={{ color: CHAMPAGNE }}
              >
                Ürünler
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-onyx">
                Öne Çıkan Parçalar
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
              {babyProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* ─── Promise Banner ───────────────────────────────── */}
        <section
          className="py-16 lg:py-20"
          style={{ background: `linear-gradient(135deg, ${DUSTY_PINK} 0%, ${BABY_BLUE} 100%)` }}
        >
          <div className="max-w-5xl mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={CHAMPAGNE} strokeWidth="1.2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: "Hipoalerjenik",
                desc: "Bebek cildine uygun, nikel içermeyen 14-22 ayar altın",
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={CHAMPAGNE} strokeWidth="1.2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                ),
                title: "El İşçiliği",
                desc: "Her parça ustalıkla, sevgiyle ve özenle üretilmektedir",
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={CHAMPAGNE} strokeWidth="1.2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                ),
                title: "Güvenli Kilit",
                desc: "Bebek güvenliğine uygun, sağlam ve kolay açılır kilit sistemi",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: i * 0.12 }}
                className="flex flex-col items-center gap-3"
              >
                {item.icon}
                <h3 className="font-serif text-lg text-onyx">{item.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed max-w-[260px]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </PageWrapper>
  );
}
