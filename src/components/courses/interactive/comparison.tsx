"use client";

import { cn } from "@/lib/utils";
import { X, Check } from "lucide-react";

interface ComparisonProps {
  before: {
    label?: string;
    content: string;
    description?: string;
  };
  after: {
    label?: string;
    content: string;
    description?: string;
  };
}

export function Comparison({ before, after }: ComparisonProps) {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      <div className="rounded-lg border border-red-200/50 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/20 p-4">
        <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-medium text-xs uppercase tracking-wide mb-2">
          <X className="h-3.5 w-3.5" />
          {before.label || "Avant"}
        </div>
        <div className="font-mono text-sm text-muted-foreground">
          {before.content}
        </div>
        {before.description && (
          <p className="text-xs text-muted-foreground/80 mt-2">
            → {before.description}
          </p>
        )}
      </div>

      <div className="rounded-lg border border-green-200/50 dark:border-green-900/30 bg-green-50/50 dark:bg-green-950/20 p-4">
        <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-medium text-xs uppercase tracking-wide mb-2">
          <Check className="h-3.5 w-3.5" />
          {after.label || "Après"}
        </div>
        <div className="font-mono text-sm text-foreground/80 whitespace-pre-wrap">
          {after.content}
        </div>
        {after.description && (
          <p className="text-xs text-muted-foreground/80 mt-2">
            → {after.description}
          </p>
        )}
      </div>
    </div>
  );
}
