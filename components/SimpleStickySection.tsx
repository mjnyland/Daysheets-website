"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const cards = [
  {
    title: "Notifications & Reminders",
    description: "Schedule as many reminders as your team member needs.",
  },
  {
    title: "Shortcuts for speed",
    description:
      "Quick shortcuts let you add, edit, and find things in seconds.",
  },
  {
    title: "Notes",
    description:
      "Add general notes to keep important travel details in one place.",
  },
  {
    title: "Travel Profiles",
    description: "Never miss an expiring passport again. We'll remind you.",
  },
];

export function SimpleStickySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const cardsViewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    // Register plugins inside useLayoutEffect to avoid SSR issues
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    
    const section = sectionRef.current;
    const container = containerRef.current;
    const headline = headlineRef.current;
    const cardsContainer = cardsContainerRef.current;
    const cardsWrapper = cardsWrapperRef.current;
    const cardsViewport = cardsViewportRef.current;

    if (
      !section ||
      !container ||
      !headline ||
      !cardsContainer ||
      !cardsWrapper ||
      !cardsViewport
    )
      return;

    let mounted = true;
    let ctx: gsap.Context | null = null;

    (async () => {
      try {
        await document.fonts?.ready;
      } catch (error) {
        // ignore
      }

      // Wait until ScrollSmoother is initialized so measurements are correct
      try {
        await new Promise<void>((resolve) => {
          if (ScrollSmoother.get()) return resolve();
          let attempts = 0;
          const check = () => {
            if (ScrollSmoother.get() || attempts++ > 60) {
              resolve();
              return;
            }
            requestAnimationFrame(check);
          };
          check();
        });
      } catch (e) {
        // ignore
      }
      if (!mounted) return;

      // Create context for better performance
      ctx = gsap.context(() => {
        const getMaxTranslateX = () => {
          if (!cardsWrapper || !cardsViewport) return 0;
          const wrapperWidth = cardsWrapper.scrollWidth;
          const viewportWidth = cardsViewport.clientWidth;
          const maxShift = Math.max(0, wrapperWidth - viewportWidth);
          return -maxShift;
        };

        // Pin the section and create animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${cards.length * 100}%`,
            pin: container,
            scrub: 1,
            markers: false,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const cardProgress = self.progress * (cards.length - 1);
              cardRefs.current.forEach((card, index) => {
                if (!card) return;
                const distance = Math.abs(cardProgress - index);
                const scale = Math.max(0.9, 1 - distance * 0.1);
                const opacity = Math.max(0.3, 1 - distance * 0.3);
                gsap.set(card, { scale, opacity });
              });
            },
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

        // Horizontal scroll for cards (responsive)
        tl.to(
          cardsWrapper,
          {
            x: getMaxTranslateX,
            duration: 2,
            ease: "none",
          },
          0.5
        );

        // Card focus effect handled in scrollTrigger.onUpdate above
      }, section);

      // Ensure everything measures after creation, once fonts are ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    })();

    // Cleanup
    return () => {
      mounted = false;
      ctx?.revert();
    };
  }, []);

  return (
    <>
      <div
        ref={sectionRef}
        className="min-h-[300vh] bg-[#166CD1] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.22)_1.2px,transparent_1.2px)] [background-size:22px_22px] [background-position:0_0]"
      >
        <div
          ref={containerRef}
          className="h-dvh w-full relative overflow-hidden bg-[#166CD1] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.22)_1.2px,transparent_1.2px)] [background-size:22px_22px] [background-position:0_0]"
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
            <div
              ref={cardsViewportRef}
              className="overflow-visible w-full max-w-7xl mx-auto px-6"
            >
              <div ref={cardsWrapperRef} className="flex">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      if (el) cardRefs.current[index] = el;
                    }}
                    className="flex-shrink-0 w-[380px] h-[500px] rounded-2xl overflow-hidden shadow-lg"
                  >
                    <div className="h-full p-8 flex flex-col justify-between bg-[#2978D4] backdrop-blur-sm">
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-white">
                          {card.title}
                        </h3>
                        <p className="text-lg text-white/80">
                          {card.description}
                        </p>
                      </div>
                      <div className="aspect-video bg-gray-200/10 rounded-lg overflow-hidden">
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
    </>
  );
}
