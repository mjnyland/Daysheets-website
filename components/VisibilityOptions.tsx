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
    videoUrl: "/videos/visibility_2.mp4",
  },
  {
    id: "public-info",
    title: "Public Information",
    videoUrl: "/videos/visibility_3.mp4",
  },
];

export const VisibilityOptions = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video end event
  const handleVideoEnded = () => {
    // Move to next video, loop back to 0 after last video
    setCurrentVideoIndex((prev) => {
      const nextIndex = prev + 1;
      return nextIndex >= visibilityOptions.length ? 0 : nextIndex;
    });
  };

  // When video index changes, reset and play the new video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload the video with new source
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, [currentVideoIndex]);

  const currentOption = visibilityOptions[currentVideoIndex];

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
              {/* Single video element with dynamic source */}
              {currentOption.videoUrl ? (
                <video
                  ref={videoRef}
                  key={currentVideoIndex} // Force remount when index changes
                  src={currentOption.videoUrl}
                  className="absolute inset-0 w-full h-full lg:object-cover object-contain"
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnded}
                />
              ) : currentOption.imageUrl ? (
                <Image
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
