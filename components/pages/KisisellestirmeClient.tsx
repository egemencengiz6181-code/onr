"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import { products } from "@/lib/products";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fonts = [
  { name: "Copperplate Script", sample: "Sonsuzluk", class: "font-serif italic text-3xl tracking-wide" },
  { name: "Gravür Serif", sample: "Sonsuzluk", class: "font-serif text-3xl tracking-[0.15em] uppercase" },
  { name: "Modern Sans", sample: "SONSUZLUK", class: "font-sans text-2xl tracking-[0.4em]" },
  { name: "Antika Block", sample: "SONSUZLUK", class: "font-serif font-light text-3xl tracking-[0.25em]" },
];

const personalizable = products.filter((p) => !p.isExclusive).slice(0, 4);

const steps = [
  { num: "01", title: "Ürünü Seçin", desc: "Gravür veya kişiselleştirme istediğiniz parçayı belirleyin." },
  { num: "02", title: "Yazı & Font", desc: "İsim, tarih veya anlam taşıyan bir sözcük girin; font seçin." },
  { num: "03", title: "Onay & Üretim", desc: "Uzmanımız sizinle iletişime geçer, 10-15 iş gününde teslim." },
];

export default function KisisellestirmeClient() {
  const [activeFont, setActiveFont] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", product: "", text: "", note: "" });
  const [sent, setSent] = useState(false);

  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen bg-[#FAF9F6] pt-[72px] md:pt-[126px]">

        {/* Hero — full bleed */}
        <div className="relative h-[60vh] md:h-[70vh] bg-[#0A0A0A] overflow-hidden flex items-end">
          <Image
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&q=85&fit=crop"
            alt="Kişiselleştirme atölyesi"
            fill
            className="object-cover opacity-45"
            priority
          />
          <div className="relative z-10 px-8 md:px-20 pb-16 md:pb-20 max-w-[1200px] mx-auto w-full">
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="text-[8px] tracking-[0.5em] uppercase font-sans text-gold mb-4"
            >
              Personalization Lab
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="font-serif font-light text-ivory-100 text-[3.5rem] md:text-[5.5rem] leading-[1.0] mb-5"
            >
              Kendi Hikayeni<br />Yaz
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              className="text-[13px] font-sans font-light text-ivory-100/50 max-w-[420px] leading-relaxed"
            >
              Her mücevher bir boş sayfadır. Adınız, özel bir tarih ya da anlam taşıyan tek bir sözcük — onu ebediyen sizin kılar.
            </motion.p>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-16">

          {/* Süreç adımları */}
          <section className="py-20 border-b border-[#1A1A1A]/[0.06]">
            <p className="text-[8px] tracking-[0.45em] uppercase font-sans text-gold mb-12">Nasıl Çalışır</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {steps.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease }}
                >
                  <p className="font-serif font-light text-[3rem] text-[#1A1A1A]/8 mb-4 leading-none">{s.num}</p>
                  <h3 className="text-[10px] tracking-[0.28em] uppercase font-sans font-semibold text-[#1A1A1A] mb-3">{s.title}</h3>
                  <p className="text-[12.5px] font-sans font-light text-[#1A1A1A]/45 leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Font Galerisi */}
          <section className="py-20 border-b border-[#1A1A1A]/[0.06]">
            <p className="text-[8px] tracking-[0.45em] uppercase font-sans text-gold mb-4">Gravür Fontları</p>
            <h2 className="font-serif font-light text-[#1A1A1A] text-[2.2rem] mb-12">Her harfin bir ruhu var</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {fonts.map((f, i) => (
                <button
                  key={f.name}
                  onClick={() => setActiveFont(i)}
                  className={`group border py-10 px-6 text-center transition-all duration-300 hover:-translate-y-1 ${
                    activeFont === i
                      ? "border-gold bg-gold/[0.03]"
                      : "border-[#1A1A1A]/[0.07] hover:border-gold/30"
                  }`}
                >
                  <p className={`${f.class} text-[#1A1A1A] mb-5 transition-colors duration-300 ${activeFont === i ? "text-[#1A1A1A]" : "text-[#1A1A1A]/60"}`}>
                    {f.sample}
                  </p>
                  <p className={`text-[7.5px] tracking-[0.22em] uppercase font-sans transition-colors duration-300 ${activeFont === i ? "text-gold" : "text-[#1A1A1A]/30"}`}>
                    {f.name}
                  </p>
                </button>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-[#1A1A1A]/25 shrink-0">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-[11px] font-sans font-light text-[#1A1A1A]/35 leading-relaxed">
                Seçilen font yalnızca ön izleme amaçlıdır. Nihai gravür, metal türüne ve yüzeye göre uzmanımız tarafından önerilir.
              </p>
            </div>
          </section>

          {/* Kişiselleştirilebilir Ürünler */}
          <section className="py-20 border-b border-[#1A1A1A]/[0.06]">
            <p className="text-[8px] tracking-[0.45em] uppercase font-sans text-gold mb-4">Kişiselleştirilebilir Parçalar</p>
            <h2 className="font-serif font-light text-[#1A1A1A] text-[2.2rem] mb-12">Seçtiğinizi, sizin yapıyoruz</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {personalizable.map((p) => (
                <Link key={p.id} href={`/urun/${p.slug}`} className="group">
                  <div className="relative aspect-[3/4] bg-[#EFECE7] overflow-hidden mb-4">
                    <Image
                      src={p.images[0].src}
                      alt={p.images[0].alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[7px] text-ivory-100/70 tracking-[0.25em] uppercase font-sans">Gravür Mevcut</span>
                    </div>
                  </div>
                  <p className="text-[7.5px] tracking-[0.22em] uppercase font-sans text-[#1A1A1A]/35 mb-1">{p.category}</p>
                  <p className="font-serif font-light text-[#1A1A1A] text-[1.1rem] leading-snug">{p.name}</p>
                  <p className="text-[11px] font-sans font-light text-[#1A1A1A]/50 mt-1">{p.priceFormatted}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Talep Formu */}
          <section className="py-20">
            <div className="max-w-[680px] mx-auto">
              <div className="text-center mb-12">
                <p className="text-[8px] tracking-[0.45em] uppercase font-sans text-gold mb-4">Talep Oluşturun</p>
                <h2 className="font-serif font-light text-[#1A1A1A] text-[2.2rem] mb-3">Kişiselleştirme Başvurusu</h2>
                <p className="text-[12.5px] font-sans font-light text-[#1A1A1A]/40 leading-relaxed">
                  Formu doldurun; kişiselleştirme uzmanımız en geç 24 saat içinde sizinle iletişime geçsin.
                </p>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16 border border-gold/20"
                >
                  <div className="w-12 h-12 border border-gold/60 mx-auto flex items-center justify-center mb-6">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-serif font-light text-[#1A1A1A] text-[1.8rem] mb-3">Talebiniz Alındı</h3>
                  <p className="text-[12px] font-sans font-light text-[#1A1A1A]/40 max-w-[320px] mx-auto leading-relaxed">
                    Kişiselleştirme uzmanımız en kısa sürede sizinle iletişime geçecektir.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { key: "name", label: "Adınız Soyadınız", type: "text", req: true },
                      { key: "phone", label: "Telefon", type: "tel", req: true },
                      { key: "email", label: "E-posta", type: "email", req: false },
                      { key: "product", label: "İlgilendiğiniz Ürün", type: "text", req: false },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="block text-[7.5px] tracking-[0.28em] uppercase text-[#1A1A1A]/35 font-sans mb-2">
                          {f.label} {f.req && <span className="text-gold/70">*</span>}
                        </label>
                        <input
                          type={f.type}
                          required={f.req}
                          value={formData[f.key as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                          className="w-full bg-transparent border-b border-[#1A1A1A]/10 focus:border-gold text-[#1A1A1A] font-sans font-light text-[13px] py-2.5 outline-none placeholder-[#1A1A1A]/20 transition-colors duration-300"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-[7.5px] tracking-[0.28em] uppercase text-[#1A1A1A]/35 font-sans mb-2">
                      Gravür / Kişiselleştirme Metni
                    </label>
                    <input
                      type="text"
                      value={formData.text}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                      placeholder="Örn: E & K · 12.09.24"
                      className="w-full bg-transparent border-b border-[#1A1A1A]/10 focus:border-gold text-[#1A1A1A] font-sans font-light text-[13px] py-2.5 outline-none placeholder-[#1A1A1A]/20 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[7.5px] tracking-[0.28em] uppercase text-[#1A1A1A]/35 font-sans mb-2">
                      Ekstra Notunuz
                    </label>
                    <textarea
                      rows={3}
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      placeholder="Font tercihi, beden uyarlaması, teslim tarihi beklentisi…"
                      className="w-full bg-transparent border-b border-[#1A1A1A]/10 focus:border-gold text-[#1A1A1A] font-sans font-light text-[13px] py-2.5 outline-none placeholder-[#1A1A1A]/20 transition-colors duration-300 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#1A1A1A] text-[#FAF9F6] text-[9px] tracking-[0.3em] uppercase font-sans font-medium py-5 hover:bg-[#1A1A1A]/80 transition-colors duration-300"
                  >
                    Talep Gönder
                  </button>
                </form>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </PageWrapper>
  );
}
