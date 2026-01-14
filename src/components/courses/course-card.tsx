"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Users, Lock, Sparkles, Brain, Palette, Zap, MessageSquare, Bot, TrendingUp, Code, Database, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDuration } from "@/lib/utils";
import type { CourseCardData } from "@/types";

interface CourseCardProps {
  course: CourseCardData;
  showProgress?: boolean;
}

const subjectConfig: Record<string, { icon: React.ElementType; name: string; color: string }> = {
  prompting: {
    icon: Sparkles,
    name: "Prompt Engineering",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  "chatgpt-claude": {
    icon: MessageSquare,
    name: "ChatGPT & Claude",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  "images-ia": {
    icon: Palette,
    name: "Génération d'images",
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  },
  automatisation: {
    icon: Bot,
    name: "Automatisation",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  productivite: {
    icon: Zap,
    name: "Productivité",
    color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500",
  },
  "marketing-ia": {
    icon: TrendingUp,
    name: "Marketing IA",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  "ia-developpeurs": {
    icon: Code,
    name: "IA pour développeurs",
    color: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  },
  rag: {
    icon: Database,
    name: "RAG & Chatbots",
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
  default: {
    icon: Brain,
    name: "Intelligence Artificielle",
    color: "bg-primary/10 text-primary",
  },
};

export function CourseCard({ course, showProgress = false }: CourseCardProps) {
  const hasProgress = showProgress && course.progressPercentage !== undefined;
  const isLocked = course.requiredPlan !== "FREE";

  const config = subjectConfig[course.category] || subjectConfig.default;
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/cours/${course.slug}`}>
        <Card className="h-full overflow-hidden transition-colors hover:border-border/60">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${config.color}`}>
                <IconComponent className="h-4.5 w-4.5" />
              </div>
              {isLocked && (
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  Premium
                </div>
              )}
            </div>

            <span className="text-[11px] text-muted-foreground">{config.name}</span>

            <h3 className="font-medium text-base line-clamp-2 mt-1 mb-1.5">
              {course.title}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {course.description}
            </p>

            <Badge variant={course.level === "BEGINNER" ? "beginner" : "intermediate"}>
              <GraduationCap className="h-3 w-3 mr-1" />
              {course.level === "BEGINNER" ? "Débutant" : "Intermédiaire"}
            </Badge>

            {hasProgress && (
              <div className="space-y-1 mt-3">
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted-foreground">Progression</span>
                  <span className="font-medium">{course.progressPercentage}%</span>
                </div>
                <Progress value={course.progressPercentage} className="h-1" />
              </div>
            )}
          </CardContent>

          <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatDuration(course.duration)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{course._count.enrollments.toLocaleString()} inscrits</span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
