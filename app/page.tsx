"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Hero } from "@/components/Hero";
import TestimonialsSplide from "@/components/testimonials-splide";
import { FeatureSlideshow } from "@/components/FeatureSlideshow";
import { VisibilityOptions } from "@/components/VisibilityOptions";
import { FlightGrid } from "@/components/FlightGrid";
import { MobileEditingCarousel } from "@/components/MobileEditingCarousel";
import PhoneScrollSection from "@/components/PhoneScrollSection";
import AppDownloadSection from "@/components/AppDownloadSection";
import { TravelSection } from "@/components/TravelSection";
import { SimpleStickySection } from "@/components/SimpleStickySection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's lag smoothing to prevent jumps
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <main className="min-h-dvh">
      <Hero />
      <div className="bg-[#166CD1]  bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.22)_1.2px,transparent_1.2px)] [background-size:22px_22px] [background-position:0_0]">
        <TestimonialsSplide />
        <FeatureSlideshow />
      </div>
      <FlightGrid />
      <VisibilityOptions />
      <AppDownloadSection />
      <PhoneScrollSection />
      <MobileEditingCarousel />
      <TravelSection />
      <SimpleStickySection />
      <CtaSection />
      <Footer />
    </main>
  );
}
