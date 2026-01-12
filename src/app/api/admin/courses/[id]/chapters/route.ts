import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const { id: courseId } = await params;
    const body = await req.json();
    const { title, order } = body;

    if (!title) {
      return new NextResponse("Titre requis", { status: 400 });
    }

    const chapter = await db.chapter.create({
      data: {
        title,
        order: order || 1,
        courseId,
      },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.error("Error creating chapter:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}
