"use client";

import React, { forwardRef } from "react";

type TransparentVideoProps = React.ComponentPropsWithoutRef<"video"> & {
  src: string;
  hasAlpha?: boolean;
  hevcExtension?: "mov" | "mp4";
};

export const TransparentVideo = forwardRef<
  HTMLVideoElement,
  TransparentVideoProps
>(
  (
    {
      src,
      className,
      preload = "metadata",
      hasAlpha = false,
      hevcExtension = "mov",
      children,
      ...rest
    },
    ref
  ) => {
    const computeWebmSrc = (originalSrc: string) => {
      if (originalSrc.endsWith(".mp4"))
        return originalSrc.replace(/\.mp4$/, ".webm");
      if (originalSrc.endsWith(".mov"))
        return originalSrc.replace(/\.mov$/, ".webm");
      return `${originalSrc}.webm`;
    };

    const computeHevcSrc = (originalSrc: string) => {
      const alphaSuffix = `-alpha.${hevcExtension}`;
      if (originalSrc.endsWith(".mp4"))
        return originalSrc.replace(/\.mp4$/, alphaSuffix);
      if (originalSrc.endsWith(".mov"))
        return originalSrc.replace(/\.mov$/, alphaSuffix);
      return `${originalSrc}${alphaSuffix}`;
    };

    const webmSrc = computeWebmSrc(src);
    const hevcSrc = computeHevcSrc(src);

    return (
      <video
        ref={ref}
        className={className}
        autoPlay
        loop
        muted
        playsInline
        preload={preload}
        {...rest}
      >
        {hasAlpha ? (
          <>
            <source src={webmSrc} type='video/webm; codecs="vp9"' />
            <source src={hevcSrc} type='video/quicktime; codecs="hvc1"' />
          </>
        ) : null}
        <source src={src} type="video/mp4" />
        {children}
      </video>
    );
  }
);

TransparentVideo.displayName = "TransparentVideo";
