"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import { useOrderStore } from "@/lib/orderStore";

export default function SiparisOnayPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  const { getOrder } = useOrderStore();
  const [order, setOrder] = useState(getOrder(orderId));
  const [countdown, setCountdown] = useState(4);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setOrder(getOrder(orderId));
  }, [orderId, getOrder]);

  // Countdown + redirect
  useEffect(() => {
    if (!mounted) return;
    if (countdown <= 0) {
      router.push("/siparislerim");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, mounted, router]);

  if (!mounted || !order) return null;

  const date = new Date(order.createdAt).toLocaleDateString("tr-TR", {
    day: "2-digit", month: "long", year: "numeric",
  });

  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen pt-44 pb-20 px-5 md:px-10 max-w-screen-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          {/* Checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-6"
          >
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"
            >
              <motion.path d="M5 12l5 5L20 7" strokeDasharray="1" />
            </motion.svg>
          </motion.div>

          <p className="section-overline text-gold mb-2">Siparişiniz Alındı</p>
          <h1 className="font-serif font-light text-charcoal text-3xl md:text-4xl">
            Teşekkürler, {order.shippingAddress.fullName.split(" ")[0]}
          </h1>
          <p className="text-charcoal-lighter font-sans text-sm mt-3 max-w-sm mx-auto leading-relaxed">
            Siparişiniz onaylandı. Kargo bilgileriniz {order.shippingAddress.email} adresine
            gönderilecektir.
          </p>

          {/* Countdown */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-[10px] font-sans font-medium text-gold">{countdown}</span>
            </div>
            <span className="text-[10px] font-sans text-charcoal-lighter tracking-wider">
              saniye içinde Siparişlerim sayfasına yönlendirileceksiniz
            </span>
          </div>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="bg-ivory-50 p-8 mb-8"
        >
          {/* Order meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-6 border-b border-ivory-200 mb-6">
            {[
              { label: "Sipariş No", value: order.orderNumber },
              { label: "Tarih", value: date },
              { label: "Durum", value: "Onaylandı" },
              { label: "Toplam", value: `₺${order.total.toLocaleString("tr-TR")}` },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[8px] font-sans tracking-luxury uppercase text-charcoal-lighter mb-1">
                  {item.label}
                </p>
                <p className={`font-serif font-light text-charcoal text-sm ${item.label === "Durum" ? "text-gold" : ""}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Items */}
          <p className="section-overline text-charcoal-lighter mb-4">Sipariş İçeriği</p>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.productId} className="flex gap-4 items-center">
                <div className="relative w-16 h-20 shrink-0 bg-ivory-200 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[8px] text-gold font-sans tracking-wider">{item.category}</p>
                  <p className="font-serif font-light text-charcoal text-sm truncate">{item.name}</p>
                  <p className="text-[10px] font-sans text-charcoal-lighter mt-0.5">
                    {item.quantity} adet × ₺{item.price.toLocaleString("tr-TR")}
                  </p>
                </div>
                <p className="font-serif text-charcoal text-sm shrink-0">
                  ₺{(item.price * item.quantity).toLocaleString("tr-TR")}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t border-ivory-200 mt-6 pt-5 space-y-2">
            <div className="flex justify-between text-sm font-sans">
              <span className="text-charcoal-lighter">Ara Toplam</span>
              <span className="font-serif">₺{order.subtotal.toLocaleString("tr-TR")}</span>
            </div>
            <div className="flex justify-between text-sm font-sans">
              <span className="text-charcoal-lighter">Kargo</span>
              <span className="font-serif text-gold">{order.shippingCost === 0 ? "Ücretsiz" : `₺${order.shippingCost.toLocaleString("tr-TR")}`}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-ivory-200">
              <span className="text-[9px] tracking-luxury uppercase font-sans text-charcoal-lighter">
                Genel Toplam
              </span>
              <span className="font-serif text-charcoal text-xl font-light">
                ₺{order.total.toLocaleString("tr-TR")}
              </span>
            </div>
          </div>

          {/* Shipping address */}
          <div className="border-t border-ivory-200 mt-6 pt-5">
            <p className="text-[8px] font-sans tracking-luxury uppercase text-charcoal-lighter mb-3">
              Teslimat Adresi
            </p>
            <address className="not-italic text-sm font-sans text-charcoal leading-relaxed">
              {order.shippingAddress.fullName}<br />
              {order.shippingAddress.address}<br />
              {order.shippingAddress.district}, {order.shippingAddress.city} {order.shippingAddress.postalCode}<br />
              {order.shippingAddress.country}<br />
              <span className="text-charcoal-lighter">{order.shippingAddress.phone}</span>
            </address>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/siparislerim" className="btn-luxury-filled justify-center">
            Siparişlerimi Görüntüle
          </Link>
          <Link href="/koleksiyonlar" className="btn-luxury justify-center">
            Alışverişe Devam Et
          </Link>
        </motion.div>
      </main>
      <Footer hideNewsletter />
    </PageWrapper>
  );
}
