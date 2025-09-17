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
  const maskContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const handMockRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const flightsCardRef = useRef<HTMLDivElement>(null);
  const hotelCardRef = useRef<HTMLDivElement>(null);
  const noteCardRef = useRef<HTMLDivElement>(null);
  const guestlistCardRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const maskContainer = maskContainerRef.current;
      const headline = headlineRef.current;
      const handMock = handMockRef.current;
      const flightsCard = flightsCardRef.current;
      const hotelCard = hotelCardRef.current;
      const noteCard = noteCardRef.current;
      const guestlistCard = guestlistCardRef.current;

      const images = [image1Ref.current, image2Ref.current, image3Ref.current];

      // Set initial positions
      gsap.set(maskContainer, {
        scale: 1,
        borderRadius: "0px",
        opacity: 0.5,
      });
      gsap.set(headline, {
        y: 100,
        opacity: 0,
        filter: "blur(10px)",
      });
      gsap.set(handMock, {
        scale: 2,
        opacity: 0,
        yPercent: 50,
        filter: "blur(100px)",
      });
      gsap.set(images[0], { scale: 1.5 });
      gsap.set(images[1], { yPercent: 100 });
      gsap.set(images[2], { yPercent: 100 });

      // Set initial positions for UI cards
      gsap.set(flightsCard, {
        scale: 0.6,
        opacity: 0,
        x: -180,
        y: 200,
        filter: "blur(20px)",
      });
      gsap.set(hotelCard, {
        scale: 0.5,
        opacity: 0,
        x: 240,
        y: -50,
        filter: "blur(20px)",
      });
      gsap.set(noteCard, {
        scale: 0.8,
        opacity: 0,
        x: -200,
        y: 150,
        filter: "blur(20px)",
      });
      gsap.set(guestlistCard, {
        scale: 0.4,
        opacity: 0,
        x: -180,
        y: 10,
        filter: "blur(20px)",
      });

      // Create separate animation for mask container that runs throughout entire scroll
      gsap.to(maskContainer, {
        scale: 0.9,
        borderRadius: "64px",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: true,
        },
      });

      // Create timeline for other animations
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

      // First: Headline fades in from bottom
      tl.to(
        headline,
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 1,
          filter: "blur(0px)",
        },
        0.2,
      )
        // Then: Jet and hand scale down together
        .to(
          images[0],
          {
            scale: 1,
            ease: "power4.out",
            duration: 1,
          },
          0.4,
        )
        .to(
          handMock,
          {
            opacity: 1,
            ease: "power2.out",
            duration: 1,
            filter: "blur(0px)",
          },
          0.4,
        ) // The 0 makes it start at the same time as the jet
        .to(
          handMock,
          {
            scale: 1,
            ease: "power2.out",
            yPercent: 0,
            duration: 1,
          },
          0.4,
        )
        // Animate UI cards in with staggered timing
        .to(
          flightsCard,
          {
            scale: 0.7,
            opacity: 1,
            x: -120,
            y: -10,
            filter: "blur(0px)",
            ease: "power2.out",
            duration: 0.8,
          },
          0.5,
        )
        .to(
          hotelCard,
          {
            scale: 0.7,
            opacity: 1,
            x: 215,
            y: -160,
            filter: "blur(0px)",
            ease: "power2.out",
            duration: 0.8,
          },
          0.6,
        )
        .to(
          guestlistCard,
          {
            scale: 0.7,
            opacity: 0.9,
            x: -180,
            y: -180,
            filter: "blur(0px)",
            ease: "power2.out",
            duration: 0.8,
          },
          0.8,
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
      containerClassName="flex relative items-center justify-center h-full px-0"
      size="full"
      gap="none"
      padded="none"
    >
      <div className="h-full w-full z-40 relative flex flex-col items-center justify-end">
        {/* UI Cards - positioned behind phone */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none shadow-none">
          {/* Flights Card */}
          <div ref={flightsCardRef} className="absolute z-70">
            <Image
              src="/assets/flights.png"
              alt="Flights UI"
              width={400}
              height={180}
              className="rounded-2xl shadow-2xl"
              priority
            />
          </div>
          {/* Hotel Card */}
          <div ref={hotelCardRef} className="absolute z-30">
            <Image
              src="/assets/hotel.png"
              alt="Hotel UI"
              width={420}
              height={200}
              className="rounded-2xl shadow-2xl"
              priority
            />
          </div>

          {/* Guestlist Card */}
          <div ref={guestlistCardRef} className="absolute z-30 ">
            <Image
              src="/assets/guestlist.png"
              alt="Guestlist UI"
              width={380}
              height={400}
              className="rounded-2xl shadow-2xl opacity-90"
              priority
            />
          </div>
        </div>

        <div className="relative flex flex-col z-40 h-full w-full ">
          {/* Hand image - now positioned above the text */}
          <div
            ref={handMockRef}
            className="h-full w-full flex items-center justify-center z-40 mt-40"
          >
            <Image
              src="/assets/HandMock.png"
              alt="Phone Mock"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
          {/* Gradient overlay - fades from transparent to dark blue, covering full */}
          <div className="absolute inset-0 z-[50] pointer-events-none bg-gradient-to-t from-[#030720] to-transparent from-0% to-40%" />
          {/* Headline text - now at the bottom with gradient behind it */}
          <div
            ref={headlineRef}
            className="absolute bottom-0 left-0 right-0 z-[60] pb-30 "
          >
            <h2 className="text-5xl md:text-6xl font-medium text-white tracking-tight text-center">
              Edit your tour <br /> from{" "}
              <span className="text-blue-500">anywhere.</span>
            </h2>
          </div>
        </div>
      </div>
      {/* Mask container with rounded corners */}
      <div
        ref={maskContainerRef}
        className="absolute inset-0 overflow-hidden"
        style={{ transformOrigin: "center center" }}
      >
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
