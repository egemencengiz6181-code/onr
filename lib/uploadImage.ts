import { createClient } from "@/lib/supabase/client";
import { compressImage, type CompressResult } from "@/lib/imageCompress";

export const PRODUCT_BUCKET = "product-images";

/** Dosya adları benzersiz (slug + timestamp), o yüzden 1 yıl cache güvenli.
 *  Supabase varsayılanı 3600 (1 saat) — CDN'i boşuna tekrar tekrar yordurur. */
const CACHE_CONTROL = "31536000";

export interface UploadResult extends CompressResult {
  publicUrl: string;
  path: string;
}

function extFor(file: File) {
  const fromName = file.name.split(".").pop();
  if (file.type === "image/webp") return "webp";
  if (fromName && fromName.length <= 5) return fromName.toLowerCase();
  return "jpg";
}

/**
 * Supabase Storage'a XHR ile yükler — fetch'ten farkı, gerçek yükleme
 * yüzdesini raporlayabilmesi. Gövde formatı supabase-js'in kendi
 * uploadOrUpdate'i ile birebir aynı (FormData + cacheControl + '' alanı).
 */
function putWithProgress(
  url: string,
  file: File,
  headers: Record<string, string>,
  onProgress?: (percent: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const body = new FormData();
    body.append("cacheControl", CACHE_CONTROL);
    body.append("", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    for (const [k, v] of Object.entries(headers)) xhr.setRequestHeader(k, v);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) return resolve();
      let message = `Yükleme başarısız (HTTP ${xhr.status})`;
      try {
        const parsed = JSON.parse(xhr.responseText);
        if (parsed?.message) message = parsed.message;
      } catch {
        /* gövde JSON değilse varsayılan mesaj kalsın */
      }
      reject(new Error(message));
    };
    xhr.onerror = () => reject(new Error("Ağ hatası — bağlantınızı kontrol edin"));
    xhr.onabort = () => reject(new Error("Yükleme iptal edildi"));

    xhr.send(body);
  });
}

/**
 * Ürün görseli yükler: önce tarayıcıda sıkıştırır, sonra Storage'a atar.
 * onProgress 0-100 arası ilerleme verir.
 */
export async function uploadProductImage(
  file: File,
  namePrefix: string,
  onProgress?: (percent: number) => void
): Promise<UploadResult> {
  const supabase = createClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Oturum bulunamadı — tekrar giriş yapın");

  // Sıkıştırma ana thread'i kısa süre meşgul eder; ilerlemeyi 0'da tutuyoruz.
  onProgress?.(0);
  const compressed = await compressImage(file);

  const path = `${namePrefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extFor(compressed.file)}`;
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/${PRODUCT_BUCKET}/${path}`;

  await putWithProgress(
    url,
    compressed.file,
    {
      authorization: `Bearer ${session.access_token}`,
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      "x-upsert": "true",
    },
    onProgress
  );

  const { data: { publicUrl } } = supabase.storage.from(PRODUCT_BUCKET).getPublicUrl(path);

  return { ...compressed, publicUrl, path };
}
