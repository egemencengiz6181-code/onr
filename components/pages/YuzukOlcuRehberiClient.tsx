"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease },
  }),
};

const ringSizes = [
  { tr: 10, cevre: 50, cap: 15.92 },
  { tr: 11, cevre: 51, cap: 16.24 },
  { tr: 12, cevre: 52, cap: 16.56 },
  { tr: 13, cevre: 53, cap: 16.88 },
  { tr: 14, cevre: 54, cap: 17.20 },
  { tr: 15, cevre: 55, cap: 17.52 },
  { tr: 16, cevre: 56, cap: 17.84 },
  { tr: 17, cevre: 57, cap: 18.16 },
  { tr: 18, cevre: 58, cap: 18.48 },
  { tr: 19, cevre: 59, cap: 18.80 },
  { tr: 20, cevre: 60, cap: 19.10 },
];

const steps = [
  {
    num: "01",
    title: "İnce bir şerit kağıt veya ip kesin",
    desc: "Yaklaşık 10 cm uzunluğunda, 5 mm genişliğinde bir kağıt şeridi hazırlayın.",
  },
  {
    num: "02",
    title: "Parmağınızın çevresine sarın",
    desc: "Şeridi ölçmek istediğiniz parmağın orta boğumunun etrafına sıkıca fakat rahatça sarın.",
  },
  {
    num: "03",
    title: "Uçları işaretleyip cetvelle ölçün",
    desc: "Şeridin uçlarının buluştuğu noktayı kalemle işaretleyin ve milimetre cetveliyle ölçün. Bu değer çevre uzunluğunuzdur.",
  },
  {
    num: "04",
    title: "Tablodan ölçünüzü bulun",
    desc: "Bulduğunuz çevre değerini aşağıdaki tabloyla karşılaştırarak Türk yüzük ölçünüzü belirleyin.",
  },
];

const warnings = [
  "Parmaklar sabah şişebilir, yüzük ölçümünü gün ortasında yapın.",
  "Sıcak havalarda parmaklar genişler; serin bir ortamda ölçüm yapın.",
  "Eklem boğumları büyükse, yüzüğün hem parmağa girebilmesi hem de düşmemesi için iki ölçüm arasındaki bedeni tercih edin.",
];

export default function YuzukOlcuRehberiClient() {
  const tableRef = useRef<HTMLElement>(null);
  const tableInView = useInView(tableRef, { once: true, margin: "-10%" });

  const warningRef = useRef<HTMLElement>(null);
  const warningInView = useInView(warningRef, { once: true, margin: "-10%" });

  return (
    <>
      <Navbar />

      {/* ── HERO — Split Layout ── */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Image */}
        <motion.div
          className="relative h-[55vw] max-h-[720px] lg:h-auto lg:max-h-none overflow-hidden"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease }}
        >
          <Image
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=90&fit=crop&crop=center"
            alt="Pırlanta yüzük — yakın çekim"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* subtle dark veil for contrast */}
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>

        {/* Right: Steps */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 bg-white">
          <motion.p
            className="text-[10px] text-gold tracking-luxury-wide uppercase font-sans mb-5"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            ONR Mücevherat — Rehber
          </motion.p>

          <motion.h1
            className="font-serif font-light text-onyx text-4xl md:text-5xl lg:text-[3.25rem] leading-tight mb-10"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Evde Yüzük
            <br />
            Ölçüm Rehberi
          </motion.h1>

          <ol className="space-y-8">
            {steps.map((step, i) => (
              <motion.li
                key={step.num}
                className="flex gap-5 items-start"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i + 2}
              >
                <span className="font-serif text-gold/60 text-2xl leading-none mt-0.5 select-none flex-shrink-0">
                  {step.num}
                </span>
                <div>
                  <p className="font-sans font-medium text-onyx text-[13px] tracking-wide mb-1">
                    {step.title}
                  </p>
                  <p className="font-sans font-light text-zinc-500 text-[12px] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── SIZE TABLE ── */}
      <section
        ref={tableRef}
        className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-white"
      >
        <div className="max-w-screen-lg mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={tableInView ? "visible" : "hidden"}
            custom={0}
            className="mb-14 text-center"
          >
            <p className="text-[10px] text-gold tracking-luxury-wide uppercase font-sans mb-4">
              Ölçü Tablosu
            </p>
            <h2 className="font-serif font-light text-onyx text-3xl md:text-4xl">
              Türk Yüzük Ölçüleri
            </h2>
          </motion.div>

          {/* Horizontal-scrollable on mobile */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={tableInView ? "visible" : "hidden"}
            custom={1}
            className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0"
          >
            <table className="w-full min-w-[400px] border-collapse">
              <thead>
                <tr className="border-b border-zinc-200">
                  <th className="text-left py-4 pr-8 text-[10px] text-zinc-400 tracking-luxury-wide uppercase font-sans font-normal">
                    Ölçü (TR)
                  </th>
                  <th className="text-left py-4 pr-8 text-[10px] text-zinc-400 tracking-luxury-wide uppercase font-sans font-normal">
                    Çevre (mm)
                  </th>
                  <th className="text-left py-4 text-[10px] text-zinc-400 tracking-luxury-wide uppercase font-sans font-normal">
                    Çap (mm)
                  </th>
                </tr>
              </thead>
              <tbody>
                {ringSizes.map((row, i) => (
                  <motion.tr
                    key={row.tr}
                    className="border-b border-zinc-100 group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={tableInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease }}
                  >
                    <td className="py-4 pr-8 font-serif text-onyx text-xl font-light group-hover:text-gold transition-colors duration-300">
                      {row.tr}
                    </td>
                    <td className="py-4 pr-8 font-sans text-zinc-600 text-[13px] font-light tracking-wide">
                      {row.cevre}
                    </td>
                    <td className="py-4 font-sans text-zinc-600 text-[13px] font-light tracking-wide">
                      {row.cap.toFixed(2)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── WARNINGS ── */}
      <section
        ref={warningRef}
        className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#FAF9F6]"
      >
        <div className="max-w-screen-lg mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={warningInView ? "visible" : "hidden"}
            custom={0}
            className="mb-12"
          >
            <p className="text-[10px] text-gold tracking-luxury-wide uppercase font-sans mb-4">
              Dikkat Edilmesi Gerekenler
            </p>
            <h2 className="font-serif font-light text-onyx text-3xl md:text-4xl">
              En Doğru Ölçüm İçin
            </h2>
          </motion.div>

          <ul className="space-y-6 mb-16">
            {warnings.map((w, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-5"
                variants={fadeUp}
                initial="hidden"
                animate={warningInView ? "visible" : "hidden"}
                custom={i + 1}
              >
                <span className="mt-1.5 w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                <p className="font-sans font-light text-zinc-600 text-[13px] leading-relaxed">
                  {w}
                </p>
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="border-t border-zinc-200 pt-10"
            variants={fadeUp}
            initial="hidden"
            animate={warningInView ? "visible" : "hidden"}
            custom={4}
          >
            <p className="font-sans font-light text-zinc-500 text-[12px] leading-loose max-w-xl">
              Müşteri Hizmetleri Ekibimiz, yüzük ölçüsünden emin olamadığınız
              durumlarda size yardımcı olmaktan mutluluk duyar.{" "}
              <Link
                href="/iletisim"
                className="text-onyx underline underline-offset-4 decoration-gold/50
                           hover:text-gold hover:decoration-gold transition-colors duration-300"
              >
                Buradan
              </Link>{" "}
              bizimle iletişime geçebilirsiniz.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
