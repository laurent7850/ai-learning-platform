"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CreditCard,
  Settings,
  BarChart3,
  FileText,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Cours",
    href: "/admin/cours",
    icon: BookOpen,
  },
  {
    title: "Utilisateurs",
    href: "/admin/utilisateurs",
    icon: Users,
  },
  {
    title: "Abonnements",
    href: "/admin/abonnements",
    icon: CreditCard,
  },
  {
    title: "Statistiques",
    href: "/admin/statistiques",
    icon: BarChart3,
  },
  {
    title: "Contenu",
    href: "/admin/contenu",
    icon: FileText,
  },
  {
    title: "Paramètres",
    href: "/admin/parametres",
    icon: Settings,
  },
];

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2 font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <span>Admin Panel</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {adminNavItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/dashboard">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Retour au site
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-destructive" asChild>
            <Link href="/api/auth/signout">
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}

function AdminLoadingSkeleton() {
  return (
    <div className="flex min-h-screen">
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b px-6">
            <Skeleton className="h-8 w-32" />
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </nav>
        </div>
      </aside>
      <main className="ml-64 flex-1 p-8">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <AdminLoadingSkeleton />;
  }

  if (!session?.user) {
    redirect("/connexion");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 flex-1">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
