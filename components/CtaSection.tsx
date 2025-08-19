"use client";

import { Section } from "@/components/containers/Section";

export const CtaSection = () => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLAnchorElement> = (
    event
  ) => {
    if (event.key === " ") {
      event.preventDefault();
      (event.currentTarget as HTMLAnchorElement).click();
    }
  };

  return (
    <Section background="subtle" gap="xl" aria-label="Call to action">
      <div className="mx-auto w-full">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
            <div className="px-6 py-12 sm:px-10 sm:py-14 md:px-16 md:py-24">
              <div className="mx-auto max-w-3xl text-center">
                <h3 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                  Ready to get started?
                </h3>
                <p className="mt-4 text-base text-neutral-600 sm:text-lg">
                  Join the teams who rely on Daysheets to provide world-class
                  support to their customers.
                </p>
                <div className="mt-8">
                  <a
                    href="mailto:hello@daysheets.app?subject=Book%20a%20demo"
                    className="inline-flex items-center justify-center rounded-lg bg-[#166CD1] px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    aria-label="Book a demo via email"
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                  >
                    Book a demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CtaSection;
