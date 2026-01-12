import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.id) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const body = await req.json();
    const { lessonId, completed } = body;

    if (!lessonId) {
      return new NextResponse("Lesson ID requis", { status: 400 });
    }

    // Verify lesson exists
    const lesson = await db.lesson.findUnique({
      where: { id: lessonId },
      include: {
        chapter: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!lesson) {
      return new NextResponse("Leçon non trouvée", { status: 404 });
    }

    // Check enrollment
    const enrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: lesson.chapter.course.id,
        },
      },
    });

    if (!enrollment && !lesson.isFree) {
      return new NextResponse("Non inscrit à ce cours", { status: 403 });
    }

    // Update or create progress
    const progress = await db.progress.upsert({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId,
        },
      },
      update: {
        completed,
        completedAt: completed ? new Date() : null,
      },
      create: {
        userId: session.user.id,
        lessonId,
        completed,
        completedAt: completed ? new Date() : null,
      },
    });

    // Check if course is completed for certificate generation
    if (completed) {
      const course = lesson.chapter.course;
      const allLessons = await db.lesson.findMany({
        where: {
          chapter: {
            courseId: course.id,
          },
        },
      });

      const completedLessons = await db.progress.count({
        where: {
          userId: session.user.id,
          lessonId: { in: allLessons.map((l) => l.id) },
          completed: true,
        },
      });

      // If all lessons completed, create certificate
      if (completedLessons === allLessons.length) {
        const existingCertificate = await db.certificate.findUnique({
          where: {
            userId_courseId: {
              userId: session.user.id,
              courseId: course.id,
            },
          },
        });

        if (!existingCertificate) {
          await db.certificate.create({
            data: {
              userId: session.user.id,
              courseId: course.id,
            },
          });
        }
      }
    }

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Progress update error:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.id) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    const where: any = { userId: session.user.id };

    if (courseId) {
      const lessons = await db.lesson.findMany({
        where: {
          chapter: {
            courseId,
          },
        },
        select: { id: true },
      });

      where.lessonId = { in: lessons.map((l) => l.id) };
    }

    const progress = await db.progress.findMany({
      where,
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Progress fetch error:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}
