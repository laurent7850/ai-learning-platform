import { Suspense } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  BookOpen,
  Users,
  Clock,
} from "lucide-react";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";

async function getCourses() {
  const courses = await db.course.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      chapters: {
        include: {
          lessons: true,
        },
      },
      _count: {
        select: {
          enrollments: true,
        },
      },
    },
  });

  return courses.map((course) => {
    const totalLessons = course.chapters.reduce(
      (acc, chapter) => acc + chapter.lessons.length,
      0
    );
    const totalDuration = course.chapters.reduce(
      (acc, chapter) =>
        acc + chapter.lessons.reduce((a, l) => a + l.duration, 0),
      0
    );

    return {
      ...course,
      totalLessons,
      totalDuration,
      totalChapters: course.chapters.length,
      enrollmentCount: course._count.enrollments,
    };
  });
}

function CoursesSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-24 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-9 w-24" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function CoursesContent() {
  const courses = await getCourses();

  if (courses.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Aucun cours</h3>
          <p className="text-muted-foreground mb-4">
            Créez votre premier cours pour commencer
          </p>
          <Button asChild>
            <Link href="/admin/cours/nouveau">
              <Plus className="mr-2 h-4 w-4" />
              Créer un cours
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <Card key={course.id}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Thumbnail */}
              <div className="h-16 w-24 rounded-lg bg-muted flex items-center justify-center shrink-0">
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <BookOpen className="h-6 w-6 text-muted-foreground" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate">{course.title}</h3>
                  <Badge
                    variant={course.published ? "success" : "secondary"}
                    className="shrink-0"
                  >
                    {course.published ? "Publié" : "Brouillon"}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    {course.totalChapters} chapitres, {course.totalLessons} leçons
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {course.enrollmentCount} inscrits
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {Math.round(course.totalDuration / 60)}h
                  </span>
                </div>
              </div>

              {/* Level & Plan */}
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={course.level === "BEGINNER" ? "beginner" : "intermediate"}>
                  {course.level === "BEGINNER" ? "Débutant" : "Intermédiaire"}
                </Badge>
                <Badge variant="outline">
                  {course.requiredPlan === "FREE"
                    ? "Gratuit"
                    : course.requiredPlan === "BEGINNER"
                    ? "Débutant"
                    : "Pro"}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/cours/${course.slug}`} target="_blank">
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/cours/${course.id}`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function AdminCoursesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestion des cours</h1>
          <p className="text-muted-foreground">
            Créez et gérez les cours de la plateforme
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/cours/nouveau">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau cours
          </Link>
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un cours..." className="pl-9" />
        </div>
      </div>

      <Suspense fallback={<CoursesSkeleton />}>
        <CoursesContent />
      </Suspense>
    </div>
  );
}
