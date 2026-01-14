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
    <div className="rounded-xl p-5 bg-muted/50 text-center">
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
        {title}
      </p>

      <div className="flex flex-wrap justify-center items-center gap-1.5 text-sm font-medium">
        {items.map((item, index) => (
          <motion.span
            key={item.letter}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="inline-flex items-center"
          >
            <span
              className={cn(
                "inline-block px-2.5 py-1 bg-background rounded-md border border-border/50 transition-colors hover:border-primary/50",
                item.color
              )}
            >
              <span className="text-primary font-semibold">{item.letter}</span>
              <span className="text-foreground">{item.word.slice(1)}</span>
            </span>
            {index < items.length - 1 && (
              <span className="mx-1 text-muted-foreground/60 text-xs">+</span>
            )}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
