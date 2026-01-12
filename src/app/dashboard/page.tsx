import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  ArrowRight,
  Play,
} from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseCard } from "@/components/courses/course-card";
import { formatDuration, calculateProgress } from "@/lib/utils";

async function getDashboardData(userId: string) {
  const [enrollments, progressData, certificates, subscription] =
    await Promise.all([
      db.enrollment.findMany({
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
      }),
      db.progress.findMany({
        where: { userId, completed: true },
        select: {
          lessonId: true,
          lesson: {
            select: { duration: true },
          },
        },
      }),
      db.certificate.findMany({
        where: { userId },
      }),
      db.subscription.findUnique({
        where: { userId },
      }),
    ]);

  // Calculate stats
  const totalLessonsCompleted = progressData.length;
  const totalTimeSpent = progressData.reduce(
    (acc, p) => acc + (p.lesson?.duration || 0),
    0
  );

  // Calculate progress for each course
  const coursesWithProgress = enrollments.map((enrollment) => {
    const totalLessons = enrollment.course.chapters.reduce(
      (acc, chapter) => acc + chapter.lessons.length,
      0
    );
    const completedLessons = progressData.filter((p) =>
      enrollment.course.chapters.some((chapter) =>
        chapter.lessons.some((lesson) => lesson.id === p.lessonId)
      )
    ).length;

    return {
      ...enrollment.course,
      progressPercentage: calculateProgress(completedLessons, totalLessons),
    };
  });

  const inProgressCourses = coursesWithProgress.filter(
    (c) => c.progressPercentage > 0 && c.progressPercentage < 100
  );
  const completedCourses = coursesWithProgress.filter(
    (c) => c.progressPercentage === 100
  );

  return {
    enrollments,
    coursesWithProgress,
    inProgressCourses,
    completedCourses,
    totalLessonsCompleted,
    totalTimeSpent,
    certificates,
    subscription,
  };
}

function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-16" />
      </CardContent>
    </Card>
  );
}

async function DashboardContent() {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    redirect("/connexion");
  }

  const data = await getDashboardData(session.user.id);

  const stats = [
    {
      title: "Cours suivis",
      value: data.enrollments.length,
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      title: "Leçons terminées",
      value: data.totalLessonsCompleted,
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Temps d'apprentissage",
      value: formatDuration(data.totalTimeSpent),
      icon: Clock,
      color: "text-amber-500",
    },
    {
      title: "Certificats",
      value: data.certificates.length,
      icon: Award,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold">
          Bonjour, {session.user.name?.split(" ")[0]} !
        </h1>
        <p className="text-muted-foreground">
          Voici un aperçu de votre progression
        </p>
      </div>

      {/* Subscription Banner */}
      {(!data.subscription || data.subscription.plan === "FREE") && (
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-semibold mb-1">
                Débloquez tous les cours
              </h3>
              <p className="text-sm text-muted-foreground">
                Passez au plan Pro pour accéder à l'intégralité de notre
                catalogue.
              </p>
            </div>
            <Button asChild>
              <Link href="/tarifs">
                Voir les plans
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* In Progress Courses */}
      {data.inProgressCourses.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Continuer l'apprentissage</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/mes-cours">
                Voir tout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.inProgressCourses.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} showProgress />
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {data.enrollments.length === 0 && (
        <div className="text-center py-12 rounded-xl border bg-muted/30">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Commencez votre apprentissage
          </h3>
          <p className="text-muted-foreground mb-4">
            Explorez notre catalogue et inscrivez-vous à votre premier cours.
          </p>
          <Button asChild>
            <Link href="/cours">
              <Play className="mr-2 h-4 w-4" />
              Découvrir les cours
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-8">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
