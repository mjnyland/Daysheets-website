"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "./containers/Section";
import { Container } from "./containers/Container";

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [headlineOpacity, setHeadlineOpacity] = useState(1);
  const [headlineScale, setHeadlineScale] = useState(1);
  const [cardsTranslateY, setCardsTranslateY] = useState(100);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate when section enters viewport
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      // Section is in viewport
      if (sectionTop <= windowHeight && sectionBottom >= 0) {
        // Calculate progress through the section (0 to 1)
        const progress = Math.max(
          0,
          Math.min(
            1,
            (windowHeight - sectionTop) / (sectionHeight + windowHeight)
          )
        );

        setScrollProgress(progress);

        // Sticky state activates when section reaches top
        setIsSticky(sectionTop <= 0 && sectionBottom > windowHeight);

        // Headline zooms out and fades (first 25% of scroll)
        if (progress < 0.25) {
          const headlineProgress = progress * 4;
          setHeadlineOpacity(1 - headlineProgress);
          setHeadlineScale(1 - headlineProgress * 0.3);
        } else {
          setHeadlineOpacity(0);
          setHeadlineScale(0.7);
        }

        // Cards slide up from bottom (15% to 35% of scroll)
        if (progress < 0.15) {
          setCardsTranslateY(100);
        } else if (progress < 0.35) {
          const cardProgress = (progress - 0.15) / 0.2;
          setCardsTranslateY(100 - cardProgress * 100);
        } else {
          setCardsTranslateY(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate horizontal scroll for cards
  const cardsScrollX =
    Math.max(0, (scrollProgress - 0.5) * 2) * (cards.length - 1) * 400;

  return (
    <Section
      ref={sectionRef}
      className="relative bg-white"
      style={{ height: `${100 * cards.length}vh` }}
    >
      <div
        className={`${
          isSticky ? "fixed top-0" : "absolute top-0"
        } left-0 right-0 h-screen flex flex-col items-center justify-center overflow-hidden`}
        style={{ zIndex: isSticky ? 10 : 1 }}
      >
        {/* Headline Section */}
        <div
          ref={headlineRef}
          className="absolute top-0 left-0 right-0 h-full flex flex-col items-center justify-center"
          style={{
            opacity: headlineOpacity,
            transform: `scale(${headlineScale})`,
            transition:
              "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease-out",
          }}
        >
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm uppercase tracking-wider text-gray-600">
                  Secure and private
                </span>
              </div>
              <h2 className="text-6xl md:text-7xl font-bold mb-8">
                The most complete
                <br />
                <span className="text-green-500">touring</span> solution.
              </h2>
            </div>
          </Container>
        </div>

        {/* Cards Section */}
        <div
          ref={cardsContainerRef}
          className="absolute top-0 left-0 right-0 h-full flex items-center justify-center"
          style={{
            transform: `translateY(${cardsTranslateY}%)`,
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <Container className="overflow-hidden">
            <div
              className="flex gap-8 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${cardsScrollX}px)`,
              }}
            >
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[380px] h-[500px] rounded-2xl overflow-hidden shadow-xl"
                  style={{
                    opacity: Math.min(
                      1,
                      0.3 + (1 - Math.abs(cardsScrollX / 400 - index) * 0.3)
                    ),
                    transform: `scale(${Math.min(
                      1,
                      0.9 + (1 - Math.abs(cardsScrollX / 400 - index) * 0.1)
                    )})`,
                    transition: "opacity 0.3s, transform 0.3s",
                  }}
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
