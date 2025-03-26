import { db } from "@/db";
import { getIsAdmin } from "@/db/queries";
import { units } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ unitId: string }> }
) {
  const isAdmin = await getIsAdmin();
  const { unitId } = await params;

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const data = await db.query.units.findFirst({
    where: eq(units.id, parseInt(unitId, 10)),
  });
  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ unitId: string }> }
) {
  const isAdmin = await getIsAdmin();
  const { unitId } = await params;

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(units)
    .set({
      ...body,
    })
    .where(eq(units.id, parseInt(unitId, 10)))
    .returning();

  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ unitId: string }> }
) {
  const isAdmin = await getIsAdmin();
  const { unitId } = await params;

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const data = await db
    .delete(units)
    .where(eq(units.id, parseInt(unitId, 10)))
    .returning();

  return NextResponse.json(data[0]);
}
