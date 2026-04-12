"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function EditorialNewsletter() {
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
    <section className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[210px] lg:min-h-[240px]">
      {/* ── Left: Editorial Image ── */}
      <div className="relative h-48 md:h-auto overflow-hidden">
        <Image
          src="/images/web/8 (1).png"
          alt="ONR Mücevherat editoryal görsel"
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover object-center"
          priority={false}
        />
        {/* Subtle right-edge fade on desktop for seamless blend */}
        <div className="hidden md:block absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
      </div>

      {/* ── Right: Form Panel ── */}
      <div className="bg-[#0a0a0a] flex items-center px-8 md:px-14 lg:px-20 py-8 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease }}
          className="w-full max-w-md"
        >
          {/* Heading */}
          <h2 className="font-sans font-bold text-white text-lg md:text-xl lg:text-[1.35rem] tracking-tight uppercase leading-tight mb-3">
            ONR Club&apos;a Üye Ol!
          </h2>

          {/* Description */}
          <p className="font-sans font-light text-white/60 text-xs md:text-[13px] leading-relaxed mb-6">
            En yeni ürünlerimiz, kampanyalar ve daha fazlası hakkında
            güncellemeler için kaydolun.
          </p>

          {/* Form */}
          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-white/20 pb-4"
            >
              <p className="text-gold text-sm font-sans font-light tracking-wide">
                Teşekkürler — ONR Club&apos;a hoş geldiniz.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe}>
              <div className="flex items-center border-b border-white/25 pb-3 gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="flex-1 bg-transparent text-white/90 placeholder-white/35
                             text-xs font-sans font-light tracking-wide outline-none
                             focus:placeholder-white/50 transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="shrink-0 text-[10px] text-white/70 tracking-[0.2em] uppercase font-sans font-medium
                             hover:text-white transition-colors duration-300"
                >
                  Kaydol
                </button>
              </div>
            </form>
          )}

          {/* hCaptcha Notice */}
          <p className="font-sans text-[9px] text-white/25 leading-relaxed mt-3 italic max-w-sm">
            Bu site hCaptcha ile korunuyor. Ayrıca bu site için{" "}
            <span className="text-white/35">hCaptcha Gizlilik Politikası</span> ve{" "}
            <span className="text-white/35">Hizmet Şartları</span> geçerlidir.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
