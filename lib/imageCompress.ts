// Tarayıcıda görsel sıkıştırma — yükleme öncesi boyutu küçültür.
// 8MB'lık bir ürün fotoğrafı ~250KB WebP'ye iner, yükleme ~30x hızlanır.

export interface CompressResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  width: number;
  height: number;
  skipped: boolean;
}

export interface CompressOptions {
  /** Uzun kenar için üst sınır (px). Ürün detayda zoom için 2000 yeterli. */
  maxEdge?: number;
  /** WebP kalitesi (0-1). 0.82 mücevher fotoğrafında gözle farkedilmez. */
  quality?: number;
  /** Bu boyutun altındaki dosyalara dokunma (byte). */
  skipUnder?: number;
}

const DEFAULTS: Required<CompressOptions> = {
  maxEdge: 2000,
  quality: 0.82,
  skipUnder: 150 * 1024,
};

/** Sıkıştırılamayan / sıkıştırılmaması gereken tipler. */
const PASSTHROUGH = new Set(["image/svg+xml", "image/gif", "image/avif"]);

function replaceExt(name: string, ext: string) {
  return name.replace(/\.[^.]+$/, "") + ext;
}

function canvasToBlob(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  type: string,
  quality: number
): Promise<Blob | null> {
  if ("convertToBlob" in canvas) {
    return canvas.convertToBlob({ type, quality }).catch(() => null);
  }
  return new Promise((resolve) =>
    (canvas as HTMLCanvasElement).toBlob(resolve, type, quality)
  );
}

/**
 * Görseli yeniden boyutlandırıp WebP'ye çevirir.
 * Sıkıştırma bir şekilde başarısız olursa veya sonuç orijinalden büyük çıkarsa
 * orijinal dosyayı olduğu gibi döndürür — yükleme asla bu yüzden kırılmaz.
 */
export async function compressImage(
  file: File,
  options: CompressOptions = {}
): Promise<CompressResult> {
  const { maxEdge, quality, skipUnder } = { ...DEFAULTS, ...options };

  const untouched: CompressResult = {
    file,
    originalSize: file.size,
    compressedSize: file.size,
    width: 0,
    height: 0,
    skipped: true,
  };

  if (PASSTHROUGH.has(file.type)) return untouched;
  if (!file.type.startsWith("image/")) return untouched;
  if (file.size < skipUnder) return untouched;

  let bitmap: ImageBitmap;
  try {
    // imageOrientation: telefon fotoğraflarındaki EXIF dönüşünü uygular,
    // yoksa yatay çekilmiş görseller yan yatmış kaydedilir.
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    return untouched;
  }

  try {
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas: HTMLCanvasElement | OffscreenCanvas =
      typeof OffscreenCanvas !== "undefined"
        ? new OffscreenCanvas(width, height)
        : Object.assign(document.createElement("canvas"), { width, height });

    const ctx = canvas.getContext("2d") as
      | CanvasRenderingContext2D
      | OffscreenCanvasRenderingContext2D
      | null;
    if (!ctx) return untouched;

    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, 0, 0, width, height);

    const blob = await canvasToBlob(canvas, "image/webp", quality);
    // WebP kodlama yoksa veya sıkıştırma işe yaramadıysa orijinali koru.
    if (!blob || blob.size >= file.size) return untouched;

    return {
      file: new File([blob], replaceExt(file.name, ".webp"), {
        type: "image/webp",
        lastModified: file.lastModified,
      }),
      originalSize: file.size,
      compressedSize: blob.size,
      width,
      height,
      skipped: false,
    };
  } catch {
    return untouched;
  } finally {
    bitmap.close();
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
