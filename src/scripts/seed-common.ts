import "dotenv/config";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

// Configure database connection
neonConfig.fetchConnectionCache = true;
const sql = neon(process.env.DATABASE_URL!) as NeonQueryFunction<boolean, boolean>;
export const db = drizzle(sql, { schema });

/**
 * Clears all tables in the database
 */
export async function clearAllTables() {
  console.log("Clearing all tables...");
  
  await db.delete(schema.challengeProgress);
  await db.delete(schema.challengeOptions);
  await db.delete(schema.challenges);
  await db.delete(schema.lessons);
  await db.delete(schema.units);
  await db.delete(schema.userProgress);
  await db.delete(schema.courses);
  await db.delete(schema.userSubscription);
  
  console.log("All tables cleared.");
}

/**
 * Clears course data while preserving user progress
 * This function backs up user progress data, clears tables, and then restores the progress
 */
export async function clearCoursesPreservingProgress() {
  console.log("Backing up user progress data...");
  
  // Get current user progress data
  const challengeProgress = await db.select().from(schema.challengeProgress);
  const userProgress = await db.select().from(schema.userProgress);
  
  console.log(`Backed up ${challengeProgress.length} challenge progress records and ${userProgress.length} user progress records.`);
  
  // Clear all tables
  console.log("Clearing tables for reseeding...");
  await db.delete(schema.challengeProgress);
  await db.delete(schema.challengeOptions);
  await db.delete(schema.challenges);
  await db.delete(schema.lessons);
  await db.delete(schema.units);
  await db.delete(schema.userProgress);
  await db.delete(schema.courses);
  // Keep user subscriptions intact
  
  console.log("All course data cleared. Will restore progress after reseeding.");
  
  // Store the backup data to be restored after seeding
  return {
    challengeProgress,
    userProgress
  };
}

/**
 * Restores user progress data after reseeding
 */
export async function restoreUserProgress(backup: { 
  challengeProgress: any[], 
  userProgress: any[] 
}, lessonCourseMap: Map<number, number>) {
  console.log("Restoring user progress data...");
  
  if (backup.challengeProgress.length === 0 && backup.userProgress.length === 0) {
    console.log("No user progress data to restore.");
    return;
  }
  
  // Log sample data for debugging
  if (backup.userProgress.length > 0) {
    console.log("Sample user progress structure:", 
      JSON.stringify(backup.userProgress[0], null, 2).substring(0, 200) + "..."
    );
  }
  
  if (backup.challengeProgress.length > 0) {
    console.log("Sample challenge progress structure:", 
      JSON.stringify(backup.challengeProgress[0], null, 2).substring(0, 200) + "..."
    );
  }
  
  // This will help us map old challenge IDs to new ones
  const oldToNewChallengeIds = new Map();
  const oldToNewLessonIds = new Map();
  
  // Get newly created challenges, lessons, and courses
  const newChallenges = await db.select().from(schema.challenges);
  const newLessons = await db.select().from(schema.lessons);
  const newCourses = await db.select().from(schema.courses);
  
  console.log(`Found ${newCourses.length} courses, ${newLessons.length} lessons, and ${newChallenges.length} challenges after reseeding.`);
  
  // Map lessons to their new IDs
  for (const oldLesson of backup.challengeProgress.map(cp => ({
    id: cp.lessonId,
    order: cp.lessonOrder || 0
  })).filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)) {
    // Find a matching new lesson with similar properties
    for (const newLesson of newLessons) {
      if (newLesson.order === oldLesson.order) {
        oldToNewLessonIds.set(oldLesson.id, newLesson.id);
        break;
      }
    }
  }
  
  // Create maps to help us match old progress to new entities
  // We'll match challenges by their order and question content where possible
  for (const oldChallenge of backup.challengeProgress.map(cp => ({
    id: cp.challengeId,
    lessonId: cp.lessonId,
    order: cp.order || 0,
    completed: cp.completed
  })).filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)) {
    
    // Find a matching new challenge
    for (const newChallenge of newChallenges) {
      const newLessonId = oldToNewLessonIds.get(oldChallenge.lessonId);
      
      if (newLessonId === newChallenge.lessonId && 
          newChallenge.order === oldChallenge.order) {
        oldToNewChallengeIds.set(oldChallenge.id, newChallenge.id);
        break;
      }
    }
  }
  
  console.log(`Mapped ${oldToNewChallengeIds.size} challenges and ${oldToNewLessonIds.size} lessons to their new IDs.`);
  
  // Now try to restore progress where possible
  const restoredChallengeProgress = [];
  const restoredUserProgress = [];
  
  // Restore challenge progress where we can match IDs
  for (const progress of backup.challengeProgress) {
    const newChallengeId = oldToNewChallengeIds.get(progress.challengeId);
    if (newChallengeId) {
      // Create a new record with only the fields that exist in the schema
      const newProgress: any = {
        userId: progress.userId,
        challengeId: newChallengeId,
        completed: progress.completed || false,
        // Include any other fields that exist in your schema
      };
      
      restoredChallengeProgress.push(newProgress);
    }
  }
  
  // Map old course IDs to new ones based on title
  const oldCourseIdToNewCourseId = new Map();
  
  // We need to extract the courseId from userProgress if it exists
  if (backup.userProgress.length > 0 && 'courseId' in backup.userProgress[0]) {
    // Try to map courses by ID and title
    const uniqueOldCourseIds = [...new Set(backup.userProgress.map(p => p.courseId))];
    
    for (const oldCourseId of uniqueOldCourseIds) {
      // Try to find the corresponding new course
      const matchingProgress = backup.userProgress.find(p => p.courseId === oldCourseId);
      
      if (matchingProgress && matchingProgress.courseTitle) {
        const matchingCourse = newCourses.find(c => c.title === matchingProgress.courseTitle);
        if (matchingCourse) {
          oldCourseIdToNewCourseId.set(oldCourseId, matchingCourse.id);
        }
      }
    }
  }
  
  // Restore user progress for courses
  for (const progress of backup.userProgress) {
    // Get the new course ID
    let newCourseId = null;
    
    if ('courseId' in progress) {
      newCourseId = oldCourseIdToNewCourseId.get(progress.courseId);
    }
    
    // If we have course title, try that as well
    if (!newCourseId && 'courseTitle' in progress && progress.courseTitle) {
      const matchedCourse = newCourses.find(c => c.title === progress.courseTitle);
      if (matchedCourse) {
        newCourseId = matchedCourse.id;
      }
    }
    
    // If we found a course ID to use
    if (newCourseId) {
      // Create a new record with only the fields that exist in the schema
      const newProgress: any = {
        userId: progress.userId,
        courseId: newCourseId,
        // Include other fields from your schema
      };
      
      // Copy additional fields that exist in the original record and your schema
      if ('activeLessonId' in progress) {
        const newLessonId = oldToNewLessonIds.get(progress.activeLessonId);
        if (newLessonId) {
          newProgress.activeLessonId = newLessonId;
        }
      }
      
      if ('unitsCompleted' in progress) {
        newProgress.unitsCompleted = progress.unitsCompleted;
      }
      
      if ('lessonsCompleted' in progress) {
        newProgress.lessonsCompleted = progress.lessonsCompleted;
      }
      
      // Add any other fields as needed
      
      restoredUserProgress.push(newProgress);
    }
  }
  
  // Insert restored data
  if (restoredChallengeProgress.length > 0) {
    try {
      await db.insert(schema.challengeProgress).values(restoredChallengeProgress);
      console.log(`Restored ${restoredChallengeProgress.length} challenge progress records.`);
    } catch (error) {
      console.error("Error restoring challenge progress:", error);
    }
  } else {
    console.log("No challenge progress could be mapped to new challenges.");
  }
  
  if (restoredUserProgress.length > 0) {
    try {
      await db.insert(schema.userProgress).values(restoredUserProgress);
      console.log(`Restored ${restoredUserProgress.length} user progress records.`);
    } catch (error) {
      console.error("Error restoring user progress:", error);
    }
  } else {
    console.log("No user progress could be mapped to new courses.");
  }
  
  console.log("User progress restoration completed.");
}

