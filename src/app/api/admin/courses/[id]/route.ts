import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const { id } = await params;

    const course = await db.course.findUnique({
      where: { id },
      include: {
        chapters: {
          include: {
            lessons: {
              orderBy: { order: "asc" },
            },
          },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!course) {
      return new NextResponse("Cours non trouvé", { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const course = await db.course.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error updating course:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const { id } = await params;

    // Delete all related data
    await db.progress.deleteMany({
      where: {
        lesson: {
          chapter: {
            courseId: id,
          },
        },
      },
    });

    await db.certificate.deleteMany({
      where: { courseId: id },
    });

    await db.enrollment.deleteMany({
      where: { courseId: id },
    });

    await db.lesson.deleteMany({
      where: {
        chapter: {
          courseId: id,
        },
      },
    });

    await db.chapter.deleteMany({
      where: { courseId: id },
    });

    await db.course.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting course:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}
