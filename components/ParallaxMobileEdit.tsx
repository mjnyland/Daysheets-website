"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/containers/Section";
import { useGSAP } from "@gsap/react";
import { Calendar, Building, Plane, Users, FileText } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxMobileEdit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupsRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Mockups layer - moves slowest (15% of scroll)
      gsap.to(mockupsRef.current, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          markers: false,
        },
      });

      // UI Cards - different speeds for depth effect
      // Card 1 - slow float (40%)
      gsap.to(card1Ref.current, {
        yPercent: -40,
        rotation: 5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Card 2 - medium float (60%)
      gsap.to(card2Ref.current, {
        yPercent: -60,
        rotation: -4,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Card 3 - faster float (80%)
      gsap.to(card3Ref.current, {
        yPercent: -80,
        rotation: 6,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Card 4 - fast float (100%)
      gsap.to(card4Ref.current, {
        yPercent: -100,
        rotation: -5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Card 5 - fastest float (120%)
      gsap.to(card5Ref.current, {
        yPercent: -120,
        rotation: 4,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section background="darkBlue">
      <div ref={containerRef} className="relative h-[150vh] overflow-hidden">
        {/* Mockup Screens Layer with Title */}
        <div
          ref={mockupsRef}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <div className="flex flex-col mx-auto gap-8">
            <div className="vo-badge text-sm sm:text-sm md:text-base font-medium tracking-tight text-center text-white bg-blue-500 px-4 py-2 rounded-full mb-4 w-fit mx-auto">
              Mobile Editing
            </div>
            {/* Title - on same layer as mockups */}
            <h1 className="text-5xl md:text-7xl font-semibold text-white mb-12 text-center px-8  max-w-4xl tracking-tight">
              Edit your entire tour, right from your phone.
            </h1>
          </div>

          {/* Phone Mockups Container - Cards will be positioned relative to this */}
          <div className="relative flex items-center justify-center gap-16 ">
            {/* Calendar View Mockup */}
            <div className="hidden lg:block relative w-[460px] h-[980px] transform -rotate-6 translate-y-10">
              <Image
                src="/assets/iOS_Calendar2.png"
                alt="Daysheets Calendar View"
                width={460}
                height={980}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Card 1 - Personnel - Far left */}
            <div
              ref={card1Ref}
              className="absolute left-0 top-0 bg-white rounded-3xl shadow-xl px-4 py-4 z-10"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-3 rounded-2xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-900 font-medium pr-2 text-lg">
                  Personnel
                </span>
              </div>
            </div>

            {/* Card 2 - Notes - Left bottom */}
            <div
              ref={card2Ref}
              className="hidden lg:absolute left-0 bottom-15 bg-white rounded-3xl shadow-xl px-4 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-3 rounded-2xl">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-900 font-medium pr-2 text-lg">
                  Notes
                </span>
              </div>
            </div>

            {/* Card 3 - Flights - Center top */}
            <div
              ref={card3Ref}
              className="absolute right-0 top-0 bg-white rounded-3xl shadow-xl px-4 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-3 rounded-2xl">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-900 font-medium pr-2 text-lg">
                  Flights
                </span>
              </div>
            </div>

            {/* Day View Mockup */}
            <div className="relative w-[460px] h-[980px] transform rotate-3 -translate-y-20">
              <Image
                src="/assets/iOS_DayView2.png"
                alt="Daysheets Day View"
                width={460}
                height={980}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Floating UI Cards - Evenly dispersed around phones */}

            {/* Card 4 - Hotels - Right top */}
            <div
              ref={card4Ref}
              className="absolute left-50 top-[20%] bg-white rounded-3xl shadow-xl px-4 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-3 rounded-2xl">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-900 font-medium pr-2 text-lg">
                  Hotels
                </span>
              </div>
            </div>

            {/* Card 5 - Events - Right bottom */}
            <div
              ref={card5Ref}
              className="absolute right-20 bottom-80 bg-white rounded-3xl shadow-xl px-4 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-3 rounded-2xl">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-900 font-medium pr-2 text-lg">
                  Events
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
