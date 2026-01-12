import { Suspense } from "react";
import Link from "next/link";
import {
  Users,
  BookOpen,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  UserPlus,
  DollarSign,
  GraduationCap,
} from "lucide-react";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice, formatDate } from "@/lib/utils";

async function getAdminStats() {
  const [
    totalUsers,
    newUsersThisMonth,
    totalCourses,
    publishedCourses,
    totalEnrollments,
    activeSubscriptions,
    recentUsers,
    recentEnrollments,
  ] = await Promise.all([
    db.user.count(),
    db.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(1)),
        },
      },
    }),
    db.course.count(),
    db.course.count({ where: { published: true } }),
    db.enrollment.count(),
    db.subscription.count({ where: { status: "ACTIVE" } }),
    db.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
    }),
    db.enrollment.findMany({
      take: 5,
      orderBy: { enrolledAt: "desc" },
      include: {
        user: {
          select: { name: true, email: true },
        },
        course: {
          select: { title: true, slug: true },
        },
      },
    }),
  ]);

  // Calculate MRR (Monthly Recurring Revenue)
  const subscriptions = await db.subscription.findMany({
    where: { status: "ACTIVE" },
    select: { plan: true },
  });

  const mrr = subscriptions.reduce((acc, sub) => {
    if (sub.plan === "BEGINNER") return acc + 9.99;
    if (sub.plan === "PRO") return acc + 19.99;
    return acc;
  }, 0);

  return {
    totalUsers,
    newUsersThisMonth,
    totalCourses,
    publishedCourses,
    totalEnrollments,
    activeSubscriptions,
    mrr,
    recentUsers,
    recentEnrollments,
  };
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  trend?: "up" | "down";
  trendValue?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {trend && (
            <>
              {trend === "up" ? (
                <ArrowUpRight className="h-3 w-3 text-green-500" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-500" />
              )}
              <span className={trend === "up" ? "text-green-500" : "text-red-500"}>
                {trendValue}
              </span>
            </>
          )}
          <span>{description}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20 mb-1" />
            <Skeleton className="h-3 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function AdminDashboardContent() {
  const stats = await getAdminStats();

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Utilisateurs"
          value={stats.totalUsers}
          description="Total des utilisateurs"
          icon={Users}
          trend="up"
          trendValue={`+${stats.newUsersThisMonth}`}
        />
        <StatCard
          title="Cours"
          value={`${stats.publishedCourses}/${stats.totalCourses}`}
          description="Cours publiés"
          icon={BookOpen}
        />
        <StatCard
          title="Inscriptions"
          value={stats.totalEnrollments}
          description="Total des inscriptions"
          icon={GraduationCap}
        />
        <StatCard
          title="MRR"
          value={formatPrice(stats.mrr)}
          description={`${stats.activeSubscriptions} abonnements actifs`}
          icon={DollarSign}
          trend="up"
          trendValue="+12%"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Nouveaux utilisateurs</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/utilisateurs">
                Voir tout
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
                    {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user.name || "Sans nom"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(user.createdAt)}
                  </span>
                </div>
              ))}
              {stats.recentUsers.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Aucun utilisateur récent
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Enrollments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Inscriptions récentes</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/cours">
                Voir tout
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentEnrollments.map((enrollment) => (
                <div key={enrollment.id} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {enrollment.course.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {enrollment.user.name || enrollment.user.email}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(enrollment.enrolledAt)}
                  </span>
                </div>
              ))}
              {stats.recentEnrollments.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Aucune inscription récente
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/admin/cours/nouveau">
                <BookOpen className="mr-2 h-4 w-4" />
                Nouveau cours
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/utilisateurs">
                <Users className="mr-2 h-4 w-4" />
                Gérer les utilisateurs
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/statistiques">
                <TrendingUp className="mr-2 h-4 w-4" />
                Voir les statistiques
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/contenu">
                <Eye className="mr-2 h-4 w-4" />
                Gérer le contenu
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Admin</h1>
        <p className="text-muted-foreground">
          Bienvenue dans le panneau d&apos;administration
        </p>
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <AdminDashboardContent />
      </Suspense>
    </div>
  );
}
