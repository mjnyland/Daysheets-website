"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

const testimonials = [
  {
    id: 1,
    name: "Jamie Cortez",
    role: "Tour Manager",
    text: "Finally a tool that feels like it was made by someone who's actually done the job. It's reliable, fast, and easy to use.",
  },
  {
    id: 2,
    name: "Alex Chen",
    role: "Production Manager",
    text: "This platform revolutionized how we handle tour logistics. Can't imagine going back to spreadsheets.",
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "Tour Coordinator",
    text: "The best tool I've used in 15 years of touring. It just works, every single time.",
  },
  {
    id: 4,
    name: "Marcus Johnson",
    role: "Artist Manager",
    text: "Daysheets made our complex tours manageable. The team loves how intuitive it is.",
  },
  {
    id: 5,
    name: "Emily Rodriguez",
    role: "Festival Director",
    text: "We coordinate hundreds of artists yearly. This tool is our secret weapon for flawless execution.",
  },
  {
    id: 6,
    name: "David Park",
    role: "Stage Manager",
    text: "Finally, software that understands the chaos of live events. It's been a game-changer.",
  },
  {
    id: 7,
    name: "Lisa Thompson",
    role: "Venue Manager",
    text: "Streamlined our entire operation. What used to take hours now takes minutes.",
  },
  {
    id: 8,
    name: "Ryan Foster",
    role: "Sound Engineer",
    text: "The attention to detail in this tool is incredible. Someone really understands our workflow.",
  },
];

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <div
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 h-full"
      style={{ textAlign: "left", direction: "ltr" }}
    >
      <div
        className="flex items-center justify-start gap-4 mb-4"
        style={{ justifyContent: "flex-start" }}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div style={{ textAlign: "left" }}>
          <h4 className="font-semibold text-white">{testimonial.name}</h4>
          <p className="text-sm text-white/60">{testimonial.role}</p>
        </div>
      </div>
      <p
        className="text-white/80 leading-relaxed line-clamp-2"
        style={{ textAlign: "left" }}
      >
        {testimonial.text}
      </p>
    </div>
  );
}

export default function TestimonialsSplide() {
  const topRowTestimonials = testimonials.slice(
    0,
    Math.ceil(testimonials.length / 2)
  );
  const bottomRowTestimonials = testimonials.slice(
    Math.ceil(testimonials.length / 2)
  );

  return (
    <section className="relative py-20 overflow-hidden bg-[#166CD1]">
      <div className="relative z-10 mb-16">
        <h2 className="text-5xl font-medium text-center text-white">
          Loved by the best in the industry.
        </h2>
      </div>

      <div className="relative space-y-6">
        {/* Left gradient overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#166CD1] to-transparent z-10 pointer-events-none" />

        {/* Right gradient overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#166CD1] to-transparent z-10 pointer-events-none" />
        {/* Top row - scrolls left */}
        <Splide
          options={{
            type: "loop",
            drag: "free",
            focus: "center",
            perPage: 4,
            perMove: 1,
            gap: "1.5rem",
            arrows: false,
            pagination: false,
            autoScroll: {
              pauseOnHover: false,
              pauseOnFocus: false,
              rewind: false,
              speed: 1,
            },
            breakpoints: {
              1280: {
                perPage: 3,
              },
              1024: {
                perPage: 2,
              },
              640: {
                perPage: 1,
              },
            },
          }}
          extensions={{ AutoScroll }}
        >
          {topRowTestimonials.map((testimonial) => (
            <SplideSlide key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </SplideSlide>
          ))}
        </Splide>

        {/* Bottom row - scrolls right */}
        <div dir="ltr">
          <Splide
            options={{
              type: "loop",
              drag: "free",
              focus: "center",
              perPage: 4,
              perMove: 1,
              gap: "1.5rem",
              arrows: false,
              pagination: false,
              direction: "rtl",
              autoScroll: {
                pauseOnHover: false,
                pauseOnFocus: false,
                rewind: false,
                speed: 1,
              },
              breakpoints: {
                1280: {
                  perPage: 3,
                },
                1024: {
                  perPage: 2,
                },
                640: {
                  perPage: 1,
                },
              },
            }}
            extensions={{ AutoScroll }}
          >
            {bottomRowTestimonials.map((testimonial) => (
              <SplideSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </section>
  );
}
