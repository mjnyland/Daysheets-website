import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);

export default function Phone3dScroll() {
  const container = useRef<HTMLDivElement>(null); // ✅ type the ref

  useGSAP(
    () => {
      if (!container.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(".card");

      // Build the master timeline
      const tl = gsap.timeline({ paused: true });
      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { xPercent: 100, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 1, ease: "power2.out" },
          i * 0.3, // spacing
        );
      });

      // Hook timeline to scroll
      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "+=3000",
        scrub: true,
        pin: true,
        animation: tl,
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="h-dvh bg-blue-500">
      <div className="box">Hello world</div>
    </div>
  );
}
