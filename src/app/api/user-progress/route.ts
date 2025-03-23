import { NextResponse } from "next/server";
import { getUserProgress } from "@/db/queries";

export async function GET() {
  try {
    const userProgress = await getUserProgress();

    if (!userProgress) {
      return NextResponse.json(
        { error: "No user progress found" },
        { status: 404 }
      );
    }

    // Just extract the title directly to avoid complex type issues
    const courseTitle = userProgress.activeCourse ? userProgress.activeCourse.title : null;

    return NextResponse.json({
      hearts: userProgress.hearts,
      courseTitle
    });
  } catch (error) {
    console.error("[USER_PROGRESS_API]", error);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
} 