"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";

// Anneler Günü özel doğal taş koleksiyonu
const MOTHERS_DAY_IDS = [
  "k-008", // Larvikite Midnight Aura
  "k-009", // Lemon Quartz Sunbeam Drop
  "k-010", // Royal Garnet Crimson Petal
  "k-011", // Paraiba Blue Vitality Drop
  "k-012", // Celestial Sunstone Glow
  "k-013", // Emerald Eternal Verdant Luxe
];

export default function AnnelerGunuClient() {
  const mothersDayProducts = useMemo(() =>
    MOTHERS_DAY_IDS
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean) as typeof products,
    []
  );

  return (
    <PageWrapper>
      <Navbar />

      <main className="min-h-screen" style={{ backgroundColor: "#fdf6f0" }}>

        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden flex flex-col items-center justify-center text-center"
          style={{
            background: "linear-gradient(160deg, #fdf0ec 0%, #f9e8e2 40%, #f5ddd7 100%)",
            paddingTop: "clamp(120px, 18vw, 200px)",
            paddingBottom: "clamp(60px, 8vw, 120px)",
          }}
        >
          {/* Decorative petals / blobs */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            <div
              className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-30"
              style={{
                background:
                  "radial-gradient(circle, #e8a89a 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full opacity-20"
              style={{
                background:
                  "radial-gradient(circle, #d4877a 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full opacity-15"
              style={{
                background:
                  "radial-gradient(circle, #c9a84c 0%, transparent 70%)",
              }}
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-6">
            {/* Date badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span
                className="text-[9px] tracking-[0.25em] uppercase font-sans font-medium px-4 py-2 rounded-full"
                style={{
                  background: "rgba(201,168,76,0.15)",
                  color: "#9a6b3c",
                  border: "1px solid rgba(201,168,76,0.35)",
                }}
              >
                Annelere Özel
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6"
              style={{ color: "#3a2318" }}
            >
              Annene Değer<br />
              <span style={{ color: "#b8683a" }}>Veren Bir Hediye</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="font-sans text-base md:text-lg leading-relaxed max-w-xl mx-auto"
              style={{ color: "#7a5040", fontWeight: 300, letterSpacing: "0.02em" }}
            >
              Sevgi kalıcıdır, tıpkı pırlanta gibi. Annenizin her güzelliğini yansıtan,
              özenle seçilmiş mücevher koleksiyonumuz ile ona en anlamlı hediyeyi sunun.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 flex flex-col items-center gap-2"
            >
              <a
                href="#koleksiyon"
                className="group flex flex-col items-center gap-3 transition-all duration-300"
                style={{ color: "#b8683a" }}
              >
                <span
                  className="text-[10px] tracking-[0.3em] uppercase font-sans font-medium
                             transition-opacity duration-300 group-hover:opacity-70"
                >
                  Koleksiyonu Keşfet
                </span>
                <motion.span
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="block"
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.span>
              </a>
            </motion.div>
          </div>

          {/* Wavy divider */}
          <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
            <svg
              viewBox="0 0 1440 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0 48V24C240 0 480 48 720 24C960 0 1200 48 1440 24V48H0Z"
                fill="#fdf6f0"
              />
            </svg>
          </div>
        </section>

        {/* ── Collection ── */}
        <section id="koleksiyon" className="px-8 md:px-16 lg:px-24 pb-24">
          <div className="max-w-screen-2xl mx-auto">

            {/* Section intro */}
            <div className="pt-16 pb-12 border-b border-[#e8d5cc] mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="text-[9px] tracking-[0.25em] uppercase font-sans font-medium mb-3"
                  style={{ color: "#b8683a" }}
                >
                  Anneler Günü Özel Koleksiyonu
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1 }}
                  className="font-serif text-3xl md:text-4xl"
                  style={{ color: "#3a2318" }}
                >
                  Seçilmiş Parçalar
                </motion.h2>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-sm font-sans"
                style={{ color: "#9a7060", maxWidth: "340px", lineHeight: 1.7 }}
              >
                6 özel doğal taş kolye — Anneler Günü'ne özel ₺18.900 yerine ₺9.900.
              </motion.p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10">
              {mothersDayProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Kişiselleştirme Banner ── */}
        <section
          className="mx-8 md:mx-16 lg:mx-24 mb-24 rounded-none"
          style={{ background: "linear-gradient(135deg, #3a2318 0%, #6b3020 100%)" }}
        >
          <div className="max-w-screen-2xl mx-auto px-10 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p
                className="text-[9px] tracking-[0.25em] uppercase font-sans font-medium mb-3"
                style={{ color: "#c9a84c" }}
              >
                Kişiye Özel
              </p>
              <h3
                className="font-serif text-2xl md:text-3xl leading-snug"
                style={{ color: "#fdf6f0" }}
              >
                Annenize özel bir isim,<br />
                <span style={{ color: "#e8c880" }}>kalıcı bir hatıra.</span>
              </h3>
              <p
                className="mt-3 text-sm font-sans font-light leading-relaxed"
                style={{ color: "#c4a898", maxWidth: "420px" }}
              >
                Seçtiğiniz mücevhere monogram, tarih ya da özel bir mesaj ekleyin.
                Tamamen size özel, sonsuza kadar onun.
              </p>
            </div>
            <a
              href="/kisisellestirme"
              className="shrink-0 inline-block text-[10px] tracking-[0.22em] uppercase
                         font-sans font-medium px-8 py-3.5 transition-all duration-300"
              style={{
                border: "1px solid #c9a84c",
                color: "#c9a84c",
              }}
            >
              Kişiselleştir
            </a>
          </div>
        </section>

        {/* ── Teslimat notu ── */}
        <section className="px-8 md:px-16 lg:px-24 pb-24">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto gap-px" style={{ border: "1px solid #e8d5cc" }}>
              {[
                {
                  icon: "♡",
                  title: "Hediye Paketi",
                  desc: "Her sipariş özel hediye kutusunda, kişisel notunuzla sunulur.",
                },
                {
                  icon: "◇",
                  title: "Ücretsiz Kargo",
                  desc: "Anneler Günü'ne özel tüm siparişlerde hızlı ve ücretsiz kargo.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12 }}
                  className="flex flex-col items-center text-center px-10 py-12"
                  style={{ background: "#fdf6f0" }}
                >
                  <span
                    className="text-2xl mb-4"
                    style={{ color: "#b8683a" }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  <h4
                    className="font-serif text-lg mb-2"
                    style={{ color: "#3a2318" }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-sm font-sans font-light leading-relaxed"
                    style={{ color: "#9a7060" }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageWrapper>
  );
}
