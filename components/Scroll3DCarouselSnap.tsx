"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// Individual 3D phone component
function Phone3D({ index }: { index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Give each phone a unique color
  const colors = ["#8b5cf6", "#3b82f6", "#10b981", "#f97316", "#ec4899"];
  const color = colors[index % colors.length];
  
  return (
    <mesh ref={meshRef}>
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

// Container for all 3D phones with snapping
function PhoneCarousel() {
  const groupRef = useRef<THREE.Group>(null);
  const iterationRef = useRef(0);
  const scrubRef = useRef<gsap.core.Tween | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const seamlessLoopRef = useRef<gsap.core.Timeline | null>(null);
  
  useGSAP(() => {
    if (!groupRef.current) return;
    
    const phones = groupRef.current.children as THREE.Mesh[];
    if (phones.length === 0) return;
    
    // ============================================
    // Configuration
    // ============================================
    const spacing = 0.1; // spacing between phone animations
    const snap = gsap.utils.snap(spacing);
    
    // ============================================
    // Build the seamless loop (matching original logic)
    // ============================================
    const buildSeamlessLoop = (items: THREE.Mesh[], spacing: number) => {
      const overlap = Math.ceil(1 / spacing); // 10 extra animations on each side
      const startTime = items.length * spacing + 0.5;
      const loopTime = (items.length + overlap) * spacing + 1;
      const rawSequence = gsap.timeline({ paused: true });
      const seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1, // Infinite repeat
        onRepeat() {
          // @ts-ignore
          if (this._time === this._dur) {
            // @ts-ignore
            this._tTime += this._dur - 0.01;
          }
        }
      });
      
      const totalItems = items.length + overlap * 2; // 5 + 10 + 10 = 25 total
      
      // Set initial state for all phones (matching original)
      items.forEach((phone) => {
        if (phone.material && 'opacity' in phone.material) {
          (phone.material as THREE.MeshStandardMaterial).opacity = 0;
        }
        gsap.set(phone.position, { x: 20, z: 0 }); // Start far right
        gsap.set(phone.scale, { x: 0, y: 0, z: 0 });
      });
      
      // Create animations for each phone (including overlaps for seamless loop)
      for (let i = 0; i < totalItems; i++) {
        const index = i % items.length; // Wrap around to reuse phones
        const item = items[index];
        const time = i * spacing;
        
        // Combined scale and opacity with yoyo (peak in middle)
        rawSequence.fromTo(
          item.scale,
          { x: 0, y: 0, z: 0 },
          {
            x: 1,
            y: 1, 
            z: 1,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power1.in",
            immediateRender: false
          },
          time
        );
        
        // Opacity animation with yoyo
        rawSequence.fromTo(
          item.material,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power1.in",
            immediateRender: false
          },
          time
        );
        
        // Position animation - move from right to left
        rawSequence.fromTo(
          item.position,
          { x: 20 }, // Start position far right
          {
            x: -20, // End position far left
            duration: 1,
            ease: "none",
            immediateRender: false
          },
          time
        );
        
        // Z-index equivalent for 3D (bring forward when visible)
        rawSequence.fromTo(
          item.position,
          { z: -2 },
          {
            z: 2,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power1.in",
            immediateRender: false
          },
          time
        );
        
        if (i <= items.length) {
          seamlessLoop.add(`label${i}`, time);
        }
      }
      
      // Set up seamless scrubbing
      rawSequence.time(startTime);
      seamlessLoop
        .to(rawSequence, {
          time: loopTime,
          duration: loopTime - startTime,
          ease: "none"
        })
        .fromTo(
          rawSequence,
          { time: overlap * spacing + 1 },
          {
            time: startTime,
            duration: startTime - (overlap * spacing + 1),
            immediateRender: false,
            ease: "none"
          }
        );
      
      return seamlessLoop;
    };
    
    // Build the seamless loop timeline
    const seamlessLoop = buildSeamlessLoop(phones, spacing);
    seamlessLoopRef.current = seamlessLoop;
    
    // Create scrub tween for smooth scrolling
    const scrub = gsap.to(seamlessLoop, {
      totalTime: 0,
      duration: 0.5,
      ease: "power3",
      paused: true
    });
    scrubRef.current = scrub;
    
    // ============================================
    // Wrap functions for infinite scrolling
    // ============================================
    const wrapForward = (trigger: ScrollTrigger) => {
      iterationRef.current++;
      // @ts-ignore
      trigger.wrapping = true;
      trigger.scroll(trigger.start + 1);
    };
    
    const wrapBackward = (trigger: ScrollTrigger) => {
      iterationRef.current--;
      if (iterationRef.current < 0) {
        iterationRef.current = 9;
        seamlessLoop.totalTime(seamlessLoop.totalTime() + seamlessLoop.duration() * 10);
        scrub.pause();
      }
      // @ts-ignore
      trigger.wrapping = true;
      trigger.scroll(trigger.end - 1);
    };
    
    // ============================================
    // Create ScrollTrigger with snapping
    // ============================================
    const trigger = ScrollTrigger.create({
      trigger: "#carousel-3d-snap-container",
      start: "top top",
      end: "+=3000",
      pin: true,
      onUpdate(self) {
        // @ts-ignore
        if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
          wrapForward(self);
        // @ts-ignore
        } else if (self.progress < 1e-5 && self.direction < 0 && !self.wrapping) {
          wrapBackward(self);
        } else {
          // Snap to nearest phone
          scrub.vars.totalTime = snap(
            (iterationRef.current + self.progress) * seamlessLoop.duration()
          );
          scrub.invalidate().restart();
          // @ts-ignore
          self.wrapping = false;
        }
      }
    });
    triggerRef.current = trigger;
    
    // Cleanup
    return () => {
      trigger.kill();
      seamlessLoop.kill();
      scrub.kill();
    };
  });
  
  return (
    <group ref={groupRef}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Phone3D key={i} index={i} />
      ))}
    </group>
  );
}

