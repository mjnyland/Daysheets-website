"use client";

import { useState, useEffect, useRef } from "react";
import { Section } from "@/components/containers/Section";
import Image from "next/image";

interface VisibilityOption {
  id: string;
  title: string;
  videoUrl?: string;
  imageUrl?: string;
}

const visibilityOptions: VisibilityOption[] = [
  {
    id: "crew-party",
    title: "Crew Party",
    videoUrl: "/videos/visibility_1.mp4",
  },
  {
    id: "vip-access",
    title: "VIP Access",
    videoUrl: "/videos/visibility_1.mp4",
  },
  {
    id: "public-info",
    title: "Public Information",
    videoUrl: "/videos/visibility_1.mp4",
  },
  {
    id: "team-only",
    title: "Team Only",
    videoUrl: "/videos/visibility_1.mp4",
  },
];

export const VisibilityOptions = () => {
  const [activeOption, setActiveOption] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const SLIDE_DURATION = 5000; // 5 seconds per slide
  const PROGRESS_UPDATE_INTERVAL = 50; // Update progress every 50ms for smooth animation

  useEffect(() => {
    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    // Reset progress when slide changes
    setProgress(0);

    // Always start progress animation (whether auto-playing or manual)
    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(newProgress);
    }, PROGRESS_UPDATE_INTERVAL);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [activeOption]);

  // Handle auto-advance in a separate effect
  useEffect(() => {
    if (progress >= 100 && isAutoPlaying) {
      setActiveOption((prev) => (prev + 1) % visibilityOptions.length);
    }
  }, [progress, isAutoPlaying]);

  const handleOptionClick = (index: number) => {
    // Clear auto-play timeout if it exists
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }

    // Change to the selected option
    setActiveOption(index);
    setIsAutoPlaying(false);

    // Resume auto-play after 10 seconds of inactivity
    autoPlayTimeoutRef.current = setTimeout(
      () => setIsAutoPlaying(true),
      10000
    );
  };

  const currentOption = visibilityOptions[activeOption];

  return (
    <Section
      id="visibility-options"
      background="muted"
      className={`relative transition-all duration-1000 overflow-hidden`}
      gap="md"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 ">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-medium text-gray-900 mb-4">
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
        <div className="flex flex-col gap-8 items-center">
          {/* Video/Content Area */}
          <div className="w-full">
            <div className="relative h-[500px] rounded-2xl">
              {currentOption.videoUrl ? (
                <video
                  key={currentOption.id}
                  src={currentOption.videoUrl}
                  className="w-full h-full object-contain"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : currentOption.imageUrl ? (
                <Image
                  key={currentOption.id}
                  src={currentOption.imageUrl}
                  alt={currentOption.title}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                  <div className="text-gray-500 text-center">
                    <p className="text-2xl mb-2">Video Coming Soon</p>
                    <p className="text-sm">Video for {currentOption.title}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dots Navigation and Description */}
          <div className="w-full  flex flex-col items-center gap-6">
            {/* Dots Navigation */}
            <div className="flex gap-3 ">
              {visibilityOptions.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(index)}
                  className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeOption
                      ? "bg-blue-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to ${option.title}`}
                >
                  {index === activeOption && (
                    <div
                      className="absolute inset-0 rounded-full bg-blue-600 opacity-30 animate-ping"
                      style={{
                        animationDuration: `${SLIDE_DURATION}ms`,
                      }}
                    />
                  )}
                  {/* Progress indicator for active dot */}
                  {index === activeOption && (
                    <svg
                      className="absolute -inset-1 w-5 h-5"
                      viewBox="0 0 20 20"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${progress * 0.5} 100`}
                        strokeLinecap="round"
                        transform="rotate(-90 10 10)"
                        className="text-blue-600 transition-all duration-100 ease-linear"
                      />
                    </svg>
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