/**
 * Helper function to get random items from an array
 */
export function getRandomItems(array: any[], count: number) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Creates a mapping from lesson IDs to their course IDs
 */
export async function createLessonCourseMap(lessons: any[], units: any[]) {
  console.log("Creating lesson to course mapping...");
  const lessonCourseMap = new Map();
  
  for (const lesson of lessons) {
    // Find the unit for this lesson
    const unit = units.find(u => u.id === lesson.unitId);
    if (unit) {
      // Map this lesson ID to its course ID
      lessonCourseMap.set(lesson.id, unit.courseId);
    }
  }
  
  console.log(`Mapped ${lessonCourseMap.size} lessons to their courses`);
  return lessonCourseMap;
}

/**
 * Helper function for generic options when language is unknown
 */
export function createGenericOptions(challengeId: number, question: string) {
  return [
    { challengeId, text: "Option A", correct: true },
    { challengeId, text: "Option B", correct: false },
    { challengeId, text: "Option C", correct: false }, 
    { challengeId, text: "Option D", correct: false },
  ];
}

/**
 * Finds challenges that need options
 */
export async function findChallengesWithMissingOptions() {
  const allChallenges = await db.select().from(schema.challenges);
  const challengesWithOptions = await db.select().from(schema.challengeOptions);
  const challengeIdsWithOptions = new Set(challengesWithOptions.map(o => o.challengeId));
  
  // Challenges missing options
  const challengesWithMissingOptions = allChallenges.filter(
    challenge => !challengeIdsWithOptions.has(challenge.id)
  );
  
  console.log(`Found ${challengesWithMissingOptions.length} challenges missing options`);
  return challengesWithMissingOptions;
}

/**
 * Add options to the database
 */
export async function addOptionsToDB(options: any[]) {
  if (options.length > 0) {
    console.log(`Adding ${options.length} options to the database`);
    await db.insert(schema.challengeOptions).values(options);
  }
}

// Schema exports for convenience
export { schema, eq }; 