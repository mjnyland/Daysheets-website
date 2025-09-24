"use client"; // must be the first line — literally line 1, column 1

import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type * as THREE from "three";
import { PhoneCarousel } from "./PhoneCarousel";

gsap.registerPlugin(ScrollTrigger);

export default function Scroll3DCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [group, setGroup] = useState<THREE.Group | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!group) return;
    const r = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(r);
  }, [group]);

  useGSAP(
    (ctx) => {
      if (!sectionRef.current || !ready) return;

      const ST_ID = "phones-3d";
      ScrollTrigger.getById(ST_ID)?.kill();

      const tl = gsap.timeline({
        scrollTrigger: {
          id: ST_ID,
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 4,
          pin: sectionRef.current,
          scrub: true,
          markers: true,
          anticipatePin: 1,
          refreshPriority: 1,
        },
      });

      ctx.add(() => tl);
      ScrollTrigger.refresh();
    },
    { scope: sectionRef, dependencies: [ready] },
  );

  return (
    <div ref={sectionRef} className="relative h-dvh">
      <Canvas
        className="absolute inset-0 h-dvh w-full"
        camera={{ position: [0, 0, 10], fov: 30 }}
      >
        <ambientLight intensity={10} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <PhoneCarousel onReady={setGroup} />
      </Canvas>
    </div>
  );
}
