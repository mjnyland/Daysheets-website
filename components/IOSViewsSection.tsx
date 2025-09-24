"use client";

import Image from "next/image";
import { Section } from "@/components/containers/Section";

type View = {
  src: string;
  title: string;
  description: string;
};

const VIEWS: View[] = [
  {
    src: "/assets/iOS_Map.png",
    title: "Routing",
    description: "Plan travel with routes and distances at a glance.",
  },
  {
    src: "/assets/iOS_DayView.png",
    title: "Day",
    description: "All the day’s details, notes, lodging and schedule.",
  },
  {
    src: "/assets/iOS_Routing.png",
    title: "Trips",
    description: "See every stop and time between locations.",
  },
  {
    src: "/assets/iOS_Calendar.png",
    title: "Calendar",
    description: "A color‑coded monthly view for quick scanning.",
  },
];

export default function IOSViewsSection() {
  return (
    <Section
      background="darkBlue"
      gap="xl"
      size="xl"
      padded={false}
      className=""
      containerClassName=""
      aria-label="iOS views gallery"
    >
      <div className="flex w-full flex-col gap-10 lg:gap-14">
        <div className="px-6 sm:px-8 md:px-12">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-center">
            Four ways to view your work
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 px-6 sm:px-8 md:px-12">
          {VIEWS.map((view) => (
            <div key={view.title} className="flex flex-col items-center">
              <div className="w-full max-w-[320px] bg-white/5 ring-1 ring-white/10 overflow-hidden">
                <div className="relative w-full aspect-[9/10] md:aspect-[9/11] overflow-hidden">
                  <div className="absolute inset-0 top-0 overflow-hidden">
                    <Image
                      src={view.src}
                      alt={view.title}
                      fill
                      priority={false}
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 text-left px-3">
                <h3 className="text-white text-lg font-semibold">
                  {view.title}
                </h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  {view.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
