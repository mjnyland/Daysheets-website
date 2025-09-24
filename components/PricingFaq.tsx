"use client";

import { useState } from "react";
import { Section } from "@/components/containers/Section";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "Who is considered a collaborator?",
    answer:
      "A collaborator is anyone you invite to a tour with edit or view permissions (e.g., tour manager, production, FOH).",
  },
  {
    question: "What is considered an organization?",
    answer:
      "An organization represents your company or artist team. It groups your tours, billing, and permissions in one place.",
  },
  {
    question: "What platforms does Daysheets support?",
    answer:
      "Daysheets runs on modern browsers and is optimized for iOS and Android via the browser. A PWA can be installed for offline-like access.",
  },
  {
    question: "What happens if I work with multiple artists at once?",
    answer:
      "Use separate organizations or role-based access within one organization. You can switch contexts without logging out.",
  },
  {
    question: "Can I try Daysheets before subscribing?",
    answer:
      "Yes. Start on the Free or Plus tier and upgrade when you're ready. Your data carries over seamlessly.",
  },
  {
    question: "Does Daysheets work offline?",
    answer:
      "Key data is cached locally. You can view schedules without a connection and changes will sync when you're back online.",
  },
  {
    question: "Can Daysheets accommodate multiple tours at once?",
    answer:
      "Yes. Pro and Teams support multiple active tours with granular permissions across crews and vendors.",
  },
  {
    question: "Do I have to pay for Daysheets when I'm not using it?",
    answer:
      "You can downgrade or pause between tours. Teams can keep historical access while toggling editor seats as needed.",
  },
  {
    question: "How do cancellation and refunds work?",
    answer:
      "You can cancel anytime. Service continues through the current billing period. Contact us for help with invoices.",
  },
];

const PlusIcon = ({ open }: { open: boolean }) => (
  <span
    aria-hidden
    className="inline-flex h-5 w-5 items-center justify-center rounded-sm text-neutral-700"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={open ? "h-4 w-4 rotate-45 transition" : "h-4 w-4 transition"}
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export default function PricingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    if (event.key === " ") {
      event.preventDefault();
      (event.currentTarget as HTMLButtonElement).click();
    }
  };

  return (
    <Section background="muted" gap="xl" aria-label="Pricing FAQ" padded="lg">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">FAQ</h2>
      </div>

      <div className="mx-auto mt-8 max-w-5xl rounded-2xl bg-white ring-1 ring-black/5">
        <ul className="divide-y divide-neutral-200">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <li key={item.question}>
                <button
                  id={buttonId}
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  onClick={() => handleToggle(index)}
                  onKeyDown={handleKeyDown}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <span className="text-[15px] font-medium text-neutral-900">
                    {item.question}
                  </span>
                  <PlusIcon open={isOpen} />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={
                    isOpen
                      ? "block px-6 pb-6 text-[15px] text-neutral-700"
                      : "hidden px-6 pb-6 text-[15px] text-neutral-700"
                  }
                >
                  {item.answer}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
