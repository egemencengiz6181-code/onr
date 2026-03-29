"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useCartStore } from "@/lib/cartStore";

/* ─── Constants ──────────────────────────────────────────── */
const GOLD = "#D4AF37";

/* ─── Data ───────────────────────────────────────────────── */
interface ExItem {
  id: string;
  slug: string;
  name: string;
  sub: string;
  edition: string;
  detail: string;
  tags: string[];
  img: string;
  imgAlt: string;
}

const ITEMS: ExItem[] = [
  {
    id: "ex-001",
    slug: "nebula-kashmir-safir",
    name: "Nebula",
    sub: "Kashmir Safir — 950 Platin",
    edition: "N° 01/03",
    detail:
      "Dünyanın en nadir taşlarından Kashmir safiri, ONR atölyesinde altın oran kuralıyla çerçevelenmiştir. GRS sertifikalı, ısıl işlem uygulanmamış 4.20 ct Royal Blue safir. Bir neslin mirası ve bir servetin özü.",
    tags: ["950 Platin", "GRS Sertifikalı", "Kashmir Safir", "Pavé 1.60 ct"],
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1800&q=95&fit=crop",
    imgAlt: "Nebula Kashmir Safir Yüzük",
  },
  {
    id: "ex-002",
    slug: "la-tempete",
    name: "La Tempête",
    sub: "Fancy Intense Pembe Pırlanta — 18K",
    edition: "N° 01/01",
    detail:
      "Doğada yalnızca birkaç milyon karata bir rastlanan Fancy Intense Pink pırlanta; GIA sertifikalı 1.82 ct, VS1 saflıkta. Şiddetli bir fırtınanın sessiz anından ilham alınan bu parça dünyada yalnızca bir tane.",
    tags: ["18K Beyaz Altın", "GIA Fancy Cut", "Pembe Pırlanta", "1.82 ct"],
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1800&q=95&fit=crop",
    imgAlt: "La Tempête Fancy Pink Pırlanta Yüzük",
  },
  {
    id: "ex-003",
    slug: "velours",
    name: "Velours",
    sub: "Kolombiya Zümrütü — 18K Sarı Altın",
    edition: "N° 01/07",
    detail:
      "Kadife gibi derin bir yeşil: Muzo madeninden çıkan Kolombiya zümrütü, sarı altının sıcaklığıyla buluştuğunda varoluşun en güzel rengi ortaya çıkar. CDT sertifikalı, doğal, ısıl işlemsiz, 6.48 ct.",
    tags: ["18K Sarı Altın", "CDT Sertifikalı", "Kolombiya Zümrüt", "6.48 ct"],
    img: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1800&q=95&fit=crop",
    imgAlt: "Velours Kolombiya Zümrüt Kolye",
  },
  {
    id: "ex-004",
    slug: "aurore",
    name: "Aurore",
    sub: "Paraiba Turmalin — 950 Platin",
    edition: "N° 01/07",
    detail:
      "Neon mavisi, yeryüzünün mistik parıltısı. Brezilya Paraíba'sından çıkan bu eşsiz turmalin, doğanın başka hiçbir maddesinde bulunmayan bir ışık yoğunluğuna sahiptir. AGL sertifikalı, 2.94 ct.",
    tags: ["950 Platin", "AGL Sertifikalı", "Paraiba Turmalin", "2.94 ct"],
    img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1800&q=95&fit=crop",
    imgAlt: "Aurore Paraiba Turmalin",
  },
];

