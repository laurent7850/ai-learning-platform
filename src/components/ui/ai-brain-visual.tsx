"use client";

import { motion } from "framer-motion";

// Positions fixes pour éviter les erreurs d'hydratation
const floatingParticles = [
  { left: 30, top: 35, duration: 4.5, delay: 0.2 },
  { left: 55, top: 28, duration: 5.2, delay: 1.1 },
  { left: 42, top: 65, duration: 4.8, delay: 2.4 },
  { left: 68, top: 45, duration: 5.6, delay: 0.7 },
  { left: 35, top: 55, duration: 4.3, delay: 1.8 },
  { left: 60, top: 70, duration: 5.0, delay: 2.9 },
  { left: 48, top: 32, duration: 4.9, delay: 0.5 },
  { left: 72, top: 58, duration: 5.4, delay: 1.5 },
];

// Positions pré-calculées pour les points pulsants (rayon 70px, 6 points)
const pulsingDots = [
  { x: 70, y: 0 },      // 0°
  { x: 35, y: 60.62 },  // 60°
  { x: -35, y: 60.62 }, // 120°
  { x: -70, y: 0 },     // 180°
  { x: -35, y: -60.62 }, // 240°
  { x: 35, y: -60.62 }, // 300°
];

// Positions pré-calculées pour les lignes (rayon 28px, 6 lignes)
const connectingLines = [
  { x: 28, y: 0 },      // 0°
  { x: 14, y: 24.25 },  // 60°
  { x: -14, y: 24.25 }, // 120°
  { x: -28, y: 0 },     // 180°
  { x: -14, y: -24.25 }, // 240°
  { x: 14, y: -24.25 }, // 300°
];

export function AIBrainVisual({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Main brain container */}
      <div className="relative w-full aspect-square max-w-md mx-auto">
        {/* Subtle outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtle animated rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-primary/20"
            style={{
              scale: 0.6 + i * 0.15,
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [0.6 + i * 0.15, 0.62 + i * 0.15, 0.6 + i * 0.15],
            }}
            transition={{
              rotate: {
                duration: 30 + i * 10,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              },
            }}
          />
        ))}

        {/* Central brain icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            {/* Brain shape using SVG */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              className="text-primary"
            >
              <motion.path
                d="M12 2C8.5 2 6 4.5 6 7.5C6 8.5 6.3 9.4 6.8 10.2C5.7 11 5 12.2 5 13.5C5 15.4 6.3 17 8 17.5V19C8 20.1 8.9 21 10 21H14C15.1 21 16 20.1 16 19V17.5C17.7 17 19 15.4 19 13.5C19 12.2 18.3 11 17.2 10.2C17.7 9.4 18 8.5 18 7.5C18 4.5 15.5 2 12 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
              {/* Neural connections */}
              <motion.path
                d="M9 8H15M9 12H15M10 16H14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 1.5,
                  delay: 1,
                  ease: "easeInOut",
                }}
              />
            </motion.svg>

            {/* Subtle pulsing dots around the brain */}
            {pulsingDots.map((dot, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-primary/70"
                style={{
                  left: `calc(50% + ${dot.x}px - 3px)`,
                  top: `calc(50% + ${dot.y}px - 3px)`,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Connecting lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ transform: "scale(2.5)" }}
            >
              {connectingLines.map((line, i) => (
                <motion.line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${line.x}px)`}
                  y2={`calc(50% + ${line.y}px)`}
                  stroke="hsl(var(--primary))"
                  strokeWidth="0.5"
                  strokeOpacity="0.2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5 + i * 0.15,
                    ease: "easeOut",
                  }}
                />
              ))}
            </svg>
          </div>
        </motion.div>

        {/* Subtle floating data particles */}
        {floatingParticles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -15, 0],
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
    </div>
  );
}
