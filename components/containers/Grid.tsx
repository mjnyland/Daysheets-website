import { ReactNode } from "react";

type GridCols = 1 | 2 | 3 | 4;
type GridGap = "sm" | "md" | "lg" | "none";

type Props = {
  cols?: GridCols;
  mdCols?: GridCols;
  lgCols?: GridCols;
  xlCols?: GridCols;
  gap?: GridGap;
  className?: string;
  children?: ReactNode;
};

// Tailwind needs literal, statically present class names.
// Define all breakpoint variants explicitly so the extractor can see them.
const baseColsMap: Record<GridCols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const mdColsMap: Record<GridCols, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

const lgColsMap: Record<GridCols, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

const xlColsMap: Record<GridCols, string> = {
  1: "xl:grid-cols-1",
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
};

const gapMap: Record<GridGap, string> = {
  none: "gap-0",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

export const Grid = ({
  cols = 1,
  mdCols,
  lgCols,
  xlCols,
  gap = "md",
  className,
  children,
}: Props) => {
  const classes = [
    "grid",
    baseColsMap[cols],
    mdCols ? mdColsMap[mdCols] : undefined,
    lgCols ? lgColsMap[lgCols] : undefined,
    xlCols ? xlColsMap[xlCols] : undefined,
    gapMap[gap],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
};
