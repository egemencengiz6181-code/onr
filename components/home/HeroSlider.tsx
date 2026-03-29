"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/images/slider/1%20(2).png",
    imageAlt: "Pırlanta yüzük yakın çekim",
    overline: "Yeni Koleksiyon — 2026",
    headline: "Sonsuzluğun\nEstetiği",
    subline:
      "Her taş, bir ömrün sessiz tanığı. Her parça, sonsuzluğa yazılmış bir şiir.",
    cta: { label: "Koleksiyonu Keşfet", href: "/koleksiyonlar" },
    align: "center",
  },
  {
    id: 2,
    image: "/images/slider/2%20(4).png",
    imageAlt: "Lüks altın yüzük",
    overline: "Özel Koleksiyon",
    headline: "Altın\nMiras",
    subline:
      "Nesilden nesile taşınan zarafet. Ustalıkla işlenmiş saf altın koleksiyonumuz.",
    cta: { label: "Halkalar", href: "/halkalar" },
    align: "left",
  },
  {
    id: 3,
    image: "/images/slider/3%20(5).png",
    imageAlt: "Zarif elmas kolye",
    overline: "Exclusive — Yalnızca Seçkinlere",
    headline: "Işığın\nDansı",
    subline:
      "Nadir taşlarla hazırlanan bu seçki, yalnızca en özel anlara layık.",
    cta: { label: "Exclusive Galeri", href: "/exclusive" },
    align: "right",
  },
  {
    id: 4,
    image: "/images/slider/4%20(3).png",
    imageAlt: "ONR Mücevherat koleksiyon",
    overline: "El İşçiliği — Ankara",
    headline: "Zanaatın\nZirvesi",
    subline:
      "Her detayda ustanın izi, her parçada yüzyıllık geleneğin ruhu.",
    cta: { label: "Özel Tasarım", href: "/ozel-tasarim" },
    align: "center",
  },
];

const imageVariants = {
  enter: { opacity: 0, scale: 1.08 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    scale: 1.04,
    transition: { duration: 0.8, ease: [0.55, 0, 1, 0.45] },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay,
    },
  }),
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.5, ease: [0.55, 0, 1, 0.45] },
  },
};

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visibleSlides = isMobile ? slides.slice(0, 2) : slides;

  // Clamp current index when switching to fewer slides (e.g. desktop → mobile)
  useEffect(() => {
    setCurrent((c) => Math.min(c, visibleSlides.length - 1));
  }, [visibleSlides.length]);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % visibleSlides.length);
  }, [visibleSlides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + visibleSlides.length) % visibleSlides.length);
  }, [visibleSlides.length]);

  // Auto-advance every 7 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next, isAutoPlaying]);

  const slide = visibleSlides[current];

  const alignClass =
    slide.align === "left"
      ? "items-start text-left"
      : slide.align === "right"
      ? "items-end text-right"
      : "items-center text-center";

  return (
    <section className="relative w-full h-screen overflow-hidden" aria-label="Hero Slider">
      {/* ── Background Images ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${slide.id}`}
          className="absolute inset-0"
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Multi-layer dark overlay for text readability ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-onyx/30 via-onyx/20 to-onyx/70 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-onyx/30 via-transparent to-transparent z-10" />

      {/* ── Slide Content ── */}
      <div className={`absolute inset-0 z-20 flex flex-col justify-end pb-24 md:pb-28 px-8 md:px-16 lg:px-24 ${alignClass}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${slide.id}`}
            className="max-w-2xl space-y-5"
          >
            {/* Overline */}
            <motion.p
              custom={0.1}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="section-overline text-gold-light/80"
            >
              {slide.overline}
            </motion.p>

            {/* Headline */}
            <motion.h1
              custom={0.3}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="font-serif font-light text-ivory-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl
                         leading-[1.05] tracking-wide whitespace-pre-line"
            >
              {slide.headline}
            </motion.h1>

            {/* Thin gold divider */}
            <motion.div
              custom={0.5}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`flex ${slide.align === "center" ? "justify-center" : slide.align === "right" ? "justify-end" : "justify-start"}`}
            >
              <span className="block w-14 h-px bg-gold-light/70" />
            </motion.div>

            {/* Subline */}
            <motion.p
              custom={0.6}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-ivory-100/65 text-sm md:text-base font-sans font-light leading-relaxed max-w-md"
            >
              {slide.subline}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              custom={0.75}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`pt-3 flex ${slide.align === "center" ? "justify-center" : slide.align === "right" ? "justify-end" : "justify-start"}`}
            >
              <a
                href={slide.cta.href}
                className="btn-luxury-light"
              >
                {slide.cta.label}
                <ArrowRight />
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Slide Progress Dots ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {visibleSlides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => {
              setCurrent(i);
              setIsAutoPlaying(false);
            }}
            aria-label={`Slayt ${i + 1}`}
            className="group relative py-2"
          >
            <span
              className={`block transition-all duration-500 rounded-full
                ${i === current
                  ? "w-10 h-px bg-gold"
                  : "w-4 h-px bg-ivory-100/40 group-hover:bg-ivory-100/70"
                }
              `}
            />
          </button>
        ))}
      </div>

      {/* ── Prev / Next Arrows (desktop only) ── */}
      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 flex-col gap-3">
        <button
          onClick={() => { prev(); setIsAutoPlaying(false); }}
          aria-label="Önceki slayt"
          className="w-11 h-11 border border-ivory-100/30 text-ivory-100/60
                     flex items-center justify-center
                     hover:border-gold hover:text-gold transition-all duration-300"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M18 15L12 9 6 15" /></svg>
        </button>
        <button
          onClick={() => { next(); setIsAutoPlaying(false); }}
          aria-label="Sonraki slayt"
          className="w-11 h-11 border border-ivory-100/30 text-ivory-100/60
                     flex items-center justify-center
                     hover:border-gold hover:text-gold transition-all duration-300"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M6 9L12 15 18 9" /></svg>
        </button>
      </div>

      {/* ── Slide counter (top-right) ── */}
      <div className="absolute top-[96px] right-8 md:right-16 z-20 text-ivory-100/40 
                      text-[10px] tracking-widest font-sans hidden md:block">
        <span className="text-ivory-100/75">{String(current + 1).padStart(2, "0")}</span>
        <span className="mx-2">/</span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>

      {/* ── Scrolldown indicator ── */}
      <div className="absolute bottom-20 right-8 md:right-16 z-20 hidden md:flex flex-col items-center gap-2">
        <span className="text-[8px] tracking-luxury-wide uppercase font-sans text-ivory-100/40 [writing-mode:vertical-rl]">
          Kaydır
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-ivory-100/40 to-transparent" />
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
