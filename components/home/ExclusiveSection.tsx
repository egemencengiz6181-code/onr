"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const exclusivePieces = [
  {
    id: 1,
    name: "Nebula — No. 001",
    material: "Platin & Nadir Kashmir Safir",
    karats: "4.2 ct Pırlanta",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=85&fit=crop&crop=center",
    alt: "Nadir Kashmir Safir yüzük",
    limited: "Yalnızca 3 Adet",
  },
  {
    id: 2,
    name: "Lumière — No. 002",
    material: "18 Ayar Altın & Burma Yakut",
    karats: "2.8 ct Pırlanta Zincir",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=85&fit=crop&crop=center",
    alt: "Lüks Burma yakut kolye",
    limited: "Yalnızca 5 Adet",
  },
  {
    id: 3,
    name: "Éternité — No. 003",
    material: "Platin & D-Renk Pırlanta",
    karats: "6.0 ct Oval Kesim",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=85&fit=crop&crop=top",
    alt: "D renk pırlanta tektaş",
    limited: "Yalnızca 2 Adet",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function ExclusiveSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-36 bg-onyx relative overflow-hidden"
      aria-label="Exclusive Koleksiyon"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, transparent,
            transparent 40px,
            rgba(201,168,76,0.5) 40px,
            rgba(201,168,76,0.5) 41px
          ),
          repeating-linear-gradient(
            90deg, transparent,
            transparent 40px,
            rgba(201,168,76,0.5) 40px,
            rgba(201,168,76,0.5) 41px
          )`,
        }}
      />

      <div className="relative z-10 max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24">

        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <p className="section-overline text-gold mb-4">
              Exclusive — Sınırlı Üretim
            </p>
            <h2 className="font-serif font-light text-ivory-50 text-4xl md:text-5xl lg:text-6xl
                           leading-tight tracking-wide max-w-lg">
              Olağanüstünün Sınırlarında
            </h2>
            <div className="mt-6 flex items-center gap-4">
              <span className="block w-12 h-px bg-gold" />
              <p className="text-gold/60 text-[9px] tracking-luxury uppercase font-sans">
                Yalnızca Davetli Müşterilerimize
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-ivory-100/35 font-sans font-light text-sm max-w-xs leading-relaxed md:text-right"
          >
            Bu koleksiyondaki her parça, dünyanın dört bir yanından temin edilen
            nadir taşlarla, titiz bir ustalıkla hayata geçirilmiştir.
          </motion.p>
        </div>

        {/* ── Exclusive Pieces Grid ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {exclusivePieces.map((piece, i) => (
            <motion.div
              key={piece.id}
              variants={cardVariants}
              className="group relative"
            >
              <div
                className={`relative overflow-hidden bg-charcoal/30
                  ${i === 1 ? "md:translate-y-8" : ""}
                `}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={piece.image}
                    alt={piece.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center grayscale group-hover:grayscale-0
                               transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                               scale-100 group-hover:scale-110"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-onyx/30 to-transparent" />

                  {/* Limited badge */}
                  <div className="absolute top-5 left-5 border border-gold/40 px-3 py-1.5 backdrop-blur-sm bg-onyx/30">
                    <span className="text-[8px] text-gold/80 tracking-widest uppercase font-sans">
                      {piece.limited}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <p className="text-[8px] text-gold/60 tracking-luxury uppercase font-sans mb-2">
                    {piece.material}
                  </p>
                  <h3 className="font-serif font-light text-ivory-50 text-xl md:text-2xl mb-1">
                    {piece.name}
                  </h3>
                  <p className="text-[9px] text-ivory-100/35 tracking-widest uppercase font-sans">
                    {piece.karats}
                  </p>

                  {/* Hover CTA */}
                  <div
                    className="mt-5 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0
                                transition-all duration-500"
                  >
                    <Link
                      href="/exclusive"
                      className="inline-flex items-center gap-2 text-[9px] text-gold tracking-luxury-wide
                                 uppercase font-sans border-b border-gold/30 pb-1
                                 hover:border-gold transition-colors duration-300"
                    >
                      Talep Oluştur
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-16 md:mt-20
                     pt-14 border-t border-white/8"
        >
          <Link href="/exclusive" className="btn-luxury-filled">
            Exclusive Galeriye Girin
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <Link
            href="/iletisim"
            className="text-[9px] text-ivory-100/40 hover:text-gold tracking-luxury-wide
                       uppercase font-sans border-b border-transparent hover:border-gold/40
                       transition-all duration-300 pb-px"
          >
            Özel Görüşme Ayarla
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
