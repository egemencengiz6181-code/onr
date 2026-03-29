"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";

// ── Types ──────────────────────────────────────────────────────
interface FormData {
  jewelryType: string;
  metal: string;
  stone: string;
  budget: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  referenceFile: File | null;
}

// ── Step config ────────────────────────────────────────────────
const STEPS = [
  { id: 1, title: "Takı Türü", overline: "Adım 01" },
  { id: 2, title: "Metal & Taş", overline: "Adım 02" },
  { id: 3, title: "Bütçe & Vizyon", overline: "Adım 03" },
  { id: 4, title: "İletişim", overline: "Adım 04" },
];

const jewelryTypeIcons: Record<string, React.ReactNode> = {
  Yüzük: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="14" r="7" />
      <path d="M8.5 7.5 12 3l3.5 4.5" />
    </svg>
  ),
  Kolye: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3c0 5 6 8 6 8s6-3 6-8" />
      <path d="M12 11v4" />
      <path d="M9 18a3 3 0 1 0 6 0" />
    </svg>
  ),
  Bileklik: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="9" ry="5" />
      <ellipse cx="12" cy="12" rx="5" ry="3" />
    </svg>
  ),
  Küpe: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4" />
      <circle cx="12" cy="10" r="4" />
      <path d="M12 14v2" />
      <path d="M10 18l2 4 2-4" />
    </svg>
  ),
  Broş: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8 2 5 5.5 5 9c0 5 7 13 7 13s7-8 7-13c0-3.5-3-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  Diğer: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

const jewelryTypes = [
  { label: "Yüzük" },
  { label: "Kolye" },
  { label: "Bileklik" },
  { label: "Küpe" },
  { label: "Broş" },
  { label: "Diğer" },
];

const metals = [
  { label: "18K Sarı Altın", sub: "Klasik ve sıcak" },
  { label: "18K Beyaz Altın", sub: "Modern ve zarif" },
  { label: "18K Rose Altın", sub: "Romantik ve narin" },
  { label: "950 Platin", sub: "En dayanıklı seçim" },
];

const stones = [
  { label: "Pırlanta", sub: "GIA/IGI Sertifikalı" },
  { label: "Safir", sub: "Doğal, ısıl işlemsiz" },
  { label: "Yakut", sub: "Burma kökenli" },
  { label: "Zümrüt", sub: "Kolombiya kökenli" },
  { label: "Taşsız", sub: "Saf metal işçiliği" },
  { label: "Diğer / Danışın", sub: "Size özel taş seçimi" },
];

const budgets = [
  { label: "₺50.000 – ₺100.000", value: "50k-100k" },
  { label: "₺100.000 – ₺250.000", value: "100k-250k" },
  { label: "₺250.000 – ₺500.000", value: "250k-500k" },
  { label: "₺500.000 +", value: "500k+" },
  { label: "Belirlemedim, öneriniz olsun", value: "open" },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 64 : -64,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -64 : 64,
    opacity: 0,
    transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] },
  }),
};

