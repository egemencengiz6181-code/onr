"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import ProductCard from "@/components/product/ProductCard";
import { products as staticProducts } from "@/lib/products";
import type { Product } from "@/lib/types";

const BABY_BLUE = "#CFDFEF";
const DUSTY_PINK = "#F5D9DD";
const CHAMPAGNE = "#D4AF37";
const ease = [0.25, 0.46, 0.45, 0.94] as const;

type ValidSlug = "emzik" | "kunye" | "igne" | "bileklik" | "kolye" | "yuzuk";

const CATEGORY_INFO: Record<ValidSlug, {
  label: string;
  subtitle: string;
  description: string;
  image: string;
  bg: string;
  heroBg: string;
}> = {
  emzik: {
    label: "Emzik",
    subtitle: "İlk Altın Dokunuş",
    description: "Bebeğinizin ilk mücevheri. 14-22 ayar altın, hipoalerjenik ve güvenli kilit sistemiyle tasarlanmış emzik koleksiyonu.",
    image: "https://images.unsplash.com/photo-1590080876351-941da357a4e4?w=900&q=85&fit=crop",
    bg: BABY_BLUE,
    heroBg: `linear-gradient(135deg, ${BABY_BLUE} 0%, #e8f0f8 100%)`,
  },
  kunye: {
    label: "Künye",
    subtitle: "İsminizi Altına Kazıyın",
    description: "Bebeğinizin adını ve doğum tarihini taşıyan özel altın künye koleksiyonu. Özelleştirilebilir gravür seçeneğiyle.",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=85&fit=crop",
    bg: DUSTY_PINK,
    heroBg: `linear-gradient(135deg, ${DUSTY_PINK} 0%, #f8e8ea 100%)`,
  },
  igne: {
    label: "İğne",
    subtitle: "Nazar Boncuğu & Şans",
    description: "Bebeğinizi koruyan altın iğne koleksiyonu. Nazar, at nalı ve yıldız motifleriyle özel tasarımlar.",
    image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=900&q=85&fit=crop",
    bg: BABY_BLUE,
    heroBg: `linear-gradient(135deg, ${BABY_BLUE} 0%, #e8f0f8 100%)`,
  },
  bileklik: {
    label: "Bileklik",
    subtitle: "Minik Bileğe Büyük Sevgi",
    description: "Bebek bileğine özel ölçülerde tasarlanmış altın bileklik koleksiyonu. Güvenli kilit sistemi.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=85&fit=crop",
    bg: DUSTY_PINK,
    heroBg: `linear-gradient(135deg, ${DUSTY_PINK} 0%, #f8e8ea 100%)`,
  },
  kolye: {
    label: "Kolye",
    subtitle: "Boyuna Sonsuz Sevgi",
    description: "Bebek ve çocuklar için özel tasarlanmış altın kolye koleksiyonu. Uzayabilen zincir seçeneğiyle büyüdükçe kullanılabilir.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85&fit=crop",
    bg: BABY_BLUE,
    heroBg: `linear-gradient(135deg, ${BABY_BLUE} 0%, #e8f0f8 100%)`,
  },
  yuzuk: {
    label: "Yüzük",
    subtitle: "Minik Parmaklara Özel",
    description: "Bebek ve çocuk parmaklarına özel ölçülerde üretilen altın yüzük koleksiyonu.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&fit=crop",
    bg: DUSTY_PINK,
    heroBg: `linear-gradient(135deg, ${DUSTY_PINK} 0%, #f8e8ea 100%)`,
  },
};

