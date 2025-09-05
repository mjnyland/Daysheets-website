"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  return (
    <nav className={["px-4 md:px-8 py-6", className].filter(Boolean).join(" ")}>
      <div className="max-w-screen-xl mx-auto flex items-center justify-between ">
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
          <Link
            href="https://daysheets-1194227f.mintlify.app"
            className={linkBase}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open help documentation in a new tab"
          >
            Help
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

        <button
          className="md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={handleToggleMenu}
        >
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

      {isMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={[
            "fixed inset-0 h-dvh z-50 md:hidden",
            theme === "dark" ? "bg-neutral-950/95" : "bg-white/95",
            "backdrop-blur-sm",
          ].join(" ")}
          onClick={handleCloseMenu}
          onKeyDown={(e) => {
            if (e.key === "Escape") handleCloseMenu();
          }}
          tabIndex={0}
        >
          <div
            className="relative h-full w-full flex flex-col items-center justify-center gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-5 right-5 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Close menu"
              onClick={handleCloseMenu}
            >
              <svg
                className={
                  theme === "dark"
                    ? "w-7 h-7 text-white"
                    : "w-7 h-7 text-neutral-900"
                }
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <Link
              href="#"
              className={["text-2xl font-medium", linkBase].join(" ")}
              onClick={handleCloseMenu}
            >
              Travel
            </Link>
            <Link
              href="https://daysheets-1194227f.mintlify.app"
              className={["text-2xl font-medium", linkBase].join(" ")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open help documentation in a new tab"
              onClick={handleCloseMenu}
            >
              Help
            </Link>
            <Link
              href="/pricing"
              className={["text-2xl font-medium", linkBase].join(" ")}
              onClick={handleCloseMenu}
            >
              Pricing
            </Link>
            <Link
              href="#"
              className={["text-2xl font-medium", linkBase].join(" ")}
              onClick={handleCloseMenu}
            >
              Careers
            </Link>
            <Link
              href="mailto:hello@daysheets.app?subject=Book%20a%20demo"
              className={[
                "mt-4 px-6 py-3 rounded-lg font-medium transition-colors",
                buttonClass,
              ].join(" ")}
              aria-label="Book a demo via email"
              onClick={handleCloseMenu}
            >
              Book a demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
