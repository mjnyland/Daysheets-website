"use client";

import React from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export type ContainerPadding = false | "none" | "sm" | "md" | "lg";

interface Props {
  as?: "div" | "section" | "article" | "aside" | "main";
  size?: ContainerSize;
  padded?: ContainerPadding;
  className?: string;
  children?: React.ReactNode;
}

const sizeClassMap: Record<ContainerSize, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-none",
};

const paddingClassMap: Record<Exclude<ContainerPadding, false>, string> = {
  none: "px-0",
  sm: "px-3 md:px-4",
  md: "px-4 md:px-6 lg:px-8",
  lg: "px-6 md:px-8 lg:px-12",
};

export const Container: React.FC<Props> = ({
  as = "div",
  size = "xl",
  padded = "md",
  className,
  children,
}) => {
  const sizeClass = sizeClassMap[size];
  const padClass = padded ? paddingClassMap[padded] : "px-0";

  const classes = ["mx-auto w-full", sizeClass, padClass, className]
    .filter(Boolean)
    .join(" ");

  const elementProps = {
    className: classes,
  };

  switch (as) {
    case "section":
      return <section {...elementProps}>{children}</section>;
    case "article":
      return <article {...elementProps}>{children}</article>;
    case "aside":
      return <aside {...elementProps}>{children}</aside>;
    case "main":
      return <main {...elementProps}>{children}</main>;
    case "div":
    default:
      return <div {...elementProps}>{children}</div>;
  }
};