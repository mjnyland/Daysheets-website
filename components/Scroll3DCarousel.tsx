"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// Individual 3D "card" component
function Phone3D({
  index,
  totalPhones,
}: {
  index: number;
  totalPhones: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Give each phone a unique color
  const colors = ["#8b5cf6", "#3b82f6", "#10b981", "#f97316"];
  const color = colors[index % colors.length];

  return (
    <mesh ref={meshRef}>
      {/* Simple phone-like shape */}
      <boxGeometry args={[2, 4, 0.2]} />
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.4}
        transparent
      />
    </mesh>
  );
}

// Container for all 3D phones
function PhoneCarousel() {
  const groupRef = useRef<THREE.Group>(null);
  const phonesRef = useRef<THREE.Mesh[]>([]);

  useGSAP(() => {
    if (!groupRef.current) return;

    // ============================================
    // Get all phone meshes from the group's children
    // ============================================
    const phones = groupRef.current.children as THREE.Mesh[];

    if (phones.length === 0) return;

    // ============================================
    // Configuration for circular carousel
    // ============================================
    const radius = 4; // Distance from center
    const phoneCount = phones.length;
    const angleStep = (Math.PI * 2) / phoneCount; // Divide circle equally

    // ============================================
    // Set initial state - phones arranged in a circle
    // ============================================
    phones.forEach((phone, index) => {
      // Ensure material is transparent
      if (phone.material && "transparent" in phone.material) {
        (phone.material as THREE.MeshStandardMaterial).transparent = true;
      }

      // Calculate initial position on circle
      const initialAngle = index * angleStep;
      const x = radius * Math.sin(initialAngle);
      const z = radius * Math.cos(initialAngle);

      gsap.set(phone.position, {
        x: x,
        y: 0,
        z: z,
      });

      // Face the center
      gsap.set(phone.rotation, {
        y: -initialAngle,
      });

      // Start with phones behind being invisible
      const initialOpacity = z > 0 ? 1 : 0;
      gsap.set(phone.material, {
        opacity: initialOpacity,
      });

      // Scale based on z position (front = bigger, back = smaller)
      const initialScale = z > 0 ? 1 : 0.8;
      gsap.set(phone.scale, {
        x: initialScale,
        y: initialScale,
        z: initialScale,
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
      },
    });

    // ============================================
    // Animate the entire carousel rotating
    // ============================================

    // Create a full rotation animation
    phones.forEach((phone, index) => {
      // Each phone needs to complete a full circle
      const startAngle = index * angleStep;

      // We'll animate a proxy object to track the angle
      const angleTracker = { angle: startAngle };

      tl.to(
        angleTracker,
        {
          angle: startAngle + Math.PI * 2, // Full rotation
          duration: 1,
          ease: "none",
          onUpdate: function () {
            const currentAngle = angleTracker.angle;

            // Calculate position on circle
            const x = radius * Math.sin(currentAngle);
            const z = radius * Math.cos(currentAngle) * -1;

            gsap.set(phone.position, {
              x: x,
              z: z,
            });

            // Rotate phone to face center
            gsap.set(phone.rotation, {
              y: -currentAngle,
            });

            // Opacity based on z position (fade in front, fade out back)
            const opacity =
              z > -2 ? Math.max(0, (z + radius) / (radius * 2)) : 0;
            gsap.set(phone.material, {
              opacity: opacity,
            });

            // Scale based on z position (perspective effect)
            const scale = 0.7 + (z + radius) / (radius * 4);
            gsap.set(phone.scale, {
              x: scale,
              y: scale,
              z: scale,
            });
          },
        },
        0,
      ); // All start at time 0 to rotate together
    });
  }); // Removed scope since we're working with Three.js objects, not DOM

  return (
    <group ref={groupRef}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Phone3D key={i} index={i} totalPhones={5} />
      ))}
    </group>
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
            fov: 70,
          }}
        >
          {/* Lighting */}
          <ambientLight intensity={5} />
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
