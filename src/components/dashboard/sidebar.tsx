"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Award,
  User,
  Settings,
  LogOut,
  Brain,
  ChevronLeft,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

const navItems = [
  {
    title: "Tableau de bord",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Mes cours",
    href: "/dashboard/mes-cours",
    icon: BookOpen,
  },
  {
    title: "Certificats",
    href: "/dashboard/certificats",
    icon: Award,
  },
  {
    title: "Profil",
    href: "/dashboard/profil",
    icon: User,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col w-56 border-r border-border/30 bg-background h-screen sticky top-0",
        className
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-border/30">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <Brain className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold">{siteConfig.name}</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-border/30 space-y-0.5">
        <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-sm" asChild>
          <Link href="/cours">
            <ChevronLeft className="h-3.5 w-3.5 mr-2" />
            Retour aux cours
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start h-8 text-sm text-muted-foreground hover:text-destructive"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="h-3.5 w-3.5 mr-2" />
          Déconnexion
        </Button>
      </div>
    </aside>
  );
}
