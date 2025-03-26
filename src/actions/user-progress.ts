"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "../db";
import {
  getCourseById,
  getUserProgress,
} from "../db/queries";
import { challengeProgress, challenges, userProgress, courseProgress } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const POINTS_TO_REFILL = 100;

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  if (!userId) throw new Error("UnAuthorized");

  // Get Clerk user details for personalization
  const user = await currentUser();
  const imageUrl = user?.imageUrl || "/mascot.svg";
  const firstName = user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] || "User";

  const course = await getCourseById(courseId);
  if (!course) throw new Error("Course not found");

  if (!course.units.length || !course.units[0].lessons.length) {
    throw new Error("Course is empty");
  }

  const existingUserProgress = await getUserProgress();
  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: firstName,
      userImageSrc: imageUrl,
    }).where(eq(userProgress.userId, userId));
  } else {
    await db.insert(userProgress).values({
      userId,
      activeCourseId: courseId,
      userName: firstName,
      userImageSrc: imageUrl,
    });
  }

  // Create or update course progress
  const existingCourseProgress = await db.query.courseProgress.findFirst({
    where: and(
      eq(courseProgress.userId, userId),
      eq(courseProgress.courseId, courseId)
    ),
  });

  if (!existingCourseProgress) {
    await db.insert(courseProgress).values({
      userId,
      courseId,
      points: 0,
    });
  }

  revalidatePath("/courses");
  revalidatePath("/learn");
  return { success: true };
};

export const reduceHearts = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentProgress = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
  });

  if (!currentProgress) {
    throw new Error("User progress not found");
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(0, (currentProgress.hearts || 0) - 1),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/lesson");
  revalidatePath("/learn");
  revalidatePath("/shop");
};

export const purchaseHearts = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentProgress = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
  });

  if (!currentProgress) {
    throw new Error("User progress not found");
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.min(5, (currentProgress.hearts || 0) + 5),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/lesson");
  revalidatePath("/learn");
  revalidatePath("/shop");
};

export const refillHearts = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("UnAuthorized");

  const currentUserProgress = await getUserProgress();
  if (!currentUserProgress || !currentUserProgress.activeCourse) {
    throw new Error("User progress not found");
  }

  if (currentUserProgress.hearts === 5) {
    throw new Error("Hearts are already full");
  }

  const courseProgressData = await db.query.courseProgress.findFirst({
    where: and(
      eq(courseProgress.userId, userId),
      eq(courseProgress.courseId, currentUserProgress.activeCourse.id)
    ),
  });

  if (!courseProgressData || courseProgressData.points < POINTS_TO_REFILL) {
    throw new Error("Not Enough points");
  }

  await Promise.all([
    db.update(userProgress)
      .set({
        hearts: 5,
      })
      .where(eq(userProgress.userId, userId)),
    
    db.update(courseProgress)
      .set({
        points: courseProgressData.points - POINTS_TO_REFILL,
        updatedAt: new Date(),
      })
      .where(eq(courseProgress.id, courseProgressData.id))
  ]);

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};
