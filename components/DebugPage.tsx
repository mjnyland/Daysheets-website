"use client";

import { Canvas } from "@react-three/fiber";
import { useRef, useLayoutEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function PhoneCarousel() {
  const groupRef = useRef<THREE.Group>(null!);

  useLayoutEffect(() => {
    if (!groupRef.current) return;

    const phoneCount = 5;
    const angleStep = (2 * Math.PI) / phoneCount;
    let iteration = 0;
    const spacing = 1 / phoneCount; // spacing per phone
    const snap = gsap.utils.snap(spacing);

    // Build raw sequence (each phone centered once)
    const rawSequence = gsap.timeline({ paused: true });
    for (let i = 0; i < phoneCount; i++) {
      rawSequence.to(
        groupRef.current.rotation,
        { y: -i * angleStep, duration: 0.5, ease: "power2.inOut" },
        i * spacing,
      );
    }

    // Scrub tween
    const scrub = gsap.to(rawSequence, {
      totalTime: 0,
      duration: 0.3,
      ease: "power3",
      paused: true,
    });

    // ScrollTrigger
    ScrollTrigger.create({
      trigger: "#scroll-section",
      start: "top top",
      end: "+=400%",
      pin: true,
      scrub: true,
      markers: true,
      onUpdate(self) {
        // map scroll progress -> nearest phone
        scrub.vars.totalTime = snap(
          (iteration + self.progress) * rawSequence.duration(),
        );
        scrub.invalidate().restart();
      },
    });
  }, []);

  return (
    <group ref={groupRef}>
      {/* Dummy cubes instead of phones for now */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const x = Math.sin(angle) * 10;
        const z = Math.cos(angle) * 10;
        return (
          <mesh key={i} position={[x, 0, z]}>
            <boxGeometry args={[2, 4, 0.2]} />
            <meshStandardMaterial color={i === 0 ? "hotpink" : "skyblue"} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function DebugPage() {
  return (
    <div
      id="scroll-section"
      className="relative w-full h-dvh bg-gradient-to-b from-[#030720] to-[#0a0f2e]"
    >
      <Canvas camera={{ position: [0, 0, 25], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <PhoneCarousel />
      </Canvas>
    </div>
  );
}
