"use client";

import { Section } from "@/components/containers/Section";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const flightGridImage = "/assets/flight-grid-dashboard.png";

export function FlightGrid() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin inside useEffect to avoid SSR issues
    gsap.registerPlugin(ScrollTrigger);
    // GSAP Animation Setup
    // Here's how GSAP works:
    // 1. gsap.fromTo() animates from one state to another
    // 2. The first parameter is the element(s) to animate
    // 3. The second parameter is the "from" state (starting values)
    // 4. The third parameter is the "to" state (ending values) + animation config

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {
          // Starting state: scaled down and translated down
          scale: 1.2,
          y: 100, // Start 100px below
          transformOrigin: "center bottom", // Scale from bottom center
          opacity: 0,
        },
        {
          // Ending state: normal scale and position
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.2, // Animation duration in seconds
          ease: "power2.out", // Easing function for smooth motion

          // ScrollTrigger configuration
          scrollTrigger: {
            trigger: imageRef.current, // Element that triggers the animation
            start: "top 100%", // Animation starts when top of image hits 80% of viewport
            end: "top 30%", // Animation ends when top of image hits 30% of viewport
            scrub: 1, // Smooth scrubbing, 1 second catch-up time
            // markers: true, // Uncomment to see debug markers
          },
        }
      );
    }

    // Cleanup function to kill ScrollTrigger on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Section background="dark" className="relative overflow-hidden " gap="md">
      <div className="relative z-10 flex flex-col items-center gap-12 mt-16">
        <div className="flex flex-col items-center gap-6 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-center text-white">
            Every flight in one place.
          </h2>

          <p className="text-lg text-white/65 max-w-xl">
            See departure times, airports, airlines, and travelers in one clear
            view. The Flight Grid keeps every leg of your tour running on time.
          </p>

          <button className="bg-white text-black px-6 py-3 rounded-xl font-medium text-base hover:bg-white/90 transition-colors">
            Get Started for free
          </button>
        </div>

        <div className="relative w-full max-w-6xl">
          <div
            ref={imageRef}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900/20 to-gray-950/40 p-1"
          >
            <div className="rounded-xl overflow-hidden h-[400px]">
              <Image
                src={flightGridImage}
                alt="Flight Grid Dashboard showing departure times, airports, and flight details"
                width={2598}
                height={1313}
                className="w-full h-[auto]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-6xl my-16 space-y-24 md:space-y-32">
        {/* Feature 1: Text left, Image right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
              Streamlined Flight Management
            </h3>
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              Track every flight detail in one place. From passenger manifests
              to crew assignments, manage complex travel logistics with ease.
              Real-time updates ensure everyone stays informed throughout the
              journey.
            </p>
          </div>
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm">
            <Image
              src="/assets/flight-grid-dashboard.png"
              alt="Flight management dashboard"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Feature 2: Image left, Text right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="md:order-2">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
              Complete Personnel Overview
            </h3>
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              View and manage your entire team at a glance. Assign roles, track
              credentials, and coordinate schedules effortlessly. Our
              intelligent system prevents conflicts and ensures smooth
              operations.
            </p>
          </div>
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm md:order-1">
            <Image
              src="/assets/dayview.png"
              alt="Personnel tracking interface"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Feature 3: Text left, Image right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
              Smart Multi-Day Routing
            </h3>
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              Plan complex multi-city tours with confidence. Our routing engine
              optimizes travel times, manages accommodations, and keeps your
              entire team synchronized across multiple locations and time zones.
            </p>
          </div>
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm">
            <Image
              src="/assets/dayview.png"
              alt="Routing optimization view"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
