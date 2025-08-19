"use client";

import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export type ContainerPadding = false | "sm" | "md" | "lg";

type Props<T extends ElementType> = {
  as?: T;
  size?: ContainerSize;
  padded?: ContainerPadding;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const sizeClassMap: Record<ContainerSize, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-none",
};

const paddingClassMap: Record<Exclude<ContainerPadding, false>, string> = {
  sm: "px-3 md:px-4",
  md: "px-4 md:px-6 lg:px-8",
  lg: "px-6 md:px-8 lg:px-12",
};

export const Container = <T extends ElementType = "div">({
  as,
  size = "xl",
  padded = "md",
  className,
  children,
  ...rest
}: Props<T>) => {
  const Tag = (as || "div") as ElementType;
  const sizeClass = sizeClassMap[size];
  const padClass = padded ? paddingClassMap[padded] : "px-0";

  const classes = ["mx-auto w-full", sizeClass, padClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...(rest as Record<string, unknown>)}>
      {children}
    </Tag>
  );
};
