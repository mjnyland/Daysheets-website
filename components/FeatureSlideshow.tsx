"use client";

import { useState, useEffect, useRef } from "react";
import { Section } from "@/components/containers/Section";
import Image from "next/image";

interface Feature {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
}

const features: Feature[] = [
  {
    id: "day-view",
    title: "Day View",
    description:
      "Add 100+ seats in seconds, with section, row, and seat numbers ready to go.",
    imageUrl: "/assets/dayview.png",
  },
  {
    id: "personnel",
    title: "Personnel",
    description:
      "View every available ticket in one place, with real-time updates as you assign seats.",
    imageUrl: "/assets/dayview.png",
  },
  {
    id: "routing",
    title: "Multi-day Routing",
    description:
      "Distribute tickets instantly, without double-booking or manual errors.",
    imageUrl: "/assets/dayview.png",
  },
];

export const FeatureSlideshow = () => {
  const [activeFeature, setActiveFeature] = useState(0);
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
  }, [activeFeature]);

  // Handle auto-advance in a separate effect
  useEffect(() => {
    if (progress >= 100 && isAutoPlaying) {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }
  }, [progress, isAutoPlaying]);

  const handleFeatureClick = (index: number) => {
    // Clear auto-play timeout if it exists
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }

    // Change to the selected feature
    setActiveFeature(index);
    setIsAutoPlaying(false);

    // Resume auto-play after 10 seconds of inactivity
    autoPlayTimeoutRef.current = setTimeout(
      () => setIsAutoPlaying(true),
      10000
    );
  };

  const currentFeature = features[activeFeature];

  return (
    <Section
      id="features-slideshow"
      className={`relative min-h-[80vh] transition-all duration-1000 overflow-hidden`}
      size="xl"
      gap="md"
    >
      <div className="relative z-10 mx-auto px-4 flex flex-col gap-0 ">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-center text-white">
            The most complete touring solution.
          </h2>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-col  items-start">
          <div className="w-full space-y-4 flex flex-col justify-center md:flex-row gap-3">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => handleFeatureClick(index)}
                className={`flex flex-col relative w-full text-left p-4 rounded-xl transition-all duration-300 overflow-hidden h-full ${
                  index === activeFeature
                    ? "bg-white/20 backdrop-blur-md border-2 border-white/30"
                    : "bg-white/10 backdrop-blur-sm border-2 border-transparent hover:bg-white/15"
                }`}
              >
                <h3 className="text-lg font-semibold text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-white/90 text-sm md:text-base">
                  {feature.description}
                </p>

                {/* Animated progress line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div
                    className={`h-full bg-white ${
                      index === activeFeature
                        ? "transition-all duration-100 ease-linear"
                        : ""
                    }`}
                    style={{
                      width: index === activeFeature ? `${progress}%` : "0%",
                      transition: index === activeFeature ? undefined : "none",
                    }}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Video/Content Area */}
          <div className="w-full">
            <div className="relative aspect-[1250/822] rounded-2xl overflow-hidden">
              {currentFeature.videoUrl ? (
                <video
                  key={currentFeature.id}
                  src={currentFeature.videoUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : currentFeature.imageUrl ? (
                <Image
                  key={currentFeature.id}
                  src={currentFeature.imageUrl}
                  alt={currentFeature.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white/50 text-center">
                    <p className="text-2xl mb-2">Video Coming Soon</p>
                    <p className="text-sm">Video for {currentFeature.title}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
