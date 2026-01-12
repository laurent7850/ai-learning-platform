import { Suspense } from "react";
import { CreditCard, TrendingUp, Users, DollarSign, Calendar } from "lucide-react";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatPrice } from "@/lib/utils";

async function getSubscriptionStats() {
  const [subscriptions, totalActive, totalCanceled] = await Promise.all([
    db.subscription.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    }),
    db.subscription.count({ where: { status: "ACTIVE" } }),
    db.subscription.count({ where: { status: "CANCELED" } }),
  ]);

  // Calculate MRR
  const activeSubscriptions = subscriptions.filter((s) => s.status === "ACTIVE");
  const mrr = activeSubscriptions.reduce((acc, sub) => {
    if (sub.plan === "BEGINNER") return acc + 9.99;
    if (sub.plan === "PRO") return acc + 19.99;
    return acc;
  }, 0);

  // Count by plan
  const beginnerCount = activeSubscriptions.filter(
    (s) => s.plan === "BEGINNER"
  ).length;
  const proCount = activeSubscriptions.filter((s) => s.plan === "PRO").length;

  return {
    subscriptions,
    totalActive,
    totalCanceled,
    mrr,
    beginnerCount,
    proCount,
  };
}

function SubscriptionsSkeleton() {
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
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}

async function SubscriptionsContent() {
  const stats = await getSubscriptionStats();

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MRR</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(stats.mrr)}</div>
            <p className="text-xs text-muted-foreground">
              Revenu mensuel récurrent
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abonnés actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalActive}</div>
            <p className="text-xs text-muted-foreground">
              {stats.beginnerCount} débutant, {stats.proCount} pro
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plan Débutant</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.beginnerCount}</div>
            <p className="text-xs text-muted-foreground">
              {formatPrice(stats.beginnerCount * 9.99)}/mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plan Pro</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.proCount}</div>
            <p className="text-xs text-muted-foreground">
              {formatPrice(stats.proCount * 19.99)}/mois
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tous les abonnements</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.subscriptions.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucun abonnement</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Utilisateur
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Plan
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Statut
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Période actuelle
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Créé le
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.subscriptions.map((sub) => (
                    <tr key={sub.id} className="border-b last:border-0">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium">
                            {sub.user.name || "Sans nom"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {sub.user.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            sub.plan === "PRO"
                              ? "default"
                              : sub.plan === "BEGINNER"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {sub.plan === "BEGINNER"
                            ? "Débutant"
                            : sub.plan === "PRO"
                            ? "Pro"
                            : "Gratuit"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            sub.status === "ACTIVE"
                              ? "success"
                              : sub.status === "CANCELED"
                              ? "destructive"
                              : "warning"
                          }
                        >
                          {sub.status === "ACTIVE"
                            ? "Actif"
                            : sub.status === "CANCELED"
                            ? "Annulé"
                            : sub.status === "PAST_DUE"
                            ? "En retard"
                            : "Inactif"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          {sub.currentPeriodStart && sub.currentPeriodEnd ? (
                            <>
                              <span>
                                {formatDate(sub.currentPeriodStart)}
                              </span>
                              <span className="text-muted-foreground">
                                {" → "}
                              </span>
                              <span>
                                {formatDate(sub.currentPeriodEnd)}
                              </span>
                            </>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-muted-foreground">
                          {formatDate(sub.createdAt)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminSubscriptionsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Gestion des abonnements</h1>
        <p className="text-muted-foreground">
          Suivez les abonnements et revenus de la plateforme
        </p>
      </div>

      <Suspense fallback={<SubscriptionsSkeleton />}>
        <SubscriptionsContent />
      </Suspense>
    </div>
  );
}
