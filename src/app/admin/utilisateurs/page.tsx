import { Suspense } from "react";
import {
  Search,
  MoreHorizontal,
  Shield,
  User,
  Mail,
  Calendar,
  CreditCard,
} from "lucide-react";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";

async function getUsers() {
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      subscription: true,
      _count: {
        select: {
          enrollments: true,
        },
      },
    },
  });

  return users;
}

function UsersSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function UsersContent() {
  const users = await getUsers();

  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Utilisateur
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Rôle
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Abonnement
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Cours
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Inscrit le
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium">
                        {user.name?.[0]?.toUpperCase() ||
                          user.email?.[0]?.toUpperCase() ||
                          "?"}
                      </div>
                      <div>
                        <p className="font-medium">
                          {user.name || "Sans nom"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={user.role === "ADMIN" ? "default" : "secondary"}
                    >
                      {user.role === "ADMIN" ? (
                        <>
                          <Shield className="mr-1 h-3 w-3" />
                          Admin
                        </>
                      ) : (
                        <>
                          <User className="mr-1 h-3 w-3" />
                          Utilisateur
                        </>
                      )}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {user.subscription?.status === "ACTIVE" ? (
                      <Badge variant="success">
                        {user.subscription.plan === "BEGINNER"
                          ? "Débutant"
                          : user.subscription.plan === "PRO"
                          ? "Pro"
                          : "Gratuit"}
                      </Badge>
                    ) : (
                      <Badge variant="outline">Gratuit</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm">
                      {user._count.enrollments} cours
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Aucun utilisateur</p>
        </div>
      )}
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
        <p className="text-muted-foreground">
          Visualisez et gérez les utilisateurs de la plateforme
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un utilisateur..." className="pl-9" />
        </div>
      </div>

      <Suspense fallback={<UsersSkeleton />}>
        <UsersContent />
      </Suspense>
    </div>
  );
}