export default function BespokeClient() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormData>({
    jewelryType: "",
    metal: "",
    stone: "",
    budget: "",
    description: "",
    name: "",
    email: "",
    phone: "",
    referenceFile: null,
  });

  const goTo = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const canNext = () => {
    if (step === 1) return !!form.jewelryType;
    if (step === 2) return !!form.metal && !!form.stone;
    if (step === 3) return !!form.budget;
    if (step === 4) return !!form.name && !!form.email;
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen bg-ivory-100">
        {/* ── Hero Header ── */}
        <div className="relative bg-onyx overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 70% 50%, #C9A84C 0%, transparent 60%)",
            }}
          />
          <div className="relative max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24
                          pt-40 pb-20 md:pt-48 md:pb-24">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="section-overline text-gold mb-5"
            >
              Özel Tasarım — Bespoke
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-serif font-light text-ivory-50 text-5xl md:text-6xl lg:text-7xl
                         leading-[1.05] tracking-wide max-w-2xl"
            >
              Hayalinizi Gerçeğe Dönüştürelim
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 flex items-center gap-4"
            >
              <span className="block w-12 h-px bg-gold" />
              <p className="text-ivory-100/45 text-sm font-sans font-light">
                Hayalinizdeki parçayı birlikte tasarlayalım.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Form Container ── */}
        <div className="max-w-2xl mx-auto px-8 md:px-0 py-16 md:py-24">
          {submitted ? (
            /* Success state */
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 border border-gold mx-auto flex items-center justify-center mb-8">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="1.4" className="text-gold">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="section-overline text-gold mb-4">Talebiniz Alındı</p>
              <h2 className="font-serif font-light text-charcoal text-4xl md:text-5xl mb-6">
                Teşekkürler, {form.name.split(" ")[0]}
              </h2>
              <div className="w-8 h-px bg-gold mx-auto mb-6" />
              <p className="text-charcoal-lighter font-sans font-light text-sm leading-relaxed max-w-sm mx-auto">
                Uzmanlarımız 24 saat içinde sizinle iletişime geçecek. Hayalinizi birlikte hayata geçirmeye hazırız.
              </p>
            </motion.div>
          ) : (
            <>
              {/* ── Step Indicator ── */}
              <div className="flex items-center gap-3 mb-10">
                {STEPS.map((s) => (
                  <div key={s.id} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 flex items-center justify-center text-[8px] font-sans
                                  transition-all duration-400
                                  ${step === s.id
                                    ? "bg-gold text-onyx"
                                    : step > s.id
                                    ? "bg-charcoal text-ivory-100"
                                    : "border border-ivory-200 text-charcoal-lighter"
                                  }`}
                    >
                      {step > s.id ? (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        s.id
                      )}
                    </div>
                    {s.id < STEPS.length && (
                      <div className={`h-px w-8 transition-colors duration-500
                        ${step > s.id ? "bg-charcoal" : "bg-ivory-200"}`} />
                    )}
                  </div>
                ))}
                <span className="ml-2 text-[9px] text-charcoal-lighter tracking-widest uppercase font-sans">
                  {STEPS[step - 1].overline} — {STEPS[step - 1].title}
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait" custom={dir}>
                  {/* ── Step 1: Jewelry Type ── */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <h2 className="font-serif font-light text-charcoal text-3xl mb-8">
                        Ne tür bir takı hayal ediyorsunuz?
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {jewelryTypes.map((j) => (
                          <button
                            key={j.label}
                            type="button"
                            onClick={() => setForm({ ...form, jewelryType: j.label })}
                            className={`flex flex-col items-center gap-3 py-6 border transition-all duration-300
                              ${form.jewelryType === j.label
                                ? "border-gold bg-gold/5 text-charcoal"
                                : "border-ivory-200 hover:border-gold/50 text-charcoal-lighter"
                              }`}
                          >
                            <span className="text-current">{jewelryTypeIcons[j.label]}</span>
                            <span className="text-[10px] tracking-widest uppercase font-sans font-medium">
                              {j.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── Step 2: Metal + Stone ── */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-10"
                    >
                      <div>
                        <h2 className="font-serif font-light text-charcoal text-3xl mb-6">
                          Metal Tercihiniz
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {metals.map((m) => (
                            <button
                              key={m.label}
                              type="button"
                              onClick={() => setForm({ ...form, metal: m.label })}
                              className={`flex items-center gap-4 px-5 py-4 border text-left transition-all duration-300
                                ${form.metal === m.label
                                  ? "border-gold bg-gold/5"
                                  : "border-ivory-200 hover:border-gold/50"
                                }`}
                            >
                              <div
                                className={`w-3 h-3 rounded-full border-2 shrink-0 transition-colors duration-200
                                  ${form.metal === m.label ? "border-gold bg-gold" : "border-charcoal-lighter"}`}
                              />
                              <div>
                                <p className="text-[10px] font-sans font-medium tracking-widest uppercase text-charcoal">
                                  {m.label}
                                </p>
                                <p className="text-[9px] text-charcoal-lighter font-sans mt-0.5">{m.sub}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h2 className="font-serif font-light text-charcoal text-3xl mb-6">
                          Taş Tercihiniz
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {stones.map((s) => (
                            <button
                              key={s.label}
                              type="button"
                              onClick={() => setForm({ ...form, stone: s.label })}
                              className={`flex flex-col gap-1 px-4 py-4 border text-left transition-all duration-300
                                ${form.stone === s.label
                                  ? "border-gold bg-gold/5"
                                  : "border-ivory-200 hover:border-gold/50"
                                }`}
                            >
                              <p className="text-[10px] font-sans font-medium tracking-widest uppercase text-charcoal">
                                {s.label}
                              </p>
                              <p className="text-[9px] text-charcoal-lighter font-sans">{s.sub}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Step 3: Budget + Description + File ── */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-10"
                    >
                      <div>
                        <h2 className="font-serif font-light text-charcoal text-3xl mb-6">
                          Yaklaşık Bütçeniz
                        </h2>
                        <div className="space-y-2">
                          {budgets.map((b) => (
                            <button
                              key={b.value}
                              type="button"
                              onClick={() => setForm({ ...form, budget: b.value })}
                              className={`w-full flex items-center gap-4 px-5 py-4 border text-left transition-all duration-300
                                ${form.budget === b.value
                                  ? "border-gold bg-gold/5"
                                  : "border-ivory-200 hover:border-gold/50"
                                }`}
                            >
                              <div
                                className={`w-3 h-3 shrink-0 border-2 rounded-full transition-colors duration-200
                                  ${form.budget === b.value ? "border-gold bg-gold" : "border-charcoal-lighter"}`}
                              />
                              <span className="text-[10px] font-sans tracking-widest uppercase text-charcoal">
                                {b.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Description textarea */}
                      <div>
                        <label className="block section-overline text-charcoal-lighter mb-4">
                          Hayalinizdeki Tasarımı Anlatın
                        </label>
                        <textarea
                          value={form.description}
                          onChange={(e) => setForm({ ...form, description: e.target.value })}
                          rows={5}
                          placeholder="Renk tercihleri, ilham aldığınız objeler, özel bir anlam taşıyan detaylar... Her şeyi paylaşabilirsiniz."
                          className="w-full bg-transparent border border-ivory-200 focus:border-gold
                                     text-charcoal font-sans font-light text-sm leading-relaxed
                                     placeholder-charcoal-lighter/40 p-4 outline-none resize-none
                                     transition-colors duration-300"
                        />
                      </div>

                      {/* Reference file upload */}
                      <div>
                        <label className="block section-overline text-charcoal-lighter mb-4">
                          Referans Görsel (opsiyonel)
                        </label>
                        <div
                          onClick={() => fileRef.current?.click()}
                          className="border border-dashed border-ivory-200 hover:border-gold/50
                                     p-8 text-center cursor-pointer transition-all duration-300 group"
                        >
                          <input
                            ref={fileRef}
                            type="file"
                            accept="image/*,.pdf"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0] ?? null;
                              setForm({ ...form, referenceFile: file });
                            }}
                          />
                          {form.referenceFile ? (
                            <p className="text-gold text-sm font-sans font-light">
                              ✓ {form.referenceFile.name}
                            </p>
                          ) : (
                            <>
                              <svg width="24" height="24" className="mx-auto mb-3 text-charcoal-lighter/40
                                           group-hover:text-gold transition-colors duration-300"
                                   viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                              </svg>
                              <p className="text-[10px] text-charcoal-lighter tracking-widest uppercase font-sans">
                                Dosya Seç ya da Buraya Sürükle
                              </p>
                              <p className="text-[9px] text-charcoal-lighter/50 font-sans mt-1">
                                JPG, PNG, PDF — maks. 10 MB
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Step 4: Contact ── */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-8"
                    >
                      <h2 className="font-serif font-light text-charcoal text-3xl">
                        Son Olarak Sizi Tanıyalım
                      </h2>

                      {/* Summary card */}
                      <div className="bg-ivory-200/60 border border-ivory-200 p-5 space-y-2">
                        <p className="section-overline text-gold mb-3">Seçimlerinizin Özeti</p>
                        {[
                          ["Takı Türü", form.jewelryType],
                          ["Metal", form.metal],
                          ["Taş", form.stone],
                          ["Bütçe", budgets.find((b) => b.value === form.budget)?.label ?? "—"],
                        ].map(([k, v]) => (
                          <div key={k} className="flex gap-4 text-[11px] font-sans">
                            <span className="text-charcoal-lighter w-24 shrink-0">{k}</span>
                            <span className="text-charcoal font-medium">{v || "—"}</span>
                          </div>
                        ))}
                      </div>

                      {[
                        {
                          label: "Adınız Soyadınız",
                          key: "name" as const,
                          type: "text",
                          required: true,
                          placeholder: "Adınız Soyadınız",
                        },
                        {
                          label: "E-posta Adresiniz",
                          key: "email" as const,
                          type: "email",
                          required: true,
                          placeholder: "email@example.com",
                        },
                        {
                          label: "Telefon Numaranız",
                          key: "phone" as const,
                          type: "tel",
                          required: false,
                          placeholder: "+90 5XX XXX XX XX",
                        },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="block section-overline text-charcoal-lighter mb-3">
                            {field.label}
                            {field.required && (
                              <span className="text-gold ml-1">*</span>
                            )}
                          </label>
                          <input
                            type={field.type}
                            value={form[field.key]}
                            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                            placeholder={field.placeholder}
                            required={field.required}
                            className="w-full bg-transparent border-b border-ivory-200 focus:border-gold
                                       text-charcoal font-sans font-light text-sm py-3 outline-none
                                       placeholder-charcoal-lighter/40 transition-colors duration-300"
                          />
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Navigation Buttons ── */}
                <div className={`flex mt-10 gap-4 ${step > 1 ? "justify-between" : "justify-end"}`}>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => goTo(step - 1)}
                      className="btn-luxury text-[9px] py-3 px-8"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="rotate-180">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                      Geri
                    </button>
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={() => goTo(step + 1)}
                      disabled={!canNext()}
                      className={`btn-luxury-filled text-[9px] py-3 px-10 ml-auto
                        ${!canNext() ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      Devam Et
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!canNext()}
                      className={`btn-luxury-filled text-[9px] py-3 px-10 ml-auto
                        ${!canNext() ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      Tasarım Talebini Gönder
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </PageWrapper>
  );
}
