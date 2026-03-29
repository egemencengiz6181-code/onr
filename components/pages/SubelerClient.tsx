"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
interface Branch {
  id: number;
  tag: string;
  name: string;
  address: string;
  phone: string | null;
  whatsapp: string;
  whatsappRaw: string; // digits only for wa.me
  email: string;
  hours: string;
  mapEmbed: string;
  mapDirections: string;
}

const HOURS = "Pazartesi – Cumartesi: 09:30 – 18:30 · Pazar: Kapalı";
const EMAIL = "info@onrmucevherat.com";

const branches: Branch[] = [
  {
    id: 1,
    tag: "Flagship",
    name: "ONR Mücevherat",
    address: "Güvenlik Caddesi 34/A, A.Ayrancı, Çankaya / Ankara",
    phone: "+90 (312) 426 46 66",
    whatsapp: "+90 (532) 399 99 44",
    whatsappRaw: "905323999944",
    email: EMAIL,
    hours: HOURS,
    mapEmbed:
      "https://maps.google.com/maps?q=G%C3%BCvenlik+Caddesi+34%2FA+Ayranc%C4%B1+%C3%87ankaya+Ankara&output=embed&hl=tr",
    mapDirections:
      "https://www.google.com/maps/dir/?api=1&destination=G%C3%BCvenlik+Caddesi+34%2FA+Ayranc%C4%B1+%C3%87ankaya+Ankara",
  },
  {
    id: 2,
    tag: "Exclusive",
    name: "ONR Mücevherat Exclusive",
    address: "İran Cad., Tunalı Hilmi Cd. No:13/2-3, Çankaya / Ankara",
    phone: "+90 (312) 427 46 66",
    whatsapp: "+90 (507) 626 46 66",
    whatsappRaw: "905076264666",
    email: EMAIL,
    hours: HOURS,
    mapEmbed:
      "https://maps.google.com/maps?q=Tunal%C4%B1+Hilmi+Cd.+No:13+%C3%87ankaya+Ankara&output=embed&hl=tr",
    mapDirections:
      "https://www.google.com/maps/dir/?api=1&destination=Tunal%C4%B1+Hilmi+Cd.+13%2F2-3+%C3%87ankaya+Ankara",
  },
  {
    id: 3,
    tag: "Mağaza",
    name: "ONR Kuyumculuk & Mücevherat",
    address: "Ayrancı, Güvenlik Cd. No:12/C, 06540 Çankaya / Ankara",
    phone: "+90 (312) 468 81 06",
    whatsapp: "+90 (540) 468 81 06",
    whatsappRaw: "905404688106",
    email: EMAIL,
    hours: HOURS,
    mapEmbed:
      "https://maps.google.com/maps?q=G%C3%BCvenlik+Cd.+12%2FC+Ayranc%C4%B1+%C3%87ankaya+Ankara&output=embed&hl=tr",
    mapDirections:
      "https://www.google.com/maps/dir/?api=1&destination=G%C3%BCvenlik+Cd.+12%2FC+Ayranc%C4%B1+%C3%87ankaya+Ankara",
  },
  {
    id: 4,
    tag: "Şile",
    name: "ONR Kuyumculuk & Mücevherat — Şile",
    address: "Çavuş Mah., Üsküdar Cad. Şile Meydanı, 34980 Şile / İstanbul",
    phone: "+90 (554) 874 14 96",
    whatsapp: "+90 (554) 874 14 96",
    whatsappRaw: "905548741496",
    email: EMAIL,
    hours: HOURS,
    mapEmbed:
      "https://maps.google.com/maps?q=%C5%9Eile+Meydanı+%C3%9Csk%C3%BCdar+Cad+34980+%C5%9Eile+%C4%B0stanbul&output=embed&hl=tr",
    mapDirections:
      "https://www.google.com/maps/dir/?api=1&destination=%C5%9Eile+Meydanı+%C3%9Csk%C3%BCdar+Cad+34980+%C5%9Eile+%C4%B0stanbul",
  },
];

