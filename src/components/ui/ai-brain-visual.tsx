"use client";

import { motion } from "framer-motion";

export function AIBrainVisual({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Main brain container */}
      <div className="relative w-full aspect-square max-w-md mx-auto">
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-primary/30"
            style={{
              scale: 0.6 + i * 0.15,
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [0.6 + i * 0.15, 0.65 + i * 0.15, 0.6 + i * 0.15],
            }}
            transition={{
              rotate: {
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 3,
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

            {/* Pulsing dots around the brain */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 360) / 8;
              const x = Math.cos((angle * Math.PI) / 180) * 70;
              const y = Math.sin((angle * Math.PI) / 180) * 70;
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary"
                  style={{
                    left: `calc(50% + ${x}px - 4px)`,
                    top: `calc(50% + ${y}px - 4px)`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              );
            })}

            {/* Connecting lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ transform: "scale(2.5)" }}
            >
              {[...Array(8)].map((_, i) => {
                const angle = (i * 360) / 8;
                const x = Math.cos((angle * Math.PI) / 180) * 28;
                const y = Math.sin((angle * Math.PI) / 180) * 28;
                return (
                  <motion.line
                    key={i}
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${x}px)`}
                    y2={`calc(50% + ${y}px)`}
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.5"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 1,
                      delay: 0.5 + i * 0.1,
                      ease: "easeOut",
                    }}
                  />
                );
              })}
            </svg>
          </div>
        </motion.div>

        {/* Floating data particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
