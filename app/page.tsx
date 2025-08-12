import { Section } from "@/components/containers/Section";
import { Grid } from "@/components/containers/Grid";

export default function Home() {
  return (
    <main className="min-h-dvh ">
      <Section id="hero" gap="xl">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Daysheets
          </h1>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300">
            Clean, consistent sections with a reusable Container.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="#features"
              className="inline-flex items-center rounded-md bg-black text-white px-4 py-2 text-sm md:text-base hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black"
              aria-label="View features"
            >
              View features
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-md border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm md:text-base hover:bg-neutral-50 dark:hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-500"
              aria-label="Contact us"
            >
              Contact
            </a>
          </div>
        </div>
      </Section>

      <Section
        id="features"
        background="transparent"
        gap="lg"
        containerClassName="space-y-8"
      >
        <h2 className="text-2xl md:text-3xl font-semibold">Features</h2>
        <Grid cols={1} mdCols={2} lgCols={3} gap="lg">
          <FeatureCard
            title="Consistent widths"
            description="Max-widths and gutters handled for you."
          />
          <FeatureCard
            title="Responsive grid"
            description="Drop in column counts per breakpoint."
          />
          <FeatureCard
            title="Mobile-first"
            description="Sane defaults, easy overrides."
          />
          <FeatureCard
            title="Accessible"
            description="Semantic sections and links/buttons."
          />
          <FeatureCard
            title="Composable"
            description="Use Section + Grid or roll your own."
          />
          <FeatureCard title="No CSS" description="Tailwind utilities only." />
        </Grid>
      </Section>

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
