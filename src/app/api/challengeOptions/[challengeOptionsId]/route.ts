import { db } from "@/db";
import { getIsAdmin } from "@/db/queries";
import { challengeOptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { challengeOptionsId: string } }
) {
  const isAdmin = await getIsAdmin();
  const resolvedParams = await params;
  const { challengeOptionsId } = resolvedParams;

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const data = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, parseInt(challengeOptionsId, 10)),
  });
  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { challengeOptionsId: string } }
) {
  const isAdmin = await getIsAdmin();
  const resolvedParams = await params;
  const { challengeOptionsId } = resolvedParams;

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(challengeOptions)
    .set({
      ...body,
    })
    .where(eq(challengeOptions.id, parseInt(challengeOptionsId, 10)))
    .returning();

  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { challengeOptionsId: string } }
) {
  const isAdmin = await getIsAdmin();
  const resolvedParams = await params;
  const { challengeOptionsId } = resolvedParams;

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const data = await db
    .delete(challengeOptions)
    .where(eq(challengeOptions.id, parseInt(challengeOptionsId, 10)))
    .returning();

  return NextResponse.json(data[0]);
}
