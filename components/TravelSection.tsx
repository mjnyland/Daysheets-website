import Image from "next/image";
import { Section } from "@/components/containers/Section";

export const TravelSection = () => {
  return (
    <Section background="subtle" gap="xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              You can even pick your hotels with Daysheets Travel
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-neutral-700">
            Plan Tours. Book Travel. All in One Place.
            <br />
            Logistics just got 10x easier.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
            Learn more about DS Travel
          </button>
        </div>
        <div className="relative">
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