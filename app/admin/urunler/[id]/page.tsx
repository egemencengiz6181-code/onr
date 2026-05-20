"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

const CATEGORY_GROUPS = [
  {
    group: "Altın",
    categories: [
      { label: "Altın Bileklik",  slug: "altin-bileklikler" },
      { label: "Altın Kolye",     slug: "altin-kolyeler" },
      { label: "Altın Küpe",      slug: "altin-kupeler" },
      { label: "Altın Yüzük",     slug: "altin-halkalar" },
      { label: "Altın Alyans",    slug: "altin-halkalar" },
      { label: "Altın Kelepçe",   slug: "altin-bileklikler" },
      { label: "Altın Gerdanlık", slug: "altin-kolyeler" },
      { label: "Altın Set",       slug: "altin-setler" },
      { label: "Altın Piercing",  slug: "altin-kupeler" },
    ],
  },
  {
    group: "Bebek Özel",
    categories: [
      { label: "Bebek Emzik",    slug: "bebek-ozel" },
      { label: "Bebek Künye",    slug: "bebek-ozel" },
      { label: "Bebek İğne",     slug: "bebek-ozel" },
      { label: "Bebek Bileklik", slug: "bebek-ozel" },
      { label: "Bebek Kolye",    slug: "bebek-ozel" },
      { label: "Bebek Yüzük",    slug: "bebek-ozel" },
    ],
  },
  {
    group: "Mücevher › Yüzük",
    categories: [
      { label: "Tektaş Pırlanta Yüzük",    slug: "halkalar" },
      { label: "Baget Pırlanta Yüzük",      slug: "halkalar" },
      { label: "Tasarım Pırlanta Yüzük",    slug: "halkalar" },
      { label: "Beştaş Pırlanta Yüzük",     slug: "halkalar" },
      { label: "Tamtur Pırlanta Yüzük",     slug: "halkalar" },
      { label: "Yarımtur Pırlanta Yüzük",   slug: "halkalar" },
      { label: "Renkli Taşlı Yüzük",        slug: "halkalar" },
    ],
  },
  {
    group: "Mücevher › Kolye",
    categories: [
      { label: "Tektaş Pırlanta Kolye",  slug: "kolyeler" },
      { label: "Baget Pırlanta Kolye",    slug: "kolyeler" },
      { label: "Tasarım Pırlanta Kolye",  slug: "kolyeler" },
      { label: "Harf Pırlanta Kolye",     slug: "kolyeler" },
      { label: "Renkli Taşlı Kolye",      slug: "kolyeler" },
    ],
  },
  {
    group: "Mücevher › Küpe",
    categories: [
      { label: "Tektaş Pırlanta Küpe",   slug: "kupeler" },
      { label: "Baget Pırlanta Küpe",     slug: "kupeler" },
      { label: "Tasarım Pırlanta Küpe",   slug: "kupeler" },
      { label: "Halka Pırlanta Küpe",     slug: "kupeler" },
      { label: "Renkli Taşlı Küpe",       slug: "kupeler" },
      { label: "Pırlanta Piercing Küpe",  slug: "kupeler" },
    ],
  },
  {
    group: "Mücevher › Bileklik",
    categories: [
      { label: "Tasarım Pırlanta Bileklik",    slug: "bileklikler" },
      { label: "Pırlanta Su Yolu Bileklik",    slug: "bileklikler" },
      { label: "Baget Pırlanta Bileklik",      slug: "bileklikler" },
      { label: "Renkli Taşlı Bileklik",        slug: "bileklikler" },
      { label: "Charm Pırlanta Bileklik",      slug: "bileklikler" },
    ],
  },
  {
    group: "Mücevher › Setler",
    categories: [
      { label: "Pırlanta Set", slug: "setler" },
      { label: "İnci Set",     slug: "setler" },
    ],
  },
  {
    group: "İnci",
    categories: [
      { label: "İnci Yüzük",    slug: "inci" },
      { label: "İnci Kolye",    slug: "inci" },
      { label: "İnci Küpe",     slug: "inci" },
      { label: "İnci Bileklik", slug: "inci" },
      { label: "İnci Set",      slug: "inci" },
    ],
  },
  {
    group: "Exclusive",
    categories: [
      { label: "Exclusive", slug: "exclusive" },
    ],
  },
];

const ALL_CATEGORIES = CATEGORY_GROUPS.flatMap((g) => g.categories);

