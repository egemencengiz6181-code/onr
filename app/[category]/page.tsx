import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

// Map old flat-category slugs → consolidated /koleksiyonlar/[slug] route
const REDIRECT_MAP: Record<string, string> = {
  yuzuk: "/koleksiyonlar/halkalar",
  kolye: "/koleksiyonlar/kolyeler",
  kupe: "/koleksiyonlar/kupeler",
  bileklik: "/koleksiyonlar/bileklikler",
  setler: "/koleksiyonlar/setler",
  inci: "/koleksiyonlar/inci",
  markalar: "/koleksiyonlar",
};

export function generateStaticParams() {
  return Object.keys(REDIRECT_MAP).map((category) => ({ category }));
}

export default async function CategoryRedirectPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const destination = REDIRECT_MAP[category];
  if (!destination) notFound();
  redirect(destination);
}

