import { notFound } from "next/navigation";
import { Metadata } from "next";
import CategoryPageClient from "@/components/product/CategoryPageClient";

const VALID_SLUGS = [
  "halkalar",
  "kolyeler",
  "bileklikler",
  "kupeler",
  "inci",
  "setler",
] as const;

const META: Record<string, { title: string; description: string }> = {
  halkalar: {
    title: "Halkalar Koleksiyonu — ONR Mücevherat",
    description:
      "Pırlanta tektaştan ebediyet halkasına, platin ve altın yüzük koleksiyonunu keşfedin.",
  },
  kolyeler: {
    title: "Kolyeler Koleksiyonu — ONR Mücevherat",
    description:
      "İnce solitaire sarkıtlardan tenis kolyelerine, zarafeti boyunuzda taşıyın.",
  },
  bileklikler: {
    title: "Bileklikler Koleksiyonu — ONR Mücevherat",
    description:
      "Platin tenis bileklikten rose gold charm koleksiyonuna her bilek için bir eser.",
  },
  kupeler: {
    title: "Küpeler Koleksiyonu — ONR Mücevherat",
    description:
      "Pırlanta stud küpeden safir hoop tasarımlarına, yüzünüzü ışıkla çerçeveleyecek küpe koleksiyonu.",
  },
  inci: {
    title: "İnci Koleksiyonu — ONR Mücevherat",
    description:
      "Akoya'dan South Sea'ye, doğanın en saf mücevheri. Her inci binlerce yılın hikâyesidir.",
  },
  setler: {
    title: "Mücevher Setleri — ONR Mücevherat",
    description:
      "Düğün setlerinden hediye koleksiyonlarına, mücevherlerin birbiriyle konuştuğu özel setler.",
  },
};

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = META[slug];
  if (!meta) return { title: "Koleksiyonlar — ONR Mücevherat" };
  return { title: meta.title, description: meta.description };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as (typeof VALID_SLUGS)[number])) {
    notFound();
  }
  return <CategoryPageClient slug={slug} />;
}
