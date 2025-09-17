"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Section } from "./containers/Section";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
    description: "Today's schedule, notes, lodging and contacts at a glance.",
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navIndicatorRef = useRef<HTMLDivElement>(null);
  const navButtonsRef = useRef<HTMLButtonElement[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current || !phoneContainerRef.current) return;

      const phoneImages =
        phoneContainerRef.current.querySelectorAll(".phone-image");
      const titleEl = sectionRef.current.querySelector(
        ".slide-title",
      ) as HTMLElement;
      const descEl = sectionRef.current.querySelector(
        ".slide-description",
      ) as HTMLElement;

      const totalScrollDistance = 3000;

      // Set initial state
      gsap.set(phoneImages, { opacity: 0 });
      gsap.set(phoneImages[0], { opacity: 1 });
      gsap.set(titleEl, { textContent: SLIDES[0].title });
      gsap.set(descEl, { textContent: SLIDES[0].description });

      const tl = gsap.timeline({ defaults: { ease: "none" } });

      // Dummy spacer defines a 1-second timeline
      tl.to({}, { duration: 1, ease: "none" });

      // Add labels for reference but handle visibility in onUpdate
      tl.addLabel("slide0", 0) // 0% - Day view
        .addLabel("slide1", 0.25) // 25% - Calendar view
        .addLabel("slide2", 0.5) // 50% - Routing view
        .addLabel("slide3", 0.75); // 75% - Map view

      timelineRef.current = tl;

      // Initialize nav indicator position
      if (navIndicatorRef.current && navButtonsRef.current[0]) {
        const button = navButtonsRef.current[0];
        const buttonRect = button.getBoundingClientRect();
        const containerRect = button.parentElement?.getBoundingClientRect();

        if (containerRect) {
          const leftOffset = buttonRect.left - containerRect.left;
          const width = buttonRect.width;

          gsap.set(navIndicatorRef.current, {
            left: leftOffset,
            width: width,
          });
        }
      }

      ScrollTrigger.create({
        id: "phone-slides",
        animation: tl,
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalScrollDistance}`,
        pin: true,
        scrub: true,
        markers: true,
        //snap: [0, 0.25, 0.5, 0.75, 1],
        onUpdate: (self) => {
          const progress = self.progress;

          // Determine current slide based on progress
          let slideIndex;
          if (progress < 0.25) {
            slideIndex = 0; // 0% - 25%: Day view
          } else if (progress < 0.5) {
            slideIndex = 1; // 25% - 50%: Calendar view
          } else if (progress < 0.75) {
            slideIndex = 2; // 50% - 75%: Routing view
          } else {
            slideIndex = 3; // 75% - 100%: Map view
          }

          // Update images visibility - this ensures proper state when scrolling back
          gsap.set(phoneImages, { opacity: 0 });
          gsap.set(phoneImages[slideIndex], { opacity: 1 });

          // Update text content
          gsap.set(titleEl, { textContent: SLIDES[slideIndex].title });
          gsap.set(descEl, { textContent: SLIDES[slideIndex].description });

          // Update nav indicator position and size
          if (navIndicatorRef.current && navButtonsRef.current[slideIndex]) {
            const button = navButtonsRef.current[slideIndex];
            const buttonRect = button.getBoundingClientRect();
            const containerRect = button.parentElement?.getBoundingClientRect();

            if (containerRect) {
              const leftOffset = buttonRect.left - containerRect.left;
              const width = buttonRect.width;

              gsap.to(navIndicatorRef.current, {
                left: leftOffset,
                width: width,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          }

          setCurrentSlide(slideIndex);
        },
      });

      return () => {
        console.log("🧹 Cleaning up StickyPhoneSection");
      };
    },
    { scope: sectionRef },
  );

  function scrollToSlide(index: number) {
    const st = ScrollTrigger.getById("phone-slides");
    if (!st) return;
    const progress = index / (SLIDES.length - 1); // 0, .25, .5, .75 if 4 slides
    const targetY = st.start + (st.end - st.start) * progress;

    gsap.to(window, {
      duration: 1,
      scrollTo: targetY,
      ease: "power2.inOut",
    });
  }

  return (
    <Section
      ref={sectionRef}
      background="darkBlue"
      className="h-dvh relative "
      containerClassName="flex flex-col h-full items-center justify-center"
      gap="lg"
    >
      <div className="flex flex-1 w-full h-full items-center justify-center flex-col gap-8 overflow-hidden max-h-[700px]">
        <div className="flex flex-col gap-0">
          <div className="vo-badge text-sm sm:text-sm md:text-base font-medium tracking-tight text-center text-white bg-blue-500 px-4 py-2 rounded-full mb-4 w-fit mx-auto">
            Custom Views
          </div>
          {/* Header */}
          <div className="text-center">
            <h2 className="vo-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-center text-white">
              View your tour
              <br />
              from every angle.
            </h2>
          </div>
        </div>

        <div
          ref={phoneContainerRef}
          className="relative w-full flex-1 max-w-sm"
          style={{ willChange: "transform", maxHeight: "70vh" }}
        >
          <nav
            aria-label="Phone views"
            className="absolute bottom-[40px] left-0 right-0 flex items-center justify-center z-20 "
          >
            <div className="relative flex items-center justify-center rounded-full bg-blue-900 p-1 px-2 shadow-xl shadow-slate-900/30">
              <div
                ref={navIndicatorRef}
                className="nav-indicator absolute left-0 top-1/2 -translate-y-1/2 h-[32px] rounded-full bg-blue-500 transition-none"
                style={{ width: 0 }}
                aria-hidden
              />

              {SLIDES.map((slide, index) => (
                <button
                  key={slide.key}
                  ref={(el) => {
                    if (el) navButtonsRef.current[index] = el;
                  }}
                  onClick={() => scrollToSlide(index)}
                  type="button"
                  className="nav-button relative z-10 px-6 py-2 rounded-full text-sm font-medium text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 hover:bg-white/10 transition-colors"
                  style={{
                    color:
                      currentSlide === index
                        ? "white"
                        : "rgba(255,255,255,0.5)",
                  }}
                  aria-label={`Show ${slide.title}`}
                  aria-current={currentSlide === index ? "true" : "false"}
                >
                  {slide.title}
                </button>
              ))}
            </div>
          </nav>

          {SLIDES.map((slide, i) => (
            <div
              key={slide.key}
              className="phone-image absolute inset-0 mx-12 "
              style={{ willChange: "opacity" }}
            >
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                sizes="(max-width: 640px) 90vw, 420px"
                className="object-cover object-top select-none"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
        <div className="text-center px-6 max-w-2xl z-10">
          <h2 className="slide-title text-white text-xl sm:text-2xl font-medium tracking-tight">
            {SLIDES[0].title}
          </h2>
          <p className="slide-description text-white/80 mt-2 text-base sm:text-lg">
            {SLIDES[0].description}
          </p>
        </div>
      </div>
    </Section>
  );
}
