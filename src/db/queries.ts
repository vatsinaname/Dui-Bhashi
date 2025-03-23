import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { db } from "./drizzle";
import {
  challengeOptions,
  challengeProgress,
  challenges,
  courses,
  lessons,
  units,
  userProgress,
  courseProgress,
} from "./schema";

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) return null;

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
      courseProgresses: true,
    },
  });

  return data;
});

export const getUnits = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) return [];

  const data = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonWithCompletedStatus = unit.lessons.map((lesson, index, array) => {
      // Define how many challenges constitute a completed lesson
      const requiredCompletedChallenges = 10;
      
      // Calculate completion status for the current lesson
      // A lesson is completed if at least 10 challenges are completed
      const completedChallengesCount = lesson.challenges.filter((challenge) =>
        challenge.challengeProgress &&
        challenge.challengeProgress.length > 0 &&
        challenge.challengeProgress.every((progress) => progress.completed)
      ).length;
      
      const isCurrentCompleted = completedChallengesCount >= requiredCompletedChallenges;

      // First lesson is always unlocked
      if (index === 0) {
        return {
          ...lesson,
          completed: isCurrentCompleted,
          locked: false
        };
      }

      // For subsequent lessons, check if previous lesson has enough completed challenges
      const previousLesson = array[index - 1];
      const previousCompletedChallengesCount = previousLesson.challenges.filter((challenge) =>
        challenge.challengeProgress &&
        challenge.challengeProgress.length > 0 &&
        challenge.challengeProgress.every((progress) => progress.completed)
      ).length;
      
      const isPreviousCompleted = previousCompletedChallengesCount >= requiredCompletedChallenges;

      return {
        ...lesson,
        completed: isCurrentCompleted,
        locked: !isPreviousCompleted
      };
    });

    return { ...unit, lessons: lessonWithCompletedStatus };
  });

  return normalizedData;
});

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();

  return data;
});

export const getCourseById = cache(async (courseId: number) => {
  if (!courseId || isNaN(courseId)) {
    throw new Error("Invalid course ID");
  }

  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    with: {
      units: {
        orderBy: (units, { asc }) => [asc(units.order)],
        with: {
          lessons: {
            orderBy: (lessons, { asc }) => [asc(lessons.order)],
          },
        },
      },
    },
  });

  return data;
});

export const getCourseProgress = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return null;
  }

  const courseProgressData = await db.query.courseProgress.findFirst({
    where: and(
      eq(courseProgress.userId, userId),
      eq(courseProgress.courseId, userProgress.activeCourseId)
    ),
  });

  // Make sure we only get units for the active course
  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              challengeProgress: {
                where: and(
                  eq(challengeProgress.userId, userId)
                ),
              },
            },
          },
        },
      },
    },
  });

  console.log(`Getting progress for course ID: ${userProgress.activeCourseId}`);

  // Find the first uncompleted lesson
  const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson, index, array) => {
      const requiredCompletedChallenges = 10;
      
      // For first lesson or if previous lesson has at least 10 completed challenges
      const previousCompletedChallengesCount = index === 0 ? 0 : array[index - 1]?.challenges.filter(challenge =>
        challenge.challengeProgress?.length > 0 &&
        challenge.challengeProgress.every(progress => progress.completed)
      ).length;
      
      const isAccessible = index === 0 || previousCompletedChallengesCount >= requiredCompletedChallenges;

      // Count completed challenges in current lesson
      const completedChallengesCount = lesson.challenges.filter(challenge =>
        challenge.challengeProgress?.length > 0 &&
        challenge.challengeProgress.every(progress => progress.completed)
      ).length;
      
      // A lesson is uncompleted if it has fewer than 10 completed challenges
      const isIncomplete = completedChallengesCount < requiredCompletedChallenges;

      return isAccessible && isIncomplete;
    });

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
    points: courseProgressData?.points || 0,
  };
});

