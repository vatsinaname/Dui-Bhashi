import { NextResponse } from "next/server";
import { getUserProgress } from "@/db/queries";

export const dynamic = 'force-dynamic'; // Make this route always dynamic
export const fetchCache = 'force-no-store'; // Don't cache this route at the fetch level

// Add a more aggressive revalidation time (5 minutes)
export const revalidate = 300;

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

    // Add Cache-Control header to help with client-side caching
    const response = NextResponse.json({
      hearts: userProgress.hearts,
      courseTitle
    });
    
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');
    
    return response;
  } catch (error) {
    console.error("[USER_PROGRESS_API]", error);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
} 