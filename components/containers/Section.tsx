import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import {
  Container,
  ContainerPadding,
  ContainerSize,
} from "@/components/containers/Container";

type SectionGap = "none" | "sm" | "md" | "lg" | "xl";
type SectionBg = "transparent" | "subtle" | "muted" | "red" | "dark" | "blue";

type Props<T extends ElementType> = {
  as?: T;
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
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

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
};

export const Section = <T extends ElementType = "section">({
  as,
  id,
  background = "transparent",
  gap = "lg",
  size = "xl",
  padded = "md",
  className,
  containerClassName,
  children,
  ref,
  ...rest
}: Props<T>) => {
  const Tag = (as || "section") as ElementType;

  const outerClasses = [bgMap[background], gapMap[gap], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={ref}
      id={id}
      className={outerClasses}
      {...(rest as Record<string, unknown>)}
    >
      <Container size={size} padded={padded} className={containerClassName}>
        {children}
      </Container>
    </Tag>
  );
};
