import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string; chapterId: string }> }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const { chapterId } = await params;
    const body = await req.json();

    const chapter = await db.chapter.update({
      where: { id: chapterId },
      data: body,
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.error("Error updating chapter:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; chapterId: string }> }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const { chapterId } = await params;

    // Delete all lessons in the chapter first
    const lessons = await db.lesson.findMany({
      where: { chapterId },
      select: { id: true },
    });

    const lessonIds = lessons.map((l) => l.id);

    await db.progress.deleteMany({
      where: { lessonId: { in: lessonIds } },
    });

    await db.lesson.deleteMany({
      where: { chapterId },
    });

    await db.chapter.delete({
      where: { id: chapterId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting chapter:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}
