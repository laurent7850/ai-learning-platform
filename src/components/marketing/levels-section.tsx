"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Rocket,
  CheckCircle2,
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
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Deux niveaux pour progresser
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Que vous soyez débutant ou que vous souhaitiez approfondir vos
            connaissances, nous avons le parcours qu'il vous faut.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {levels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative rounded-2xl border bg-card p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                      level.color === "emerald"
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400"
                        : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                    }`}
                  >
                    <level.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <Badge
                      variant={level.badge as "beginner" | "intermediate"}
                      className="mb-2"
                    >
                      {level.id === "beginner" ? "Débutant" : "Intermédiaire"}
                    </Badge>
                    <h3 className="text-xl font-semibold">{level.title}</h3>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">{level.description}</p>

              <div className="space-y-3 mb-8">
                {level.categories.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center gap-3 text-sm"
                  >
                    <category.icon className="h-4 w-4 text-muted-foreground" />
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link href={`/cours?level=${level.id}`}>
                  Voir les cours {level.id === "beginner" ? "débutant" : "intermédiaire"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
