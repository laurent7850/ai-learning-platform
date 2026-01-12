"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-20 text-center"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[url('/grid-white.svg')] bg-center opacity-10" />
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10">
            <Sparkles className="h-12 w-12 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Prêt à maîtriser l'IA ?
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
              Rejoignez plus de 10 000 apprenants et commencez votre parcours
              vers la maîtrise de l'intelligence artificielle dès aujourd'hui.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="xl"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link href="/inscription">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <Link href="/cours">Explorer les cours</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/60">
              Aucune carte bancaire requise pour commencer
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
