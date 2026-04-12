"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const values = [
  {
    num: "01",
    title: "Zanaatkârlık",
    text: "Her parça, usta ellerde yüzlerce saatlik titiz çalışmanın ürünüdür. Geleneksel kuyumculuk tekniklerini çağdaş vizyonla buluşturuyoruz.",
  },
  {
    num: "02",
    title: "Etik Tedarik",
    text: "Kullandığımız her taş, etik madencilik ilkelerine uygun olarak temin edilir. Kimberley Süreci sertifikalı pırlantalar ve menşe belgeli değerli taşlar kullanıyoruz.",
  },
  {
    num: "03",
    title: "Zamansız Tasarım",
    text: "Trendleri takip etmek yerine, nesiller boyu aktarılacak zamansız parçalar yaratıyoruz. Her tasarım, geçmişin mirasını geleceğin estetiğiyle buluşturur.",
  },
  {
    num: "04",
    title: "Kişisel Deneyim",
    text: "Müşterilerimizle birebir ilişki kurar, her parçayı onların hikayesine uygun şekilde sunarız. ONR'da her mücevher, kişisel bir anlam taşır.",
  },
];



export default function HakkimizdaClient() {
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-10%" });
  const valuesRef = useRef<HTMLElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-10%" });
  const legacyRef = useRef<HTMLElement>(null);
  const legacyInView = useInView(legacyRef, { once: true, margin: "-10%" });

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(heroScroll, [0, 1], ["0%", "18%"]);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: storyImgScroll } = useScroll({ target: imageContainerRef, offset: ["start end", "end start"] });
  const storyImgY = useTransform(storyImgScroll, [0, 1], ["-8%", "8%"]);

  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen bg-[#FAF9F6]">

        {/* ── Hero ───────────────────────────────────────── */}
        <section ref={heroRef} className="relative h-[70vh] lg:h-[80vh] flex items-end overflow-hidden bg-onyx">
          <motion.div className="absolute inset-0" style={{ y: heroImgY, scale: 1.12 }}>
            <Image
              src="/images/web/5 (3).png"
              alt="ONR atölye"
              fill
              priority
              className="object-cover opacity-50"
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/60 via-transparent to-transparent" />
          <div className="relative z-10 px-8 pb-16 lg:px-20 lg:pb-24 max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gold text-[11px] tracking-[0.3em] uppercase mb-5"
            >
              Kuruluş — 1987
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease }}
              className="font-serif text-ivory text-4xl lg:text-6xl xl:text-7xl leading-tight"
            >
              ONR Mücevherat&apos;ın
              <br />
              <em className="not-italic text-gold">Mirası</em>
            </motion.h1>
          </div>
        </section>

        {/* ── Story ──────────────────────────────────────── */}
        <section ref={storyRef} className="max-w-screen-xl mx-auto px-8 lg:px-20 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease }}
            >
              <p className="text-gold text-[11px] tracking-[0.25em] uppercase mb-6">
                Hikayemiz
              </p>
              <h2 className="font-serif text-charcoal text-3xl lg:text-4xl leading-snug mb-8">
                Zanaatkârlığın Şiiri,
                <br />
                Zamanın Ötesinde
              </h2>
              <div className="space-y-5 text-charcoal/60 font-sans font-light text-[15px] leading-[1.9]">
                <p>
                  ONR Mücevherat, 1987 yılında Ankara&apos;da küçük bir atölyede doğdu.
                  Kurucu ustamız, her taşın bir ruhu olduğuna inandı ve bu inançla
                  yola çıktı. O günden bu yana, her parça aynı özenle, aynı tutkuyla
                  şekillendirilmektedir.
                </p>
                <p>
                  Atölyemizde çalışan her usta, yılların birikimini parmaklarının
                  ucuna taşır. Geleneksel Türk kuyumculuk sanatını çağdaş tasarım
                  anlayışıyla harmanlayarak; dünyada eşi benzeri olmayan parçalar
                  yaratıyoruz.
                </p>
                <p>
                  Kullandığımız her pırlanta GIA veya IGI sertifikalıdır. Değerli
                  taşlarımız Kolombiya, Myanmar ve Sri Lanka&apos;nın en seçkin
                  madenlerinden, menşe belgeleriyle temin edilir. Etik tedarik,
                  yalnızca bir ilke değil; markamızın temel taşıdır.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={storyInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.1, delay: 0.2, ease }}
              ref={imageContainerRef}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <motion.div className="absolute inset-0" style={{ y: storyImgY, scale: 1.1 }}>
                <Image
                  src="/images/web/3 (6).png"
                  alt="ONR atölye işçiliği"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-onyx/40 to-transparent h-32" />
              <div className="absolute bottom-6 left-6">
                <p className="text-ivory text-[9px] tracking-[0.3em] uppercase font-sans">
                  Ankara Atölyesi — Kuruluştan Bu Yana
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Values ─────────────────────────────────────── */}
        <section ref={valuesRef} className="bg-onyx py-24 lg:py-32">
          <div className="max-w-screen-xl mx-auto px-8 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
              className="text-center mb-16 lg:mb-20"
            >
              <p className="text-gold text-[11px] tracking-[0.25em] uppercase mb-4">
                Değerlerimiz
              </p>
              <h2 className="font-serif text-ivory text-3xl lg:text-4xl">
                Her Parçanın Ardındaki Felsefe
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <motion.div
                  key={v.num}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 * i, ease }}
                  className="border border-white/8 p-8 hover:border-gold/20 transition-colors duration-500"
                >
                  <span className="text-gold/40 font-serif text-sm">{v.num}</span>
                  <h3 className="font-serif text-ivory text-xl mt-3 mb-4">{v.title}</h3>
                  <p className="text-zinc-200 font-sans font-light text-[13px] leading-[1.8]">
                    {v.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────── */}
        <section className="bg-onyx text-center px-8 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-6">
              Bizi Tanıyın
            </p>
            <h2 className="font-serif text-ivory text-3xl lg:text-4xl mb-8">
              Atölyemize Davetlisiniz
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/iletisim"
                className="border border-ivory/30 px-10 py-3.5 text-sm tracking-[0.15em] uppercase text-ivory hover:bg-ivory hover:text-onyx transition-all duration-300"
              >
                Randevu Alın
              </Link>
              <Link
                href="/subelerimiz"
                className="text-[10px] text-zinc-300 hover:text-gold tracking-[0.2em] uppercase border-b border-zinc-400/40 hover:border-gold/40 pb-0.5 transition-all duration-300"
              >
                Şubelerimiz
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── Mirasınızı Geleceğe Taşıyın ───────── */}
        <section ref={legacyRef} className="bg-[#FAF9F6]">
          <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2">

            {/* Sol – görsel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={legacyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease }}
              className="relative aspect-[4/5] lg:aspect-auto overflow-hidden"
              style={{ minHeight: 480 }}
            >
              <Image
                src="/images/web/9 (2).png"
                alt="ONR zanaatkârlık detay"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-onyx/10" />
            </motion.div>

            {/* Sağ – içerik */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={legacyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.25, ease }}
              className="flex flex-col justify-center px-10 py-16 lg:px-16 lg:py-24 bg-white"
            >
              <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-5 font-sans">
                Bakım &amp; Onarım
              </p>
              <h2 className="font-serif text-charcoal text-3xl lg:text-4xl leading-snug mb-7">
                Mirasınızı Geleceğe
                <br />
                <em className="not-italic text-charcoal/70">Taşıyın</em>
              </h2>
              <p className="font-sans font-light text-charcoal/60 text-[14px] leading-[1.9] max-w-sm mb-10">
                Bir ONR parçası zamansızdır. Uzman zanaatkarlarımızın bakım ve
                onarım servisleriyle mücevherinizin ışıltısını nesiller boyu
                koruyoruz.
              </p>
              <Link
                href="/bakim-ve-onarim"
                className="self-start inline-flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase text-charcoal border-b border-charcoal/30 hover:border-gold hover:text-gold pb-0.5 transition-all duration-300 font-sans"
              >
                Bakım Servislerini Keşfedin
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

          </div>
        </section>

      </main>
      <Footer hideNewsletter />
    </PageWrapper>
  );
}
