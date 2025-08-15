'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PhoneScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    const container = containerRef.current;
    
    if (!video || !section || !container) return;

    // Ensure video is loaded before setting up ScrollTrigger
    video.load();
    
    const setupScrollTrigger = () => {
      // Set initial video state
      video.pause();
      video.currentTime = 0;

      // Create ScrollTrigger for video scrubbing
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        pin: container,
        scrub: 1,
        onUpdate: (self) => {
          if (video.duration) {
            // Scrub through video based on scroll progress
            video.currentTime = video.duration * self.progress;
          }
        }
      });
    };

    // Wait for video metadata to load
    if (video.readyState >= 1) {
      setupScrollTrigger();
    } else {
      video.addEventListener('loadedmetadata', setupScrollTrigger);
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[300vh] bg-gradient-to-b from-gray-50 to-white"
    >
      <div 
        ref={containerRef}
        className="flex h-screen"
      >
        {/* Left side - Sticky iPhone */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="relative w-[400px] h-[800px]">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              src="/videos/DaysheetsiPhoneMockup.mov"
              playsInline
              muted
              preload="auto"
            />
          </div>
        </div>

        {/* Right side - Scrolling content */}
        <div className="w-1/2 flex items-center">
          <div className="max-w-lg px-12">
            <div className="space-y-32">
              <div className="opacity-0 animate-fadeIn animation-delay-200">
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Your Schedule at a Glance
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  See your entire month laid out beautifully. Color-coded events make it easy to understand your schedule instantly.
                </p>
              </div>

              <div className="opacity-0 animate-fadeIn animation-delay-400">
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Smart Organization
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Automatically categorized events with intelligent grouping. Never miss an important meeting or deadline again.
                </p>
              </div>

              <div className="opacity-0 animate-fadeIn animation-delay-600">
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Seamless Sync
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Works with all your calendars. Google, Outlook, iCloud - everything in one beautiful interface.
                </p>
              </div>

              <div className="opacity-0 animate-fadeIn animation-delay-800">
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Travel Time Built In
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Intelligent travel time calculations ensure you're never late. Get notifications when it's time to leave.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}