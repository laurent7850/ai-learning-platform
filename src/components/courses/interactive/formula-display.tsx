"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FormulaItem {
  letter: string;
  word: string;
  color?: string;
}

interface FormulaDisplayProps {
  title: string;
  items: FormulaItem[];
}

export function FormulaDisplay({ title, items }: FormulaDisplayProps) {
  return (
    <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary rounded-2xl p-8 text-center overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent pointer-events-none" />

      <p className="relative text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">
        {title}
      </p>

      <div className="relative flex flex-wrap justify-center items-center gap-2 font-mono text-lg md:text-xl font-bold">
        {items.map((item, index) => (
          <motion.span
            key={item.letter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="inline-flex items-center"
          >
            <span
              className={cn(
                "inline-block px-3 py-1.5 bg-card rounded-lg transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground cursor-default",
                item.color
              )}
            >
              <span className="text-primary font-bold">{item.letter}</span>
              <span className="text-foreground">{item.word.slice(1)}</span>
            </span>
            {index < items.length - 1 && (
              <span className="mx-1 text-muted-foreground">+</span>
            )}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
