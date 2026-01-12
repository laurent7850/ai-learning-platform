"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function GlowButton({
  className,
  children,
  variant = "primary",
  size = "default",
  onClick,
  disabled,
}: GlowButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-xl font-semibold transition-all duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        size === "default" && "h-10 px-6 text-sm",
        size === "lg" && "h-12 px-8 text-base",
        size === "xl" && "h-14 px-10 text-lg",
        variant === "primary" && [
          "bg-gradient-to-r from-primary via-primary to-accent text-white",
          "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-primary before:via-primary before:to-accent before:blur-xl before:opacity-50 before:transition-opacity before:duration-300",
          "hover:before:opacity-75",
          "after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-r after:from-primary after:via-primary after:to-accent",
        ],
        variant === "secondary" && [
          "border border-primary/20 bg-background/50 text-foreground backdrop-blur-sm",
          "hover:border-primary/40 hover:bg-primary/5",
        ],
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-white/25 to-primary/0"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.button>
  );
}
