import { 
  clearAllTables, 
  clearCoursesPreservingProgress,
  restoreUserProgress,
  createLessonCourseMap
} from './seed-common';
import { seedTeluguData } from './seed-telugu';
import { seedKannadaData } from './seed-kannada';

async function main() {
  console.log("🗃️ Starting database seeding process...");
  
  try {
    // Instead of clearing all data, preserve user progress
    let progressBackup;
    const preserveProgress = true; // You can make this configurable via command line args
    
    if (preserveProgress) {
      // Backup progress, clear data, and get the backup object
      progressBackup = await clearCoursesPreservingProgress();
      console.log("User progress data backed up and tables cleared.");
    } else {
      // Use the original function if not preserving progress
      await clearAllTables();
      console.log("All tables cleared completely (including user progress).");
    }
    
    // Seed Telugu data
    console.log("\n=== TELUGU DATA SEEDING ===");
    const teluguData = await seedTeluguData();
    
    // Seed Kannada data
    console.log("\n=== KANNADA DATA SEEDING ===");
    const kannadaData = await seedKannadaData();
    
    // Restore user progress if we're preserving it
    if (preserveProgress && progressBackup) {
      // Create lesson to course mapping to help with restoring progress
      const allLessons = [...teluguData.lessons, ...kannadaData.lessons];
      const allUnits = [...teluguData.units, ...kannadaData.units];
      const lessonCourseMap = await createLessonCourseMap(allLessons, allUnits);
      
      // Restore the progress
      await restoreUserProgress(progressBackup, lessonCourseMap);
    }
    
    console.log("\n✅ Database seeding completed successfully");
    
    // Output a summary
    console.log("\n=== SEEDING SUMMARY ===");
    console.log(`Telugu course created: ${teluguData.course.title} (ID: ${teluguData.course.id})`);
    console.log(`Telugu units created: ${teluguData.units.length}`);
    console.log(`Telugu lessons created: ${teluguData.lessons.length}`);
    console.log(`Telugu challenges created: ${teluguData.challenges.length}`);
    
    console.log(`Kannada course created: ${kannadaData.course.title} (ID: ${kannadaData.course.id})`);
    console.log(`Kannada units created: ${kannadaData.units.length}`);
    console.log(`Kannada lessons created: ${kannadaData.lessons.length}`);
    console.log(`Kannada challenges created: ${kannadaData.challenges.length}`);
    
    if (preserveProgress) {
      console.log("\nUser progress data was preserved during this seeding operation.");
    }
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => {
    console.log("👋 Exiting seeding process");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Unhandled error:", error);
    process.exit(1);
  });
