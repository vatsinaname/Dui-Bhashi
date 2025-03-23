import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { getIsAdmin } from "@/db/queries";
import { courses } from "@/db/schema";

export async function GET(req: Request) {
  try {
    const isAdmin = await getIsAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const data = await db.query.courses.findMany();
    console.log("Courses data fetched:", data);
    
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in courses GET route:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const isAdmin = await getIsAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const body = await req.json();
    console.log("Creating course with data:", body);
    
    const data = await db
      .insert(courses)
      .values({
        ...body,
      })
      .returning();
    
    return NextResponse.json(data[0]);
  } catch (error: any) {
    console.error("Error in courses POST route:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
