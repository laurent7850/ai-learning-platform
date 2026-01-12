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
