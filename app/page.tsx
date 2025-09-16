"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Hero } from "@/components/Hero";
import TestimonialsSplide from "@/components/testimonials-splide";
import { FeatureSlideshow } from "@/components/FeatureSlideshow";
import { VisibilityOptions } from "@/components/VisibilityOptions";
import { FlightGrid } from "@/components/FlightGrid";
import { MobileEditingCarousel } from "@/components/MobileEditingCarousel";
import AppDownloadSection from "@/components/AppDownloadSection";
import { TravelSection } from "@/components/TravelSection";
import { SimpleStickySection } from "@/components/SimpleStickySection";
import StickyPhoneSection from "@/components/StickyPhoneSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import ParallaxMobileEdit from "@/components/ParallaxMobileEdit";
import MaskedPhoneMocks from "@/components/MaskedPhoneMocks";

export default function Home() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize a new Lenis instance for smooth scrolling
    const lenis = new Lenis();

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);
  });

  return (
    <main className="overflow-x-hidden">
      <Hero />
      <div className="bg-[#166CD1] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.22)_1.2px,transparent_1.2px)] [background-size:22px_22px] [background-position:0_0]">
        <TestimonialsSplide />
        <FeatureSlideshow />
      </div>
      <FlightGrid />
      <VisibilityOptions />
      <StickyPhoneSection />
      <MaskedPhoneMocks />
      <AppDownloadSection />
      <TravelSection />
      <SimpleStickySection />
      <CtaSection />
      <Footer />
    </main>
  );
}
