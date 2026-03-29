"use client";

import { useState, useMemo, useCallback, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/products";
import type { Product } from "@/lib/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";

/* ═══════════════════════════════════════════════
   CONSTANTS & TYPES
═══════════════════════════════════════════════ */
const ease = [0.25, 0.46, 0.45, 0.94] as const;

interface EditorialImage {
  src: string;
  alt: string;
  title?: string;
}

interface CategoryMeta {
  label: string;
  subtitle: string;
  description: string;
  heroSlides: { src: string; alt: string }[];
  editorialImages: EditorialImage[];
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  halkalar: {
    label: "Halkalar",
    subtitle: "Sonsuzluğun Sembolü",
    description:
      "Platin ve altın üzeri pırlanta yüzük koleksiyonu. Tektaştan sonsuzluk bandına, her halka bir söz taşır.",
    heroSlides: [
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=90&fit=crop&crop=center", alt: "Halkalar Koleksiyonu" },
      { src: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=1600&q=90&fit=crop&crop=center", alt: "Pırlanta Yüzükler" },
      { src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1600&q=90&fit=crop&crop=center", alt: "Halka Detay" },
    ],
    editorialImages: [
      { src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=90&fit=crop&crop=center", alt: "Usta İşçilik", title: "Zanaatın Kalbi" },
      { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=90&fit=crop&crop=center", alt: "Geometrik Zarafet", title: "Sonsuzluk Çizgisi" },
    ],
  },
  kolyeler: {
    label: "Kolyeler",
    subtitle: "Boyun Hattınızın Efendisi",
    description:
      "İnce solitaire sarkıtlardan tenis kolyelerine, zarafeti boyunuzda taşıyın.",
    heroSlides: [
      { src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1600&q=90&fit=crop&crop=center", alt: "Kolyeler Koleksiyonu" },
      { src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=90&fit=crop&crop=center", alt: "Pırlanta Kolyeler" },
      { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1600&q=90&fit=crop&crop=center", alt: "Kolye Detay" },
    ],
    editorialImages: [
      { src: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=1200&q=90&fit=crop&crop=center", alt: "Işığın Dansı", title: "Işığın Dansı" },
      { src: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1200&q=90&fit=crop&crop=center", alt: "Atölye", title: "Her Zümrüt Bir Hikâye" },
    ],
  },
  bileklikler: {
    label: "Bileklikler",
    subtitle: "Her Harekette Parlaklık",
    description:
      "Platin tenis bileklikten rose gold tasarımlara, her bilek için bir eser.",
    heroSlides: [
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=90&fit=crop&crop=top", alt: "Bileklikler Koleksiyonu" },
      { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1600&q=90&fit=crop&crop=center", alt: "Altın Bileklikler" },
      { src: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1600&q=90&fit=crop&crop=center", alt: "Bileklik Detay" },
    ],
    editorialImages: [
      { src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1200&q=90&fit=crop&crop=center", alt: "Kişiselleştirme", title: "Bileğinize Özel" },
      { src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=90&fit=crop&crop=center", alt: "Katmanlama Sanatı", title: "Katmanlama Sanatı" },
    ],
  },
  kupeler: {
    label: "Küpeler",
    subtitle: "Çerçeveleme Sanatı",
    description:
      "Pırlanta stud küpeden safir hoop tasarımlarına, yüzünüzü ışıkla çerçeveleyecek küpe koleksiyonu.",
    heroSlides: [
      { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1600&q=90&fit=crop&crop=center", alt: "Küpeler Koleksiyonu" },
      { src: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=1600&q=90&fit=crop&crop=center", alt: "Pırlanta Küpeler" },
      { src: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1600&q=90&fit=crop&crop=center", alt: "Küpe Detay" },
    ],
    editorialImages: [
      { src: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1200&q=90&fit=crop&crop=center", alt: "Detay", title: "Yüzünüzü Çerçeveleyin" },
      { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=90&fit=crop&crop=center", alt: "Minimal Zarafet", title: "Minimal Zarafet" },
    ],
  },
  inci: {
    label: "İnci",
    subtitle: "Denizin Armağanı",
    description:
      "Akoya'dan South Sea'ye, doğanın en saf mücevheri. Her inci, binlerce yılın hikâyesidir.",
    heroSlides: [
      { src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=90&fit=crop&crop=center", alt: "İnci Koleksiyonu" },
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=90&fit=crop&crop=center", alt: "İnci Mücevherler" },
      { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1600&q=90&fit=crop&crop=center", alt: "İnci Detay" },
    ],
    editorialImages: [
      { src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=90&fit=crop&crop=center", alt: "İnci Çeşitleri", title: "Denizin Sırrı" },
      { src: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1200&q=90&fit=crop&crop=center", alt: "Doğal İnci", title: "Doğanın Armağanı" },
    ],
  },
  setler: {
    label: "Setler",
    subtitle: "Kusursuz Uyum",
    description:
      "Düğün setlerinden hediye koleksiyonlarına, mücevherlerin birbiriyle konuştuğu özel setler.",
    heroSlides: [
      { src: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=1600&q=90&fit=crop&crop=center", alt: "Setler Koleksiyonu" },
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=90&fit=crop&crop=center", alt: "Mücevher Setleri" },
      { src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1600&q=90&fit=crop&crop=center", alt: "Set Detay" },
    ],
    editorialImages: [
      { src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=90&fit=crop&crop=center", alt: "Düğün Seti", title: "Bir Ömürlük Set" },
      { src: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=1200&q=90&fit=crop&crop=center", alt: "Hediye Seti", title: "Kusursuz Hediye" },
    ],
  },
};

/* ─── Filter Definitions ─── */
const FILTER_GROUPS = [
  {
    key: "material" as const,
    label: "Materyal",
    options: [
      { label: "14K Altın", value: "14K" },
      { label: "18K Altın", value: "18K" },
      { label: "Platin", value: "Platin" },
      { label: "Rose Gold", value: "Rose Gold" },
    ],
  },
  {
    key: "stone" as const,
    label: "Taş",
    options: [
      { label: "Pırlanta", value: "Pırlanta" },
      { label: "Akoya İnci", value: "Akoya" },
      { label: "South Sea İnci", value: "South Sea" },
      { label: "Tatlı Su İnci", value: "Tatlı Su" },
      { label: "Tahiti İnci", value: "Tahiti" },
      { label: "Safir", value: "Safir" },
      { label: "Zümrüt", value: "Zümrüt" },
      { label: "Turmalin", value: "Turmalin" },
    ],
  },
  {
    key: "gender" as const,
    label: "Cinsiyet",
    options: [
      { label: "For Her", value: "Kadın" },
      { label: "For Him", value: "Erkek" },
      { label: "Unisex", value: "Unisex" },
    ],
  },
] as const;

const SORT_OPTIONS = [
  { label: "Öne Çıkanlar", value: "featured" },
  { label: "Fiyat: Düşükten Yükseğe", value: "price-asc" },
  { label: "Fiyat: Yüksekten Düşüğe", value: "price-desc" },
  { label: "Yeni Gelenler", value: "new" },
];

interface FilterState {
  material: string[];
  stone: string[];
  gender: string[];
  sort: string;
}

/* ─── Filter Logic ─── */
function matchesFilters(product: Product, filters: FilterState): boolean {
  if (filters.material.length > 0) {
    const matStr = product.materials.join(" ").toLowerCase();
    if (!filters.material.some((f) => matStr.includes(f.toLowerCase())))
      return false;
  }
  if (filters.stone.length > 0) {
    const allText = [
      ...product.materials,
      ...product.stoneSpecs.map((s) => s.value),
    ]
      .join(" ")
      .toLowerCase();
    if (!filters.stone.some((f) => allText.includes(f.toLowerCase())))
      return false;
  }
  if (filters.gender.length > 0) {
    const genders = product.gender ?? [];
    const tags = product.tags ?? [];
    const allGender = [...genders, ...tags].join(" ").toLowerCase();
    if (!filters.gender.some((f) => allGender.includes(f.toLowerCase())))
      return false;
  }
  return true;
}

function applySorting(prods: Product[], sort: string): Product[] {
  const arr = [...prods];
  if (sort === "price-asc") return arr.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return arr.sort((a, b) => b.price - a.price);
  if (sort === "new")
    return arr.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  return arr;
}

/* ─── Grid builder: "Rhythmic Grid" ─ editorial at row 2, after 1st product ─── */
type GridItem =
  | { type: "product"; product: Product }
  | { type: "editorial"; image: EditorialImage };

function buildGridItems(
  prods: Product[],
  editorials: EditorialImage[]
): GridItem[] {
  if (prods.length === 0 || editorials.length === 0) {
    return prods.map((product) => ({ type: "product" as const, product }));
  }

  const items: GridItem[] = [];
  let eidx = 0;

  prods.forEach((product, i) => {
    items.push({ type: "product", product });

    // After 1st product of row 2 (index 3 in a 3-col grid), inject editorial
    // Row 1: [0, 1, 2]  →  Row 2: [3(product)] + [editorial(col-span-2)]
    if (i === 3) {
      items.push({
        type: "editorial",
        image: editorials[eidx++ % editorials.length],
      });
    }

    // For longer lists, inject another editorial every 9 products after the first
    if (i > 3 && (i - 3) % 9 === 0) {
      items.push({
        type: "editorial",
        image: editorials[eidx++ % editorials.length],
      });
    }
  });

  return items;
}

/* ═══════════════════════════════════════════════
   HERO SLIDER — full-width
═══════════════════════════════════════════════ */
function HeroSlider({
  slides,
  label,
  subtitle,
  description,
}: {
  slides: { src: string; alt: string }[];
  label: string;
  subtitle: string;
  description: string;
}) {
  const [active, setActive] = useState(0);
  const timer = useRef<number>(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    timer.current = window.setInterval(
      () => setActive((p) => (p + 1) % slides.length),
      5000
    );
    return () => { window.clearInterval(timer.current); };
  }, [slides.length]);

  return (
    <section className="relative w-full h-[40vh] md:h-[45vh] lg:h-[50vh] overflow-hidden bg-onyx">
      {slides.map((slide, i) => (
        <motion.div
          key={slide.src}
          initial={false}
          animate={{
            opacity: i === active ? 1 : 0,
            scale: i === active ? 1 : 1.05,
          }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-onyx/30 to-onyx/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-onyx/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end px-8 pb-12 lg:px-20 lg:pb-16">
        <div className="max-w-2xl">
          <motion.p
            key={`sub-${active}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gold text-[10px] tracking-[0.35em] uppercase mb-4 font-sans"
          >
            {subtitle}
          </motion.p>
          <motion.h1
            key={`h-${active}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-4"
          >
            {label}
          </motion.h1>
          <motion.p
            key={`desc-${active}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-white/60 font-sans font-light text-sm md:text-[15px] leading-relaxed max-w-lg"
          >
            {description}
          </motion.p>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-8 right-8 lg:right-20 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActive(i);
                window.clearInterval(timer.current);
              }}
              aria-label={`Slayt ${i + 1}`}
              className={`transition-all duration-500 ${
                i === active
                  ? "w-8 h-[2px] bg-gold"
                  : "w-3 h-[2px] bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FILTER ACCORDION (Framer Motion)
═══════════════════════════════════════════════ */
function FilterAccordion({
  group,
  selected,
  onToggle,
  isOpen,
  onOpenToggle,
}: {
  group: (typeof FILTER_GROUPS)[number];
  selected: string[];
  onToggle: (value: string) => void;
  isOpen: boolean;
  onOpenToggle: () => void;
}) {
  return (
    <div className="border-b border-charcoal/8">
      <button
        onClick={onOpenToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2.5">
          <span className="text-[10px] tracking-[0.22em] uppercase text-charcoal font-sans font-medium">
            {group.label}
          </span>
          {selected.length > 0 && (
            <span
              className="w-[18px] h-[18px] rounded-full bg-onyx text-white text-[8px]
                             flex items-center justify-center font-sans font-medium"
            >
              {selected.length}
            </span>
          )}
        </span>
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          className="w-3.5 h-3.5 text-charcoal/30"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35 }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <div className="pb-5 space-y-3">
              {group.options.map((opt) => {
                const active = selected.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => onToggle(opt.value)}
                    className="flex items-center gap-3 w-full text-left group/opt"
                  >
                    <div
                      className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center
                                  transition-all duration-200
                                  ${
                                    active
                                      ? "border-onyx bg-onyx"
                                      : "border-charcoal/20 group-hover/opt:border-charcoal/50"
                                  }`}
                    >
                      {active && (
                        <svg
                          viewBox="0 0 10 10"
                          className="w-2.5 h-2.5"
                          fill="none"
                        >
                          <path
                            d="M1.5 5l2.5 2.5 4.5-4.5"
                            stroke="#FAF9F6"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-[11px] tracking-[0.15em] uppercase font-sans transition-colors duration-200
                                  ${
                                    active
                                      ? "text-charcoal font-medium"
                                      : "text-charcoal/45 group-hover/opt:text-charcoal/75"
                                  }`}
                    >
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PRODUCT TILE — Cartier Standards
═══════════════════════════════════════════════ */
function ProductTile({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.06, ease }}
    >
      <Link href={`/urun/${product.slug}`} className="group block">
        {/* Ivory background image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F1EB]">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-[1100ms]
                       ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
          />
          {product.images[1] && (
            <Image
              src={product.images[1].src}
              alt={product.images[1].alt}
              fill
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              className="object-cover object-center absolute inset-0
                         opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5">
            {product.isNew && (
              <span
                className="bg-gold text-onyx text-[7px] tracking-[0.2em] uppercase
                               font-sans font-medium px-2.5 py-1"
              >
                Yeni
              </span>
            )}
          </div>

          {/* Hover: KEŞFEDİN button center-bottom (Cartier style) */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2
                          opacity-0 group-hover:opacity-100
                          translate-y-3 group-hover:translate-y-0
                          transition-all duration-500 ease-out z-10"
          >
            <span
              className="bg-onyx text-white text-[9px] tracking-[0.3em] uppercase
                             font-sans px-7 py-3 inline-block whitespace-nowrap"
            >
              Keşfedin
            </span>
          </div>
        </div>

        {/* Card Info */}
        <div className="pt-4 pb-2">
          <p className="text-[8px] tracking-[0.25em] uppercase text-charcoal/35 font-sans mb-1.5">
            {product.materials.slice(0, 2).join(" · ")}
          </p>
          <h3
            className="font-serif text-charcoal text-[15px] uppercase tracking-wide leading-snug mb-2
                         group-hover:text-gold-dark transition-colors duration-300"
          >
            {product.name}
          </h3>
          <p className="text-charcoal font-sans font-light text-[13px] tracking-wide">
            {product.priceFormatted}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════
   EDITORIAL TILE — col-span-2, no price/name
═══════════════════════════════════════════════ */
function EditorialTile({ image }: { image: EditorialImage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease }}
      className="col-span-1 sm:col-span-2 relative overflow-hidden group cursor-default"
    >
      <div className="relative aspect-[4/3] sm:aspect-[2.2/1] overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width:640px) 100vw, 66vw"
          className="object-cover object-center transition-transform duration-[1400ms]
                     ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-onyx/60 via-onyx/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-onyx/30 via-transparent to-transparent" />

        {/* Editorial overlay text — white/gold on dark, no CTA */}
        {image.title && (
          <div className="absolute bottom-0 left-0 p-6 sm:p-8 lg:p-10">
            <p className="text-gold text-[8px] tracking-[0.35em] uppercase font-sans mb-2">
              Editoryal
            </p>
            <h3 className="font-serif text-white text-xl sm:text-2xl lg:text-3xl leading-tight">
              {image.title}
            </h3>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   ACTIVE FILTER CHIPS
═══════════════════════════════════════════════ */
function ActiveChips({
  filters,
  onRemove,
  onClearAll,
}: {
  filters: FilterState;
  onRemove: (key: "material" | "stone" | "gender", value: string) => void;
  onClearAll: () => void;
}) {
  const chips: {
    key: "material" | "stone" | "gender";
    value: string;
    label: string;
  }[] = [];

  (["material", "stone", "gender"] as const).forEach((key) => {
    const group = FILTER_GROUPS.find((g) => g.key === key);
    if (!group) return;
    filters[key].forEach((v) => {
      const opt = group.options.find((o) => o.value === v);
      if (opt) chips.push({ key, value: v, label: opt.label });
    });
  });

  if (chips.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="flex flex-wrap items-center gap-2 pb-6"
    >
      {chips.map((chip) => (
        <button
          key={`${chip.key}-${chip.value}`}
          onClick={() => onRemove(chip.key, chip.value)}
          className="inline-flex items-center gap-1.5 border border-charcoal/15 px-3 py-1.5
                     text-[9px] tracking-[0.18em] uppercase font-sans text-charcoal/60
                     hover:border-charcoal/40 hover:text-charcoal transition-colors duration-200"
        >
          {chip.label}
          <svg viewBox="0 0 16 16" fill="none" className="w-2.5 h-2.5">
            <path
              d="M12 4L4 12M4 4l8 8"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        </button>
      ))}
      <button
        onClick={onClearAll}
        className="text-[9px] tracking-[0.18em] uppercase font-sans text-charcoal/35
                   hover:text-gold border-b border-charcoal/15 hover:border-gold/40
                   pb-px transition-all duration-200 ml-1"
      >
        Tümünü Temizle
      </button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   INNER CLIENT (uses useSearchParams)
═══════════════════════════════════════════════ */
function CategoryPageInner({ slug }: { slug: string }) {
  const meta = CATEGORY_META[slug] ?? CATEGORY_META["halkalar"];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /* ─── Parse URL → State ─── */
  const parseFiltersFromURL = useCallback((): FilterState => {
    const material =
      searchParams.get("material")?.split(",").filter(Boolean) ?? [];
    const stone =
      searchParams.get("stone")?.split(",").filter(Boolean) ?? [];
    const gender =
      searchParams.get("gender")?.split(",").filter(Boolean) ?? [];
    const sort = searchParams.get("sort") ?? "featured";
    return { material, stone, gender, sort };
  }, [searchParams]);

  const [filters, setFilters] = useState<FilterState>(parseFiltersFromURL);
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(
    new Set(["Materyal"])
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setFilters(parseFiltersFromURL());
  }, [parseFiltersFromURL]);

  /* ─── Sync State → URL ─── */
  const syncURL = useCallback(
    (newFilters: FilterState) => {
      const params = new URLSearchParams();
      if (newFilters.material.length)
        params.set("material", newFilters.material.join(","));
      if (newFilters.stone.length)
        params.set("stone", newFilters.stone.join(","));
      if (newFilters.gender.length)
        params.set("gender", newFilters.gender.join(","));
      if (newFilters.sort !== "featured") params.set("sort", newFilters.sort);
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, pathname]
  );

  const toggleFilter = useCallback(
    (key: "material" | "stone" | "gender", value: string) => {
      setFilters((prev) => {
        const arr = prev[key];
        const next = {
          ...prev,
          [key]: arr.includes(value)
            ? arr.filter((v) => v !== value)
            : [...arr, value],
        };
        syncURL(next);
        return next;
      });
    },
    [syncURL]
  );

  const removeFilter = useCallback(
    (key: "material" | "stone" | "gender", value: string) => {
      setFilters((prev) => {
        const next = { ...prev, [key]: prev[key].filter((v) => v !== value) };
        syncURL(next);
        return next;
      });
    },
    [syncURL]
  );

  const setSort = useCallback(
    (value: string) => {
      setFilters((prev) => {
        const next = { ...prev, sort: value };
        syncURL(next);
        return next;
      });
    },
    [syncURL]
  );

  const clearAll = useCallback(() => {
    const next: FilterState = {
      material: [],
      stone: [],
      gender: [],
      sort: "featured",
    };
    setFilters(next);
    syncURL(next);
  }, [syncURL]);

  const toggleAccordion = useCallback((label: string) => {
    setOpenAccordions((prev) => {
      const s = new Set(prev);
      if (s.has(label)) s.delete(label);
      else s.add(label);
      return s;
    });
  }, []);

  /* ─── Products ─── */
  const categoryProducts = useMemo(
    () => products.filter((p) => p.categorySlug === slug && !p.isExclusive),
    [slug]
  );

  const displayProducts = useMemo(() => {
    const filtered = categoryProducts.filter((p) =>
      matchesFilters(p, filters)
    );
    return applySorting(filtered, filters.sort);
  }, [categoryProducts, filters]);

  const gridItems = useMemo(
    () => buildGridItems(displayProducts, meta.editorialImages),
    [displayProducts, meta.editorialImages]
  );

  const totalActiveFilters =
    filters.material.length + filters.stone.length + filters.gender.length;

  /* ─── Sidebar JSX ─── */
  const SidebarContent = (
    <div>
      <div className="pb-5 mb-1 border-b border-charcoal/8">
        <p className="text-[9px] tracking-[0.3em] uppercase text-gold font-sans mb-1.5">
          Filtrele
        </p>
        <p className="font-serif text-charcoal text-lg leading-tight">
          {meta.label}
        </p>
        <p className="text-[11px] font-sans text-charcoal/35 mt-1">
          {displayProducts.length} ürün
        </p>
      </div>

      {FILTER_GROUPS.map((group) => (
        <FilterAccordion
          key={group.key}
          group={group}
          selected={filters[group.key]}
          onToggle={(val) => toggleFilter(group.key, val)}
          isOpen={openAccordions.has(group.label)}
          onOpenToggle={() => toggleAccordion(group.label)}
        />
      ))}

      {/* Sort in sidebar */}
      <div className="border-b border-charcoal/8">
        <button
          onClick={() => toggleAccordion("Sıralama")}
          className="w-full flex items-center justify-between py-5 text-left"
          aria-expanded={openAccordions.has("Sıralama")}
        >
          <span className="text-[10px] tracking-[0.22em] uppercase text-charcoal font-sans font-medium">
            Sıralama
          </span>
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className="w-3.5 h-3.5 text-charcoal/30"
            animate={{
              rotate: openAccordions.has("Sıralama") ? 180 : 0,
            }}
            transition={{ duration: 0.35 }}
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </button>
        <AnimatePresence initial={false}>
          {openAccordions.has("Sıralama") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="overflow-hidden"
            >
              <div className="pb-5 space-y-3">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSort(opt.value)}
                    className="flex items-center gap-3 w-full text-left group/opt"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center
                                  transition-all duration-200
                                  ${
                                    filters.sort === opt.value
                                      ? "border-onyx bg-onyx"
                                      : "border-charcoal/20 group-hover/opt:border-charcoal/50"
                                  }`}
                    >
                      {filters.sort === opt.value && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span
                      className={`text-[11px] tracking-[0.15em] uppercase font-sans transition-colors duration-200
                                  ${
                                    filters.sort === opt.value
                                      ? "text-charcoal font-medium"
                                      : "text-charcoal/45 group-hover/opt:text-charcoal/75"
                                  }`}
                    >
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {totalActiveFilters > 0 && (
        <div className="pt-6">
          <button
            onClick={clearAll}
            className="w-full border border-charcoal/15 py-3 text-[9px] tracking-[0.22em]
                       uppercase font-sans text-charcoal/45 hover:border-charcoal/40
                       hover:text-charcoal transition-all duration-200"
          >
            Filtreleri Temizle ({totalActiveFilters})
          </button>
        </div>
      )}
    </div>
  );

  /* ═══════════════
     RENDER
  ═══════════════ */
  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen bg-[#FAF9F6]">
        {/* ── Hero Slider (full-width) ── */}
        <HeroSlider
          slides={meta.heroSlides}
          label={meta.label}
          subtitle={meta.subtitle}
          description={meta.description}
        />

        {/* ── Breadcrumb ── */}
        <nav className="px-6 lg:px-10 xl:px-20 py-4 flex items-center gap-2 border-b border-charcoal/6">
          <Link
            href="/"
            className="text-[10px] tracking-widest uppercase text-charcoal/30 hover:text-charcoal
                       font-sans transition-colors duration-200"
          >
            Ana Sayfa
          </Link>
          <span className="text-charcoal/15 text-[10px]">/</span>
          <Link
            href="/koleksiyonlar"
            className="text-[10px] tracking-widest uppercase text-charcoal/30 hover:text-charcoal
                       font-sans transition-colors duration-200"
          >
            Koleksiyonlar
          </Link>
          <span className="text-charcoal/15 text-[10px]">/</span>
          <span className="text-[10px] tracking-widest uppercase text-charcoal font-sans font-medium">
            {meta.label}
          </span>
        </nav>

        {/* ── Layout: Sidebar + Grid ── */}
        <div className="flex px-6 lg:px-10 xl:px-20 py-10 lg:py-14 gap-10 lg:gap-14 max-w-[1600px] mx-auto">
          {/* Desktop Sidebar (sticky) */}
          <aside className="hidden lg:block w-[240px] xl:w-[260px] flex-shrink-0">
            <div
              className="sticky top-[96px] max-h-[calc(100vh-128px)] overflow-y-auto
                            pr-3 scrollbar-hide"
            >
              {SidebarContent}
            </div>
          </aside>

          {/* Grid Area */}
          <div className="flex-1 min-w-0">
            {/* Mobile: filter toggle + count */}
            <div className="lg:hidden flex items-center justify-between mb-6">
              <p className="text-[11px] tracking-widest uppercase text-charcoal/40 font-sans">
                {displayProducts.length} ürün
              </p>
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-2 border border-charcoal/15 px-4 py-2.5
                           text-[9px] tracking-[0.2em] uppercase font-sans text-charcoal
                           hover:border-charcoal/40 transition-colors duration-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  className="w-3.5 h-3.5"
                >
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="8" y1="12" x2="20" y2="12" />
                  <line x1="12" y1="18" x2="20" y2="18" />
                </svg>
                Filtrele & Sırala
                {totalActiveFilters > 0 && (
                  <span
                    className="w-4 h-4 rounded-full bg-onyx text-white text-[8px]
                                   flex items-center justify-center font-sans"
                  >
                    {totalActiveFilters}
                  </span>
                )}
              </button>
            </div>

            {/* Desktop: top bar with count + sort */}
            <div className="hidden lg:flex items-center justify-between mb-8">
              <p className="text-[11px] tracking-widest uppercase text-charcoal/40 font-sans">
                {displayProducts.length} ürün
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-charcoal/30 tracking-[0.2em] uppercase font-sans">
                  Sırala:
                </span>
                <select
                  value={filters.sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="text-[10px] tracking-widest uppercase font-sans text-charcoal
                             bg-transparent border-b border-charcoal/15 pb-0.5 pr-5
                             outline-none cursor-pointer hover:border-charcoal/40
                             transition-colors duration-200 appearance-none"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active filter chips */}
            <AnimatePresence>
              {totalActiveFilters > 0 && (
                <ActiveChips
                  filters={filters}
                  onRemove={removeFilter}
                  onClearAll={clearAll}
                />
              )}
            </AnimatePresence>

            {/* Product Grid */}
            <AnimatePresence mode="wait">
              {displayProducts.length > 0 ? (
                <motion.div
                  key={`grid-${slug}-${filters.sort}-${totalActiveFilters}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 lg:gap-x-7 lg:gap-y-14"
                >
                  {gridItems.map((item, i) =>
                    item.type === "product" ? (
                      <ProductTile
                        key={item.product.id}
                        product={item.product}
                        index={i}
                      />
                    ) : (
                      <EditorialTile key={`ed-${i}`} image={item.image} />
                    )
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-28 text-center"
                >
                  <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-sans mb-4">
                    Sonuç Bulunamadı
                  </p>
                  <p className="font-serif text-charcoal text-xl mb-6">
                    Bu filtrelerle eşleşen ürün yok
                  </p>
                  <button
                    onClick={clearAll}
                    className="border border-charcoal/20 px-8 py-3 text-[9px] tracking-[0.22em]
                               uppercase font-sans text-charcoal hover:border-charcoal
                               transition-colors duration-200"
                  >
                    Filtreleri Temizle
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile Sidebar Drawer ── */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-onyx/50 backdrop-blur-sm lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.45, ease }}
                className="fixed left-0 top-0 bottom-0 z-50 w-[300px] bg-[#FAF9F6]
                           overflow-y-auto p-6 lg:hidden"
              >
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-charcoal font-sans font-medium">
                    Filtrele & Sırala
                  </p>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Kapat"
                    className="w-8 h-8 flex items-center justify-center text-charcoal/35 hover:text-charcoal"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      className="w-5 h-5"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {SidebarContent}
                <div className="mt-6 space-y-3">
                  {totalActiveFilters > 0 && (
                    <button
                      onClick={() => {
                        clearAll();
                        setSidebarOpen(false);
                      }}
                      className="w-full bg-onyx text-white py-3.5 text-[9px] tracking-[0.22em]
                                 uppercase font-sans"
                    >
                      Temizle ve Kapat
                    </button>
                  )}
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="w-full border border-charcoal/15 py-3 text-[9px] tracking-[0.22em]
                               uppercase font-sans text-charcoal"
                  >
                    Sonuçları Gör ({displayProducts.length})
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ── Category CTA ── */}
        <section className="bg-onyx py-20 lg:py-24 px-6 lg:px-20 mt-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start
                       md:items-center justify-between gap-8"
          >
            <div>
              <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-4 font-sans">
                Özel Danışmanlık
              </p>
              <h2 className="font-serif text-white text-3xl lg:text-4xl mb-3">
                Sizin İçin Seçelim
              </h2>
              <p className="text-zinc-300 font-sans font-light text-[13px] leading-[1.85] max-w-md">
                Uzman kuyumcularımız, ihtiyacınıza en uygun parçayı birlikte
                bulmak için hazır.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/iletisim"
                className="border border-ivory/30 px-10 py-3.5 text-[10px] tracking-[0.2em]
                           uppercase text-white hover:bg-white hover:text-onyx
                           transition-all duration-300 font-sans whitespace-nowrap"
              >
                Randevu Alın
              </Link>
              <Link
                href="/koleksiyonlar"
                className="text-[10px] text-zinc-400 hover:text-gold tracking-[0.2em]
                           uppercase border-b border-zinc-500/40 hover:border-gold/40
                           pb-0.5 transition-all duration-300 font-sans whitespace-nowrap"
              >
                Tüm Koleksiyonlar
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </PageWrapper>
  );
}

/* ═══════════════════════════════════════════════
   EXPORTED WRAPPER — Suspense for useSearchParams
═══════════════════════════════════════════════ */
export default function CategoryPageClient({ slug }: { slug: string }) {
  return (
    <Suspense fallback={null}>
      <CategoryPageInner slug={slug} />
    </Suspense>
  );
}
