import Image from "next/image";
import { Section } from "@/components/containers/Section";
import Logo from "@/assets/DaysheetsLogo@3x.png";
import HeroImage from "@/assets/hero img.png";
import GradientBg from "@/assets/gradient.png";
import NavBar from "@/components/NavBar";

export const Hero = () => {
  return (
    <Section
      id="hero"
      gap="md"
      className="relative overflow-hidden bg-gradient-to-b from-blue-600 to-blue-700 sm:h-[80dvh] md:h-[80dvh] lg:h-[100dvh] min-h-[400px] hmd:min-h-[800px] flex items-center"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image src={GradientBg} alt="" fill className="object-cover" priority />
      </div>

      {/* Navigation */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <NavBar theme="dark" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 w-full pb-[35%] md:pb-[30%] lg:pb-[25%]">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-4">
            <Image src={Logo} alt="Daysheets" width={64} height={64} />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tighter">
            The New Standard for
            <br />
            Tour Management.
          </h1>

          <div className="space-y-1">
            <p className="text-xl text-blue-100">
              Plan Tours. Book Travel. All in One Place. <br />
              Logistics just got 10x easier.
            </p>
          </div>

          <button className="bg-[#032258] backdrop-blur-sm text-white px-8 py-4 rounded-xl text-xl font-medium hover:scale-105 transition-all duration-300 mt-8 ">
            Get Started for free
          </button>
        </div>
      </div>

      {/* Hero image - positioned absolutely at the bottom */}
      <div className="absolute -bottom-25 left-0 right-0 z-0 pointer-events-none">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="relative w-full">
            <Image
              src={HeroImage}
              alt="Daysheets platform interface"
              width={1920}
              height={1080}
              priority
            />
          </div>
        </div>
      </div>
    </Section>
  );
};
