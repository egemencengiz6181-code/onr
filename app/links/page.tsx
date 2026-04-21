import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "ONR Mücevherat — Bağlantılar",
  description: "ONR Mücevherat resmi bağlantı sayfası.",
  robots: { index: false, follow: false },
};

const links = [
  {
    label: "ONR Mücevherat — Web",
    href: "https://onr-gamma.vercel.app",
    external: true,
  },
  {
    label: "İletişim",
    href: "tel:+903124264666",
    external: false,
  },
  {
    label: "ONR Mücevherat",
    href: "https://share.google/rwltju5bgU6yFAGVB",
    external: true,
  },
  {
    label: "ONR Mücevherat Exclusive",
    href: "https://share.google/GJMxBZeT2dSLLrnxS",
    external: true,
  },
  {
    label: "ONR Kuyumculuk & Mücevherat",
    href: "https://share.google/Y0bgaIwuUvID7vL6w",
    external: true,
  },
  {
    label: "ONR Kuyumculuk & Mücevherat — Şile",
    href: "https://share.google/0Sl9zzM61AbnQWrVf",
    external: true,
  },
];

export default function LinksPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-onyx px-6 py-16">
      {/* Subtle grain texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "180px",
        }}
      />

      {/* Very soft radial glow behind content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(201,168,76,0.055) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-10 sm:max-w-md">
        {/* Brand mark */}
        <header
          className="flex flex-col items-center gap-3 opacity-0 animate-fade-up"
          style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
        >
          <h1 className="sr-only">ONR Mücevherat</h1>
          <Image
            src="/images/logo/onr-logo-beyaz.png"
            alt="ONR Mücevherat"
            width={160}
            height={60}
            className="object-contain"
            priority
          />
          <div className="mt-4 w-12 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </header>

        {/* Links */}
        <nav
          className="flex w-full flex-col gap-3"
          aria-label="Hızlı bağlantılar"
        >
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group relative w-full opacity-0 animate-fade-up"
              style={{
                animationDelay: `${180 + i * 90}ms`,
                animationFillMode: "forwards",
              }}
            >
              <span
                className="
                  flex w-full items-center justify-center
                  border border-white/[0.12] rounded-[3px]
                  px-6 py-[15px]
                  font-sans text-[10.5px] font-light tracking-[0.38em] uppercase
                  text-white/70
                  transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                  group-hover:border-gold/40
                  group-hover:text-gold-light
                  group-hover:scale-[1.018]
                  group-hover:shadow-[0_6px_32px_-4px_rgba(201,168,76,0.18)]
                  group-hover:bg-white/[0.025]
                  group-active:scale-[0.998]
                "
              >
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Footer wordmark */}
        <footer
          className="mt-2 flex flex-col items-center gap-1.5 opacity-0 animate-fade-up"
          style={{ animationDelay: "900ms", animationFillMode: "forwards" }}
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p className="font-sans text-[8.5px] font-light tracking-[0.38em] text-white/20 uppercase mt-2">
            onrmucevherat.com
          </p>
        </footer>
      </div>
    </main>
  );
}
