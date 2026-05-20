"use client";

import { useEffect, useState, useCallback } from "react";

interface OrderItem { productId: string; name: string; quantity: number; price: number; }
interface Order {
  id: string;
  order_number: string;
  user_email: string;
  total: number;
  subtotal: number;
  shipping_cost: number;
  status: string;
  items: OrderItem[];
  shipping_address: {
    fullName: string; phone: string; address: string;
    district: string; city: string; postalCode: string; country: string;
  };
  notes?: string;
  payment_method: string;
  created_at: string;
}

const STATUSES = [
  { value: "confirmed",  label: "Onaylandı",      color: "bg-yellow-100 text-yellow-800" },
  { value: "processing", label: "Hazırlanıyor",   color: "bg-blue-100 text-blue-800" },
  { value: "shipped",    label: "Kargoya Verildi", color: "bg-purple-100 text-purple-800" },
  { value: "delivered",  label: "Teslim Edildi",  color: "bg-green-100 text-green-800" },
  { value: "cancelled",  label: "İptal Edildi",   color: "bg-red-100 text-red-800" },
];

const statusMap = Object.fromEntries(STATUSES.map((s) => [s.value, s]));

export default function AdminSiparislerPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/orders");
    if (res.ok) setOrders(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: orderId, status: newStatus }),
    });
    if (res.ok) {
      const updated: Order = await res.json();
      setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: updated.status } : o));
      if (selected?.id === orderId) setSelected((s) => s ? { ...s, status: updated.status } : s);
    }
    setUpdatingId(null);
  };

  const filtered = orders.filter((o) => {
    const matchSearch = !search ||
      o.order_number?.toLowerCase().includes(search.toLowerCase()) ||
      o.user_email?.toLowerCase().includes(search.toLowerCase()) ||
      o.shipping_address?.fullName?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex gap-6 h-full">
      {/* List */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] font-sans tracking-luxury uppercase text-gray-400 mb-1">Yönetim</p>
            <h1 className="text-2xl font-serif font-light text-gray-800">Siparişler</h1>
          </div>
          <span className="text-xs font-sans text-gray-400 bg-white px-3 py-1.5 rounded border border-gray-200">
            {filtered.length} sipariş
          </span>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 mb-5 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 shrink-0">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Sipariş no, müşteri ara..." className="flex-1 text-sm font-sans outline-none text-gray-700 placeholder-gray-300" />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="text-sm font-sans border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-[#C9A84C]">
            <option value="all">Tüm Durumlar</option>
            {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        <div className="bg-white rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 space-y-3">
              {[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center text-gray-400 font-sans text-sm">Sipariş bulunamadı</div>
          ) : (
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Sipariş No", "Müşteri", "Tutar", "Durum", "Tarih", ""].map((h, i) => (
                    <th key={i} className="text-left px-5 py-3 text-[10px] tracking-wider uppercase text-gray-400 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => {
                  const st = statusMap[o.status] ?? statusMap.confirmed;
                  return (
                    <tr
                      key={o.id}
                      className={`border-b border-gray-50 cursor-pointer transition-colors ${selected?.id === o.id ? "bg-[#C9A84C]/5" : "hover:bg-gray-50"}`}
                      onClick={() => setSelected(o)}
                    >
                      <td className="px-5 py-3.5 font-mono text-xs text-[#C9A84C]">{o.order_number}</td>
                      <td className="px-5 py-3.5">
                        <p className="text-gray-800">{o.shipping_address?.fullName}</p>
                        <p className="text-[10px] text-gray-400">{o.user_email}</p>
                      </td>
                      <td className="px-5 py-3.5 font-medium">₺{o.total?.toLocaleString("tr-TR")}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${st.color}`}>{st.label}</span>
                      </td>
                      <td className="px-5 py-3.5 text-gray-400 text-xs">
                        {new Date(o.created_at).toLocaleDateString("tr-TR")}
                      </td>
                      <td className="px-5 py-3.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="w-80 shrink-0">
          <div className="bg-white rounded-lg overflow-hidden sticky top-20">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <p className="text-xs font-mono text-[#C9A84C]">{selected.order_number}</p>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="p-5 space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Status Update */}
              <div>
                <p className="text-[10px] font-sans tracking-wider uppercase text-gray-400 mb-2">Durumu Güncelle</p>
                <select
                  value={selected.status}
                  disabled={updatingId === selected.id}
                  onChange={(e) => handleStatusChange(selected.id, e.target.value)}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-[#C9A84C] disabled:opacity-50"
                >
                  {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>

              {/* Customer */}
              <div>
                <p className="text-[10px] font-sans tracking-wider uppercase text-gray-400 mb-2">Müşteri</p>
                <p className="text-sm font-sans text-gray-800">{selected.shipping_address?.fullName}</p>
                <p className="text-xs text-gray-500">{selected.user_email}</p>
                <p className="text-xs text-gray-500">{selected.shipping_address?.phone}</p>
              </div>

              {/* Address */}
              <div>
                <p className="text-[10px] font-sans tracking-wider uppercase text-gray-400 mb-2">Teslimat Adresi</p>
                <address className="not-italic text-xs font-sans text-gray-600 leading-relaxed">
                  {selected.shipping_address?.address}<br />
                  {selected.shipping_address?.district}, {selected.shipping_address?.city} {selected.shipping_address?.postalCode}<br />
                  {selected.shipping_address?.country}
                </address>
              </div>

              {/* Items */}
              <div>
                <p className="text-[10px] font-sans tracking-wider uppercase text-gray-400 mb-2">Ürünler</p>
                <div className="space-y-2">
                  {(selected.items ?? []).map((item) => (
                    <div key={item.productId} className="flex justify-between text-xs font-sans">
                      <span className="text-gray-700">{item.quantity}x {item.name}</span>
                      <span className="text-gray-500">₺{(item.price * item.quantity).toLocaleString("tr-TR")}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-100 pt-4 space-y-1">
                <div className="flex justify-between text-xs font-sans text-gray-500">
                  <span>Ara Toplam</span>
                  <span>₺{selected.subtotal?.toLocaleString("tr-TR")}</span>
                </div>
                <div className="flex justify-between text-xs font-sans text-gray-500">
                  <span>Kargo</span>
                  <span>{selected.shipping_cost === 0 ? "Ücretsiz" : `₺${selected.shipping_cost?.toLocaleString("tr-TR")}`}</span>
                </div>
                <div className="flex justify-between text-sm font-sans font-medium text-gray-800 pt-1">
                  <span>Toplam</span>
                  <span>₺{selected.total?.toLocaleString("tr-TR")}</span>
                </div>
              </div>

              {/* Notes */}
              {selected.notes && (
                <div>
                  <p className="text-[10px] font-sans tracking-wider uppercase text-gray-400 mb-1">Not</p>
                  <p className="text-xs font-sans text-gray-600 bg-gray-50 rounded p-3">{selected.notes}</p>
                </div>
              )}

              <p className="text-[10px] text-gray-300 font-sans">
                {new Date(selected.created_at).toLocaleString("tr-TR")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
