"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_TIERS, goldRatio, type GoldSettings, type MilyemTier } from "@/lib/goldPricing";

interface LiveQuote { price: number; source: string; }

interface GoldResponse {
  settings: GoldSettings;
  live: LiveQuote | null;
  milyemProductCount: number;
}

const numberInput =
  "w-full border border-gray-200 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-[#C9A84C] transition-colors";
const labelClass = "block text-[10px] font-sans tracking-wider uppercase text-gray-500 mb-1.5";

function tl(value: number) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
}

export default function AltinFiyatPage() {
  const [settings, setSettings] = useState<GoldSettings | null>(null);
  const [live, setLive] = useState<LiveQuote | null>(null);
  const [productCount, setProductCount] = useState(0);
  const [tiers, setTiers] = useState<MilyemTier[]>(DEFAULT_TIERS);
  const [baseGram, setBaseGram] = useState("");
  const [currentGram, setCurrentGram] = useState("");
  const [autoUpdate, setAutoUpdate] = useState(true);

  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<"" | "save" | "sync">("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const hydrate = useCallback((data: GoldResponse) => {
    setSettings(data.settings);
    setLive(data.live);
    setProductCount(data.milyemProductCount);
    setTiers(data.settings.tiers);
    setBaseGram(String(data.settings.baseGramPrice));
    setCurrentGram(String(data.settings.currentGramPrice));
    setAutoUpdate(data.settings.autoUpdate);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/gold");
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Ayarlar yüklenemedi");
      else hydrate(data as GoldResponse);
    } catch {
      setError("Ayarlar yüklenemedi");
    }
    setLoading(false);
  }, [hydrate]);

  useEffect(() => { load(); }, [load]);

  const parsed = {
    base: parseFloat(baseGram.replace(",", ".")),
    current: parseFloat(currentGram.replace(",", ".")),
  };
  const ratio = goldRatio({ baseGramPrice: parsed.base, currentGramPrice: parsed.current });
  const changePct = (ratio - 1) * 100;

  const save = async () => {
    setBusy("save"); setError(""); setNotice("");
    try {
      const res = await fetch("/api/admin/gold", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tiers,
          baseGramPrice: parsed.base,
          currentGramPrice: parsed.current,
          autoUpdate,
        }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Kaydedilemedi");
      else {
        setSettings(data.settings);
        setNotice(`Kaydedildi — ${data.updated} ürünün fiyatı güncellendi.`);
      }
    } catch {
      setError("Kaydedilemedi");
    }
    setBusy("");
  };

  const syncNow = async () => {
    setBusy("sync"); setError(""); setNotice("");
    try {
      const res = await fetch("/api/admin/gold", { method: "POST" });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Güncellenemedi");
      else {
        setSettings(data.settings);
        setCurrentGram(String(data.settings.currentGramPrice));
        setLive(data.quote);
        setNotice(
          `Gram altın ${tl(data.quote.price)} ₺ olarak alındı — ${data.updated} ürünün fiyatı güncellendi.`
        );
      }
    } catch {
      setError("Güncellenemedi");
    }
    setBusy("");
  };

  const updateTier = (index: number, key: keyof MilyemTier, value: string) => {
    const num = parseFloat(value.replace(",", "."));
    setTiers((prev) => prev.map((t, i) => (i === index ? { ...t, [key]: Number.isNaN(num) ? 0 : num } : t)));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-sans tracking-luxury uppercase text-gray-400 mb-1">Yönetim</p>
          <h1 className="text-2xl font-serif font-light text-gray-800">Altın Fiyatı</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={syncNow}
            disabled={busy !== "" || !settings}
            className="px-5 py-2.5 text-sm font-sans border border-[#C9A84C] text-[#C9A84C] rounded hover:bg-[#C9A84C]/10 transition-colors disabled:opacity-50"
          >
            {busy === "sync" ? "Güncelleniyor..." : "Şimdi güncelle"}
          </button>
          <button
            onClick={save}
            disabled={busy !== "" || !settings}
            className="px-6 py-2.5 text-sm font-sans bg-[#C9A84C] text-white rounded hover:bg-[#B8965A] transition-colors disabled:opacity-50"
          >
            {busy === "save" ? "Kaydediliyor..." : "Kaydet ve fiyatları yenile"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-sm font-sans text-red-600">{error}</div>
      )}
      {notice && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded text-sm font-sans text-green-700">{notice}</div>
      )}

      {!settings ? (
        <div className="bg-white rounded-lg p-8 text-sm font-sans text-gray-500 leading-relaxed">
          Altın fiyat ayarları henüz oluşturulmamış. Depodaki{" "}
          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">supabase/gold-pricing-migration.sql</code>{" "}
          dosyasını Supabase Dashboard → SQL Editor&apos;de çalıştırın, sonra bu sayfayı yenileyin.
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* ── Sol: Çarpan tablosu ── */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-baseline justify-between mb-5">
                <h2 className="font-sans font-medium text-gray-700 text-sm">Milyem Çarpan Tablosu</h2>
                <p className="text-[11px] font-sans text-gray-400">
                  Ara değerler bir üst basamağa yuvarlanır
                </p>
              </div>

              <table className="w-full text-sm font-sans">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["Milyem (üst sınır)", "Gram başı çarpan (₺)", "Gram altın farkıyla", ""].map((h) => (
                      <th key={h} className="text-left pb-2 text-[10px] tracking-wider uppercase text-gray-400 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tiers.map((tier, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="py-2 pr-3 w-40">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={tier.milyem}
                          onChange={(e) => updateTier(i, "milyem", e.target.value)}
                          className={numberInput}
                        />
                      </td>
                      <td className="py-2 pr-3 w-48">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={tier.rate}
                          onChange={(e) => updateTier(i, "rate", e.target.value)}
                          className={numberInput}
                        />
                      </td>
                      <td className="py-2 pr-3 text-gray-500 whitespace-nowrap">
                        {tl(Math.round(tier.rate * ratio * 100) / 100)} ₺
                      </td>
                      <td className="py-2 text-right">
                        <button
                          type="button"
                          onClick={() => setTiers((prev) => prev.filter((_, j) => j !== i))}
                          className="text-red-400 hover:text-red-600 px-2"
                          title="Sil"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                type="button"
                onClick={() => setTiers((prev) => [...prev, { milyem: 0, rate: 0 }])}
                className="mt-3 text-xs font-sans text-[#C9A84C] hover:underline"
              >
                + Basamak ekle
              </button>

              <p className="text-[11px] font-sans text-gray-400 mt-4 leading-relaxed">
                Örnek: 5 gram, 130 milyem bir ürün →{" "}
                <strong className="text-gray-600">
                  5 × {tl(tiers[0]?.rate ?? 0)} ₺ = {tl(Math.round(5 * (tiers[0]?.rate ?? 0) * ratio))} ₺
                </strong>
                . Tablonun üstüne taşan milyem değerleri en yüksek basamaktan fiyatlanır.
              </p>
            </div>
          </div>

          {/* ── Sağ: Gram altın ── */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h2 className="font-sans font-medium text-gray-700 mb-5 text-sm">Gram Altın</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Güncel gram altın (₺)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={currentGram}
                    onChange={(e) => setCurrentGram(e.target.value)}
                    className={numberInput}
                  />
                  {live && (
                    <button
                      type="button"
                      onClick={() => setCurrentGram(String(live.price))}
                      className="mt-1.5 text-[11px] font-sans text-[#C9A84C] hover:underline"
                    >
                      Piyasa: {tl(live.price)} ₺ — bu değeri kullan
                    </button>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Baz gram altın (₺)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={baseGram}
                    onChange={(e) => setBaseGram(e.target.value)}
                    className={numberInput}
                  />
                  <p className="text-[10px] font-sans text-gray-400 mt-1.5 leading-relaxed">
                    Yukarıdaki çarpanların yazıldığı andaki gram altın. Çarpanları
                    bugünün fiyatına göre yeniden yazdıysanız bunu güncel değere eşitleyin.
                  </p>
                  <button
                    type="button"
                    onClick={() => setBaseGram(currentGram)}
                    className="mt-1.5 text-[11px] font-sans text-[#C9A84C] hover:underline"
                  >
                    Güncel fiyata sabitle
                  </button>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-[10px] font-sans tracking-wider uppercase text-gray-500 mb-1">
                    Çarpanlara uygulanan oran
                  </p>
                  <p className={`text-xl font-serif font-light ${changePct >= 0 ? "text-green-600" : "text-red-500"}`}>
                    {changePct >= 0 ? "+" : ""}{changePct.toFixed(2)}%
                  </p>
                  <p className="text-[11px] font-sans text-gray-400 mt-1">
                    {productCount} altın ürün bu orandan fiyatlanıyor
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h2 className="font-sans font-medium text-gray-700 mb-5 text-sm">Otomatik Güncelleme</h2>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-sans text-gray-600">Gram altını otomatik çek</span>
                <button
                  type="button"
                  onClick={() => setAutoUpdate((v) => !v)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${autoUpdate ? "bg-[#C9A84C]" : "bg-gray-200"}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${autoUpdate ? "translate-x-4" : "translate-x-1"}`} />
                </button>
              </label>
              <p className="text-[10px] font-sans text-gray-400 mt-2 leading-relaxed">
                Kapalıyken zamanlanmış görev fiyatlara dokunmaz; &quot;Şimdi güncelle&quot;
                butonu yine de çalışır.
              </p>
              <div className="border-t border-gray-100 mt-4 pt-4 space-y-1">
                <p className="text-[11px] font-sans text-gray-400">
                  Son senkron:{" "}
                  {settings.lastSyncedAt
                    ? new Date(settings.lastSyncedAt).toLocaleString("tr-TR")
                    : "—"}
                </p>
                <p className="text-[11px] font-sans text-gray-400">
                  Kaynak: {settings.lastSource ?? "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
