"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Section } from "@/components/containers/Section";
import {
  Bus,
  Calendar,
  Building,
  Plane,
  Users,
  User,
  Route,
  FileText,
  Clock,
  MapPin,
  Table,
  Settings,
} from "lucide-react";

const carouselItems = [
  { id: "notes", label: "Notes", icon: FileText, color: "bg-blue-500" },
  { id: "events", label: "Events", icon: Calendar, color: "bg-blue-500" },
  { id: "template", label: "Template", icon: Settings, color: "bg-blue-500" },
  { id: "hotels", label: "Hotels", icon: Building, color: "bg-blue-500" },
  { id: "flights", label: "Flights", icon: Plane, color: "bg-blue-500" },
  { id: "transfers", label: "Transfers", icon: Bus, color: "bg-blue-500" },
  { id: "routing", label: "Routing", icon: Route, color: "bg-blue-500" },
  { id: "day-types", label: "Day Types", icon: Clock, color: "bg-blue-500" },
  {
    id: "associations",
    label: "Associations",
    icon: Users,
    color: "bg-blue-500",
  },
  { id: "personnel", label: "Personnel", icon: User, color: "bg-blue-500" },
  {
    id: "travel-profiles",
    label: "Travel Profiles",
    icon: MapPin,
    color: "bg-blue-500",
  },
  {
    id: "flight-grid",
    label: "Flight Grid",
    icon: Table,
    color: "bg-blue-500",
  },
];

export function MobileEditingCarousel() {
  const [rotation, setRotation] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationProxyRef = useRef<{ value: number }>({ value: 0 });
  const spinTweenRef = useRef<gsap.core.Tween | null>(null);

  // Set isClient flag after mount to avoid hydration mismatches
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simple always-rotating carousel using GSAP
  useEffect(() => {
    if (!isClient) return;

    const proxy = rotationProxyRef.current;
    proxy.value = 0;

    // One full rotation every ~30s, linear, infinite
    spinTweenRef.current = gsap.to(proxy, {
      value: 360,
      duration: 30,
      ease: "none",
      repeat: -1,
      onUpdate: () => setRotation(proxy.value % 360),
    });

    return () => {
      if (spinTweenRef.current) {
        spinTweenRef.current.kill();
        spinTweenRef.current = null;
      }
    };
  }, [isClient]);

  const handleMouseEnter = () => {
    if (spinTweenRef.current) spinTweenRef.current.pause();
  };

  const handleMouseLeave = () => {
    if (spinTweenRef.current) spinTweenRef.current.resume();
  };

  const getItemPosition = (index: number, totalItems: number) => {
    // Return static positions during SSR to avoid hydration mismatches
    if (!isClient) {
      // During SSR, return static initial positions
      const angleSpacing = 360 / totalItems;
      const angle = angleSpacing * index - 90;
      const radius = 400;
      const x =
        Math.round(Math.cos((angle * Math.PI) / 180) * radius * 100) / 100;
      const y =
        Math.round(Math.sin((angle * Math.PI) / 180) * radius * 100) / 100;
      const normalizedX = -x / radius;
      const opacity =
        normalizedX > 0 ? Math.round((0.3 + normalizedX * 0.7) * 100) / 100 : 0;
      const scale = Math.round((0.6 + (normalizedX + 1) * 0.4) * 100) / 100;
      const zIndex = Math.round((normalizedX + 1) * 10);
      return { x, y, opacity, scale, zIndex };
    }

    // Evenly space items around the full circle
    const angleSpacing = 360 / totalItems;
    const angle = angleSpacing * index - rotation - 90;
    const radius = 400; // Large radius so items get cropped at edges
    const x =
      Math.round(Math.cos((angle * Math.PI) / 180) * radius * 100) / 100;
    const y =
      Math.round(Math.sin((angle * Math.PI) / 180) * radius * 100) / 100;

    // Calculate opacity and scale based on x position (items on left are emphasized)
    // Normalize x position: -1 (far left) to 1 (far right)
    const normalizedX = -x / radius;

    // Only show items on the left side (emphasis area), hide others
    const opacity =
      Math.round((normalizedX > 0 ? 0.3 + normalizedX * 0.7 : 0) * 100) / 100;
    const scale = Math.round((0.6 + (normalizedX + 1) * 0.4) * 100) / 100;

    // Calculate z-index based on x position (leftmost items on top)
    const zIndex = Math.round((normalizedX + 1) * 10);

    return { x, y, opacity, scale, zIndex };
  };

  return (
    <Section
      background="darkBlue"
      className="overflow-hidden"
      gap="none"
      size="xl"
    >
      <div className="grid lg:grid-cols-2 gap-20 lg:gap-20 items-center min-h-[600px] relative py-20">
        {/* Top gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-40 z-50 pointer-events-none bg-gradient-to-b from-[#030720] to-transparent" />
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-40 z-50 pointer-events-none bg-gradient-to-t from-[#030720] to-transparent" />
        {/* Left Content */}
        <div className="space-y-6">
          <div className="">
            <span className="text-blue-400 text-md font-medium sp">
              Mobile Editing
            </span>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-left text-white">
              Edit everything.
              <br />
              Right from mobile.
            </h2>
            <p className="text-gray-400 text-lg max-w-md">
              Daysheets is fully editable on mobile, letting you update, manage,
              and organize everything quickly from your phone or tablet.
            </p>
          </div>
          <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Get Started for free
          </button>
        </div>

        {/* Right Carousel */}
        <div className="relative h-[600px] flex items-center justify-center">
          <div
            ref={containerRef}
            className="relative w-full h-full ml-80"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Carousel Items */}
            {carouselItems.map((item, index) => {
              const position = getItemPosition(index, carouselItems.length);
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="absolute left-1/2 top-1/2 transition-all duration-300 ease-out cursor-pointer"
                  style={{
                    transform: `translate(-50%, -50%) translate3d(${position.x}px, ${position.y}px, 0px) scale(${position.scale})`,
                    opacity: String(position.opacity),
                    zIndex: String(position.zIndex),
                  }}
                >
                  <div className="flex flex-row items-center gap-3 group">
                    <div
                      className={`${item.color} p-3 rounded-2xl shadow-2xl group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span
                      className="text-white font-medium whitespace-nowrap"
                      style={{
                        fontSize: `${
                          Math.round((0.875 + position.scale * 0.25) * 1000) /
                          1000
                        }rem`,
                        opacity: String(position.opacity),
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
