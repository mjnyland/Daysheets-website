"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

// Register the plugin once, outside of the component function.
gsap.registerPlugin(ScrollTrigger);

export default function StickyPhoneSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current, // Use the ref directly
        start: "top top",
        end: "bottom bottom",
        pin: true,
        markers: true, // Keep markers for debugging
      });
    },
    { scope: sectionRef }
  ); // Scope the animations to the ref

  return (
    <>
      {/* Spacer content to enable scrolling */}
      <div className="h-[200vh] bg-gray-200">
        <p className="p-4">Scroll down to see the section pin.</p>
      </div>

      {/* The pinned section */}
      <div ref={sectionRef} className="h-[500px]">
        <div className="h-full w-full bg-red-100 flex items-center justify-center">
          <p className="text-xl">This section is pinned!</p>
        </div>
      </div>

      {/* Another spacer for the 'end' point of the trigger */}
      <div className="h-[200vh] bg-gray-200">
        <p className="p-4">Scroll past here to unpin.</p>
      </div>
    </>
  );
}
