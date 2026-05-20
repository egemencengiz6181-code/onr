"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  sku: string | null;
  price: number;
  stock_count: number;
  is_published: boolean;
  images: { src: string; alt: string }[];
  created_at: string;
}

export default function AdminUrunlerPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    if (res.ok) setProducts(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" ürününü silmek istediğinize emin misiniz?`)) return;
    setDeletingId(id);
    await fetch("/api/admin/products", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    await load();
    setDeletingId(null);
  };

  const handleTogglePublish = async (product: Product) => {
    await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: product.id, is_published: !product.is_published }),
    });
    setProducts((prev) => prev.map((p) => p.id === product.id ? { ...p, is_published: !p.is_published } : p));
  };

  const filtered = products.filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    (p.sku ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-sans tracking-luxury uppercase text-gray-400 mb-1">Yönetim</p>
          <h1 className="text-2xl font-serif font-light text-gray-800">Ürünler</h1>
        </div>
        <Link href="/admin/urunler/yeni" className="flex items-center gap-2 bg-[#C9A84C] text-white px-5 py-2.5 rounded text-sm font-sans hover:bg-[#B8965A] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Yeni Ürün
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg p-4 mb-5 flex items-center gap-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 shrink-0">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="İsim, kategori veya stok kodu ara..."
          className="flex-1 text-sm font-sans outline-none text-gray-700 placeholder-gray-300"
        />
        <span className="text-xs font-sans text-gray-400">{filtered.length} ürün</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 space-y-4">
              {[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-gray-400 font-sans text-sm mb-4">
                {search ? "Arama sonucu bulunamadı" : "Henüz ürün eklenmedi"}
              </p>
              {!search && (
                <Link href="/admin/urunler/yeni" className="text-[#C9A84C] text-sm font-sans hover:underline">
                  İlk ürünü ekle →
                </Link>
              )}
            </div>
          ) : (
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Görsel", "Ürün", "Kategori", "SKU", "Fiyat", "Stok", "Durum", "İşlem"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] tracking-wider uppercase text-gray-400 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id} onClick={() => router.push(`/admin/urunler/${product.id}`)} className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="px-5 py-3">
                      <div className="relative w-10 h-12 bg-gray-100 rounded overflow-hidden">
                        {product.images?.[0] ? (
                          <Image src={product.images[0].src} alt={product.images[0].alt} fill sizes="40px" className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-medium text-gray-800 whitespace-nowrap max-w-[180px] truncate">{product.name}</p>
                    </td>
                    <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{product.category}</td>
                    <td className="px-5 py-3 font-mono text-xs text-gray-400">{product.sku ?? "—"}</td>
                    <td className="px-5 py-3 font-medium text-gray-700 whitespace-nowrap">₺{product.price?.toLocaleString("tr-TR")}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium ${product.stock_count > 0 ? "text-green-600" : "text-red-500"}`}>
                        {product.stock_count}
                      </span>
                    </td>
                    <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleTogglePublish(product)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${product.is_published ? "bg-[#C9A84C]" : "bg-gray-200"}`}
                      >
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${product.is_published ? "translate-x-4" : "translate-x-1"}`} />
                      </button>
                    </td>
                    <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-3">
                        <Link href={`/admin/urunler/${product.id}`} className="text-blue-500 hover:text-blue-700 transition-colors" title="Düzenle">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </Link>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(product.id, product.name); }}
                          disabled={deletingId === product.id}
                          className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-40"
                          title="Sil"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                          </svg>
                        </button>
                      </div>
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
