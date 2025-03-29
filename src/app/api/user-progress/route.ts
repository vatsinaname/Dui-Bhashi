import { NextResponse } from "next/server";
import { getUserProgress, getUserActiveCoursePoints } from "@/db/queries";
import { teluguQuests, kannadaQuests } from "@/constants";

export const dynamic = 'force-dynamic'; // Make this route always dynamic
export const fetchCache = 'force-no-store'; // Don't cache this route at the fetch level

// Add a more aggressive revalidation time (5 minutes)
export const revalidate = 300;

// Helper function to get current achievement title
function getCurrentAchievementTitle(points: number, isTeluguCourse: boolean) {
  const quests = isTeluguCourse ? teluguQuests : kannadaQuests;
  
  // Find the highest achievement level the user has reached
  for (let i = quests.length - 1; i >= 0; i--) {
    if (points >= quests[i].value) {
      return quests[i].title;
    }
  }
  
  // Default to first level if no points yet
  return quests[0].title;
}

export async function GET() {
  try {
    const userProgress = await getUserProgress();

    if (!userProgress) {
      return NextResponse.json(
        { error: "No user progress found" },
        { status: 404 }
      );
    }

    // Get the user's active course points
    const activePoints = await getUserActiveCoursePoints();
    
    // Just extract the title directly to avoid complex type issues
    const courseTitle = userProgress.activeCourse ? userProgress.activeCourse.title : null;
    
    // Determine if the user is learning Telugu
    const isTeluguCourse = courseTitle?.toLowerCase().includes('telugu') || false;
    
    // Get the achievement title
    const achievementTitle = getCurrentAchievementTitle(activePoints, isTeluguCourse);

    // Add Cache-Control header to help with client-side caching
    const response = NextResponse.json({
      hearts: userProgress.hearts,
      courseTitle,
      achievementTitle,
      points: activePoints
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