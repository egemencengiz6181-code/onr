"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, setUser, setSession } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoginPage) return; // login sayfasında auth kontrolü yapma
    if (!mounted || isLoading) return;
    if (!user) { router.replace("/admin/login"); return; }
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    if (adminEmail && adminEmail !== "*" && user.email !== adminEmail) {
      console.warn(`[Admin] Erişim reddedildi. Giriş yapılan: ${user.email} | Beklenen: ${adminEmail}`);
      router.replace("/admin/login");
    }
  }, [mounted, isLoading, user, router, isLoginPage]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    router.push("/admin/login");
  };

  // Login sayfasını doğrudan render et (sidebar/header yok)
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#111111]">
        <div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F5F5F2] flex">
      <AdminSidebar />

      {/* Main area */}
      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 h-14 flex items-center justify-between px-8">
          <p className="text-xs font-sans tracking-wider uppercase text-gray-400">
            {new Date().toLocaleDateString("tr-TR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs font-sans text-gray-500">{user.email}</span>
            <button
              onClick={handleSignOut}
              className="text-[10px] font-sans tracking-wider uppercase text-gray-400 hover:text-red-500 transition-colors"
            >
              Çıkış
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
