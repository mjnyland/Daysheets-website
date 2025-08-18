"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    // Create ScrollSmoother
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 0.8,
      effects: true,
      smoothTouch: 0.1,
    });

    smootherRef.current = smoother;

    // after creating `smoother`
    const doRefresh = () => ScrollTrigger.refresh();
    const onRefresh = () => smoother?.refresh();

    window.addEventListener("load", doRefresh, { once: true });
    document.fonts?.ready.then(doRefresh);

    ScrollTrigger.addEventListener("refresh", onRefresh);

    // double RAF to ensure first-paint sync
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => {
      window.removeEventListener("load", doRefresh);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      smoother?.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
