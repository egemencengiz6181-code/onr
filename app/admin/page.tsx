"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  products: number;
  orders: number;
  customers: number;
  revenue: number;
}

interface RecentOrder {
  id: string;
  order_number: string;
  user_email: string;
  total: number;
  status: string;
  created_at: string;
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  confirmed:  { label: "Onaylandı",      color: "bg-yellow-100 text-yellow-800" },
  processing: { label: "Hazırlanıyor",   color: "bg-blue-100 text-blue-800" },
  shipped:    { label: "Kargoda",        color: "bg-purple-100 text-purple-800" },
  delivered:  { label: "Teslim Edildi",  color: "bg-green-100 text-green-800" },
  cancelled:  { label: "İptal",          color: "bg-red-100 text-red-800" },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ products: 0, orders: 0, customers: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [ordersRes, customersRes, productsRes] = await Promise.all([
          fetch("/api/admin/orders"),
          fetch("/api/admin/customers"),
          fetch("/api/admin/products"),
        ]);
        const orders: RecentOrder[] = ordersRes.ok ? await ordersRes.json() : [];
        const customers: unknown[] = customersRes.ok ? await customersRes.json() : [];
        const products: unknown[] = productsRes.ok ? await productsRes.json() : [];
        const revenue = orders.reduce((s, o) => s + (o.total ?? 0), 0);
        setStats({ products: products.length, orders: orders.length, customers: customers.length, revenue });
        setRecentOrders(orders.slice(0, 8));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const statCards = [
    { label: "Toplam Ürün",    value: stats.products,   href: "/admin/urunler",   color: "text-[#C9A84C]" },
    { label: "Toplam Sipariş", value: stats.orders,     href: "/admin/siparisler",color: "text-blue-600" },
    { label: "Müşteri",        value: stats.customers,  href: "/admin/musteriler",color: "text-purple-600" },
    { label: "Toplam Ciro",    value: `₺${stats.revenue.toLocaleString("tr-TR")}`, href: "/admin/siparisler", color: "text-green-600" },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] font-sans tracking-luxury uppercase text-gray-400 mb-1">Genel Bakış</p>
        <h1 className="text-2xl font-serif font-light text-gray-800">Dashboard</h1>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href} className="bg-white rounded-lg p-6 hover:shadow-sm transition-shadow block">
            <p className="text-[10px] font-sans tracking-wider uppercase text-gray-400 mb-2">{card.label}</p>
            {loading ? (
              <div className="h-8 w-20 bg-gray-100 rounded animate-pulse" />
            ) : (
              <p className={`text-3xl font-serif font-light ${card.color}`}>{card.value}</p>
            )}
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <Link href="/admin/urunler/yeni" className="bg-[#C9A84C] text-white rounded-lg p-5 flex items-center gap-4 hover:bg-[#B8965A] transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <div>
            <p className="font-sans text-sm font-medium">Yeni Ürün Ekle</p>
            <p className="text-[10px] opacity-80 mt-0.5 font-sans">Ürün kataloğuna ürün ekle</p>
          </div>
        </Link>
        <Link href="/admin/siparisler" className="bg-white rounded-lg p-5 flex items-center gap-4 hover:shadow-sm transition-shadow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-500">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <div>
            <p className="font-sans text-sm font-medium text-gray-700">Siparişleri Yönet</p>
            <p className="text-[10px] text-gray-400 mt-0.5 font-sans">Durum güncelleme</p>
          </div>
        </Link>
        <Link href="/admin/musteriler" className="bg-white rounded-lg p-5 flex items-center gap-4 hover:shadow-sm transition-shadow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-500">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
          </svg>
          <div>
            <p className="font-sans text-sm font-medium text-gray-700">Müşteriler</p>
            <p className="text-[10px] text-gray-400 mt-0.5 font-sans">Kayıtlı kullanıcılar</p>
          </div>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-sans text-sm font-medium text-gray-700">Son Siparişler</h2>
          <Link href="/admin/siparisler" className="text-[10px] font-sans tracking-wider uppercase text-[#C9A84C] hover:text-[#9A7B2E]">
            Tümünü Gör →
          </Link>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-5 bg-gray-100 rounded animate-pulse" />
              ))}
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="p-10 text-center text-gray-400 font-sans text-sm">Henüz sipariş yok</div>
          ) : (
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Sipariş No", "Müşteri", "Tutar", "Durum", "Tarih"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-[10px] tracking-wider uppercase text-gray-400 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => {
                  const st = STATUS_MAP[o.status] ?? STATUS_MAP.confirmed;
                  return (
                    <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-[#C9A84C] font-mono text-xs">{o.order_number}</td>
                      <td className="px-6 py-4 text-gray-600">{o.user_email}</td>
                      <td className="px-6 py-4 font-medium">₺{o.total?.toLocaleString("tr-TR")}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${st.color}`}>{st.label}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-xs">
                        {new Date(o.created_at).toLocaleDateString("tr-TR")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
