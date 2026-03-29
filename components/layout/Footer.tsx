"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const footerLinks = {
  koleksiyonlar: [
    { label: "Tüm Koleksiyonlar", href: "/koleksiyonlar" },
    { label: "Yüzükler", href: "/koleksiyonlar" },
    { label: "Kolyeler", href: "/koleksiyonlar" },
    { label: "Bileklikler", href: "/koleksiyonlar" },
    { label: "Exclusive", href: "/exclusive" },
  ],
  hizmetler: [
    { label: "Özel Tasarım", href: "/ozel-tasarim" },
    { label: "Bakım & Onarım", href: "/bakim-ve-onarim" },
    { label: "Randevu Al", href: "/iletisim" },
  ],
  kurumsal: [
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "Blog", href: "/blog" },
    { label: "Şubelerimiz", href: "/subelerimiz" },
    { label: "İletişim", href: "/iletisim" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-onyx text-ivory-100/60">
      {/* ── Newsletter Band ── */}
      <div className="border-b border-white/8 py-14 md:py-16 px-8 md:px-16 lg:px-24">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row
                        items-start md:items-center justify-between gap-8">
          <div>
            <p className="section-overline text-gold mb-2">Özel Davetiye</p>
            <h3 className="font-serif font-light text-ivory-50 text-2xl md:text-3xl">
              İlk Görücüye Siz Çıkın
            </h3>
            <p className="text-[11px] text-ivory-100/35 font-sans font-light mt-2 max-w-xs leading-relaxed">
              Yeni koleksiyonlar, exclusive etkinlikler ve ayrıcalıklı teklifler
              için bültenimize katılın.
            </p>
          </div>

          <div className="w-full md:w-auto md:min-w-[380px]">
            {subscribed ? (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gold text-sm font-sans font-light tracking-wide"
              >
                Teşekkürler — Hoş geldiniz, sevgili konuğumuz.
              </motion.p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex border-b border-white/20">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  required
                  className="flex-1 bg-transparent text-ivory-100/80 placeholder-ivory-100/20
                             text-[11px] tracking-widest font-sans py-3 pr-4 outline-none
                             focus:placeholder-ivory-100/40 transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="text-[9px] text-gold tracking-luxury-wide uppercase font-sans
                             py-3 pl-4 border-l border-white/10 hover:text-gold-light
                             transition-colors duration-300 shrink-0"
                >
                  Abone Ol
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="py-16 md:py-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-6" aria-label="ONR Mücevherat">
              <Image
                src="/images/logo/onr-logo-beyaz.png"
                alt="ONR Mücevherat"
                width={110}
                height={40}
                className="object-contain"
              />
            </Link>

            <p className="text-[11px] font-sans font-light leading-relaxed text-ivory-100/35 max-w-[220px]">
              Ankara kökenli ultra-lüks mücevher. Her parça, ustaların elinde
              yeniden doğan bir şiirdir.
            </p>

            {/* Social icons */}
            <div className="flex gap-4 mt-7">
              <a
                href="https://www.instagram.com/onrmucevherat/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[8px] text-ivory-100/30 hover:text-gold
                           tracking-luxury uppercase font-sans transition-colors duration-300"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Links columns */}
          {(
            [
              { title: "Koleksiyonlar", links: footerLinks.koleksiyonlar },
              { title: "Hizmetler", links: footerLinks.hizmetler },
              { title: "Kurumsal", links: footerLinks.kurumsal },
            ] as const
          ).map((group) => (
            <div key={group.title}>
              <p className="section-overline text-gold/80 mb-6">{group.title}</p>
              <ul className="space-y-3.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[10px] font-sans font-light text-ivory-100/40
                                 tracking-widest uppercase hover:text-gold
                                 transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/8 py-6 px-8 md:px-16 lg:px-24">
        <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row
                        items-center justify-between gap-3">
          <p className="text-[9px] text-ivory-100/20 font-sans tracking-widest">
            © {new Date().getFullYear()} ONR Mücevherat. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6">
            {[
              { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
              { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
              { label: "Teslimat & İade", href: "/teslimat-ve-iade" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[9px] text-ivory-100/20 hover:text-gold/60
                           tracking-widest font-sans transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
