"use client";

import { Section } from "@/components/containers/Section";
import Image from "next/image";
import { Upload, MapPin, Share2, Radar } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const flightGridImage = "/assets/flight-grid-dashboard.png";

export function FlightGrid() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full max-w-6xl mb-16">
        <FeatureItem
          icon={<Upload className="w-5 h-5" />}
          title="Import Flights"
          description="Daysheets AI makes it painless to add dozens of flights in a flash."
        />
        <FeatureItem
          icon={<MapPin className="w-5 h-5" />}
          title="Easy Charters"
          description="Find any FBO globally, and we will handle the time zones for you."
        />
        <FeatureItem
          icon={<Share2 className="w-5 h-5" />}
          title="Export Grids"
          description="Share flight grids in seconds, without manual creation errors."
        />
        <FeatureItem
          icon={<Radar className="w-5 h-5" />}
          title="Track Flights"
          description="Check the status of flights in the air and monitor their progress."
        />
      </div>
    </Section>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-white">{icon}</span>
        <h3 className="text-white text-lg font-normal">{title}</h3>
      </div>
      <p className="text-base text-white/65 leading-relaxed">{description}</p>
    </div>
  );
}
