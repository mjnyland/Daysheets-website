"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// Preload the model
useGLTF.preload("/models/DayView3D9.glb");

// Individual 3D phone component using GLB model
function Phone3D({
  index,
  totalPhones,
}: {
  index: number;
  totalPhones: number;
}) {
  const { scene } = useGLTF("/models/DayView3D9.glb");
  const groupRef = useRef<THREE.Group>(null);

  // Clone the scene for each instance
  const clonedScene = scene.clone();

  return (
    <primitive
      ref={groupRef}
      object={clonedScene}
      // Scale down more since the model is large
      scale={[0.15, 0.15, 0.15]}
      // Rotate 180 degrees to show the front (screen side)
    />
  );
}

// Container for all 3D phones
function PhoneCarousel() {
  const groupRef = useRef<THREE.Group>(null!);

  useGSAP(() => {
    console.log(groupRef.current);
    if (!groupRef.current) return;

    // Wait a bit for models to load
    setTimeout(() => {
      // ============================================
      // Get all phone models from the group's children
      // ============================================
      // Now that Suspense is outside, children should be the phone groups directly
      const phones = groupRef.current.children;

      console.log("Found phones:", phones.length);
      if (phones.length === 0) {
        console.log("No phones found!");
        return;
      }

      // ============================================
      // Configuration for circular carousel
      // ============================================
      const radius = 2; // Increased distance from center for larger models
      const phoneCount = phones.length;
      const angleStep = (Math.PI * 2) / phoneCount; // Divide circle equally

      // ============================================
      // Set initial state - phones arranged in a circle
      // ============================================
      phones.forEach((phone, index) => {
        // Calculate initial position on circle
        const initialAngle = index * angleStep;
        const x = radius * Math.sin(initialAngle);
        const z = radius * Math.cos(initialAngle);

        gsap.set(phone.position, {
          x: x,
          y: 0,
          z: z,
        });

        // Face inward toward center (toward camera)
        gsap.set(phone.rotation, {
          y: initialAngle,
        });
      });

      // ============================================
      // Create main timeline with ScrollTrigger
      // ============================================

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#carousel-3d-container",
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          markers: true,
          snap: {
            snapTo: 1 / phoneCount, // Snap to each phone position
            duration: { min: 0.2, max: 0.6 }, // Snap animation duration
            delay: 0.1, // Delay before snapping
            ease: "power2.inOut",
            onComplete: () => {
              // When snap completes, find the phone with highest z (closest to camera)
              const progress = tl.scrollTrigger.progress;

              // Find the phone with the maximum z position (closest to camera)
              let maxZ = -Infinity;
              let actualCenteredIndex = 0;

              phones.forEach((phone, i) => {
                if (phone.position.z > maxZ) {
                  maxZ = phone.position.z;
                  actualCenteredIndex = i;
                }
              });

              console.log("=== SNAP COMPLETE ===");
              console.log("Progress:", progress);
              console.log("Phone with max z (centered):", actualCenteredIndex);
              console.log("Max z value:", maxZ.toFixed(2));

              // Reset all phones to normal scale
              phones.forEach((phone, i) => {
                // Log z position to see which is actually in front
                const z = phone.position.z;
                const isCentered = i === actualCenteredIndex;
                console.log(
                  `Phone ${i}: z=${z.toFixed(2)}, centered=${isCentered}`,
                );

                if (isCentered) {
                  // Scale up the centered phone
                  gsap.to(phone.scale, {
                    x: 0.17,
                    y: 0.17,
                    z: 0.17,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                } else {
                  // Scale down other phones
                  gsap.to(phone.scale, {
                    x: 0.15,
                    y: 0.15,
                    z: 0.15,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }
              });
            },
          },
        },
      });

      // ============================================
      // Animate the entire carousel rotating with snapping
      // ============================================

      // Create a single master rotation that all phones follow
      const masterRotation = { angle: 0 };

      // Create discrete sections for each phone to be centered
      for (let i = 0; i < phoneCount; i++) {
        const sectionProgress = i / phoneCount;
        const targetAngle = i * angleStep;

        tl.to(
          masterRotation,
          {
            angle: targetAngle,
            duration: 1 / phoneCount, // Each section takes equal time
            ease: "none",
            onUpdate: function () {
              // Update all phones based on master rotation
              phones.forEach((phone, phoneIndex) => {
                const phoneStartAngle = phoneIndex * angleStep;
                const currentAngle = phoneStartAngle + masterRotation.angle;

                // Calculate position on circle
                const x = radius * Math.sin(currentAngle);
                const z = radius * Math.cos(currentAngle);

                gsap.set(phone.position, {
                  x: x,
                  z: z,
                });

                // Rotate phone to face inward (toward camera)
                gsap.set(phone.rotation, {
                  y: currentAngle,
                });
              });
            },
          },
          sectionProgress, // Position this section at the right time
        );
      }
    }, 100); // Give models time to load
  }); // Removed scope since we're working with Three.js objects, not DOM

  return (
    <Suspense fallback={null}>
      <group ref={groupRef}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Phone3D key={i} index={i} totalPhones={6} />
        ))}
      </group>
    </Suspense>
  );
}

export default function Scroll3DCarousel() {
  return (
    <>
      {/* Intro Section */}
      <div className="h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">3D Scroll Carousel</h2>
          <p className="text-xl">Scroll down to see 3D models animate</p>
          <div className="mt-8 animate-bounce">
            <svg
              className="w-6 h-6 mx-auto text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 3D Carousel Section - This gets pinned */}
      <div
        id="carousel-3d-container"
        className="h-screen bg-gradient-to-b from-black to-gray-900 relative"
      >
        <Canvas
          camera={{
            position: [0, 0, 10],
            fov: 30,
          }}
        >
          {/* Lighting */}
          <ambientLight intensity={10} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />

          {/* The carousel */}
          <PhoneCarousel />
        </Canvas>

        {/* Optional: Debug text */}
        <div className="absolute top-4 left-4 text-white bg-black/50 px-4 py-2 rounded">
          <p className="text-sm">3D Carousel with GSAP ScrollTrigger</p>
        </div>
      </div>

      {/* Outro Section */}
      <div className="h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">Animation Complete!</h2>
          <p className="text-xl mt-4">Scroll back up to see it again</p>
        </div>
      </div>
    </>
  );
}
