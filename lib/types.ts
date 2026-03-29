// ─── Product Types ───────────────────────────────────────────────
export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  priceFormatted: string;
  shortDescription: string;
  description: string;
  images: ProductImage[];
  // Accordion data
  stoneSpecs: ProductSpec[];
  certificateInfo: ProductSpec[];
  karatDetails: ProductSpec[];
  materials: string[];
  tags?: string[];
  gender?: string[];
  isExclusive?: boolean;
  isNew?: boolean;
  limitedPieces?: number;
}

// ─── Cart Types ───────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
}
