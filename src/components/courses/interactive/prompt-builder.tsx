"use client";

import { useState, useCallback } from "react";
import { Copy, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BuilderField {
  id: string;
  label: string;
  emoji: string;
  placeholder: string;
  hint: string;
  required?: boolean;
  multiline?: boolean;
}

interface PromptBuilderProps {
  fields: BuilderField[];
  title?: string;
  subtitle?: string;
}

export function PromptBuilder({
  fields,
  title = "Construisez votre prompt",
  subtitle = "Remplissez les champs pour générer votre prompt",
}: PromptBuilderProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const handleChange = useCallback((id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setValues({});
  }, []);

  const generatePrompt = useCallback(() => {
    return fields
      .filter((field) => values[field.id]?.trim())
      .map((field) => `[${field.label}] ${values[field.id].trim()}`)
      .join("\n\n");
  }, [fields, values]);

  const handleCopy = useCallback(async () => {
    const prompt = generatePrompt();
    if (!prompt) return;

    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [generatePrompt]);

  const hasContent = Object.values(values).some((v) => v?.trim());
  const prompt = generatePrompt();

  return (
    <div className="bg-muted/30 rounded-xl p-6 border border-border">
      <div className="mb-6">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="space-y-5">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className="block font-medium">
              {field.emoji} {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <p className="text-xs text-muted-foreground">{field.hint}</p>
            {field.multiline ? (
              <textarea
                id={field.id}
                value={values[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="w-full min-h-[80px] p-3 rounded-lg bg-background border border-border
                         focus:border-primary focus:ring-2 focus:ring-primary/20
                         transition-all resize-y text-sm"
              />
            ) : (
              <input
                type="text"
                id={field.id}
                value={values[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="w-full p-3 rounded-lg bg-background border border-border
                         focus:border-primary focus:ring-2 focus:ring-primary/20
                         transition-all text-sm"
              />
            )}
          </div>
        ))}
      </div>

      <div
        className={cn(
          "mt-6 p-4 rounded-lg border-2 border-dashed min-h-[100px] transition-all",
          hasContent ? "border-primary bg-primary/5" : "border-border"
        )}
      >
        <p className="text-xs uppercase tracking-wider text-primary font-medium mb-2">
          Votre prompt généré
        </p>
        {hasContent ? (
          <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
            {prompt}
          </pre>
        ) : (
          <p className="text-muted-foreground text-sm italic">
            Commencez à remplir les champs ci-dessus pour voir votre prompt se construire...
          </p>
        )}
      </div>

      <div className="flex gap-3 justify-center mt-6">
        <Button
          onClick={handleCopy}
          disabled={!hasContent}
          className="gap-2"
        >
          {copied ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Copié !
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copier le prompt
            </>
          )}
        </Button>
        <Button variant="outline" onClick={handleReset} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Réinitialiser
        </Button>
      </div>
    </div>
  );
}
