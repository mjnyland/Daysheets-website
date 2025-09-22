"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function SimpleScrollCarousel() {
  // Refs for DOM elements
  const galleryRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // ============================================
    // STEP 1: Get all card elements
    // ============================================
    const cards = gsap.utils.toArray<HTMLElement>(".carousel-card");

    if (cards.length === 0) return;

    // ============================================
    // STEP 2: Set initial state of all cards
    // ============================================
    // Cards start:
    // - Invisible (opacity: 0)
    // - Scaled down (scale: 0)
    // - Positioned off-screen to the right (x: 100vw)
    gsap.set(cards, {
      opacity: 0,
      scale: 0,
      x: "100vw", // Start off-screen to the right
    });

    // ============================================
    // STEP 3: Create main timeline with ScrollTrigger
    // ============================================
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: galleryRef.current, // Element that triggers animation
        start: "top top", // When top of gallery hits top of viewport
        end: "+=300%", // Animation runs for 300% of viewport height
        pin: true, // Pin gallery while scrolling
        scrub: 1, // 1 = smooth scrubbing
        anticipatePin: 1, // Prevents jump on fast scroll

        // Update progress indicator as we scroll
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.textContent = `${Math.round(self.progress * 100)}%`;
          }
        },
      },
    });

    // ============================================
    // STEP 4: Create staggered animations for each card
    // ============================================

    // How staggering works:
    // Each card's animation starts slightly after the previous one
    // This creates a cascade effect
    const staggerDelay = 0.2; // Delay between each card animation

    cards.forEach((card, index) => {
      // Calculate when this card should start animating
      // Card 0 starts at 0s, Card 1 at 0.3s, Card 2 at 0.6s, etc.
      const startTime = index * staggerDelay;

      // This mimics the original example more closely:
      // Each card scales from 0 to 1 and back to 0 (yoyo effect)
      // While moving from right to left

      // Animation 1: Scale and opacity with yoyo effect (peak in the middle)
      tl.fromTo(
        card,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          yoyo: true, // Go back to starting values
          repeat: 1, // Repeat once (up then down)
          ease: "power1.inOut",
        },
        startTime,
      );

      // Animation 2: Movement from right to left (happens simultaneously)
      tl.fromTo(
        card,
        {
          x: "100vw",
        },
        {
          x: "-100vw",
          duration: 1,
          ease: "none",
        },
        startTime, // Same start time so it moves while scaling
      );
    });

    // ============================================
    // HOW THE TIMELINE WORKS:
    // ============================================
    // 1. Timeline total duration = sum of all animations
    // 2. ScrollTrigger maps scroll distance (0 to 300vh) to timeline progress (0% to 100%)
    // 3. As user scrolls, timeline playhead moves proportionally
    // 4. Cards animate in sequence due to staggered start times
  }, []);

  // Card data
  const cardData = [
    { id: 1, color: "from-purple-500 to-pink-500" },
    { id: 2, color: "from-blue-500 to-cyan-500" },
    { id: 3, color: "from-green-500 to-emerald-500" },
    { id: 4, color: "from-orange-500 to-red-500" },
    { id: 5, color: "from-indigo-500 to-purple-500" },
  ];

  return (
    <>
      {/* Extra space before gallery for scrolling */}
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Scroll Carousel Demo</h2>
          <p className="text-xl">Scroll down to see the animation</p>
          <div className="mt-8 animate-bounce">
            <svg
              className="w-6 h-6 mx-auto text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Gallery Section - This gets pinned */}
      <div
        ref={galleryRef}
        className="gallery h-screen bg-gray-900 relative overflow-hidden"
      >
        {/* Cards Container */}
        <div
          ref={cardsContainerRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Individual Cards */}
          {cardData.map((card) => (
            <div
              key={card.id}
              className={`carousel-card absolute w-64 h-96 rounded-2xl bg-gradient-to-br ${card.color}
                         flex items-center justify-center text-white text-6xl font-bold shadow-2xl`}
            >
              {card.id}
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 px-6 py-3 rounded-full">
          <p className="text-white">
            Progress:{" "}
            <span ref={progressRef} className="font-mono">
              0%
            </span>
          </p>
        </div>
      </div>

      {/* Extra space after gallery */}
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">Animation Complete!</h2>
          <p className="text-xl mt-4">Scroll back up to see it again</p>
        </div>
      </div>
    </>
  );
}
