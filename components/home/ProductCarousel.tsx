"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { Product } from "@/lib/types";

/**
 * Kategorileri sırayla dolaşarak karıştırır: yüzük → kolye → bileklik → küpe → yüzük…
 *
 * Math.random kullanmıyoruz — sunucuda ve tarayıcıda farklı sıra üretir,
 * hydration uyuşmazlığına yol açar ve sayfa önbelleğe alınamaz hale gelir.
 * Bu yöntem deterministik ama görsel olarak karışık bir dizilim veriyor.
 */
function interleaveByCategory(list: Product[]): Product[] {
  const groups = new Map<string, Product[]>();
  for (const p of list) {
    const key = p.categorySlug || "diger";
    const bucket = groups.get(key);
    if (bucket) bucket.push(p);
    else groups.set(key, [p]);
  }

  const buckets = [...groups.values()];
  const out: Product[] = [];
  for (let i = 0; out.length < list.length; i++) {
    for (const bucket of buckets) {
      if (i < bucket.length) out.push(bucket[i]);
    }
  }
  return out;
}

export default function ProductCarousel({ products }: { products: Product[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Görseli olmayan ürünler karusele girmesin — boş kare göstermek yerine atla.
  const items = useMemo(
    () => interleaveByCategory(products.filter((p) => p.images?.[0]?.src)),
    [products]
  );

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // 2px tolerans: subpixel scroll değerleri tam eşitliği bozuyor.
    setCanPrev(el.scrollLeft > 2);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    const onResize = () => sync();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [sync, items.length]);

  /** Bir "sayfa" kadar kaydırır — görünür alan genişliği ne ise o kadar. */
  const page = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-6 md:px-10 lg:px-16 bg-ivory-100"
    >
      <div className="max-w-screen-2xl mx-auto">
        {/* ── Section Header ── */}
        <motion.div
          className="flex items-end justify-between gap-6 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div>
            <p className="section-overline mb-4">Atölyeden Seçkiler</p>
            <h2 className="section-heading">Öne Çıkan Parçalar</h2>
            <div className="mt-5">
              <span className="gold-line" />
            </div>
          </div>

          {/* ── Arrows ── */}
          <div className="hidden sm:flex items-center gap-2 shrink-0 pb-2">
            {([-1, 1] as const).map((dir) => {
              const enabled = dir === -1 ? canPrev : canNext;
              return (
                <button
                  key={dir}
                  type="button"
                  onClick={() => page(dir)}
                  disabled={!enabled}
                  aria-label={dir === -1 ? "Önceki ürünler" : "Sonraki ürünler"}
                  className="w-11 h-11 flex items-center justify-center border border-charcoal/15
                             text-charcoal transition-colors duration-300
                             hover:border-gold hover:text-gold
                             disabled:opacity-25 disabled:hover:border-charcoal/15
                             disabled:hover:text-charcoal disabled:cursor-default"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="1.4">
                    <path d={dir === -1 ? "M19 12H5M11 18l-6-6 6-6" : "M5 12h14M13 6l6 6-6 6"} />
                  </svg>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Track ──
            Masaüstünde tam 6 kart görünür (basis 1/6). Küçük ekranlarda
            6 kart okunamayacak kadar küçüleceği için kademeli azalıyor. */}
        <motion.div
          ref={trackRef}
          onScroll={sync}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.15 }}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide
                     snap-x snap-mandatory scroll-smooth"
        >
          {items.map((product) => (
            <Link
              key={product.id}
              href={`/urun/${product.slug}`}
              aria-label={`${product.name} ürününü görüntüle`}
              className="group snap-start shrink-0
                         basis-[46%] sm:basis-[31%] md:basis-[23%] lg:basis-[calc((100%-5*1rem)/6)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-ivory-200">
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt || product.name}
                  fill
                  sizes="(max-width:640px) 46vw, (max-width:768px) 31vw, (max-width:1024px) 23vw, 16vw"
                  className="object-cover object-center
                             transition-transform duration-[1200ms]
                             ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                             group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-onyx/0 group-hover:bg-onyx/15
                                transition-colors duration-700" />
              </div>

              <div className="pt-4">
                <p className="text-[8px] text-gold tracking-luxury-wide uppercase font-sans font-medium mb-1.5">
                  {product.category}
                </p>
                <h3 className="font-serif font-light text-sm md:text-base text-charcoal leading-snug
                               line-clamp-2 group-hover:text-gold-dark transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="mt-2 text-xs font-sans text-charcoal-lighter">
                  {product.isSoldOut ? "" : product.priceFormatted}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
