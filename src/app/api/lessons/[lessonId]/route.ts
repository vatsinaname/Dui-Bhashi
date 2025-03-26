import { db } from "@/db";
import { getIsAdmin } from "@/db/queries";
import { lessons } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const isAdmin = await getIsAdmin();
  const { lessonId } = await params;

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, parseInt(lessonId, 10)),
  });
  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const isAdmin = await getIsAdmin();
  const { lessonId } = await params;

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(lessons)
    .set({
      ...body,
    })
    .where(eq(lessons.id, parseInt(lessonId, 10)))
    .returning();

  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const isAdmin = await getIsAdmin();
  const { lessonId } = await params;

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const data = await db
    .delete(lessons)
    .where(eq(lessons.id, parseInt(lessonId, 10)))
    .returning();

  return NextResponse.json(data[0]);
}
