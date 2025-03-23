"use server";

import { db } from "../db/drizzle";
import { getUserProgress } from "../db/queries";
import { challengeProgress, challenges, userProgress, courseProgress } from "../db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const upsertChallengeProgress = async (challengeId: number) => {
  const { userId } = await auth();

  if (!userId) throw new Error("UnAuthorized");

  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) throw new Error("User Progress not Found");

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
    with: {
      lesson: {
        with: {
          unit: {
            with: {
              course: true
            }
          }
        }
      }
    }
  });

  if (!challenge) throw new Error("Challenge not Found");

  const courseId = challenge.lesson.unit.course.id;
  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId),
    ),
  });

  const isPractise = !!existingChallengeProgress;

  if (currentUserProgress.hearts === 0 && !isPractise) {
    return { error: "hearts" };
  }

  let userCourseProgress = await db.query.courseProgress.findFirst({
    where: and(
      eq(courseProgress.userId, userId),
      eq(courseProgress.courseId, courseId)
    ),
  });

  if (!userCourseProgress) {
    [userCourseProgress] = await db.insert(courseProgress)
      .values({
        userId,
        courseId,
        points: 0,
      })
      .returning();
  }

  if (isPractise) {
    await db
      .update(challengeProgress)
      .set({
        completed: true,
      })
      .where(eq(challengeProgress.id, existingChallengeProgress.id));

    await Promise.all([
      db.update(userProgress)
        .set({
          hearts: Math.min(currentUserProgress.hearts + 1, 5),
        })
        .where(eq(userProgress.userId, userId)),
      
      db.update(courseProgress)
        .set({
          points: userCourseProgress.points + 10,
        })
        .where(and(
          eq(courseProgress.userId, userId),
          eq(courseProgress.courseId, courseId)
        ))
    ]);

    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
    return;
  }

  await db.insert(challengeProgress).values({
    challengeId,
    userId,
    completed: true,
  });

  await db.update(courseProgress)
    .set({
      points: userCourseProgress.points + 10,
    })
    .where(and(
      eq(courseProgress.userId, userId),
      eq(courseProgress.courseId, courseId)
    ));

  const lessonChallenges = await db.query.challenges.findMany({
    where: eq(challenges.lessonId, lessonId),
    with: {
      challengeProgress: {
        where: eq(challengeProgress.userId, userId),
      },
    },
  });

  const completedChallengesCount = lessonChallenges.filter(
    (challenge) => challenge.challengeProgress.some((progress) => progress.completed)
  ).length;
  
  const lessonCompleted = completedChallengesCount >= 10;

  if (lessonCompleted) {
    await db.update(courseProgress)
      .set({
        points: userCourseProgress.points + 20,
      })
      .where(and(
        eq(courseProgress.userId, userId),
        eq(courseProgress.courseId, courseId)
      ));

    console.log(`Lesson ${lessonId} completed! Awarding bonus points.`);
  }

  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};
