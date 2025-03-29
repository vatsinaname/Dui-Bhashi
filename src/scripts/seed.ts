import { clearAllTables } from './seed-common';
import { seedTeluguData } from './seed-telugu';
import { seedKannadaData } from './seed-kannada';

async function main() {
  console.log("🗃️ Starting database seeding process...");
  
  try {
    // Clear existing data
    await clearAllTables();
    
    // Seed Telugu data
    console.log("\n=== TELUGU DATA SEEDING ===");
    const teluguData = await seedTeluguData();
    
    // Seed Kannada data
    console.log("\n=== KANNADA DATA SEEDING ===");
    const kannadaData = await seedKannadaData();
    
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
