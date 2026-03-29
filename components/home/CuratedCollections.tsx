"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const collections = [
  {
    id: 1,
    name: "Sonsuzluk Halkaları",
    category: "Halkalar",
    href: "/koleksiyonlar/halkalar",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&fit=crop&crop=center",
    imageAlt: "Pırlanta sonsuzluk halkası koleksiyonu",
    pieces: "24 Parça",
  },
  {
    id: 2,
    name: "İkonik Kolyeler",
    category: "Kolyeler",
    href: "/koleksiyonlar/kolyeler",
    image:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=900&q=85&fit=crop&crop=center",
    imageAlt: "Elmas kolye koleksiyonu",
    pieces: "18 Parça",
  },
  {
    id: 3,
    name: "Zarif Bileklikler",
    category: "Bileklikler",
    href: "/koleksiyonlar/bileklikler",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=85&fit=crop&crop=top",
    imageAlt: "Lüks altın bileklik koleksiyonu",
    pieces: "15 Parça",
  },
  {
    id: 4,
    name: "Küpe Atölyesi",
    category: "Küpeler",
    href: "/koleksiyonlar/kupeler",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=85&fit=crop&crop=center",
    imageAlt: "Elmas küpe koleksiyonu",
    pieces: "31 Parça",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function CuratedCollections() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-36 px-6 md:px-10 lg:px-16 bg-ivory-100"
    >
      <div className="max-w-screen-2xl mx-auto">
        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.p variants={headingVariants} className="section-overline mb-5">
            İkonik Koleksiyonlar
          </motion.p>

          <motion.h2
            variants={headingVariants}
            className="section-heading max-w-xl mx-auto"
          >
            Ustalığın Dört Mevsimi
          </motion.h2>

          <motion.div
            variants={headingVariants}
            className="mt-6 flex justify-center"
          >
            <span className="gold-line" />
          </motion.div>

          <motion.p
            variants={headingVariants}
            className="mt-6 text-charcoal-lighter text-sm font-sans font-light max-w-md mx-auto leading-relaxed"
          >
            Her koleksiyon, bir duygunun mücevherdeki yansımasıdır.
            Sizi en iyi temsil eden parçayı keşfedin.
          </motion.p>
        </motion.div>

        {/* ── Collection Grid ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {collections.map((col) => (
            <motion.div key={col.id} variants={cardVariants}>
              <Link
                href={col.href}
                className="group block relative overflow-hidden"
                aria-label={`${col.name} koleksiyonunu görüntüle`}
              >
                {/* Image container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-ivory-200">
                  <Image
                    src={col.image}
                    alt={col.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center
                               transition-transform duration-[1400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                               group-hover:scale-110"
                  />

                  {/* Dark hover tint */}
                  <div className="absolute inset-0 bg-onyx/0 group-hover:bg-onyx/25
                                  transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />

                  {/* Hover CTA */}
                  <div className="absolute inset-x-0 bottom-0 flex justify-center pb-8
                                  opacity-0 group-hover:opacity-100
                                  translate-y-4 group-hover:translate-y-0
                                  transition-all duration-500 ease-out">
                    <span className="btn-luxury text-[8px] py-2.5 px-7">
                      Keşfet
                    </span>
                  </div>

                  {/* Piece count badge */}
                  <div className="absolute top-4 right-4 bg-onyx/60 backdrop-blur-sm
                                  px-3 py-1.5">
                    <span className="text-[8px] text-ivory-100/70 tracking-widest font-sans uppercase">
                      {col.pieces}
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-5 pb-2">
                  <p className="text-[8px] text-gold tracking-luxury-wide uppercase font-sans font-medium mb-1.5">
                    {col.category}
                  </p>
                  <h3 className="font-serif font-light text-xl text-charcoal
                                  group-hover:text-gold-dark transition-colors duration-300">
                    {col.name}
                  </h3>
                  <div className="mt-3 flex items-center gap-2 text-charcoal-lighter
                                  text-[9px] tracking-widest uppercase font-sans
                                  group-hover:text-gold transition-colors duration-300">
                    <span>Koleksiyonu Gör</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.4"
                         className="translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* ── View All CTA ── */}
        <motion.div
          className="flex justify-center mt-14 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Link href="/koleksiyonlar" className="btn-luxury">
            Tüm Koleksiyonları Görüntüle
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
