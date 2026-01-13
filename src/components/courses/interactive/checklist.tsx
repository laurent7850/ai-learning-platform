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
    <ul className="space-y-3">
      {items.map((item) => {
        const isChecked = checkedItems.has(item.id);
        return (
          <li
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={cn(
              "flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all",
              "border bg-card hover:bg-muted/50",
              isChecked && "bg-primary/5 border-primary"
            )}
          >
            <div
              className={cn(
                "w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-all",
                isChecked
                  ? "bg-primary border-primary"
                  : "border-muted-foreground/30"
              )}
            >
              {isChecked && <Check className="h-4 w-4 text-primary-foreground" />}
            </div>
            <div>
              <h4 className="font-medium">
                {item.emoji && <span className="mr-2">{item.emoji}</span>}
                {item.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {item.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
