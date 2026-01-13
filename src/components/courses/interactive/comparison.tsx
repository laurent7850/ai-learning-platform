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
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-red-500/5 border-2 border-red-500/30 rounded-xl p-5">
        <div className="flex items-center gap-2 text-red-500 font-semibold text-sm uppercase tracking-wider mb-3">
          <X className="h-4 w-4" />
          {before.label || "Avant"}
        </div>
        <div className="font-mono text-sm bg-background/50 rounded-lg p-4">
          {before.content}
        </div>
        {before.description && (
          <p className="text-sm text-muted-foreground mt-3">
            → {before.description}
          </p>
        )}
      </div>

      <div className="bg-green-500/5 border-2 border-green-500/30 rounded-xl p-5">
        <div className="flex items-center gap-2 text-green-500 font-semibold text-sm uppercase tracking-wider mb-3">
          <Check className="h-4 w-4" />
          {after.label || "Après"}
        </div>
        <div className="font-mono text-sm bg-background/50 rounded-lg p-4 whitespace-pre-wrap">
          {after.content}
        </div>
        {after.description && (
          <p className="text-sm text-muted-foreground mt-3">
            → {after.description}
          </p>
        )}
      </div>
    </div>
  );
}
