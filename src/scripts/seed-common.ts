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