/* ─── Curtain Entrance ───────────────────────────────────── */
function Curtain() {
  return (
    <motion.div
      className="fixed inset-0 bg-black pointer-events-none"
      style={{ zIndex: 9999 }}
      initial={{ scaleY: 1, transformOrigin: "top" }}
      animate={{ scaleY: 0, transformOrigin: "top" }}
      transition={{ duration: 1.35, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
    />
  );
}

/* ─── Exclusive Navbar ───────────────────────────────────── */
function ExclusiveNavbar() {
  const { openCart, totalItems } = useCartStore();
  const cartCount = totalItems();

  return (
    <header
      className="fixed top-0 inset-x-0 z-[60]"
      style={{
        backgroundColor: "rgba(10,10,10,0.88)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${GOLD}18`,
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-[68px]">
          {/* Back to home */}
          <Link
            href="/"
            className="flex items-center gap-3 group transition-colors duration-300"
            style={{ color: `${GOLD}50` }}
          >
            <motion.span
              className="flex items-center"
              whileHover={{ x: -3 }}
              transition={{ duration: 0.2 }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </motion.span>
            <span
              className="hidden sm:block text-[8px] tracking-[0.35em] uppercase font-sans
                         group-hover:text-[#D4AF37] transition-colors duration-300"
            >
              Ana Sayfa
            </span>
          </Link>

          {/* Logo — centered absolute */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2" aria-label="ONR Mücevherat — Ana Sayfa">
            <Image
              src="/images/logo/onr-logo-beyaz.png"
              alt="ONR Mücevherat"
              width={100}
              height={36}
              className="object-contain"
            />
          </Link>

          {/* Cart icon */}
          <button
            onClick={openCart}
            aria-label={`Sepet — ${cartCount} ürün`}
            className="relative p-1 transition-colors duration-300"
            style={{ color: `${GOLD}50` }}
            onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.color = `${GOLD}50`)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full
                           text-[7px] text-black flex items-center justify-center font-sans font-medium"
                style={{ backgroundColor: GOLD }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ─── Hero ───────────────────────────────────────────────── */
function HeroSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.14, delayChildren: 1.1 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.95, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      {/* Radial background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 65% at 50% 42%, #1d1508 0%, #000000 62%)",
        }}
      />
      {/* Horizontal shimmer lines */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: "36%",
          height: "1px",
          background: `linear-gradient(to right, transparent 0%, ${GOLD}18 40%, ${GOLD}18 60%, transparent 100%)`,
        }}
      />
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: "68%",
          height: "1px",
          background: `linear-gradient(to right, transparent 0%, ${GOLD}09 40%, ${GOLD}09 60%, transparent 100%)`,
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative text-center max-w-4xl space-y-8"
      >
        <motion.p
          variants={itemVariants}
          className="text-[8px] tracking-[0.6em] uppercase font-sans"
          style={{ color: `${GOLD}50` }}
        >
          ONR Mücevherat — Private Collection 2026
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-serif font-light tracking-[0.14em] leading-[0.92]"
          style={{
            color: GOLD,
            fontSize: "clamp(5rem, 14vw, 11rem)",
          }}
        >
          Exclusive
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6"
        >
          <span
            className="block h-px w-20"
            style={{ background: `${GOLD}35` }}
          />
          <span
            className="text-[8px] tracking-[0.5em] uppercase font-sans"
            style={{ color: `${GOLD}40` }}
          >
            Yalnızca Seçkinlere
          </span>
          <span
            className="block h-px w-20"
            style={{ background: `${GOLD}35` }}
          />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="font-sans font-light text-xs leading-[2.1] max-w-sm mx-auto tracking-wider"
          style={{ color: "rgba(255,255,255,0.32)" }}
        >
          Her biri dünyanın dört bir yanından gelen nadir taşlarla hayata
          geçirilmiş bu koleksiyon asla bir vitrine çıkmaz. Fiyatlar yalnızca
          talep üzerine paylaşılır.
        </motion.p>

        <motion.div variants={itemVariants} className="flex justify-center">
          <motion.button
            className="inline-flex flex-col items-center gap-2 cursor-pointer"
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
            onClick={() =>
              document
                .getElementById("lookbook-start")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="Aşağı kaydır"
          >
            <span
              className="text-[7px] tracking-[0.5em] uppercase font-sans"
              style={{ color: `${GOLD}35` }}
            >
              Keşfet
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={`${GOLD}35`}
              strokeWidth="1.2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Lookbook Item ──────────────────────────────────────── */
function LookbookItem({
  item,
  index,
  onInquiry,
}: {
  item: ExItem;
  index: number;
  onInquiry: (item: ExItem) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-45, 45]);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={containerRef}
      id={index === 0 ? "lookbook-start" : undefined}
      className="relative flex flex-col lg:flex-row items-stretch"
      style={{ minHeight: "100vh", borderTop: `1px solid ${GOLD}10` }}
    >
      {/* ── Image panel ── */}
      <div
        className={`group relative overflow-hidden w-full aspect-[4/5] lg:aspect-auto
                    ${isEven ? "lg:w-[62%] lg:order-1" : "lg:w-[62%] lg:order-2"}`}
        style={{ minHeight: "70vh" }}
      >
        {/* Edition badge */}
        <div
          className="absolute top-7 right-7 z-[5] pointer-events-none select-none"
        >
          <span
            className="text-[8px] tracking-[0.42em] font-sans"
            style={{ color: `${GOLD}40` }}
          >
            {item.edition}
          </span>
        </div>

        {/* Parallax wrapper — extends beyond container */}
        <motion.div
          style={{ y: imageY, position: "absolute", inset: "-10%", willChange: "transform" }}
        >
          <div
            className="absolute grayscale group-hover:grayscale-0 transition-all duration-[1500ms] ease-out"
            style={{ inset: 0 }}
          >
            <Image
              src={item.img}
              alt={item.imgAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="object-cover object-center"
            />
          </div>
        </motion.div>

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.18) 100%)",
          }}
        />

        {/* Side vignette (toward content panel) */}
        <div
          className="absolute inset-y-0 z-[3] pointer-events-none w-32"
          style={{
            [isEven ? "right" : "left"]: 0,
            background: `linear-gradient(to ${isEven ? "right" : "left"}, transparent, #0a0a0a20)`,
          }}
        />
      </div>

      {/* ── Content panel ── */}
      <motion.div
        className={`relative z-10 w-full flex items-center
                    px-10 py-20 lg:py-0 lg:px-16 xl:px-24
                    ${isEven ? "lg:w-[38%] lg:order-2" : "lg:w-[38%] lg:order-1"}`}
        initial={{ opacity: 0, x: isEven ? 28 : -28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.18 }}
      >
        <div className="space-y-7 max-w-[340px]">
          {/* Counter */}
          <span
            className="block text-[8px] tracking-[0.55em] uppercase font-sans"
            style={{ color: `${GOLD}28` }}
          >
            {String(index + 1).padStart(2, "0")} — Exclusive Collection
          </span>

          {/* Name */}
          <h2
            className="font-serif font-light tracking-[0.09em] leading-[1.02]"
            style={{
              color: GOLD,
              fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)",
            }}
          >
            {item.name}
          </h2>

          {/* Subtitle */}
          <p
            className="text-[8.5px] tracking-[0.38em] uppercase font-sans"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            {item.sub}
          </p>

          {/* Gold rule */}
          <div className="flex items-center gap-3">
            <span
              className="block w-10 h-px"
              style={{ background: `${GOLD}38` }}
            />
            <span
              className="block w-1 h-1 rotate-45"
              style={{ background: `${GOLD}38` }}
            />
          </div>

          {/* Description */}
          <p
            className="font-sans font-light text-[13px] leading-[2.0] tracking-wide"
            style={{ color: "rgba(255,255,255,0.42)" }}
          >
            {item.detail}
          </p>

          {/* Material tags */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="text-[7.5px] tracking-widest uppercase font-sans px-3 py-1.5 transition-colors duration-300"
                style={{
                  border: `1px solid ${GOLD}20`,
                  color: `${GOLD}50`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="space-y-3 pt-1">
            <motion.button
              onClick={() => onInquiry(item)}
              className="flex items-center gap-3 text-[9px] tracking-[0.38em] uppercase font-sans
                         px-8 py-4 w-fit transition-colors duration-500"
              style={{
                border: `1px solid ${GOLD}38`,
                color: GOLD,
              }}
              whileHover={{
                borderColor: GOLD,
                backgroundColor: `${GOLD}10`,
              }}
              transition={{ duration: 0.3 }}
            >
              Fiyat Teklifi Al
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.button>

            <button
              onClick={() => onInquiry(item)}
              className="block text-[8px] tracking-[0.32em] uppercase font-sans transition-colors duration-300"
              style={{ color: "rgba(255,255,255,0.18)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = `${GOLD}55`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.18)")
              }
            >
              Özel Danışmanla Görüş
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Divider ────────────────────────────────────────────── */
function GoldDivider({ number }: { number: string }) {
  return (
    <div
      className="flex items-center justify-center gap-6 py-16 px-8"
      style={{ borderTop: `1px solid ${GOLD}08` }}
    >
      <span className="block flex-1 max-w-xs h-px" style={{ background: `${GOLD}12` }} />
      <span
        className="text-[8px] tracking-[0.5em] uppercase font-sans tabular-nums"
        style={{ color: `${GOLD}28` }}
      >
        {number}
      </span>
      <span className="block flex-1 max-w-xs h-px" style={{ background: `${GOLD}12` }} />
    </div>
  );
}

/* ─── Exclusive Shop Section ─────────────────────────────── */
function ExclusiveShopSection() {
  return (
    <section
      className="py-28 overflow-hidden"
      style={{ borderTop: `1px solid ${GOLD}12` }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="px-8 md:px-16 lg:px-24 mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
      >
        <div className="space-y-3">
          <p
            className="text-[8px] tracking-[0.6em] uppercase font-sans"
            style={{ color: `${GOLD}45` }}
          >
            Exclusive Koleksiyon
          </p>
          <h2
            className="font-serif font-light tracking-[0.08em] leading-none"
            style={{ color: GOLD, fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Nadir Parçalar
          </h2>
        </div>
        <Link
          href="/exclusive/koleksiyon"
          className="flex items-center gap-2.5 text-[8px] tracking-[0.45em] uppercase font-sans
                     transition-colors duration-300 self-start sm:self-auto pb-1"
          style={{ color: `${GOLD}55`, borderBottom: `1px solid ${GOLD}20` }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = GOLD;
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = GOLD;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = `${GOLD}55`;
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = `${GOLD}20`;
          }}
        >
          Hepsini İncele
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </motion.div>

      {/* Horizontal scroll track */}
      <div
        className="flex gap-5 overflow-x-auto pb-6 px-8 md:px-16 lg:px-24
                   scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: i * 0.08,
            }}
            className="flex-shrink-0 w-[300px] sm:w-[340px] group"
          >
            <Link href={`/exclusive/${item.slug}`} className="block">
              {/* Image */}
              <div
                className="relative overflow-hidden aspect-[3/4] mb-6"
                style={{ border: `1px solid ${GOLD}14` }}
              >
                {/* Edition badge */}
                <div
                  className="absolute top-4 left-4 z-10 px-2.5 py-1"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.65)",
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${GOLD}18`,
                  }}
                >
                  <span
                    className="text-[7px] tracking-[0.42em] uppercase font-sans"
                    style={{ color: `${GOLD}70` }}
                  >
                    {item.edition}
                  </span>
                </div>

                <Image
                  src={item.img}
                  alt={item.imgAlt}
                  fill
                  sizes="340px"
                  className="object-cover object-center grayscale group-hover:grayscale-0
                             transition-all duration-[1400ms] ease-out
                             group-hover:scale-105"
                />

                {/* Bottom gradient */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 z-[2] pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                  }}
                />

                {/* Hover overlay CTA */}
                <div
                  className="absolute inset-0 z-[3] flex items-end justify-center pb-7
                             opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <span
                    className="text-[8px] tracking-[0.45em] uppercase font-sans px-6 py-2.5 transition-colors duration-300"
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
              <div className="space-y-2 px-1">
                <h3
                  className="font-serif font-light tracking-[0.07em] leading-none
                             group-hover:text-gold transition-colors duration-400"
                  style={{
                    color: "rgba(255,255,255,0.88)",
                    fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)",
                  }}
                >
                  {item.name}
                </h3>
                <p
                  className="text-[8px] tracking-[0.34em] uppercase font-sans"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {item.sub}
                </p>
                <p
                  className="text-[8.5px] tracking-[0.32em] uppercase font-sans pt-1"
                  style={{ color: `${GOLD}40` }}
                >
                  Fiyat Teklifi Alın
                </p>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* "View All" card at the end */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: ITEMS.length * 0.08 }}
          className="flex-shrink-0 w-[240px] flex items-center justify-center"
        >
          <Link
            href="/exclusive/koleksiyon"
            className="flex flex-col items-center gap-5 group p-10 text-center"
            style={{ border: `1px solid ${GOLD}15` }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center
                         transition-colors duration-400 group-hover:border-gold"
              style={{ border: `1px solid ${GOLD}30` }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={GOLD}
                strokeWidth="1.2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
            <span
              className="text-[8px] tracking-[0.48em] uppercase font-sans leading-[1.9]"
              style={{ color: `${GOLD}55` }}
            >
              Tüm Exclusive<br />Koleksiyonu<br />İncele
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Bottom CTA button (below scroll) */}
      <div className="px-8 md:px-16 lg:px-24 mt-12 flex justify-center">
        <Link href="/exclusive/koleksiyon">
          <motion.span
            className="inline-flex items-center gap-3 text-[9px] tracking-[0.42em] uppercase font-sans
                       px-12 py-4 cursor-pointer transition-colors duration-300"
            style={{ border: `1px solid ${GOLD}35`, color: GOLD }}
            whileHover={{ borderColor: GOLD, backgroundColor: `${GOLD}10` }}
            transition={{ duration: 0.3 }}
          >
            Hepsini İncele
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.span>
        </Link>
      </div>
    </section>
  );
}

/* ─── Closing Section ────────────────────────────────────── */
function ClosingSection({ onInquiry }: { onInquiry: () => void }) {
  return (
    <section
      className="relative py-40 px-8 text-center overflow-hidden"
      style={{ borderTop: `1px solid ${GOLD}12` }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 65% 45% at 50% 50%, ${GOLD}07 0%, transparent 65%)`,
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative space-y-9 max-w-xl mx-auto"
      >
        <p
          className="text-[8px] tracking-[0.55em] uppercase font-sans"
          style={{ color: `${GOLD}45` }}
        >
          Özel Danışmanlık
        </p>
        <h2
          className="font-serif font-light tracking-[0.1em] leading-[1.05]"
          style={{ color: GOLD, fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
        >
          Sizin İçin
          <br />
          <span style={{ color: `${GOLD}65` }}>Buradayız</span>
        </h2>
        <p
          className="font-sans font-light text-[13px] leading-[2.1] tracking-wider"
          style={{ color: "rgba(255,255,255,0.32)" }}
        >
          Bu koleksiyonun her parçası için kişisel danışmanlık hizmeti
          sunuyoruz. Fiyat teklifi, özel sipariş ve kurumsal alımlara yönelik
          şeffaf ve tamamen gizli iletişim.
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <motion.button
            onClick={onInquiry}
            className="flex items-center gap-3 text-[9px] tracking-[0.4em] uppercase font-sans
                       px-12 py-4 transition-colors duration-300"
            style={{ border: `1px solid ${GOLD}40`, color: GOLD }}
            whileHover={{ borderColor: GOLD, backgroundColor: `${GOLD}10` }}
            transition={{ duration: 0.3 }}
          >
            Özel Görüşme Talep Et
          </motion.button>
        </div>

        <div className="flex items-center justify-center gap-5 pt-6">
          {[
            { label: "Koleksiyonlar", href: "/koleksiyonlar" },
            { label: "Özel Tasarım", href: "/ozel-tasarim" },
            { label: "İletişim", href: "/iletisim" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[8px] tracking-widest uppercase font-sans transition-colors duration-300"
              style={{ color: "rgba(255,255,255,0.2)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = `${GOLD}60`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.2)")
              }
            >
              {l.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Exclusive Footer ───────────────────────────────────── */
function ExclusiveFooter() {
  return (
    <footer
      className="py-8 px-8 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-3"
      style={{ borderTop: `1px solid rgba(255,255,255,0.04)` }}
    >
      <p
        className="text-[8px] tracking-widest font-sans"
        style={{ color: "rgba(255,255,255,0.14)" }}
      >
        © {new Date().getFullYear()} ONR Mücevherat. Tüm hakları saklıdır.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 text-[8px] tracking-[0.4em] uppercase font-sans
                   transition-colors duration-300"
        style={{ color: `${GOLD}35` }}
        onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
        onMouseLeave={(e) => (e.currentTarget.style.color = `${GOLD}35`)}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Ana Sayfaya Dön
      </Link>
    </footer>
  );
}

/* ─── Inquiry Modal ──────────────────────────────────────── */
function InquiryModal({
  item,
  onClose,
}: {
  item: ExItem;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const lineStyle: React.CSSProperties = {
    borderBottom: `1px solid ${GOLD}22`,
  };

  const inputClass =
    "w-full bg-transparent py-3 outline-none font-sans font-light text-sm " +
    "placeholder-white/20 transition-all duration-300 text-white/65";

  return (
    <motion.div
      className="fixed inset-0 flex items-end sm:items-center justify-center"
      style={{ zIndex: 300 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.88)",
          backdropFilter: "blur(10px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full sm:max-w-lg mx-4 sm:mx-0 px-10 py-12
                   overflow-y-auto max-h-[92vh]"
        style={{
          backgroundColor: "#101010",
          borderTop: `2px solid ${GOLD}45`,
          borderLeft: `1px solid ${GOLD}12`,
          borderRight: `1px solid ${GOLD}12`,
        }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-5 right-5 transition-colors duration-300"
          style={{ color: "rgba(255,255,255,0.22)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.22)")
          }
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header line */}
        <div className="flex items-center gap-3 mb-10">
          <span
            className="block flex-1 h-px"
            style={{ background: `${GOLD}22` }}
          />
          <span
            className="text-[7px] tracking-[0.55em] uppercase font-sans"
            style={{ color: `${GOLD}45` }}
          >
            {item.name} — {item.edition}
          </span>
          <span
            className="block flex-1 h-px"
            style={{ background: `${GOLD}22` }}
          />
        </div>

        {/* Success state */}
        {sent ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-10"
          >
            <div
              className="w-12 h-12 mx-auto flex items-center justify-center mb-7"
              style={{ border: `1px solid ${GOLD}42` }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={GOLD}
                strokeWidth="1.4"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3
              className="font-serif font-light text-2xl mb-3"
              style={{ color: GOLD }}
            >
              Talebiniz Alındı
            </h3>
            <p
              className="text-[13px] font-sans font-light leading-relaxed"
              style={{ color: "rgba(255,255,255,0.33)" }}
            >
              Uzman danışmanımız 24 saat içinde sizinle temasa geçecektir.
            </p>
            <button
              onClick={onClose}
              className="mt-9 text-[8px] tracking-[0.42em] uppercase font-sans px-8 py-3
                         transition-all duration-300"
              style={{ border: `1px solid ${GOLD}32`, color: GOLD }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = GOLD;
                e.currentTarget.style.backgroundColor = `${GOLD}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${GOLD}32`;
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Kapat
            </button>
          </motion.div>
        ) : (
          <>
            <p
              className="text-[8px] tracking-[0.48em] uppercase font-sans mb-2"
              style={{ color: `${GOLD}60` }}
            >
              Fiyat Teklifi & Danışmanlık
            </p>
            <h3
              className="font-serif font-light text-3xl mb-2"
              style={{ color: GOLD }}
            >
              Özel Görüşme
            </h3>
            <p
              className="text-[11px] font-sans font-light leading-relaxed mb-9"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              Bu parçaya özel fiyat teklifi ve danışmanlık için bilgilerinizi
              bırakın. 24 saat içinde uzmanımız sizi arayacaktır.
            </p>

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Name */}
              <div>
                <label
                  className="block text-[7.5px] tracking-[0.45em] uppercase font-sans mb-2"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                >
                  Adınız Soyadınız{" "}
                  <span style={{ color: GOLD }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ad Soyad"
                  className={inputClass}
                  style={lineStyle}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderBottomColor = `${GOLD}65`)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderBottomColor = `${GOLD}22`)
                  }
                />
              </div>

              {/* Phone + Email */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-[7.5px] tracking-[0.45em] uppercase font-sans mb-2"
                    style={{ color: "rgba(255,255,255,0.28)" }}
                  >
                    Telefon <span style={{ color: GOLD }}>*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="+90 5XX XXX XX XX"
                    className={inputClass}
                    style={lineStyle}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderBottomColor = `${GOLD}65`)
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderBottomColor = `${GOLD}22`)
                    }
                  />
                </div>
                <div>
                  <label
                    className="block text-[7.5px] tracking-[0.45em] uppercase font-sans mb-2"
                    style={{ color: "rgba(255,255,255,0.28)" }}
                  >
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="email@example.com"
                    className={inputClass}
                    style={lineStyle}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderBottomColor = `${GOLD}65`)
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderBottomColor = `${GOLD}22`)
                    }
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  className="block text-[7.5px] tracking-[0.45em] uppercase font-sans mb-2"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                >
                  Notunuz
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Bu parçaya ilişkin notlarınız..."
                  className={`${inputClass} resize-none`}
                  style={lineStyle}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderBottomColor = `${GOLD}65`)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderBottomColor = `${GOLD}22`)
                  }
                />
              </div>

              {/* Submit */}
              <div className="flex items-center gap-4 pt-1">
                <button
                  type="submit"
                  className="flex-1 flex justify-center items-center gap-3 text-[9px] tracking-[0.38em]
                             uppercase font-sans py-4 transition-all duration-400"
                  style={{ border: `1px solid ${GOLD}40`, color: GOLD }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = GOLD;
                    e.currentTarget.style.backgroundColor = `${GOLD}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${GOLD}40`;
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Teklif Talep Et
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[8px] tracking-widest uppercase font-sans transition-colors duration-300"
                  style={{ color: "rgba(255,255,255,0.18)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.18)")
                  }
                >
                  İptal
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Export ────────────────────────────────────────── */
export default function ExclusivePageClient() {
  const [inquiryItem, setInquiryItem] = useState<ExItem | null>(null);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Theatrical curtain entrance */}
      <Curtain />

      {/* Custom dark navbar */}
      <ExclusiveNavbar />

      {/* Hero */}
      <HeroSection />

      {/* Lookbook */}
      {ITEMS.map((item, i) => (
        <div key={item.id}>
          <LookbookItem item={item} index={i} onInquiry={setInquiryItem} />
          {i < ITEMS.length - 1 && (
            <GoldDivider number={`${String(i + 1).padStart(2, "0")} / ${String(ITEMS.length).padStart(2, "0")}`} />
          )}
        </div>
      ))}

      {/* Closing CTA */}
      <ExclusiveShopSection />
      <ClosingSection onInquiry={() => setInquiryItem(ITEMS[0])} />

      {/* Footer */}
      <ExclusiveFooter />

      {/* Inquiry Modal */}
      <AnimatePresence>
        {inquiryItem && (
          <InquiryModal
            key={inquiryItem.id}
            item={inquiryItem}
            onClose={() => setInquiryItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
