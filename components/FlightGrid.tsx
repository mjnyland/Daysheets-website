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
    <Section
      background="dark"
      className="relative overflow-hidden "
      gap="md"
      size="xl"
    >
      <div className="relative z-10 flex flex-col items-center mt-16 gap-12">
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
      <div className="w-full max-w-6xl mt-8 rounded-2xl overflow-hidden px-12 mx-auto">
        {/* Feature 1: Text left, Image right */}
        <div className="grid grid-cols-1 md:grid-cols-2  items-center border-1 border-white/10 ">
          <div className="flex flex-col justify-center p-12">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
              Import Flights
            </h3>
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              Daysheets AI makes it painless to add dozens of flights in a
              flash. Upload manifests or paste itineraries and we’ll normalize
              airports, aircraft, and passenger details automatically.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden bg-white/5 backdrop-blur-sm border-l-1 border-white/10">
            <Image
              src="/assets/ImportFlights.png"
              alt="Flight management dashboard"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Feature 2: Image left, Text right */}
        <div className="grid grid-cols-1 md:grid-cols-2  items-center border-1 border-white/10">
          <div className="flex flex-col justify-center p-12 md:order-2 border-l-1 border-white/10 h-full">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
              Easy Charters
            </h3>
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              Find any FBO globally, and we will handle the time zones for you.
              Instantly surface handling options, fees, and quick contacts
              alongside each leg.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden bg-white/5 backdrop-blur-sm md:order-1 border-l-1 border-white/10">
            <Image
              src="/assets/CharterFlights.png"
              alt="Personnel tracking interface"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Feature 3: Text left, Image right */}
        <div className="grid grid-cols-1 md:grid-cols-2  items-center border-1 border-white/10">
          <div className="flex flex-col justify-center p-12">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
              Export Grids
            </h3>
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              Share flight grids in seconds, without manual creation errors.
              Generate beautiful, consistent views for talent, crew, and vendors
              with a single click.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden bg-white/5 backdrop-blur-sm border-l-1 border-white/10">
            <Image
              src="/assets/ExportPreview.png"
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
