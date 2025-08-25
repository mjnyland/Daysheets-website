"use client";

import { useState, useEffect, useRef } from "react";
import { Section } from "@/components/containers/Section";

interface VideoSection {
  id: string;
  title: string;
}

const videoSections: VideoSection[] = [
  { id: "crew-party", title: "Crew Party" },
  { id: "vip-access", title: "VIP Access" },
  { id: "public-info", title: "Public Information" },
];

const SECTION_LENGTH_SECONDS = 3;

export const VisibilityOptions = () => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle clicking on a dot to jump to that section
  const handleSectionClick = (index: number) => {
    const video = videoRef.current;
    if (!video) return;
    const targetTime = index * SECTION_LENGTH_SECONDS + 0.001;
    video.currentTime = targetTime;
    setActiveSectionIndex(index);
    video.play();
  };

  const handleNextClick = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextIndex = (activeSectionIndex + 1) % videoSections.length;
    const targetTime = nextIndex * SECTION_LENGTH_SECONDS + 0.001;
    video.currentTime = targetTime;
    setActiveSectionIndex(nextIndex);
    video.play();
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const idx =
      Math.floor(video.currentTime / SECTION_LENGTH_SECONDS) %
      videoSections.length;
    if (idx !== activeSectionIndex) setActiveSectionIndex(idx);
  };

  return (
    <Section
      id="visibility-options"
      background="light"
      className={`relative transition-all duration-1000 overflow-hidden`}
      gap="xl"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 ">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-center text-gray-900">
            A personalized experience
            <br />
            for everyone on tour.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Decide exactly who can see what. Keep things public, private,
            <br />
            or shared with select people — your content, your rules.
          </p>
        </div>

        {/* Main Content Area with Dots Navigation */}
        <div className="flex flex-col gap-8 items-center max-w-4xl mx-auto">
          {/* Video/Content Area */}
          <div className="w-full">
            <div className="relative h-[500px] rounded-2xl overflow-hidden lg:border-2 border-gray-200/50 bg-gray-100">
              {/* Single master video */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full lg:object-cover object-contain"
                autoPlay
                muted
                playsInline
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                loop
                aria-hidden="true"
              >
                <source src="/videos/visibility_master.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              {videoSections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleSectionClick(index)}
                  className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeSectionIndex
                      ? "bg-blue-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to ${section.title}`}
                >
                  {index === activeSectionIndex && (
                    <div className="absolute inset-0 rounded-full bg-blue-600 opacity-30 animate-ping" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-blue-50 to-transparent rounded-full blur-3xl animate-pulse opacity-50" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-50 to-transparent rounded-full blur-3xl animate-pulse delay-1000 opacity-50" />
      </div>
    </Section>
  );
};
