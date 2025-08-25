"use client";

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/containers/Section";

const STORE_LINKS = {
  googlePlay: "https://play.google.com/store/apps/details?id=com.daysheets",
  appStore: "https://apps.apple.com/app/id0000000000",
};

export default function AppDownloadSection() {
  return (
    <Section
      as="section"
      background="darkBlue"
      gap="xl"
      size="xl"
      padded={false}
      className=""
      containerClassName="flex flex-col items-center justify-center py-16 md:py-24"
      aria-label="Download the Daysheets apps"
      id="download"
    >
      <div className="mt-10 w-full flex flex-col items-center justify-center bg-white/10 rounded-[32px] pt-20">
        {/* Text */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
            Get Daysheets on every device
          </h2>
          <p className="text-gray-300 mt-4 max-w-2xl text-base sm:text-lg">
            iPhone, iPad, and Android — download the app that keeps your team in
            sync.
          </p>
        </div>
        {/* App links */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-lg">
          {/* Google Play */}
          <div className="flex items-center justify-start gap-3 sm:gap-4 w-full">
            <Image
              src="/assets/AppStore_Logo.png"
              alt="Apple App Store"
              width={48}
              height={48}
              className="h-12 w-12"
            />
            <div className="flex flex-col">
              <p className="text-white text-base font-bold sm:text-lg">
                App Store
              </p>
              <Link
                href={STORE_LINKS.googlePlay}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white text-sm sm:text-base underline underline-offset-4"
                aria-label="Download Daysheets on Google Play"
              >
                Download
              </Link>
            </div>
          </div>
          {/* iOS App Store */}
          <div className="flex items-center justify-start gap-3 sm:gap-4 w-full">
            <Image
              src="/assets/PlayStore_Logo.png"
              alt="Google Play"
              width={48}
              height={48}
              className="h-12 w-12"
            />
            <div className="flex flex-col">
              <p className="text-white/90 text-base font-bold sm:text-lg">
                iOS App Store
              </p>
              <Link
                href={STORE_LINKS.googlePlay}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white text-sm sm:text-base underline underline-offset-4"
                aria-label="Download Daysheets on Google Play"
              >
                Download
              </Link>
            </div>
          </div>
        </div>
        {/* Image */}
        <div className="relative w-full max-w-5xl aspect-[16/9]">
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
    </Section>
  );
}
