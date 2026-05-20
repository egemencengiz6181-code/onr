"use client";

import { useEffect, useState, useCallback } from "react";

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

export default function AdminOnrClubPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/onrclub");
    if (res.ok) setSubscribers(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = subscribers.filter(
    (s) => !search || s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-sans tracking-wider uppercase text-gray-400 mb-1">Üyelik</p>
          <h1 className="text-2xl font-serif font-light text-gray-800">ONR Club Üyeleri</h1>
        </div>
        <div className="text-right">
          <p className="text-2xl font-serif font-light text-[#C9A84C]">{subscribers.length}</p>
          <p className="text-[10px] font-sans tracking-wider uppercase text-gray-400 mt-0.5">Toplam Üye</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg px-5 py-3 mb-5 flex items-center gap-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 shrink-0">
          <circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21" />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="E-posta ile ara..."
          className="flex-1 text-sm font-sans outline-none text-gray-700 placeholder:text-gray-300"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm font-sans">
            {search ? "Sonuç bulunamadı." : "Henüz üye yok."}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-[10px] font-sans tracking-wider uppercase text-gray-400">#</th>
                <th className="text-left px-5 py-3 text-[10px] font-sans tracking-wider uppercase text-gray-400">E-Posta</th>
                <th className="text-left px-5 py-3 text-[10px] font-sans tracking-wider uppercase text-gray-400">Üyelik Tarihi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-gray-400 font-sans text-xs">{i + 1}</td>
                  <td className="px-5 py-3 text-gray-700 font-sans">{s.email}</td>
                  <td className="px-5 py-3 text-gray-400 font-sans text-xs">
                    {new Date(s.created_at).toLocaleDateString("tr-TR", {
                      day: "2-digit", month: "long", year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
