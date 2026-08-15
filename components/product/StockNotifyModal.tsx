"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/types";

interface Props {
  product: Pick<Product, "id" | "name" | "slug">;
  open: boolean;
  onClose: () => void;
}

const ease = [0.25, 0.46, 0.45, 0.94] as const;

/** Tükenen ürünler için "gelince haber ver" kayıt formu. */
export default function StockNotifyModal({ product, open, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [kvkk, setKvkk] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  // Modal kapanınca formu sıfırla ki ikinci açılışta eski durum kalmasın.
  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setError("");
    }
  }, [open]);

  // Arka plan kaymasın
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("sending");

    try {
      const res = await fetch("/api/stock-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, email, phone }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Kayıt alınamadı, lütfen tekrar deneyin.");
        setStatus("idle");
        return;
      }
      setStatus("done");
    } catch {
      setError("Bağlantı kurulamadı, lütfen tekrar deneyin.");
      setStatus("idle");
    }
  };

  const inputClass =
    "w-full bg-transparent border-b border-[#1A1A1A]/15 py-2.5 text-[13px] font-sans font-light text-[#1A1A1A] placeholder-[#1A1A1A]/25 focus:outline-none focus:border-gold transition-colors duration-300";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-[#1A1A1A]/45 backdrop-blur-[2px] flex items-center justify-center p-5"
          role="dialog"
          aria-modal="true"
          aria-label="Gelince haber ver"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.4, ease }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[420px] bg-[#FAF9F6] px-8 py-10 sm:px-10 shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
          >
            {/* Kapat */}
            <button
              onClick={onClose}
              aria-label="Kapat"
              className="absolute top-4 right-4 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/70 transition-colors duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {status === "done" ? (
              <div className="text-center py-4">
                <div className="flex justify-center mb-5 text-gold">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="12" cy="12" r="10" /><polyline points="16 9 11 14 8 11" />
                  </svg>
                </div>
                <h2 className="font-serif font-light text-[1.4rem] text-[#1A1A1A] mb-3">Kaydınız Alındı</h2>
                <p className="text-[12px] font-sans font-light text-[#1A1A1A]/55 leading-relaxed mb-7">
                  <span className="text-[#1A1A1A]/75">{product.name}</span> yeniden stoğa
                  girdiğinde size haber vereceğiz.
                </p>
                <button
                  onClick={onClose}
                  className="text-[9px] tracking-[0.3em] uppercase font-sans font-medium py-[14px] px-10 bg-[#1A1A1A] text-[#FAF9F6] hover:bg-[#1A1A1A]/80 transition-colors duration-400"
                >
                  Kapat
                </button>
              </div>
            ) : (
              <>
                <p className="text-[8px] tracking-[0.3em] uppercase font-sans text-gold mb-3">Tükendi</p>
                <h2 className="font-serif font-light text-[1.5rem] leading-snug text-[#1A1A1A] mb-2.5">
                  Gelince Haber Ver
                </h2>
                <p className="text-[12px] font-sans font-light text-[#1A1A1A]/50 leading-relaxed mb-8">
                  <span className="text-[#1A1A1A]/75">{product.name}</span> yeniden stoğa
                  girdiğinde ilk siz haberdar olun.
                </p>

                <form onSubmit={submit} className="space-y-6">
                  <div>
                    <label htmlFor="notify-email" className="block text-[8px] tracking-[0.28em] uppercase font-sans text-[#1A1A1A]/40 mb-1">
                      E-posta *
                    </label>
                    <input
                      id="notify-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ornek@eposta.com"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="notify-phone" className="block text-[8px] tracking-[0.28em] uppercase font-sans text-[#1A1A1A]/40 mb-1">
                      Telefon *
                    </label>
                    <input
                      id="notify-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0532 000 00 00"
                      className={inputClass}
                    />
                  </div>

                  <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      required
                      checked={kvkk}
                      onChange={(e) => setKvkk(e.target.checked)}
                      className="mt-[3px] w-3 h-3 accent-[#C9A84C] shrink-0"
                    />
                    <span className="text-[10px] font-sans font-light text-[#1A1A1A]/45 leading-relaxed">
                      Ürün stoğa girdiğinde bilgilendirilmek üzere iletişim bilgilerimin
                      kullanılmasına izin veriyorum.
                    </span>
                  </label>

                  {error && (
                    <p className="text-[11px] font-sans text-red-600 leading-relaxed">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full text-[9px] tracking-[0.3em] uppercase font-sans font-medium py-[16px] bg-[#1A1A1A] text-[#FAF9F6] hover:bg-[#1A1A1A]/80 transition-colors duration-400 disabled:opacity-50"
                  >
                    {status === "sending" ? "Gönderiliyor..." : "Haber Ver"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
