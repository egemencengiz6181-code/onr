"use client";

import { motion } from "framer-motion";

interface PearlCareBannerProps {
  tags?: string[];
  category?: string;
}

const isPearlProduct = (tags?: string[], category?: string): boolean => {
  const haystack = [
    ...(tags ?? []),
    category ?? "",
  ].join(" ").toLowerCase();
  return haystack.includes("inci") || haystack.includes("pearl");
};

export default function PearlCareBanner({ tags, category }: PearlCareBannerProps) {
  if (!isPearlProduct(tags, category)) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
      className="flex items-center gap-3 bg-[#FDFCF0] border border-[#D4AF37]/20 px-4 py-2.5 mb-6"
    >
      {/* Pearl icon — minimal concentric circles */}
      <svg
        width="13"
        height="13"
        viewBox="0 0 14 14"
        fill="none"
        className="shrink-0 text-[#8B7355]"
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="0.9" />
        <circle cx="7" cy="7" r="3.2" stroke="currentColor" strokeWidth="0.7" />
        <circle cx="5.4" cy="5.2" r="0.8" fill="currentColor" opacity="0.45" />
      </svg>

      <p className="text-[10px] tracking-[0.22em] uppercase font-sans font-medium text-[#6B5C40] leading-relaxed">
        İnci Bakım Notu&ensp;
        <span className="font-light text-[#8B7355]">
          · Kimyasal ve parfümden uzak tutun, yumuşak bezle silin
        </span>
      </p>
    </motion.div>
  );
}
