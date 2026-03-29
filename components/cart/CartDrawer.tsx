"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cartStore";

const drawerVariants = {
  closed: { x: "100%" },
  open: {
    x: "0%",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.45, ease: [0.55, 0, 1, 0.45] },
  },
};

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.35, delay: 0.1 } },
};

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, subtotal, totalItems } =
    useCartStore();

  // Lock scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const formattedSubtotal = subtotal().toLocaleString("tr-TR");

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="cart-overlay"
            className="fixed inset-0 z-40 bg-onyx/50"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="exit"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            key="cart-drawer"
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md
                       bg-ivory-50 flex flex-col shadow-2xl"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Alışveriş Sepeti"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-ivory-200">
              <div>
                <p className="section-overline text-gold">Sepetim</p>
                <p className="font-serif font-light text-charcoal text-lg mt-0.5">
                  {totalItems() === 0
                    ? "Sepet Boş"
                    : `${totalItems()} Parça`}
                </p>
              </div>
              <button
                onClick={closeCart}
                aria-label="Sepeti Kapat"
                className="p-2 text-charcoal-lighter hover:text-gold transition-colors duration-300"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* ── Items ── */}
            <div className="flex-1 overflow-y-auto py-2">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
                  <div className="w-16 h-16 border border-ivory-200 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-charcoal-lighter">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-serif font-light text-charcoal text-xl mb-2">
                      Sepetiniz Boş
                    </p>
                    <p className="text-charcoal-lighter text-xs font-sans font-light">
                      Koleksiyonlarımızı inceleyerek size özel parçaları keşfedin.
                    </p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="btn-luxury text-[9px]"
                  >
                    Alışverişe Başla
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-ivory-200">
                  {items.map(({ product, quantity }) => (
                    <li key={product.id} className="px-8 py-6 flex gap-5">
                      {/* Product image */}
                      <div className="relative w-20 h-24 shrink-0 bg-ivory-200 overflow-hidden">
                        <Image
                          src={product.images[0].src}
                          alt={product.images[0].alt}
                          fill
                          sizes="80px"
                          className="object-cover object-center"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] text-gold tracking-luxury uppercase font-sans mb-1">
                          {product.category}
                        </p>
                        <p className="font-serif font-light text-charcoal text-base truncate">
                          {product.name}
                        </p>
                        <p className="text-[10px] text-charcoal-lighter font-sans mt-0.5 font-light">
                          {product.materials.join(" · ")}
                        </p>

                        {/* Qty + Remove */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-ivory-200">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-charcoal hover:text-gold
                                         transition-colors duration-200 text-sm"
                              aria-label="Azalt"
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-xs font-sans tabular-nums">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-charcoal hover:text-gold
                                         transition-colors duration-200 text-sm"
                              aria-label="Artır"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="font-serif text-charcoal text-base">
                              {(product.price * quantity).toLocaleString("tr-TR")} ₺
                            </p>
                            <button
                              onClick={() => removeItem(product.id)}
                              className="text-[8px] text-charcoal-lighter/60 hover:text-red-400 tracking-widest
                                         uppercase font-sans mt-1 transition-colors duration-200"
                            >
                              Kaldır
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ── Footer — Subtotal + CTA ── */}
            {items.length > 0 && (
              <div className="border-t border-ivory-200 px-8 py-7 space-y-5">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <p className="text-[9px] text-charcoal-lighter tracking-luxury uppercase font-sans">
                    Ara Toplam
                  </p>
                  <p className="font-serif font-light text-charcoal text-xl">
                    ₺{formattedSubtotal}
                  </p>
                </div>
                <p className="text-[9px] text-charcoal-lighter/60 font-sans font-light leading-relaxed">
                  KDV dahil. Kargo ve sigorta ücreti ödeme adımında hesaplanır.
                </p>

                {/* Checkout */}
                <Link
                  href="/sepet"
                  onClick={closeCart}
                  className="btn-luxury-filled w-full justify-center"
                >
                  Ödemeye Geç
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full text-center text-[9px] text-charcoal-lighter
                             tracking-luxury uppercase font-sans hover:text-gold
                             transition-colors duration-300"
                >
                  Alışverişe Devam Et
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
