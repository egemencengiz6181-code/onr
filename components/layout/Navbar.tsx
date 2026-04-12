"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import FullscreenMenu from "@/components/navigation/FullscreenMenu";
import MegaMenu from "@/components/layout/MegaMenu";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { useCartStore } from "@/lib/cartStore";
import { mainCategories } from "@/constants/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isDarkHeroPage = pathname === "/" || pathname === "/ozel-tasarim";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const { openCart, totalItems } = useCartStore();
  const cartCount = totalItems();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track scroll & close mega menu on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setActiveMega(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const scheduleMegaClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMega(null), 120);
  }, []);

  const cancelMegaClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const handleCategoryEnter = useCallback((categoryId: string) => {
    cancelMegaClose();
    const cat = mainCategories.find((c) => c.id === categoryId);
    if (cat?.hasMegaMenu) {
      setActiveMega(categoryId);
    } else {
      setActiveMega(null);
    }
  }, [cancelMegaClose]);

  const activeCategory = mainCategories.find((c) => c.id === activeMega);
  const isMegaOpen = !!activeCategory?.hasMegaMenu;

  // Force solid background when mega menu is open, scrolled, or on a light-background page
  const showSolid = scrolled || isMegaOpen || !isDarkHeroPage;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-700 ease-luxury
          ${showSolid
            ? "bg-ivory-100/98 navbar-glass shadow-[0_1px_0_0_rgba(201,168,76,0.15)]"
            : "bg-transparent"
          }`}
        onMouseLeave={scheduleMegaClose}
        onMouseEnter={cancelMegaClose}
      >
        {/* ── Announcement Bar ── */}
        <AnnouncementBar />

        {/* ── Row 1: Hamburger | Logo | Icons ── */}
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-[72px] md:h-[80px]">
            {/* Left: Hamburger (mobile/tablet only) */}
            <button
              onClick={() => setMenuOpen(true)}
              className={`lg:hidden flex items-center gap-3 group transition-colors duration-300
                ${showSolid ? "text-charcoal hover:text-gold" : "text-ivory-100 hover:text-gold-light"}`}
              aria-label="Menüyü Aç"
              aria-expanded={menuOpen}
            >
              <div className="flex flex-col gap-[5px] w-6">
                <span className={`block h-px transition-all duration-300 ${showSolid ? "bg-charcoal group-hover:bg-gold" : "bg-ivory-100 group-hover:bg-gold-light"}`} />
                <span className={`block h-px w-4 transition-all duration-300 ${showSolid ? "bg-charcoal group-hover:bg-gold" : "bg-ivory-100 group-hover:bg-gold-light"}`} />
                <span className={`block h-px transition-all duration-300 ${showSolid ? "bg-charcoal group-hover:bg-gold" : "bg-ivory-100 group-hover:bg-gold-light"}`} />
              </div>
              <span className="hidden sm:block text-[9px] tracking-luxury-wide uppercase font-sans font-medium">
                Menü
              </span>
            </button>

            {/* Left: Language + WhatsApp (desktop) */}
            <div className="hidden lg:flex items-center gap-4 w-24">
              {/* EN/TR — inactive */}
              <span
                className={`text-[9px] tracking-luxury-wide uppercase font-sans font-medium
                  cursor-not-allowed opacity-40 select-none
                  ${showSolid ? "text-charcoal" : "text-ivory-100"}`}
                title="Yakında / Coming Soon"
              >
                TR
              </span>
              {/* WhatsApp */}
              <a
                href="https://wa.me/905323999944"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp ile iletişim"
                className={`p-1 transition-colors duration-300
                  ${showSolid ? "text-charcoal hover:text-[#25D366]" : "text-ivory-100/80 hover:text-[#25D366]"}`}
              >
                <WhatsAppIcon />
              </a>
            </div>

            {/* Center: Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2"
              aria-label="ONR Mücevherat — Ana Sayfa"
            >
              <div className="relative w-[110px] h-[40px]">
                {/* Siyah logo — beyaz/solid arka planda */}
                <Image
                  src="/images/logo/onr-logo-siyah.png"
                  alt="ONR Mücevherat"
                  fill
                  className={`object-contain transition-opacity duration-500 ${showSolid ? "opacity-100" : "opacity-0"}`}
                  priority
                />
                {/* Beyaz logo — koyu/transparan arka planda */}
                <Image
                  src="/images/logo/onr-logo-beyaz.png"
                  alt="ONR Mücevherat"
                  fill
                  className={`object-contain transition-opacity duration-500 ${showSolid ? "opacity-0" : "opacity-100"}`}
                  priority
                />
              </div>
            </Link>

            {/* Right: Icons */}
            <div className="flex items-center gap-4">
              <button
                aria-label="Ara"
                className={`p-1 transition-colors duration-300 lg:hidden
                  ${showSolid ? "text-charcoal hover:text-gold" : "text-ivory-100/80 hover:text-ivory-100"}`}
              >
                <SearchIcon />
              </button>
              {/* WhatsApp (mobile) */}
              <a
                href="https://wa.me/905323999944"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp ile iletişim"
                className={`p-1 transition-colors duration-300 lg:hidden
                  ${showSolid ? "text-charcoal hover:text-[#25D366]" : "text-ivory-100/80 hover:text-[#25D366]"}`}
              >
                <WhatsAppIcon />
              </a>
              <button
                aria-label="Hesabım"
                className={`p-1 transition-colors duration-300 hidden sm:block
                  ${showSolid ? "text-charcoal hover:text-gold" : "text-ivory-100/80 hover:text-ivory-100"}`}
              >
                <AccountIcon />
              </button>
              <button
                onClick={openCart}
                aria-label={`Sepet — ${cartCount} ürün`}
                className={`p-1 transition-colors duration-300 relative
                  ${showSolid ? "text-charcoal hover:text-gold" : "text-ivory-100/80 hover:text-ivory-100"}`}
              >
                <BagIcon />
                <span
                  className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-gold
                    text-[7px] text-onyx flex items-center justify-center font-sans font-medium
                    transition-transform duration-300
                    ${cartCount > 0 ? "scale-100" : "scale-75 opacity-60"}`}
                >
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Row 2: Main Category Nav (desktop only) ── */}
        <nav
          className={`hidden lg:block border-t transition-colors duration-500
            ${showSolid ? "border-charcoal/8" : "border-white/10"}`}
          aria-label="Ana Kategoriler"
        >
          <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16">
            <ul className="flex items-center justify-center gap-10 xl:gap-14 h-[46px]">
              {mainCategories.map((cat) => (
                <li key={cat.id} className="relative h-full flex items-center">
                  <Link
                    href={cat.href}
                    onMouseEnter={() => handleCategoryEnter(cat.id)}
                    className={`relative text-[10px] tracking-luxury-wide uppercase font-sans font-medium
                      transition-colors duration-300 py-1 block
                      ${activeMega === cat.id
                        ? (showSolid ? "text-charcoal" : "text-ivory-100")
                        : (showSolid
                            ? "text-charcoal/60 hover:text-charcoal"
                            : "text-ivory-100/60 hover:text-ivory-100")
                      }
                      ${cat.id === "yuksek-mucevher" ? " !text-[#E8C880] tracking-luxury-xwide" : ""}`}
                  >
                    {cat.label}
                    {/* Active indicator — Cartier-style red underline */}
                    {activeMega === cat.id && (
                      <motion.span
                        layoutId="active-category-line"
                        className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-[#B22222]"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                  </Link>
                </li>
              ))}

              {/* Separator + search */}
              <li className="flex items-center" aria-hidden="true">
                <span className={`w-px h-4 transition-colors duration-500 ${showSolid ? "bg-charcoal/15" : "bg-white/15"}`} />
              </li>
              <li>
                <button
                  aria-label="Ara"
                  className={`p-1 transition-colors duration-300
                    ${showSolid ? "text-charcoal/50 hover:text-charcoal" : "text-ivory-100/50 hover:text-ivory-100"}`}
                >
                  <SearchIcon />
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* ── Mega Menu ── */}
        <AnimatePresence mode="wait">
          {isMegaOpen && activeCategory && (
            <MegaMenu
              key={activeCategory.id}
              category={activeCategory}
              onClose={() => setActiveMega(null)}
            />
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Backdrop overlay (behind header, above content) ── */}
      <AnimatePresence>
        {isMegaOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-30 bg-onyx/25 backdrop-blur-[2px]"
            onClick={() => setActiveMega(null)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Full-screen overlay menu (mobile) */}
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

/* ── Minimal SVG Icons ──────────────────────────────────── */
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 L21 21" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}
