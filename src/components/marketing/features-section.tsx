"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  Target,
  Shield,
  Clock,
  Award,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Cours accessibles",
    description:
      "Pas besoin de compétences techniques. Nos cours sont conçus pour tous les niveaux.",
  },
  {
    icon: Zap,
    title: "Apprentissage pratique",
    description:
      "Des exercices concrets et des projets réels pour appliquer immédiatement vos connaissances.",
  },
  {
    icon: Target,
    title: "Parcours personnalisé",
    description:
      "Deux niveaux (Débutant et Intermédiaire) pour progresser à votre rythme.",
  },
  {
    icon: Clock,
    title: "Accès 24/7",
    description:
      "Apprenez quand vous voulez, où vous voulez. Les cours restent accessibles indéfiniment.",
  },
  {
    icon: Award,
    title: "Certificats reconnus",
    description:
      "Obtenez des certificats à partager sur LinkedIn et valoriser vos compétences.",
  },
  {
    icon: Shield,
    title: "Éthique IA",
    description:
      "Apprenez les bonnes pratiques et l'utilisation responsable de l'intelligence artificielle.",
  },
  {
    icon: Sparkles,
    title: "Contenus actualisés",
    description:
      "Nos cours sont régulièrement mis à jour pour suivre les dernières avancées de l'IA.",
  },
  {
    icon: TrendingUp,
    title: "ROI garanti",
    description:
      "Gagnez du temps et boostez votre productivité dès les premières leçons.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pourquoi apprendre l'IA avec nous ?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Une approche pédagogique unique pour maîtriser l'IA rapidement et
            efficacement.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative rounded-xl border bg-card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