// Button controls component
function CarouselControls() {
  const handleNext = () => {
    // Access the scrub tween and advance by one spacing
    const spacing = 0.1;
    const scrubElement = document.querySelector('[data-scrub-time]');
    if (scrubElement) {
      const currentTime = parseFloat(scrubElement.getAttribute('data-scrub-time') || '0');
      // Trigger scroll to next position
      window.scrollBy(0, 100);
    }
  };
  
  const handlePrev = () => {
    // Access the scrub tween and go back by one spacing
    window.scrollBy(0, -100);
  };
  
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
      <button
        onClick={handlePrev}
        className="px-6 py-3 bg-white/10 backdrop-blur text-white rounded-full hover:bg-white/20 transition"
      >
        Prev
      </button>
      <button
        onClick={handleNext}
        className="px-6 py-3 bg-white/10 backdrop-blur text-white rounded-full hover:bg-white/20 transition"
      >
        Next
      </button>
    </div>
  );
}

export default function Scroll3DCarouselSnap() {
  return (
    <>
      {/* Intro Section */}
      <div className="h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">3D Carousel with Snapping</h2>
          <p className="text-xl">Scroll to snap between 3D models</p>
          <p className="text-sm mt-2 opacity-70">Infinite loop with smooth snapping</p>
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
        id="carousel-3d-snap-container"
        className="h-screen bg-gradient-to-b from-black to-gray-900 relative"
      >
        <Canvas
          camera={{
            position: [0, 0, 15], // Moved back to see wider area
            fov: 60, // Wider field of view
            near: 0.1,
            far: 100,
          }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          {/* The carousel */}
          <PhoneCarousel />
        </Canvas>
        
        {/* Controls */}
        <CarouselControls />
        
        {/* Info text */}
        <div className="absolute top-4 left-4 text-white bg-black/50 px-4 py-2 rounded">
          <p className="text-sm">3D Carousel with Snapping & Infinite Loop</p>
        </div>
      </div>

      {/* Outro Section */}
      <div className="h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">Keep Scrolling!</h2>
          <p className="text-xl mt-4">The carousel loops infinitely</p>
        </div>
      </div>
    </>
  );
}