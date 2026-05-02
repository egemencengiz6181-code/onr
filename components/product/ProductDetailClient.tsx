"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/cartStore";
import { getRelatedProducts, products } from "@/lib/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import PearlCareBanner from "@/components/product/PearlCareBanner";

/* ─── Animation Helpers ──────────────────────────────────────────── */
const ease = [0.25, 0.46, 0.45, 0.94];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/* ─── Accordion (Cartier-style thin lines + plus icon) ───────────── */
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
    <div className="border-b border-[#1A1A1A]/[0.07]">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 group"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase font-sans font-medium text-[#1A1A1A]/55 group-hover:text-gold transition-colors duration-300">
          {title}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.35, ease }}
          className="text-[#1A1A1A]/30 group-hover:text-gold transition-colors duration-300 shrink-0 ml-4"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
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
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <div className="pb-7">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Lightbox ───────────────────────────────────────────────────── */
function Lightbox({
  images,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: { src: string; alt: string }[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-2xl" onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-3xl mx-6"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.42, ease }}
      >
        <div className="relative" style={{ aspectRatio: "4/5", maxHeight: "82vh" }}>
          <Image src={images[activeIndex].src} alt={images[activeIndex].alt} fill sizes="90vw" className="object-contain" priority />
        </div>
        <p className="text-center text-[8px] text-white/30 tracking-[0.3em] uppercase font-sans mt-5">
          {images[activeIndex].alt} — {activeIndex + 1} / {images.length}
        </p>
      </motion.div>

      <button onClick={onClose} aria-label="Kapat" className="absolute top-6 right-6 z-20 text-white/40 hover:text-white/80 transition-colors p-2">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>
      {images.length > 1 && (
        <>
          <button onClick={onPrev} disabled={activeIndex === 0} aria-label="Önceki" className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/60 hover:bg-white/15 hover:text-white hover:border-white/40 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none backdrop-blur-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button onClick={onNext} disabled={activeIndex === images.length - 1} aria-label="Sonraki" className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/60 hover:bg-white/15 hover:text-white hover:border-white/40 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none backdrop-blur-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </>
      )}
      {images.length > 1 && (
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
          {images.map((_, i) => (
            <span key={i} className={`block transition-all duration-300 ${i === activeIndex ? "w-6 h-px bg-gold" : "w-1 h-1 rounded-full bg-white/25"}`} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─── Personalization Modal ──────────────────────────────────────── */
function PersonalizationModal({ productName, onClose }: { productName: string; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const inputBase =
    "w-full bg-transparent border-b border-[#1A1A1A]/10 focus:border-gold text-[#1A1A1A] font-sans font-light text-[13px] py-2.5 outline-none placeholder-[#1A1A1A]/22 transition-colors duration-300";

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="absolute inset-0 bg-[#1A1A1A]/55 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative z-10 bg-[#FAF9F6] w-full sm:max-w-[480px] mx-0 sm:mx-4 px-9 py-12 overflow-y-auto max-h-[92vh] sm:max-h-[88vh]"
          initial={{ y: 56, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 56, opacity: 0 }}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        >
          <button onClick={onClose} aria-label="Kapat" className="absolute top-5 right-5 text-[#1A1A1A]/25 hover:text-[#1A1A1A]/70 transition-colors p-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
          <div className="flex items-center gap-3 mb-9">
            <span className="flex-1 h-px bg-gold/18" /><span className="text-gold/45 text-[10px]">&#9670;</span><span className="flex-1 h-px bg-gold/18" />
          </div>
          {sent ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
              <div className="w-10 h-10 border border-gold/60 mx-auto flex items-center justify-center mb-6">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h3 className="font-serif font-light text-[#1A1A1A] text-[1.7rem] mb-3">Talebiniz Alındı</h3>
              <p className="text-[#1A1A1A]/42 text-[12px] font-sans font-light leading-relaxed">Kişiselleştirme uzmanımız en kısa sürede sizinle iletişime geçecektir.</p>
              <button onClick={onClose} className="mt-8 text-[8px] tracking-[0.3em] uppercase font-sans border border-[#1A1A1A]/15 text-[#1A1A1A]/45 py-3 px-8 hover:border-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 transition-all duration-300">Kapat</button>
            </motion.div>
          ) : (
            <>
              <p className="text-[8px] tracking-[0.35em] uppercase font-sans text-gold mb-3">Kişiselleştirme</p>
              <h3 className="font-serif font-light text-[#1A1A1A] text-[1.85rem] leading-tight mb-2">Bu Mücevheri Sizin İçin Hazırlayalım</h3>
              <p className="text-[#1A1A1A]/38 text-[11px] font-sans font-light leading-relaxed mb-1 italic">{productName}</p>
              <p className="text-[#1A1A1A]/40 text-[11.5px] font-sans font-light leading-relaxed mb-9">Gravür, beden uyarlaması veya özel taş seçimi için uzmanımızı bilgilendirin.</p>
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-6">
                <div>
                  <label className="block text-[7.5px] tracking-[0.28em] uppercase text-[#1A1A1A]/35 font-sans mb-2">Adınız Soyadınız <span className="text-gold/70">*</span></label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ad Soyad" className={inputBase} />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[7.5px] tracking-[0.28em] uppercase text-[#1A1A1A]/35 font-sans mb-2">Telefon <span className="text-gold/70">*</span></label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+90 5XX XXX XX XX" className={inputBase} />
                  </div>
                  <div>
                    <label className="block text-[7.5px] tracking-[0.28em] uppercase text-[#1A1A1A]/35 font-sans mb-2">E-posta</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" className={inputBase} />
                  </div>
                </div>
                <div>
                  <label className="block text-[7.5px] tracking-[0.28em] uppercase text-[#1A1A1A]/35 font-sans mb-2">Kişiselleştirme Notunuz</label>
                  <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Gravür metni, beden talebi, renk tercihi…" className={inputBase + " resize-none"} />
                </div>
                <div className="flex items-center gap-4 pt-1">
                  <button type="submit" className="flex-1 bg-[#1A1A1A] text-[#FAF9F6] text-[8.5px] tracking-[0.28em] uppercase font-sans font-medium py-4 hover:bg-[#1A1A1A]/80 transition-colors duration-300 flex items-center justify-center">Talep Gönder</button>
                  <button type="button" onClick={onClose} className="text-[8px] text-[#1A1A1A]/28 hover:text-[#1A1A1A]/55 tracking-[0.25em] uppercase font-sans transition-colors shrink-0">İptal</button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Ring Size Guide Modal ──────────────────────────────────────── */
const ringSizeData = [
  { tr: 10, cevre: 50, cap: "15.92" },
  { tr: 11, cevre: 51, cap: "16.24" },
  { tr: 12, cevre: 52, cap: "16.56" },
  { tr: 13, cevre: 53, cap: "16.88" },
  { tr: 14, cevre: 54, cap: "17.20" },
  { tr: 15, cevre: 55, cap: "17.52" },
  { tr: 16, cevre: 56, cap: "17.84" },
  { tr: 17, cevre: 57, cap: "18.16" },
  { tr: 18, cevre: 58, cap: "18.48" },
  { tr: 19, cevre: 59, cap: "18.80" },
  { tr: 20, cevre: 60, cap: "19.10" },
];

function RingSizeGuideModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div className="absolute inset-0 bg-[#1A1A1A]/55 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative z-10 bg-[#FAF9F6] w-full sm:max-w-[520px] mx-0 sm:mx-4 px-8 py-11 overflow-y-auto max-h-[90vh]"
          initial={{ y: 56, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 56, opacity: 0 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Kapat"
            className="absolute top-5 right-5 text-[#1A1A1A]/25 hover:text-[#1A1A1A]/70 transition-colors p-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Gold ornament */}
          <div className="flex items-center gap-3 mb-8">
            <span className="flex-1 h-px bg-gold/18" />
            <span className="text-gold/45 text-[10px]">&#9670;</span>
            <span className="flex-1 h-px bg-gold/18" />
          </div>

          <p className="text-[8px] tracking-[0.35em] uppercase font-sans text-gold mb-3">Ölçü Rehberi</p>
          <h3 className="font-serif font-light text-[#1A1A1A] text-[1.85rem] leading-tight mb-2">
            Türk Yüzük Ölçüleri
          </h3>
          <p className="text-[#1A1A1A]/40 text-[11.5px] font-sans font-light leading-relaxed mb-8">
            İnce bir kağıt şeridi parmağınıza sarın, işaretleyin ve mm cinsinden ölçün.
            Ölçünüzü aşağıdaki çevre sütunuyla eşleştirin.
          </p>

          {/* Measurement steps */}
          <ol className="space-y-4 mb-8">
            {[
              "İnce kağıt şeridi parmak orta boğumuna sıkıca sarın.",
              "Şeridin uçlarının kesiştiği noktayı işaretleyin.",
              "Cetvelle mm cinsinden ölçün — bu değer çevrenizdir.",
              "Aşağıdaki tablodan Türk bedeninizi bulun.",
            ].map((s, i) => (
              <li key={i} className="flex items-start gap-3.5">
                <span className="font-serif text-gold/50 text-lg leading-none mt-0.5 shrink-0 w-5">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[12px] text-[#1A1A1A]/55 font-sans font-light leading-relaxed">{s}</span>
              </li>
            ))}
          </ol>

          {/* Size table — horizontal scroll on mobile */}
          <div className="overflow-x-auto -mx-8 px-8">
            <table className="w-full min-w-[360px] border-collapse">
              <thead>
                <tr className="border-b border-zinc-200">
                  <th className="text-left py-3 pr-6 text-[9px] text-[#1A1A1A]/30 tracking-[0.3em] uppercase font-sans font-normal">Ölçü (TR)</th>
                  <th className="text-left py-3 pr-6 text-[9px] text-[#1A1A1A]/30 tracking-[0.3em] uppercase font-sans font-normal">Çevre (mm)</th>
                  <th className="text-left py-3 text-[9px] text-[#1A1A1A]/30 tracking-[0.3em] uppercase font-sans font-normal">Çap (mm)</th>
                </tr>
              </thead>
              <tbody>
                {ringSizeData.map((row) => (
                  <tr key={row.tr} className="border-b border-zinc-100 group">
                    <td className="py-3 pr-6 font-serif text-[#1A1A1A] text-lg font-light group-hover:text-gold transition-colors duration-300">
                      {row.tr}
                    </td>
                    <td className="py-3 pr-6 font-sans text-[#1A1A1A]/55 text-[12px] font-light">{row.cevre}</td>
                    <td className="py-3 font-sans text-[#1A1A1A]/55 text-[12px] font-light">{row.cap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-zinc-100 pt-6 mt-6 flex items-center justify-between">
            <Link
              href="/yuzuk-olcu-rehberi"
              className="text-[9px] text-[#1A1A1A]/40 tracking-[0.25em] uppercase font-sans hover:text-gold transition-colors duration-300 underline underline-offset-4 decoration-zinc-300 hover:decoration-gold"
            >
              Tam Rehberi Görüntüle
            </Link>
            <button
              onClick={onClose}
              className="text-[8.5px] bg-[#1A1A1A] text-[#FAF9F6] tracking-[0.28em] uppercase font-sans py-3 px-7 hover:bg-[#1A1A1A]/80 transition-colors duration-300"
            >
              Kapat
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Cross-Sell Card ────────────────────────────────────────────── */
function CrossSellCard({ product, showMothersDayBadge }: { product: Product; showMothersDayBadge?: boolean }) {
  const { addItem } = useCartStore();
  return (
    <motion.div variants={fadeUp} className="group shrink-0 w-[280px] sm:w-auto">
      <Link href={`/urun/${product.slug}`} className="block">
        <div className="relative overflow-hidden aspect-[3/4] bg-[#EFECE7]">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            sizes="(max-width: 768px) 280px, 25vw"
            className="object-cover object-center transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/8 transition-colors duration-500" />
          {showMothersDayBadge && (
            <div className="absolute top-3 left-3">
              <span
                className="text-[7px] tracking-[0.18em] uppercase font-sans font-medium px-2.5 py-1"
                style={{ background: "#b8683a", color: "#fff" }}
              >
                2. Ürüne Ek %10
              </span>
            </div>
          )}
        </div>
        <div className="pt-5 space-y-1.5">
          <p className="text-[7.5px] tracking-[0.22em] uppercase font-sans text-[#1A1A1A]/35">{product.category}</p>
          <p className="font-serif font-light text-[#1A1A1A] text-[1.15rem] leading-snug group-hover:text-charcoal-light transition-colors duration-300">{product.name}</p>
          <p className="text-[11px] font-sans font-light text-[#1A1A1A]/50">{product.priceFormatted}</p>
        </div>
      </Link>
      {showMothersDayBadge && (
        <button
          onClick={() => addItem(product)}
          className="mt-3 w-full text-[7.5px] tracking-[0.22em] uppercase font-sans font-medium py-2.5 transition-all duration-300 hover:opacity-70"
          style={{ border: "1px solid #b8683a", color: "#b8683a" }}
        >
          Sepete Ekle
        </button>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function ProductDetailClient({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const [expertOpen, setExpertOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [mobileImg, setMobileImg] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [selectedChain, setSelectedChain] = useState<string | null>(
    product.chainOptions?.[0]?.value ?? null
  );
  const touchStartX = useRef(0);
  const crossSellRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCartStore();

  const related = product.isMothersDay
    ? products.filter((p) => p.isMothersDay && p.id !== product.id)
    : getRelatedProducts(product, 4);
  const refNumber = `Ref. ONR-${product.id.toUpperCase().replace(/-/g, "")}`;
  const isRing =
    product.category === "Halkalar" ||
    product.tags?.some((t) => /halka|ring|yüzük/i.test(t)) ||
    false;

  /* Build gallery — 1 main + 2 secondary (3 total) */
  const gallery = (() => {
    const imgs = [...product.images];
    while (imgs.length < 3) {
      imgs.push(imgs[imgs.length % product.images.length]);
    }
    return imgs.slice(0, 3);
  })();

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  };

  /* Mobile swipe */
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 38) {
      if (diff > 0) setMobileImg((i) => Math.min(gallery.length - 1, i + 1));
      else setMobileImg((i) => Math.max(0, i - 1));
    }
  };

  /* Lightbox handlers */
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevLightbox = useCallback(() => setLightboxIdx((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const nextLightbox = useCallback(() => setLightboxIdx((i) => (i !== null && i < gallery.length - 1 ? i + 1 : i)), [gallery.length]);

  /* Cross-sell horizontal scroll */
  const scrollCrossSell = (dir: "left" | "right") => {
    if (!crossSellRef.current) return;
    crossSellRef.current.scrollBy({ left: dir === "right" ? 310 : -310, behavior: "smooth" });
  };

  return (
    <PageWrapper>
      <Navbar />

      <AnimatePresence>
        {expertOpen && <PersonalizationModal productName={product.name} onClose={() => setExpertOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {sizeGuideOpen && <RingSizeGuideModal onClose={() => setSizeGuideOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {lightboxIdx !== null && <Lightbox images={gallery} activeIndex={lightboxIdx} onClose={closeLightbox} onPrev={prevLightbox} onNext={nextLightbox} />}
      </AnimatePresence>

      <main className="min-h-screen bg-[#FAF9F6] pt-[72px] md:pt-[126px]">

        {/* ── Breadcrumb ───────────────────────────────────────── */}
        <nav className="px-6 md:px-10 lg:px-20 py-[14px] border-b border-[#1A1A1A]/[0.05]">
          <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-[8px] font-sans tracking-[0.24em] uppercase text-[#1A1A1A]/30">
            <Link href="/" className="hover:text-gold transition-colors duration-200">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/koleksiyonlar" className="hover:text-gold transition-colors duration-200">Koleksiyonlar</Link>
            <span>/</span>
            <Link href={`/${product.categorySlug}`} className="hover:text-gold transition-colors duration-200">{product.category}</Link>
            <span>/</span>
            <span className="text-[#1A1A1A]/55 truncate max-w-[180px]">{product.name}</span>
          </div>
        </nav>

        {/* ══════════════════════════════════════════════════════
            SPLIT SCREEN — Image Gallery | Sticky Info
            ══════════════════════════════════════════════════════ */}
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start">

            {/* ─── LEFT: Images ──────────────────────────────── */}
            <div>
              {/* Mobile Swipeable Carousel */}
              <div className="lg:hidden">
                <div
                  className="relative overflow-hidden aspect-[4/5] bg-[#EFECE7]"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  onClick={() => setLightboxIdx(mobileImg)}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mobileImg}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <Image src={gallery[mobileImg].src} alt={gallery[mobileImg].alt} fill priority sizes="100vw" className="object-cover object-center" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Badges */}
                  {product.isExclusive && (
                    <div className="absolute top-4 left-4 border border-gold/35 px-3 py-1.5 backdrop-blur-sm bg-[#0A0A0A]/20">
                      <span className="text-[6.5px] text-ivory-100/80 tracking-[0.3em] uppercase font-sans">Exclusive</span>
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-4 right-4 bg-gold px-3 py-1.5">
                      <span className="text-[6.5px] text-onyx tracking-[0.2em] uppercase font-sans">Yeni</span>
                    </div>
                  )}

                  {/* Nav arrows */}
                  {gallery.length > 1 && (
                    <>
                      <button onClick={(e) => { e.stopPropagation(); setMobileImg((i) => Math.max(0, i - 1)); }} disabled={mobileImg === 0} aria-label="Önceki görsel" className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#FAF9F6]/80 flex items-center justify-center disabled:opacity-0 transition-opacity">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><polyline points="15 18 9 12 15 6" /></svg>
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setMobileImg((i) => Math.min(gallery.length - 1, i + 1)); }} disabled={mobileImg === gallery.length - 1} aria-label="Sonraki görsel" className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#FAF9F6]/80 flex items-center justify-center disabled:opacity-0 transition-opacity">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Dot indicators */}
                {gallery.length > 1 && (
                  <div className="flex items-center justify-center gap-2 py-4">
                    {gallery.map((_, i) => (
                      <button key={i} onClick={() => setMobileImg(i)} aria-label={`Görsel ${i + 1}`}
                        className={`block transition-all duration-300 ${i === mobileImg ? "w-5 h-[2px] bg-gold" : "w-1.5 h-1.5 rounded-full bg-[#1A1A1A]/15"}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop: 1 main image + 2-column secondary grid */}
              <div className="hidden lg:block pl-10 xl:pl-20 pr-5 py-10">
                <div className="space-y-3">

                  {/* Main image */}
                  <motion.div
                    className="relative overflow-hidden bg-[#EFECE7] cursor-zoom-in group"
                    style={{ aspectRatio: "4/5" }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease }}
                    onClick={() => setLightboxIdx(0)}
                  >
                    <Image
                      src={gallery[0].src}
                      alt={gallery[0].alt}
                      fill
                      priority
                      sizes="(max-width: 1440px) 50vw, 720px"
                      className="object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/[0.06] transition-colors duration-500 flex items-center justify-center">
                      <div className="w-10 h-10 border border-white/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="text-white/80">
                          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                      </div>
                    </div>
                    {product.isExclusive && (
                      <div className="absolute top-5 left-5 border border-gold/35 px-3 py-1.5 backdrop-blur-sm bg-[#0A0A0A]/18">
                        <span className="text-[6.5px] text-ivory-100/75 tracking-[0.3em] uppercase font-sans">Exclusive</span>
                      </div>
                    )}
                    {product.isNew && (
                      <div className="absolute top-5 right-5 bg-gold px-3 py-1.5">
                        <span className="text-[6.5px] text-onyx tracking-[0.2em] uppercase font-sans">Yeni</span>
                      </div>
                    )}
                  </motion.div>

                  {/* Secondary: 2 images side by side */}
                  <div className="grid grid-cols-2 gap-3">
                    {gallery.slice(1, 3).map((img, idx) => (
                      <motion.div
                        key={idx + 1}
                        className="relative overflow-hidden bg-[#EFECE7] cursor-zoom-in group"
                        style={{ aspectRatio: "3/4" }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: (idx + 1) * 0.12, ease }}
                        onClick={() => setLightboxIdx(idx + 1)}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 1440px) 25vw, 360px"
                          className="object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/[0.06] transition-colors duration-500 flex items-center justify-center">
                          <div className="w-8 h-8 border border-white/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="text-white/80">
                              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                              <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                </div>
              </div>
            </div>

            {/* ─── RIGHT: Sticky Info Panel ──────────────────── */}
            <div className="px-6 sm:px-8 lg:px-10 xl:px-16 lg:pr-10 xl:pr-20 py-7 lg:py-0 lg:sticky lg:top-[126px] lg:self-start">
              <div>
                <motion.div variants={stagger} initial="hidden" animate="show" className="lg:pt-12 lg:pb-16">

                  {/* Pearl Care Banner — only visible for pearl products */}
                  <PearlCareBanner tags={product.tags} category={product.category} />

                  {/* Collection overline */}
                  <motion.p variants={fadeUp} className="text-[8px] tracking-[0.4em] uppercase font-sans text-gold mb-4">
                    {product.category}
                  </motion.p>

                  {/* Product Name */}
                  <motion.h1 variants={fadeUp}
                    className="font-serif font-light text-[#1A1A1A] leading-[1.04] text-[2.4rem] md:text-[2.8rem] xl:text-[3.2rem] tracking-[-0.01em] mb-3"
                  >
                    {product.name}
                  </motion.h1>

                  {/* Ref Number */}
                  <motion.p variants={fadeUp} className="text-[7.5px] text-[#1A1A1A]/25 tracking-[0.55em] uppercase font-sans mb-8">
                    {refNumber}
                  </motion.p>

                  {/* Thin separator */}
                  <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                    <span className="flex-1 h-px bg-[#1A1A1A]/[0.06]" />
                    <span className="block w-[3px] h-[3px] rotate-45 bg-gold/40 shrink-0" />
                    <span className="flex-1 h-px bg-[#1A1A1A]/[0.06]" />
                  </motion.div>

                  {/* Price */}
                  <motion.div variants={fadeUp} className="mb-6">
                    {product.originalPriceFormatted && (
                      <div className="flex items-center gap-2.5 mb-2">
                        <span
                          className="text-[7px] tracking-[0.18em] uppercase font-sans px-2.5 py-1 font-medium"
                          style={{ background: "#b8683a", color: "#fff" }}
                        >
                          Anneler Günü İndirimi
                        </span>
                        <span className="font-sans font-light text-[#1A1A1A]/35 text-sm line-through">
                          {product.originalPriceFormatted}
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-serif font-light leading-none"
                        style={{
                          fontSize: "2.1rem",
                          color: product.originalPriceFormatted ? "#b8683a" : "#1A1A1A",
                        }}
                      >
                        {product.priceFormatted}
                      </span>
                      <span className="text-[7.5px] text-[#1A1A1A]/28 tracking-[0.22em] uppercase font-sans">KDV Dahil</span>
                    </div>
                  </motion.div>

                  {/* Short description */}
                  <motion.p variants={fadeUp} className="text-[13px] text-[#1A1A1A]/45 font-sans font-light leading-[1.85] mb-7 max-w-[420px]">
                    {product.shortDescription}
                  </motion.p>

                  {/* Material tags */}
                  <motion.div variants={fadeUp} className="flex flex-wrap gap-1.5 mb-6">
                    {product.materials.map((m) => (
                      <span key={m} className="border border-[#1A1A1A]/[0.08] text-[#1A1A1A]/40 text-[7px] tracking-[0.2em] uppercase font-sans px-3.5 py-[7px]">
                        {m}
                      </span>
                    ))}
                  </motion.div>

                  {/* Chain Selection */}
                  {product.chainOptions && product.chainOptions.length > 0 && (
                    <motion.div variants={fadeUp} className="mb-6">
                      <p className="text-[7.5px] tracking-[0.3em] uppercase font-sans text-[#1A1A1A]/35 mb-3">
                        Zincir Seçimi
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.chainOptions.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => setSelectedChain(opt.value)}
                            className={`text-[9px] tracking-[0.2em] uppercase font-sans px-4 py-2.5 border transition-all duration-300 ${
                              selectedChain === opt.value
                                ? "border-[#1A1A1A]/60 text-[#1A1A1A] bg-[#1A1A1A]/[0.03]"
                                : "border-[#1A1A1A]/12 text-[#1A1A1A]/45 hover:border-[#1A1A1A]/30 hover:text-[#1A1A1A]/65"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-[8px] text-[#1A1A1A]/28 font-sans font-light mt-2">
                        Zincir seçimi fiyatı etkilememektedir.
                      </p>
                    </motion.div>
                  )}

                  {/* Limited edition badge */}
                  {product.limitedPieces && (
                    <motion.div variants={fadeUp} className="flex items-center gap-3 border border-gold/20 bg-gold/[0.03] px-4 py-3 mb-6">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shrink-0" />
                      <span className="text-[7.5px] text-[#1A1A1A]/55 tracking-[0.22em] uppercase font-sans">
                        Yalnızca {product.limitedPieces} Adet Üretilmiştir
                      </span>
                    </motion.div>
                  )}

                  {/* ── Ring Size Guide Link (only for rings) ── */}
                  {isRing && (
                    <motion.div variants={fadeUp} className="flex items-center justify-between mb-3">
                      <button
                        onClick={() => setSizeGuideOpen(true)}
                        className="group inline-flex items-center gap-2 border-b border-zinc-300 pb-[3px]
                                   hover:border-gold/60 transition-colors duration-300"
                        aria-label="Ölçü rehberini görüntüle"
                      >
                        {/* Ruler icon */}
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="text-[#1A1A1A]/30 group-hover:text-gold transition-colors duration-300 shrink-0"
                        >
                          <path d="M2 12h20M2 12l4-4M2 12l4 4M6 8v8M10 10v4M14 8v8M18 10v4" />
                        </svg>
                        <span
                          className="text-[10px] tracking-[0.28em] uppercase font-sans font-light
                                     text-[#1A1A1A]/40 group-hover:text-gold transition-colors duration-300"
                        >
                          Ölçü Rehberi
                        </span>
                      </button>
                    </motion.div>
                  )}

                  {/* ── CTA Buttons ── */}
                  <motion.div variants={fadeUp} className="space-y-3 mb-4">
                    {/* Primary: SEPETE EKLE */}
                    <button
                      onClick={handleAddToCart}
                      className={`w-full flex items-center justify-center gap-2.5 text-[9px] tracking-[0.3em] uppercase font-sans font-medium py-[16px] border transition-all duration-500 ${
                        added
                          ? "bg-[#1A1A1A]/70 border-[#1A1A1A]/70 text-[#FAF9F6]"
                          : "bg-[#1A1A1A] border-[#1A1A1A] text-[#FAF9F6] hover:bg-[#1A1A1A]/80"
                      }`}
                    >
                      {added ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                          Sepete Eklendi
                        </>
                      ) : (
                        "Sepete Ekle"
                      )}
                    </button>

                    {/* Secondary: Bize Ulaşın */}
                    <button
                      onClick={() => setExpertOpen(true)}
                      className="w-full flex items-center justify-center gap-2.5 text-[9px] tracking-[0.3em] uppercase font-sans font-medium py-[15px] border border-[#1A1A1A]/12 text-[#1A1A1A]/50 hover:border-[#1A1A1A]/35 hover:text-[#1A1A1A]/75 transition-all duration-300"
                    >
                      Bize Ulaşın
                    </button>
                  </motion.div>

                  <motion.p variants={fadeUp} className="text-[9px] text-[#1A1A1A]/25 font-sans font-light text-center leading-relaxed mb-8">
                    Gravür · Beden uyarlaması · Özel taş seçimi
                  </motion.p>

                  {/* ── Trust Row ── */}
                  <motion.div variants={fadeUp} className="grid grid-cols-2 gap-2 border-t border-b border-[#1A1A1A]/[0.06] py-5 mb-1">
                    {[
                      { icon: "shield", label: "Güvenli Ödeme", sub: "256-bit SSL" },
                      { icon: "gift", label: "Özel Ambalaj", sub: "İmza Kutu" },
                    ].map(({ icon, label, sub }) => (
                      <div key={label} className="text-center space-y-2">
                        <div className="flex justify-center text-[#1A1A1A]/18">
                          {icon === "shield" && (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                          )}
                          {icon === "gift" && (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15"><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" /></svg>
                          )}
                        </div>
                        <p className="text-[7px] text-[#1A1A1A]/45 tracking-[0.18em] font-sans uppercase">{label}</p>
                        <p className="text-[7px] text-[#1A1A1A]/25 font-sans">{sub}</p>
                      </div>
                    ))}
                  </motion.div>

                  {/* ── Accordions ── */}
                  <motion.div variants={fadeUp}>

                    <Accordion title="Ürün Detayı" defaultOpen>
                      <p className="font-serif font-light text-[#1A1A1A]/50 text-[15px] leading-[2] italic">
                        {product.description}
                      </p>
                    </Accordion>

                    <Accordion title="Koleksiyon Hakkında">
                      <div className="space-y-4">
                        <p className="text-[12.5px] font-sans font-light text-[#1A1A1A]/45 leading-[1.9]">
                          <span className="text-[#1A1A1A]/65 font-normal">{product.category}</span> koleksiyonu, ONR Mücevherat&apos;ın
                          en seçkin zanaatkârlarının elinden çıkan, zamansız estetiğin modern yorumudur.
                        </p>
                        <p className="text-[12.5px] font-sans font-light text-[#1A1A1A]/45 leading-[1.9]">
                          Her parça, kadim kuyumculuk tekniklerini çağdaş tasarım vizyonuyla buluşturarak;
                          size sadece bir mücevher değil, kuşaklar boyu aktarılacak bir miras sunar.
                        </p>
                      </div>
                    </Accordion>

                    <Accordion title="Mücevher Bilgisi">
                      <dl className="divide-y divide-[#1A1A1A]/[0.04]">
                        {[...product.stoneSpecs, ...product.karatDetails].map((s) => (
                          <div key={s.label + s.value} className="grid grid-cols-2 gap-4 py-2.5 text-[11.5px] font-sans">
                            <dt className="text-[#1A1A1A]/35 font-light">{s.label}</dt>
                            <dd className="text-[#1A1A1A]/70 font-light">{s.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </Accordion>

                    <Accordion title="Sertifika & Garanti">
                      <div className="space-y-4">
                        {product.certificateInfo.length > 0 && (
                          <dl className="divide-y divide-[#1A1A1A]/[0.04]">
                            {product.certificateInfo.map((s) => (
                              <div key={s.label + s.value} className="grid grid-cols-2 gap-4 py-2.5 text-[11.5px] font-sans">
                                <dt className="text-[#1A1A1A]/35 font-light">{s.label}</dt>
                                <dd className="text-[#1A1A1A]/70 font-light">{s.value}</dd>
                              </div>
                            ))}
                          </dl>
                        )}
                        <p className="text-[12px] font-sans font-light text-[#1A1A1A]/42 leading-[1.85]">
                          Tüm ONR Mücevherat parçaları, uluslararası bağımsız gemoloji laboratuvarlarınca sertifikalandırılır.
                          Her mücevher orijinallik kartı ve sertifikasıyla teslim edilir.
                        </p>
                        <p className="text-[12px] font-sans font-light text-[#1A1A1A]/42 leading-[1.85]">
                          <span className="text-[#1A1A1A]/62 font-medium">2 Yıl Garanti:</span>{" "}
                          Satın alma tarihinden itibaren üretim hatalarına karşı tam güvence.
                        </p>
                      </div>
                    </Accordion>

                    <Accordion title="Teslimat & İade">
                      <div className="space-y-3 text-[12px] font-sans font-light text-[#1A1A1A]/42 leading-[1.9]">
                        <p><span className="text-[#1A1A1A]/62 font-medium">Sigortalı Ekspres:</span> Özel imzalı kargo ile 2–4 iş gününde kapınıza teslim.</p>
                        <p><span className="text-[#1A1A1A]/62 font-medium">Ankara İçi:</span> Şubemizden randevuyla aynı gün teslim seçeneği mevcuttur.</p>
                        <p><span className="text-[#1A1A1A]/62 font-medium">İade:</span> 14 gün içinde, orijinal ambalajında ve kullanılmamış hâlde iade kabul edilir. Özel sipariş ürünler kapsam dışındadır.</p>
                      </div>
                    </Accordion>

                    {product.tags?.includes("inci") && (
                      <Accordion title="İnci Bakım Notu">
                        <div className="space-y-3 text-[12px] font-sans font-light text-[#1A1A1A]/42 leading-[1.9]">
                          <p>
                            <span className="text-[#1A1A1A]/62 font-medium">Parfüm & Kimyasaldan Uzak Tutun:</span>{" "}
                            Parfüm, saç spreyi ve losyon gibi kimyasallar incinin doğal parlaklığına zarar verir.
                            Mücevherinizi giyinmeden önce, olmak üzere en son takın.
                          </p>
                          <p>
                            <span className="text-[#1A1A1A]/62 font-medium">Temizlik:</span>{" "}
                            Kullanım sonrası yumuşak, hafif nemli bir bezle nazikçe silin. Ultrasonik temizleyici veya
                            buharlı yöntemler inciye zarar verebilir; kullanmayın.
                          </p>
                          <p>
                            <span className="text-[#1A1A1A]/62 font-medium">Saklama:</span>{" "}
                            İnciyi ayrı, yumuşak astarlı bir kese veya kutu içinde — diğer mücevherlerden uzak —
                            saklayın. Sert taşlarla temas incinin yüzeyini çizebilir.
                          </p>
                          <p>
                            <span className="text-[#1A1A1A]/62 font-medium">Nem Dengesi:</span>{" "}
                            İnci, çok kuru havalarda matlaşabilir. Yılda birkaç kez üzerine birkaç damla saf zeytinyağı
                            sürerek mikrofiber bezle parlatmanız parlaklığını korur.
                          </p>
                          <p>
                            <span className="text-[#1A1A1A]/62 font-medium">Profesyonel Bakım:</span>{" "}
                            İplik veya tellerle dizilmiş inci parçalar 1–2 yılda bir mağazamızda yeniden dizdirilmesini
                            öneririz.
                          </p>
                        </div>
                      </Accordion>
                    )}

                  </motion.div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            CROSS-SELL — Horizontal Slider
            ══════════════════════════════════════════════════════ */}
        {related.length > 0 && (
          <section className="border-t border-[#1A1A1A]/[0.05] mt-8">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 py-20 md:py-28">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease }}
                className="flex items-end justify-between mb-12"
              >
                <div>
                  <p className="text-[8px] tracking-[0.42em] uppercase font-sans text-gold mb-3">
                    {product.isMothersDay ? "Anneler Günü Koleksiyonu" : "Sizin İçin Seçtiklerimiz"}
                  </p>
                  <h2 className="font-serif font-light text-[#1A1A1A] text-[1.8rem] md:text-[2.3rem]">
                    {product.isMothersDay ? "2. Ürüne Ek %10 İndirim" : "Bu Tasarımı Tamamlayın"}
                  </h2>
                </div>
                {/* Scroll arrows (desktop) */}
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => scrollCrossSell("left")}
                    aria-label="Sola kaydır"
                    className="w-10 h-10 border border-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A]/30 hover:border-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-all duration-300"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>
                  <button
                    onClick={() => scrollCrossSell("right")}
                    aria-label="Sağa kaydır"
                    className="w-10 h-10 border border-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A]/30 hover:border-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-all duration-300"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                </div>
              </motion.div>

              {/* Horizontal scroll container */}
              <div className="-mx-6 sm:mx-0">
                <motion.div
                  ref={crossSellRef}
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  className="flex sm:grid sm:grid-cols-4 gap-6 lg:gap-8 overflow-x-auto sm:overflow-visible px-6 sm:px-0 scrollbar-hide snap-x snap-mandatory"
                >
                  {related.map((rp) => (
                    <CrossSellCard key={rp.id} product={rp} showMothersDayBadge={!!product.isMothersDay} />
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center mt-14"
              >
                <Link
                  href="/koleksiyonlar"
                  className="inline-flex items-center gap-3 text-[8.5px] tracking-[0.3em] uppercase font-sans text-[#1A1A1A]/40 border border-[#1A1A1A]/10 px-10 py-3.5 hover:border-[#1A1A1A]/28 hover:text-[#1A1A1A]/65 transition-all duration-300"
                >
                  Tüm Koleksiyonu İncele
                </Link>
              </motion.div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </PageWrapper>
  );
}