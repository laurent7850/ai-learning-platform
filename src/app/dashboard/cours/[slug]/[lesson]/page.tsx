import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Play,
  Lock,
  BookOpen,
} from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn, formatDuration, calculateProgress } from "@/lib/utils";
import { LessonContent } from "@/components/courses/lesson-content";
import { MarkCompleteButton } from "@/components/courses/mark-complete-button";

interface LessonPageProps {
  params: Promise<{
    slug: string;
    lesson: string;
  }>;
}

async function getCourseAndLesson(
  courseSlug: string,
  lessonSlug: string,
  userId: string
) {
  const course = await db.course.findUnique({
    where: { slug: courseSlug },
    include: {
      chapters: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!course) return null;

  // Find the lesson
  let currentLesson = null;
  let currentChapter = null;
  let lessonIndex = -1;

  const allLessons: Array<{
    lesson: typeof course.chapters[0]["lessons"][0];
    chapter: typeof course.chapters[0];
    globalIndex: number;
  }> = [];

  let globalIndex = 0;
  for (const chapter of course.chapters) {
    for (const lesson of chapter.lessons) {
      allLessons.push({ lesson, chapter, globalIndex });
      if (lesson.slug === lessonSlug) {
        currentLesson = lesson;
        currentChapter = chapter;
        lessonIndex = globalIndex;
      }
      globalIndex++;
    }
  }

  if (!currentLesson) return null;

  // Get user progress
  const progress = await db.progress.findMany({
    where: { userId },
    select: { lessonId: true, completed: true },
  });

  const completedLessonIds = new Set(
    progress.filter((p) => p.completed).map((p) => p.lessonId)
  );

  // Check enrollment
  const enrollment = await db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  // Calculate overall progress
  const totalLessons = allLessons.length;
  const completedCount = allLessons.filter((l) =>
    completedLessonIds.has(l.lesson.id)
  ).length;
  const progressPercentage = calculateProgress(completedCount, totalLessons);

  // Get previous and next lessons
  const previousLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null;

  // Check if current lesson is completed
  const isCompleted = completedLessonIds.has(currentLesson.id);

  return {
    course,
    currentLesson,
    currentChapter,
    allLessons,
    previousLesson,
    nextLesson,
    completedLessonIds,
    enrollment,
    progressPercentage,
    isCompleted,
  };
}

async function LessonPageContent({ params }: LessonPageProps) {
  const { slug, lesson: lessonSlug } = await params;

  const session = await getAuthSession();
  if (!session?.user?.id) {
    redirect("/connexion");
  }

  const data = await getCourseAndLesson(slug, lessonSlug, session.user.id);

  if (!data) {
    notFound();
  }

  const {
    course,
    currentLesson,
    currentChapter,
    allLessons,
    previousLesson,
    nextLesson,
    completedLessonIds,
    enrollment,
    progressPercentage,
    isCompleted,
  } = data;

  // Check access
  if (!enrollment && !currentLesson.isFree) {
    redirect(`/cours/${slug}`);
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar - Course Navigation */}
      <aside className="hidden lg:flex flex-col w-80 border-r bg-card overflow-hidden">
        {/* Course Header */}
        <div className="p-4 border-b">
          <Link
            href={`/cours/${slug}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour au cours
          </Link>
          <h2 className="font-semibold line-clamp-2">{course.title}</h2>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progression</span>
              <span>{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        {/* Chapters List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {course.chapters.map((chapter) => (
            <div key={chapter.id}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {chapter.title}
              </h3>
              <ul className="space-y-1">
                {chapter.lessons.map((lesson) => {
                  const isActive = lesson.slug === lessonSlug;
                  const isLessonCompleted = completedLessonIds.has(lesson.id);
                  const isAccessible = enrollment || lesson.isFree;

                  return (
                    <li key={lesson.id}>
                      {isAccessible ? (
                        <Link
                          href={`/dashboard/cours/${slug}/${lesson.slug}`}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          )}
                        >
                          {isLessonCompleted ? (
                            <CheckCircle2
                              className={cn(
                                "h-4 w-4 shrink-0",
                                isActive
                                  ? "text-primary-foreground"
                                  : "text-green-500"
                              )}
                            />
                          ) : (
                            <Circle
                              className={cn(
                                "h-4 w-4 shrink-0",
                                isActive
                                  ? "text-primary-foreground"
                                  : "text-muted-foreground"
                              )}
                            />
                          )}
                          <span className="line-clamp-1">{lesson.title}</span>
                          {lesson.isFree && !isActive && (
                            <Badge variant="outline" className="ml-auto text-xs">
                              Gratuit
                            </Badge>
                          )}
                        </Link>
                      ) : (
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground opacity-60">
                          <Lock className="h-4 w-4 shrink-0" />
                          <span className="line-clamp-1">{lesson.title}</span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 border-b bg-background">
          <div className="flex items-center gap-4">
            <Link
              href={`/cours/${slug}`}
              className="lg:hidden flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <div>
              <p className="text-xs text-muted-foreground">
                {currentChapter?.title}
              </p>
              <h1 className="font-semibold">{currentLesson.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            {formatDuration(currentLesson.duration)}
          </div>
        </div>

        {/* Lesson Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 md:p-8">
            {/* Video (if available) */}
            {currentLesson.videoUrl && (
              <div className="aspect-video bg-black rounded-xl mb-8 flex items-center justify-center">
                <Play className="h-16 w-16 text-white/80" />
              </div>
            )}

            {/* Content */}
            <LessonContent content={currentLesson.content} />

            {/* Mark Complete */}
            <div className="mt-8 pt-8 border-t">
              <MarkCompleteButton
                lessonId={currentLesson.id}
                isCompleted={isCompleted}
                nextLessonUrl={
                  nextLesson
                    ? `/dashboard/cours/${slug}/${nextLesson.lesson.slug}`
                    : undefined
                }
              />
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center justify-between p-4 border-t bg-background">
          {previousLesson ? (
            <Button variant="outline" asChild>
              <Link
                href={`/dashboard/cours/${slug}/${previousLesson.lesson.slug}`}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Précédent</span>
              </Link>
            </Button>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <Button asChild>
              <Link href={`/dashboard/cours/${slug}/${nextLesson.lesson.slug}`}>
                <span className="hidden sm:inline">Suivant</span>
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/dashboard/mes-cours">Terminer le cours</Link>
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}

export default function LessonPage({ params }: LessonPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-[calc(100vh-4rem)]">
          <aside className="hidden lg:block w-80 border-r bg-card p-4">
            <Skeleton className="h-8 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-2 w-full mb-6" />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full mb-2" />
            ))}
          </aside>
          <main className="flex-1 p-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-32 mb-8" />
            <Skeleton className="aspect-video w-full mb-8" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </main>
        </div>
      }
    >
      <LessonPageContent params={params} />
    </Suspense>
  );
}
