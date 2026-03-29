"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";

const sortOptions = [
  { label: "Öne Çıkanlar", value: "featured" },
  { label: "Fiyat: Düşükten Yükseğe", value: "price-asc" },
  { label: "Fiyat: Yüksekten Düşüğe", value: "price-desc" },
  { label: "Yeni Gelenler", value: "new" },
];

export default function KoleksiyonlarClient({ defaultCategory = "tumu" }: { defaultCategory?: string }) {
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [sort, setSort] = useState("featured");

  const categoryLabel =
    activeCategory === "tumu"
      ? "Tüm Koleksiyonlar"
      : categories.find((c) => c.slug === activeCategory)?.label ?? "Koleksiyonlar";

  const filtered = useMemo(() => {
    let result =
      activeCategory === "tumu"
        ? products.filter((p) => !p.isExclusive)
        : products.filter((p) => p.categorySlug === activeCategory && !p.isExclusive);

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "new") result.sort((a) => (a.isNew ? -1 : 1));

    return result;
  }, [activeCategory, sort]);

  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen bg-ivory-100">
        {/* ── Page Header ── */}
        <div className="pt-32 md:pt-40 pb-14 px-8 md:px-16 lg:px-24 border-b border-ivory-200">
          <div className="max-w-screen-2xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="section-overline text-gold mb-4"
            >
              ONR Mücevherat
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="section-heading"
            >
              {categoryLabel}
            </motion.h1>
          </div>
        </div>

        {/* ── Filters Bar ── */}
        <div className="sticky top-[72px] md:top-[88px] z-20 bg-ivory-100/95 backdrop-blur-md
                        border-b border-ivory-200 px-8 md:px-16 lg:px-24">
          <div className="max-w-screen-2xl mx-auto flex items-center justify-between
                          overflow-x-auto gap-4 py-4 no-scrollbar">
            {/* Category tabs */}
            <nav className="flex items-center gap-1 shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-2 text-[9px] tracking-luxury uppercase font-sans
                               font-medium transition-all duration-300 whitespace-nowrap
                               ${activeCategory === cat.slug
                                 ? "bg-onyx text-ivory-100"
                                 : "text-charcoal-lighter hover:text-gold"
                               }`}
                >
                  {cat.label}
                </button>
              ))}
            </nav>

            {/* Sort */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[9px] text-charcoal-lighter tracking-widest uppercase font-sans hidden md:block">
                Sırala:
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-[9px] tracking-widest uppercase font-sans text-charcoal
                           bg-transparent border-b border-charcoal-lighter/30 pb-0.5
                           pr-4 outline-none cursor-pointer hover:border-gold
                           transition-colors duration-300 appearance-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── Product Grid ── */}
        <div className="px-8 md:px-16 lg:px-24 py-14 md:py-20">
          <div className="max-w-screen-2xl mx-auto">
            {/* Count */}
            <p className="text-[9px] text-charcoal-lighter tracking-widest uppercase font-sans mb-10">
              {filtered.length} parça
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + sort}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14"
              >
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-24">
                <p className="font-serif font-light text-charcoal text-2xl">
                  Bu kategoride henüz ürün bulunmuyor.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </PageWrapper>
  );
}
