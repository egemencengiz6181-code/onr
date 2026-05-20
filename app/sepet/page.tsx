"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import { useCartStore } from "@/lib/cartStore";
import { useAuthStore } from "@/lib/authStore";
import { products } from "@/lib/products";
import { Product } from "@/lib/types";

function CrossSellCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group flex gap-4 py-4 border-b border-ivory-200 last:border-0">
      <Link href={`/urun/${product.slug}`} className="relative w-20 h-24 shrink-0 bg-ivory-200 overflow-hidden">
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          sizes="80px"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <p className="text-[8px] text-gold tracking-luxury uppercase font-sans">{product.category}</p>
          <Link href={`/urun/${product.slug}`}>
            <p className="font-serif font-light text-charcoal text-sm truncate hover:text-gold transition-colors">
              {product.name}
            </p>
          </Link>
          <p className="font-serif text-charcoal/70 text-sm mt-0.5">{product.priceFormatted}</p>
        </div>
        <button
          onClick={handleAdd}
          className={`mt-2 text-[8px] tracking-luxury uppercase font-sans border px-3 py-1.5 transition-all duration-300
            ${added
              ? "border-gold bg-gold text-onyx"
              : "border-charcoal/20 text-charcoal hover:border-gold hover:text-gold"
            }`}
        >
          {added ? "Eklendi ✓" : "Sepete Ekle"}
        </button>
      </div>
    </div>
  );
}

