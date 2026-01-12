import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; chapterId: string; lessonId: string }> }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const { lessonId } = await params;

    // Delete progress first
    await db.progress.deleteMany({
      where: { lessonId },
    });

    await db.lesson.delete({
      where: { id: lessonId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting lesson:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}
