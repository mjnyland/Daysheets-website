"use client";

import { useEffect, useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Jamie Cortez",
    role: "Tour Manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
    text: "Finally a tool that feels like it was made by someone who's actually done the job. It's reliable, fast, and easy to use.",
  },
  {
    id: 2,
    name: "Alex Chen",
    role: "Production Manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    text: "This platform revolutionized how we handle tour logistics. Can't imagine going back to spreadsheets.",
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "Tour Coordinator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    text: "The best tool I've used in 15 years of touring. It just works, every single time.",
  },
  {
    id: 4,
    name: "Marcus Johnson",
    role: "Artist Manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    text: "Daysheets made our complex tours manageable. The team loves how intuitive it is.",
  },
  {
    id: 5,
    name: "Emily Rodriguez",
    role: "Festival Director",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    text: "We coordinate hundreds of artists yearly. This tool is our secret weapon for flawless execution.",
  },
  {
    id: 6,
    name: "David Park",
    role: "Stage Manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    text: "Finally, software that understands the chaos of live events. It's been a game-changer.",
  },
  {
    id: 7,
    name: "Lisa Thompson",
    role: "Venue Manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    text: "Streamlined our entire operation. What used to take hours now takes minutes.",
  },
  {
    id: 8,
    name: "Ryan Foster",
    role: "Sound Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
    text: "The attention to detail in this tool is incredible. Someone really understands our workflow.",
  },
  {
    id: 9,
    name: "Nina Patel",
    role: "Lighting Director",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nina",
    text: "Daysheets transformed our production workflow. Can't imagine touring without it now.",
  },
  {
    id: 10,
    name: "Chris Martinez",
    role: "Road Manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris",
    text: "Every touring professional needs this. It's like having an extra team member.",
  },
  {
    id: 11,
    name: "Jordan Lee",
    role: "Backline Tech",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    text: "Simple, powerful, reliable. Exactly what the industry has been waiting for.",
  },
  {
    id: 12,
    name: "Taylor Swift",
    role: "Artist",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
    text: "My entire crew runs on Daysheets. It keeps our massive production in perfect sync.",
  },
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="flex-shrink-0 w-[400px] bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
          {testimonial.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h4 className="font-semibold text-white">{testimonial.name}</h4>
          <p className="text-sm text-white/60">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-white/80 leading-relaxed">{testimonial.text}</p>
    </div>
  );
}

export default function TestimonialsCarousel() {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;
    if (!topRow || !bottomRow) return;

    let topPosition = 0;
    let bottomPosition = 0;

    const animate = () => {
      topPosition -= 1; // Speed of left scroll
      bottomPosition += 1; // Speed of right scroll

      // Calculate the width of one full set of testimonials including gaps
      const singleSetWidth = topRow.scrollWidth / 3;
      
      // Reset position seamlessly when one full set has scrolled
      if (Math.abs(topPosition) >= singleSetWidth) {
        topPosition += singleSetWidth;
      }
      if (bottomPosition >= singleSetWidth) {
        bottomPosition -= singleSetWidth;
      }

      topRow.style.transform = `translateX(${topPosition}px)`;
      bottomRow.style.transform = `translateX(${bottomPosition}px)`;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Split testimonials for two rows
  const topTestimonials = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const bottomTestimonials = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative z-10 mb-16">
        <h2 className="text-5xl font-bold text-center text-white">
          Loved by the best in the industry.
        </h2>
      </div>

      <div className="relative">
        {/* Top row - scrolls left */}
        <div className="mb-6 overflow-hidden">
          <div
            ref={topRowRef}
            className="flex gap-6 w-fit"
            style={{ willChange: 'transform' }}
          >
            {/* Triple the content for truly seamless infinite scroll */}
            {[...topTestimonials, ...topTestimonials, ...topTestimonials].map((testimonial, idx) => (
              <TestimonialCard key={`top-${idx}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Bottom row - scrolls right */}
        <div className="overflow-hidden">
          <div
            ref={bottomRowRef}
            className="flex gap-6 w-fit"
            style={{ willChange: 'transform' }}
          >
            {/* Triple content for seamless infinite scroll */}
            {[...bottomTestimonials, ...bottomTestimonials, ...bottomTestimonials].map((testimonial, idx) => (
              <TestimonialCard key={`bottom-${idx}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}