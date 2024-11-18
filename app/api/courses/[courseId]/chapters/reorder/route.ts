import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { list } = await req.json();

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await Promise.all(
      list.map((item: { id: string; position: number }) =>
        db.chapter.update({
          where: { id: item.id },
          data: { position: item.position },
        })
      )
    );

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[CHAPTERS_REORDER]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
