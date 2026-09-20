import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/home/HeroSlider";
import CuratedCollections from "@/components/home/CuratedCollections";
import ProductCarousel from "@/components/home/ProductCarousel";
import BrandStory from "@/components/home/BrandStory";
import ExclusiveSection from "@/components/home/ExclusiveSection";
import PageWrapper from "@/components/ui/PageWrapper";
import { getAllPublishedProductsFromDB, getExclusiveProductsFromDB } from "@/lib/supabase/products";
import { products as staticProducts } from "@/lib/products";

export const revalidate = 60;

export default async function HomePage() {
  // Admin'den eklenen ürünler önceliklidir; DB boşsa statik katalog gösterilir.
  const [dbProducts, exclusiveProducts] = await Promise.all([
    getAllPublishedProductsFromDB(),
    getExclusiveProductsFromDB(),
  ]);
  const carouselProducts = (dbProducts.length ? dbProducts : staticProducts).filter(
    (p) => !p.isExclusive
  );

  return (
    <PageWrapper>
      {/* Fixed top navigation */}
      <Navbar />

      <main>
        {/* 1 — Full-screen hero slider */}
        <HeroSlider />

        {/* 2 — Curated collections grid */}
        <CuratedCollections />

        {/* 3 — Mixed product carousel, 6 per view */}
        <ProductCarousel products={carouselProducts} />

        {/* 4 — Brand story / heritage section */}
        <BrandStory />

        {/* 5 — Exclusive / VIP dark gallery */}
        <ExclusiveSection products={exclusiveProducts} />
      </main>

      {/* Global footer */}
      <Footer />
    </PageWrapper>
  );
}
