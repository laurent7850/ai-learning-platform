"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, Zap, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: Zap, text: "Accès instantané" },
  { icon: Shield, text: "Garantie 14 jours" },
  { icon: Clock, text: "Support 24/7" },
];

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl bg-primary p-10 md:p-14 text-center"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]" />

          <div className="relative z-10">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/15 mb-5">
              <Sparkles className="h-6 w-6 text-white" />
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Prêt à maîtriser l'IA ?
            </h2>

            <p className="mt-3 text-white/80 max-w-xl mx-auto">
              Rejoignez plus de 10 000 apprenants et commencez votre parcours
              vers la maîtrise de l'intelligence artificielle dès aujourd'hui.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/95"
                asChild
              >
                <Link href="/inscription">
                  Créer mon compte gratuit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <Link href="/cours">Explorer les cours</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
              {benefits.map((benefit) => (
                <div
                  key={benefit.text}
                  className="flex items-center gap-1.5 text-sm text-white/70"
                >
                  <benefit.icon className="h-3.5 w-3.5" />
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-white/50">
              Aucune carte bancaire requise pour commencer
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
