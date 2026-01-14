"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, GraduationCap, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects, levels } from "@/lib/config";

export function CourseFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const level = searchParams.get("level") || "all";
  const subject = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/cours?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/cours");
  };

  const hasFilters = level !== "all" || subject !== "all" || search !== "";

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un cours..."
            value={search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Level filter */}
        <Select value={level} onValueChange={(v) => updateFilter("level", v)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Niveau" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les niveaux</SelectItem>
            {levels.map((lvl) => (
              <SelectItem key={lvl.id} value={lvl.slug}>
                {lvl.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Subject filter */}
        <Select
          value={subject}
          onValueChange={(v) => updateFilter("category", v)}
        >
          <SelectTrigger className="w-full sm:w-[220px]">
            <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Sujet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les sujets</SelectItem>
            {subjects.map((subj) => (
              <SelectItem key={subj.id} value={subj.slug}>
                {subj.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active filters */}
      {hasFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Filtres actifs:</span>
          {level !== "all" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              <GraduationCap className="h-3 w-3 mr-1" />
              {levels.find(l => l.slug === level)?.name}
            </span>
          )}
          {subject !== "all" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
              <BookOpen className="h-3 w-3 mr-1" />
              {subjects.find(s => s.slug === subject)?.name}
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-7 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Effacer
          </Button>
        </div>
      )}
    </div>
  );
}
