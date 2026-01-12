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
import { TextReveal } from "@/components/ui/text-reveal";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
  {
    icon: Brain,
    title: "Cours accessibles",
    description:
      "Pas besoin de compétences techniques. Nos cours sont conçus pour tous les niveaux.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Apprentissage pratique",
    description:
      "Des exercices concrets et des projets réels pour appliquer immédiatement vos connaissances.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Target,
    title: "Parcours personnalisé",
    description:
      "Deux niveaux (Débutant et Intermédiaire) pour progresser à votre rythme.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Clock,
    title: "Accès 24/7",
    description:
      "Apprenez quand vous voulez, où vous voulez. Les cours restent accessibles indéfiniment.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Award,
    title: "Certificats reconnus",
    description:
      "Obtenez des certificats à partager sur LinkedIn et valoriser vos compétences.",
    gradient: "from-rose-500 to-red-500",
  },
  {
    icon: Shield,
    title: "Éthique IA",
    description:
      "Apprenez les bonnes pratiques et l'utilisation responsable de l'intelligence artificielle.",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    icon: Sparkles,
    title: "Contenus actualisés",
    description:
      "Nos cours sont régulièrement mis à jour pour suivre les dernières avancées de l'IA.",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    icon: TrendingUp,
    title: "ROI garanti",
    description:
      "Gagnez du temps et boostez votre productivité dès les premières leçons.",
    gradient: "from-fuchsia-500 to-pink-500",
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative h-full rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
        {/* Gradient glow on hover */}
        <div
          className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20`}
        />

        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon container */}
          <motion.div
            className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <feature.icon className="h-7 w-7 text-white" />
          </motion.div>

          <h3 className="mt-5 text-lg font-semibold tracking-tight">
            {feature.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Border gradient on hover */}
        <div className="absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} p-[1px]`}
            style={{
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturesSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            Pourquoi nous choisir
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Pourquoi apprendre l'IA{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              avec nous ?
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Une approche pédagogique unique pour maîtriser l'IA rapidement et
            efficacement.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
