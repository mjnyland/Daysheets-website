"use client";

import React, { forwardRef } from "react";
import {
  Container,
  ContainerSize,
  ContainerPadding,
} from "@/components/containers/Container";

export type SectionGap = "none" | "sm" | "md" | "lg" | "xl";
export type SectionBg =
  | "transparent"
  | "subtle"
  | "muted"
  | "red"
  | "dark"
  | "blue"
  | "darkBlue"
  | "white"
  | "light";

interface Props {
  id?: string;
  background?: SectionBg;
  gap?: SectionGap;
  size?: ContainerSize;
  padded?: ContainerPadding;
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}

const gapMap: Record<SectionGap, string> = {
  none: "py-0",
  sm: "py-8",
  md: "py-12",
  lg: "py-16",
  xl: "py-24",
};

const bgMap: Record<SectionBg, string> = {
  transparent: "bg-transparent",
  subtle: "bg-neutral-50",
  muted: "bg-neutral-100",
  red: "bg-red-500",
  dark: "bg-[#0E0E0E]",
  blue: "bg-[#166CD1]",
  darkBlue: "bg-[#030720]",
  white: "bg-white",
  light: "bg-white",
};

// 👇 add forwardRef here
export const Section = forwardRef<HTMLDivElement, Props>(
  (
    {
      id,
      background = "transparent",
      gap = "lg",
      size = "xl",
      padded = "md",
      className,
      containerClassName,
      children,
      ...rest
    },
    ref,
  ) => {
    const outerClasses = [bgMap[background], gapMap[gap], className]
      .filter(Boolean)
      .join(" ");

    return (
      <section ref={ref} id={id} className={outerClasses} {...rest}>
        <Container size={size} padded={padded} className={containerClassName}>
          {children}
        </Container>
      </section>
    );
  },
);

Section.displayName = "Section";
