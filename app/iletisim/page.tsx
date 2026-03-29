"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import Link from "next/link";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const subjects = [
  "Bir Ürün Hakkında Bilgi",
  "Özel Tasarım Talebi",
  "Sipariş Takibi",
  "Randevu Talebi",
  "Basın & İşbirliği",
  "Diğer",
];

export default function IletisimPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputBase =
    "w-full bg-transparent border-b border-charcoal/15 focus:border-gold text-charcoal " +
    "font-sans font-light text-sm py-3 outline-none placeholder-charcoal-lighter/40 " +
    "transition-colors duration-300";

  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen bg-ivory-100">
        {/* ── Elegant Header ── */}
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24
                        pt-36 md:pt-44 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-xl"
          >
            <p className="section-overline text-gold mb-5">İletişim</p>
            <h1 className="font-serif font-light text-charcoal text-5xl md:text-6xl lg:text-7xl
                           leading-[1.05] tracking-wide">
              Bize Yazın
            </h1>
            <div className="mt-8 flex items-center gap-4">
              <span className="block w-12 h-px bg-gold" />
              <p className="text-charcoal-lighter text-sm font-sans font-light">
                Her mesajınız bize ayrıcalıklıdır.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24 pb-24
                        grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">

          {/* ── Left: Info ── */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-12 pt-2"
          >
            {/* Contact details */}
            <div className="space-y-8">
              <div>
                <p className="section-overline text-gold mb-3">Telefon</p>
                <a href="tel:+903124264666" className="block text-charcoal font-sans font-light text-sm leading-relaxed hover:text-gold transition-colors duration-200">
                  +90 (312) 426 46 66
                </a>
                <a href="tel:+905323999944" className="block text-charcoal font-sans font-light text-sm leading-relaxed hover:text-gold transition-colors duration-200">
                  +90 (532) 399 99 44
                </a>
              </div>
              <div>
                <p className="section-overline text-gold mb-3">E-posta</p>
                <a href="mailto:info@onrmucevherat.com" className="block text-charcoal font-sans font-light text-sm leading-relaxed hover:text-gold transition-colors duration-200">
                  info@onrmucevherat.com
                </a>
              </div>
              <div>
                <p className="section-overline text-gold mb-3">Adres</p>
                <p className="text-charcoal font-sans font-light text-sm leading-relaxed">
                  Güvenlik Caddesi 34/A, A.Ayrancı,<br />
                  ÇANKAYA, ANKARA.
                </p>
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="section-overline text-gold mb-4">Sosyal Medya</p>
              <a
                href="https://www.instagram.com/onrmucevherat/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group py-2 border-b border-ivory-200"
              >
                <span className="text-[9px] text-charcoal-lighter tracking-luxury uppercase font-sans">
                  Instagram
                </span>
                <span className="text-[10px] text-charcoal group-hover:text-gold font-sans font-light transition-colors duration-200">
                  @onrmucevherat
                </span>
              </a>
            </div>

            {/* Branches shortcut */}
            <Link
              href="/subelerimiz"
              className="flex items-center gap-3 text-[9px] text-charcoal-lighter
                         hover:text-gold transition-colors duration-300 tracking-luxury uppercase font-sans"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Tüm Şubelerimizi Görün
            </Link>
          </motion.aside>

          {/* ── Right: Form (Letterhead style) ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {/* Letterhead top border decoration */}
            <div className="flex items-center gap-3 mb-10">
              <span className="block flex-1 h-px bg-gold/20" />
              <span className="text-[9px] text-gold/50 tracking-luxury-wide uppercase font-sans">
                ONR Mücevherat — İletişim Formu
              </span>
              <span className="block flex-1 h-px bg-gold/20" />
            </div>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-14 h-14 border border-gold mx-auto flex items-center justify-center mb-7">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="1.4" className="text-gold">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="font-serif font-light text-charcoal text-3xl mb-4">
                  Mesajınız İletildi
                </h2>
                <p className="text-charcoal-lighter text-sm font-sans font-light max-w-sm mx-auto leading-relaxed">
                  En kısa sürede size dönüş yapacağız. Değerli zamanınız için teşekkür ederiz.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block section-overline text-charcoal-lighter mb-3">
                      Adınız Soyadınız <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ad Soyad"
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label className="block section-overline text-charcoal-lighter mb-3">
                      E-posta <span className="text-gold">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com"
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* Phone + Subject row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block section-overline text-charcoal-lighter mb-3">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+90 5XX XXX XX XX"
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label className="block section-overline text-charcoal-lighter mb-3">
                      Konu
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className={`${inputBase} appearance-none cursor-pointer`}
                    >
                      <option value="">Konu Seçin</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block section-overline text-charcoal-lighter mb-3">
                    Mesajınız <span className="text-gold">*</span>
                  </label>
                  <textarea
                    required
                    rows={7}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Merhaba, ..."
                    className={`${inputBase} resize-none border border-b-0 border-charcoal/10
                                 border-b-charcoal/15 focus:border-gold focus:border-b-gold
                                 p-4`}
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center justify-between pt-2">
                  <p className="text-[9px] text-charcoal-lighter/50 font-sans font-light">
                    * Zorunlu alanlar
                  </p>
                  <button type="submit" className="btn-luxury-filled text-[10px] py-3.5 px-10">
                    Gönder
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>

                {/* Bottom letterhead line */}
                <div className="border-t border-gold/15 pt-6 flex items-center justify-between">
                  <p className="text-[8px] text-charcoal-lighter/40 font-sans tracking-widest uppercase">
                    ONR Mücevherat © {new Date().getFullYear()}
                  </p>
                  <p className="text-[8px] text-charcoal-lighter/40 font-sans tracking-widest uppercase">
                    Ankara, Türkiye
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </PageWrapper>
  );
}
