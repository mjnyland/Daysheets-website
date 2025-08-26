"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Section } from "./containers/Section";
import Image from "next/image";

type Slide = {
  key: string;
  title: string;
  description: string;
  src: string;
};

const SLIDES: Slide[] = [
  {
    key: "day",
    title: "Day",
    description: "Today’s schedule, notes, lodging and contacts at a glance.",
    src: "/assets/iOS_DayView.png",
  },
  {
    key: "calendar",
    title: "Calendar",
    description: "Color‑coded month for quick scanning and planning.",
    src: "/assets/iOS_Calendar.png",
  },
  {
    key: "routing",
    title: "Routing",
    description: "Distances and time between locations for the day.",
    src: "/assets/iOS_Routing.png",
  },
  {
    key: "map",
    title: "Map",
    description: "All stops on a map. Tap a pin to jump to details.",
    src: "/assets/iOS_Map.png",
  },
];

export default function StickyPhoneSection() {
  const sectionRef = useRef(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    // Create one ScrollTrigger controlling this whole sticky section
    const st = ScrollTrigger.create({
      // Trigger element used to calculate start and end positions
      trigger: sectionRef.current, // top of this element is our reference

      // When to start pinning: section top hits viewport top
      start: "top top",

      // How long to keep the section pinned. Using a function ensures
      // it recalculates on refresh/resizes. Here: 2x the viewport height.
      end: () => "+=" + window.innerHeight * 2,

      // Actually pin the trigger element during the span above
      pin: true,

      // Tie animation progress to scroll position (no discrete timeline)
      scrub: 1,

      // Snap to the nearest logical segment between slides
      // For N slides, there are N-1 segments; 1/(N-1) defines each snap stop
      snap: SLIDES.length > 1 ? 1 / (SLIDES.length - 1) : 1,

      // Whenever ScrollTrigger refreshes (resize, fonts load, etc),
      // normalize image visibility so only the active is shown
      onRefresh: () => {
        imageRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, { opacity: i === activeIndexRef.current ? 1 : 0, y: 0 });
        });
      },

      // Called on every scroll update; decides which slide should be visible
      onUpdate: (self) => {
        const segments = SLIDES.length - 1;
        const next = Math.round(self.progress * segments);
        if (next !== activeIndexRef.current) {
          const fromEl = imageRefs.current[activeIndexRef.current];
          const toEl = imageRefs.current[next];

          // Crossfade with a subtle vertical motion for polish
          if (fromEl && toEl) {
            gsap.to(fromEl, {
              opacity: 0,
              y: -12,
              duration: 0.25,
              ease: "power2.out",
            });
            gsap.fromTo(
              toEl,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
            );
          }

          activeIndexRef.current = next;
          setActiveIndex(next);
        }
      },
    });

    // Save ref so nav clicks can compute the correct scroll target
    triggerRef.current = st;
  }); // useGSAP handles cleanup automatically

  const handleNavClick = (index: number) => {
    const st = triggerRef.current;
    if (!st) return;
    const segments = SLIDES.length - 1;
    const target =
      st.start +
      (segments === 0 ? 0 : (index / segments) * (st.end - st.start));
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <>
      <Section
        ref={sectionRef}
        background="blue"
        className="h-dvh"
        containerClassName="flex flex-col h-full"
      >
        {/* Content wrapper - kept contained within the section container */}
        <div className="flex flex-1 w-full items-center justify-center flex-col gap-8 overflow-hidden">
          {/* Headline Content */}
          <div className="text-center px-6 max-w-2xl">
            <h2 className="text-white text-3xl sm:text-4xl font-medium tracking-tight">
              {SLIDES[activeIndex].title}
            </h2>
            <p className="text-white/80 mt-2 text-base sm:text-lg">
              {SLIDES[activeIndex].description}
            </p>
          </div>

          {/* Phone Content (contained) */}
          <div className="relative w-full max-w-sm aspect-[9/16] overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
            {SLIDES.map((slide, i) => (
              <div
                key={slide.key}
                ref={(el) => {
                  if (el) imageRefs.current[i] = el;
                }}
                className="absolute inset-0"
                aria-hidden={activeIndex !== i}
              >
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 640px) 90vw, 420px"
                  className="object-contain object-top select-none"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {/* Nav Content */}
          <nav aria-label="Phone views" className="mt-2">
            <div className="flex items-center justify-center rounded-full bg-blue-900/60 p-1">
              {SLIDES.map((slide, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={slide.key}
                    type="button"
                    onClick={() => handleNavClick(index)}
                    className={
                      "px-4 py-2 rounded-full text-sm font-medium text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 " +
                      (isActive ? "bg-blue-500" : "hover:bg-white/10")
                    }
                    aria-current={isActive ? "page" : undefined}
                    aria-label={`Show ${slide.title}`}
                  >
                    {slide.title}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </Section>
    </>
  );
}
