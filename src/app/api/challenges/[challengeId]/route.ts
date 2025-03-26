import { db } from "@/db";
import { getIsAdmin } from "@/db/queries";
import { challenges } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ challengeId: string }> }
) {
  const isAdmin = await getIsAdmin();
  const { challengeId } = await params;

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const data = await db.query.challenges.findFirst({
    where: eq(challenges.id, parseInt(challengeId, 10)),
  });
  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ challengeId: string }> }
) {
  const isAdmin = await getIsAdmin();
  const { challengeId } = await params;

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(challenges)
    .set({
      ...body,
    })
    .where(eq(challenges.id, parseInt(challengeId, 10)))
    .returning();

  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ challengeId: string }> }
) {
  const isAdmin = await getIsAdmin();
  const { challengeId } = await params;

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const data = await db
    .delete(challenges)
    .where(eq(challenges.id, parseInt(challengeId, 10)))
    .returning();

  return NextResponse.json(data[0]);
}
