import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";

export const metadata: Metadata = {
  title: "Daysheets",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
