import { Section } from "@/components/containers/Section";
import { Grid } from "@/components/containers/Grid";
import Link from "next/link";
import NavBar from "@/components/NavBar";

type Tier = {
  name: string;
  price: string;
  cadence?: string;
  description: string;
  audienceLabel: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  highlight?: "outline" | "filled";
};

const tiers: Tier[] = [
  {
    name: "Free",
    price: "$0",
    description: "",
    audienceLabel: "For DIY bands",
    features: ["Up to 5 personnel per tour"],
    ctaText: "Get started with Free",
    ctaHref: "mailto:hello@daysheets.app?subject=Free",
    highlight: "outline",
  },
  {
    name: "Plus",
    price: "$0",
    description: "per month billed annually",
    audienceLabel: "For club tours",
    features: ["Collaborate on other tours", "Up to 25 personnel per tour"],
    ctaText: "Get started with Plus",
    ctaHref: "mailto:hello@daysheets.app?subject=Plus",
    highlight: "outline",
  },
  {
    name: "Pro",
    price: "$20",
    description: "per month billed annually",
    audienceLabel: "For theaters and up",
    features: [
      "Collaborate on other tours",
      "Up to 50 personnel per tour",
      "Groups & Visibility",
      "Feature 3",
    ],
    ctaText: "Get started with Pro",
    ctaHref: "mailto:hello@daysheets.app?subject=Pro",
    highlight: "outline",
  },
  {
    name: "Teams",
    price: "$40",
    description: "per org per month billed annually",
    audienceLabel: "For global tours",
    features: [
      "Unlimited editors per org",
      "Starting at 100 personnel per tour",
      "Groups & Visibility",
      "Access to Daysheets AI",
      "Onboarding & priority support",
    ],
    ctaText: "Get started with Teams",
    ctaHref: "mailto:hello@daysheets.app?subject=Teams",
    highlight: "filled",
  },
];

const CheckIcon = () => (
  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-700">
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
      <path
        d="M20 7L10 17L5 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export default function PricingSection() {
  return (
    <>
      {/* Shared top nav */}
      <div className="sticky top-0 z-30">
        <NavBar theme="light" />
      </div>
      <Section
        background="light"
        gap="none"
        aria-label="Pricing hero"
        padded="lg"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-blue-600">
            Pricing for every band.
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            An affordable solution,
            <br />
            for vans to stadiums.
          </h1>
        </div>
      </Section>

      <Section
        background="light"
        gap="xl"
        aria-label="Pricing tiers"
        padded="lg"
      >
        <Grid
          cols={1}
          mdCols={2}
          lgCols={4}
          gap="none"
          className="items-stretch"
        >
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={[
                "flex min-h-full flex-col  p-6 sm:p-8 ring-1",
                tier.highlight === "filled"
                  ? "ring-blue-300 bg-blue-50"
                  : "ring-neutral-200 bg-white",
              ].join(" ")}
            >
              <div className="text-center">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {tier.name}
                </h2>
                <div className="mt-4">
                  <div className="text-4xl font-bold">{tier.price}</div>
                  {tier.description ? (
                    <p className="mt-1 text-xs text-neutral-500">
                      {tier.description}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm font-semibold text-neutral-900">
                  {tier.audienceLabel}
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-neutral-800">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <Link
                  href={tier.ctaHref}
                  aria-label={`${tier.ctaText}`}
                  className={[
                    "inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    tier.highlight === "filled"
                      ? "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600 focus-visible:ring-offset-white"
                      : "bg-white text-neutral-900 ring-1 ring-neutral-200 hover:bg-neutral-50 focus-visible:ring-neutral-900",
                  ].join(" ")}
                >
                  {tier.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </Grid>
      </Section>
    </>
  );
}
