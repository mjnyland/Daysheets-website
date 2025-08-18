import { Hero } from "@/components/Hero";
import TestimonialsSplide from "@/components/testimonials-splide";
import { FeatureSlideshow } from "@/components/FeatureSlideshow";
import { VisibilityOptions } from "@/components/VisibilityOptions";
import { FlightGrid } from "@/components/FlightGrid";
import { MobileEditingCarousel } from "@/components/MobileEditingCarousel";
import PhoneScrollSection from "@/components/PhoneScrollSection";
import { TravelSection } from "@/components/TravelSection";
import { SimpleStickySection } from "@/components/SimpleStickySection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-dvh ">
      <Hero />
      <TestimonialsSplide />
      <FeatureSlideshow />
      <FlightGrid />
      <VisibilityOptions />
      <PhoneScrollSection />
      <MobileEditingCarousel />
      <TravelSection />
      <SimpleStickySection />
      <CtaSection />
      <Footer />
    </main>
  );
}
