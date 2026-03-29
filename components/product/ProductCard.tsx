"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/cartStore";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: "default" | "large";
}

export default function ProductCard({
  product,
  index = 0,
  variant = "default",
}: ProductCardProps) {
  const [activeImg, setActiveImg] = useState(0);
  const { addItem } = useCartStore();

  const aspectClass = variant === "large" ? "aspect-[2/3]" : "aspect-[3/4]";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 0.85,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.08,
      }}
    >
      <Link
        href={`/urun/${product.slug}`}
        className="group block"
        aria-label={`${product.name} ürününü görüntüle`}
      >
        {/* ── Image ── */}
        <div className={`relative ${aspectClass} overflow-hidden bg-ivory-200`}>
          {/* Primary image */}
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className={`object-cover object-center transition-all duration-[1200ms]
              ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              ${activeImg === 1 && product.images[1] ? "opacity-0" : "opacity-100"}
              group-hover:scale-105`}
          />
          {/* Second image (hover) */}
          {product.images[1] && (
            <Image
              src={product.images[1].src}
              alt={product.images[1].alt}
              fill
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              className={`object-cover object-center transition-opacity duration-700
                absolute inset-0
                ${activeImg === 1 ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
            />
          )}

          {/* Dark hover tint */}
          <div className="absolute inset-0 bg-onyx/0 group-hover:bg-onyx/15
                          transition-colors duration-700" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-gold text-onyx text-[7px] tracking-widest uppercase
                               font-sans px-2.5 py-1">
                Yeni
              </span>
            )}
            {product.isExclusive && (
              <span className="bg-onyx text-ivory-100/80 text-[7px] tracking-widest uppercase
                               font-sans px-2.5 py-1 border border-gold/30">
                Exclusive
              </span>
            )}
            {product.limitedPieces && (
              <span className="bg-onyx/70 backdrop-blur-sm text-ivory-100/70 text-[7px]
                               tracking-widest uppercase font-sans px-2.5 py-1">
                {product.limitedPieces} Adet
              </span>
            )}
          </div>

          {/* Hover CTA */}
          <div className="absolute bottom-4 inset-x-4 opacity-0 group-hover:opacity-100
                          translate-y-3 group-hover:translate-y-0
                          transition-all duration-500 ease-out flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product);
              }}
              className="flex-1 btn-luxury-light text-[8px] py-2.5 justify-center"
              aria-label={`${product.name} sepete ekle`}
            >
              Sepete Ekle
            </button>
          </div>

          {/* Thumbnail dots (if multiple images) */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 right-4 flex gap-1.5">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); setActiveImg(i); }}
                  aria-label={`Görsel ${i + 1}`}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300
                    ${i === activeImg ? "bg-ivory-100 scale-125" : "bg-ivory-100/40"}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Card Body ── */}
        <div className="pt-4 pb-2 space-y-1.5">
          <p className="text-[8px] text-gold tracking-luxury uppercase font-sans">
            {product.category}
          </p>
          <h3 className="font-serif font-light text-charcoal text-lg
                          group-hover:text-gold-dark transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-charcoal-lighter text-xs font-sans font-light leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>
          <div className="flex items-center justify-between pt-1">
            <p className="font-serif text-charcoal font-light text-base">
              {product.priceFormatted}
            </p>
            <span className="text-[8px] text-charcoal-lighter/60 tracking-widest uppercase
                             font-sans group-hover:text-gold transition-colors duration-300
                             flex items-center gap-1">
              İncele
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
