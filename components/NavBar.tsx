"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/DaysheetsLogo@3x.png";

type Props = {
  theme?: "light" | "dark";
  className?: string;
};

export const NavBar = ({ theme = "dark", className }: Props) => {
  const linkBase =
    theme === "dark"
      ? "text-white hover:text-blue-100"
      : "text-neutral-900 hover:text-neutral-700";

  const buttonClass =
    theme === "dark"
      ? "bg-white text-blue-600 hover:bg-blue-50"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <nav className={["px-4 md:px-8 py-6", className].filter(Boolean).join(" ")}>
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Go to homepage"
        >
          <Image
            src={Logo}
            alt="Daysheets"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
            priority
          />
          <span
            className={[
              "text-xl md:text-2xl font-semibold",
              theme === "dark" ? "text-white" : "text-neutral-900",
            ].join(" ")}
          >
            Daysheets
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className={linkBase}>
            Travel
          </Link>
          <Link href="/pricing" className={linkBase}>
            Pricing
          </Link>
          <Link href="#" className={linkBase}>
            Careers
          </Link>
          <Link
            href="mailto:hello@daysheets.app?subject=Book%20a%20demo"
            className={[
              "px-5 py-2 rounded-lg font-medium transition-colors",
              buttonClass,
            ].join(" ")}
            aria-label="Book a demo via email"
          >
            Book a demo
          </Link>
        </div>

        <button className="md:hidden" aria-label="Open menu">
          <svg
            className={
              theme === "dark"
                ? "w-6 h-6 text-white"
                : "w-6 h-6 text-neutral-900"
            }
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
