import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BebekOzelSubClient from "@/components/pages/BebekOzelSubClient";
import { getBebekOzelSubProductsFromDB } from "@/lib/supabase/products";

export const revalidate = 60;

const VALID_SLUGS = ["emzik", "kunye", "igne", "bileklik", "kolye", "yuzuk"] as const;
type ValidSlug = (typeof VALID_SLUGS)[number];

const META: Record<ValidSlug, { title: string; description: string }> = {
  emzik: {
    title: "Bebek Emzik — Petit Luxury | ONR Mücevherat",
    description: "Altın bebek emzik koleksiyonu. 14-22 ayar altın, hipoalerjenik ve el işçiliği.",
  },
  kunye: {
    title: "Bebek Künye — Petit Luxury | ONR Mücevherat",
    description: "Altın bebek künye koleksiyonu. Özelleştirilebilir isim ve tarih gravürü.",
  },
  igne: {
    title: "Bebek İğne — Petit Luxury | ONR Mücevherat",
    description: "Altın bebek iğnesi koleksiyonu. Nazar ve şans motifleri.",
  },
  bileklik: {
    title: "Bebek Bileklik — Petit Luxury | ONR Mücevherat",
    description: "Altın bebek bilekliği koleksiyonu. Minik bileğe zarif dokunuş.",
  },
  kolye: {
    title: "Bebek Kolye — Petit Luxury | ONR Mücevherat",
    description: "Altın bebek kolye koleksiyonu. İlk mücevher için özel tasarımlar.",
  },
  yuzuk: {
    title: "Bebek Yüzük — Petit Luxury | ONR Mücevherat",
    description: "Altın bebek yüzük koleksiyonu. Minik parmaklara özel.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = META[slug as ValidSlug];
  if (!meta) return { title: "Bebek Özel — ONR Mücevherat" };
  return { title: meta.title, description: meta.description };
}

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export default async function BebekOzelSubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as ValidSlug)) notFound();
  const dbProducts = await getBebekOzelSubProductsFromDB(slug);
  return (
    <BebekOzelSubClient
      slug={slug as ValidSlug}
      initialProducts={dbProducts.length > 0 ? dbProducts : undefined}
    />
  );
}
