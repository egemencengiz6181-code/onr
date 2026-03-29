"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/cartStore";

const GOLD = "#D4AF37";

interface Props {
  product: Product;
}

/* ─── Accordion ─────────────────────────────────────────── */
function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{ borderBottom: `1px solid ${GOLD}15` }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left transition-colors duration-300"
      >
        <span
          className="text-[9px] tracking-[0.42em] uppercase font-sans"
          style={{ color: open ? GOLD : "rgba(255,255,255,0.55)" }}
        >
          {title}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 ml-4"
          style={{ color: open ? GOLD : "rgba(255,255,255,0.3)" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}
          >
            <div className="pb-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Inquiry Modal ──────────────────────────────────────── */
function InquiryModal({
  productName,
  onClose,
}: {
  productName: string;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const lineStyle: React.CSSProperties = { borderBottom: `1px solid ${GOLD}22` };
  const inputClass =
    "w-full bg-transparent py-3 outline-none font-sans font-light text-sm " +
    "placeholder-white/20 text-white/65 transition-all duration-300";

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
    >
      <motion.div
        className="relative w-full sm:max-w-lg mx-4 sm:mx-auto p-10 sm:p-14"
        style={{ backgroundColor: "#0e0e0e", border: `1px solid ${GOLD}22`, maxHeight: "90vh", overflowY: "auto" }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/25 hover:text-white/60 transition-colors"
          aria-label="Kapat"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {sent ? (
          <div className="text-center py-8 space-y-4">
            <p className="text-[8px] tracking-[0.55em] uppercase font-sans" style={{ color: GOLD }}>Talebiniz Alındı</p>
            <h3 className="font-serif font-light text-3xl" style={{ color: GOLD }}>Teşekkürler</h3>
            <p className="text-[13px] font-sans font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.33)" }}>
              Uzman danışmanımız 24 saat içinde sizinle iletişime geçecektir.
            </p>
            <button
              onClick={onClose}
              className="mt-8 text-[8px] tracking-[0.42em] uppercase font-sans px-10 py-3 transition-all duration-300"
              style={{ border: `1px solid ${GOLD}32`, color: GOLD }}
            >
              Kapat
            </button>
          </div>
        ) : (
          <>
            <p className="text-[8px] tracking-[0.55em] uppercase font-sans mb-2" style={{ color: `${GOLD}60` }}>
              Fiyat Teklifi & Danışmanlık
            </p>
            <h3 className="font-serif font-light text-3xl mb-2" style={{ color: GOLD }}>Özel Görüşme</h3>
            <p className="text-[11px] font-sans font-light leading-relaxed mb-9" style={{ color: "rgba(255,255,255,0.28)" }}>
              <span style={{ color: `${GOLD}70` }}>{productName}</span> için kişisel danışmanlık ve fiyat teklifi.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-7">
              {[
                { key: "name", label: "Adınız Soyadınız", type: "text", placeholder: "Ad Soyad" },
                { key: "phone", label: "Telefon", type: "tel", placeholder: "+90 5XX XXX XX XX" },
                { key: "email", label: "E-Posta", type: "email", placeholder: "ad@email.com" },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label
                    className="block text-[7.5px] tracking-[0.45em] uppercase font-sans mb-2"
                    style={{ color: "rgba(255,255,255,0.28)" }}
                  >
                    {label} <span style={{ color: GOLD }}>*</span>
                  </label>
                  <input
                    type={type}
                    required
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className={inputClass}
                    style={lineStyle}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = `${GOLD}65`)}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = `${GOLD}22`)}
                  />
                </div>
              ))}
              <div>
                <label
                  className="block text-[7.5px] tracking-[0.45em] uppercase font-sans mb-2"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                >
                  Mesajınız
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Özel notunuz..."
                  className={inputClass + " resize-none"}
                  style={lineStyle}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = `${GOLD}65`)}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = `${GOLD}22`)}
                />
              </div>
              <motion.button
                type="submit"
                className="w-full py-4 text-[9px] tracking-[0.45em] uppercase font-sans mt-2 transition-colors duration-300"
                style={{ backgroundColor: GOLD, color: "#000" }}
                whileHover={{ backgroundColor: "#c4a030" }}
              >
                Teklif Al
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function ExclusiveDetailClient({ product }: Props) {
  const [activeImg, setActiveImg] = useState(0);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const { openCart, totalItems } = useCartStore();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Navbar */}
      <header
        className="fixed top-0 inset-x-0 z-[60]"
        style={{
          backgroundColor: "rgba(10,10,10,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${GOLD}15`,
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-[68px]">
            <Link
              href="/exclusive/koleksiyon"
              className="flex items-center gap-3 group"
              style={{ color: `${GOLD}50` }}
            >
              <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </motion.span>
              <span className="hidden sm:block text-[8px] tracking-[0.35em] uppercase font-sans group-hover:text-[#D4AF37] transition-colors duration-300">
                Koleksiyon
              </span>
            </Link>

            <Link href="/" className="absolute left-1/2 -translate-x-1/2" aria-label="ONR Mücevherat — Ana Sayfa">
              <Image
                src="/images/logo/onr-logo-beyaz.png"
                alt="ONR Mücevherat"
                width={100}
                height={36}
                className="object-contain"
              />
            </Link>

            <button
              onClick={openCart}
              className="relative p-1 transition-colors duration-300"
              style={{ color: `${GOLD}50` }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.color = `${GOLD}50`)}
              aria-label="Sepet"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {totalItems() > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-[7px]
                             text-black flex items-center justify-center font-sans font-medium"
                  style={{ backgroundColor: GOLD }}
                >
                  {totalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-[68px] max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row min-h-screen">

          {/* ── Left: Images ── */}
          <div className="w-full lg:w-[55%] lg:sticky lg:top-[68px] lg:self-start lg:h-[calc(100vh-68px)]">
            {/* Main image */}
            <div className="relative aspect-[4/5] lg:h-[75%] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  {product.images[activeImg] && (
                    <Image
                      src={product.images[activeImg].src}
                      alt={product.images[activeImg].alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover object-center"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Edition badge */}
              <div
                className="absolute top-6 left-6 z-10 px-3 py-1.5"
                style={{
                  backgroundColor: "rgba(0,0,0,0.65)",
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${GOLD}20`,
                }}
              >
                <span className="text-[7.5px] tracking-[0.45em] uppercase font-sans" style={{ color: `${GOLD}80` }}>
                  {product.limitedPieces === 1 ? "Tek Adet" : `${product.limitedPieces} Adet Üretim`}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 px-6 py-5 lg:px-8">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="relative w-16 h-16 overflow-hidden shrink-0 transition-all duration-300"
                    style={{
                      border: i === activeImg ? `1px solid ${GOLD}` : `1px solid ${GOLD}18`,
                      opacity: i === activeImg ? 1 : 0.5,
                    }}
                  >
                    <Image src={img.src} alt={img.alt} fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Details ── */}
          <div className="w-full lg:w-[45%] px-8 md:px-12 lg:px-16 xl:px-20 py-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
              className="space-y-8"
            >
              {/* Overline */}
              <p
                className="text-[8px] tracking-[0.58em] uppercase font-sans"
                style={{ color: `${GOLD}50` }}
              >
                Exclusive Collection — ONR
              </p>

              {/* Name */}
              <h1
                className="font-serif font-light tracking-[0.07em] leading-[1.02]"
                style={{ color: GOLD, fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
              >
                {product.name}
              </h1>

              {/* Short desc */}
              <p
                className="text-[9px] tracking-[0.32em] uppercase font-sans"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {product.shortDescription}
              </p>

              {/* Gold rule */}
              <div className="flex items-center gap-3">
                <span className="block w-10 h-px" style={{ background: `${GOLD}40` }} />
                <span className="block w-1 h-1 rotate-45" style={{ background: `${GOLD}40` }} />
              </div>

              {/* Description */}
              <p
                className="font-sans font-light text-[13px] leading-[2.0] tracking-wide"
                style={{ color: "rgba(255,255,255,0.42)" }}
              >
                {product.description}
              </p>

              {/* Price note */}
              <div
                className="flex items-center gap-4 py-5 px-6"
                style={{ border: `1px solid ${GOLD}15`, backgroundColor: `${GOLD}05` }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-[9px] tracking-wider font-sans" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Fiyat bilgisi yalnızca talep üzerine paylaşılmaktadır.
                </p>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-2">
                <motion.button
                  onClick={() => setInquiryOpen(true)}
                  className="flex items-center justify-center gap-3 w-full
                             text-[9px] tracking-[0.42em] uppercase font-sans
                             py-4 transition-colors duration-300"
                  style={{ backgroundColor: GOLD, color: "#000" }}
                  whileHover={{ backgroundColor: "#c4a030" }}
                >
                  Fiyat Teklifi Al
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.button>

                <motion.button
                  onClick={() => setInquiryOpen(true)}
                  className="flex items-center justify-center gap-3 w-full
                             text-[9px] tracking-[0.42em] uppercase font-sans
                             py-4 transition-colors duration-300"
                  style={{ border: `1px solid ${GOLD}35`, color: GOLD }}
                  whileHover={{ borderColor: GOLD, backgroundColor: `${GOLD}08` }}
                >
                  Özel Danışmanla Görüş
                </motion.button>
              </div>

              {/* Materials */}
              <div className="flex flex-wrap gap-2 pt-1">
                {product.materials.map((m) => (
                  <span
                    key={m}
                    className="text-[7.5px] tracking-widest uppercase font-sans px-3 py-1.5"
                    style={{ border: `1px solid ${GOLD}18`, color: `${GOLD}55` }}
                  >
                    {m}
                  </span>
                ))}
              </div>

              {/* Accordions */}
              <div className="mt-4" style={{ borderTop: `1px solid ${GOLD}15` }}>
                {product.stoneSpecs.length > 0 && (
                  <Accordion title="Taş Özellikleri" defaultOpen>
                    <div className="space-y-3">
                      {product.stoneSpecs.map((s) => (
                        <div key={s.label} className="flex justify-between">
                          <span className="text-[8px] tracking-widest uppercase font-sans" style={{ color: "rgba(255,255,255,0.28)" }}>
                            {s.label}
                          </span>
                          <span className="text-[12px] font-sans font-light" style={{ color: "rgba(255,255,255,0.62)" }}>
                            {s.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Accordion>
                )}

                {product.karatDetails.length > 0 && (
                  <Accordion title="Metal & Üretim">
                    <div className="space-y-3">
                      {product.karatDetails.map((s) => (
                        <div key={s.label} className="flex justify-between">
                          <span className="text-[8px] tracking-widest uppercase font-sans" style={{ color: "rgba(255,255,255,0.28)" }}>
                            {s.label}
                          </span>
                          <span className="text-[12px] font-sans font-light" style={{ color: "rgba(255,255,255,0.62)" }}>
                            {s.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Accordion>
                )}

                {product.certificateInfo.length > 0 && (
                  <Accordion title="Sertifika & Orijinallik">
                    <div className="space-y-3">
                      {product.certificateInfo.map((s) => (
                        <div key={s.label} className="flex justify-between">
                          <span className="text-[8px] tracking-widest uppercase font-sans" style={{ color: "rgba(255,255,255,0.28)" }}>
                            {s.label}
                          </span>
                          <span className="text-[12px] font-sans font-light text-right max-w-[55%]" style={{ color: "rgba(255,255,255,0.62)" }}>
                            {s.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Accordion>
                )}

                <Accordion title="Teslimat & Gizlilik">
                  <div className="space-y-3 text-[12px] font-sans font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                    <p>Tüm Exclusive parçalar şifreli ve sigortalı özel kurye ile teslim edilir.</p>
                    <p>Teslim süresi: Talep onayından itibaren 7-14 iş günü.</p>
                    <p>Her parça, imzalı ve mühürlü sertifikasıyla birlikte gelir.</p>
                    <p>Alım sürecinde tam gizlilik garantisi verilmektedir.</p>
                  </div>
                </Accordion>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {inquiryOpen && (
          <InquiryModal
            key="inquiry"
            productName={product.name}
            onClose={() => setInquiryOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