const CATEGORY_AUTO_TAGS: Record<string, string> = {
  "Bebek Emzik":    "emzik",
  "Bebek Künye":    "kunye",
  "Bebek İğne":     "igne",
  "Bebek Bileklik": "bileklik",
  "Bebek Kolye":    "kolye",
  "Bebek Yüzük":    "yuzuk",
};

const BEBEK_TAGS = Object.values(CATEGORY_AUTO_TAGS);

interface ImageRow { src: string; alt: string; }
interface SpecRow  { label: string; value: string; }

interface ProductForm {
  name: string;
  slug: string;
  category: string;
  category_slug: string;
  sku: string;
  price: string;
  original_price: string;
  short_description: string;
  description: string;
  stock_count: string;
  is_published: boolean;
  is_new: boolean;
  is_exclusive: boolean;
  is_mothers_day: boolean;
  limited_pieces: string;
  materials: string;
  tags: string;
  gender: string;
  images: ImageRow[];
  stone_specs: SpecRow[];
  certificate_info: SpecRow[];
  karat_details: SpecRow[];
}

const CATEGORY_SLUG_MAP: Record<string, string> = Object.fromEntries(
  ALL_CATEGORIES.map((c) => [c.label, c.slug])
);

const empty: ProductForm = {
  name: "", slug: "", category: "Altın Kolye", category_slug: "altin-kolyeler",
  sku: "", price: "", original_price: "", short_description: "", description: "",
  stock_count: "0", is_published: true, is_new: false, is_exclusive: false,
  is_mothers_day: false, limited_pieces: "", materials: "", tags: "", gender: "Kadın",
  images: [{ src: "", alt: "" }],
  stone_specs: [{ label: "", value: "" }],
  certificate_info: [{ label: "", value: "" }],
  karat_details: [{ label: "", value: "" }],
};

