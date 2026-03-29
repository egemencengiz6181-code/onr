import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/home/HeroSlider";
import CuratedCollections from "@/components/home/CuratedCollections";
import BrandStory from "@/components/home/BrandStory";
import ExclusiveSection from "@/components/home/ExclusiveSection";
import PageWrapper from "@/components/ui/PageWrapper";

export default function HomePage() {
  return (
    <PageWrapper>
      {/* Fixed top navigation */}
      <Navbar />

      <main>
        {/* 1 — Full-screen hero slider */}
        <HeroSlider />

        {/* 2 — Curated collections grid */}
        <CuratedCollections />

        {/* 3 — Brand story / heritage section */}
        <BrandStory />

        {/* 4 — Exclusive / VIP dark gallery */}
        <ExclusiveSection />
      </main>

      {/* Global footer */}
      <Footer />
    </PageWrapper>
  );
}
