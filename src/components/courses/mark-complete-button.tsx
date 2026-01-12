"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface MarkCompleteButtonProps {
  lessonId: string;
  isCompleted: boolean;
  nextLessonUrl?: string;
}

export function MarkCompleteButton({
  lessonId,
  isCompleted,
  nextLessonUrl,
}: MarkCompleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(isCompleted);

  const handleMarkComplete = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonId,
          completed: !completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update progress");
      }

      setCompleted(!completed);

      if (!completed) {
        toast({
          title: "Leçon terminée !",
          description: nextLessonUrl
            ? "Passez à la leçon suivante pour continuer."
            : "Félicitations, vous avez terminé ce cours !",
          variant: "success",
        });

        // Optionally navigate to next lesson
        if (nextLessonUrl) {
          setTimeout(() => {
            router.push(nextLessonUrl);
          }, 1500);
        }
      }

      router.refresh();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la progression.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (completed) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
          <div>
            <p className="font-medium text-green-800 dark:text-green-200">
              Leçon terminée
            </p>
            <p className="text-sm text-green-600 dark:text-green-400">
              Vous avez complété cette leçon
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleMarkComplete}>
            Marquer comme non terminée
          </Button>
          {nextLessonUrl && (
            <Button size="sm" onClick={() => router.push(nextLessonUrl)}>
              Leçon suivante
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-muted/50 border">
      <div>
        <p className="font-medium">Vous avez terminé cette leçon ?</p>
        <p className="text-sm text-muted-foreground">
          Marquez-la comme complétée pour suivre votre progression
        </p>
      </div>
      <Button onClick={handleMarkComplete} disabled={loading}>
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <CheckCircle2 className="mr-2 h-4 w-4" />
        )}
        Marquer comme terminée
      </Button>
    </div>
  );
}
