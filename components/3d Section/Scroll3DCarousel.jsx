import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Model as DayViewModel } from "./DayViewModel";
import { Model as CalendarViewModel } from "./CalendarViewModel";
import { Model as MapViewModel } from "./MapViewModel";
import { Model as RoutingViewModel } from "./RoutingViewModel";
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

function PhoneCarousel({ scrollProgress }) {
  const groupRef = useRef();
  const phoneRefs = useRef([]);
  const phoneCount = 4;
  const radius = 8;
  const angleStep = (Math.PI * 2) / phoneCount;
  const lastLogRef = useRef(0);

  // Array of different model components to cycle through
  const modelComponents = [
    DayViewModel,
    CalendarViewModel,
    MapViewModel,
    RoutingViewModel,
  ];

  useFrame(() => {
    if (groupRef.current) {
      // Rotate entire carousel
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2;
    }

    // Scale phones based on scroll progress ranges
    // When carousel rotates, it brings different phones to front:
    // scrollProgress 0.00 (0°) = Phone 0 (Day)
    // scrollProgress 0.25 (90°) = Phone 3 (Routing)
    // scrollProgress 0.50 (180°) = Phone 2 (Map)
    // scrollProgress 0.75 (270°) = Phone 1 (Calendar)

    // Since the carousel rotates counter-clockwise, the order is reversed
    const normalizedScroll = ((scrollProgress % 1) + 1) % 1; // Ensure positive

    let frontIndex = 0;
    if (normalizedScroll >= 0.125 && normalizedScroll < 0.375) {
      frontIndex = 3; // Routing (centered at 0.25)
    } else if (normalizedScroll >= 0.375 && normalizedScroll < 0.625) {
      frontIndex = 2; // Map (centered at 0.50)
    } else if (normalizedScroll >= 0.625 && normalizedScroll < 0.875) {
      frontIndex = 1; // Calendar (centered at 0.75)
    } else {
      frontIndex = 0; // Day (covers 0-0.125 and 0.875-1, centered at 0)
    }

    phoneRefs.current.forEach((phone, i) => {
      if (phone) {
        const targetScale = i === frontIndex ? 0.65 : 0.5;

        // Throttled debug logging - only log once per second
        const now = Date.now();
        if (now - lastLogRef.current > 3000 && (i === 1 || i === 3)) {
          console.log(
            `Phone ${i}: scrollProgress=${scrollProgress.toFixed(3)}, normalized=${normalizedScroll.toFixed(3)}, frontIndex=${frontIndex}, shouldScale=${i === frontIndex}, targetScale=${targetScale}`,
          );
          if (i === 3) lastLogRef.current = now;
        }

        phone.scale.x += (targetScale - phone.scale.x) * 0.1;
        phone.scale.y += (targetScale - phone.scale.y) * 0.1;
        phone.scale.z += (targetScale - phone.scale.z) * 0.1;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {Array.from({ length: phoneCount }).map((_, i) => {
        const angle = i * angleStep;
        const x = radius * Math.sin(angle);
        const z = radius * Math.cos(angle);
        const ModelComponent = modelComponents[i];

        return (
          <ModelComponent
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
  const [centeredIndex, setCenteredIndex] = useState(0);
  const phoneCount = 4;

  // Model titles for display
  const modelTitles = ["Day View", "Routing View", "Map", "Calendar View"];
  const modelDescriptions = [
    "Manage your daily operations with a view of all flights, crew, and logistics in one streamlined interface.",
    "Optimize your tour routing with smart suggestions based on traffic, weather, and venue requirements.",
    "Visualize your tour routes on an interactive map with real-time updates and location tracking.",
    "Keep your entire tour organized with our intelligent calendar that syncs across all devices and team members.",
  ];

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=400%",
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        setIsSnapping(false); // Reset scale when scrolling

        // Calculate which phone is centered based on scroll progress
        // Each phone takes up 25% of the scroll (1/4)
        const normalizedProgress = self.progress % 1; // Normalize to 0-1
        const index = Math.round(normalizedProgress * phoneCount) % phoneCount;
        setCenteredIndex(index);
      },
      snap: {
        snapTo: (value) => {
          // Determine which phone position to snap to based on current scroll
          const positions = [0, 0.25, 0.5, 0.75, 1]; // Positions for each phone

          // Find the closest position
          let closest = positions[0];
          let minDiff = Math.abs(value - positions[0]);

          for (let i = 1; i < positions.length; i++) {
            const diff = Math.abs(value - positions[i]);
            if (diff < minDiff) {
              minDiff = diff;
              closest = positions[i];
            }
          }

          return closest;
        },
        duration: { min: 0.1, max: 0.3 },
        delay: 0.1,
        ease: "power2.inOut",
        onComplete: () => setIsSnapping(true),
      },
    });
  });

  return (
    <div
      ref={sectionRef}
      className="relative h-dvh  bg-gradient-to-b from-gray-900 to-black py-24"
    >
      <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] justify-center h-full gap-0">
        <div className="row-start-1 row-end-2">
          <div className="vo-badge text-sm sm:text-sm md:text-base font-medium tracking-tight text-center text-white bg-blue-500 px-4 py-2 rounded-full mb-4 w-fit mx-auto">
            Custom Views
          </div>
          {/* Header */}
          <div className="text-center">
            <h2 className="vo-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-center text-white">
              View your tour
              <br />
              from every angle.
            </h2>
          </div>
        </div>
        <div className="flex justify-center h-full row-start-2 row-end-3">
          <Canvas className="h-full">
            <PerspectiveCamera makeDefault fov={60} position={[0, 0, 10]} />
            <ambientLight intensity={2} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            {/* <Cube />*/}
            <PhoneCarousel
              scrollProgress={scrollProgress}
              isSnapping={isSnapping}
              centeredIndex={centeredIndex}
            />
          </Canvas>
        </div>
        <div
          className="flex flex-col justify-center items-center mx-auto p-12 row-start-3 row-end-4 max-w-xl text-center absolute left-1/2 -translate-x-1/2 bottom-8
          bg-gradient-to-t from-black to-transparent rounded-xl"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
            {modelTitles[centeredIndex]}
          </h3>
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            {modelDescriptions[centeredIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}
