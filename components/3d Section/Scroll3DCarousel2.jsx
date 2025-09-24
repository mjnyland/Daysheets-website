import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Model } from "./DayViewModel";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function Cube() {
  return (
    <mesh position={[0, 0, -5]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function PhoneCarousel({ scrollProgress, isSnapping }) {
  const groupRef = useRef();
  const phoneRefs = useRef([]);
  const phoneCount = 6;
  const radius = 8;
  const angleStep = (Math.PI * 2) / phoneCount;

  useFrame(() => {
    if (groupRef.current) {
      // Rotate entire carousel
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2;
    }

    // Find which phone is closest to camera (highest z position in world space)
    if (phoneRefs.current.length > 0) {
      let maxZ = -Infinity;
      let centeredIndex = 0;

      phoneRefs.current.forEach((phone, i) => {
        if (phone) {
          // Get world position
          const worldPos = new THREE.Vector3();
          phone.getWorldPosition(worldPos);

          if (worldPos.z > maxZ) {
            maxZ = worldPos.z;
            centeredIndex = i;
          }
        }
      });

      // Scale phones based on which is centered
      phoneRefs.current.forEach((phone, i) => {
        if (phone) {
          const targetScale = i === centeredIndex && isSnapping ? 0.65 : 0.5;
          phone.scale.x += (targetScale - phone.scale.x) * 0.1;
          phone.scale.y += (targetScale - phone.scale.y) * 0.1;
          phone.scale.z += (targetScale - phone.scale.z) * 0.1;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {Array.from({ length: phoneCount }).map((_, i) => {
        const angle = i * angleStep;
        const x = radius * Math.sin(angle);
        const z = radius * Math.cos(angle);

        return (
          <Model
            key={i}
            ref={(el) => (phoneRefs.current[i] = el)}
            scale={0.5}
            position={[x, 0, z]}
            rotation={[0, angle, 0]}
          />
        );
      })}
    </group>
  );
}

export default function Scroll3DCarousel2() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSnapping, setIsSnapping] = useState(false);

  const phoneCount = 6;

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=400%",
      pin: true,
      scrub: true,
      markers: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        setIsSnapping(false); // Reset scale when scrolling
      },
      snap: {
        snapTo: 1 / phoneCount, // Snap to each phone position
        duration: { min: 0.2, max: 0.6 },
        delay: 0.1,
        ease: "power2.inOut",
        onComplete: () => setIsSnapping(true),
      },
    });
  });

  return (
    <div
      ref={sectionRef}
      className="relative h-dvh  bg-gradient-to-b from-gray-900 to-black"
    >
      Stick
      <Canvas>
        <PerspectiveCamera makeDefault fov={80} position={[0, 0, 10]} />
        <ambientLight intensity={2} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {/* <Cube />*/}
        <PhoneCarousel
          scrollProgress={scrollProgress}
          isSnapping={isSnapping}
        />
      </Canvas>
    </div>
  );
}
