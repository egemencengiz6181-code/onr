"use client";

import { useEffect, useState, useCallback } from "react";

interface Customer {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string;
  created_at: string;
  orders?: Order[];
}

interface Order {
  id: string;
  order_number: string;
  total: number;
  status: string;
  created_at: string;
}

const statusMap: Record<string, { label: string; color: string }> = {
  confirmed:  { label: "Onaylandı",      color: "bg-yellow-100 text-yellow-800" },
  processing: { label: "Hazırlanıyor",   color: "bg-blue-100 text-blue-800" },
  shipped:    { label: "Kargoda",        color: "bg-purple-100 text-purple-800" },
  delivered:  { label: "Teslim Edildi",  color: "bg-green-100 text-green-800" },
  cancelled:  { label: "İptal",          color: "bg-red-100 text-red-800" },
};

export default function AdminMusterilerPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Customer | null>(null);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const [cRes, oRes] = await Promise.all([
      fetch("/api/admin/customers"),
      fetch("/api/admin/orders"),
    ]);
    const cData: Customer[] = cRes.ok ? await cRes.json() : [];
    const oData: (Order & { user_email: string; user_id: string })[] = oRes.ok ? await oRes.json() : [];
    setAllOrders(oData);
    // Attach orders to customers
    const enriched = cData.map((c) => ({
      ...c,
      orders: oData.filter((o) => o.user_id === c.id || o.user_email === c.email),
    }));
    setCustomers(enriched);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = customers.filter((c) =>
    !search ||
    (c.full_name ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (c.email ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = (c: Customer) =>
    (c.orders ?? []).reduce((s, o) => s + (o.total ?? 0), 0);

  return (
    <div className="flex gap-6">
      {/* List */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] font-sans tracking-luxury uppercase text-gray-400 mb-1">Yönetim</p>
            <h1 className="text-2xl font-serif font-light text-gray-800">Müşteriler</h1>
          </div>
          <span className="text-xs font-sans text-gray-400 bg-white px-3 py-1.5 rounded border border-gray-200">
            {filtered.length} müşteri
          </span>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg p-4 mb-5 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 shrink-0">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="İsim veya e-posta ara..." className="flex-1 text-sm font-sans outline-none text-gray-700 placeholder-gray-300" />
        </div>

        <div className="bg-white rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 space-y-3">
              {[...Array(6)].map((_, i) => <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center text-gray-400 font-sans text-sm">Müşteri bulunamadı</div>
          ) : (
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Müşteri", "Sipariş", "Toplam Harcama", "Üyelik Tarihi", ""].map((h, i) => (
                    <th key={i} className="text-left px-5 py-3 text-[10px] tracking-wider uppercase text-gray-400 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    className={`border-b border-gray-50 cursor-pointer transition-colors ${selected?.id === c.id ? "bg-[#C9A84C]/5" : "hover:bg-gray-50"}`}
                    onClick={() => setSelected(c)}
                  >
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-gray-800">{c.full_name || "—"}</p>
                      <p className="text-[10px] text-gray-400">{c.email}</p>
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {(c.orders ?? []).length} sipariş
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-gray-700">
                      {totalRevenue(c) > 0 ? `₺${totalRevenue(c).toLocaleString("tr-TR")}` : "—"}
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs">
                      {new Date(c.created_at).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-5 py-3.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="w-80 shrink-0">
          <div className="bg-white rounded-lg overflow-hidden sticky top-20">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <p className="text-sm font-sans font-medium text-gray-700">{selected.full_name || "İsimsiz Kullanıcı"}</p>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="p-5 space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Info */}
              <div className="space-y-2">
                {[
                  { label: "E-Posta", value: selected.email ?? "—" },
                  { label: "Rol",     value: selected.role === "admin" ? "Admin" : "Kullanıcı" },
                  { label: "Üyelik", value: new Date(selected.created_at).toLocaleDateString("tr-TR") },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-xs font-sans">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-gray-700 font-medium text-right max-w-[60%] truncate">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
                <div className="bg-gray-50 rounded p-3 text-center">
                  <p className="text-xl font-serif font-light text-[#C9A84C]">{(selected.orders ?? []).length}</p>
                  <p className="text-[9px] font-sans tracking-wider uppercase text-gray-400 mt-0.5">Sipariş</p>
                </div>
                <div className="bg-gray-50 rounded p-3 text-center">
                  <p className="text-sm font-serif font-light text-gray-700">₺{totalRevenue(selected).toLocaleString("tr-TR")}</p>
                  <p className="text-[9px] font-sans tracking-wider uppercase text-gray-400 mt-0.5">Harcama</p>
                </div>
              </div>

              {/* Orders */}
              {(selected.orders ?? []).length > 0 && (
                <div>
                  <p className="text-[10px] font-sans tracking-wider uppercase text-gray-400 mb-3">Siparişler</p>
                  <div className="space-y-2">
                    {(selected.orders ?? []).map((o) => {
                      const st = statusMap[o.status] ?? statusMap.confirmed;
                      return (
                        <div key={o.id} className="flex items-center justify-between py-2 border-b border-gray-50">
                          <div>
                            <p className="text-[10px] font-mono text-[#C9A84C]">{o.order_number}</p>
                            <p className="text-[10px] text-gray-400">{new Date(o.created_at).toLocaleDateString("tr-TR")}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-medium text-gray-700">₺{o.total?.toLocaleString("tr-TR")}</p>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${st.color}`}>{st.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
