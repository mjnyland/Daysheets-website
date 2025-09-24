"use client";

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/containers/Section";
import { Star } from "lucide-react";

const STORE_LINKS = {
  googlePlay: "https://play.google.com/store/apps/details?id=com.daysheets",
  appStore: "https://apps.apple.com/app/id0000000000",
};

export default function AppDownloadSection() {
  return (
    <Section
      background="darkBlue"
      gap="xl"
      size="2xl"
      padded={false}
      className=""
      containerClassName="flex flex-col items-center justify-center py-16 md:py-24 px-12"
      aria-label="Download the Daysheets apps"
      id="download"
    >
      <div className="relative mt-10 w-full flex items-center justify-center overflow-hidden">
        <div className="absolute left-1/2 bottom-[-40%] -translate-x-1/2 h-[800px] w-[800px] rounded-full bg-blue-500/50 blur-[160px] z-0"></div>
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        ></div>
        <div className="w-full flex flex-col items-center justify-center bg-white/2 border-[2px] border-white/5 rounded-[32px] pt-20 px-20 z-10">
          {/* Text */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
              Get Daysheets on every device
            </h2>
            <p className="text-gray-300 mt-4 max-w-2xl text-base sm:text-lg">
              iPhone, iPad, and Android — download the app that keeps your team
              in sync.
            </p>
          </div>

          {/* App links */}
          <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 w-full max-w-xl justify-center items-center gap-4">
            {/* App Store */}
            <div className="flex items-center justify-center gap-3 bg-slate-200 pl-6 pr-8 py-4 rounded-2xl border-[2px] border-slate-300">
              <Image
                src="/assets/AppStore_Logo.svg"
                alt="Apple App Store"
                width={48}
                height={48}
                className="h-6 w-6 "
              />
              <div className="flex flex-col">
                <Link
                  href={STORE_LINKS.googlePlay}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-900 font-medium text-lg"
                  aria-label="Download Daysheets on Google Play"
                >
                  Download for iOS
                </Link>
              </div>
            </div>
            {/* Google Play */}
            <div className="flex items-center justify-center gap-3 bg-slate-200 pl-6 pr-8 py-4 rounded-2xl border-[2px] border-slate-300">
              <Image
                src="/assets/PlayStore_Logo.png"
                alt="Google Play"
                width={48}
                height={48}
                className="h-6 w-6 "
              />
              <div className="flex flex-col">
                <Link
                  href={STORE_LINKS.googlePlay}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-900 font-medium text-lg"
                  aria-label="Download Daysheets on Google Play"
                >
                  Download for Android
                </Link>
              </div>
            </div>
          </div>
          {/* Reviews */}
          <div className="mt-8 md:mt-10 w-full">
            <ul
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              role="list"
              aria-label="App Store reviews"
            >
              <li
                className="bg-white/10 text-slate-100 rounded-2xl border border-white/10 shadow-sm p-4"
                role="article"
                aria-label="Review: Amazing app"
              >
                <div
                  className="flex items-center gap-0"
                  role="img"
                  aria-label="5 out of 5 stars"
                >
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400"
                      fill="currentColor"
                      strokeWidth={0}
                      aria-hidden="true"
                    />
                  ))}
                  <span className="sr-only">5 out of 5 stars</span>
                </div>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  Amazing app
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-200">
                  Best touring app, highly recommend. Very detailed and easy to
                  use.
                </p>
              </li>
              <li
                className="bg-white/10 text-slate-100 rounded-2xl border border-white/10 shadow-sm p-4"
                role="article"
                aria-label="Review: Artist in Shed Tour"
              >
                <div
                  className="flex items-center gap-0"
                  role="img"
                  aria-label="5 out of 5 stars"
                >
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400"
                      fill="currentColor"
                      strokeWidth={0}
                      aria-hidden="true"
                    />
                  ))}
                  <span className="sr-only">5 out of 5 stars</span>
                </div>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  Artist in Shed Tour
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-200">
                  I manage an artist who’s been touring for the last 7 years and
                  Daysheets is the best. The artist even checks it. It is
                  smooth, updates quick, and the team is very responsive. 5
                  stars.
                </p>
              </li>
              <li
                className="bg-white/10 text-slate-100 rounded-2xl border border-white/10 shadow-sm p-4"
                role="article"
                aria-label="Review: Master who?"
              >
                <div
                  className="flex items-center gap-0"
                  role="img"
                  aria-label="5 out of 5 stars"
                >
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400"
                      fill="currentColor"
                      strokeWidth={0}
                      aria-hidden="true"
                    />
                  ))}
                  <span className="sr-only">5 out of 5 stars</span>
                </div>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  Master who?
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-200">
                  Don’t think. Just switch. Total game changer for me.
                </p>
              </li>
            </ul>
          </div>
          {/* Image */}
          <div className="relative w-full max-w-4xl aspect-[16/9]">
            <Image
              src="/assets/Android_iPad_iOS_mockup.png"
              alt="Daysheets apps shown on Android, iPad, and iPhone"
              fill
              sizes="(max-width: 768px) 100vw, 680px"
              className="object-contain object-bottom w-full h-full"
              priority
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
