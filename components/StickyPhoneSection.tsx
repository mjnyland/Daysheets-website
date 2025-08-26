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
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navButtonRefs = useRef<HTMLButtonElement[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);

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
        // Position nav indicator on refresh
        moveIndicator(activeIndexRef.current, 0);
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

              duration: 0.5,
              ease: "power2.out",
            });
            gsap.fromTo(
              toEl,
              { opacity: 0 },
              { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
            );
          }

          activeIndexRef.current = next;
          setActiveIndex(next);
          // Slide nav indicator to the new active button
          moveIndicator(next, 0.25);
        }
      },
    });

    // Save ref so nav clicks can compute the correct scroll target
    triggerRef.current = st;
  }); // useGSAP handles cleanup automatically

  // Nav click handler
  const handleNavClick = (index: number) => {
    const st = triggerRef.current;
    if (!st) return;
    const segments = SLIDES.length - 1;
    const target =
      st.start +
      (segments === 0 ? 0 : (index / segments) * (st.end - st.start));
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  // Animate the blue pill indicator under the active nav item
  const moveIndicator = (index: number, duration: number) => {
    const container = navContainerRef.current;
    const pill = indicatorRef.current;
    const btn = navButtonRefs.current[index];
    if (!container || !pill || !btn) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const x = btnRect.left - containerRect.left;
    const width = btnRect.width;

    gsap.to(pill, { x, width, duration, ease: "power2.out" });
  };

  return (
    <>
      <Section
        ref={sectionRef}
        background="darkBlue"
        className="h-dvh"
        containerClassName="flex flex-col h-full"
      >
        {/* Content wrapper - kept contained within the section container */}
        <div className="flex flex-1 w-full items-center justify-center flex-col gap-8">
          {/* Blur */}
          <div className="absolute left-1/2 bottom-[10%] -translate-x-1/2 h-[800px] w-[800px] rounded-full bg-blue-500/50 blur-[160px] z-0"></div>
          {/* Headline Content */}
          <div className="text-center px-6 max-w-2xl z-2">
            <h2 className="text-white text-3xl sm:text-4xl font-medium tracking-tight">
              {SLIDES[activeIndex].title}
            </h2>
            <p className="text-white/80 mt-2 text-base sm:text-lg">
              {SLIDES[activeIndex].description}
            </p>
          </div>

          {/* Phone Content (contained) */}
          <div className="relative w-full max-w-sm aspect-[9/16]">
            {/* Nav Content */}
            <nav
              aria-label="Phone views"
              className="mt-2 absolute bottom-[84px] left-0 right-0 flex items-center justify-center z-2"
            >
              <div
                ref={navContainerRef}
                className="relative flex items-center justify-center rounded-full bg-blue-900 p-1 px-2 shadow-xl shadow-slate-900/30"
              >
                {/* Sliding indicator pill */}
                <div
                  ref={indicatorRef}
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[32px] rounded-full bg-blue-500"
                  style={{ width: 0 }}
                  aria-hidden
                />

                {SLIDES.map((slide, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={slide.key}
                      type="button"
                      ref={(el) => {
                        if (el) navButtonRefs.current[index] = el;
                      }}
                      onClick={() => handleNavClick(index)}
                      className={
                        "relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 " +
                        (isActive
                          ? "text-white"
                          : "hover:bg-white/10 text-white/50")
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
        </div>
      </Section>
    </>
  );
}
