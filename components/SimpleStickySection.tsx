"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Portfolio overview",
    description: "Track your entire portfolio in one place.",
  },
  {
    title: "Hardware wallet support",
    description: "Keeps funds safe on your Ledger / Trezor.",
  },
  {
    title: "Malicious address alerts",
    description: "We flag malicious and suspicious addresses for you.",
  },
  {
    title: "No IP tracking",
    description: "We do not record any user IP addresses.",
  },
];

export function SimpleStickySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const headline = headlineRef.current;
    const cardsContainer = cardsContainerRef.current;
    const cardsWrapper = cardsWrapperRef.current;

    if (!section || !container || !headline || !cardsContainer || !cardsWrapper) return;

    // Create context for better performance
    const ctx = gsap.context(() => {
      // Pin the section and create animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${cards.length * 100}%`,
          pin: container,
          scrub: 1,
          anticipatePin: 1,
          markers: true,
        },
      });

      // Headline animation - fade and scale down when pinned
      tl.to(
        headline,
        {
          opacity: 0,
          scale: 0.7,
          duration: 0.3,
          ease: "power2.inOut",
        },
        0
      );

      // Cards container slides up from bottom
      tl.fromTo(
        cardsContainer,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        0.1
      );

      // Horizontal scroll for cards
      tl.to(
        cardsWrapper,
        {
          x: () => -(cards.length - 1) * 380, // 380px card width, no gap
          duration: 2,
          ease: "none",
        },
        0.5
      );

      // Individual card animations for focus effect
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${cards.length * 100}%`,
          scrub: 1,
          onUpdate: (self) => {
            // Calculate which card should be in focus based on scroll progress
            const progress = self.progress;
            const cardProgress = progress * (cards.length - 1);
            const distance = Math.abs(cardProgress - index);

            // Scale and opacity based on distance from center
            const scale = Math.max(0.9, 1 - distance * 0.1);
            const opacity = Math.max(0.3, 1 - distance * 0.3);

            gsap.set(card, {
              scale,
              opacity,
            });
          },
        });
      });
    }, section);

    // Cleanup
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-[300vh] bg-blue-500"
    >
      <div
        ref={containerRef}
        className="h-screen w-full relative overflow-hidden bg-blue-600"
      >
        {/* Headline Section */}
        <div
          ref={headlineRef}
          className="absolute top-0 left-0 right-0 h-full flex flex-col items-center justify-center z-10"
        >
          <div className="text-center max-w-4xl mx-auto px-6">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm uppercase tracking-wider text-white">
                Built for every band.
              </span>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold mb-8 text-white">
              The most complete
              <br />
              touring solution.
            </h2>
          </div>
        </div>

        {/* Cards Section */}
        <div
          ref={cardsContainerRef}
          className="absolute top-0 left-0 right-0 h-full flex items-center justify-center"
        >
          <div className="overflow-visible w-full max-w-7xl mx-auto px-6">
            <div ref={cardsWrapperRef} className="flex">
              {cards.map((card, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) cardRefs.current[index] = el;
                  }}
                  className="flex-shrink-0 w-[380px] h-[500px] rounded-2xl overflow-hidden shadow-lg"
                >
                  <div className="h-full p-8 flex flex-col justify-between bg-white/10 backdrop-blur-sm">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-white">
                        {card.title}
                      </h3>
                      <p className="text-lg text-white/80">{card.description}</p>
                    </div>
                    <div className="aspect-video bg-gray-200/10 rounded-lg overflow-hidden">
                      {/* Video placeholder - replace with actual videos */}
                      <div className="w-full h-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
