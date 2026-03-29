"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductSpec } from "@/lib/types";

interface AccordionItemProps {
  title: string;
  specs: ProductSpec[];
  defaultOpen?: boolean;
}

function AccordionItem({ title, specs, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-ivory-200 last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 group"
        aria-expanded={open}
      >
        <span className="text-[10px] tracking-luxury-wide uppercase font-sans font-medium
                         text-charcoal group-hover:text-gold transition-colors duration-300">
          {title}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-charcoal-lighter group-hover:text-gold transition-colors duration-300"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <dl className="pb-6 space-y-3">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-2 gap-4 text-[11px] font-sans"
                >
                  <dt className="text-charcoal-lighter font-light">{spec.label}</dt>
                  <dd className="text-charcoal font-light">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProductAccordionsProps {
  stoneSpecs: ProductSpec[];
  certificateInfo: ProductSpec[];
  karatDetails: ProductSpec[];
}

export default function ProductAccordions({
  stoneSpecs,
  certificateInfo,
  karatDetails,
}: ProductAccordionsProps) {
  return (
    <div className="border-t border-ivory-200">
      <AccordionItem title="Taş Özellikleri" specs={stoneSpecs} defaultOpen />
      <AccordionItem title="Karat & Metal Detayları" specs={karatDetails} />
      <AccordionItem title="Sertifika Bilgisi" specs={certificateInfo} />
    </div>
  );
}