export default function BebekOzelSubClient({ slug, initialProducts }: { slug: ValidSlug; initialProducts?: Product[] }) {
  const info = CATEGORY_INFO[slug];
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  // DB products take priority; fall back to static data
  const source = initialProducts ?? staticProducts;
  const categoryProducts = source.filter(
    (p) =>
      p.categorySlug === "bebek-ozel" &&
      p.tags?.some((t) => t.toLowerCase().includes(slug))
  );

  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen" style={{ backgroundColor: "#FBF5F6" }}>

        {/* ─── Hero ─────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative w-full min-h-[60vh] md:min-h-[65vh] overflow-hidden"
          style={{ background: info.heroBg }}
        >
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-40 blur-3xl pointer-events-none"
            style={{ background: DUSTY_PINK }}
          />
          <div
            className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full opacity-40 blur-3xl pointer-events-none"
            style={{ background: BABY_BLUE }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center gap-12 pt-36 pb-16 lg:pt-44 lg:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease }}
              className="flex-1 text-center lg:text-left"
            >
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
                <Link href="/koleksiyonlar/bebek-ozel" className="text-[9px] tracking-[0.2em] uppercase font-sans text-charcoal/40 hover:text-charcoal transition-colors">
                  Bebek Özel
                </Link>
                <span className="text-charcoal/20 text-[9px]">/</span>
                <span className="text-[9px] tracking-[0.2em] uppercase font-sans text-charcoal/70">{info.label}</span>
              </nav>

              <p
                className="text-[11px] tracking-[0.3em] uppercase font-sans mb-4"
                style={{ color: CHAMPAGNE }}
              >
                Petit Luxury — {info.subtitle}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl xl:text-6xl text-onyx leading-[1.15] mb-5">
                {info.label}
              </h1>
              <div className="w-16 h-px mx-auto lg:mx-0 mb-5" style={{ background: CHAMPAGNE }} />
              <p className="text-charcoal/65 text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                {info.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  href="/koleksiyonlar/bebek-ozel"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-sans text-charcoal/60 border border-charcoal/20 rounded-full hover:border-charcoal/40 transition-all duration-300"
                >
                  ← Bebek Özel
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.1, ease, delay: 0.2 }}
              className="flex-1 max-w-sm lg:max-w-md"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
                <Image
                  src={info.image}
                  alt={`Bebek ${info.label}`}
                  fill
                  priority
                  sizes="(max-width:768px) 90vw, 420px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Product Grid ─────────────────────────────────── */}
        <section
          ref={gridRef}
          className="max-w-7xl mx-auto px-6 lg:px-16 py-20 lg:py-28"
        >
          {categoryProducts.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease }}
                className="text-center mb-14"
              >
                <p className="text-[10px] tracking-[0.25em] uppercase font-sans mb-3" style={{ color: CHAMPAGNE }}>
                  Koleksiyon
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-onyx">
                  {info.label} Koleksiyonu
                </h2>
              </motion.div>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
                {categoryProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease }}
              className="text-center py-24"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase font-sans mb-4" style={{ color: CHAMPAGNE }}>
                Yakında
              </p>
              <h2 className="font-serif text-3xl text-onyx mb-4">{info.label} Koleksiyonu</h2>
              <p className="text-charcoal/50 text-sm max-w-sm mx-auto leading-relaxed">
                Bu kategori yakında yeni tasarımlarla burada olacak.
              </p>
              <Link
                href="/koleksiyonlar/bebek-ozel"
                className="inline-flex items-center gap-2 mt-8 px-7 py-3 text-xs tracking-[0.15em] uppercase font-sans rounded-full transition-all duration-300 hover:scale-105"
                style={{ background: CHAMPAGNE, color: "#fff" }}
              >
                Tüm Bebek Koleksiyonu
              </Link>
            </motion.div>
          )}
        </section>

        {/* ─── Promise Banner ───────────────────────────────── */}
        <section
          className="py-14 lg:py-18"
          style={{ background: `linear-gradient(135deg, ${DUSTY_PINK} 0%, ${BABY_BLUE} 100%)` }}
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { title: "Hipoalerjenik", desc: "Bebek cildine uygun, nikel içermeyen 14-22 ayar altın" },
              { title: "El İşçiliği", desc: "Her parça ustalıkla ve sevgiyle üretilmektedir" },
              { title: "Güvenli Kilit", desc: "Bebek güvenliğine uygun sağlam kilit sistemi" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: i * 0.12 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1" style={{ background: `${CHAMPAGNE}20` }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: CHAMPAGNE }} />
                </div>
                <h3 className="font-serif text-lg text-onyx">{item.title}</h3>
                <p className="text-charcoal/55 text-sm leading-relaxed max-w-[220px]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </PageWrapper>
  );
}
