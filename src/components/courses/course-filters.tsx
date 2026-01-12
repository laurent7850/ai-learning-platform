"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/config";

export function CourseFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const level = searchParams.get("level") || "all";
  const category = searchParams.get("category") || "all";
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

  const hasFilters = level !== "all" || category !== "all" || search !== "";

  const allCategories = [
    ...categories.BEGINNER,
    ...categories.INTERMEDIATE,
  ].filter(
    (cat, index, self) => index === self.findIndex((c) => c.id === cat.id)
  );

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
            <SelectValue placeholder="Niveau" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les niveaux</SelectItem>
            <SelectItem value="BEGINNER">Débutant</SelectItem>
            <SelectItem value="INTERMEDIATE">Intermédiaire</SelectItem>
          </SelectContent>
        </Select>

        {/* Category filter */}
        <Select
          value={category}
          onValueChange={(v) => updateFilter("category", v)}
        >
          <SelectTrigger className="w-full sm:w-[220px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {allCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active filters */}
      {hasFilters && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtres actifs:</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-7 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Effacer tout
          </Button>
        </div>
      )}
    </div>
  );
}
