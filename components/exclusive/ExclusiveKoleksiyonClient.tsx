"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cartStore";
import { getExclusiveProducts } from "@/lib/products";

const GOLD = "#D4AF37";

const products = getExclusiveProducts();

/* ─── Inquiry Modal (lightweight) ───────────────────────── */
function QuickInquiryModal({
  productName,
  onClose,
}: {
  productName: string;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ backgroundColor: "rgba(0,0,0,0.82)" }}
    >
      <motion.div
        className="relative w-full sm:max-w-md mx-4 sm:mx-auto p-10 sm:p-12"
        style={{
          backgroundColor: "#0e0e0e",
          border: `1px solid ${GOLD}22`,
        }}
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {sent ? (
          <div className="text-center py-6 space-y-4">
            <p className="text-[8px] tracking-[0.5em] uppercase font-sans" style={{ color: GOLD }}>
              Talebiniz Alındı
            </p>
            <h3 className="font-serif font-light text-2xl" style={{ color: GOLD }}>Teşekkürler</h3>
            <p className="text-[12px] font-sans leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
              Uzman danışmanımız 24 saat içinde sizinle iletişime geçecektir.
            </p>
            <button
              onClick={onClose}
              className="mt-6 text-[8px] tracking-[0.42em] uppercase font-sans px-8 py-3 transition-all duration-300"
              style={{ border: `1px solid ${GOLD}32`, color: GOLD }}
            >
              Kapat
            </button>
          </div>
        ) : (
          <>
            <p className="text-[8px] tracking-[0.55em] uppercase font-sans mb-2" style={{ color: `${GOLD}60` }}>
              Fiyat Teklifi
            </p>
            <h3 className="font-serif font-light text-2xl mb-1" style={{ color: GOLD }}>
              {productName}
            </h3>
            <p className="text-[11px] font-sans font-light leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.28)" }}>
              Kişisel danışmanlık ve fiyat teklifi için bilgilerinizi bırakın.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="space-y-6"
            >
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
                    className="w-full bg-transparent py-3 outline-none font-sans font-light text-sm
                               placeholder-white/20 text-white/65"
                    style={{ borderBottom: `1px solid ${GOLD}22` }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = `${GOLD}65`)}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = `${GOLD}22`)}
                  />
                </div>
              ))}
              <motion.button
                type="submit"
                className="w-full py-4 text-[9px] tracking-[0.45em] uppercase font-sans
                           transition-colors duration-300 mt-2"
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

