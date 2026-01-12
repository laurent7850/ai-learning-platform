"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Users, Lock, Sparkles, Brain, Palette, Zap, MessageSquare, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDuration } from "@/lib/utils";
import type { CourseCardData } from "@/types";

interface CourseCardProps {
  course: CourseCardData;
  showProgress?: boolean;
}

// Mapping des catégories vers les icônes et couleurs
const categoryConfig: Record<string, { icon: React.ElementType; gradient: string; iconBg: string }> = {
  chatgpt: {
    icon: MessageSquare,
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconBg: "bg-emerald-500/10 text-emerald-500",
  },
  prompting: {
    icon: Sparkles,
    gradient: "from-violet-500/20 to-purple-500/20",
    iconBg: "bg-violet-500/10 text-violet-500",
  },
  image: {
    icon: Palette,
    gradient: "from-pink-500/20 to-rose-500/20",
    iconBg: "bg-pink-500/10 text-pink-500",
  },
  automation: {
    icon: Zap,
    gradient: "from-amber-500/20 to-orange-500/20",
    iconBg: "bg-amber-500/10 text-amber-500",
  },
  ai: {
    icon: Brain,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconBg: "bg-blue-500/10 text-blue-500",
  },
  default: {
    icon: Wand2,
    gradient: "from-primary/20 to-accent/20",
    iconBg: "bg-primary/10 text-primary",
  },
};

// Tags pour chaque catégorie
const categoryTags: Record<string, string[]> = {
  chatgpt: ["IA Conversationnelle", "Productivité"],
  prompting: ["Techniques", "Optimisation"],
  image: ["Création Visuelle", "Design"],
  automation: ["Workflow", "Efficacité"],
  ai: ["Machine Learning", "Innovation"],
  default: ["Formation", "IA"],
};

export function CourseCard({ course, showProgress = false }: CourseCardProps) {
  const hasProgress = showProgress && course.progressPercentage !== undefined;
  const isLocked = course.requiredPlan !== "FREE";

  const config = categoryConfig[course.category] || categoryConfig.default;
  const tags = categoryTags[course.category] || categoryTags.default;
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/cours/${course.slug}`}>
        <Card className="h-full overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/20">
          {/* Header avec gradient et icône */}
          <div className={`relative p-6 bg-gradient-to-br ${config.gradient}`}>
            {/* Icône principale */}
            <div className={`inline-flex p-3 rounded-xl ${config.iconBg}`}>
              <IconComponent className="h-6 w-6" />
            </div>

            {/* Badge de verrouillage */}
            {isLocked && (
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-1 rounded-full bg-background/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium shadow-sm">
                  <Lock className="h-3 w-3" />
                  {course.requiredPlan === "BEGINNER" ? "Débutant" : "Pro"}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-md bg-background/60 backdrop-blur-sm text-foreground/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <CardContent className="p-5">
            {/* Level badge */}
            <div className="flex items-center gap-2 mb-3">
              <Badge
                variant={course.level === "BEGINNER" ? "beginner" : "intermediate"}
                className="text-xs"
              >
                {course.level === "BEGINNER" ? "Débutant" : "Intermédiaire"}
              </Badge>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {course.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {course.description}
            </p>

            {/* Progress bar */}
            {hasProgress && (
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progression</span>
                  <span className="font-medium text-primary">{course.progressPercentage}%</span>
                </div>
                <Progress value={course.progressPercentage} className="h-1.5" />
              </div>
            )}
          </CardContent>

          <CardFooter className="px-5 pb-5 pt-0 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{formatDuration(course.duration)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span>{course._count.enrollments.toLocaleString()} inscrits</span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
