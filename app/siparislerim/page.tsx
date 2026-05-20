"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import { useAuthStore } from "@/lib/authStore";
import { useOrderStore, type Order } from "@/lib/orderStore";

const STATUS_LABELS: Record<Order["status"], { label: string; className: string }> = {
  confirmed: { label: "Onaylandı", className: "text-gold" },
  processing: { label: "Hazırlanıyor", className: "text-blue-500" },
  shipped: { label: "Kargoya Verildi", className: "text-purple-500" },
  delivered: { label: "Teslim Edildi", className: "text-green-600" },
  cancelled: { label: "İptal Edildi", className: "text-red-500" },
};

export default function SiparislerimPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const { orders } = useOrderStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !user) router.replace("/");
  }, [mounted, isLoading, user, router]);

  if (!mounted || isLoading) return null;
  if (!user) return null;

  const userOrders = orders
    .filter((o) => o.userId === user.id || o.userEmail === user.email)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen pt-44 pb-20 px-5 md:px-10 lg:px-16 max-w-screen-lg mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-overline text-gold">Hesabım</p>
            <h1 className="font-serif font-light text-charcoal text-3xl md:text-4xl mt-1">
              Siparişlerim
            </h1>
          </div>
          <Link href="/profil" className="text-[9px] font-sans tracking-luxury uppercase text-charcoal-lighter hover:text-gold transition-colors">
            ← Profilime Dön
          </Link>
        </div>

        {userOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="font-serif font-light text-charcoal text-2xl mb-4">
              Henüz siparişiniz bulunmuyor
            </p>
            <p className="text-charcoal-lighter font-sans text-sm mb-8">
              İlk siparişinizi vermek için koleksiyonlarımıza göz atın.
            </p>
            <Link href="/koleksiyonlar" className="btn-luxury-filled">
              Koleksiyonlara Git
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {userOrders.map((order, i) => {
              const status = STATUS_LABELS[order.status] ?? STATUS_LABELS.confirmed;
              const date = new Date(order.createdAt).toLocaleDateString("tr-TR", {
                day: "2-digit", month: "long", year: "numeric",
              });

              return (
                <motion.article
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-ivory-50 overflow-hidden"
                >
                  {/* Order header */}
                  <div className="px-8 py-5 border-b border-ivory-200 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex gap-8 items-center flex-wrap">
                      <div>
                        <p className="text-[8px] font-sans tracking-luxury uppercase text-charcoal-lighter mb-1">Sipariş No</p>
                        <p className="font-sans text-sm text-charcoal">{order.orderNumber}</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-sans tracking-luxury uppercase text-charcoal-lighter mb-1">Tarih</p>
                        <p className="font-sans text-sm text-charcoal">{date}</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-sans tracking-luxury uppercase text-charcoal-lighter mb-1">Toplam</p>
                        <p className="font-serif text-charcoal">₺{order.total.toLocaleString("tr-TR")}</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-sans tracking-luxury uppercase text-charcoal-lighter mb-1">Durum</p>
                        <p className={`text-xs font-sans font-medium ${status.className}`}>{status.label}</p>
                      </div>
                    </div>
                    <Link
                      href={`/siparis-onay/${order.id}`}
                      className="text-[9px] font-sans tracking-luxury uppercase text-gold hover:text-charcoal transition-colors"
                    >
                      Detay →
                    </Link>
                  </div>

                  {/* Items preview */}
                  <div className="px-8 py-5 flex gap-4 overflow-x-auto">
                    {order.items.map((item) => (
                      <div key={item.productId} className="flex-none flex items-center gap-3">
                        <div className="relative w-14 h-16 bg-ivory-200 overflow-hidden shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[8px] text-gold font-sans tracking-wider truncate max-w-[120px]">
                            {item.category}
                          </p>
                          <p className="text-xs font-serif font-light text-charcoal truncate max-w-[120px]">
                            {item.name}
                          </p>
                          <p className="text-[10px] font-sans text-charcoal-lighter">
                            {item.quantity}x ₺{item.price.toLocaleString("tr-TR")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </main>
      <Footer hideNewsletter />
    </PageWrapper>
  );
}
