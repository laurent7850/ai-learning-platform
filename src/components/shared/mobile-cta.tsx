"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { status } = useSession();
  const pathname = usePathname();

  // Pages où on ne veut pas afficher le CTA
  const excludedPaths = [
    "/inscription",
    "/connexion",
    "/dashboard",
    "/admin",
    "/cours/",
  ];

  const shouldHide = excludedPaths.some((path) => pathname.startsWith(path));

  useEffect(() => {
    const handleScroll = () => {
      // Afficher après avoir scrollé 300px
      const scrolled = window.scrollY > 300;
      setIsVisible(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ne pas afficher si l'utilisateur est connecté, sur une page exclue, ou a fermé le CTA
  if (status === "authenticated" || shouldHide || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          {/* Gradient border top */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* CTA container */}
          <div className="bg-background/95 backdrop-blur-xl border-t border-border/50 px-4 py-3 safe-area-bottom">
            <div className="flex items-center gap-3">
              {/* Close button */}
              <button
                onClick={() => setIsDismissed(true)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* CTA button */}
              <motion.div className="flex-1 relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary via-accent to-primary opacity-50 blur-lg" />
                <Button
                  size="lg"
                  className="w-full relative bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-xl font-semibold"
                  asChild
                >
                  <Link href="/inscription">
                    Créer mon compte gratuit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Trust text */}
            <p className="text-center text-xs text-muted-foreground mt-2">
              Gratuit, sans carte bancaire
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