function slugify(str: string) {
  return str.toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// ── Spec Rows ─────────────────────────────────────────────────────
function SpecRows({ label, value, onChange }: {
  label: string;
  value: SpecRow[];
  onChange: (v: SpecRow[]) => void;
}) {
  return (
    <div>
      <p className="text-[10px] font-sans tracking-wider uppercase text-gray-500 mb-2">{label}</p>
      <div className="space-y-2">
        {value.map((row, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={row.label}
              onChange={(e) => onChange(value.map((r, j) => j === i ? { ...r, label: e.target.value } : r))}
              placeholder="Etiket"
              className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-[#C9A84C]"
            />
            <input
              value={row.value}
              onChange={(e) => onChange(value.map((r, j) => j === i ? { ...r, value: e.target.value } : r))}
              placeholder="Değer"
              className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-[#C9A84C]"
            />
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 px-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onChange([...value, { label: "", value: "" }])} className="mt-2 text-xs font-sans text-[#C9A84C] hover:underline">
        + Satır ekle
      </button>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────
export default function ProductFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;
  const isNew = id === "yeni";

  const [form, setForm] = useState<ProductForm>(empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const set = (key: keyof ProductForm, val: unknown) =>
    setForm((f) => ({ ...f, [key]: val }));

  const load = useCallback(async () => {
    if (isNew) { setLoaded(true); return; }
    const res = await fetch("/api/admin/products");
    if (res.ok) {
      const products = await res.json();
      const p = products.find((x: { id: string }) => x.id === id);
      if (p) {
        setForm({
          name: p.name ?? "",
          slug: p.slug ?? "",
          category: p.category ?? "Kolyeler",
          category_slug: p.category_slug ?? "kolyeler",
          sku: p.sku ?? "",
          price: String(p.price ?? ""),
          original_price: String(p.original_price ?? ""),
          short_description: p.short_description ?? "",
          description: p.description ?? "",
          stock_count: String(p.stock_count ?? 0),
          is_published: p.is_published ?? true,
          is_new: p.is_new ?? false,
          is_exclusive: p.is_exclusive ?? false,
          is_mothers_day: p.is_mothers_day ?? false,
          limited_pieces: String(p.limited_pieces ?? ""),
          materials: (p.materials ?? []).join(", "),
          tags: (p.tags ?? []).join(", "),
          gender: (p.gender ?? ["Kadın"]).join(", "),
          images: p.images?.length ? p.images : [{ src: "", alt: "" }],
          stone_specs: p.stone_specs?.length ? p.stone_specs : [{ label: "", value: "" }],
          certificate_info: p.certificate_info?.length ? p.certificate_info : [{ label: "", value: "" }],
          karat_details: p.karat_details?.length ? p.karat_details : [{ label: "", value: "" }],
        });
      }
    }
    setLoaded(true);
  }, [id, isNew]);

  useEffect(() => { load(); }, [load]);

  // Auto-slug from name (only auto-update when new or slug is still empty)
  const handleNameChange = (name: string) => {
    setForm((f) => ({ ...f, name, slug: (isNew || !f.slug) ? slugify(name) : f.slug }));
  };

  // Auto category_slug + auto bebek tag from category
  const handleCategoryChange = (category: string) => {
    const autoTag = CATEGORY_AUTO_TAGS[category];
    setForm((f) => {
      const tagArr = f.tags.split(",").map((s) => s.trim()).filter((t) => t && !BEBEK_TAGS.includes(t));
      if (autoTag) tagArr.push(autoTag);
      return {
        ...f,
        category,
        category_slug: CATEGORY_SLUG_MAP[category] ?? slugify(category),
        tags: tagArr.join(", "),
      };
    });
  };

  const handleImageUpload = async (idx: number, file: File) => {
    setUploading(true);
    setError("");
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${slugify(form.name || "product")}-${Date.now()}-${idx}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("product-images").upload(path, file, { upsert: true });
      if (uploadErr) throw new Error(uploadErr.message);
      const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(path);
      const newImages = form.images.map((img, i) => i === idx ? { ...img, src: publicUrl } : img);
      set("images", newImages);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yükleme başarısız");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...(!isNew && { id }),
      name: form.name,
      slug: form.slug,
      category: form.category,
      category_slug: form.category_slug,
      sku: form.sku || null,
      price: parseFloat(form.price) || 0,
      original_price: form.original_price ? parseFloat(form.original_price) : null,
      short_description: form.short_description,
      description: form.description,
      stock_count: parseInt(form.stock_count) || 0,
      is_published: form.is_published,
      is_new: form.is_new,
      is_exclusive: form.is_exclusive,
      is_mothers_day: form.is_mothers_day,
      limited_pieces: form.limited_pieces ? parseInt(form.limited_pieces) : null,
      materials: form.materials.split(",").map((s) => s.trim()).filter(Boolean),
      tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
      gender: form.gender.split(",").map((s) => s.trim()).filter(Boolean),
      images: form.images.filter((i) => i.src),
      stone_specs: form.stone_specs.filter((s) => s.label),
      certificate_info: form.certificate_info.filter((s) => s.label),
      karat_details: form.karat_details.filter((s) => s.label),
    };

    const res = await fetch("/api/admin/products", {
      method: isNew ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/urunler");
    } else {
      const data = await res.json();
      setError(data.error ?? "Kayıt başarısız");
      setSaving(false);
    }
  };

  if (!loaded) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
    </div>
  );

  const inputClass = "w-full border border-gray-200 rounded px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-[#C9A84C] transition-colors";
  const labelClass = "block text-[10px] font-sans tracking-wider uppercase text-gray-500 mb-1.5";

  return (
    <form onSubmit={handleSubmit}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-sans tracking-luxury uppercase text-gray-400 mb-1">Ürünler</p>
          <h1 className="text-2xl font-serif font-light text-gray-800">
            {isNew ? "Yeni Ürün Ekle" : `Düzenle: ${form.name}`}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => router.back()} className="px-4 py-2.5 text-sm font-sans text-gray-500 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
            Vazgeç
          </button>
          <button type="submit" disabled={saving || uploading} className="px-6 py-2.5 text-sm font-sans bg-[#C9A84C] text-white rounded hover:bg-[#B8965A] transition-colors disabled:opacity-60">
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-sm font-sans text-red-600">{error}</div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ── Left: Main Info ── */}
        <div className="xl:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="font-sans font-medium text-gray-700 mb-5 text-sm">Temel Bilgiler</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Ürün İsmi *</label>
                  <input required value={form.name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Éclat Pırlanta Bileklik" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Slug (URL) *</label>
                  <input required value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="eclat-pirlanta-bileklik" className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Kategori *</label>
                  <select value={form.category} onChange={(e) => handleCategoryChange(e.target.value)} className={inputClass}>
                    {CATEGORY_GROUPS.map((group) => (
                      <optgroup key={group.group} label={group.group}>
                        {group.categories.map((c) => (
                          <option key={c.label} value={c.label}>{c.label}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Stok Kodu (SKU)</label>
                  <input value={form.sku} onChange={(e) => set("sku", e.target.value)} placeholder="ONR-BLK-001" className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Kısa Açıklama</label>
                <input value={form.short_description} onChange={(e) => set("short_description", e.target.value)} placeholder="18K beyaz altın üzeri tam tur pavé pırlanta kadın bileklik." className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Açıklama</label>
                <textarea rows={5} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Ürün detay açıklaması..." className={`${inputClass} resize-none`} />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="font-sans font-medium text-gray-700 mb-5 text-sm">Görseller</h2>
            <div className="space-y-4">
              {form.images.map((img, i) => (
                <div key={i} className="flex gap-3 items-start">
                  {/* Preview */}
                  <div className="relative w-14 h-16 bg-gray-100 rounded overflow-hidden shrink-0">
                    {img.src ? (
                      <Image src={img.src} alt={img.alt || "preview"} fill sizes="56px" className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">?</div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <input value={img.src} onChange={(e) => set("images", form.images.map((x, j) => j === i ? { ...x, src: e.target.value } : x))} placeholder="Görsel URL veya yükle" className={`${inputClass} flex-1`} />
                      <label className="shrink-0 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors rounded px-3 py-2.5 text-xs font-sans text-gray-600 flex items-center gap-1.5">
                        {uploading ? "..." : (
                          <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" /></svg>
                            Yükle
                          </>
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(i, f); }} />
                      </label>
                    </div>
                    <input value={img.alt} onChange={(e) => set("images", form.images.map((x, j) => j === i ? { ...x, alt: e.target.value } : x))} placeholder="Alt metin (erişilebilirlik)" className={inputClass} />
                  </div>
                  <button type="button" onClick={() => set("images", form.images.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 pt-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => set("images", [...form.images, { src: "", alt: "" }])} className="text-xs font-sans text-[#C9A84C] hover:underline">
                + Görsel ekle
              </button>
            </div>
          </div>

          {/* Specs */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="font-sans font-medium text-gray-700 mb-5 text-sm">Ürün Özellikleri</h2>
            <div className="space-y-6">
              <SpecRows label="Taş Özellikleri" value={form.stone_specs} onChange={(v) => set("stone_specs", v)} />
              <SpecRows label="Sertifika Bilgileri" value={form.certificate_info} onChange={(v) => set("certificate_info", v)} />
              <SpecRows label="Karat / Metal Detayları" value={form.karat_details} onChange={(v) => set("karat_details", v)} />
            </div>
          </div>
        </div>

        {/* ── Right: Sidebar ── */}
        <div className="space-y-6">
          {/* Pricing */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="font-sans font-medium text-gray-700 mb-5 text-sm">Fiyat ve Stok</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Satış Fiyatı (₺) *</label>
                <input required type="number" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="145000" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Orijinal Fiyat (₺)</label>
                <input type="number" value={form.original_price} onChange={(e) => set("original_price", e.target.value)} placeholder="İndirim öncesi (opsiyonel)" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Stok Adedi</label>
                <input type="number" value={form.stock_count} onChange={(e) => set("stock_count", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Sınırlı Üretim Adedi</label>
                <input type="number" value={form.limited_pieces} onChange={(e) => set("limited_pieces", e.target.value)} placeholder="Boş = sınırsız" className={inputClass} />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="font-sans font-medium text-gray-700 mb-5 text-sm">Yayın Durumu</h2>
            <div className="space-y-3">
              {([
                { key: "is_published", label: "Yayında" },
                { key: "is_new",       label: "Yeni Tasarım" },
                { key: "is_exclusive", label: "Exclusive" },
                { key: "is_mothers_day", label: "Anneler Günü" },
              ] as { key: keyof ProductForm; label: string }[]).map(({ key, label }) => (
                <label key={key} className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-sans text-gray-600">{label}</span>
                  <button
                    type="button"
                    onClick={() => set(key, !form[key])}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${form[key] ? "bg-[#C9A84C]" : "bg-gray-200"}`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${form[key] ? "translate-x-4" : "translate-x-1"}`} />
                  </button>
                </label>
              ))}
            </div>
          </div>

          {/* Meta */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="font-sans font-medium text-gray-700 mb-5 text-sm">Etiketler ve Meta</h2>
            <div className="space-y-5">

              {/* Materials */}
              <div>
                <label className={labelClass}>Malzemeler</label>
                <div className="flex gap-2 flex-wrap mb-2">
                  {["14K Altın","18K Altın","22K Altın","Platin","Rose Altın","Beyaz Altın","Pırlanta","İnci","Renkli Taş"].map((m) => {
                    const arr = form.materials.split(",").map((s) => s.trim()).filter(Boolean);
                    const active = arr.includes(m);
                    return (
                      <button
                        type="button"
                        key={m}
                        onClick={() => {
                          const next = active ? arr.filter((x) => x !== m) : [...arr, m];
                          set("materials", next.join(", "));
                        }}
                        className={`text-[11px] px-2.5 py-1 border rounded transition-colors ${active ? "bg-[#C9A84C] border-[#C9A84C] text-white" : "border-gray-200 text-gray-500 hover:border-[#C9A84C]"}`}
                      >{m}</button>
                    );
                  })}
                </div>
                <input value={form.materials} onChange={(e) => set("materials", e.target.value)} placeholder="Özel malzeme ekle…" className={inputClass} />
              </div>

              {/* Bebek sub-type chips — only when bebek-ozel is selected */}
              {form.category_slug === "bebek-ozel" && (
                <div>
                  <label className={labelClass}>Bebek Alt Kategorisi</label>
                  <div className="flex gap-2 flex-wrap mb-1">
                    {[
                      { label: "Emzik",    value: "emzik" },
                      { label: "Künye",    value: "kunye" },
                      { label: "İğne",     value: "igne" },
                      { label: "Bileklik", value: "bileklik" },
                      { label: "Kolye",    value: "kolye" },
                      { label: "Yüzük",    value: "yuzuk" },
                    ].map(({ label, value }) => {
                      const arr = form.tags.split(",").map((s) => s.trim()).filter(Boolean);
                      const active = arr.includes(value);
                      return (
                        <button
                          type="button"
                          key={value}
                          onClick={() => {
                            const withoutBebek = arr.filter((t) => !BEBEK_TAGS.includes(t));
                            const next = active ? withoutBebek : [...withoutBebek, value];
                            set("tags", next.join(", "));
                          }}
                          className={`text-[11px] px-2.5 py-1 border rounded transition-colors ${
                            active ? "bg-[#C4956A] border-[#C4956A] text-white" : "border-pink-200 text-pink-400 hover:border-[#C4956A]"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-gray-400 mb-3">Ürünün hangi bebek alt sayfasında görüneceğini belirler</p>
                </div>
              )}

              {/* Tags */}
              <div>
                <label className={labelClass}>Etiketler (virgülle)</label>
                <div className="flex gap-2 flex-wrap mb-2">
                  {["pirlanta","altin","inci","yeni","exclusive","anneler-gunu","hediye"].map((t) => {
                    const arr = form.tags.split(",").map((s) => s.trim()).filter(Boolean);
                    const active = arr.includes(t);
                    return (
                      <button
                        type="button"
                        key={t}
                        onClick={() => {
                          const next = active ? arr.filter((x) => x !== t) : [...arr, t];
                          set("tags", next.join(", "));
                        }}
                        className={`text-[11px] px-2.5 py-1 border rounded transition-colors ${active ? "bg-[#C9A84C] border-[#C9A84C] text-white" : "border-gray-200 text-gray-500 hover:border-[#C9A84C]"}`}
                      >{t}</button>
                    );
                  })}
                </div>
                <input value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="Özel etiket ekle…" className={inputClass} />
              </div>

              {/* Renk (stone color) — stored in tags field */}
              <div>
                <label className={labelClass}>Renk / Taş Rengi</label>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { label: "Sarı", value: "sari" },
                    { label: "Beyaz", value: "beyaz" },
                    { label: "Rose", value: "rose" },
                  ].map(({ label, value }) => {
                    const arr = form.tags.split(",").map((s) => s.trim()).filter(Boolean);
                    const active = arr.includes(value);
                    return (
                      <button
                        type="button"
                        key={value}
                        onClick={() => {
                          const next = active ? arr.filter((x) => x !== value) : [...arr, value];
                          set("tags", next.join(", "));
                        }}
                        className={`text-[11px] px-2.5 py-1 border rounded transition-colors ${active ? "bg-[#C9A84C] border-[#C9A84C] text-white" : "border-gray-200 text-gray-500 hover:border-[#C9A84C]"}`}
                      >{label}</button>
                    );
                  })}
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className={labelClass}>Cinsiyet</label>
                <div className="flex gap-3 flex-wrap">
                  {["Kadın", "Erkek", "Unisex"].map((g) => {
                    const arr = form.gender.split(",").map((s) => s.trim()).filter(Boolean);
                    const active = arr.includes(g);
                    return (
                      <button
                        type="button"
                        key={g}
                        onClick={() => {
                          const next = active ? arr.filter((x) => x !== g) : [...arr, g];
                          set("gender", next.join(", "));
                        }}
                        className={`px-4 py-1.5 text-xs font-sans border rounded transition-colors ${active ? "bg-[#C9A84C] border-[#C9A84C] text-white" : "border-gray-200 text-gray-500 hover:border-[#C9A84C]"}`}
                      >{g}</button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
