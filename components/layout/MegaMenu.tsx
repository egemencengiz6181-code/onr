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
      <path
        d="M4 12H28"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path d="M16 2L12 12L16 30" stroke="currentColor" strokeWidth="0.4" />
      <path d="M16 2L20 12L16 30" stroke="currentColor" strokeWidth="0.4" />
    </svg>
  );
}

export default function MegaMenu({ category, onClose }: MegaMenuProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!category.subTabs) return null;

  const currentTab = category.subTabs[activeTab];

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
      <div className="max-w-screen-xl mx-auto px-8 lg:px-16 py-10">
        {/* ── Sub-Tabs ── */}
        <div className="flex items-center gap-8 lg:gap-10 border-b border-charcoal/10 mb-10 overflow-x-auto scrollbar-hide">
          {category.subTabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`relative pb-3.5 text-[10px] tracking-luxury-wide uppercase font-sans font-medium
                transition-colors duration-300 whitespace-nowrap shrink-0
                ${activeTab === idx
                  ? "text-charcoal"
                  : "text-charcoal/40 hover:text-charcoal/70"
                }`}
            >
              {tab.label}
              {activeTab === idx && (
                <motion.span
                  layoutId="megamenu-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Grid (6 columns) ── */}
        <motion.div
          key={currentTab.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="grid grid-cols-6 gap-x-6 gap-y-4 mb-10"
        >
          {currentTab.items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="group text-center"
            >
              {/* Square image */}
              <div className="aspect-square bg-[#F5F1EB] rounded-[2px] overflow-hidden mb-3.5
                            relative group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]
                            transition-shadow duration-500">
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
              {/* Label */}
              <span className="text-[9px] tracking-[0.22em] uppercase font-sans font-medium
                             text-charcoal/60 group-hover:text-charcoal transition-colors duration-300
                             leading-relaxed mt-0.5 block">
                {item.label}
              </span>
            </Link>
          ))}
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
    </motion.div>
  );
}
