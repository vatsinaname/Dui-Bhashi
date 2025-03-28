import { NextResponse } from "next/server";
import { db } from "../../../../../db";
import { challenges, challengeOptions, lessons, units } from "../../../../../db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { getUserProgress } from "../../../../../db/queries";

export async function GET(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const { userId } = await auth();
    const resolvedParams = await params;
    const { lessonId } = resolvedParams;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (isNaN(parseInt(lessonId, 10))) {
      return new NextResponse("Invalid lesson ID", { status: 400 });
    }

    // Get user's active course
    const userProgress = await getUserProgress();
    if (!userProgress?.activeCourseId) {
      return new NextResponse("No active course", { status: 400 });
    }

    // Get the lesson with its unit and course info
    const lesson = await db.query.lessons.findFirst({
      where: eq(lessons.id, parseInt(lessonId, 10)),
      with: {
        unit: {
          with: {
            course: true
          }
        }
      }
    });

    // Verify lesson exists and belongs to user's active course
    if (!lesson) {
      return new NextResponse("Lesson not found", { status: 404 });
    }

    if (lesson.unit.course.id !== userProgress.activeCourseId) {
      return new NextResponse("Lesson not in active course", { status: 403 });
    }

    // Get all challenges for this lesson
    const lessonChallenges = await db.query.challenges.findMany({
      where: eq(challenges.lessonId, parseInt(lessonId, 10)),
      with: {
        challengeOptions: true,
        challengeProgress: {
          where: eq(challenges.id, challenges.id),
        },
      },
    });

    // Add a completed flag to each challenge
    const challengesWithCompleted = lessonChallenges.map((challenge) => ({
      ...challenge,
      completed: challenge.challengeProgress.length > 0,
    }));
    
    console.log(`Found ${challengesWithCompleted.length} challenges for lesson ${lessonId}`);

    return NextResponse.json({ 
      challenges: challengesWithCompleted,
      success: true 
    });
  } catch (error) {
    console.error("[LESSONS_CHALLENGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 