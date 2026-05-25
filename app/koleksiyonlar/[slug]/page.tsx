import { notFound } from "next/navigation";
import { Metadata } from "next";
import CategoryPageClient from "@/components/product/CategoryPageClient";
import { getProductsFromDB } from "@/lib/supabase/products";

const BASE_URL = "https://www.onrmucevherat.com";

// Revalidate every 60 seconds so admin changes reflect quickly
export const revalidate = 60;

const VALID_SLUGS = [
  "halkalar",
  "kolyeler",
  "bileklikler",
  "kupeler",
  "inci",
  "setler",
] as const;

const META: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  halkalar: {
    title: "Pırlanta & Altın Yüzükler Koleksiyonu",
    description:
      "Pırlanta tektaştan ebediyet halkasına, platin ve altın yüzük koleksiyonunu keşfedin. Nişan yüzüğü, evlilik yüzüğü ve özel tasarım halkalar.",
    keywords: [
      "pırlanta yüzük",
      "altın yüzük",
      "nişan yüzüğü",
      "pırlanta tektaş",
      "ebediyet halkası",
      "platin yüzük",
      "ONR yüzük koleksiyonu",
      "Ankara pırlanta yüzük",
    ],
  },
  kolyeler: {
    title: "Altın & Pırlanta Kolye Koleksiyonu",
    description:
      "İnce solitaire sarkıtlardan tenis kolyelerine, zarafeti boyunuzda taşıyın. 18K altın ve pırlanta kolye modelleri.",
    keywords: [
      "altın kolye",
      "pırlanta kolye",
      "tenis kolye",
      "solitaire kolye",
      "18K altın kolye",
      "lüks kolye",
      "ONR kolye koleksiyonu",
      "Ankara altın kolye",
    ],
  },
  bileklikler: {
    title: "Pırlanta & Altın Bilezik Koleksiyonu",
    description:
      "Platin tenis bileziğinden rose gold charm koleksiyonuna her bilek için bir eser. 18K altın ve pırlanta bilezik modelleri.",
    keywords: [
      "altın bilezik",
      "pırlanta bilezik",
      "tenis bilezik",
      "rose gold bilezik",
      "18K altın bilezik",
      "lüks bilezik",
      "ONR bilezik koleksiyonu",
      "Ankara altın bilezik",
    ],
  },
  kupeler: {
    title: "Pırlanta & Altın Küpe Koleksiyonu",
    description:
      "Pırlanta stud küpeden safir hoop tasarımlarına, yüzünüzü ışıkla çerçeveleyecek küpe koleksiyonu. 18K altın küpe modelleri.",
    keywords: [
      "pırlanta küpe",
      "altın küpe",
      "stud küpe",
      "hoop küpe",
      "18K altın küpe",
      "lüks küpe",
      "ONR küpe koleksiyonu",
      "Ankara altın küpe",
    ],
  },
  inci: {
    title: "İnci Koleksiyonu — Akoya & South Sea",
    description:
      "Akoya'dan South Sea'ye, doğanın en saf mücevheri. Doğal inci kolye, küpe ve bilezik koleksiyonu.",
    keywords: [
      "inci kolye",
      "inci küpe",
      "inci bilezik",
      "Akoya inci",
      "South Sea inci",
      "doğal inci",
      "lüks inci mücevher",
      "ONR inci koleksiyonu",
    ],
  },
  setler: {
    title: "Lüks Mücevher Setleri & Hediye Koleksiyonu",
    description:
      "Düğün setlerinden hediye koleksiyonlarına, mücevherlerin birbiriyle konuştuğu özel setler. Pırlanta ve altın mücevher seti modelleri.",
    keywords: [
      "mücevher seti",
      "düğün seti",
      "pırlanta set",
      "altın set",
      "hediye mücevher seti",
      "lüks mücevher seti",
      "ONR set koleksiyonu",
      "özel tasarım set",
    ],
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

  const canonicalUrl = `${BASE_URL}/koleksiyonlar/${slug}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: [...meta.keywords, "ONR Mücevherat", "lüks mücevher", "Ankara mücevher"],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${meta.title} | ONR Mücevherat`,
      description: meta.description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: "/images/mucevher/mucevher.jpg",
          width: 1200,
          height: 630,
          alt: `${meta.title} — ONR Mücevherat`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.title} | ONR Mücevherat`,
      description: meta.description,
      images: ["/images/mucevher/mucevher.jpg"],
    },
  };
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

  // Fetch from Supabase — falls back to static in CategoryPageClient if empty
  const dbProducts = await getProductsFromDB(slug);

  const meta = META[slug];
  const categoryName = meta?.title.split("—")[0].trim() ?? slug;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Koleksiyonlar",
        item: `${BASE_URL}/koleksiyonlar`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: `${BASE_URL}/koleksiyonlar/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CategoryPageClient
        slug={slug}
        initialProducts={dbProducts.length > 0 ? dbProducts : undefined}
      />
    </>
  );
}

