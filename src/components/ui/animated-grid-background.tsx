"use client";

import { motion } from "framer-motion";

interface AnimatedGridBackgroundProps {
  className?: string;
}

// Positions fixes pour éviter les erreurs d'hydratation
const particles = [
  { left: 5, top: 10, duration: 4.2, delay: 0.5 },
  { left: 15, top: 30, duration: 5.1, delay: 1.2 },
  { left: 25, top: 60, duration: 4.8, delay: 2.0 },
  { left: 40, top: 20, duration: 5.5, delay: 0.8 },
  { left: 55, top: 45, duration: 4.3, delay: 3.1 },
  { left: 70, top: 15, duration: 5.0, delay: 1.5 },
  { left: 80, top: 55, duration: 4.6, delay: 2.5 },
  { left: 90, top: 35, duration: 5.2, delay: 0.3 },
];

export function AnimatedGridBackground({ className }: AnimatedGridBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Subtle animated gradient orbs */}
      <motion.div
        className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/15 blur-[120px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/15 blur-[120px]"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/10 blur-[150px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black 70%, transparent 110%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black 70%, transparent 110%)",
        }}
      />

      {/* Animated grid lines */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="hsl(var(--primary) / 0.08)"
              strokeWidth="1"
            />
          </pattern>
          <linearGradient id="fade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="gridMask">
            <rect width="100%" height="100%" fill="url(#fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" mask="url(#gridMask)" />
      </svg>

      {/* Subtle floating particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/20"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
