"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";

interface QuizOption {
  text: string;
  isCorrect: boolean;
}

interface QuizProps {
  question: string;
  options: QuizOption[];
  correctFeedback: string;
  incorrectFeedback: string;
  onComplete?: (isCorrect: boolean) => void;
}

export function Quiz({
  question,
  options,
  correctFeedback,
  incorrectFeedback,
  onComplete,
}: QuizProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedIndex(index);
    setShowFeedback(true);
    onComplete?.(options[index].isCorrect);
  };

  const isCorrect = selectedIndex !== null && options[selectedIndex].isCorrect;

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <p className="font-medium text-lg mb-4">{question}</p>
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const showCorrect = showFeedback && option.isCorrect;
          const showIncorrect = showFeedback && isSelected && !option.isCorrect;

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={showFeedback}
              className={cn(
                "w-full text-left p-4 rounded-lg border-2 transition-all duration-300",
                !showFeedback && "hover:border-primary hover:bg-muted/50 cursor-pointer",
                showFeedback && "cursor-default",
                !showFeedback && "border-border bg-background",
                showCorrect && "border-green-500 bg-green-500/10",
                showIncorrect && "border-red-500 bg-red-500/10"
              )}
            >
              <span className="flex items-center gap-3">
                {showCorrect && <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />}
                {showIncorrect && <XCircle className="h-5 w-5 text-red-500 shrink-0" />}
                <span>{option.text}</span>
              </span>
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div
          className={cn(
            "mt-4 p-4 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2",
            isCorrect ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"
          )}
        >
          <Lightbulb className={cn("h-5 w-5 shrink-0 mt-0.5", isCorrect ? "text-green-500" : "text-red-500")} />
          <p className={cn("text-sm", isCorrect ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300")}>
            {isCorrect ? correctFeedback : incorrectFeedback}
          </p>
        </div>
      )}
    </div>
  );
}
