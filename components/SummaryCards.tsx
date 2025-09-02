"use client";

import { useEffect, useRef } from "react";
import { Section } from "./containers/Section";
import { Container } from "./containers/Container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TransparentVideo } from "@/components/TransparentVideo";

const cards = [
  {
    title: "Portfolio overview",
    description: "Track your entire portfolio in one place.",
    video: "/videos/Summary_Test.mp4",
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
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register plugin inside useEffect to avoid SSR issues
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const container = containerRef.current;
    const headline = headlineRef.current;

    if (!section || !container || !headline) return;

    // Follow PhoneScrollSection pattern - simple ScrollTrigger.create
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      pin: container,
      scrub: 1,
      onUpdate: (self) => {
        // Simple scale animation based on progress
        const scale = 1 - self.progress * 0.2; // Scale from 1 to 0.8
        const opacity = 1 - self.progress * 0.5; // Opacity from 1 to 0.5

        gsap.set(headline, {
          scale: scale,
          opacity: opacity,
        });
      },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Section
      ref={sectionRef}
      as="section"
      background="blue"
      padded={false}
      className="relative min-h-[300vh]"
      containerClassName="h-full"
    >
      <div
        ref={containerRef}
        className="h-screen flex flex-col overflow-hidden"
      >
        {/* Headline Section */}
        <div
          ref={headlineRef}
          className="flex-1 flex flex-col items-center justify-center"
        >
          <Container>
            <div className="text-center max-w-4xl mx-auto">
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
          </Container>
        </div>

        {/* Cards Section - Static for now */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] flex items-center justify-center">
          <Container className="overflow-visible">
            <div className="flex gap-0">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[380px] h-[500px] rounded-2xl overflow-hidden shadow-lg"
                >
                  <div className="h-full p-8 flex flex-col justify-between bg-white/10 backdrop-blur-sm">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-white">
                        {card.title}
                      </h3>
                      <p className="text-lg text-white/80">
                        {card.description}
                      </p>
                    </div>
                    <div className="aspect-square bg-gray-200/10 rounded-lg overflow-hidden">
                      <TransparentVideo
                        src={card.video}
                        className="w-full h-full object-cover"
                        preload="metadata"
                        aria-label={`${card.title} demo video`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </Section>
  );
}
