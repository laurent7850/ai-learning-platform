import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const courses = await db.course.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        chapters: {
          include: {
            lessons: true,
          },
          orderBy: { order: "asc" },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const body = await req.json();
    const { title, slug, description, thumbnail, level, requiredPlan, published, category, duration } =
      body;

    if (!title || !description) {
      return new NextResponse("Titre et description requis", { status: 400 });
    }

    const course = await db.course.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
        description,
        thumbnail: thumbnail || "",
        level: level || "BEGINNER",
        requiredPlan: requiredPlan || "FREE",
        published: published || false,
        category: category || "Intelligence Artificielle",
        duration: duration || 0,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}
