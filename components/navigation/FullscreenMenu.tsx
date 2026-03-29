"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { mobileMenuItems, secondaryLinks } from "@/constants/navigation";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.45, ease: [0.55, 0, 1, 0.45], delay: 0.15 },
  },
};

const panelVariants = {
  closed: { y: "-100%" },
  open: {
    y: "0%",
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    y: "-100%",
    transition: { duration: 0.6, ease: [0.55, 0, 1, 0.45] },
  },
};

const itemVariants = {
  closed: { opacity: 0, y: 32 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.35 + i * 0.06,
    },
  }),
  exit: { opacity: 0, y: -16, transition: { duration: 0.2 } },
};

const secondaryVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { duration: 0.5, delay: 0.8 },
  },
  exit: { opacity: 0 },
};

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setExpandedItem(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleAccordion = (label: string) => {
    setExpandedItem((prev) => (prev === label ? null : label));
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Dark overlay behind panel */}
          <motion.div
            key="menu-overlay"
            className="fixed inset-0 z-50 bg-onyx/60"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Main panel — slides down from top */}
          <motion.div
            key="menu-panel"
            className="fixed inset-x-0 top-0 z-[60] bg-onyx flex flex-col
                       min-h-screen md:min-h-[85vh] overflow-y-auto"
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Ana Menü"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-8 md:px-16 lg:px-24 py-7 border-b border-white/10">
              <Image
                src="/images/logo/onr-logo-beyaz.png"
                alt="ONR Mücevherat"
                width={90}
                height={32}
                className="object-contain opacity-70"
              />
              <button
                onClick={onClose}
                className="flex items-center gap-3 text-ivory-100/70 hover:text-gold transition-colors duration-300 group"
                aria-label="Menüyü Kapat"
              >
                <span className="text-[9px] tracking-luxury-wide uppercase font-sans font-medium">
                  Kapat
                </span>
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <span className="absolute block w-5 h-px bg-current rotate-45 transition-transform duration-300 group-hover:rotate-[135deg]" />
                  <span className="absolute block w-5 h-px bg-current -rotate-45 transition-transform duration-300 group-hover:rotate-45" />
                </div>
              </button>
            </div>

            {/* Menu Items with Accordion */}
            <nav className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
              <ul className="space-y-1">
                {mobileMenuItems.map((item, i) => (
                  <motion.li
                    key={item.label}
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="exit"
                    className={`group border-b border-white/8 last:border-b-0 ${
                      item.isExclusive ? "mt-6 pt-6 border-t border-gold/20" : ""
                    }`}
                  >
                    <div className="flex items-baseline justify-between py-5 md:py-6">
                      <div className="flex items-baseline gap-6 flex-1 min-w-0">
                        {/* Index / Exclusive marker */}
                        <span
                          className={`text-[10px] font-sans tracking-widest w-5 shrink-0 tabular-nums ${
                            item.isExclusive ? "text-gold/40" : "text-white/25"
                          }`}
                        >
                          {item.isExclusive ? "✦" : String(i + 1).padStart(2, "0")}
                        </span>

                        {/* Main label — link or accordion trigger */}
                        {item.subItems ? (
                          <button
                            onClick={() => toggleAccordion(item.label)}
                            className={`font-serif font-light text-4xl md:text-5xl lg:text-6xl
                              transition-colors duration-500 leading-none text-left
                              ${item.isExclusive
                                ? "text-gold hover:text-gold/70"
                                : "text-ivory-100 hover:text-gold"
                              }`}
                          >
                            {item.label}
                            {/* Accordion chevron */}
                            <motion.span
                              className="inline-block ml-4 text-white/30 text-2xl md:text-3xl"
                              animate={{ rotate: expandedItem === item.label ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              ‹
                            </motion.span>
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className={`font-serif font-light text-4xl md:text-5xl lg:text-6xl
                              transition-colors duration-500 leading-none
                              ${item.isExclusive
                                ? "text-gold hover:text-gold/70"
                                : "text-ivory-100 hover:text-gold"
                              }`}
                          >
                            {item.label}
                          </Link>
                        )}
                      </div>

                      {/* Sub-label */}
                      <span
                        className={`hidden md:block text-[9px] tracking-luxury uppercase font-sans shrink-0 ml-8 transition-colors duration-500 ${
                          item.isExclusive
                            ? "text-gold/50 group-hover:text-gold/80"
                            : "text-white/35 group-hover:text-gold/60"
                        }`}
                      >
                        {item.sub}
                      </span>
                    </div>

                    {/* ── Accordion Sub-Items ── */}
                    <AnimatePresence>
                      {item.subItems && expandedItem === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <div className="pl-11 md:pl-14 pb-6 space-y-1">
                            {/* "Tümünü Gör" link */}
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="block py-2.5 text-sm md:text-base font-serif text-gold/70
                                       hover:text-gold transition-colors duration-300"
                            >
                              Tümünü Gör
                            </Link>
                            {item.subItems.map((sub) => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                onClick={onClose}
                                className="block py-2.5 text-lg md:text-xl font-serif font-light
                                         text-ivory-100/60 hover:text-ivory-100
                                         transition-colors duration-300"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer row */}
            <motion.div
              variants={secondaryVariants}
              initial="closed"
              animate="open"
              exit="exit"
              className="px-8 md:px-16 lg:px-24 py-8 border-t border-white/10
                         flex flex-col md:flex-row items-start md:items-center
                         gap-4 md:gap-0 justify-between"
            >
              <nav className="flex flex-wrap gap-x-8 gap-y-2">
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    className="text-[9px] text-white/45 hover:text-gold
                               tracking-luxury uppercase font-sans transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-6">
                {["Instagram", "Pinterest", "WhatsApp"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-[9px] text-white/30 hover:text-gold
                               tracking-widest uppercase font-sans transition-colors duration-300"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
