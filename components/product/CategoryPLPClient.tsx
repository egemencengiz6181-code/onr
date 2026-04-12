"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/products";
import type { Product } from "@/lib/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";

// ─── Types ────────────────────────────────────────────────────────
type CategorySlug = "kolye" | "kupe" | "bileklik" | "yuzuk" | "setler" | "inci" | "markalar";

// ─── Category → product table ─────────────────────────────────────
const SLUG_TO_CATEGORY: Record<CategorySlug, string[]> = {
  kolye: ["kolyeler"],
  kupe: ["kupeler"],
  bileklik: ["bileklikler"],
  yuzuk: ["halkalar"],
  setler: ["setler"],
  inci: ["inci"],
  markalar: ["kolyeler", "kupeler", "bileklikler", "halkalar", "inci", "setler"],
};

// ─── Editorial / hero meta ────────────────────────────────────────
interface EditorialCard {
  image: string;
  headline: string;
  sub: string;
  href: string;
}

interface CategoryMeta {
  title: string;
  subtitle: string;
  hero: string[];
  editorials: EditorialCard[];
}

const CATEGORY_META: Record<CategorySlug, CategoryMeta> = {
  kolye: {
    title: "Kolyeler",
    subtitle: "Her boğaza bir anıt",
    hero: [
      "/images/web/1 (3).png",
      "/images/web/4 (4).png",
      "/images/web/7 (2).png",
    ],
    editorials: [
      { image: "/images/web/3 (6).png", headline: "Pırlantının Işığı", sub: "Tektaş ve tennis kolye seçkisi", href: "/koleksiyonlar/kolyeler?tas=P%C4%B1rlanta" },
      { image: "/images/web/6 (2).png", headline: "İnci Zarif", sub: "Akoya ve South Sea inci kolye koleksiyonu", href: "/koleksiyonlar/inci" },
    ],
  },
  kupe: {
    title: "Küpeler",
    subtitle: "Çerçevelenmiş güzellik",
    hero: [
      "/images/web/5 (3).png",
      "/images/web/8 (1).png",
      "/images/web/3 (6).png",
    ],
    editorials: [
      { image: "/images/web/4 (4).png", headline: "Saplama Klasikleri", sub: "Zamanın ötesinde saplama küpeler", href: "/koleksiyonlar/kupeler?tur=saplama" },
      { image: "/images/web/9 (2).png", headline: "Sarkıt Koleksiyonu", sub: "Hareketle canlanan küpe tasarımları", href: "/koleksiyonlar/kupeler?tur=sark%C4%B1t" },
    ],
  },
  bileklik: {
    title: "Bileklikler",
    subtitle: "Her harekette parıltı",
    hero: [
      "/images/web/6 (2).png",
      "/images/web/1 (3).png",
      "/images/web/5 (3).png",
    ],
    editorials: [
      { image: "/images/web/7 (2).png", headline: "Tennis Klasik", sub: "Pırlanta tennis bileklik koleksiyonu", href: "/koleksiyonlar/bileklikler?tur=tennis" },
      { image: "/images/web/8 (1).png", headline: "Altın Dokular", sub: "18K altın bileklik ve kelepçe seçkisi", href: "/koleksiyonlar/bileklikler?mat=18K" },
    ],
  },
  yuzuk: {
    title: "Yüzükler",
    subtitle: "Sonsuzluğun simgesi",
    hero: [
      "/images/web/9 (2).png",
      "/images/web/4 (4).png",
      "/images/web/6 (2).png",
    ],
    editorials: [
      { image: "/images/web/3 (6).png", headline: "Nişan Seçkisi", sub: "Oval, yuvarlak ve prenses kesim tektaşlar", href: "/koleksiyonlar/halkalar?tas=P%C4%B1rlanta" },
      { image: "/images/web/1 (3).png", headline: "Renkli Taşlar", sub: "Safir, yakut ve zümrüt detaylı yüzükler", href: "/koleksiyonlar/halkalar?tas=Safir" },
    ],
  },
  setler: {
    title: "Setler",
    subtitle: "Bir bütünün zarif parçaları",
    hero: [
      "/images/web/7 (2).png",
      "/images/web/5 (3).png",
      "/images/web/9 (2).png",
    ],
    editorials: [
      { image: "/images/web/4 (4).png", headline: "Düğün Koleksiyonu", sub: "Özel gününüze özel set tasarımları", href: "/koleksiyonlar/setler?tur=dug%C3%BCn" },
      { image: "/images/web/6 (2).png", headline: "İnci Uyumu", sub: "Akoya ve South Sea inci set koleksiyonu", href: "/koleksiyonlar/setler?tas=inci" },
    ],
  },
  inci: {
    title: "İnci Koleksiyonu",
    subtitle: "Okyanusun mirası",
    hero: [
      "/images/web/3 (6).png",
      "/images/web/8 (1).png",
      "/images/web/1 (3).png",
    ],
    editorials: [
      { image: "/images/web/7 (2).png", headline: "Akoya Saflığı", sub: "Japonya'nın en parlak incileri", href: "/koleksiyonlar/inci?inci=akoya" },
      { image: "/images/web/5 (3).png", headline: "South Sea İhtişamı", sub: "Avustralya ve Filipinler'den 11–16 mm inciler", href: "/koleksiyonlar/inci?inci=south-sea" },
    ],
  },
  markalar: {
    title: "Markalar & Seriler",
    subtitle: "ONR imzasıyla tanışın",
    hero: [
      "/images/web/4 (4).png",
      "/images/web/9 (2).png",
      "/images/web/7 (2).png",
    ],
    editorials: [
      { image: "/images/web/3 (6).png", headline: "ONR Signature", sub: "İmza tasarımlar — zanaatkârlığın doruk noktası", href: "/markalar?marka=onr-signature" },
      { image: "/images/web/6 (2).png", headline: "ONR Heritage", sub: "Kadim teknikler, çağdaş ruh", href: "/markalar?marka=onr-heritage" },
    ],
  },
};

