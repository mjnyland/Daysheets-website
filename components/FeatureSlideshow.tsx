"use client";

import { useState, useEffect, useRef } from "react";
import { Section } from "@/components/containers/Section";

interface Feature {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  backgroundColor: string;
}

const features: Feature[] = [
  {
    id: "day-view",
    title: "Day View",
    description:
      "Add 100+ seats in seconds, with section, row, and seat numbers ready to go.",
    videoUrl: "/videos/day-view.mp4",
    backgroundColor: "from-blue-500 to-cyan-500",
  },
  {
    id: "personnel",
    title: "Personnel",
    description:
      "View every available ticket in one place, with real-time updates as you assign seats.",
    videoUrl: "/videos/personnel.mp4",
    backgroundColor: "from-cyan-500 to-teal-500",
  },
  {
    id: "routing",
    title: "Multi-day Routing",
    description:
      "Distribute tickets instantly, without double-booking or manual errors.",
    videoUrl: "/videos/routing.mp4",
    backgroundColor: "from-teal-500 to-blue-500",
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
    // Reset progress when slide changes
    setProgress(0);

    if (!isAutoPlaying) return;

    // Start progress animation
    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        setActiveFeature((prev) => (prev + 1) % features.length);
      }
    }, PROGRESS_UPDATE_INTERVAL);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [activeFeature, isAutoPlaying]);

  const handleFeatureClick = (index: number) => {
    // Clear any existing intervals
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }

    setActiveFeature(index);
    setIsAutoPlaying(false);
    setProgress(0);

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
      className={`relative min-h-[80vh] bg-gradient-to-br ${currentFeature.backgroundColor} transition-all duration-1000 overflow-hidden`}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white ">
            The most complete touring solution.
          </h2>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-col  gap-4  items-start">
          <div className="w-full space-y-4 flex flex-col justify-center md:flex-row gap-3">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => handleFeatureClick(index)}
                className={`flex flex-col relative w-full text-left p-6 rounded-xl transition-all duration-300 overflow-hidden h-full ${
                  index === activeFeature
                    ? "bg-white/20 backdrop-blur-md border-2 border-white/30"
                    : "bg-white/10 backdrop-blur-sm border-2 border-transparent hover:bg-white/15"
                }`}
              >
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/90 text-sm md:text-base">
                  {feature.description}
                </p>

                {/* Animated progress line */}
                {index === activeFeature && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div
                      className="h-full bg-white transition-all duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Video/Content Area */}
          <div className="w-full">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm">
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

        {/* Progress Indicators */}
        <div className="flex justify-center mt-12 gap-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => handleFeatureClick(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === activeFeature
                  ? "w-12 bg-white"
                  : "w-6 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-white/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </Section>
  );
};
