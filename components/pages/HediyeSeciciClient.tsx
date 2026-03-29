"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import { products } from "@/lib/products";
import type { Product } from "@/lib/types";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

/* ── Quiz Data ─────────────────────────────────────────────────── */
const steps = [
  {
    id: "recipient",
    question: "Kime alıyorsunuz?",
    subtitle: "Hediyeyi alacak kişiyi seçin.",
    options: [
      { label: "Sevgilim / Eşim", value: "partner", icon: "♡", tags: ["Halkalar", "Kolyeler"] },
      { label: "Annem", value: "mother", icon: "✦", tags: ["Kolyeler", "Küpeler"] },
      { label: "Kız Kardeşim", value: "sister", icon: "◎", tags: ["Bileklikler", "Küpeler"] },
      { label: "Arkadaşım", value: "friend", icon: "◇", tags: ["Bileklikler", "Kolyeler"] },
      { label: "Kendime", value: "self", icon: "◈", tags: ["Halkalar", "Kolyeler", "Bileklikler"] },
    ],
  },
  {
    id: "occasion",
    question: "Özel gün ne?",
    subtitle: "En anlamlı mücevheri birlikte seçelim.",
    options: [
      { label: "Nişan / Evlilik", value: "wedding", icon: "◉", tags: ["Halkalar"] },
      { label: "Doğum Günü", value: "birthday", icon: "✦", tags: ["Kolyeler", "Bileklikler"] },
      { label: "Yıldönümü", value: "anniversary", icon: "♡", tags: ["Halkalar", "Kolyeler"] },
      { label: "Özel Bir An", value: "special", icon: "◈", tags: ["Kolyeler", "Küpeler"] },
      { label: "Sadece Sevgi", value: "love", icon: "◇", tags: ["Bileklikler", "Küpeler"] },
    ],
  },
  {
    id: "style",
    question: "Stili nasıl?",
    subtitle: "Kişilik ve zevk tercihini belirleyin.",
    options: [
      { label: "Minimal & Zarif", value: "minimal", icon: "—", tags: ["Bileklikler"] },
      { label: "Gösterişli & Büyük", value: "bold", icon: "◉", tags: ["Kolyeler", "Halkalar"] },
      { label: "Klasik & Zamansız", value: "classic", icon: "◇", tags: ["Halkalar", "Küpeler"] },
      { label: "Modern & Avangard", value: "modern", icon: "◈", tags: ["Küpeler", "Bileklikler"] },
      { label: "Romantik & Feminen", value: "romantic", icon: "♡", tags: ["Kolyeler", "Küpeler"] },
    ],
  },
];

function getRecommendations(answers: Record<string, string>): Product[] {
  const tagScores: Record<string, number> = {};
  steps.forEach((step) => {
    const chosen = step.options.find((o) => o.value === answers[step.id]);
    if (chosen) {
      chosen.tags.forEach((t) => { tagScores[t] = (tagScores[t] ?? 0) + 1; });
    }
  });
  const scored = products
    .filter((p) => !p.isExclusive)
    .map((p) => ({ p, score: tagScores[p.category] ?? 0 }))
    .sort((a, b) => b.score - a.score || (b.p.isNew ? 1 : 0) - (a.p.isNew ? 1 : 0));
  return scored.slice(0, 4).map((x) => x.p);
}

/* ── Step Card ─────────────────────────────────────────────────── */
function StepCard({
  step,
  selected,
  onSelect,
}: {
  step: (typeof steps)[0];
  selected?: string;
  onSelect: (v: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.55, ease }}
    >
      <h2 className="font-serif font-light text-[#1A1A1A] text-[2.2rem] md:text-[2.8rem] leading-tight mb-2">
        {step.question}
      </h2>
      <p className="text-[12px] font-sans font-light text-[#1A1A1A]/40 tracking-[0.12em] mb-10">
        {step.subtitle}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {step.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`group flex flex-col items-center gap-4 border py-8 px-5 transition-all duration-300 hover:-translate-y-1 ${
              selected === opt.value
                ? "border-gold bg-gold/[0.04] text-[#1A1A1A]"
                : "border-[#1A1A1A]/[0.07] text-[#1A1A1A]/50 hover:border-gold/40 hover:text-[#1A1A1A]/80"
            }`}
          >
            <span className={`text-xl transition-colors duration-300 ${selected === opt.value ? "text-gold" : "text-[#1A1A1A]/20 group-hover:text-gold/50"}`}>
              {opt.icon}
            </span>
            <span className="text-[9px] tracking-[0.2em] uppercase font-sans font-medium leading-snug text-center">
              {opt.label}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Result Card ───────────────────────────────────────────────── */
function ResultCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="group"
    >
      <Link href={`/urun/${product.slug}`}>
        <div className="relative aspect-[3/4] bg-[#EFECE7] overflow-hidden mb-4">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {product.isNew && (
            <div className="absolute top-3 right-3 bg-gold px-2.5 py-1">
              <span className="text-[6.5px] text-onyx tracking-[0.2em] uppercase font-sans">Yeni</span>
            </div>
          )}
        </div>
        <p className="text-[7.5px] tracking-[0.22em] uppercase font-sans text-[#1A1A1A]/35 mb-1">{product.category}</p>
        <p className="font-serif font-light text-[#1A1A1A] text-[1.1rem] leading-snug mb-1.5 group-hover:text-charcoal transition-colors duration-300">{product.name}</p>
        <p className="text-[11px] font-sans font-light text-[#1A1A1A]/50">{product.priceFormatted}</p>
      </Link>
    </motion.div>
  );
}

