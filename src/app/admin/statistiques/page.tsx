export const dynamic = "force-dynamic";

import { Suspense } from "react";
import {
  BarChart3,
  Users,
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  Target,
} from "lucide-react";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

async function getStatistics() {
  const [
    totalUsers,
    totalCourses,
    totalEnrollments,
    totalCompletedLessons,
    totalCertificates,
    courseStats,
    levelDistribution,
    recentProgress,
  ] = await Promise.all([
    db.user.count(),
    db.course.count({ where: { published: true } }),
    db.enrollment.count(),
    db.progress.count({ where: { completed: true } }),
    db.certificate.count(),
    db.course.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        level: true,
        _count: {
          select: {
            enrollments: true,
          },
        },
        chapters: {
          select: {
            lessons: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    }),
    db.course.groupBy({
      by: ["level"],
      _count: {
        id: true,
      },
    }),
    db.progress.findMany({
      where: {
        completed: true,
        completedAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
      select: {
        completedAt: true,
      },
    }),
  ]);

  // Process course stats
  const processedCourseStats = await Promise.all(
    courseStats.map(async (course) => {
      const totalLessons = course.chapters.reduce(
        (acc, chapter) => acc + chapter.lessons.length,
        0
      );
      const lessonIds = course.chapters.flatMap((ch) =>
        ch.lessons.map((l) => l.id)
      );

      const completedLessons = await db.progress.count({
        where: {
          lessonId: { in: lessonIds },
          completed: true,
        },
      });

      return {
        id: course.id,
        title: course.title,
        level: course.level,
        enrollments: course._count.enrollments,
        totalLessons,
        completedLessons,
        completionRate:
          totalLessons > 0 && course._count.enrollments > 0
            ? Math.round(
                (completedLessons / (totalLessons * course._count.enrollments)) *
                  100
              )
            : 0,
      };
    })
  );

  // Average completion rate
  const avgCompletionRate =
    processedCourseStats.length > 0
      ? Math.round(
          processedCourseStats.reduce((acc, c) => acc + c.completionRate, 0) /
            processedCourseStats.length
        )
      : 0;

  // Lessons completed per day (last 30 days)
  const lessonsPerDay: Record<string, number> = {};
  recentProgress.forEach((p) => {
    if (p.completedAt) {
      const day = p.completedAt.toISOString().split("T")[0];
      lessonsPerDay[day] = (lessonsPerDay[day] || 0) + 1;
    }
  });

  return {
    totalUsers,
    totalCourses,
    totalEnrollments,
    totalCompletedLessons,
    totalCertificates,
    avgCompletionRate,
    courseStats: processedCourseStats.sort(
      (a, b) => b.enrollments - a.enrollments
    ),
    levelDistribution,
    lessonsPerDay,
  };
}

function StatisticsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

async function StatisticsContent() {
  const stats = await getStatistics();

  const beginnerCourses =
    stats.levelDistribution.find((l) => l.level === "BEGINNER")?._count.id || 0;
  const intermediateCourses =
    stats.levelDistribution.find((l) => l.level === "INTERMEDIATE")?._count.id ||
    0;

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Utilisateurs inscrits
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inscriptions</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEnrollments}</div>
            <p className="text-xs text-muted-foreground">
              Total des inscriptions aux cours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Leçons complétées
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalCompletedLessons}
            </div>
            <p className="text-xs text-muted-foreground">
              Taux moyen: {stats.avgCompletionRate}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificats</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCertificates}</div>
            <p className="text-xs text-muted-foreground">Certificats délivrés</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Distribution */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Répartition par niveau</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Débutant</span>
                <span className="text-muted-foreground">
                  {beginnerCourses} cours
                </span>
              </div>
              <Progress
                value={
                  stats.totalCourses > 0
                    ? (beginnerCourses / stats.totalCourses) * 100
                    : 0
                }
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Intermédiaire</span>
                <span className="text-muted-foreground">
                  {intermediateCourses} cours
                </span>
              </div>
              <Progress
                value={
                  stats.totalCourses > 0
                    ? (intermediateCourses / stats.totalCourses) * 100
                    : 0
                }
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Taux de complétion moyen</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-8">
            <div className="relative h-32 w-32">
              <svg className="h-full w-full -rotate-90 transform">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${stats.avgCompletionRate * 3.52} 352`}
                  className="text-primary"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">
                  {stats.avgCompletionRate}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Cours les plus populaires</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.courseStats.slice(0, 5).map((course, index) => (
              <div key={course.id} className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{course.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {course.enrollments} inscrits • {course.completionRate}%
                    complétion
                  </p>
                </div>
                <Progress
                  value={course.completionRate}
                  className="w-24 h-2"
                />
              </div>
            ))}
            {stats.courseStats.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Aucune donnée disponible
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Course Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Performance des cours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Cours
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Niveau
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Inscrits
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Leçons
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Complétion
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.courseStats.map((course) => (
                  <tr key={course.id} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium">{course.title}</td>
                    <td className="px-4 py-3">
                      {course.level === "BEGINNER" ? "Débutant" : "Intermédiaire"}
                    </td>
                    <td className="px-4 py-3">{course.enrollments}</td>
                    <td className="px-4 py-3">
                      {course.completedLessons}/{course.totalLessons}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Progress
                          value={course.completionRate}
                          className="w-16 h-2"
                        />
                        <span className="text-sm">{course.completionRate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminStatisticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Statistiques</h1>
        <p className="text-muted-foreground">
          Analysez les performances de votre plateforme
        </p>
      </div>

      <Suspense fallback={<StatisticsSkeleton />}>
        <StatisticsContent />
      </Suspense>
    </div>
  );
}
