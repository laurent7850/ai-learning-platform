"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Users, Lock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDuration } from "@/lib/utils";
import type { CourseCardData } from "@/types";

interface CourseCardProps {
  course: CourseCardData;
  showProgress?: boolean;
}

export function CourseCard({ course, showProgress = false }: CourseCardProps) {
  const hasProgress = showProgress && course.progressPercentage !== undefined;
  const isLocked = course.requiredPlan !== "FREE";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/cours/${course.slug}`}>
        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
          {/* Thumbnail */}
          <div className="relative aspect-video bg-muted">
            {course.thumbnail ? (
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                <BookOpen className="h-12 w-12 text-muted-foreground/50" />
              </div>
            )}
            {isLocked && (
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs font-medium">
                  <Lock className="h-3 w-3" />
                  {course.requiredPlan === "BEGINNER" ? "Débutant" : "Pro"}
                </div>
              </div>
            )}
          </div>

          <CardContent className="p-4">
            {/* Level badge */}
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant={
                  course.level === "BEGINNER" ? "beginner" : "intermediate"
                }
              >
                {course.level === "BEGINNER" ? "Débutant" : "Intermédiaire"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {course.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-semibold line-clamp-2 mb-2">{course.title}</h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {course.description}
            </p>

            {/* Progress bar */}
            {hasProgress && (
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progression</span>
                  <span className="font-medium">{course.progressPercentage}%</span>
                </div>
                <Progress value={course.progressPercentage} />
              </div>
            )}
          </CardContent>

          <CardFooter className="p-4 pt-0 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDuration(course.duration)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course._count.enrollments} inscrits</span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