/* ── Main Component ────────────────────────────────────────────── */
export default function HediyeSeciciClient() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (value: string) => {
    const stepId = steps[currentStep].id;
    const newAnswers = { ...answers, [stepId]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep((s) => s + 1);
      } else {
        setShowResults(true);
      }
    }, 320);
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const recommendations = showResults ? getRecommendations(answers) : [];

  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen bg-[#FAF9F6] pt-[72px] md:pt-[126px]">
        {/* Hero */}
        <div className="border-b border-[#1A1A1A]/[0.05] px-6 md:px-16 py-14 md:py-20">
          <div className="max-w-[1200px] mx-auto">
            <p className="text-[8px] tracking-[0.45em] uppercase font-sans text-gold mb-4">Hediye Danışmanı</p>
            <h1 className="font-serif font-light text-[#1A1A1A] text-[3rem] md:text-[4.5rem] leading-[1.02] mb-4">
              Mükemmel Hediyeyi<br />Birlikte Bulalım
            </h1>
            <p className="text-[13px] font-sans font-light text-[#1A1A1A]/40 max-w-[480px] leading-relaxed">
              Üç kısa soruya verdiğiniz cevaplarla, sevdiklerinize en uygun ONR mücevherini küratörlük anlayışıyla seçiyoruz.
            </p>
          </div>
        </div>

        {/* Quiz / Results */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-16 py-16 md:py-24">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div key={`step-${currentStep}`}>
                {/* Progress */}
                <div className="flex items-center gap-2 mb-12">
                  {steps.map((s, i) => (
                    <div key={s.id} className="flex items-center gap-2">
                      <div className={`flex items-center justify-center w-6 h-6 border text-[9px] font-sans transition-all duration-300 ${
                        i < currentStep ? "border-gold bg-gold text-onyx"
                        : i === currentStep ? "border-[#1A1A1A]/30 text-[#1A1A1A]"
                        : "border-[#1A1A1A]/10 text-[#1A1A1A]/25"
                      }`}>
                        {i < currentStep ? "✓" : i + 1}
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`h-px w-8 transition-colors duration-300 ${i < currentStep ? "bg-gold" : "bg-[#1A1A1A]/10"}`} />
                      )}
                    </div>
                  ))}
                  <span className="ml-3 text-[9px] tracking-[0.2em] uppercase font-sans text-[#1A1A1A]/30">
                    {currentStep + 1} / {steps.length}
                  </span>
                </div>

                <StepCard
                  step={steps[currentStep]}
                  selected={answers[steps[currentStep].id]}
                  onSelect={handleSelect}
                />

                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep((s) => s - 1)}
                    className="mt-8 text-[9px] tracking-[0.25em] uppercase font-sans text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors duration-300"
                  >
                    ← Önceki adım
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Result Header */}
                <div className="text-center mb-14">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <span className="flex-1 w-16 h-px bg-gold/20" />
                    <span className="text-gold/40 text-[10px]">◈</span>
                    <span className="flex-1 w-16 h-px bg-gold/20" />
                  </div>
                  <h2 className="font-serif font-light text-[#1A1A1A] text-[2.4rem] md:text-[3rem] mb-3">
                    Size Özel Seçki
                  </h2>
                  <p className="text-[12px] font-sans font-light text-[#1A1A1A]/40 max-w-[420px] mx-auto leading-relaxed">
                    Tercihlerinize göre küratörlük anlayışıyla hazırladığımız parçalar.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-14">
                  {recommendations.map((p) => (
                    <ResultCard key={p.id} product={p} />
                  ))}
                </div>

                <div className="text-center space-y-4">
                  <button
                    onClick={reset}
                    className="text-[9px] tracking-[0.3em] uppercase font-sans border border-[#1A1A1A]/12
                             text-[#1A1A1A]/40 px-10 py-3.5 hover:border-[#1A1A1A]/30 hover:text-[#1A1A1A]/65
                             transition-all duration-300 block mx-auto"
                  >
                    Yeniden Başla
                  </button>
                  <Link
                    href="/koleksiyonlar"
                    className="text-[9px] tracking-[0.3em] uppercase font-sans text-gold hover:text-gold/70 transition-colors duration-300 block"
                  >
                    Tüm Koleksiyonu Gör →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </PageWrapper>
  );
}
