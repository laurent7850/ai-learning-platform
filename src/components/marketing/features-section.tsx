"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Zap,
  Target,
  Shield,
  Clock,
  Award,
  Sparkles,
  TrendingUp,
  LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: Brain,
    title: "Cours accessibles",
    description:
      "Pas besoin de compétences techniques. Nos cours sont conçus pour tous les niveaux.",
    color: "bg-blue-500",
  },
  {
    icon: Zap,
    title: "Apprentissage pratique",
    description:
      "Des exercices concrets et des projets réels pour appliquer immédiatement vos connaissances.",
    color: "bg-cyan-500",
  },
  {
    icon: Target,
    title: "Parcours personnalisé",
    description:
      "Deux niveaux (Débutant et Intermédiaire) pour progresser à votre rythme.",
    color: "bg-teal-500",
  },
  {
    icon: Clock,
    title: "Accès 24/7",
    description:
      "Apprenez quand vous voulez, où vous voulez. Les cours restent accessibles indéfiniment.",
    color: "bg-indigo-500",
  },
  {
    icon: Award,
    title: "Certificats reconnus",
    description:
      "Obtenez des certificats à partager sur LinkedIn et valoriser vos compétences.",
    color: "bg-slate-500",
  },
  {
    icon: Shield,
    title: "Éthique IA",
    description:
      "Apprenez les bonnes pratiques et l'utilisation responsable de l'intelligence artificielle.",
    color: "bg-sky-500",
  },
  {
    icon: Sparkles,
    title: "Contenus actualisés",
    description:
      "Nos cours sont régulièrement mis à jour pour suivre les dernières avancées de l'IA.",
    color: "bg-violet-500",
  },
  {
    icon: TrendingUp,
    title: "ROI garanti",
    description:
      "Gagnez du temps et boostez votre productivité dès les premières leçons.",
    color: "bg-emerald-500",
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <div className="h-full rounded-lg border border-border/40 bg-card p-5 transition-colors hover:border-border/60">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${feature.color}`}>
          <feature.icon className="h-5 w-5 text-white" />
        </div>

        <h3 className="mt-4 text-base font-medium">{feature.title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export function FeaturesSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="container relative">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center mb-12"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Pourquoi nous choisir
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Pourquoi apprendre l'IA avec nous ?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Une approche pédagogique unique pour maîtriser l'IA rapidement et efficacement.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