/* ─── Product Card ───────────────────────────────────────── */
function ExclusiveCard({
  product,
  index,
  onInquiry,
}: {
  product: ReturnType<typeof getExclusiveProducts>[number];
  index: number;
  onInquiry: (name: string) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: (index % 3) * 0.1,
      }}
      className="group"
    >
      <Link href={`/exclusive/${product.slug}`} className="block">
        {/* Image */}
        <div
          className="relative aspect-[3/4] overflow-hidden mb-7"
          style={{ border: `1px solid ${GOLD}12` }}
        >
          {/* Limited badge */}
          <div
            className="absolute top-5 left-5 z-10 px-3 py-1.5"
            style={{
              backgroundColor: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              border: `1px solid ${GOLD}20`,
            }}
          >
            <span className="text-[7px] tracking-[0.45em] uppercase font-sans" style={{ color: `${GOLD}80` }}>
              {product.limitedPieces && product.limitedPieces === 1
                ? "Tek"
                : `${product.limitedPieces} Adet`}
            </span>
          </div>

          {product.images?.[0] && (
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center grayscale group-hover:grayscale-0
                         transition-all duration-[1400ms] ease-out group-hover:scale-105"
            />
          )}

          {/* Bottom gradient */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/5 z-[2] pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}
          />

          {/* Hover overlay */}
          <div
            className="absolute inset-0 z-[3] flex items-end justify-center pb-8
                       opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <span
              className="text-[8px] tracking-[0.45em] uppercase font-sans px-7 py-3"
              style={{
                border: `1px solid ${GOLD}`,
                color: GOLD,
                backgroundColor: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(6px)",
              }}
            >
              İncele
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <p
            className="text-[7.5px] tracking-[0.5em] uppercase font-sans"
            style={{ color: `${GOLD}40` }}
          >
            Exclusive — ONR
          </p>
          <h3
            className="font-serif font-light tracking-[0.06em] leading-[1.1]
                       group-hover:text-gold transition-colors duration-400"
            style={{ color: "rgba(255,255,255,0.88)", fontSize: "clamp(1.3rem, 2vw, 1.6rem)" }}
          >
            {product.name}
          </h3>
          <p
            className="text-[8px] tracking-[0.3em] uppercase font-sans"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            {product.shortDescription}
          </p>
        </div>
      </Link>

      {/* CTA */}
      <div className="mt-6 flex items-center gap-5">
        <motion.button
          onClick={() => onInquiry(product.name)}
          className="flex items-center gap-2.5 text-[8px] tracking-[0.4em] uppercase font-sans
                     px-6 py-3 transition-colors duration-300"
          style={{ border: `1px solid ${GOLD}32`, color: GOLD }}
          whileHover={{ borderColor: GOLD, backgroundColor: `${GOLD}08` }}
        >
          Fiyat Teklifi Al
        </motion.button>
        <Link
          href={`/exclusive/${product.slug}`}
          className="text-[8px] tracking-[0.38em] uppercase font-sans transition-colors duration-300"
          style={{ color: "rgba(255,255,255,0.2)" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = `${GOLD}60`)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.2)")}
        >
          Detaylar →
        </Link>
      </div>
    </motion.article>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function ExclusiveKoleksiyonClient() {
  const [inquiryProduct, setInquiryProduct] = useState<string | null>(null);
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
              href="/exclusive"
              className="flex items-center gap-3 group"
              style={{ color: `${GOLD}50` }}
            >
              <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </motion.span>
              <span
                className="hidden sm:block text-[8px] tracking-[0.35em] uppercase font-sans
                           group-hover:text-[#D4AF37] transition-colors duration-300"
              >
                Exclusive
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

      {/* Page Header */}
      <section
        className="pt-40 pb-20 px-8 md:px-16 lg:px-24 text-center"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 30%, ${GOLD}07 0%, transparent 65%)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          className="space-y-5"
        >
          <p
            className="text-[8px] tracking-[0.6em] uppercase font-sans"
            style={{ color: `${GOLD}50` }}
          >
            Private Collection — 2026
          </p>
          <h1
            className="font-serif font-light tracking-[0.12em]"
            style={{ color: GOLD, fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
          >
            Exclusive
          </h1>
          <div className="flex items-center justify-center gap-6">
            <span className="block h-px w-16" style={{ background: `${GOLD}30` }} />
            <span
              className="text-[8px] tracking-[0.48em] uppercase font-sans"
              style={{ color: `${GOLD}40` }}
            >
              {products.length} Nadir Parça
            </span>
            <span className="block h-px w-16" style={{ background: `${GOLD}30` }} />
          </div>
          <p
            className="font-sans font-light text-[13px] leading-[2.0] max-w-md mx-auto tracking-wider"
            style={{ color: "rgba(255,255,255,0.32)" }}
          >
            Her biri dünyanın dört bir yanından gelen nadir taşlarla hayata
            geçirilmiş bu koleksiyon asla bir vitrine çıkmaz.
          </p>
        </motion.div>
      </section>

      {/* Horizontal rule */}
      <div
        className="mx-8 md:mx-16 lg:mx-24"
        style={{ height: "1px", background: `${GOLD}14` }}
      />

      {/* Product Grid */}
      <main className="px-8 md:px-16 lg:px-24 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20">
          {products.map((product, i) => (
            <ExclusiveCard
              key={product.id}
              product={product}
              index={i}
              onInquiry={setInquiryProduct}
            />
          ))}
        </div>
      </main>

      {/* Bottom accent */}
      <div
        className="mx-8 md:mx-16 lg:px-24 mt-4 mb-16"
        style={{ height: "1px", background: `${GOLD}10` }}
      />
      <div className="text-center pb-20">
        <p
          className="text-[8px] tracking-[0.5em] uppercase font-sans"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          Fiyatlar yalnızca talep üzerine paylaşılır
        </p>
      </div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {inquiryProduct && (
          <QuickInquiryModal
            key={inquiryProduct}
            productName={inquiryProduct}
            onClose={() => setInquiryProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
