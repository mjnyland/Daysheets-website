"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/containers/Section";
import {
  Bus,
  Calendar,
  Building,
  Plane,
  Users,
  Route,
  FileText,
  Clock,
  MapPin,
  Phone,
  CreditCard,
  Package,
  Settings,
  Camera,
  Utensils,
  Music,
  Shield,
  Briefcase,
  Ticket,
  Wifi,
} from "lucide-react";

const carouselItems = [
  {
    id: "transfers",
    label: "Transfers",
    icon: Bus,
    color: "bg-blue-500",
  },
  {
    id: "events",
    label: "Events",
    icon: Calendar,
    color: "bg-blue-500",
  },
  {
    id: "hotels",
    label: "Hotels",
    icon: Building,
    color: "bg-blue-500",
  },
  {
    id: "flights",
    label: "Flights",
    icon: Plane,
    color: "bg-blue-500",
  },
  {
    id: "personnel",
    label: "Personnel",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    id: "routing",
    label: "Routing",
    icon: Route,
    color: "bg-blue-500",
  },
  {
    id: "notes",
    label: "Notes",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    id: "schedule",
    label: "Schedule",
    icon: Clock,
    color: "bg-blue-500",
  },
  {
    id: "venues",
    label: "Venues",
    icon: MapPin,
    color: "bg-blue-500",
  },
  {
    id: "contacts",
    label: "Contacts",
    icon: Phone,
    color: "bg-blue-500",
  },
  {
    id: "expenses",
    label: "Expenses",
    icon: CreditCard,
    color: "bg-blue-500",
  },
  {
    id: "cargo",
    label: "Cargo",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    id: "equipment",
    label: "Equipment",
    icon: Settings,
    color: "bg-blue-500",
  },
  {
    id: "media",
    label: "Media",
    icon: Camera,
    color: "bg-blue-500",
  },
  {
    id: "catering",
    label: "Catering",
    icon: Utensils,
    color: "bg-blue-500",
  },
  {
    id: "production",
    label: "Production",
    icon: Music,
    color: "bg-blue-500",
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    color: "bg-blue-500",
  },
];

export function MobileEditingCarousel() {
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const animate = () => {
      if (!isPaused) {
        setRotation((prev) => (prev + 0.2) % 360);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  const getItemPosition = (index: number, totalItems: number) => {
    // Evenly space items around the full circle
    const angleSpacing = 360 / totalItems;
    const angle = angleSpacing * index - rotation - 90;
    const radius = 400; // Large radius so items get cropped at edges
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;

    // Calculate opacity and scale based on x position (items on left are emphasized)
    // Normalize x position: -1 (far left) to 1 (far right)
    const normalizedX = -x / radius;

    // Only show items on the left side (emphasis area), hide others
    const opacity = normalizedX > 0 ? 0.3 + normalizedX * 0.7 : 0;
    const scale = 0.6 + (normalizedX + 1) * 0.4;

    // Calculate z-index based on x position (leftmost items on top)
    const zIndex = Math.round((normalizedX + 1) * 10);

    return { x, y, opacity, scale, zIndex };
  };

  return (
    <Section background="dark" className="overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-20 lg:gap-20 items-center min-h-[600px]">
        {/* Left Content */}
        <div className="space-y-6">
          <span className="text-blue-400 text-sm font-medium">
            Mobile Editing
          </span>
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-medium text-white leading-tight">
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
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
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
                    transform: `translate(-50%, -50%) translate3d(${position.x}px, ${position.y}px, 0) scale(${position.scale})`,
                    opacity: position.opacity,
                    zIndex: position.zIndex,
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
                        fontSize: `${0.875 + position.scale * 0.25}rem`,
                        opacity: position.opacity,
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
