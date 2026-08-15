"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

interface StockNotification {
  id: string;
  product_id: string | null;
  product_name: string;
  product_slug: string | null;
  email: string;
  phone: string;
  is_notified: boolean;
  created_at: string;
}

export default function HaberVerPage() {
  const [rows, setRows] = useState<StockNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [onlyPending, setOnlyPending] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stock-notifications");
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Talepler yüklenemedi");
      else { setRows(data); setError(""); }
    } catch {
      setError("Talepler yüklenemedi");
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleNotified = async (row: StockNotification) => {
    setRows((prev) => prev.map((r) => r.id === row.id ? { ...r, is_notified: !r.is_notified } : r));
    await fetch("/api/admin/stock-notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: row.id, is_notified: !row.is_notified }),
    });
  };

  const remove = async (row: StockNotification) => {
    if (!confirm(`${row.email} kaydını silmek istediğinize emin misiniz?`)) return;
    await fetch("/api/admin/stock-notifications", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: row.id }),
    });
    setRows((prev) => prev.filter((r) => r.id !== row.id));
  };

  const filtered = rows.filter((r) => {
    if (onlyPending && r.is_notified) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      r.product_name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.phone.includes(q)
    );
  });

  const pendingCount = rows.filter((r) => !r.is_notified).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-sans tracking-luxury uppercase text-gray-400 mb-1">Yönetim</p>
          <h1 className="text-2xl font-serif font-light text-gray-800">Haber Ver Talepleri</h1>
        </div>
        {pendingCount > 0 && (
          <span className="text-xs font-sans text-[#C9A84C] border border-[#C9A84C]/40 bg-[#C9A84C]/8 rounded px-3 py-1.5">
            {pendingCount} bekleyen talep
          </span>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-sm font-sans text-red-600 leading-relaxed">
          {error}
          {error.includes("stock_notifications") && (
            <>
              {" "}Depodaki{" "}
              <code className="text-xs bg-white px-1.5 py-0.5 rounded">supabase/sold-out-migration.sql</code>{" "}
              dosyasını Supabase SQL Editor&apos;de çalıştırın.
            </>
          )}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 mb-5 flex items-center gap-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 shrink-0">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ürün, e-posta veya telefon ara..."
          className="flex-1 text-sm font-sans outline-none text-gray-700 placeholder-gray-300"
        />
        <label className="flex items-center gap-2 cursor-pointer shrink-0">
          <input
            type="checkbox"
            checked={onlyPending}
            onChange={(e) => setOnlyPending(e.target.checked)}
            className="w-3.5 h-3.5 accent-[#C9A84C]"
          />
          <span className="text-xs font-sans text-gray-500">Sadece bekleyenler</span>
        </label>
        <span className="text-xs font-sans text-gray-400 shrink-0">{filtered.length} kayıt</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 space-y-4">
              {[...Array(4)].map((_, i) => <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-gray-400 font-sans text-sm">
                {search || onlyPending ? "Sonuç bulunamadı" : "Henüz haber ver talebi yok"}
              </p>
            </div>
          ) : (
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Ürün", "E-posta", "Telefon", "Tarih", "Durum", "İşlem"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] tracking-wider uppercase text-gray-400 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      {row.product_slug ? (
                        <Link href={`/urun/${row.product_slug}`} target="_blank" className="text-gray-800 font-medium hover:text-[#C9A84C] transition-colors">
                          {row.product_name}
                        </Link>
                      ) : (
                        <span className="text-gray-800 font-medium">{row.product_name}</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <a href={`mailto:${row.email}`} className="text-gray-600 hover:text-[#C9A84C] transition-colors">{row.email}</a>
                    </td>
                    <td className="px-5 py-3">
                      <a href={`tel:${row.phone.replace(/\s/g, "")}`} className="text-gray-600 hover:text-[#C9A84C] transition-colors whitespace-nowrap">{row.phone}</a>
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(row.created_at).toLocaleDateString("tr-TR", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => toggleNotified(row)}
                        className={`text-[10px] tracking-wider uppercase px-2.5 py-1 rounded border transition-colors whitespace-nowrap ${
                          row.is_notified
                            ? "border-green-200 bg-green-50 text-green-600"
                            : "border-gray-200 text-gray-400 hover:border-[#C9A84C] hover:text-[#C9A84C]"
                        }`}
                        title="Durumu değiştir"
                      >
                        {row.is_notified ? "Haber verildi" : "Bekliyor"}
                      </button>
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => remove(row)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                        title="Sil"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
