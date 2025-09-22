"use client";

import { Canvas } from "@react-three/fiber";
import { Billboard, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function Phone({
  object,
  position,
}: {
  object: THREE.Object3D;
  position: [number, number, number];
}) {
  const phone = useMemo(() => object.clone(true), [object]);

  return (
    <Billboard follow position={position} scale={0.8}>
      <primitive object={phone} />
    </Billboard>
  );
}

function PhoneCarousel({
  groupRef,
}: {
  groupRef: React.RefObject<THREE.Group | null>;
}) {
  const phoneCount = 5;
  const radius = 10;
  const angleStep = (2 * Math.PI) / phoneCount;

  // Load models once
  const { scene: model1 } = useGLTF("/models/DayView3D9.glb");
  const { scene: model2 } = useGLTF("/models/DayView3D9.glb");
  const { scene: model3 } = useGLTF("/models/DayView3D9.glb");
  const { scene: model4 } = useGLTF("/models/DayView3D9.glb");
  const { scene: model5 } = useGLTF("/models/DayView3D9.glb");

  const models = [model1, model2, model3, model4, model5];

  return (
    <group ref={groupRef}>
      {models.map((model, i) => {
        const angle = i * angleStep;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        return <Phone key={i} object={model} position={[x, 0, z]} />;
      })}
    </group>
  );
}

export default function DebugPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLDivElement[]>([]);
  const carouselRef = useRef<THREE.Group | null>(null);

  const sections = [
    {
      title: "Schedule View",
      description: "Your entire month at a glance with color-coded events",
    },
    {
      title: "Smart Categories",
      description: "AI-powered organization that learns your patterns",
    },
    {
      title: "Team Sync",
      description: "Real-time collaboration with your entire team",
    },
    {
      title: "Analytics",
      description: "Insights and metrics to optimize your time",
    },
    {
      title: "Integrations",
      description: "Works seamlessly with all your favorite tools",
    },
  ];
  useGSAP(() => {
    if (!sectionRef.current) return;

    const phoneCount = 5;
    const angleStep = (2 * Math.PI) / phoneCount;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=500%",
      pin: true,
      scrub: 1, // continuous motion
      markers: true,
      snap: {
        snapTo: (value) => {
          const index = Math.round(value * (phoneCount - 1));
          console.log(
            "📌 SnapTo progress:",
            value.toFixed(2),
            "=> phone index:",
            index,
          );
          return index / (phoneCount - 1);
        },
        duration: { min: 0.15, max: 0.25 }, // quick settle
        delay: 0,
        ease: "power1.out",
      },
      onUpdate: (self) => {
        // 🚀 always rotate continuously with scroll
        const rotation = -self.progress * Math.PI * 2;
        carouselRef.current!.rotation.y = rotation;

        const sectionIndex = Math.round(self.progress * (phoneCount - 1));
        console.log(
          "Progress:",
          self.progress.toFixed(2),
          "Rotation:",
          rotation.toFixed(2),
          "Nearest phone:",
          sectionIndex,
        );
      },
      onSnapComplete: (self) => {
        // ✅ final settle so a phone is perfectly centered
        const index = Math.round(self.progress * (phoneCount - 1));
        const targetRotation = -(index * angleStep);

        console.log(
          "✅ Settled on phone index:",
          index,
          "Rotation:",
          targetRotation.toFixed(2),
        );

        gsap.to(carouselRef.current!.rotation, {
          y: targetRotation,
          duration: 0.2,
          ease: "power1.out",
        });
      },
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      id="scroll-section"
      className="relative w-full bg-gradient-to-b from-[#030720] to-[#0a0f2e] h-dvh"
    >
      {/* Section Indicators */}
      <div className="fixed top-1/2 right-8 -translate-y-1/2 z-50 space-y-4">
        {sections.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index
                ? "bg-white scale-125"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 60], fov: 25 }}
        className="!absolute inset-0 h-screen w-screen"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <pointLight position={[0, 20, 0]} intensity={0.5} />

        <Suspense fallback={null}>
          <PhoneCarousel groupRef={carouselRef} />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          target={[0, 0, 0]}
        />
      </Canvas>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm animate-pulse">
        Scroll to explore
      </div>

      {/* Section Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
        {sections.map((section, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) textRefs.current[index] = el;
            }}
            className="absolute text-center max-w-md"
          >
            <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
            <p className="text-lg">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
