"use client";

import { Section } from "@/components/containers/Section";
import Image from "next/image";

const flightGridImage = "/assets/flight-grid-dashboard.png";

export function FlightGrid() {
  return (
    <Section background="dark" className="relative overflow-hidden ">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent mix-blend-soft-light" />

      <div className="relative z-10 flex flex-col items-center gap-20 py-20">
        <div className="flex flex-col items-center gap-6 text-center max-w-3xl">
          <span className="text-blue-500 text-lg font-normal">Flight Grid</span>

          <h2 className="text-5xl font-medium text-white tracking-tight">
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
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900/20 to-gray-950/40 p-1">
            <div className="rounded-xl overflow-hidden">
              <Image
                src={flightGridImage}
                alt="Flight Grid Dashboard showing departure times, airports, and flight details"
                width={2598}
                height={1313}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full max-w-6xl">
          <FeatureItem
            icon="􀒸"
            title="Import Flights"
            description="Daysheets AI makes it painless to add dozens of flights in a flash."
          />
          <FeatureItem
            icon="􀒸"
            title="Easy Charters"
            description="Find any FBO globally, and we will handle the time zones for you."
          />
          <FeatureItem
            icon="􀒸"
            title="Export Grids"
            description="Share flight grids in seconds, without manual creation errors."
          />
          <FeatureItem
            icon="􀒸"
            title="Track Flights"
            description="Check the status of flights in the air and monitor their progress."
          />
        </div>
      </div>
    </Section>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-white text-lg">{icon}</span>
        <h3 className="text-white text-lg font-normal">{title}</h3>
      </div>
      <p className="text-base text-white/65 leading-relaxed">{description}</p>
    </div>
  );
}