// ─── Filter groups ────────────────────────────────────────────────
interface FilterOption { value: string; label: string }

const MATERIAL_OPTIONS: FilterOption[] = [
  { value: "14K", label: "14K Altın" },
  { value: "18K", label: "18K Altın" },
  { value: "22K", label: "22K Altın" },
];

const GOLD_COLOR_OPTIONS: FilterOption[] = [
  { value: "Sarı", label: "Sarı" },
  { value: "Beyaz", label: "Beyaz" },
  { value: "Roze", label: "Roze" },
];

const PEARL_TYPE_OPTIONS: FilterOption[] = [
  { value: "akoya", label: "Akoya" },
  { value: "south-sea", label: "South Sea" },
  { value: "tatliSu", label: "Tatlı Su" },
  { value: "tahiti", label: "Tahiti" },
];

const PEARL_COLOR_OPTIONS: FilterOption[] = [
  { value: "beyaz-inci", label: "Beyaz" },
  { value: "krem-inci", label: "Krem" },
  { value: "pembe-inci", label: "Pembe" },
  { value: "siyah-inci", label: "Siyah" },
];

const GENDER_OPTIONS: FilterOption[] = [
  { value: "Kadın", label: "Kadın" },
  { value: "Erkek", label: "Erkek" },
  { value: "Unisex", label: "Unisex" },
];

const PRICE_OPTIONS: FilterOption[] = [
  { value: "0-50000", label: "₺50.000 altı" },
  { value: "50000-150000", label: "₺50K – ₺150K" },
  { value: "150000-300000", label: "₺150K – ₺300K" },
  { value: "300000-999999", label: "₺300K üzeri" },
];

const SORT_OPTIONS: FilterOption[] = [
  { value: "featured", label: "Öne Çıkanlar" },
  { value: "price-asc", label: "Fiyat: Düşükten Yükseğe" },
  { value: "price-desc", label: "Fiyat: Yüksekten Düşüğe" },
  { value: "new", label: "Yeni Gelenler" },
];

// ─── Filter logic ─────────────────────────────────────────────────
function matchProduct(
  p: Product,
  mat: string[], renk: string[], tas: string[],
  inci: string[], inciRenk: string[],
  cinsiyet: string[], priceRange: string | null,
): boolean {
  const matStr = p.materials.join(" ").toLowerCase();
  const tagStr = (p.tags ?? []).join(" ").toLowerCase();
  const genderStr = (p.gender ?? []).join(" ").toLowerCase();

  if (mat.length > 0 && !mat.some((m) => matStr.includes(m.toLowerCase()))) return false;
  if (renk.length > 0 && !renk.some((r) => matStr.includes(r.toLowerCase()))) return false;
  if (tas.length > 0 && !tas.some((s) => matStr.includes(s.toLowerCase()) || tagStr.includes(s.toLowerCase()))) return false;
  if (inci.length > 0 && !inci.some((i) => tagStr.includes(i.toLowerCase()))) return false;
  if (inciRenk.length > 0 && !inciRenk.some((r) => tagStr.includes(r.toLowerCase()))) return false;
  if (cinsiyet.length > 0 && !cinsiyet.some((g) => genderStr.includes(g.toLowerCase()))) return false;

  if (priceRange) {
    const [min, max] = priceRange.split("-").map(Number);
    if (p.price < min || p.price > max) return false;
  }
  return true;
}

