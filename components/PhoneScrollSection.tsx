"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/containers/Section";

gsap.registerPlugin(ScrollTrigger);

export default function PhoneScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLDivElement[]>([]);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    const container = containerRef.current;
    const texts = textRefs.current;
    const videoContainer = videoContainerRef.current;

    if (!video || !section || !container || !videoContainer) return;

    // Entrance animation for video container
    gsap.fromTo(
      videoContainer,
      {
        scale: 0.9,
        y: 10,
        transformOrigin: "center bottom",
        opacity: 0,
      },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: videoContainer,
          start: "top 100%",
          end: "top 30%",
          scrub: 1,
        },
      }
    );

    // Ensure video is loaded before setting up ScrollTrigger
    video.load();

    const setupScrollTrigger = () => {
      // Set initial video state
      video.pause();
      video.currentTime = 0;

      // Hide all text sections initially
      gsap.set(texts, { opacity: 0, y: 50 });

      // Create pinned container
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: container,
        scrub: 1,
      });

      // Add video scrubbing
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          if (video.duration) {
            video.currentTime = video.duration * self.progress;
          }
        },
      });

      // Animate text sections in sequence
      texts.forEach((text, index) => {
        const start = index * 0.25; // Each text appears at 25% intervals
        const end = start + 0.25;

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            if (progress >= start && progress < end) {
              // Fade in current text
              gsap.to(text, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
              });
            } else if (progress < start) {
              // Hide future texts
              gsap.to(text, {
                opacity: 0,
                y: 50,
                duration: 0.3,
              });
            } else {
              // Fade out past texts
              gsap.to(text, {
                opacity: 0,
                y: -50,
                duration: 0.3,
              });
            }
          },
        });
      });
    };

    // Wait for video metadata to load
    if (video.readyState >= 1) {
      setupScrollTrigger();
    } else {
      video.addEventListener("loadedmetadata", setupScrollTrigger);
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Section
      ref={sectionRef}
      as="section"
      background="dark"
      gap="md"
      size="lg"
      padded={false}
      className="relative min-h-[300vh]"
      containerClassName="h-full"
      id="phone-scroll-section"
    >
      <div ref={containerRef} className="flex flex-col h-screen ">
        <div className="text-center pt-20 pb-0">
          <h1 className="text-6xl font-semibold text-white tracking-tight">
            Your team will thank you.
          </h1>
        </div>
        <div className="flex items-center ">
          {/* Left side - Sticky iPhone */}
          <div className="w-2/3 flex items-center justify-center">
            <div ref={videoContainerRef} className="relative w-[400px]">
              <video
                ref={videoRef}
                className="w-full h-full object-contain pb-16"
                src="/videos/DaysheetsiPhoneMockup.mov"
                playsInline
                muted
                preload="auto"
              />
            </div>
          </div>
          {/* Right side - Scrolling content */}
          <div className="w-1/3 flex items-center ">
            <div className="px-12 relative h-[300px]  w-[400px]">
              <div
                ref={(el) => {
                  if (el) textRefs.current[0] = el;
                }}
                className="absolute inset-0 flex flex-col justify-center "
              >
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Your Schedule at a Glance
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  See your entire month laid out beautifully. Color-coded events
                  make it easy to understand your schedule instantly.
                </p>
              </div>
              <div
                ref={(el) => {
                  if (el) textRefs.current[1] = el;
                }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Smart Organization
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Automatically categorized events with intelligent grouping.
                  Never miss an important meeting or deadline again.
                </p>
              </div>
              <div
                ref={(el) => {
                  if (el) textRefs.current[2] = el;
                }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Seamless Sync
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Works with all your calendars. Google, Outlook, iCloud -
                  everything in one beautiful interface.
                </p>
              </div>
              <div
                ref={(el) => {
                  if (el) textRefs.current[3] = el;
                }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Travel Time Built In
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Intelligent travel time calculations ensure you&apos;re never
                  late. Get notifications when it&apos;s time to leave.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
