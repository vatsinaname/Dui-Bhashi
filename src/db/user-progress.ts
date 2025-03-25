"use server";

import { db } from "../db";
import { getCourseById, getUserProgress } from "../db/queries";
import { challengeProgress, challenges, userProgress, courseProgress } from "../db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const POINTS_TO_REFILL = 100;

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();

  if (!userId) throw new Error("UnAuthorized");

  const user = await getUserProgress();

  if (!user) throw new Error("User not found");

  const course = await getCourseById(courseId);

  if (!course) throw new Error("Course not found");

  await db.update(userProgress)
    .set({
      activeCourseId: courseId,
    })
    .where(eq(userProgress.userId, userId));

  let userCourseProgress = await db.query.courseProgress.findFirst({
    where: and(
      eq(courseProgress.userId, userId),
      eq(courseProgress.courseId, courseId)
    ),
  });

  if (!userCourseProgress) {
    await db.insert(courseProgress).values({
      userId,
      courseId,
      points: 0,
    });
  }

  revalidatePath("/learn");
  revalidatePath(`/course/${courseId}`);
  redirect(`/course/${courseId}`);
};

export const reduceHearts = async (challengeId: number) => {
  const { userId } = await auth();

  if (!userId) {
    return { error: "unauthorized" };
  }

  const userProgressData = await getUserProgress();

  if (!userProgressData) {
    return { error: "user-progress-not-found" };
  }

  if (userProgressData.hearts === 0) {
    return { error: "hearts" };
  }

  await db.update(userProgress)
    .set({
      hearts: Math.max(userProgressData.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");

  return { success: true };
};