import { NextResponse } from "next/server";
import { db } from "../../../../../db";
import { challenges, challengeOptions } from "../../../../../db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  request: Request,
  { params }: { params: { lessonId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lessonId = parseInt(params.lessonId, 10);

    if (isNaN(lessonId)) {
      return new NextResponse("Invalid lesson ID", { status: 400 });
    }

    // Get all challenges for this lesson
    const lessonChallenges = await db.query.challenges.findMany({
      where: eq(challenges.lessonId, lessonId),
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