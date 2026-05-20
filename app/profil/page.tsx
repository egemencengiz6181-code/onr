"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import { useAuthStore } from "@/lib/authStore";
import { useOrderStore } from "@/lib/orderStore";
import { createClient } from "@/lib/supabase/client";

export default function ProfilPage() {
  const router = useRouter();
  const { user, isLoading, setUser, setSession } = useAuthStore();
  const { orders } = useOrderStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !user) router.replace("/");
  }, [mounted, isLoading, user, router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    router.push("/");
  };

  if (!mounted || isLoading) return null;
  if (!user) return null;

  const userOrders = orders.filter((o) => o.userId === user.id || o.userEmail === user.email);
  const fullName = user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Misafir";
  const initials = fullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen pt-44 pb-20 px-5 md:px-10 lg:px-16 max-w-screen-lg mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="section-overline text-gold">Hesabım</p>
          <h1 className="font-serif font-light text-charcoal text-3xl md:text-4xl mt-1">Profilim</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* ── Sidebar ── */}
          <div className="md:col-span-1">
            <div className="bg-ivory-50 p-8 flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-4">
                <span className="font-serif text-gold text-xl font-light">{initials}</span>
              </div>
              <p className="font-serif font-light text-charcoal text-lg">{fullName}</p>
              <p className="text-[10px] font-sans text-charcoal-lighter mt-1">{user.email}</p>

              <div className="w-full mt-8 space-y-2">
                <Link
                  href="/profil"
                  className="block w-full text-left text-[9px] tracking-luxury uppercase font-sans px-4 py-3 border border-gold text-gold"
                >
                  Profil Bilgilerim
                </Link>
                <Link
                  href="/siparislerim"
                  className="block w-full text-left text-[9px] tracking-luxury uppercase font-sans px-4 py-3 text-charcoal-lighter hover:text-gold hover:border-gold border border-ivory-200 transition-colors"
                >
                  Siparişlerim
                  {userOrders.length > 0 && (
                    <span className="ml-2 text-[8px] bg-gold/10 text-gold px-1.5 py-0.5">
                      {userOrders.length}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left text-[9px] tracking-luxury uppercase font-sans px-4 py-3 text-red-400 hover:text-red-500 border border-ivory-200 hover:border-red-200 transition-colors"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>

          {/* ── Main Content ── */}
          <div className="md:col-span-2 space-y-8">
            {/* Profile Info */}
            <section className="bg-ivory-50 p-8">
              <h2 className="font-serif font-light text-charcoal text-xl mb-6 pb-4 border-b border-ivory-200">
                Hesap Bilgileri
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Ad Soyad", value: fullName },
                  { label: "E-Posta", value: user.email ?? "" },
                  { label: "Üyelik Tarihi", value: new Date(user.created_at).toLocaleDateString("tr-TR") },
                  { label: "Hesap Durumu", value: user.email_confirmed_at ? "Doğrulandı" : "E-posta Doğrulanmamış" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[8px] font-sans tracking-luxury uppercase text-charcoal-lighter mb-1">
                      {item.label}
                    </p>
                    <p className="font-sans text-sm text-charcoal">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Orders */}
            <section className="bg-ivory-50 p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-ivory-200">
                <h2 className="font-serif font-light text-charcoal text-xl">Son Siparişler</h2>
                <Link href="/siparislerim" className="text-[9px] font-sans tracking-luxury uppercase text-gold hover:text-charcoal transition-colors">
                  Tümünü Gör →
                </Link>
              </div>

              {userOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="font-serif font-light text-charcoal-lighter text-lg mb-2">Henüz siparişiniz yok</p>
                  <Link href="/koleksiyonlar" className="text-[9px] font-sans tracking-luxury uppercase text-gold hover:text-charcoal transition-colors">
                    Alışverişe Başla →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userOrders.slice(0, 3).map((order) => (
                    <Link
                      key={order.id}
                      href={`/siparis-onay/${order.id}`}
                      className="block p-4 border border-ivory-200 hover:border-gold transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[9px] font-sans tracking-luxury uppercase text-gold">
                            {order.orderNumber}
                          </p>
                          <p className="text-sm font-sans text-charcoal mt-0.5">
                            {order.items.length} ürün ·{" "}
                            <span className="text-charcoal-lighter">
                              {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                            </span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-serif text-charcoal">
                            ₺{order.total.toLocaleString("tr-TR")}
                          </p>
                          <span className="text-[8px] font-sans tracking-wider uppercase text-gold">
                            Onaylandı
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer hideNewsletter />
    </PageWrapper>
  );
}
