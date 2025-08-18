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

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const headline = headlineRef.current;

    if (!section || !container || !headline) return;

    // Simple ScrollTrigger without ScrollSmoother
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      pin: container,
      scrub: 1,
      markers: true,
      onUpdate: (self) => {
        const scale = 1 - self.progress * 0.2;
        gsap.set(headline, { scale });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="min-h-[300vh] bg-green-500">
      <div
        ref={containerRef}
        className="h-screen w-full flex flex-col bg-blue-600"
      >
        {/* Headline */}
        <div className="flex-1 flex items-center justify-center">
          <div ref={headlineRef} className="text-center text-white">
            <h2 className="text-6xl font-bold">Simple Sticky Test</h2>
          </div>
        </div>

        {/* Cards */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex gap-4 overflow-x-auto">
            {cards.map((card, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 h-96 bg-white/20 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  {card.title}
                </h3>
                <p className="text-white/80">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