function sortProducts(list: Product[], sort: string): Product[] {
  const copy = [...list];
  if (sort === "price-asc") copy.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") copy.sort((a, b) => b.price - a.price);
  else if (sort === "new") copy.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  return copy;
}

// ─── URL helpers ──────────────────────────────────────────────────
function getMulti(sp: URLSearchParams, key: string): string[] {
  return sp.getAll(key).filter(Boolean);
}

// ─── Framer Motion variants ───────────────────────────────────────
const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

// ─── Sub-components ───────────────────────────────────────────────

/** Accordion sidebar group */
function FilterGroup({
  title,
  options,
  paramKey,
  selected,
  onToggle,
  single = false,
}: {
  title: string;
  options: FilterOption[];
  paramKey: string;
  selected: string[];
  onToggle: (key: string, val: string, single?: boolean) => void;
  single?: boolean;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-[#1A1A1A]/[0.06]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-[8.5px] tracking-[0.3em] uppercase font-sans text-[#1A1A1A]/55 font-medium">
          {title}
        </span>
        <span
          className="text-[#1A1A1A]/35 transition-transform duration-300 text-[10px]"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-2.5">
              {options.map((opt) => {
                const active = selected.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => onToggle(paramKey, opt.value, single)}
                    className="flex items-center gap-3 w-full group"
                  >
                    <span
                      className={`w-3.5 h-3.5 border flex-shrink-0 transition-colors duration-200 flex items-center justify-center ${
                        active ? "border-gold bg-gold" : "border-[#1A1A1A]/20 bg-transparent group-hover:border-[#1A1A1A]/40"
                      }`}
                    >
                      {active && (
                        <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                          <polyline points="1,2.5 2.8,4 6,1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span className="text-[11px] font-sans font-light text-[#1A1A1A]/55 group-hover:text-[#1A1A1A]/80 transition-colors text-left">
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

/** Active filter chip */
function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#1A1A1A]/15 hover:border-[#1A1A1A]/35 transition-colors group"
    >
      <span className="text-[9px] tracking-[0.15em] uppercase font-sans text-[#1A1A1A]/55">{label}</span>
      <span className="text-[#1A1A1A]/30 group-hover:text-[#1A1A1A]/60 text-[11px] leading-none">×</span>
    </button>
  );
}

/** Single product tile */
function ProductTile({ product }: { product: Product }) {
  return (
    <Link href={`/urun/${product.slug}`} className="group block">
      <div className="relative overflow-hidden bg-[#EFECE7]" style={{ aspectRatio: "3/4" }}>
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/30 transition-colors duration-500 flex items-end justify-center pb-8">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[7.5px] tracking-[0.35em] uppercase font-sans text-white border border-white/60 px-4 py-2">
            Keşfet
          </span>
        </div>
        {/* Badges */}
        {product.isNew && (
          <div className="absolute top-3 right-3 bg-gold px-2.5 py-1">
            <span className="text-[6px] text-onyx tracking-[0.25em] uppercase font-sans">Yeni</span>
          </div>
        )}
        {product.isExclusive && (
          <div className="absolute top-3 left-3 border border-gold/40 px-2.5 py-1 backdrop-blur-sm bg-[#0A0A0A]/20">
            <span className="text-[6px] text-ivory-100/80 tracking-[0.3em] uppercase font-sans">Exclusive</span>
          </div>
        )}
      </div>
      <div className="pt-4 pr-2">
        <p className="text-[7px] tracking-[0.3em] uppercase font-sans text-gold/80 mb-1.5">{product.category}</p>
        <h3 className="font-serif font-light text-[#1A1A1A] text-[15px] leading-[1.2] tracking-[0.02em] mb-2">
          {product.name}
        </h3>
        <p className="text-[11px] font-sans font-light text-[#1A1A1A]/45">{product.priceFormatted}</p>
      </div>
    </Link>
  );
}

/** Editorial 2-col tile */
function EditorialTile({ card }: { card: EditorialCard }) {
  return (
    <Link href={card.href} className="group relative block overflow-hidden col-span-2" style={{ aspectRatio: "16/7" }}>
      <Image
        src={card.image}
        alt={card.headline}
        fill
        sizes="(max-width: 1200px) 66vw, 50vw"
        className="object-cover object-center transition-transform duration-[900ms] group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/65 via-[#0A0A0A]/25 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-10">
        <p className="text-[8px] tracking-[0.4em] uppercase font-sans text-gold mb-3">{card.sub}</p>
        <h3 className="font-serif font-light text-white text-[2rem] md:text-[2.4rem] leading-[1.1] mb-6">
          {card.headline}
        </h3>
        <span className="inline-block text-[7.5px] tracking-[0.3em] uppercase font-sans text-white/75 border border-white/30 px-4 py-2 w-fit group-hover:bg-white group-hover:text-onyx transition-colors duration-300">
          Koleksiyonu Gör
        </span>
      </div>
    </Link>
  );
}

// ─── Hero Slider ──────────────────────────────────────────────────
function HeroSlider({ images, title, subtitle }: { images: string[]; title: string; subtitle: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "45vh", minHeight: 280 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
        >
          <Image src={images[active]} alt={title} fill priority={active === 0} sizes="100vw" className="object-cover object-center" />
        </motion.div>
      </AnimatePresence>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/50 via-transparent to-[#0A0A0A]/40" />

      {/* Text */}
      <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-10 md:pb-14">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[8px] tracking-[0.45em] uppercase font-sans text-gold mb-3"
        >
          {subtitle}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="font-serif font-light text-white text-[2.8rem] md:text-[3.8rem] leading-[1.02]"
        >
          {title}
        </motion.h1>
      </div>

      {/* Dot nav */}
      {images.length > 1 && (
        <div className="absolute bottom-4 right-8 md:right-16 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Görsel ${i + 1}`}
              onClick={() => setActive(i)}
              className={`transition-all duration-300 ${i === active ? "w-6 h-[2px] bg-white" : "w-2 h-[2px] bg-white/40"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────
export default function CategoryPLPClient({ slug }: { slug: CategorySlug }) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const meta = CATEGORY_META[slug];

  // ── Read filters from URL ──────────────────────────────────────
  const matFilter = getMulti(sp, "mat");
  const renkFilter = getMulti(sp, "renk");
  const tasFilter = getMulti(sp, "tas");
  const inciFilter = getMulti(sp, "inci");
  const inciRenkFilter = getMulti(sp, "inci_renk");
  const cinsiyetFilter = getMulti(sp, "cinsiyet");
  const priceFilter = sp.get("fiyat");
  const sortFilter = sp.get("siralama") ?? "featured";

  // ── Write filters to URL ───────────────────────────────────────
  const toggleFilter = useCallback(
    (key: string, val: string, single = false) => {
      const next = new URLSearchParams(sp.toString());
      if (single) {
        const cur = next.get(key);
        if (cur === val) next.delete(key);
        else next.set(key, val);
      } else {
        const all = next.getAll(key);
        if (all.includes(val)) {
          next.delete(key);
          all.filter((v) => v !== val).forEach((v) => next.append(key, v));
        } else {
          next.append(key, val);
        }
      }
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [sp, router, pathname],
  );

  const clearAll = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  // ── Build active chips list ────────────────────────────────────
  const activeChips = useMemo(() => {
    const chips: { label: string; key: string; val: string }[] = [];
    const add = (key: string, vals: string[], opts: FilterOption[]) =>
      vals.forEach((v) => {
        const opt = opts.find((o) => o.value === v);
        if (opt) chips.push({ label: opt.label, key, val: v });
      });
    add("mat", matFilter, MATERIAL_OPTIONS);
    add("renk", renkFilter, GOLD_COLOR_OPTIONS);
    add("inci", inciFilter, PEARL_TYPE_OPTIONS);
    add("inci_renk", inciRenkFilter, PEARL_COLOR_OPTIONS);
    add("cinsiyet", cinsiyetFilter, GENDER_OPTIONS);
    if (priceFilter) {
      const opt = PRICE_OPTIONS.find((o) => o.value === priceFilter);
      if (opt) chips.push({ label: opt.label, key: "fiyat", val: priceFilter });
    }
    return chips;
  }, [matFilter, renkFilter, tasFilter, inciFilter, inciRenkFilter, cinsiyetFilter, priceFilter]);

  // ── Filter + sort products ─────────────────────────────────────
  const filtered = useMemo(() => {
    const categorySlugs = SLUG_TO_CATEGORY[slug];
    const base = products.filter((p) => categorySlugs.includes(p.categorySlug));
    const matched = base.filter((p) =>
      matchProduct(p, matFilter, renkFilter, tasFilter, inciFilter, inciRenkFilter, cinsiyetFilter, priceFilter),
    );
    return sortProducts(matched, sortFilter);
  }, [slug, matFilter, renkFilter, tasFilter, inciFilter, inciRenkFilter, cinsiyetFilter, priceFilter, sortFilter]);

  // ── Build grid with editorial breaks ──────────────────────────
  type GridItem =
    | { type: "product"; product: Product }
    | { type: "editorial"; card: EditorialCard; idx: number };

  const gridItems = useMemo<GridItem[]>(() => {
    const items: GridItem[] = [];
    let editorialCounter = 0;
    filtered.forEach((p, i) => {
      items.push({ type: "product", product: p });
      // After every 6 products, insert an editorial card (if available)
      if ((i + 1) % 6 === 0 && editorialCounter < meta.editorials.length) {
        items.push({ type: "editorial", card: meta.editorials[editorialCounter], idx: editorialCounter });
        editorialCounter++;
      }
    });
    return items;
  }, [filtered, meta.editorials]);

  // ── Show pearl sub-filters only when slug is inci or inci filter active ──
  const showPearlFilters = slug === "inci" || inciFilter.length > 0 || tasFilter.includes("inci");

  // ── Sidebar JSX ────────────────────────────────────────────────
  const sidebarContent = (
    <div className="space-y-0">
      <FilterGroup
        title="Ayar"
        options={MATERIAL_OPTIONS}
        paramKey="mat"
        selected={matFilter}
        onToggle={toggleFilter}
      />
      <FilterGroup
        title="Renk"
        options={GOLD_COLOR_OPTIONS}
        paramKey="renk"
        selected={renkFilter}
        onToggle={toggleFilter}
      />
      <AnimatePresence>
        {showPearlFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FilterGroup
              title="İnci Türü"
              options={PEARL_TYPE_OPTIONS}
              paramKey="inci"
              selected={inciFilter}
              onToggle={toggleFilter}
            />
            <FilterGroup
              title="İnci Rengi"
              options={PEARL_COLOR_OPTIONS}
              paramKey="inci_renk"
              selected={inciRenkFilter}
              onToggle={toggleFilter}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <FilterGroup
        title="Cinsiyet"
        options={GENDER_OPTIONS}
        paramKey="cinsiyet"
        selected={cinsiyetFilter}
        onToggle={toggleFilter}
      />
      <FilterGroup
        title="Fiyat Aralığı"
        options={PRICE_OPTIONS}
        paramKey="fiyat"
        selected={priceFilter ? [priceFilter] : []}
        onToggle={toggleFilter}
        single
      />
      <FilterGroup
        title="Sıralama"
        options={SORT_OPTIONS}
        paramKey="siralama"
        selected={[sortFilter]}
        onToggle={toggleFilter}
        single
      />
    </div>
  );

  return (
    <PageWrapper>
      <Navbar />

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-[#0A0A0A]/40 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 w-[310px] bg-[#FAF9F6] z-50 lg:hidden flex flex-col overflow-y-auto"
              initial={{ x: -310 }}
              animate={{ x: 0 }}
              exit={{ x: -310 }}
              transition={{ type: "tween", duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#1A1A1A]/[0.07]">
                <span className="text-[8px] tracking-[0.4em] uppercase font-sans text-[#1A1A1A]/45">Filtrele</span>
                <button onClick={() => setMobileSidebarOpen(false)} aria-label="Kapat" className="text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 px-6 py-2">{sidebarContent}</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-[#FAF9F6] pt-[72px] md:pt-[126px]">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <HeroSlider images={meta.hero} title={meta.title} subtitle={meta.subtitle} />

        {/* ── Breadcrumb ─────────────────────────────────────────── */}
        <nav className="px-6 md:px-10 lg:px-16 py-[13px] border-b border-[#1A1A1A]/[0.05]">
          <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-[7.5px] font-sans tracking-[0.24em] uppercase text-[#1A1A1A]/30">
            <Link href="/" className="hover:text-gold transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-[#1A1A1A]/55">{meta.title}</span>
          </div>
        </nav>

        {/* ── Content ─────────────────────────────────────────────── */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 xl:px-16 py-8 md:py-12">
          <div className="flex gap-8 xl:gap-12">

            {/* ── Sidebar (desktop) ─────────────────────────── */}
            <aside className="hidden lg:block w-[220px] xl:w-[240px] flex-shrink-0 self-start sticky top-[140px]">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[8px] tracking-[0.4em] uppercase font-sans text-[#1A1A1A]/45">Filtrele</span>
                {activeChips.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-[8px] tracking-[0.15em] uppercase font-sans text-[#1A1A1A]/35 hover:text-gold transition-colors"
                  >
                    Temizle
                  </button>
                )}
              </div>
              {sidebarContent}
            </aside>

            {/* ── Main area ─────────────────────────────────── */}
            <div className="flex-1 min-w-0">

              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  {/* Mobile filter button */}
                  <button
                    onClick={() => setMobileSidebarOpen(true)}
                    className="lg:hidden flex items-center gap-2 border border-[#1A1A1A]/15 px-3 py-2 hover:border-[#1A1A1A]/30 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="20" y2="12" /><line x1="12" y1="18" x2="20" y2="18" />
                    </svg>
                    <span className="text-[8px] tracking-[0.2em] uppercase font-sans text-[#1A1A1A]/50">Filtre</span>
                  </button>
                  <span className="text-[10px] font-sans font-light text-[#1A1A1A]/35">
                    {filtered.length} ürün
                  </span>
                </div>

                {/* Active chips */}
                {activeChips.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {activeChips.map((c) => (
                      <ActiveChip
                        key={c.key + c.val}
                        label={c.label}
                        onRemove={() => toggleFilter(c.key, c.val, c.key === "fiyat" || c.key === "siralama")}
                      />
                    ))}
                    <button
                      onClick={clearAll}
                      className="text-[8px] tracking-[0.2em] uppercase font-sans text-[#1A1A1A]/35 hover:text-gold transition-colors ml-1"
                    >
                      Tümünü Temizle
                    </button>
                  </div>
                )}
              </div>

              {/* Product grid */}
              {filtered.length === 0 ? (
                <motion.div
                  variants={fadeUp} initial="hidden" animate="show"
                  className="py-24 text-center"
                >
                  <p className="font-serif font-light text-[#1A1A1A]/30 text-[22px] tracking-wide mb-4">
                    Sonuç bulunamadı
                  </p>
                  <p className="text-[11px] font-sans text-[#1A1A1A]/30 mb-8">
                    Seçili filtrelere uygun ürün mevcut değil. Filtrelerinizi temizleyerek tekrar deneyin.
                  </p>
                  <button
                    onClick={clearAll}
                    className="text-[8px] tracking-[0.3em] uppercase font-sans border border-[#1A1A1A]/20 px-6 py-3 hover:bg-onyx hover:text-white hover:border-onyx transition-colors"
                  >
                    Filtreleri Temizle
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10">
                  {gridItems.map((item, i) =>
                    item.type === "product" ? (
                      <motion.div
                        key={item.product.id}
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        transition={{ delay: Math.min(i * 0.05, 0.4) }}
                        className="col-span-1"
                      >
                        <ProductTile product={item.product} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`ed-${item.idx}`}
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className="col-span-2"
                      >
                        <EditorialTile card={item.card} />
                      </motion.div>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Bottom CTA ────────────────────────────────────────── */}
        <section className="bg-[#1A1A1A] py-20 mt-20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 text-center">
            <p className="text-[8px] tracking-[0.5em] uppercase font-sans text-gold mb-5">ONR Mücevherat</p>
            <h2 className="font-serif font-light text-white text-[2.2rem] md:text-[3rem] leading-[1.1] mb-6 max-w-2xl mx-auto">
              Hayalinizdeki Mücevheri Birlikte Tasarlayalım
            </h2>
            <p className="text-[12.5px] font-sans font-light text-white/45 max-w-lg mx-auto mb-10 leading-[1.9]">
              Benzersiz bir parça için atölyemizle iletişime geçin. Her tasarım, sizin için ve yalnızca sizin için hayat bulur.
            </p>
            <Link
              href="/ozel-tasarim"
              className="inline-block text-[8px] tracking-[0.35em] uppercase font-sans border border-white/30 px-8 py-3.5 text-white hover:bg-white hover:text-onyx transition-colors duration-300"
            >
              Özel Tasarım Talebi
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </PageWrapper>
  );
}
