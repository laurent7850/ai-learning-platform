export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { CourseCard } from "@/components/courses/course-card";
import { CourseFilters } from "@/components/courses/course-filters";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Catalogue des cours",
  description:
    "Découvrez tous nos cours pour apprendre l'Intelligence Artificielle, du débutant au niveau intermédiaire.",
};

// Données de démonstration en cas d'erreur de connexion à la base de données
const demoCourses = [
  {
    id: "demo-1",
    slug: "introduction-chatgpt",
    title: "Introduction à ChatGPT",
    description: "Apprenez les bases de ChatGPT et comment l'utiliser efficacement pour vos tâches quotidiennes.",
    thumbnail: "/images/course-chatgpt.jpg",
    level: "BEGINNER" as const,
    category: "chatgpt",
    duration: 120,
    requiredPlan: "FREE" as const,
    _count: { enrollments: 1250 },
  },
  {
    id: "demo-2",
    slug: "prompting-avance",
    title: "Prompting Avancé",
    description: "Maîtrisez l'art du prompting pour obtenir des résultats optimaux avec les modèles de langage.",
    thumbnail: "/images/course-prompting.jpg",
    level: "INTERMEDIATE" as const,
    category: "prompting",
    duration: 180,
    requiredPlan: "STARTER" as const,
    _count: { enrollments: 890 },
  },
  {
    id: "demo-3",
    slug: "midjourney-creation-images",
    title: "Création d'images avec Midjourney",
    description: "Générez des images impressionnantes avec Midjourney, de la conception à la réalisation.",
    thumbnail: "/images/course-midjourney.jpg",
    level: "BEGINNER" as const,
    category: "image",
    duration: 150,
    requiredPlan: "FREE" as const,
    _count: { enrollments: 1100 },
  },
  {
    id: "demo-4",
    slug: "automatisation-ia",
    title: "Automatisation avec l'IA",
    description: "Automatisez vos tâches répétitives en utilisant les outils d'IA les plus performants.",
    thumbnail: "/images/course-automation.jpg",
    level: "INTERMEDIATE" as const,
    category: "automation",
    duration: 240,
    requiredPlan: "PRO" as const,
    _count: { enrollments: 650 },
  },
  {
    id: "demo-5",
    slug: "claude-ai-assistant",
    title: "Maîtriser Claude AI",
    description: "Découvrez Claude, l'assistant IA d'Anthropic, et apprenez à l'utiliser pour vos projets.",
    thumbnail: "/images/course-claude.jpg",
    level: "BEGINNER" as const,
    category: "chatgpt",
    duration: 90,
    requiredPlan: "FREE" as const,
    _count: { enrollments: 780 },
  },
  {
    id: "demo-6",
    slug: "dall-e-creation-visuelle",
    title: "DALL-E : Création Visuelle",
    description: "Créez des visuels uniques avec DALL-E et intégrez-les dans vos projets créatifs.",
    thumbnail: "/images/course-dalle.jpg",
    level: "INTERMEDIATE" as const,
    category: "image",
    duration: 160,
    requiredPlan: "STARTER" as const,
    _count: { enrollments: 520 },
  },
];

interface CoursesPageProps {
  searchParams: Promise<{
    level?: string;
    category?: string;
    search?: string;
  }>;
}

async function getCourses(filters: {
  level?: string;
  category?: string;
  search?: string;
}) {
  try {
    const where: any = {
      published: true,
    };

    if (filters.level && filters.level !== "all") {
      where.level = filters.level;
    }

    if (filters.category && filters.category !== "all") {
      where.category = filters.category;
    }

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const courses = await db.course.findMany({
      where,
      orderBy: [{ level: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        thumbnail: true,
        level: true,
        category: true,
        duration: true,
        requiredPlan: true,
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    });

    return courses;
  } catch (error) {
    console.error("Erreur de connexion à la base de données, utilisation des données de démonstration:", error);

    // Filtrer les données de démonstration selon les filtres
    let filtered = [...demoCourses];

    if (filters.level && filters.level !== "all") {
      filtered = filtered.filter(c => c.level === filters.level);
    }

    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter(c => c.category === filters.category);
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(search) ||
        c.description.toLowerCase().includes(search)
      );
    }

    return filtered;
  }
}

function CourseGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-video w-full rounded-xl" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function CourseGrid({
  searchParams,
}: {
  searchParams: { level?: string; category?: string; search?: string };
}) {
  const courses = await getCourses(searchParams);

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Aucun cours ne correspond à vos critères.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;

  return (
    <div className="py-12 md:py-20">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Catalogue des cours
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explorez notre collection de cours pour maîtriser l'Intelligence
            Artificielle à votre rythme.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <CourseFilters />
          </Suspense>
        </div>

        {/* Course Grid */}
        <Suspense fallback={<CourseGridSkeleton />}>
          <CourseGrid searchParams={params} />
        </Suspense>
      </div>
    </div>
  );
}
