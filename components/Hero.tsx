"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Section } from "@/components/containers/Section";
import Logo from "@/assets/DaysheetsLogo@3x.png";
import HeroImage from "@/assets/hero img.png";
import NavBar from "@/components/NavBar";
import { AnimatedGradientBg } from "@/components/backgrounds/AnimatedGradientBg";
import gsap from "gsap";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      // Initial states
      gsap.set(bgRef.current, { opacity: 0, scale: 1.1 });
      gsap.set(navRef.current, { opacity: 0, y: -20 });
      gsap.set(logoRef.current, { opacity: 0, scale: 0 });
      gsap.set(headingRef.current, {
        opacity: 0,
        y: 30,
        clipPath: "inset(0 100% 0 0)",
      });
      gsap.set(subtextRef.current, { opacity: 0, y: 20 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20, scale: 0.9 });
      gsap.set(imageContainerRef.current, { opacity: 0, y: 60, scale: 0.95 });
      if (glassRef.current)
        gsap.set(glassRef.current, { opacity: 0, scale: 0.8, y: 40 });

      // Background fade in with scale
      tl.to(
        bgRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.inOut",
        },
        0
      );

      // Navigation slides down
      tl.to(
        navRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        0.2
      );

      // Logo animation with rotation and scale
      tl.to(
        logoRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        0.3
      );

      // Heading reveal with clip-path animation
      tl.to(
        headingRef.current,
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0% 0 0)",
          duration: 1,
          ease: "power3.out",
        },
        0.5
      );

      // Add text shimmer effect
      tl.to(
        headingRef.current,
        {
          backgroundPosition: "200% center",
          duration: 2,
          ease: "power2.inOut",
        },
        0.8
      );

      // Subtext fade up
      tl.to(
        subtextRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
        },
        0.7
      );

      // CTA button bounce in
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        0.8
      );

      // Glass element animates in first
      if (glassRef.current) {
        tl.to(
          glassRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          0.6
        );
      }

      // Hero image slides up with scale
      tl.to(
        imageContainerRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        0.8
      );

      // Add subtle float animation to hero image
      tl.to(
        imageContainerRef.current,
        {
          y: -10,
          duration: 3,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        },
        2
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      ref={containerRef}
      id="hero"
      gap="md"
      className="relative overflow-hidden bg-gradient-to-b from-[#050548] to-[#050548] sm:h-[80dvh] md:h-[80dvh] lg:h-[100dvh] min-h-[400px] md:min-h-[800px] max-h-[1900px] flex items-center"
    >
      {/* Animated gradient background */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <AnimatedGradientBg />
      </div>

      {/* Navigation */}
      <div ref={navRef} className="absolute top-0 left-0 right-0 z-20">
        <NavBar theme="dark" />
      </div>

      <div className="relative z-10 w-full  grid grid-cols-1 grid-rows-[auto_1fr_auto]">
        <div className=" min-h-60"></div>
        {/* Hero content */}
        <div className="relative z-10 w-full ">
          <div className="text-center space-y-2 ">
            <div
              ref={logoRef}
              className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-4"
            >
              <Image src={Logo} alt="Daysheets" width={64} height={64} />
            </div>
            <h1
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tighter text-white  drop-shadow-[0_2px_16px_rgba(59,130,246,0.25)] bg-[length:200%_auto] py-1"
            >
              The New Standard for
              <br />
              Tour Management.
            </h1>
            <div ref={subtextRef} className="">
              <p className="text-xl text-blue-100">
                Plan Tours. Book Travel. All in One Place. <br />
                Logistics just got 10x easier.
              </p>
            </div>
            <button
              ref={ctaRef}
              className="relative inline-flex items-center justify-center px-8 py-4 mt-8 text-xl font-medium text-white rounded-xl  bg-[#0967D2] hover:scale-105  hover:shadow-[0_10px_35px_rgba(37,99,235,0.45)] "
            >
              Get Started for free
            </button>
          </div>
        </div>
        {/* Hero image - positioned absolutely at the bottom */}
        <div className="mt-10">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div ref={imageContainerRef} className="relative w-full ">
              {/* Glass-like element behind mockups */}
              <div
                ref={glassRef}
                className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[60%] w-[105%] -z-10  bg-white/20 backdrop-blur-md rounded-t-3xl border-[2px] border-white/10 shadow-2xl shadow-blue-900/20  translate-y-8"
              />
              <Image
                src={HeroImage}
                alt="Daysheets platform interface"
                width={1920}
                height={1080}
                priority
                className="z-20"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
