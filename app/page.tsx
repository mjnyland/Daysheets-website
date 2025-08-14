import { Section } from "@/components/containers/Section";
import { Grid } from "@/components/containers/Grid";
import { Hero } from "@/components/Hero";
import TestimonialsSplide from "@/components/testimonials-splide";
import { FeatureSlideshow } from "@/components/FeatureSlideshow";
import { FlightGrid } from "@/components/FlightGrid";
import { MobileEditingCarousel } from "@/components/MobileEditingCarousel";

export default function Home() {
  return (
    <main className="min-h-dvh">
      <Hero />

      <TestimonialsSplide />
      <FeatureSlideshow />

      <FlightGrid />
      <MobileEditingCarousel />

      <Section id="contact" background="muted" gap="md">
        <div className="max-w-prose space-y-3">
          <h3 className="text-xl font-semibold">Get in touch</h3>
          <p className="text-neutral-600 dark:text-neutral-300">
            This section uses the same Container to keep content aligned.
          </p>
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center rounded-md bg-black text-white px-4 py-2 text-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Email us"
          >
            Email us
          </a>
        </div>
      </Section>
    </main>
  );
}

const FeatureCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-950">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">
        {description}
      </p>
    </div>
  );
};