export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const courseProgress = await getCourseProgress();
  const userProgress = await getUserProgress();

  const lessonId = id || courseProgress?.activeLessonId;

  if (!lessonId) {
    return null;
  }

  console.log("Fetching lesson:", { lessonId });

  try {
    const data = await db.query.lessons.findFirst({
      where: eq(lessons.id, lessonId),
      with: {
        unit: {
          with: {
            course: true
          }
        },
        challenges: {
          orderBy: (challenges, { asc }) => [asc(challenges.order)],
          with: {
            challengeOptions: true,
            challengeProgress: {
              where: eq(challengeProgress.userId, userId),
            },
          },
        },
      },
    });

    console.log("Found lesson data:", {
      lessonId,
      hasData: !!data,
      challengesCount: data?.challenges?.length,
      courseId: data?.unit?.course?.id
    });

    if (!data) {
      console.log("No lesson data found");
      return null;
    }

    // Define maximum challenges per lesson
    const maxChallengesPerLesson = 10;

    // Transform challenges to include completion status
    const transformedChallenges = data.challenges.map(challenge => ({
      ...challenge,
      completed: challenge.challengeProgress && 
                 challenge.challengeProgress.length > 0 && 
                 challenge.challengeProgress.every(progress => progress.completed)
    }));

    // Debug: Check if we have any challenges
    if (transformedChallenges.length === 0) {
      console.log(`Warning: Lesson ${lessonId} has no challenges!`);
      
      // Create a dummy challenge if needed
      const dummyChallenge = {
        id: -1,
        lessonId: lessonId,
        type: "SELECT",
        order: 1,
        question: "This lesson is under construction. Please try another lesson.",
        completed: false,
        challengeOptions: [],
        challengeProgress: []
      };
      
      return {
        ...data,
        challenges: [dummyChallenge]
      };
    }

    // Limit challenges to max 10 per lesson, but handle case where fewer exist
    const actualChallengeCount = transformedChallenges.length;
    const limitedChallenges = transformedChallenges.slice(0, Math.min(maxChallengesPerLesson, actualChallengeCount));
    
    // Debug challenge data
    console.log(`Lesson ${lessonId} challenge data:`, {
      totalChallenges: transformedChallenges.length,
      firstChallenge: transformedChallenges[0]?.id,
      lastChallenge: transformedChallenges[transformedChallenges.length - 1]?.id,
      hasOptions: transformedChallenges[0]?.challengeOptions?.length > 0
    });
    
    // Find the first uncompleted challenge or default to the first one
    const firstUncompletedIndex = limitedChallenges.findIndex(c => !c.completed);
    const nextChallengeIndex = firstUncompletedIndex === -1 ? 0 : firstUncompletedIndex;
    
    // Reorder the challenges so the next uncompleted one comes first
    const reorderedChallenges = [
      ...limitedChallenges.slice(nextChallengeIndex),
      ...limitedChallenges.slice(0, nextChallengeIndex)
    ];

    console.log("Lesson challenges prepared:", {
      totalChallenges: transformedChallenges.length,
      limitedTo: limitedChallenges.length,
      nextChallengeIndex,
      completedChallenges: transformedChallenges.filter(c => c.completed).length
    });

    return {
      ...data,
      challenges: reorderedChallenges
    };
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return null;
  }
});

export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();

  if (!courseProgress?.activeLessonId) {
    return 0;
  }

  const lesson = await getLesson(courseProgress.activeLessonId);

  if (!lesson) {
    return 0;
  }

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed,
  );

  // Calculate percentage based on 10 challenges per lesson
  const totalChallengesPerLesson = 10;
  const percentage = Math.min(
    Math.round((completedChallenges.length / totalChallengesPerLesson) * 100),
    100
  );

  return percentage;
});

export const getUserActiveCoursePoints = cache(async () => {
  const { userId } = await auth();
  
  if (!userId) {
    return 0;
  }
  
  const userProgressData = await getUserProgress();
  
  if (!userProgressData || !userProgressData.activeCourse) {
    return 0;
  }
  
  // Find the course progress for the active course
  const activeCourseId = userProgressData.activeCourse.id;
  
  const activeCourseProgress = userProgressData.courseProgresses?.find(
    progress => progress.courseId === activeCourseId
  );
  
  return activeCourseProgress?.points || 0;
});

export const getTopTenUsers = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  // Get user progress entries with points
  const userEntries = await db.query.userProgress.findMany({
    with: {
      courseProgresses: {
        columns: {
          points: true
        }
      }
    }
  });

  // Aggregate points by user
  const userWithPoints = userEntries.map(user => {
    const totalPoints = user.courseProgresses?.reduce((sum: number, progress: { points: number }) => sum + progress.points, 0) || 0;
    
    return {
      userId: user.userId,
      userName: user.userName || "User",
      userImageSrc: user.userImageSrc || "/mascot.svg",
      points: totalPoints
    };
  });

  // Sort by points and get top 10
  return userWithPoints
    .sort((a, b) => b.points - a.points)
    .slice(0, 10);
});

export const getIsAdmin = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  // Admin access for specific users
  // You can replace this with your own user ID or use email pattern matching
  const adminUsers = [
    "user_2YIrMdhulUixzKOQYOQpO0mXRCm", // Replace with your actual user ID
    "user_2tntqAtm8T6I0BNcTvvZ6oaTCx1", // Added user's ID
  ];
  
  return adminUsers.includes(userId);
});

export async function getUserData() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const userData = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return userData;
}

export const getUserActiveCoursesWithHearts = cache(async () => {
  const { userId } = await auth();
  
  if (!userId) {
    return [];
  }
  
  const userProgressData = await getUserProgress();
  
  if (!userProgressData || !userProgressData.activeCourse) {
    return [];
  }
  
  // Get the active course with points and hearts
  const activeCourse = userProgressData.activeCourse;
  const hearts = userProgressData.hearts || 0;
  
  // Find the course progress for the active course
  const activeCourseId = activeCourse.id;
  
  const activeCourseProgress = userProgressData.courseProgresses?.find(
    progress => progress.courseId === activeCourseId
  );
  
  const points = activeCourseProgress?.points || 0;
  
  return [{
    course: activeCourse,
    hearts,
    points
  }];
});
