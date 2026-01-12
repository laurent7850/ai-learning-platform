export const dynamic = "force-dynamic";

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Clock,
  Users,
  BookOpen,
  CheckCircle2,
  Lock,
  Play,
  ArrowRight,
} from "lucide-react";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDuration } from "@/lib/utils";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getCourse(slug: string) {
  const course = await db.course.findUnique({
    where: { slug, published: true },
    include: {
      chapters: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
        },
      },
      _count: {
        select: {
          enrollments: true,
        },
      },
    },
  });

  return course;
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    return {
      title: "Cours non trouvé",
    };
  }

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      images: [course.thumbnail],
    },
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  const session = await getAuthSession();

  const totalLessons = course.chapters.reduce(
    (acc, chapter) => acc + chapter.lessons.length,
    0
  );

  const freeLessons = course.chapters.flatMap((chapter) =>
    chapter.lessons.filter((lesson) => lesson.isFree)
  );

  // Check if user is enrolled
  let isEnrolled = false;
  if (session?.user) {
    const enrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: course.id,
        },
      },
    });
    isEnrolled = !!enrollment;
  }

  return (
    <div className="py-12 md:py-20">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/cours" className="hover:text-primary">
                Cours
              </Link>
              <span>/</span>
              <span>{course.category}</span>
            </nav>

            {/* Title & Meta */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge
                  variant={
                    course.level === "BEGINNER" ? "beginner" : "intermediate"
                  }
                >
                  {course.level === "BEGINNER" ? "Débutant" : "Intermédiaire"}
                </Badge>
                {course.requiredPlan !== "FREE" && (
                  <Badge variant="secondary">
                    <Lock className="h-3 w-3 mr-1" />
                    {course.requiredPlan === "BEGINNER"
                      ? "Plan Débutant"
                      : "Plan Pro"}
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {course.title}
              </h1>

              <p className="text-lg text-muted-foreground">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatDuration(course.duration)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>
                    {course.chapters.length} chapitres, {totalLessons} leçons
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{course._count.enrollments} inscrits</span>
                </div>
              </div>
            </div>

            {/* Course Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-12">
              {course.thumbnail ? (
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                  <BookOpen className="h-16 w-16 text-muted-foreground/50" />
                </div>
              )}
            </div>

            {/* Program */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Programme du cours
              </h2>

              <Accordion type="multiple" className="w-full">
                {course.chapters.map((chapter, index) => (
                  <AccordionItem key={chapter.id} value={chapter.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium">{chapter.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {chapter.lessons.length} leçons
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pl-11">
                        {chapter.lessons.map((lesson) => (
                          <li
                            key={lesson.id}
                            className="flex items-center justify-between py-2"
                          >
                            <div className="flex items-center gap-3">
                              {lesson.isFree ? (
                                <Play className="h-4 w-4 text-primary" />
                              ) : (
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span
                                className={
                                  lesson.isFree ? "" : "text-muted-foreground"
                                }
                              >
                                {lesson.title}
                              </span>
                              {lesson.isFree && (
                                <Badge variant="outline" className="text-xs">
                                  Gratuit
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {formatDuration(lesson.duration)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-6">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">
                  Accès requis
                </p>
                <p className="text-2xl font-bold">
                  {course.requiredPlan === "FREE"
                    ? "Gratuit"
                    : course.requiredPlan === "BEGINNER"
                    ? "Plan Débutant"
                    : "Plan Pro"}
                </p>
              </div>

              {session?.user ? (
                isEnrolled ? (
                  <Button className="w-full" size="lg" asChild>
                    <Link
                      href={`/dashboard/cours/${course.slug}/${course.chapters[0]?.lessons[0]?.slug || ""}`}
                    >
                      Continuer le cours
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button className="w-full" size="lg" variant="gradient" asChild>
                    <Link href={`/api/enroll?courseId=${course.id}`}>
                      S'inscrire au cours
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )
              ) : (
                <Button className="w-full" size="lg" variant="gradient" asChild>
                  <Link href={`/connexion?redirect=/cours/${course.slug}`}>
                    Se connecter pour s'inscrire
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}

              {freeLessons.length > 0 && !isEnrolled && (
                <div className="mt-4">
                  <p className="text-sm text-center text-muted-foreground mb-2">
                    ou
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link
                      href={`/cours/${course.slug}/apercu/${freeLessons[0].slug}`}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Voir l'aperçu gratuit
                    </Link>
                  </Button>
                </div>
              )}

              <div className="mt-6 pt-6 border-t space-y-3">
                <h3 className="font-medium mb-4">Ce cours inclut :</h3>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>{formatDuration(course.duration)} de contenu</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>{totalLessons} leçons interactives</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Accès illimité</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Certificat de complétion</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Mises à jour gratuites</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
