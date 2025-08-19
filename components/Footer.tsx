"use client";

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/containers/Section";
import Logo from "@/assets/DaysheetsLogo@3x.png";

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
          <Image
            src={Logo}
            alt="Daysheets"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
          />
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
