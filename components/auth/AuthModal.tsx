"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/lib/authStore";
import { createClient } from "@/lib/supabase/client";

export default function AuthModal() {
  const { isAuthModalOpen, authModalTab, closeAuthModal, openAuthModal } =
    useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isLogin = authModalTab === "login";

  const reset = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setError(null);
    setMessage(null);
  };

  const switchTab = (tab: "login" | "register") => {
    reset();
    openAuthModal(tab);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const supabase = createClient();

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        closeAuthModal();
        reset();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        setMessage(
          "Kaydınız oluşturuldu. E-posta adresinize gönderilen bağlantıyla hesabınızı doğrulayın."
        );
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Bir hata oluştu, tekrar deneyin.";
      // Turkish error messages
      if (msg.includes("Invalid login credentials"))
        setError("E-posta veya şifre hatalı.");
      else if (msg.includes("User already registered"))
        setError("Bu e-posta adresiyle zaten kayıtlı bir hesap var.");
      else if (msg.includes("Password should be at least"))
        setError("Şifre en az 6 karakter olmalıdır.");
      else if (msg.includes("Email not confirmed"))
        setError("E-posta adresinizi doğrulamanız gerekmektedir.");
      else setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="auth-overlay"
            className="fixed inset-0 z-[60] bg-onyx/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            onClick={closeAuthModal}
          />

          {/* Modal */}
          <motion.div
            key="auth-modal"
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }}
            exit={{ opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.25 } }}
          >
            <div
              className="bg-ivory-50 w-full max-w-md shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={closeAuthModal}
                className="absolute top-5 right-5 p-1.5 text-charcoal-lighter hover:text-gold transition-colors"
                aria-label="Kapat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Header */}
              <div className="px-10 pt-10 pb-6 border-b border-ivory-200">
                <p className="section-overline text-gold mb-1">ONR Mücevherat</p>
                <h2 className="font-serif font-light text-charcoal text-2xl">
                  {isLogin ? "Hesabınıza Giriş Yapın" : "Hesap Oluşturun"}
                </h2>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-ivory-200">
                {(["login", "register"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => switchTab(tab)}
                    className={`flex-1 py-4 text-[9px] tracking-luxury uppercase font-sans transition-colors duration-300
                      ${authModalTab === tab
                        ? "text-gold border-b-2 border-gold -mb-px"
                        : "text-charcoal-lighter hover:text-charcoal"
                      }`}
                  >
                    {tab === "login" ? "Giriş Yap" : "Kayıt Ol"}
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-10 py-8 space-y-5">
                {!isLogin && (
                  <div>
                    <label className="block text-[9px] tracking-luxury uppercase font-sans text-charcoal-lighter mb-2">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="Adınız Soyadınız"
                      className="w-full border border-ivory-200 bg-transparent px-4 py-3 text-sm font-sans
                                 text-charcoal placeholder-charcoal-lighter/40 focus:outline-none
                                 focus:border-gold transition-colors duration-300"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[9px] tracking-luxury uppercase font-sans text-charcoal-lighter mb-2">
                    E-Posta
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="ornek@email.com"
                    className="w-full border border-ivory-200 bg-transparent px-4 py-3 text-sm font-sans
                               text-charcoal placeholder-charcoal-lighter/40 focus:outline-none
                               focus:border-gold transition-colors duration-300"
                  />
                </div>

                <div>
                  <label className="block text-[9px] tracking-luxury uppercase font-sans text-charcoal-lighter mb-2">
                    Şifre
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    minLength={6}
                    className="w-full border border-ivory-200 bg-transparent px-4 py-3 text-sm font-sans
                               text-charcoal placeholder-charcoal-lighter/40 focus:outline-none
                               focus:border-gold transition-colors duration-300"
                  />
                </div>

                {/* Error / Success */}
                {error && (
                  <p className="text-xs font-sans text-red-500 bg-red-50 px-4 py-3">{error}</p>
                )}
                {message && (
                  <p className="text-xs font-sans text-green-700 bg-green-50 px-4 py-3">{message}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-luxury-filled w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "İşleniyor..."
                    : isLogin
                    ? "Giriş Yap"
                    : "Hesap Oluştur"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-ivory-200" />
                  <span className="text-[9px] font-sans text-charcoal-lighter tracking-widest uppercase">
                    veya
                  </span>
                  <div className="flex-1 h-px bg-ivory-200" />
                </div>

                {/* Google */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full border border-ivory-200 py-3 flex items-center justify-center gap-3
                             text-[10px] font-sans tracking-widest uppercase text-charcoal
                             hover:border-gold hover:text-gold transition-colors duration-300"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google ile Devam Et
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
