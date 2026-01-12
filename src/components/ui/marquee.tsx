"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
  fade?: boolean;
  speed?: "slow" | "normal" | "fast";
}

export function Marquee({
  children,
  className,
  pauseOnHover = true,
  reverse = false,
  fade = true,
  speed = "normal",
}: MarqueeProps) {
  const speedClass = {
    slow: "animate-[marquee_60s_linear_infinite]",
    normal: "animate-[marquee_40s_linear_infinite]",
    fast: "animate-[marquee_20s_linear_infinite]",
  };

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        fade &&
          "[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 gap-4 py-4",
          speedClass[speed],
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 gap-4 py-4",
          speedClass[speed],
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
