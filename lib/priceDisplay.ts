import type { Product } from "@/lib/types";

/**
 * Vitrinde fiyatın gizlenip gizlenmeyeceği — tek kural, tüm sayfalar bunu kullanır.
 *
 * İki durumda fiyat alanı boş bırakılır:
 *  - Ürün tükendi olarak işaretlenmişse,
 *  - Ürün henüz fiyatlanmamışsa (0 ₺). Admin'e yeni eklenen ürünler fiyatı
 *    girilene kadar 0 ile duruyor; yayına alınmışsa "₺0" yazmasın.
 */
export function isPriceHidden(product: Pick<Product, "isSoldOut" | "price">): boolean {
  return Boolean(product.isSoldOut) || !(Number(product.price) > 0);
}