const timeSlots = [
  "09:30","10:00","10:30","11:00","11:30","12:00","12:30",
  "13:00","13:30","14:00","14:30","15:00","15:30","16:00",
  "16:30","17:00","17:30","18:00",
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

/* ─────────────────────────────────────────────
   Appointment Modal
───────────────────────────────────────────── */
function AppointmentModal({
  branch,
  onClose,
}: {
  branch: Branch;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", date: "", time: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-onyx/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.35, ease }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#FAF9F6] max-h-[90vh] overflow-y-auto"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-charcoal/40 hover:text-charcoal transition-colors duration-200 z-10"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 sm:p-10">
          {!submitted ? (
            <>
              <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2">
                Randevu Talebi
              </p>
              <h2 className="font-serif text-charcoal text-2xl mb-1">
                {branch.name}
              </h2>
              <p className="text-charcoal/40 font-sans text-[12px] mb-8">
                {branch.address}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-charcoal/50 font-sans">
                    Ad Soyad <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={set("name")}
                    className="w-full border-0 border-b border-charcoal/15 bg-transparent pb-2 text-[14px] text-charcoal font-sans font-light focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-charcoal/25"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-charcoal/50 font-sans">
                    Telefon <span className="text-gold">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={set("phone")}
                    className="w-full border-0 border-b border-charcoal/15 bg-transparent pb-2 text-[14px] text-charcoal font-sans font-light focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-charcoal/25"
                    placeholder="+90 5XX XXX XX XX"
                  />
                </div>
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-charcoal/50 font-sans">
                    E-Posta
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    className="w-full border-0 border-b border-charcoal/15 bg-transparent pb-2 text-[14px] text-charcoal font-sans font-light focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-charcoal/25"
                    placeholder="ornek@email.com"
                  />
                </div>
                {/* Date + Time */}
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-charcoal/50 font-sans">
                      Tarih <span className="text-gold">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={form.date}
                      onChange={set("date")}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full border-0 border-b border-charcoal/15 bg-transparent pb-2 text-[14px] text-charcoal font-sans font-light focus:outline-none focus:border-gold transition-colors duration-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-charcoal/50 font-sans">
                      Saat <span className="text-gold">*</span>
                    </label>
                    <select
                      required
                      value={form.time}
                      onChange={set("time")}
                      className="w-full border-0 border-b border-charcoal/15 bg-transparent pb-2 text-[14px] text-charcoal font-sans font-light focus:outline-none focus:border-gold transition-colors duration-300 cursor-pointer"
                    >
                      <option value="">Seçin</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Notes */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-charcoal/50 font-sans">
                    Notlar
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={set("notes")}
                    rows={3}
                    className="w-full border-0 border-b border-charcoal/15 bg-transparent pb-2 text-[14px] text-charcoal font-sans font-light focus:outline-none focus:border-gold transition-colors duration-300 resize-none placeholder:text-charcoal/25"
                    placeholder="Ziyaret amacınız veya özel bir talebiniz..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-onyx text-ivory text-[11px] tracking-[0.2em] uppercase py-4 hover:bg-charcoal transition-colors duration-300 font-sans mt-2"
                >
                  Randevu Gönder
                </button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="w-12 h-12 border border-gold mx-auto flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6 text-gold">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="font-serif text-charcoal text-2xl mb-3">Talebiniz Alındı</h3>
              <p className="text-charcoal/50 font-sans font-light text-[13px] leading-[1.8] max-w-xs mx-auto mb-8">
                En kısa sürede ekibimiz size geri dönecektir. Randevunuzu{" "}
                <strong className="text-charcoal">{form.date}</strong> tarihinde{" "}
                <strong className="text-charcoal">{form.time}</strong> olarak planlıyoruz.
              </p>
              <button
                onClick={onClose}
                className="text-[10px] tracking-[0.2em] uppercase text-charcoal/50 hover:text-gold border-b border-charcoal/20 hover:border-gold/40 pb-0.5 transition-all duration-300 font-sans"
              >
                Kapat
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function SubelerClient() {
  const [activeBranch, setActiveBranch] = useState<Branch | null>(null);

  return (
    <main className="min-h-screen bg-[#FAF9F6]">

      {/* ── Hero ──────────────────────────────── */}
      <section className="pt-36 pb-16 lg:pt-44 lg:pb-20 px-8 lg:px-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4"
        >
          Bizi Ziyaret Edin
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease }}
          className="font-serif text-charcoal text-4xl lg:text-5xl mb-6"
        >
          Şubelerimiz
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-12 h-px bg-gold mx-auto mb-8"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="max-w-lg mx-auto text-charcoal/50 font-sans font-light text-[14px] leading-[1.9]"
        >
          Ankara&apos;nın &amp; Şile&apos;nin dört prestijli noktasında sizi ağırlıyoruz.
          Uzmanlarımız size özel bir deneyim sunmak için hazır.
        </motion.p>
      </section>

      {/* ── Branch Grid ───────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-8 lg:px-20 pb-20 lg:pb-28 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {branches.map((branch, i) => (
          <motion.div
            key={branch.id}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.8, delay: 0.1 * (i % 2), ease }}
            className="group border border-charcoal/8 hover:border-gold/30 hover:shadow-[0_0_24px_0_rgba(201,168,76,0.08)] transition-all duration-500 overflow-hidden"
          >
            {/* ── Map iframe ── */}
            <div className="relative h-56 overflow-hidden bg-charcoal/5">
              <iframe
                src={branch.mapEmbed}
                title={`${branch.name} harita`}
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-700 scale-[1.02] group-hover:scale-110"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Tag badge */}
              <div className="absolute top-3 left-3 z-10 pointer-events-none">
                <span
                  className="bg-onyx/90 backdrop-blur-sm text-ivory text-[8px] tracking-[0.25em] uppercase px-3 py-1.5 font-sans"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}
                >
                  {branch.tag}
                </span>
              </div>
            </div>

            {/* ── Card Info ── */}
            <div className="p-7 lg:p-8 space-y-6">
              {/* Name */}
              <div>
                <h2 className="font-serif text-charcoal text-xl lg:text-2xl tracking-wide leading-snug">
                  {branch.name}
                </h2>
              </div>

              {/* Details */}
              <div className="space-y-3">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <p className="text-charcoal/55 font-sans font-light text-[12px] leading-[1.7]">
                    {branch.address}
                  </p>
                </div>
                {/* Phone */}
                {branch.phone && (
                  <div className="flex items-center gap-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-3.5 h-3.5 text-gold shrink-0">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 2a2 2 0 011.72-2L7 0a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.9a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    <a
                      href={`tel:${branch.phone.replace(/[\s()-]/g, "")}`}
                      className="text-charcoal/70 font-sans text-[12px] hover:text-gold transition-colors duration-200"
                    >
                      {branch.phone}
                    </a>
                  </div>
                )}
                {/* WhatsApp */}
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-3.5 h-3.5 text-gold shrink-0">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                  <a
                    href={`https://wa.me/${branch.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal/70 font-sans text-[12px] hover:text-gold transition-colors duration-200"
                  >
                    {branch.whatsapp}
                  </a>
                </div>
                {/* Hours */}
                <div className="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <p className="text-charcoal/55 font-sans font-light text-[12px] leading-[1.7]">
                    {branch.hours}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
                <button
                  onClick={() => setActiveBranch(branch)}
                  className="bg-onyx text-ivory text-[10px] tracking-[0.2em] uppercase px-7 py-3 border border-onyx hover:bg-ivory hover:text-onyx transition-all duration-300 font-sans"
                >
                  Randevu Al
                </button>
                <a
                  href={branch.mapDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-charcoal/50 hover:text-gold border-b border-charcoal/20 hover:border-gold/40 pb-0.5 transition-all duration-300 font-sans"
                >
                  Yol Tarifi Al
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ── Mağaza İçi Servisler Banner ───────── */}
      <section className="w-full bg-[#F7F2E8] px-8 lg:px-20 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-10 h-px bg-gold mx-auto mb-8"
          />
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-5 font-sans">
            Mağaza İçi Servisler
          </p>
          <h2 className="font-serif text-charcoal text-3xl lg:text-4xl leading-snug mb-7">
            Uzman Ellere Emanet
          </h2>
          <p className="font-sans font-light text-charcoal/60 text-[14px] leading-[1.9] max-w-lg mx-auto mb-10">
            Tüm şubelerimizde profesyonel temizlik, parlatma ve taş kontrolü
            hizmeti sunmaktayız. Mücevherinizi uzman ellerimize emanet edin.
          </p>
          <Link
            href="/bakim-ve-onarim"
            className="inline-block bg-onyx text-ivory text-[10px] tracking-[0.22em] uppercase px-10 py-3.5 hover:bg-charcoal transition-colors duration-300 font-sans"
          >
            Servis Detayları
          </Link>
        </motion.div>
      </section>

      {/* ── Private Appointment CTA ───────────── */}
      <section className="bg-onyx px-8 lg:px-20 py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease }}
          className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div>
            <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4">
              Özel Hizmet
            </p>
            <h2 className="font-serif text-white text-3xl lg:text-4xl mb-3">
              Kapalı Kapı Deneyimi
            </h2>
            <p className="text-zinc-300 font-sans font-light text-[13px] leading-[1.85] max-w-md">
              Mesai saatleri dışında özel bir görüşme ayarlayın. Sadece sizin için ayrılmış
              bir zaman diliminde koleksiyonumuzu keşfedin.
            </p>
          </div>
          <button
            onClick={() => setActiveBranch(branches[0])}
            className="shrink-0 border border-gold text-gold px-10 py-3.5 text-[11px] tracking-[0.2em] uppercase hover:bg-gold hover:text-onyx transition-all duration-300 font-sans"
          >
            Özel Randevu Al
          </button>
        </motion.div>
      </section>

      {/* ── Appointment Modal ─────────────────── */}
      <AnimatePresence>
        {activeBranch && (
          <AppointmentModal
            branch={activeBranch}
            onClose={() => setActiveBranch(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
