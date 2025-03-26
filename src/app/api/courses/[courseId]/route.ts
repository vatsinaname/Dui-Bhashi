import { db } from "@/db";
import { getIsAdmin } from "@/db/queries";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const isAdmin = await getIsAdmin();
  const { courseId } = await params;

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const data = await db.query.courses.findFirst({
    where: eq(courses.id, parseInt(courseId, 10)),
  });
  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const isAdmin = await getIsAdmin();
  const { courseId } = await params;

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(courses)
    .set({
      ...body,
    })
    .where(eq(courses.id, parseInt(courseId, 10)))
    .returning();

  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const isAdmin = await getIsAdmin();
  const { courseId } = await params;

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const data = await db
    .delete(courses)
    .where(eq(courses.id, parseInt(courseId, 10)))
    .returning();

  return NextResponse.json(data[0]);
}
