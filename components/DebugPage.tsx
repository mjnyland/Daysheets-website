"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function Phone({ scrollProgress }: { scrollProgress: number }) {
  const { scene } = useGLTF("/models/DayView3D6.glb");
  const meshRef = useRef<THREE.Object3D>(null);

  useGSAP(() => {
    if (!meshRef.current) return;

    gsap.set(meshRef.current.rotation, {
      x: Math.PI / 2 + scrollProgress * Math.PI * 0.5,
      y: scrollProgress * Math.PI * 2,
      z: scrollProgress * Math.PI * 0.25,
    });
  }, [scrollProgress]);

  return <primitive ref={meshRef} object={scene} scale={1} />;
}

export default function DebugPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        markers: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(Math.round(progress * 100));
          setTimelineProgress(Math.round(progress * 100));
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="w-full h-dvh bg-[#030720]">
      {/* HUD */}
      <div className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-4 space-y-3 min-w-[200px]">
        <div className="text-white">
          <div className="text-xs opacity-60 uppercase tracking-wide mb-1">
            Scroll Progress
          </div>
          <div className="text-2xl font-mono font-bold">{scrollProgress}%</div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-2">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-100"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

        <div className="text-white border-t border-white/20 pt-3">
          <div className="text-xs opacity-60 uppercase tracking-wide mb-1">
            Timeline Progress
          </div>
          <div className="text-2xl font-mono font-bold">
            {timelineProgress}%
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-2">
            <div
              className="bg-green-500 h-full rounded-full transition-all duration-100"
              style={{ width: `${timelineProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Canvas */}
      <Canvas camera={{ position: [0, 0, 50], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Phone scrollProgress={scrollProgress / 100} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}
