"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/containers/Section";
gsap.registerPlugin(ScrollTrigger);

interface VideoSection {
  id: string;
  title: string;
}

const videoSections: VideoSection[] = [
  { id: "crew-party", title: "Crew Party" },
  { id: "vip-access", title: "VIP Access" },
  { id: "public-info", title: "Public Information" },
];

const SECTION_LENGTH_SECONDS = 6;

export const VisibilityOptions = () => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const sectionCopy: string[] = [
    "Share with a specific group. Crew, VIP, or Local Team.",
    "Post to multiple groups at once. Mix roles to match your flow.",
    "Share with an individual. Give precise, private access.",
  ];

  // Smooth progress updater using requestAnimationFrame
  useEffect(() => {
    const updateWithRaf = () => {
      const video = videoRef.current;
      if (video) {
        const currentTime = video.currentTime;
        const idx =
          Math.floor(currentTime / SECTION_LENGTH_SECONDS) %
          videoSections.length;
        setActiveSectionIndex(idx);

        const sectionStartTime = idx * SECTION_LENGTH_SECONDS;
        const elapsedInSection = Math.max(0, currentTime - sectionStartTime);
        const progressRatio = Math.min(
          1,
          elapsedInSection / SECTION_LENGTH_SECONDS,
        );
        setSectionProgress(progressRatio);
      }
      rafIdRef.current = requestAnimationFrame(updateWithRaf);
    };

    rafIdRef.current = requestAnimationFrame(updateWithRaf);
    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Animate the descriptive copy on section change
  useEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 4 },
      { autoAlpha: 1, y: 0, duration: 0.25, ease: "power2.out" },
    );
  }, [activeSectionIndex]);

  // Scroll-driven subtle fade-ins when section enters viewport
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const tryPlayVideo = () => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          // Ignore autoplay restrictions errors; user interaction will trigger play later
        });
      }
    };
    const ctx = gsap.context(() => {
      gsap.set(
        [".vo-badge", ".vo-heading", ".vo-video", ".vo-copy", ".vo-controls"],
        {
          autoAlpha: 0,
          y: 12,
        },
      );

      const tl = gsap.timeline({
        defaults: { duration: 0.4, ease: "power2.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          once: true,
          onEnter: () => {
            tryPlayVideo();
          },
        },
      });

      tl.to(".vo-badge", { autoAlpha: 1, y: 0 })
        .to(".vo-heading", { autoAlpha: 1, y: 0 }, "-=0.2")
        .to(".vo-video", { autoAlpha: 1, y: 0 }, "-=0.1")
        .to(".vo-copy", { autoAlpha: 1, y: 0 }, "-=0.1")
        .to(".vo-controls", { autoAlpha: 1, y: 0 }, "-=0.1");
    }, root);

    return () => ctx.revert();
  }, []);

  // Handle clicking on a dot to jump to that section
  const handleSectionClick = (index: number) => {
    const video = videoRef.current;
    if (!video) return;
    const targetTime = index * SECTION_LENGTH_SECONDS + 0.001;
    video.currentTime = targetTime;
    setActiveSectionIndex(index);
    video.play();
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const idx =
      Math.floor(video.currentTime / SECTION_LENGTH_SECONDS) %
      videoSections.length;
    if (idx !== activeSectionIndex) setActiveSectionIndex(idx);

    const sectionStartTime = idx * SECTION_LENGTH_SECONDS;
    const elapsedInSection = Math.max(0, video.currentTime - sectionStartTime);
    const progressRatio = Math.min(
      1,
      elapsedInSection / SECTION_LENGTH_SECONDS,
    );
    setSectionProgress(progressRatio);
  };

  return (
    <Section
      id="visibility-options"
      background="light"
      className={`relative transition-all duration-1000 overflow-hidden`}
      gap="xl"
    >
      <div
        ref={rootRef}
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 "
      >
        <div className="vo-badge text-sm sm:text-sm md:text-base font-medium tracking-tight text-center text-white bg-blue-500 px-4 py-2 rounded-full mb-4 w-fit mx-auto">
          Custom Visibility
        </div>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="vo-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-center text-gray-900">
            A personalized experience
            <br />
            for everyone on tour.
          </h2>
        </div>

        {/* Main Content Area with Dots Navigation */}
        <div className="flex flex-col gap-8 items-center max-w-4xl mx-auto">
          {/* Video/Content Area */}
          <div className="w-full">
            <div className="vo-video relative h-[500px] rounded-2xl overflow-hidden lg:border-2 border-gray-200/50 bg-gray-100">
              {/* Single master video */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full lg:object-cover object-contain"
                src="/videos/visibility_master.mp4"
                preload="metadata"
                autoPlay
                muted
                playsInline
                loop
                onLoadedMetadata={() => {
                  const video = videoRef.current;
                  if (!video) return;
                  video.muted = true;
                  const p = video.play();
                  if (p && typeof p.then === "function") {
                    p.catch(() => {});
                  }
                }}
                onTimeUpdate={handleTimeUpdate}
                aria-hidden="true"
              />
            </div>
          </div>

          <p
            ref={copyRef}
            key={activeSectionIndex}
            className="vo-copy text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mt-4"
          >
            {sectionCopy[activeSectionIndex]}
          </p>

          {/* Controls */}
          <div className="vo-controls flex items-center gap-4 w-[240px]">
            <div className="flex items-center gap-3 bg-slate-100 p-4 rounded-full w-full">
              {videoSections.map((section, index) => {
                const isActive = index === activeSectionIndex;
                if (isActive) {
                  return (
                    <div
                      key={section.id}
                      className="relative h-3 w-full rounded-full bg-slate-400 overflow-hidden shadow-inner"
                      role="progressbar"
                      aria-label={`${section.title} progress`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.round(sectionProgress * 100)}
                    >
                      <div
                        className="absolute left-0 top-0 h-full bg-white"
                        style={{ width: `${sectionProgress * 100}%` }}
                      />
                    </div>
                  );
                }
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleSectionClick(index)}
                    className={`relative w-[16px] h-[12px] rounded-full transition-colors duration-200 bg-slate-400 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400`}
                    aria-label={`Go to ${section.title}`}
                  />
                );
              })}
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