export default function SepetPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCartStore();
  const { user, openAuthModal } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Cross-sell: products not in cart
  const cartIds = new Set(items.map((i) => i.product.id));
  const crossSell = products
    .filter((p) => !cartIds.has(p.id) && !p.isExclusive)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  const formattedSubtotal = subtotal().toLocaleString("tr-TR");
  const shippingThreshold = 500000;
  const freeShipping = subtotal() >= shippingThreshold;

  const handleCheckout = () => {
    if (!user) {
      openAuthModal("login");
      return;
    }
    router.push("/odeme");
  };

  if (!mounted) return null;

  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen pt-44 pb-20 px-5 md:px-10 lg:px-16 max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="section-overline text-gold">Alışveriş</p>
          <h1 className="font-serif font-light text-charcoal text-3xl md:text-4xl mt-1">
            Sepetim
          </h1>
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
            <div className="w-20 h-20 border border-ivory-200 rounded-full flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-charcoal-lighter">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </div>
            <div>
              <p className="font-serif font-light text-charcoal text-2xl mb-2">Sepetiniz Boş</p>
              <p className="text-charcoal-lighter text-sm font-sans font-light">
                Koleksiyonlarımızı inceleyerek size özel parçaları keşfedin.
              </p>
            </div>
            <Link href="/koleksiyonlar" className="btn-luxury">
              Koleksiyonları İncele
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-16">
            {/* ── Left: Cart Items ── */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-ivory-200">
                <p className="text-[9px] text-charcoal-lighter tracking-luxury uppercase font-sans">
                  {items.length} Ürün
                </p>
                <button
                  onClick={clearCart}
                  className="text-[9px] text-charcoal-lighter/60 hover:text-red-400 tracking-widest uppercase font-sans transition-colors"
                >
                  Sepeti Temizle
                </button>
              </div>

              <AnimatePresence>
                {items.map(({ product, quantity, discountedPrice }) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.25 } }}
                    className="flex gap-6 py-7 border-b border-ivory-200"
                  >
                    {/* Image */}
                    <Link href={`/urun/${product.slug}`} className="relative w-28 h-36 shrink-0 bg-ivory-200 overflow-hidden">
                      <Image
                        src={product.images[0].src}
                        alt={product.images[0].alt}
                        fill
                        sizes="112px"
                        className="object-cover object-center"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] text-gold tracking-luxury uppercase font-sans mb-1">
                        {product.category}
                      </p>
                      <Link href={`/urun/${product.slug}`}>
                        <p className="font-serif font-light text-charcoal text-lg hover:text-gold transition-colors">
                          {product.name}
                        </p>
                      </Link>
                      <p className="text-[10px] text-charcoal-lighter font-sans mt-1 font-light">
                        {product.materials.join(" · ")}
                      </p>

                      <div className="flex items-end justify-between mt-6 flex-wrap gap-4">
                        {/* Quantity */}
                        <div className="flex items-center border border-ivory-200">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-9 h-9 flex items-center justify-center text-charcoal hover:text-gold transition-colors text-lg"
                            aria-label="Azalt"
                          >−</button>
                          <span className="w-9 text-center text-sm font-sans tabular-nums">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-9 h-9 flex items-center justify-center text-charcoal hover:text-gold transition-colors text-lg"
                            aria-label="Artır"
                          >+</button>
                        </div>

                        {/* Price + Remove */}
                        <div className="text-right">
                          {discountedPrice ? (
                            <>
                              <p className="font-serif text-xl font-light" style={{ color: "#b8683a" }}>
                                ₺{(discountedPrice * quantity).toLocaleString("tr-TR")}
                              </p>
                              <p className="text-[9px] font-sans text-charcoal-lighter/50 line-through">
                                ₺{(product.price * quantity).toLocaleString("tr-TR")}
                              </p>
                            </>
                          ) : (
                            <p className="font-serif text-charcoal text-xl font-light">
                              ₺{(product.price * quantity).toLocaleString("tr-TR")}
                            </p>
                          )}
                          <button
                            onClick={() => removeItem(product.id)}
                            className="text-[8px] text-charcoal-lighter/50 hover:text-red-400 tracking-widest uppercase font-sans mt-1 transition-colors"
                          >
                            Kaldır
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Cross-sell */}
              {crossSell.length > 0 && (
                <div className="mt-12">
                  <p className="section-overline text-gold mb-6">Bunları da Beğenebilirsiniz</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    {crossSell.map((p) => (
                      <CrossSellCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-ivory-50 p-8 space-y-5">
                <p className="section-overline text-gold">Sipariş Özeti</p>

                {/* Free shipping progress */}
                {!freeShipping && (
                  <div className="space-y-2">
                    <p className="text-[9px] font-sans text-charcoal-lighter tracking-wider">
                      Ücretsiz kargo için{" "}
                      <span className="text-charcoal">
                        ₺{(shippingThreshold - subtotal()).toLocaleString("tr-TR")}
                      </span>{" "}
                      daha alın
                    </p>
                    <div className="h-0.5 bg-ivory-200">
                      <div
                        className="h-full bg-gold transition-all duration-500"
                        style={{ width: `${Math.min((subtotal() / shippingThreshold) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
                {freeShipping && (
                  <p className="text-[9px] font-sans text-gold tracking-wider">
                    ✓ Ücretsiz kargo kazandınız
                  </p>
                )}

                <div className="border-t border-ivory-200 pt-5 space-y-3">
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-charcoal-lighter">Ara Toplam</span>
                    <span className="font-serif text-charcoal">₺{formattedSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-charcoal-lighter">Kargo</span>
                    <span className={`font-serif ${freeShipping ? "text-gold" : "text-charcoal"}`}>
                      {freeShipping ? "Ücretsiz" : "Hesaplanacak"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-ivory-200">
                    <span className="text-[9px] tracking-luxury uppercase font-sans text-charcoal-lighter">
                      Toplam
                    </span>
                    <span className="font-serif text-charcoal text-2xl font-light">
                      ₺{formattedSubtotal}
                    </span>
                  </div>
                </div>

                <p className="text-[9px] text-charcoal-lighter/60 font-sans font-light leading-relaxed">
                  KDV dahil. Kargo ve sigorta ücreti ödeme adımında hesaplanır.
                </p>

                <button
                  onClick={handleCheckout}
                  className="btn-luxury-filled w-full justify-center"
                >
                  {user ? "Ödemeye Geç" : "Giriş Yap ve Devam Et"}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>

                <Link
                  href="/koleksiyonlar"
                  className="block text-center text-[9px] text-charcoal-lighter tracking-luxury uppercase font-sans hover:text-gold transition-colors"
                >
                  Alışverişe Devam Et
                </Link>

                {/* Trust signals */}
                <div className="pt-4 border-t border-ivory-200 space-y-3">
                  {[
                    { icon: "🔒", text: "256-bit SSL güvenli ödeme" },
                    { icon: "📦", text: "Sigortalı & özel paketleme" },
                    { icon: "↩️", text: "14 gün koşulsuz iade" },
                  ].map((s) => (
                    <div key={s.text} className="flex items-center gap-3">
                      <span className="text-sm">{s.icon}</span>
                      <span className="text-[9px] font-sans text-charcoal-lighter tracking-wider">{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer hideNewsletter />
    </PageWrapper>
  );
}
