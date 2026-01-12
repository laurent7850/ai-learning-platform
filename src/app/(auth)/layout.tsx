import Link from "next/link";
import { Brain } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl">{siteConfig.name}</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Tous droits
            réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
