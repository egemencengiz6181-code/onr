"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/authStore";

export default function AdminLoginPage() {
  const router = useRouter();
  const { setUser, setSession } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  // Password reset mode
  const [isRecovery, setIsRecovery] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    if (params.get("type") === "recovery") {
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      if (accessToken && refreshToken) {
        const supabase = createClient();
        supabase.auth
          .setSession({ access_token: accessToken, refresh_token: refreshToken })
          .then(() => setIsRecovery(true))
          .catch(() => setError("Şifre sıfırlama linki geçersiz veya süresi dolmuş."));
      } else {
        setError("Şifre sıfırlama linki geçersiz veya süresi dolmuş.");
      }
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) { setError("Şifre en az 6 karakter olmalıdır."); return; }
    setUpdateLoading(true);
    setError("");
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    setUpdateLoading(false);
    if (updateError) { setError("Şifre güncellenemedi: " + updateError.message); return; }
    setUpdateSuccess(true);
    setTimeout(() => router.push("/admin"), 2000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError || !data.user) {
      setError("E-posta veya şifre hatalı.");
      setLoading(false);
      return;
    }
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    if (adminEmail && adminEmail !== "*" && data.user.email !== adminEmail) {
      await supabase.auth.signOut();
      setError("Bu hesabın admin yetkisi bulunmuyor.");
      setLoading(false);
      return;
    }
    setUser(data.user);
    setSession(data.session);
    router.push("/admin");
  };

  const handleResetPassword = async () => {
    if (!email) { setError("Şifre sıfırlamak için önce e-posta adresinizi girin."); return; }
    setResetLoading(true);
    setError("");
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/login`,
    });
    setResetLoading(false);
    if (resetError) { setError("Mail gönderilemedi: " + resetError.message); return; }
    setResetSent(true);
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#C9A84C] mb-3">ONR Mücevherat</p>
          <h1 className="text-2xl font-serif font-light text-white">Yönetim Paneli</h1>
        </div>

        <div className="bg-[#1A1A1A] rounded-xl border border-white/5 p-8">
          {isRecovery ? (
            <form onSubmit={handleUpdatePassword} className="space-y-5">
              <p className="text-xs font-sans text-gray-400 text-center">Yeni şifrenizi belirleyin</p>
              <div>
                <label className="block text-[10px] font-sans tracking-wider uppercase text-gray-500 mb-2">Yeni Şifre</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="En az 6 karakter"
                  required
                  minLength={6}
                  className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-sm font-sans text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                />
              </div>
              {error && (
                <p className="text-xs font-sans text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">{error}</p>
              )}
              {updateSuccess && (
                <p className="text-xs font-sans text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3">
                  Şifre güncellendi! Admin paneline yönlendiriliyorsunuz...
                </p>
              )}
              <button
                type="submit"
                disabled={updateLoading || updateSuccess}
                className="w-full bg-[#C9A84C] hover:bg-[#B8973B] text-black text-[11px] font-sans font-medium tracking-[0.15em] uppercase py-3.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateLoading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[10px] font-sans tracking-wider uppercase text-gray-500 mb-2">E-Posta</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ornucevherat.com"
                  required
                  className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-sm font-sans text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-sans tracking-wider uppercase text-gray-500 mb-2">Şifre</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-sm font-sans text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                />
              </div>
              {error && (
                <p className="text-xs font-sans text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">{error}</p>
              )}
              {resetSent && (
                <p className="text-xs font-sans text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3">
                  Şifre sıfırlama linki e-posta adresinize gönderildi.
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9A84C] hover:bg-[#B8973B] text-black text-[11px] font-sans font-medium tracking-[0.15em] uppercase py-3.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                    </svg>
                    Giriş yapılıyor...
                  </span>
                ) : "Giriş Yap"}
              </button>
              <button
                type="button"
                onClick={handleResetPassword}
                disabled={resetLoading || resetSent}
                className="w-full text-[10px] font-sans tracking-wider uppercase text-gray-500 hover:text-[#C9A84C] transition-colors py-1 disabled:opacity-40"
              >
                {resetLoading ? "Gönderiliyor..." : "Şifremi Unuttum / Şifre Belirle"}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-[10px] font-sans text-gray-600 mt-6">
          <a href="/" className="hover:text-gray-400 transition-colors">← Siteye Dön</a>
        </p>
      </div>
    </div>
  );
}
