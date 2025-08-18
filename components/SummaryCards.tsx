"use client";

import { useEffect, useRef } from "react";
import { Section } from "./containers/Section";
import { Container } from "./containers/Container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger directly
gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Portfolio overview",
    description: "Track your entire portfolio in one place.",
    video: "/assets/portfolio-video.mp4",
  },
  {
    title: "Hardware wallet support",
    description: "Keeps funds safe on your Ledger / Trezor.",
    video: "/assets/hardware-video.mp4",
  },
  {
    title: "Malicious address alerts",
    description: "We flag malicious and suspicious addresses for you.",
    video: "/assets/alerts-video.mp4",
  },
  {
    title: "No IP tracking",
    description: "We do not record any user IP addresses.",
    video: "/assets/privacy-video.mp4",
  },
];

export function SummaryCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null); // Dedicated trigger element
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const headline = headlineRef.current;

    if (!section || !container || !headline) return;

    // Debug positioning
    console.log("Section offsetTop:", section.offsetTop);
    console.log("Section getBoundingClientRect:", section.getBoundingClientRect());
    console.log("Document scrollTop:", document.documentElement.scrollTop);
    console.log("Window pageYOffset:", window.pageYOffset);

    // Force ScrollTrigger to recalculate everything
    ScrollTrigger.refresh();

    setTimeout(() => {
      console.log("After timeout - Section offsetTop:", section.offsetTop);
      console.log("After timeout - Section getBoundingClientRect:", section.getBoundingClientRect());

      // Create ScrollTrigger after ensuring layout is settled
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top", 
          end: "+=1000",
          pin: container,
          scrub: 1,
          markers: true,
          id: "summary-cards",
          onRefresh: (self) => {
            console.log("ScrollTrigger start:", self.start);
            console.log("ScrollTrigger end:", self.end);
            console.log("Trigger element offsetTop:", self.trigger.offsetTop);
          }
        },
      });

      tl.to(headline, {
        scale: 0.8,
        opacity: 0.5,
        duration: 1,
      });
    }, 1000); // Give layout time to settle

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-[300vh] bg-blue-500 relative"
      style={{ backgroundColor: '#3b82f6' }}
    >
      {/* Very visible border to see exactly where this section starts */}
      <div className="w-full h-4 bg-red-500 absolute top-0 z-50"></div>
      <div className="w-full text-center py-4 bg-yellow-400 text-black font-bold">
        THIS IS THE SUMMARY CARDS SECTION START
      </div>
      
      <div
        ref={containerRef}
        className="h-screen flex flex-col overflow-hidden bg-blue-600"
      >
        <div
          ref={headlineRef}
          className="flex-1 flex flex-col items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-6xl md:text-7xl font-bold mb-8 text-white">
              ScrollTrigger Test
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
