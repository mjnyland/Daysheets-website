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
      <div className="bg-[#2978D4]  bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.22)_1.2px,transparent_1.2px)] [background-size:22px_22px] [background-position:0_0]">
        <TestimonialsSplide />
        <FeatureSlideshow />
      </div>
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
