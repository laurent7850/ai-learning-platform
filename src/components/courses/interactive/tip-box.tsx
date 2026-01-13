"use client";

import { cn } from "@/lib/utils";
import { Lightbulb, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type TipVariant = "tip" | "warning" | "success" | "info";

interface TipBoxProps {
  variant?: TipVariant;
  title?: string;
  children: React.ReactNode;
  icon?: string;
  className?: string;
}

const variantConfig: Record<TipVariant, {
  icon: LucideIcon;
  className: string;
  iconColor: string;
}> = {
  tip: {
    icon: Lightbulb,
    className: "bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/30",
    iconColor: "text-amber-500",
  },
  warning: {
    icon: AlertTriangle,
    className: "bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/30",
    iconColor: "text-orange-500",
  },
  success: {
    icon: CheckCircle2,
    className: "bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30",
    iconColor: "text-green-500",
  },
  info: {
    icon: Info,
    className: "bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30",
    iconColor: "text-blue-500",
  },
};

export function TipBox({ variant = "tip", title, children, icon, className }: TipBoxProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className={cn("rounded-xl p-5 border flex gap-4", config.className, className)}>
      <div className="shrink-0">
        {icon ? (
          <span className="text-2xl">{icon}</span>
        ) : (
          <Icon className={cn("h-6 w-6", config.iconColor)} />
        )}
      </div>
      <div className="text-sm text-muted-foreground">
        {title && <strong className="text-foreground">{title} </strong>}
        {children}
      </div>
    </div>
  );
}
