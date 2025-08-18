"use client";

import { useEffect, useRef } from "react";
import { Section } from "./containers/Section";
import { Container } from "./containers/Container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Portfolio overview",
    description: "Track your entire portfolio in one place.",
    bgColor: "bg-gray-100",
    video: "/assets/portfolio-video.mp4",
  },
  {
    title: "Hardware wallet support",
    description: "Keeps funds safe on your Ledger / Trezor.",
    bgColor: "bg-gray-100",
    video: "/assets/hardware-video.mp4",
  },
  {
    title: "Malicious address alerts",
    description: "We flag malicious and suspicious addresses for you.",
    bgColor: "bg-gray-100",
    video: "/assets/alerts-video.mp4",
  },
  {
    title: "No IP tracking",
    description: "We do not record any user IP addresses.",
    bgColor: "bg-gray-100",
    video: "/assets/privacy-video.mp4",
  },
];

export function SummaryCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cardsContainer = cardsContainerRef.current;
    const cardsWrapper = cardsWrapperRef.current;

    // Create context for better performance
    const ctx = gsap.context(() => {
      // Create the main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${cards.length * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Headline animation - fade and scale down when section becomes sticky
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
          x: () => -(cards.length - 1) * 420, // 380px card width + 40px gap
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
          end: `+=${cards.length * 100}%`,
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
    <Section
      ref={sectionRef}
      className="relative "
      style={{ height: `${100 * cards.length}vh` }}
      background="blue"
    >
      <div className="h-screen relative overflow-hidden">
        {/* Headline Section */}
        <div
          ref={headlineRef}
          className="absolute top-0 left-0 right-0 h-full flex flex-col items-center justify-center z-10"
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

        {/* Cards Section */}
        <div
          ref={cardsContainerRef}
          className="absolute top-0 left-0 right-0 h-full flex items-center justify-center"
        >
          <Container className="overflow-hidden">
            <div ref={cardsWrapperRef} className="flex gap-10">
              {cards.map((card, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) cardRefs.current[index] = el;
                  }}
                  className="flex-shrink-0 w-[380px] h-[500px] rounded-2xl overflow-hidden shadow-xl"
                >
                  <div
                    className={`${card.bgColor} h-full p-8 flex flex-col justify-between`}
                  >
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">
                        {card.title}
                      </h3>
                      <p className="text-lg text-gray-600">
                        {card.description}
                      </p>
                    </div>
                    <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                      {/* Video placeholder - replace with actual videos */}
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse" />
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
