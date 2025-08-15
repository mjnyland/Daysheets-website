import { Section } from "@/components/containers/Section";
import { Grid } from "@/components/containers/Grid";
import { Hero } from "@/components/Hero";
import TestimonialsSplide from "@/components/testimonials-splide";
import { FeatureSlideshow } from "@/components/FeatureSlideshow";
import { VisibilityOptions } from "@/components/VisibilityOptions";
import { FlightGrid } from "@/components/FlightGrid";
import { MobileEditingCarousel } from "@/components/MobileEditingCarousel";
import PhoneScrollSection from "@/components/PhoneScrollSection";

export default function Home() {
  return (
    <main className="min-h-dvh">
      <Hero />
      <TestimonialsSplide />
      <FeatureSlideshow />
      <PhoneScrollSection />
      <FlightGrid />
      <VisibilityOptions />
      <MobileEditingCarousel />
    </main>
  );
}
