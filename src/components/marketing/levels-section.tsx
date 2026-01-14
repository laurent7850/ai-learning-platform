"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Rocket,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Image,
  Shield,
  Target,
  Bot,
  TrendingUp,
  BarChart,
  MessageCircle,
  Database,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const levels = [
  {
    id: "beginner",
    title: "Niveau Débutant",
    description:
      "Comprendre les bases et commencer à utiliser l'IA au quotidien",
    icon: GraduationCap,
    badge: "beginner",
    color: "emerald",
    categories: [
      { name: "Introduction à l'IA", icon: Sparkles },
      { name: "Maîtriser ChatGPT / Claude", icon: MessageSquare },
      { name: "L'art du prompting", icon: Target },
      { name: "IA pour la productivité", icon: Rocket },
      { name: "Générer des images IA", icon: Image },
      { name: "IA et éthique", icon: Shield },
    ],
  },
  {
    id: "intermediate",
    title: "Niveau Intermédiaire",
    description:
      "Intégrer l'IA dans votre workflow professionnel",
    icon: Rocket,
    badge: "intermediate",
    color: "blue",
    categories: [
      { name: "Prompting avancé", icon: Target },
      { name: "Automatisation IA", icon: Bot },
      { name: "IA pour le marketing", icon: TrendingUp },
      { name: "Analyse de données IA", icon: BarChart },
      { name: "Chatbots personnalisés", icon: MessageCircle },
      { name: "RAG & bases de connaissances", icon: Database },
      { name: "IA pour développeurs", icon: Code },
    ],
  },
];

export function LevelsSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Deux niveaux pour progresser
          </h2>
          <p className="mt-3 text-muted-foreground">
            Que vous soyez débutant ou que vous souhaitiez approfondir vos
            connaissances, nous avons le parcours qu'il vous faut.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {levels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-lg border border-border/40 bg-card p-6 transition-colors hover:border-border/60"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    level.color === "emerald"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  }`}
                >
                  <level.icon className="h-5 w-5" />
                </div>
                <div>
                  <Badge variant={level.badge as "beginner" | "intermediate"}>
                    {level.id === "beginner" ? "Débutant" : "Intermédiaire"}
                  </Badge>
                  <h3 className="text-lg font-medium mt-1">{level.title}</h3>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-5">{level.description}</p>

              <div className="space-y-2 mb-6">
                {level.categories.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center gap-2 text-sm"
                  >
                    <category.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={`/cours?level=${level.id}`}>
                  Voir les cours {level.id === "beginner" ? "débutant" : "intermédiaire"}
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
