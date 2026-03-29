"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const careTips = [
  {
    material: "Altın Mücevherler",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7 text-gold">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    ),
    tips: [
      "Günlük kullanımda parfüm, krem ve deterjan temasından kaçının.",
      "Ilık su ve birkaç damla yumuşak bulaşık deterjanıyla temizleyin.",
      "Yumuşak bir kuyumcu bezi ile parlaklaştırın.",
      "Ayrı, yumuşak astarlı kutularda saklayın — altın kolayca çizilir.",
      "Yılda en az bir kez profesyonel temizlik yaptırın.",
    ],
  },
  {
    material: "Pırlanta & Değerli Taşlar",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7 text-gold">
        <path d="M6 3h12l4 7-10 11L2 10z" />
        <path d="M2 10h20M12 21L8 10l4-7 4 7z" />
      </svg>
    ),
    tips: [
      "Pırlanta yağ çeker — parmak izi parlaklığı azaltır, sık silin.",
      "Amonyaklı cam temizleyicisi ve yumuşak diş fırçası ile temizlenebilir.",
      "Zümrüt ve opal gibi hassas taşları asla ultrasonik cihazla temizlemeyin.",
      "Sert darbelere karşı dikkatli olun — pırlanta çizilmez ama kaynağından kırılabilir.",
      "Taş kapatma kontrolünü yıllık olarak yaptırın.",
    ],
  },
  {
    material: "İnci Mücevherler",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7 text-gold">
        <circle cx="12" cy="12" r="6" />
        <path d="M12 2a10 10 0 0 1 0 20M12 2a10 10 0 0 0 0 20" />
      </svg>
    ),
    tips: [
      "İnciler en hassas mücevherlerdir — en son takın, ilk çıkarın.",
      "Her kullanımdan sonra yumuşak, nemli bir bezle silin.",
      "Asla kimyasal temizleyici kullanmayın — sedefin yapısını bozar.",
      "İpek veya pamuklu poşet içinde, diğer mücevherlerden ayrı saklayın.",
      "İpli inci kolyeleri yılda bir kez yeniden iplettirin.",
    ],
  },
];

const services = [
  "Profesyonel ultrasonik temizlik",
  "Taş kapatma kontrolü & sıkıştırma",
  "Rodaj (beyaz altın yenileme)",
  "Halka boyut ayarı",
  "Zincir onarımı & kilit değişimi",
  "Gravür hizmeti",
];

export default function BakimVeOnarimClient() {
  const tipsRef = useRef<HTMLElement>(null);
  const tipsInView = useInView(tipsRef, { once: true, margin: "-10%" });
  const svcRef = useRef<HTMLElement>(null);
  const svcInView = useInView(svcRef, { once: true, margin: "-10%" });

  const atelierRef = useRef<HTMLElement>(null);
  const { scrollYProgress: atelierScroll } = useScroll({ target: atelierRef, offset: ["start end", "end start"] });
  const atelierImgY = useTransform(atelierScroll, [0, 1], ["-10%", "10%"]);

  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen bg-[#FAF9F6]">

        {/* ── Header ─────────────────────────── */}
        <section className="pt-36 pb-16 lg:pt-44 lg:pb-20 px-8 lg:px-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4"
          >
            Mücevher Bakımı
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="font-serif text-charcoal text-4xl lg:text-5xl"
          >
            Bakım & Onarım
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="w-12 h-px bg-gold mx-auto mt-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-xl mx-auto text-charcoal/50 font-sans font-light text-[14px] leading-[1.9] mt-8"
          >
            Mücevherleriniz, doğru bakımla nesiller boyu parlaklığını korur.
            Aşağıda malzeme türüne göre uzman bakım önerilerimizi bulabilirsiniz.
          </motion.p>
        </section>

        {/* ── Atelier Visual Break ────────────── */}
        <section ref={atelierRef} className="relative h-[52vh] lg:h-[60vh] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{ y: atelierImgY, scale: 1.12 }}
          >
            <Image
              src="/images/web/7 (2).png"
              alt="ONR atölyesi zanaatkârlık"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-onyx/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/55 via-transparent to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="absolute bottom-10 left-8 lg:left-20"
          >
            <p className="text-gold text-[10px] tracking-[0.35em] uppercase mb-2">
              Ankara Atölyesi — 1987&apos;den Bu Yana
            </p>
            <h2 className="font-serif text-ivory text-2xl lg:text-3xl">
              Ustanın Elinden Adım Adım
            </h2>
          </motion.div>
        </section>

        {/* ── Care Tips ──────────────────────── */}
        <section ref={tipsRef} className="max-w-screen-xl mx-auto px-8 lg:px-20 pb-20 lg:pb-28">
          <div className="space-y-12">
            {careTips.map((cat, i) => (
              <motion.div
                key={cat.material}
                initial={{ opacity: 0, y: 30 }}
                animate={tipsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 * i, ease }}
                className="border border-charcoal/8 p-8 lg:p-12"
              >
                <div className="flex items-center gap-4 mb-6">
                  {cat.icon}
                  <h2 className="font-serif text-charcoal text-2xl lg:text-[26px]">
                    {cat.material}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {cat.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                      <span className="text-charcoal/60 font-sans font-light text-[14px] leading-[1.8]">
                        {tip}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Atölye Services ────────────────── */}
        <section ref={svcRef} className="bg-onyx py-24 lg:py-28">
          <div className="max-w-screen-xl mx-auto px-8 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={svcInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
              className="text-center mb-14"
            >
              <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4">
                Atölye Hizmetleri
              </p>
              <h2 className="font-serif text-white text-3xl lg:text-4xl">
                Profesyonel Onarım & Yenileme
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((svc, i) => (
                <motion.div
                  key={svc}
                  initial={{ opacity: 0, y: 20 }}
                  animate={svcInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.08 * i, ease }}
                  className="flex items-center gap-4 border border-white/8 px-7 py-5 hover:border-gold/20 transition-colors duration-500"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span className="text-zinc-100 font-sans text-[14px]">{svc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────── */}
        <section className="text-center px-8 py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <h2 className="font-serif text-charcoal text-2xl lg:text-3xl mb-4">
              Yıllık Bakım İçin Mağazamıza Bekliyoruz
            </h2>
            <p className="text-charcoal/50 font-sans font-light text-[14px] leading-[1.8] max-w-md mx-auto mb-8">
              Uzman kuyumcularımız, mücevherlerinizi ilk günkü parlaklığına kavuşturmak için hazır.
            </p>
            <Link
              href="/iletisim"
              className="inline-block border border-charcoal/30 px-10 py-3.5 text-sm tracking-[0.15em] uppercase text-charcoal hover:bg-onyx hover:text-ivory transition-all duration-300"
            >
              Randevu Alın
            </Link>
          </motion.div>
        </section>

      </main>
      <Footer />
    </PageWrapper>
  );
}
