"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Section } from "./containers/Section";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function MaskedPhoneMocks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const handMockRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const handMock = handMockRef.current;

      const images = [image1Ref.current, image2Ref.current, image3Ref.current];

      // Set initial positions - all images start below the viewport
      gsap.set(handMock, {
        scale: 5,
        opacity: 0,
        yPercent: 50,
        filter: "blur(100px)",
      });
      gsap.set(images[0], { scale: 1.5 });
      gsap.set(images[1], { yPercent: 100 });
      gsap.set(images[2], { yPercent: 100 });

      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            setScrollProgress(Math.round(self.progress * 100));
            setTimelineProgress(Math.round(tl.progress() * 100));
          },
        },
      });

      // First: Both jet and hand scale down together
      tl.to(images[0], {
        scale: 1,
        ease: "power4.out",
        duration: 1,
      })
        .to(
          handMock,
          {
            opacity: 1,
            ease: "power2.out",
            duration: 0.75,
            filter: "blur(0px)",
          },
          0.2,
        ) // The 0 makes it start at the same time as the jet
        .to(
          handMock,
          {
            scale: 1.1,
            ease: "power2.out",
            yPercent: 0,
            duration: 1,
          },
          0.2,
        )
        // Then: Bus slides up over jet
        .to(images[1], {
          yPercent: 0,
          duration: 1,
          ease: "power2.inOut",
        })
        // Finally: Van slides up over bus
        .to(images[2], {
          yPercent: 0,
          duration: 1,
          ease: "power2.inOut",
        });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: sectionRef },
  );

  return (
    <Section
      ref={sectionRef}
      background="darkBlue"
      className="h-dvh overflow-hidden"
      containerClassName="flex relative items-center justify-center h-full"
      size="full"
      gap="none"
    >
      {/* Hand image - top layer */}
      <div
        ref={handMockRef}
        className="relative h-full w-full flex items-center justify-center z-40 mt-90"
      >
        <Image
          src="/assets/HandMock.png"
          alt="Jet"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>
      {/* Jet image - bottom layer */}
      <div
        ref={image1Ref}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <Image
          src="/assets/jet.png"
          alt="Jet"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Bus image - middle layer */}
      <div
        ref={image2Ref}
        className="absolute inset-0 flex items-center justify-center z-20"
      >
        <Image
          src="/assets/bus.png"
          alt="Bus"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Van image - top layer */}
      <div
        ref={image3Ref}
        className="absolute inset-0 flex items-center justify-center z-30"
      >
        <Image
          src="/assets/van.png"
          alt="Van"
          fill
          className="object-cover"
          priority
        />
      </div>
      ;{/* Floating Progress Indicators */}
      <div className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-4 space-y-3 min-w-[200px]">
        <div className="text-white">
          <div className="text-xs opacity-60 uppercase tracking-wide mb-1">
            Scroll Progress
          </div>
          <div className="text-2xl font-mono font-bold">{scrollProgress}%</div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-2">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-100"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

        <div className="text-white border-t border-white/20 pt-3">
          <div className="text-xs opacity-60 uppercase tracking-wide mb-1">
            Timeline Progress
          </div>
          <div className="text-2xl font-mono font-bold">
            {timelineProgress}%
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-2">
            <div
              className="bg-green-500 h-full rounded-full transition-all duration-100"
              style={{ width: `${timelineProgress}%` }}
            />
          </div>
        </div>

        <div className="text-white border-t border-white/20 pt-3">
          <div className="text-xs opacity-60 uppercase tracking-wide mb-2">
            Phase
          </div>
          <div className="text-sm font-medium">
            {timelineProgress <= 50
              ? "🛩️ Jet"
              : timelineProgress <= 100
                ? "🚌 Bus"
                : "🚐 Van"}
          </div>
        </div>
      </div>
    </Section>
  );
}
