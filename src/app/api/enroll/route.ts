import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasAccessToCourse } from "@/lib/stripe";

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.id) {
      return NextResponse.redirect(new URL("/connexion", req.url));
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.redirect(new URL("/cours", req.url));
    }

    // Get course
    const course = await db.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.redirect(new URL("/cours", req.url));
    }

    // Check if already enrolled
    const existingEnrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
    });

    if (existingEnrollment) {
      // Already enrolled, redirect to course
      const firstLesson = await db.lesson.findFirst({
        where: {
          chapter: {
            courseId,
          },
        },
        orderBy: [
          { chapter: { order: "asc" } },
          { order: "asc" },
        ],
      });

      if (firstLesson) {
        return NextResponse.redirect(
          new URL(`/dashboard/cours/${course.slug}/${firstLesson.slug}`, req.url)
        );
      }
      return NextResponse.redirect(new URL(`/cours/${course.slug}`, req.url));
    }

    // Check subscription access
    const subscription = await db.subscription.findUnique({
      where: { userId: session.user.id },
    });

    const userPlan = subscription?.status === "ACTIVE" ? subscription.plan : "FREE";
    const hasAccess = hasAccessToCourse(userPlan, course.requiredPlan);

    if (!hasAccess) {
      // Redirect to pricing
      return NextResponse.redirect(
        new URL(`/tarifs?course=${course.slug}`, req.url)
      );
    }

    // Create enrollment
    await db.enrollment.create({
      data: {
        userId: session.user.id,
        courseId,
      },
    });

    // Redirect to first lesson
    const firstLesson = await db.lesson.findFirst({
      where: {
        chapter: {
          courseId,
        },
      },
      orderBy: [
        { chapter: { order: "asc" } },
        { order: "asc" },
      ],
    });

    if (firstLesson) {
      return NextResponse.redirect(
        new URL(`/dashboard/cours/${course.slug}/${firstLesson.slug}`, req.url)
      );
    }

    return NextResponse.redirect(new URL(`/cours/${course.slug}`, req.url));
  } catch (error) {
    console.error("Enrollment error:", error);
    return NextResponse.redirect(new URL("/cours", req.url));
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.id) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const body = await req.json();
    const { courseId } = body;

    if (!courseId) {
      return new NextResponse("Course ID requis", { status: 400 });
    }

    // Get course
    const course = await db.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return new NextResponse("Cours non trouvé", { status: 404 });
    }

    // Check subscription access
    const subscription = await db.subscription.findUnique({
      where: { userId: session.user.id },
    });

    const userPlan = subscription?.status === "ACTIVE" ? subscription.plan : "FREE";
    const hasAccess = hasAccessToCourse(userPlan, course.requiredPlan);

    if (!hasAccess) {
      return new NextResponse("Accès refusé. Abonnement requis.", { status: 403 });
    }

    // Create enrollment
    const enrollment = await db.enrollment.upsert({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
      update: {},
      create: {
        userId: session.user.id,
        courseId,
      },
    });

    return NextResponse.json(enrollment);
  } catch (error) {
    console.error("Enrollment error:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}
