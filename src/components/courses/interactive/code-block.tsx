"use client";

import { useState } from "react";
import { Copy, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  label?: string;
  showCopy?: boolean;
}

export function CodeBlock({
  code,
  language = "text",
  label,
  showCopy = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative bg-background rounded-xl border border-border overflow-hidden">
      {label && (
        <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 bg-primary text-primary-foreground rounded">
          {label}
        </span>
      )}
      {showCopy && (
        <button
          onClick={handleCopy}
          className={cn(
            "absolute bottom-3 right-3 p-2 rounded-lg transition-all",
            "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
          )}
          title="Copier"
        >
          {copied ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      )}
      <pre className="p-5 overflow-x-auto">
        <code className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
          {code}
        </code>
      </pre>
    </div>
  );
}
