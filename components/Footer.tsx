"use client";

import Link from "next/link";
import { Section } from "@/components/containers/Section";

const LogoMark = () => (
  <span
    aria-hidden
    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 shadow-sm ring-1 ring-white/10"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-white"
    >
      <path
        d="M6 8.5C6 6.567 7.567 5 9.5 5h5A3.5 3.5 0 0 1 18 8.5 3.5 3.5 0 0 1 14.5 12H10m0 0H9.5A3.5 3.5 0 0 0 6 15.5 3.5 3.5 0 0 0 9.5 19h5A3.5 3.5 0 0 0 18 15.5M10 12h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export const Footer = () => {
  return (
    <Section
      as="footer"
      background="dark"
      gap="lg"
      padded="lg"
      aria-label="Site footer"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark />
          <span className="text-lg font-semibold tracking-tight text-white">
            Daysheets
          </span>
        </div>

        <nav aria-label="Footer navigation" className="text-sm">
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 text-neutral-300">
            <li>
              <Link
                href="/pricing"
                className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded"
              >
                SMS Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mt-8 border-t border-white/10 pt-6">
        <p className="text-sm text-neutral-400">
          © {new Date().getFullYear()} Daysheets. All rights reserved
        </p>
      </div>
    </Section>
  );
};

export default Footer;
