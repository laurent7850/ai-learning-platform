export const dynamic = "force-dynamic";

import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpen, Play } from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseCard } from "@/components/courses/course-card";
import { calculateProgress } from "@/lib/utils";

async function getUserCourses(userId: string) {
  const enrollments = await db.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          chapters: {
            include: {
              lessons: true,
            },
          },
          _count: {
            select: { enrollments: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const progressData = await db.progress.findMany({
    where: { userId, completed: true },
    select: { lessonId: true },
  });

  const completedLessonIds = new Set(progressData.map((p) => p.lessonId));

  const coursesWithProgress = enrollments.map((enrollment) => {
    const totalLessons = enrollment.course.chapters.reduce(
      (acc, chapter) => acc + chapter.lessons.length,
      0
    );
    const completedLessons = enrollment.course.chapters.reduce(
      (acc, chapter) =>
        acc +
        chapter.lessons.filter((lesson) => completedLessonIds.has(lesson.id))
          .length,
      0
    );

    return {
      ...enrollment.course,
      progressPercentage: calculateProgress(completedLessons, totalLessons),
    };
  });

  return {
    all: coursesWithProgress,
    inProgress: coursesWithProgress.filter(
      (c) => c.progressPercentage > 0 && c.progressPercentage < 100
    ),
    completed: coursesWithProgress.filter((c) => c.progressPercentage === 100),
    notStarted: coursesWithProgress.filter((c) => c.progressPercentage === 0),
  };
}

function CourseGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-video w-full rounded-xl" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center py-12 rounded-xl border bg-muted/30">
      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      {action}
    </div>
  );
}

async function MyCoursesContent() {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    redirect("/connexion");
  }

  const courses = await getUserCourses(session.user.id);

  if (courses.all.length === 0) {
    return (
      <EmptyState
        title="Aucun cours"
        description="Vous n'êtes inscrit à aucun cours pour le moment."
        action={
          <Button asChild>
            <Link href="/cours">
              <Play className="mr-2 h-4 w-4" />
              Découvrir les cours
            </Link>
          </Button>
        }
      />
    );
  }

  return (
    <Tabs defaultValue="all" className="space-y-6">
      <TabsList>
        <TabsTrigger value="all">
          Tous ({courses.all.length})
        </TabsTrigger>
        <TabsTrigger value="in-progress">
          En cours ({courses.inProgress.length})
        </TabsTrigger>
        <TabsTrigger value="completed">
          Terminés ({courses.completed.length})
        </TabsTrigger>
        <TabsTrigger value="not-started">
          Non commencés ({courses.notStarted.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.all.map((course) => (
            <CourseCard key={course.id} course={course} showProgress />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="in-progress">
        {courses.inProgress.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.inProgress.map((course) => (
              <CourseCard key={course.id} course={course} showProgress />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Aucun cours en cours"
            description="Commencez un cours pour le voir apparaître ici."
          />
        )}
      </TabsContent>

      <TabsContent value="completed">
        {courses.completed.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.completed.map((course) => (
              <CourseCard key={course.id} course={course} showProgress />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Aucun cours terminé"
            description="Terminez un cours pour le voir apparaître ici."
          />
        )}
      </TabsContent>

      <TabsContent value="not-started">
        {courses.notStarted.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.notStarted.map((course) => (
              <CourseCard key={course.id} course={course} showProgress />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Tous vos cours sont commencés"
            description="Vous avez commencé tous vos cours inscrits."
          />
        )}
      </TabsContent>
    </Tabs>
  );
}

export default function MyCoursesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Mes cours</h1>
        <p className="text-muted-foreground">
          Gérez et suivez votre progression
        </p>
      </div>

      <Suspense fallback={<CourseGridSkeleton />}>
        <MyCoursesContent />
      </Suspense>
    </div>
  );
}
