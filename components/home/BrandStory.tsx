"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function BrandStory() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12%" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative py-0 bg-onyx overflow-hidden"
      aria-label="Marka Hikayesi"
    >
      {/* ── Background Image (full-bleed with overlay) ── */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY, scale: 1.12 }}>
          <Image
            src="/images/web/1 (3).png"
            alt="ONR Mücevherat atölyesi"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-25"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-onyx via-onyx/85 to-onyx/40" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24
                      py-24 md:py-36 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

        {/* Left — Quote block */}
        <div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-overline text-gold mb-8"
          >
            Mirasımız
          </motion.p>

          <motion.blockquote
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }}
          >
            {/* Decorative quotation mark */}
            <span className="block font-serif text-gold/30 text-[88px] leading-none -mb-4 md:-mb-6 select-none">
              &ldquo;
            </span>
            <p className="font-serif font-light text-ivory-50 text-3xl md:text-4xl lg:text-5xl
                           leading-[1.2] tracking-wide">
              Her mücevher, bir anın
              <em className="not-italic text-gold"> değişmeyen</em> tanığıdır.
            </p>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-10 origin-left"
          >
            <span className="block w-16 h-px bg-gold" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-3 text-ivory-100/40 text-[10px] tracking-luxury uppercase font-sans"
          >
                        — ONR Mücevherat, Ankara
          </motion.p>
        </div>

        {/* Right — Story text & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.35 }}
          className="space-y-7"
        >
          <p className="text-ivory-100/60 font-sans font-light leading-[1.85] text-sm md:text-base">
                        ONR Mücevherat, Ankara'nın kalbinde, zamanın durduğu o nadir anlarda
            doğan bir miras hikayesidir. Atölyemizde her parça, usta ellerin
            titizliği ve yüzyıllık kuyumculuk geleneğiyle hayat bulur.
          </p>

          <p className="text-ivory-100/45 font-sans font-light leading-[1.85] text-sm">
            Kullandığımız her taş, her gram altın, dünyanın en seçkin
            madenlerinden özenle temin edilir. Sertifikalı pırlantalar,
            nadir renkli taşlar ve yüksek ayar altın; ONR kalitesinin
            değişmez güvencesidir.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/10">
            {[
              { value: "25+", label: "Yıllık Deneyim" },
              { value: "4", label: "Lüks Şube" },
              { value: "3K+", label: "Mutlu Müşteri" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-gold text-3xl md:text-4xl font-light">
                  {stat.value}
                </p>
                <p className="text-ivory-100/40 text-[9px] tracking-widest uppercase font-sans mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link href="/hakkimizda" className="btn-luxury-light">
              Hikayemizi Öğrenin
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
