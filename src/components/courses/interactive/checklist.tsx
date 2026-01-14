"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  emoji?: string;
}

interface ChecklistProps {
  items: ChecklistItem[];
  onAllCompleted?: () => void;
}

export function Checklist({ items, onAllCompleted }: ChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);

    if (newChecked.size === items.length) {
      onAllCompleted?.();
    }
  };

  return (
    <ul className="space-y-2">
      {items.map((item) => {
        const isChecked = checkedItems.has(item.id);
        return (
          <li
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all",
              "hover:bg-muted/50",
              isChecked && "bg-primary/5"
            )}
          >
            <div
              className={cn(
                "w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all mt-0.5",
                isChecked
                  ? "bg-primary border-primary"
                  : "border-muted-foreground/30"
              )}
            >
              {isChecked && <Check className="h-3 w-3 text-primary-foreground" />}
            </div>
            <div>
              <h4 className="text-sm font-medium">
                {item.emoji && <span className="mr-1.5">{item.emoji}</span>}
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {item.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
