"use client";

import React from "react";
import {
  Container,
  ContainerPadding,
  ContainerSize,
} from "@/components/containers/Container";

type SectionGap = "none" | "sm" | "md" | "lg" | "xl";
type SectionBg =
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
  as?: "section" | "div" | "article" | "aside" | "main" | "header" | "footer";
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  background?: SectionBg;
  gap?: SectionGap;
  size?: ContainerSize;
  padded?: ContainerPadding;
  className?: string;
  containerClassName?: string;
  ref?: React.RefObject<HTMLElement | null>;
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

export const Section: React.FC<Props> = ({
  as = "section",
  id,
  background = "transparent",
  gap = "lg",
  size = "xl",
  padded = "md",
  className,
  containerClassName,
  children,
  ref,
}) => {
  const outerClasses = [bgMap[background], gapMap[gap], className]
    .filter(Boolean)
    .join(" ");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const elementProps = {
    ref: ref as any,
    id,
    className: outerClasses,
  };

  const content = (
    <Container size={size} padded={padded} className={containerClassName}>
      {children}
    </Container>
  );

  switch (as) {
    case "div":
      return <div {...elementProps}>{content}</div>;
    case "article":
      return <article {...elementProps}>{content}</article>;
    case "aside":
      return <aside {...elementProps}>{content}</aside>;
    case "main":
      return <main {...elementProps}>{content}</main>;
    case "header":
      return <header {...elementProps}>{content}</header>;
    case "footer":
      return <footer {...elementProps}>{content}</footer>;
    case "section":
    default:
      return <section {...elementProps}>{content}</section>;
  }
};