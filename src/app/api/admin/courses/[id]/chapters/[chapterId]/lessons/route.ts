import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(
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
    const { title, slug, content, duration, order, isFree } = body;

    if (!title) {
      return new NextResponse("Titre requis", { status: 400 });
    }

    const lesson = await db.lesson.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
        content: content || "",
        duration: duration || 5,
        order: order || 1,
        isFree: isFree || false,
        chapterId,
      },
    });

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("Error creating lesson:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}
