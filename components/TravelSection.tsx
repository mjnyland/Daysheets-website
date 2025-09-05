"use client";

import Image from "next/image";
import { Section } from "@/components/containers/Section";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export const TravelSection = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  return (
    <Section background="white" gap="md" className="pb-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-6 flex flex-col items-center lg:items-start">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-center lg:text-left text-[#166CD1]">
            You can even pick hotels with Daysheets Travel.
          </h2>
          <p className="text-xl sm:text-2xl text-neutral-70 text-center lg:text-left">
            Plan Tours. Book Travel. All in One Place.
            <br />
            Logistics just got 10x easier.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors mx-auto md:mx-0">
            Learn more about DS Travel
          </button>
        </div>
        <div className="relative overflow-hidden lg:overflow-visible">
          <Image
            src="/assets/StayPageMockup.png"
            alt="Globe illustration showing travel connectivity"
            width={600}
            height={600}
            className="w-full h-auto absolute -bottom-20 lg:top-30 left-0 lg:-left-45 scale-130"
          />
          <Image
            src="/assets/globe.png"
            alt="Globe illustration showing travel connectivity"
            width={600}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </div>
    </Section>
  );
};
