"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { uploadProductImage } from "@/lib/uploadImage";
import { formatBytes } from "@/lib/imageCompress";

export interface ImageRow {
  src: string;
  alt: string;
}

interface Row extends ImageRow {
  uid: string;
  /** Yükleme sırasında anlık önizleme için blob URL */
  preview?: string;
}

interface UploadState {
  progress: number;
  error?: string;
  note?: string;
}

const MAX_FILE_BYTES = 25 * 1024 * 1024;

let uidCounter = 0;
const newUid = () => `img-${++uidCounter}-${Math.random().toString(36).slice(2, 7)}`;

function toRows(value: ImageRow[]): Row[] {
  return value.map((v) => ({ ...v, uid: newUid() }));
}

const Icon = {
  up: "M18 15l-6-6-6 6",
  down: "M6 9l6 6 6-6",
  close: "M18 6L6 18M6 6l12 12",
};

export default function ImageUploader({
  value,
  onChange,
  namePrefix,
  onBusyChange,
}: {
  value: ImageRow[];
  onChange: (v: ImageRow[]) => void;
  namePrefix: string;
  /** Devam eden yükleme varken true — form kaydını kilitlemek için. */
  onBusyChange?: (busy: boolean) => void;
}) {
  const [rows, setRows] = useState<Row[]>(() => toRows(value));
  const [uploads, setUploads] = useState<Record<string, UploadState>>({});
  const [dragOver, setDragOver] = useState(false);

  const anyBusy = Object.values(uploads).some((u) => u.progress < 100 && !u.error);
  useEffect(() => { onBusyChange?.(anyBusy); }, [anyBusy, onBusyChange]);

  // Parent'a en son gönderdiğimiz hali tutar; dışarıdan gelen gerçek
  // değişiklikle kendi emit'imizi ayırt etmek için.
  const emitted = useRef<string>(JSON.stringify(value));
  const previews = useRef<string[]>([]);
  // Güncel satırlar — sıradaki hali updater dışında hesaplayabilmek için.
  const rowsRef = useRef<Row[]>(rows);
  rowsRef.current = rows;

  // Dışarıdan yeni veri gelirse (ürün yüklendiğinde) satırları tazele.
  useEffect(() => {
    const incoming = JSON.stringify(value);
    if (incoming !== emitted.current) {
      emitted.current = incoming;
      const next = toRows(value);
      rowsRef.current = next;
      setRows(next);
    }
  }, [value]);

  // Blob önizlemelerini bileşen kalkarken serbest bırak.
  useEffect(() => {
    const urls = previews.current;
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  /** Tek giriş noktası: state + ref + parent aynı anda güncellenir. */
  const commit = useCallback(
    (next: Row[]) => {
      rowsRef.current = next;
      setRows(next);
      const plain = next.map(({ src, alt }) => ({ src, alt }));
      emitted.current = JSON.stringify(plain);
      onChange(plain);
    },
    [onChange]
  );

  const patch = useCallback(
    (uid: string, fields: Partial<Row>) => {
      commit(rowsRef.current.map((r) => (r.uid === uid ? { ...r, ...fields } : r)));
    },
    [commit]
  );

  const runUpload = useCallback(
    async (uid: string, file: File) => {
      if (!file.type.startsWith("image/")) {
        setUploads((u) => ({ ...u, [uid]: { progress: 0, error: "Bu bir görsel dosyası değil" } }));
        return;
      }
      if (file.size > MAX_FILE_BYTES) {
        setUploads((u) => ({
          ...u,
          [uid]: { progress: 0, error: `Dosya çok büyük (${formatBytes(file.size)}) — en fazla 25 MB` },
        }));
        return;
      }

      const preview = URL.createObjectURL(file);
      previews.current.push(preview);
      patch(uid, { preview });
      setUploads((u) => ({ ...u, [uid]: { progress: 0 } }));

      try {
        const res = await uploadProductImage(file, namePrefix, (progress) =>
          setUploads((u) => ({ ...u, [uid]: { ...u[uid], progress } }))
        );

        const note = res.skipped
          ? formatBytes(res.compressedSize)
          : `${formatBytes(res.originalSize)} → ${formatBytes(res.compressedSize)} · ${res.width}×${res.height}`;

        setUploads((u) => ({ ...u, [uid]: { progress: 100, note } }));
        patch(uid, { src: res.publicUrl });
      } catch (e) {
        setUploads((u) => ({
          ...u,
          [uid]: { progress: 0, error: e instanceof Error ? e.message : "Yükleme başarısız" },
        }));
      }
    },
    [namePrefix, patch]
  );

  /** Dosyaları yeni satır olarak ekler ve hepsini paralel yükler. */
  const addFiles = useCallback(
    (files: File[]) => {
      if (!files.length) return;
      const prev = rowsRef.current;
      // Tek boş satır varsa onu kullanma, yerine yeni satırlarla değiştir.
      const base = prev.length === 1 && !prev[0].src && !prev[0].alt ? [] : prev;
      const fresh = files.map(() => ({ uid: newUid(), src: "", alt: "" }));

      commit([...base, ...fresh]);
      // Yükleme commit'ten SONRA başlar; önizleme yaması güncel satırlara işlensin.
      fresh.forEach((row, i) => runUpload(row.uid, files[i]));
    },
    [commit, runUpload]
  );

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= rows.length) return;
    const next = [...rows];
    [next[index], next[target]] = [next[target], next[index]];
    commit(next);
  };

  const remove = (uid: string) => {
    commit(rows.filter((r) => r.uid !== uid));
    setUploads((u) => {
      const { [uid]: _removed, ...rest } = u;
      return rest;
    });
  };

  const inputClass =
    "w-full border border-gray-200 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:border-[#C9A84C] transition-colors";

  return (
    <div className="space-y-3">
      {rows.map((row, i) => {
        const state = uploads[row.uid];
        const busy = state && state.progress < 100 && !state.error;
        const thumb = row.preview || row.src;

        return (
          <div
            key={row.uid}
            className="flex gap-3 items-start p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            {/* Sıralama */}
            <div className="flex flex-col gap-0.5 pt-1 shrink-0">
              {([-1, 1] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => move(i, dir)}
                  disabled={dir === -1 ? i === 0 : i === rows.length - 1}
                  className="text-gray-300 hover:text-[#C9A84C] disabled:opacity-25 disabled:hover:text-gray-300 transition-colors"
                  title={dir === -1 ? "Yukarı taşı" : "Aşağı taşı"}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={dir === -1 ? Icon.up : Icon.down} />
                  </svg>
                </button>
              ))}
            </div>

            {/* Önizleme */}
            <div className="relative w-14 h-16 bg-gray-100 rounded overflow-hidden shrink-0">
              {thumb ? (
                row.preview ? (
                  // Blob önizleme — optimizer'dan geçemez
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={row.preview} alt={row.alt || "önizleme"} className="w-full h-full object-cover" />
                ) : (
                  <Image src={row.src} alt={row.alt || "önizleme"} fill sizes="56px" className="object-cover" />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}
              {i === 0 && (
                <span className="absolute bottom-0 inset-x-0 bg-[#C9A84C] text-white text-[8px] text-center tracking-wider uppercase py-0.5">
                  Kapak
                </span>
              )}
              {busy && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-[10px] font-sans font-medium">{state.progress}%</span>
                </div>
              )}
            </div>

            {/* Alanlar */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex gap-2">
                <input
                  value={row.src}
                  onChange={(e) => patch(row.uid, { src: e.target.value, preview: undefined })}
                  placeholder="Görsel URL veya yükle"
                  className={`${inputClass} flex-1`}
                />
                <label className="shrink-0 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors rounded px-3 py-2 text-xs font-sans text-gray-600 flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 16 12 12 8 16" />
                    <line x1="12" y1="12" x2="12" y2="21" />
                    <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
                  </svg>
                  {row.src ? "Değiştir" : "Yükle"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) runUpload(row.uid, f);
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>

              <input
                value={row.alt}
                onChange={(e) => patch(row.uid, { alt: e.target.value })}
                placeholder="Alt metin (erişilebilirlik ve SEO)"
                className={inputClass}
              />

              {busy && (
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C9A84C] transition-all duration-200"
                    style={{ width: `${state.progress}%` }}
                  />
                </div>
              )}
              {state?.error && <p className="text-[11px] font-sans text-red-500">{state.error}</p>}
              {state?.note && !state.error && (
                <p className="text-[11px] font-sans text-green-600">Sıkıştırıldı · {state.note}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => remove(row.uid)}
              className="text-red-400 hover:text-red-600 pt-1.5 shrink-0"
              title="Görseli kaldır"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d={Icon.close} />
              </svg>
            </button>
          </div>
        );
      })}

      {/* Sürükle-bırak alanı */}
      <label
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/")));
        }}
        className={`block cursor-pointer rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors ${
          dragOver ? "border-[#C9A84C] bg-[#C9A84C]/5" : "border-gray-200 hover:border-[#C9A84C]/50"
        }`}
      >
        <p className="text-sm font-sans text-gray-600">
          Görselleri buraya sürükleyin <span className="text-gray-400">veya</span>{" "}
          <span className="text-[#C9A84C]">dosya seçin</span>
        </p>
        <p className="text-[11px] font-sans text-gray-400 mt-1">
          Birden fazla seçebilirsiniz · yüklemeden önce otomatik WebP&apos;ye sıkıştırılır
        </p>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            addFiles(Array.from(e.target.files ?? []));
            e.target.value = "";
          }}
        />
      </label>
    </div>
  );
}
