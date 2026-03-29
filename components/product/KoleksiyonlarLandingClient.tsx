"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const COLLECTIONS = [
  {
    slug: "halkalar",
    label: "Halkalar",
    subtitle: "Sonsuzluğun Sembolü",
    image: "/images/web/4 (4).png",
    span: "col-span-1 md:col-span-2 md:row-span-2",
    aspect: "aspect-[3/4] md:aspect-auto md:h-full",
  },
  {
    slug: "kolyeler",
    label: "Kolyeler",
    subtitle: "Boyun Hattınızın Efendisi",
    image: "/images/web/6 (2).png",
    span: "col-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    slug: "bileklikler",
    label: "Bileklikler",
    subtitle: "Her Harekette Parlaklık",
    image: "/images/web/7 (2).png",
    span: "col-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    slug: "kupeler",
    label: "Küpeler",
    subtitle: "Çerçeveleme Sanatı",
    image: "/images/web/5 (3).png",
    span: "col-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    slug: "inci",
    label: "İnci",
    subtitle: "Denizin Armağanı",
    image: "/images/web/1 (3).png",
    span: "col-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    slug: "setler",
    label: "Setler",
    subtitle: "Kusursuz Uyum",
    image: "/images/web/9 (2).png",
    span: "col-span-1 md:col-span-2",
    aspect: "aspect-[3/4] md:aspect-[2.2/1]",
  },
];

export default function KoleksiyonlarLandingClient() {
  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen bg-[#FAF9F6]">
        {/* Hero */}
        <section className="relative w-full h-[50vh] md:h-[55vh] overflow-hidden bg-onyx">
          <Image
            src="/images/web/3 (6).png"
            alt="Koleksiyonlar"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-onyx/30 to-onyx/10" />
          <div className="absolute inset-0 flex flex-col justify-end px-8 pb-12 lg:px-20 lg:pb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gold text-[10px] tracking-[0.35em] uppercase mb-4 font-sans"
            >
              ONR Mücevherat
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease }}
              className="font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-4"
            >
              Koleksiyonlar
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-white/60 font-sans font-light text-sm md:text-[15px] leading-relaxed max-w-lg"
            >
              Her biri bir hikâye taşıyan mücevher koleksiyonlarımızı keşfedin.
            </motion.p>
          </div>
        </section>

        {/* Grid */}
        <section className="px-6 lg:px-10 xl:px-20 py-14 lg:py-20 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {COLLECTIONS.map((col, i) => (
              <motion.div
                key={col.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
                className={col.span}
              >
                <Link
                  href={`/koleksiyonlar/${col.slug}`}
                  className="group block relative overflow-hidden h-full"
                >
                  <div className={`${col.aspect} relative min-h-[320px] h-full`}>
                    <Image
                      src={col.image}
                      alt={col.label}
                      fill
                      sizes="(max-width:768px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-[1200ms]
                                 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-onyx/70 via-onyx/20 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                      <p className="text-gold text-[8px] tracking-[0.3em] uppercase font-sans mb-2">
                        {col.subtitle}
                      </p>
                      <h2 className="font-serif text-white text-2xl lg:text-3xl mb-3">
                        {col.label}
                      </h2>
                      <div
                        className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                                    transition-all duration-500 ease-out"
                      >
                        <span
                          className="bg-onyx/80 backdrop-blur-sm text-white text-[9px] tracking-[0.25em] uppercase
                                     font-sans px-6 py-2.5 inline-block"
                        >
                          Koleksiyonu Keşfet
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </PageWrapper>
  );
}
