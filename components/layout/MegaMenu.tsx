"use client";

import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { NavCategory } from "@/constants/navigation";

interface MegaMenuProps {
  category: NavCategory;
  onClose: () => void;
}

/* ── Placeholder icon for grid items (elegant diamond shape) ── */
function PlaceholderIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className="text-gold/20 group-hover:text-gold/40 transition-colors duration-500"
    >
      <path
        d="M16 2L28 12L16 30L4 12L16 2Z"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
      />
      <path d="M4 12H28" stroke="currentColor" strokeWidth="0.5" />
      <path d="M16 2L12 12L16 30" stroke="currentColor" strokeWidth="0.4" />
      <path d="M16 2L20 12L16 30" stroke="currentColor" strokeWidth="0.4" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   COLUMNS LAYOUT — Cartier-style typographic mega menu
══════════════════════════════════════════════════════════ */
function ColumnsLayout({
  category,
  onClose,
}: {
  category: NavCategory;
  onClose: () => void;
}) {
  if (!category.subTabs) return null;

  const regularCols = category.subTabs.filter((t) => !t.isSpecial);
  const specialCols = category.subTabs.filter((t) => t.isSpecial);

  return (
    <div className="max-w-screen-xl mx-auto px-8 lg:px-16 py-10">
      {/* ── Column Grid ── */}
      <div className="flex gap-0">
        {/* Regular columns */}
        <div className="flex-1 grid grid-cols-5 gap-x-8 lg:gap-x-10">
          {regularCols.map((col) => (
            <div key={col.id} className="space-y-4">
              {/* Column heading */}
              <Link
                href={col.viewAllHref}
                onClick={onClose}
                className="block text-[11px] tracking-[0.25em] uppercase font-sans font-bold
                         text-charcoal hover:text-[#D4AF37] transition-colors duration-300 pb-3
                         border-b border-charcoal/12"
              >
                {col.label}
              </Link>
              {/* Sub-links */}
              <ul className="space-y-2.5 pt-1">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group/link relative inline-block text-[12px] font-sans font-light
                               text-charcoal/55 hover:text-[#D4AF37] transition-colors duration-300
                               leading-relaxed"
                    >
                      {item.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#D4AF37]/50
                                     group-hover/link:w-full transition-all duration-400 ease-out" />
                    </Link>
                  </li>
                ))}
                {/* "Tümünü Gör" */}
                <li className="pt-2">
                  <Link
                    href={col.viewAllHref}
                    onClick={onClose}
                    className="text-[10px] tracking-[0.18em] uppercase font-sans font-medium
                             text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    Tümünü Gör →
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>

        {/* İnci — special divider + column */}
        {specialCols.length > 0 && (
          <div className="flex">
            {/* Vertical divider */}
            <div className="w-px bg-gradient-to-b from-transparent via-charcoal/12 to-transparent mx-6 lg:mx-8" />

            <div className="min-w-[140px] space-y-4">
              {specialCols.map((col) => (
                <div key={col.id}>
                  {/* İnci heading with pearl icon */}
                  <Link
                    href={col.viewAllHref}
                    onClick={onClose}
                    className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase font-sans font-bold
                             text-charcoal hover:text-[#D4AF37] transition-colors duration-300 pb-3
                             border-b border-charcoal/12"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="shrink-0">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="9" cy="9" r="2.5" fill="currentColor" opacity="0.15" />
                    </svg>
                    {col.label}
                  </Link>
                  <ul className="space-y-2.5 pt-5">
                    {col.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="group/link relative inline-block text-[12px] font-sans font-light
                                   text-charcoal/55 hover:text-[#D4AF37] transition-colors duration-300
                                   leading-relaxed"
                        >
                          {item.label}
                          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#D4AF37]/50
                                         group-hover/link:w-full transition-all duration-400 ease-out" />
                        </Link>
                      </li>
                    ))}
                    <li className="pt-2">
                      <Link
                        href={col.viewAllHref}
                        onClick={onClose}
                        className="text-[10px] tracking-[0.18em] uppercase font-sans font-medium
                                 text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors duration-300"
                      >
                        Tümünü Gör →
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Editorial image — right edge */}
        {category.editorialImage && (
          <div className="hidden lg:block ml-8 w-[180px] shrink-0">
            <div className="relative w-full h-full min-h-[280px] rounded-[2px] overflow-hidden">
              <Image
                src={category.editorialImage}
                alt="Mücevher Koleksiyonu"
                fill
                sizes="180px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-[7px] text-white/80 tracking-[0.3em] uppercase font-sans leading-relaxed">
                  Koleksiyonu Keşfet
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Inspiration Links ── */}
      {category.inspirationLinks && category.inspirationLinks.length > 0 && (
        <div className="border-t border-charcoal/8 mt-10 pt-8">
          <div className="flex items-center justify-center gap-10 lg:gap-14">
            {category.inspirationLinks.map((link) => {
              const meta: Record<string, { icon: React.ReactNode }> = {
                "/hediye-secici": {
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <polyline points="20 12 20 22 4 22 4 12"/>
                      <rect x="2" y="7" width="20" height="5"/>
                      <line x1="12" y1="22" x2="12" y2="7"/>
                      <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/>
                      <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
                    </svg>
                  ),
                },
                "/kisisellestirme": {
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M12 20h9"/>
                      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                  ),
                },
                "/yeni-tasarimlar": {
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ),
                },
                "/onun-icin": {
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                  ),
                },
              };
              const m = meta[link.href];
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase font-sans font-medium
                           text-charcoal/40 hover:text-[#D4AF37] transition-colors duration-300"
                >
                  {m?.icon && (
                    <span className="text-charcoal/30 group-hover:text-[#D4AF37] transition-colors duration-300">
                      {m.icon}
                    </span>
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   GRID LAYOUT — Image-card based mega menu (for Altın etc.)
══════════════════════════════════════════════════════════ */
function GridLayout({
  category,
  onClose,
}: {
  category: NavCategory;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState(0);

  if (!category.subTabs) return null;

  const isFlatGrid = category.subTabs.length === 1;
  const currentTab = category.subTabs[activeTab];

  return (
    <div className="max-w-screen-xl mx-auto px-8 lg:px-16 py-10">
      {/* ── Sub-Tabs (hidden when only 1 tab = flat grid mode) ── */}
      {category.subTabs.length > 1 && (
        <div className="flex items-center gap-8 lg:gap-10 border-b border-charcoal/10 mb-10 overflow-x-auto scrollbar-hide">
          {category.subTabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`relative pb-3.5 text-[10px] tracking-luxury-wide uppercase font-sans font-medium
                transition-colors duration-300 whitespace-nowrap shrink-0 flex items-center gap-1.5
                ${
                  tab.isBaby
                    ? activeTab === idx
                      ? "text-[#C4956A]"
                      : "text-[#C4956A]/50 hover:text-[#C4956A]/80"
                    : activeTab === idx
                    ? "text-charcoal"
                    : "text-charcoal/40 hover:text-charcoal/70"
                }`}
            >
              {tab.isBaby && (
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              )}
              {tab.label}
              {activeTab === idx && (
                <motion.span
                  layoutId="megamenu-tab-underline"
                  className={`absolute bottom-0 left-0 right-0 h-[2px] ${tab.isBaby ? "bg-[#C4956A]/60" : "bg-gold"}`}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* ── Grid ── */}
      <motion.div
        key={currentTab.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`grid gap-x-6 gap-y-4 mb-10 ${
          category.editorialImage ? "grid-cols-7" : "grid-cols-6"
        }`}
      >
        {/* Items */}
        <div className={`col-span-6 grid gap-x-6 gap-y-4 ${
          isFlatGrid ? "grid-cols-5" : "grid-cols-6"
        }`}>
          {currentTab.items.map((item) => {
            const isItemBaby = (item as { isBaby?: boolean }).isBaby || currentTab.isBaby;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="group text-center"
              >
                <div className={`aspect-square rounded-[2px] overflow-hidden mb-3.5
                              relative group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]
                              transition-shadow duration-500 ${
                                isItemBaby ? "bg-[#FDF2F2]" : "bg-[#F5F1EB]"
                              }`}>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      sizes="120px"
                      className="object-cover object-center transition-transform duration-700
                                 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlaceholderIcon />
                    </div>
                  )}
                </div>
                <span className={`text-[9px] tracking-[0.22em] uppercase font-sans font-medium
                               leading-relaxed mt-0.5 block transition-colors duration-300 ${
                                 isItemBaby
                                   ? "text-[#C4956A]/60 group-hover:text-[#C4956A]"
                                   : "text-charcoal/60 group-hover:text-charcoal"
                               }`}>
                  {isItemBaby && (
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="inline-block mr-1 -mt-0.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  )}
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Editorial image */}
        {category.editorialImage && (
          <div className="col-span-1 relative rounded-[2px] overflow-hidden" style={{ minHeight: 180 }}>
            <Image
              src={category.editorialImage}
              alt="Altın Koleksiyonu"
              fill
              sizes="160px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-[7px] text-white/75 tracking-[0.3em] uppercase font-sans leading-relaxed">
                Altın Koleksiyonu
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* ── View All ── */}
      <div className="text-center mb-8">
        <Link
          href={currentTab.viewAllHref}
          onClick={onClose}
          className="inline-block text-[10px] tracking-luxury uppercase font-sans font-medium
                   text-charcoal underline underline-offset-4 decoration-charcoal/25
                   hover:decoration-gold hover:text-gold transition-colors duration-300"
        >
          Tümünü Gör
        </Link>
      </div>

      {/* ── Divider + Inspiration ── */}
      <div className="border-t border-charcoal/8 pt-8">
        <p className="text-[8px] tracking-[0.45em] uppercase font-sans font-semibold
                    text-charcoal/30 text-center mb-10">
          İlham Alın
        </p>
        <div className="grid grid-cols-4 gap-6">
          {category.inspirationLinks?.map((link, idx) => {
            const floatDelays = [0, 0.75, 1.5, 2.25];
            const inspirationMeta: Record<string, { icon: React.ReactNode; sub: string }> = {
              "/hediye-secici": {
                sub: "Mükemmel Hediyeyi Bulun",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <polyline points="20 12 20 22 4 22 4 12"/>
                    <rect x="2" y="7" width="20" height="5"/>
                    <line x1="12" y1="22" x2="12" y2="7"/>
                    <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/>
                    <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
                  </svg>
                ),
              },
              "/kisisellestirme": {
                sub: "Sadece Size Özel",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                ),
              },
              "/yeni-tasarimlar": {
                sub: "Bu Sezonun Parlayanları",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ),
              },
              "/onun-icin": {
                sub: "Ona Özel Küratör Seçkisi",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                ),
              },
            };
            const m = inspirationMeta[link.href] ?? { icon: null, sub: "" };
            return (
              <motion.div
                key={link.label}
                animate={{ y: [0, -7, 0] }}
                whileHover={{
                  y: 0,
                  scale: 1.05,
                  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                  delay: floatDelays[idx],
                }}
                style={{ willChange: "transform" }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group flex flex-col items-center text-center gap-3 px-4 py-5
                           border border-transparent hover:border-gold/20
                           transition-colors duration-300 rounded-[2px] cursor-pointer"
                >
                  <span className="text-charcoal/45 group-hover:text-gold transition-colors duration-300">
                    {m.icon}
                  </span>
                  <span className="relative inline-block text-[9.5px] tracking-wider uppercase
                                 font-sans font-semibold text-charcoal/70 group-hover:text-charcoal
                                 transition-colors duration-300 leading-relaxed">
                    {link.label}
                    <span className="absolute -bottom-1.5 left-1/4 right-1/4 h-px
                                   bg-transparent group-hover:bg-gold/50
                                   transition-all duration-400" />
                  </span>
                  <span className="text-[8.5px] font-sans font-light text-charcoal/40
                                 group-hover:text-charcoal/60 transition-colors duration-300 leading-snug">
                    {m.sub}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════ */
export default function MegaMenu({ category, onClose }: MegaMenuProps) {
  if (!category.subTabs) return null;

  const isColumns = category.layoutMode === "columns";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="absolute top-full left-0 right-0 bg-ivory-100 border-t border-gold/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
    >
      {isColumns ? (
        <ColumnsLayout category={category} onClose={onClose} />
      ) : (
        <GridLayout category={category} onClose={onClose} />
      )}
    </motion.div>
  );
}
