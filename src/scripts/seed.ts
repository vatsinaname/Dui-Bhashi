import "dotenv/config";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

neonConfig.fetchConnectionCache = true;
const sql = neon(process.env.DATABASE_URL!) as NeonQueryFunction<boolean, boolean>;
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("🌱 Starting database seed...");

    await db.delete(schema.challengeProgress);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challenges);
    await db.delete(schema.lessons);
    await db.delete(schema.units);
    await db.delete(schema.userProgress);
    await db.delete(schema.courses);
    await db.delete(schema.userSubscription);

    const courses = await db.insert(schema.courses).values([
      { title: "Telugu", imageSrc: "/tel.svg" },
      { title: "Kannada", imageSrc: "/kan.svg" }
    ]).returning();

    const units = await db.insert(schema.units).values([
      {
        courseId: courses[0].id,
        title: "Telugu Script",
        description: "Learn Telugu alphabet and writing system",
        order: 1,
      },
      {
        courseId: courses[0].id,
        title: "Basic Conversations",
        description: "Learn everyday Telugu phrases",
        order: 2,
      },
      {
        courseId: courses[0].id,
        title: "Telugu Vocabulary",
        description: "Learn essential Telugu words and their meanings",
        order: 3,
      },
      {
        courseId: courses[0].id,
        title: "Telugu Basic Grammar",
        description: "Learn fundamental Telugu grammar rules and sentence structure",
        order: 4,
      },
      {
        courseId: courses[1].id,
        title: "Kannada Script",
        description: "Learn Kannada alphabet and writing system",
        order: 1,
      },
      {
        courseId: courses[1].id,
        title: "Basic Conversations",
        description: "Learn everyday Kannada phrases",
        order: 2,
      },
      {
        courseId: courses[1].id,
        title: "Kannada Vocabulary",
        description: "Learn essential Kannada words and their meanings",
        order: 3,
      },
      {
        courseId: courses[1].id,
        title: "Kannada Basic Grammar",
        description: "Learn fundamental Kannada grammar rules and sentence structure",
        order: 4,
      }
    ]).returning();

    const lessons = await db.insert(schema.lessons).values([
      // Telugu Script Unit (units[0])
      { unitId: units[0].id, title: "Short Vowels (హ్రస్వాలు)", order: 1 },
      { unitId: units[0].id, title: "Long Vowels (దీర్ఘాలు)", order: 2 },
      { unitId: units[0].id, title: "Compound Vowels (ద్విత్వాలు)", order: 3 },
      { unitId: units[0].id, title: "Velar Consonants (కవర్గము)", order: 4 },
      { unitId: units[0].id, title: "Palatal Consonants (చవర్గము)", order: 5 },
      { unitId: units[0].id, title: "Retroflex Consonants (టవర్గము)", order: 6 },
      { unitId: units[0].id, title: "Dental Consonants (తవర్గము)", order: 7 },
      { unitId: units[0].id, title: "Labial Consonants (పవర్గము)", order: 8 },
      { unitId: units[0].id, title: "Semivowels (అంతస్థలు)", order: 9 },
      { unitId: units[0].id, title: "Sibilants & Aspirate (ఊష్మాలు)", order: 10 },
      
      // Telugu Vocabulary Unit (units[2])
      { unitId: units[2].id, title: "Common Nouns", order: 1 },
      { unitId: units[2].id, title: "Essential Verbs", order: 2 },
      { unitId: units[2].id, title: "Colors and Numbers", order: 3 },
      { unitId: units[2].id, title: "Family and Relationships", order: 4 },
      { unitId: units[2].id, title: "Food and Dining", order: 5 },
      
      // Telugu Grammar Unit (units[3])
      { unitId: units[3].id, title: "Basic Sentence Structure", order: 1 },
      { unitId: units[3].id, title: "Pronouns", order: 2 },
      { unitId: units[3].id, title: "Present Tense", order: 3 },
      { unitId: units[3].id, title: "Past Tense", order: 4 },
      { unitId: units[3].id, title: "Future Tense", order: 5 },
      
      // Kannada Script Unit (units[4])
      { unitId: units[4].id, title: "Short Vowels (ಹ್ರಸ್ವ ಸ್ವರಗಳು)", order: 1 },
      { unitId: units[4].id, title: "Long Vowels (ದೀರ్ಘ ಸ್ವರಗಳು)", order: 2 },
      { unitId: units[4].id, title: "Compound Vowels (ಸಂಯುಕ್ತ ಸ್ವರಗಳು)", order: 3 },
      { unitId: units[4].id, title: "Velar Consonants (ಕವರ್ಗ)", order: 4 },
      { unitId: units[4].id, title: "Palatal Consonants (ಚವರ್ಗ)", order: 5 },
      { unitId: units[4].id, title: "Retroflex Consonants (ಟವರ್ಗ)", order: 6 },
      { unitId: units[4].id, title: "Dental Consonants (ತವರ್ಗ)", order: 7 },
      { unitId: units[4].id, title: "Labial Consonants (ಪವರ್ಗ)", order: 8 },
      { unitId: units[4].id, title: "Semivowels (ಅಂತಃಸ್ಥಗಳು)", order: 9 },
      { unitId: units[4].id, title: "Sibilants & Aspirate (ಊಷ್ಮಾಕ್ಷರಗಳು)", order: 10 },
      
      // Kannada Vocabulary Unit (units[6])
      { unitId: units[6].id, title: "Common Nouns", order: 1 },
      { unitId: units[6].id, title: "Essential Verbs", order: 2 },
      { unitId: units[6].id, title: "Colors and Numbers", order: 3 },
      { unitId: units[6].id, title: "Family and Relationships", order: 4 },
      { unitId: units[6].id, title: "Food and Dining", order: 5 },
      
      // Kannada Grammar Unit (units[7])
      { unitId: units[7].id, title: "Basic Sentence Structure", order: 1 },
      { unitId: units[7].id, title: "Pronouns", order: 2 },
      { unitId: units[7].id, title: "Present Tense", order: 3 },
      { unitId: units[7].id, title: "Past Tense", order: 4 },
      { unitId: units[7].id, title: "Future Tense", order: 5 }
    ]).returning();

    const challenges = await db.insert(schema.challenges).values([
      { lessonId: lessons[0].id, type: "SELECT", question: "Which is the Telugu letter for short 'a'?", order: 1 },
      { lessonId: lessons[0].id, type: "SELECT", question: "Which is the Telugu letter for short 'i'?", order: 2 },
      { lessonId: lessons[0].id, type: "SELECT", question: "Which is the Telugu letter for short 'u'?", order: 3 },
      { lessonId: lessons[0].id, type: "SELECT", question: "Which is the Telugu letter for short 'e'?", order: 4 },
      { lessonId: lessons[0].id, type: "SELECT", question: "Which is the Telugu letter for short 'o'?", order: 5 },
      { lessonId: lessons[0].id, type: "SELECT", question: "What sound does 'అ' make?", order: 6 },
      { lessonId: lessons[0].id, type: "SELECT", question: "What sound does 'ఇ' make?", order: 7 },
      { lessonId: lessons[0].id, type: "SELECT", question: "What sound does 'ఉ' make?", order: 8 },
      { lessonId: lessons[0].id, type: "SELECT", question: "What sound does 'ఎ' make?", order: 9 },
      { lessonId: lessons[0].id, type: "SELECT", question: "What sound does 'ఒ' make?", order: 10 },
      { lessonId: lessons[1].id, type: "SELECT", question: "Which is the Telugu letter for long 'aa'?", order: 1 },
      { lessonId: lessons[1].id, type: "SELECT", question: "Which is the Telugu letter for long 'ee'?", order: 2 },
      { lessonId: lessons[1].id, type: "SELECT", question: "Which is the Telugu letter for long 'oo'?", order: 3 },
      { lessonId: lessons[1].id, type: "SELECT", question: "What sound does 'ఆ' make?", order: 4 },
      { lessonId: lessons[1].id, type: "SELECT", question: "What sound does 'ఈ' make?", order: 5 },
      { lessonId: lessons[1].id, type: "SELECT", question: "What sound does 'ఊ' make?", order: 6 },
      { lessonId: lessons[1].id, type: "SELECT", question: "What sound does 'ఏ' make?", order: 7 },
      { lessonId: lessons[1].id, type: "SELECT", question: "What sound does 'ఓ' make?", order: 8 },
      { lessonId: lessons[1].id, type: "SELECT", question: "Which is longer: 'అ' or 'ఆ'?", order: 9 },
      { lessonId: lessons[1].id, type: "SELECT", question: "Which is longer: 'ఇ' or 'ఈ'?", order: 10 },
      { lessonId: lessons[2].id, type: "SELECT", question: "Which is the Telugu letter for 'ai'?", order: 1 },
      { lessonId: lessons[2].id, type: "SELECT", question: "Which is the Telugu letter for 'au'?", order: 2 },
      { lessonId: lessons[2].id, type: "SELECT", question: "What sound does 'ఐ' make?", order: 3 },
      { lessonId: lessons[2].id, type: "SELECT", question: "What sound does 'ఔ' make?", order: 4 },
      { lessonId: lessons[2].id, type: "SELECT", question: "Which is the combination of 'అ' and 'ఇ'?", order: 5 },
      { lessonId: lessons[2].id, type: "SELECT", question: "Which is the combination of 'అ' and 'ఉ'?", order: 6 },
      { lessonId: lessons[2].id, type: "SELECT", question: "Which is the combination of 'అ' and 'ఎ'?", order: 7 },
      { lessonId: lessons[2].id, type: "SELECT", question: "Which is the combination of 'అ' and 'ఒ'?", order: 8 },
      { lessonId: lessons[2].id, type: "SELECT", question: "What is 'ఐ' made of?", order: 9 },
      { lessonId: lessons[2].id, type: "SELECT", question: "What is 'ఔ' made of?", order: 10 },
      { lessonId: lessons[10].id, type: "SELECT", question: "Which is the Kannada letter for short 'a'?", order: 1 },
      { lessonId: lessons[10].id, type: "SELECT", question: "Which is the Kannada letter for short 'i'?", order: 2 },
      { lessonId: lessons[10].id, type: "SELECT", question: "Which is the Kannada letter for short 'u'?", order: 3 },
      { lessonId: lessons[10].id, type: "SELECT", question: "Which is the Kannada letter for short 'e'?", order: 4 },
      { lessonId: lessons[10].id, type: "SELECT", question: "Which is the Kannada letter for short 'o'?", order: 5 },
      { lessonId: lessons[10].id, type: "SELECT", question: "What sound does 'ಅ' make?", order: 6 },
      { lessonId: lessons[10].id, type: "SELECT", question: "What sound does 'ಇ' make?", order: 7 },
      { lessonId: lessons[10].id, type: "SELECT", question: "What sound does 'ಉ' make?", order: 8 },
      { lessonId: lessons[10].id, type: "SELECT", question: "What sound does 'ಎ' make?", order: 9 },
      { lessonId: lessons[10].id, type: "SELECT", question: "What sound does 'ಒ' make?", order: 10 },
      { lessonId: lessons[11].id, type: "SELECT", question: "Which is the Kannada letter for long 'aa'?", order: 1 },
      { lessonId: lessons[11].id, type: "SELECT", question: "Which is the Kannada letter for long 'ee'?", order: 2 },
      { lessonId: lessons[11].id, type: "SELECT", question: "Which is the Kannada letter for long 'oo'?", order: 3 },
      { lessonId: lessons[11].id, type: "SELECT", question: "What sound does 'ಆ' make?", order: 4 },
      { lessonId: lessons[11].id, type: "SELECT", question: "What sound does 'ಈ' make?", order: 5 },
      { lessonId: lessons[11].id, type: "SELECT", question: "What sound does 'ಊ' make?", order: 6 },
      { lessonId: lessons[11].id, type: "SELECT", question: "What sound does 'ಏ' make?", order: 7 },
      { lessonId: lessons[11].id, type: "SELECT", question: "What sound does 'ಓ' make?", order: 8 },
      { lessonId: lessons[11].id, type: "SELECT", question: "Which is longer: 'ಅ' or 'ಆ'?", order: 9 },
      { lessonId: lessons[11].id, type: "SELECT", question: "Which is longer: 'ಇ' or 'ಈ'?", order: 10 },
      { lessonId: lessons[12].id, type: "SELECT", question: "Which is the Kannada letter for 'ai'?", order: 1 },
      { lessonId: lessons[12].id, type: "SELECT", question: "Which is the Kannada letter for 'au'?", order: 2 },
      { lessonId: lessons[12].id, type: "SELECT", question: "What sound does 'ಐ' make?", order: 3 },
      { lessonId: lessons[12].id, type: "SELECT", question: "What sound does 'ಔ' make?", order: 4 },
      { lessonId: lessons[12].id, type: "SELECT", question: "Which is the combination of 'ಅ' and 'ಇ'?", order: 5 },
      { lessonId: lessons[12].id, type: "SELECT", question: "Which is the combination of 'ಅ' and 'ಉ'?", order: 6 },
      { lessonId: lessons[12].id, type: "SELECT", question: "Which is the combination of 'ಅ' and 'ಎ'?", order: 7 },
      { lessonId: lessons[12].id, type: "SELECT", question: "Which is the combination of 'ಅ' and 'ಒ'?", order: 8 },
      { lessonId: lessons[12].id, type: "SELECT", question: "What is 'ಐ' made of?", order: 9 },
      { lessonId: lessons[12].id, type: "SELECT", question: "What is 'ಔ' made of?", order: 10 },
      { lessonId: lessons[19].id, type: "SELECT", question: "What is the Kannada letter 'ಶ' called?", order: 1 },
      { lessonId: lessons[19].id, type: "SELECT", question: "What is the Kannada letter 'ಷ' called?", order: 2 },
      { lessonId: lessons[19].id, type: "SELECT", question: "What is the Kannada letter 'ಸ' called?", order: 3 },
      { lessonId: lessons[19].id, type: "SELECT", question: "What is the Kannada letter 'ಹ' called?", order: 4 },
      { lessonId: lessons[19].id, type: "SELECT", question: "How do you pronounce 'ಶ'?", order: 5 },
      { lessonId: lessons[19].id, type: "SELECT", question: "How do you pronounce 'ಷ'?", order: 6 },
      { lessonId: lessons[19].id, type: "SELECT", question: "How do you pronounce 'ಸ'?", order: 7 },
      { lessonId: lessons[19].id, type: "SELECT", question: "How do you pronounce 'ಹ'?", order: 8 },
      { lessonId: lessons[19].id, type: "SELECT", question: "Which letter is used for the 'ha' sound in Kannada?", order: 9 },
      { lessonId: lessons[19].id, type: "SELECT", question: "Which of these is NOT a sibilant in Kannada?", order: 10 },
      { lessonId: lessons[8].id, type: "SELECT", question: "Which is the Telugu letter for 'ya'?", order: 1 },
      { lessonId: lessons[8].id, type: "SELECT", question: "Which is the Telugu letter for 'ra'?", order: 2 },
      { lessonId: lessons[8].id, type: "SELECT", question: "Which is the Telugu letter for 'la'?", order: 3 },
      { lessonId: lessons[8].id, type: "SELECT", question: "Which is the Telugu letter for 'va'?", order: 4 },
      { lessonId: lessons[8].id, type: "SELECT", question: "How do you pronounce 'య'?", order: 5 },
      { lessonId: lessons[8].id, type: "SELECT", question: "How do you pronounce 'ర'?", order: 6 },
      { lessonId: lessons[8].id, type: "SELECT", question: "How do you pronounce 'ల'?", order: 7 },
      { lessonId: lessons[8].id, type: "SELECT", question: "How do you pronounce 'వ'?", order: 8 },
      { lessonId: lessons[8].id, type: "SELECT", question: "Which letter makes a 'v' sound in Telugu?", order: 9 },
      { lessonId: lessons[8].id, type: "SELECT", question: "Which letter makes an 'r' sound in Telugu?", order: 10 },
      { lessonId: lessons[9].id, type: "SELECT", question: "Which is the Telugu letter for 'sha'?", order: 1 },
      { lessonId: lessons[9].id, type: "SELECT", question: "Which is the Telugu letter for 'sha' (retroflex)?", order: 2 },
      { lessonId: lessons[9].id, type: "SELECT", question: "Which is the Telugu letter for 'sa'?", order: 3 },
      { lessonId: lessons[9].id, type: "SELECT", question: "Which is the Telugu letter for 'ha'?", order: 4 },
      { lessonId: lessons[9].id, type: "SELECT", question: "How do you pronounce 'శ'?", order: 5 },
      { lessonId: lessons[9].id, type: "SELECT", question: "How do you pronounce 'ష'?", order: 6 },
      { lessonId: lessons[9].id, type: "SELECT", question: "How do you pronounce 'స'?", order: 7 },
      { lessonId: lessons[9].id, type: "SELECT", question: "How do you pronounce 'హ'?", order: 8 },
      { lessonId: lessons[9].id, type: "SELECT", question: "Which letter is used for the 'ha' sound in Telugu?", order: 9 },
      { lessonId: lessons[9].id, type: "SELECT", question: "Which of these is NOT a sibilant in Telugu?", order: 10 },
      { lessonId: lessons[18].id, type: "SELECT", question: "Which is the Kannada letter for 'ya'?", order: 1 },
      { lessonId: lessons[18].id, type: "SELECT", question: "Which is the Kannada letter for 'ra'?", order: 2 },
      { lessonId: lessons[18].id, type: "SELECT", question: "Which is the Kannada letter for 'la'?", order: 3 },
      { lessonId: lessons[18].id, type: "SELECT", question: "Which is the Kannada letter for 'va'?", order: 4 },
      { lessonId: lessons[18].id, type: "SELECT", question: "How do you pronounce 'ಯ'?", order: 5 },
      { lessonId: lessons[18].id, type: "SELECT", question: "How do you pronounce 'ರ'?", order: 6 },
      { lessonId: lessons[18].id, type: "SELECT", question: "How do you pronounce 'ಲ'?", order: 7 },
      { lessonId: lessons[18].id, type: "SELECT", question: "How do you pronounce 'ವ'?", order: 8 },
      { lessonId: lessons[18].id, type: "SELECT", question: "Which letter makes a 'v' sound in Kannada?", order: 9 },
      { lessonId: lessons[18].id, type: "SELECT", question: "Which letter makes an 'r' sound in Kannada?", order: 10 },
      
      // Telugu Vocabulary Unit - Common Nouns Lesson
      { lessonId: lessons[10].id, type: "SELECT", question: "What is the Telugu word for 'water'?", order: 1 },
      { lessonId: lessons[10].id, type: "SELECT", question: "What is the Telugu word for 'food'?", order: 2 },
      { lessonId: lessons[10].id, type: "SELECT", question: "What is the Telugu word for 'house'?", order: 3 },
      { lessonId: lessons[10].id, type: "SELECT", question: "What is the Telugu word for 'book'?", order: 4 },
      { lessonId: lessons[10].id, type: "SELECT", question: "What is the Telugu word for 'tree'?", order: 5 },
      { lessonId: lessons[10].id, type: "SELECT", question: "What does 'నీరు' mean in English?", order: 6 },
      { lessonId: lessons[10].id, type: "SELECT", question: "What does 'ఆహారం' mean in English?", order: 7 },
      { lessonId: lessons[10].id, type: "SELECT", question: "What does 'ఇల్లు' mean in English?", order: 8 },
      { lessonId: lessons[10].id, type: "SELECT", question: "What does 'పుస్తకం' mean in English?", order: 9 },
      { lessonId: lessons[10].id, type: "SELECT", question: "What does 'చెట్టు' mean in English?", order: 10 },
      
      // Telugu Vocabulary Unit - Essential Verbs Lesson
      { lessonId: lessons[11].id, type: "SELECT", question: "What is the Telugu word for 'to go'?", order: 1 },
      { lessonId: lessons[11].id, type: "SELECT", question: "What is the Telugu word for 'to come'?", order: 2 },
      { lessonId: lessons[11].id, type: "SELECT", question: "What is the Telugu word for 'to eat'?", order: 3 },
      { lessonId: lessons[11].id, type: "SELECT", question: "What is the Telugu word for 'to drink'?", order: 4 },
      { lessonId: lessons[11].id, type: "SELECT", question: "What is the Telugu word for 'to sleep'?", order: 5 },
      { lessonId: lessons[11].id, type: "SELECT", question: "What does 'వెళ్ళు' mean in English?", order: 6 },
      { lessonId: lessons[11].id, type: "SELECT", question: "What does 'రా' mean in English?", order: 7 },
      { lessonId: lessons[11].id, type: "SELECT", question: "What does 'తిను' mean in English?", order: 8 },
      { lessonId: lessons[11].id, type: "SELECT", question: "What does 'తాగు' mean in English?", order: 9 },
      { lessonId: lessons[11].id, type: "SELECT", question: "What does 'నిద్రపోవు' mean in English?", order: 10 },
      
      // Telugu Vocabulary Unit - Colors and Numbers Lesson
      { lessonId: lessons[12].id, type: "SELECT", question: "What is the Telugu word for 'red'?", order: 1 },
      { lessonId: lessons[12].id, type: "SELECT", question: "What is the Telugu word for 'blue'?", order: 2 },
      { lessonId: lessons[12].id, type: "SELECT", question: "What is the Telugu word for 'green'?", order: 3 },
      { lessonId: lessons[12].id, type: "SELECT", question: "What is the Telugu word for 'yellow'?", order: 4 },
      { lessonId: lessons[12].id, type: "SELECT", question: "What is the Telugu word for 'black'?", order: 5 },
      { lessonId: lessons[12].id, type: "SELECT", question: "What does 'ఎరుపు' mean in English?", order: 6 },
      { lessonId: lessons[12].id, type: "SELECT", question: "What does 'నీలం' mean in English?", order: 7 },
      { lessonId: lessons[12].id, type: "SELECT", question: "What does 'ఆకుపచ్చ' mean in English?", order: 8 },
      { lessonId: lessons[12].id, type: "SELECT", question: "What does 'పసుపు' mean in English?", order: 9 },
      { lessonId: lessons[12].id, type: "SELECT", question: "What does 'నలుపు' mean in English?", order: 10 },
      
      // Telugu Vocabulary Unit - Family and Relationships Lesson
      { lessonId: lessons[13].id, type: "SELECT", question: "What is the Telugu word for 'mother'?", order: 1 },
      { lessonId: lessons[13].id, type: "SELECT", question: "What is the Telugu word for 'father'?", order: 2 },
      { lessonId: lessons[13].id, type: "SELECT", question: "What is the Telugu word for 'sister'?", order: 3 },
      { lessonId: lessons[13].id, type: "SELECT", question: "What is the Telugu word for 'brother'?", order: 4 },
      { lessonId: lessons[13].id, type: "SELECT", question: "What is the Telugu word for 'grandfather'?", order: 5 },
      { lessonId: lessons[13].id, type: "SELECT", question: "What does 'అమ్మ' mean in English?", order: 6 },
      { lessonId: lessons[13].id, type: "SELECT", question: "What does 'నాన్న' mean in English?", order: 7 },
      { lessonId: lessons[13].id, type: "SELECT", question: "What does 'అక్క/చెల్లి' mean in English?", order: 8 },
      { lessonId: lessons[13].id, type: "SELECT", question: "What does 'అన్న/తమ్ముడు' mean in English?", order: 9 },
      { lessonId: lessons[13].id, type: "SELECT", question: "What does 'తాత' mean in English?", order: 10 },
      
      // Telugu Vocabulary Unit - Food and Dining Lesson
      { lessonId: lessons[14].id, type: "SELECT", question: "What is the Telugu word for 'rice'?", order: 1 },
      { lessonId: lessons[14].id, type: "SELECT", question: "What is the Telugu word for 'curry'?", order: 2 },
      { lessonId: lessons[14].id, type: "SELECT", question: "What is the Telugu word for 'vegetable'?", order: 3 },
      { lessonId: lessons[14].id, type: "SELECT", question: "What is the Telugu word for 'fruit'?", order: 4 },
      { lessonId: lessons[14].id, type: "SELECT", question: "What is the Telugu word for 'sweets'?", order: 5 },
      { lessonId: lessons[14].id, type: "SELECT", question: "What does 'అన్నం' mean in English?", order: 6 },
      { lessonId: lessons[14].id, type: "SELECT", question: "What does 'కూర' mean in English?", order: 7 },
      { lessonId: lessons[14].id, type: "SELECT", question: "What does 'కూరగాయలు' mean in English?", order: 8 },
      { lessonId: lessons[14].id, type: "SELECT", question: "What does 'పండు' mean in English?", order: 9 },
      { lessonId: lessons[14].id, type: "SELECT", question: "What does 'మిఠాయి' mean in English?", order: 10 },
      
      // Telugu Grammar Unit - Basic Sentence Structure
      { lessonId: lessons[15].id, type: "SELECT", question: "What is the typical word order in a Telugu sentence?", order: 1 },
      { lessonId: lessons[15].id, type: "SELECT", question: "In Telugu, where does the verb usually come in a sentence?", order: 2 },
      { lessonId: lessons[15].id, type: "SELECT", question: "Choose the correct sentence structure for 'I am eating food' in Telugu", order: 3 },
      { lessonId: lessons[15].id, type: "SELECT", question: "Choose the correct sentence structure for 'She went to school' in Telugu", order: 4 },
      { lessonId: lessons[15].id, type: "SELECT", question: "Which of these is a correctly structured Telugu sentence?", order: 5 },
      { lessonId: lessons[15].id, type: "SELECT", question: "How would you say 'I am going home' in Telugu?", order: 6 },
      { lessonId: lessons[15].id, type: "SELECT", question: "How would you say 'He is reading a book' in Telugu?", order: 7 },
      { lessonId: lessons[15].id, type: "SELECT", question: "Translate 'నేను పుస్తకం చదువుతున్నాను' to English", order: 8 },
      { lessonId: lessons[15].id, type: "SELECT", question: "Translate 'ఆమె పాఠశాలకు వెళ్తోంది' to English", order: 9 },
      { lessonId: lessons[15].id, type: "SELECT", question: "Identify the subject in 'రాము అన్నం తింటున్నాడు'", order: 10 },
      
      // Telugu Grammar Unit - Pronouns
      { lessonId: lessons[16].id, type: "SELECT", question: "What is the Telugu pronoun for 'I'?", order: 1 },
      { lessonId: lessons[16].id, type: "SELECT", question: "What is the Telugu pronoun for 'you' (singular)?", order: 2 },
      { lessonId: lessons[16].id, type: "SELECT", question: "What is the Telugu pronoun for 'he'?", order: 3 },
      { lessonId: lessons[16].id, type: "SELECT", question: "What is the Telugu pronoun for 'she'?", order: 4 },
      { lessonId: lessons[16].id, type: "SELECT", question: "What is the Telugu pronoun for 'we'?", order: 5 },
      { lessonId: lessons[16].id, type: "SELECT", question: "What does 'నేను' mean in English?", order: 6 },
      { lessonId: lessons[16].id, type: "SELECT", question: "What does 'నువ్వు' mean in English?", order: 7 },
      { lessonId: lessons[16].id, type: "SELECT", question: "What does 'అతను' mean in English?", order: 8 },
      { lessonId: lessons[16].id, type: "SELECT", question: "What does 'ఆమె' mean in English?", order: 9 },
      { lessonId: lessons[16].id, type: "SELECT", question: "What does 'మేము' mean in English?", order: 10 },
      
      // Telugu Grammar Unit - Present Tense
      { lessonId: lessons[17].id, type: "SELECT", question: "How do you form the present tense in Telugu?", order: 1 },
      { lessonId: lessons[17].id, type: "SELECT", question: "What suffix is added to verbs to show present continuous action?", order: 2 },
      { lessonId: lessons[17].id, type: "SELECT", question: "Choose the correct present tense form of 'తిను' (to eat) for 'I'", order: 3 },
      { lessonId: lessons[17].id, type: "SELECT", question: "Choose the correct present tense form of 'చదువు' (to read) for 'she'", order: 4 },
      { lessonId: lessons[17].id, type: "SELECT", question: "Which sentence is in the present tense?", order: 5 },
      { lessonId: lessons[17].id, type: "SELECT", question: "How would you say 'I am speaking Telugu' in Telugu?", order: 6 },
      { lessonId: lessons[17].id, type: "SELECT", question: "How would you say 'They are playing' in Telugu?", order: 7 },
      { lessonId: lessons[17].id, type: "SELECT", question: "Translate 'నేను నడుస్తున్నాను' to English", order: 8 },
      { lessonId: lessons[17].id, type: "SELECT", question: "Translate 'మేము పాడుతున్నాము' to English", order: 9 },
      { lessonId: lessons[17].id, type: "SELECT", question: "What is the present tense marker in 'వాళ్ళు ఆడుతున్నారు'?", order: 10 },
      
      // Telugu Grammar Unit - Past Tense
      { lessonId: lessons[18].id, type: "SELECT", question: "How do you form the past tense in Telugu?", order: 1 },
      { lessonId: lessons[18].id, type: "SELECT", question: "What suffix is added to verbs to show past action?", order: 2 },
      { lessonId: lessons[18].id, type: "SELECT", question: "Choose the correct past tense form of 'తిను' (to eat) for 'I'", order: 3 },
      { lessonId: lessons[18].id, type: "SELECT", question: "Choose the correct past tense form of 'చూడు' (to see) for 'she'", order: 4 },
      { lessonId: lessons[18].id, type: "SELECT", question: "Which sentence is in the past tense?", order: 5 },
      { lessonId: lessons[18].id, type: "SELECT", question: "How would you say 'I went home' in Telugu?", order: 6 },
      { lessonId: lessons[18].id, type: "SELECT", question: "How would you say 'She read a book' in Telugu?", order: 7 },
      { lessonId: lessons[18].id, type: "SELECT", question: "Translate 'నేను తిన్నాను' to English", order: 8 },
      { lessonId: lessons[18].id, type: "SELECT", question: "Translate 'అతను పాఠశాలకు వెళ్ళాడు' to English", order: 9 },
      { lessonId: lessons[18].id, type: "SELECT", question: "What is the past tense marker in 'మేము ఆడాము'?", order: 10 },
      
      // Telugu Grammar Unit - Future Tense
      { lessonId: lessons[19].id, type: "SELECT", question: "How do you form the future tense in Telugu?", order: 1 },
      { lessonId: lessons[19].id, type: "SELECT", question: "What suffix is added to verbs to show future action?", order: 2 },
      { lessonId: lessons[19].id, type: "SELECT", question: "Choose the correct future tense form of 'చేయు' (to do) for 'I'", order: 3 },
      { lessonId: lessons[19].id, type: "SELECT", question: "Choose the correct future tense form of 'రాయు' (to write) for 'he'", order: 4 },
      { lessonId: lessons[19].id, type: "SELECT", question: "Which sentence is in the future tense?", order: 5 },
      { lessonId: lessons[19].id, type: "SELECT", question: "How would you say 'I will go tomorrow' in Telugu?", order: 6 },
      { lessonId: lessons[19].id, type: "SELECT", question: "How would you say 'She will sing a song' in Telugu?", order: 7 },
      { lessonId: lessons[19].id, type: "SELECT", question: "Translate 'నేను చేస్తాను' to English", order: 8 },
      { lessonId: lessons[19].id, type: "SELECT", question: "Translate 'వాళ్ళు రేపు వస్తారు' to English", order: 9 },
      { lessonId: lessons[19].id, type: "SELECT", question: "What is the future tense marker in 'ఆమె పాడుతుంది'?", order: 10 },
      
      // Kannada Vocabulary Unit - Common Nouns Lesson
      { lessonId: lessons[30].id, type: "SELECT", question: "What is the Kannada word for 'water'?", order: 1 },
      { lessonId: lessons[30].id, type: "SELECT", question: "What is the Kannada word for 'food'?", order: 2 },
      { lessonId: lessons[30].id, type: "SELECT", question: "What is the Kannada word for 'house'?", order: 3 },
      { lessonId: lessons[30].id, type: "SELECT", question: "What is the Kannada word for 'book'?", order: 4 },
      { lessonId: lessons[30].id, type: "SELECT", question: "What is the Kannada word for 'tree'?", order: 5 },
      { lessonId: lessons[30].id, type: "SELECT", question: "What does 'ನೀರು' mean in English?", order: 6 },
      { lessonId: lessons[30].id, type: "SELECT", question: "What does 'ಆಹಾರ' mean in English?", order: 7 },
      { lessonId: lessons[30].id, type: "SELECT", question: "What does 'ಮನೆ' mean in English?", order: 8 },
      { lessonId: lessons[30].id, type: "SELECT", question: "What does 'ಪುಸ್ತಕ' mean in English?", order: 9 },
      { lessonId: lessons[30].id, type: "SELECT", question: "What does 'ಮರ' mean in English?", order: 10 },
      
      // Kannada Grammar Unit - Basic Sentence Structure
      { lessonId: lessons[35].id, type: "SELECT", question: "What is the typical word order in a Kannada sentence?", order: 1 },
      { lessonId: lessons[35].id, type: "SELECT", question: "In Kannada, where does the verb usually come in a sentence?", order: 2 },
      { lessonId: lessons[35].id, type: "SELECT", question: "Choose the correct sentence structure for 'I am eating food' in Kannada", order: 3 },
      { lessonId: lessons[35].id, type: "SELECT", question: "Choose the correct sentence structure for 'She went to school' in Kannada", order: 4 },
      { lessonId: lessons[35].id, type: "SELECT", question: "Which of these is a correctly structured Kannada sentence?", order: 5 },
      { lessonId: lessons[35].id, type: "SELECT", question: "How would you say 'I am going home' in Kannada?", order: 6 },
      { lessonId: lessons[35].id, type: "SELECT", question: "How would you say 'He is reading a book' in Kannada?", order: 7 },
      { lessonId: lessons[35].id, type: "SELECT", question: "Translate 'ನಾನು ಪುಸ್ತಕ ಓದುತ್ತಿದ್ದೇನೆ' to English", order: 8 },
      { lessonId: lessons[35].id, type: "SELECT", question: "Translate 'ಅವಳು ಶಾಲೆಗೆ ಹೋಗುತ್ತಿದ್ದಾಳೆ' to English", order: 9 },
      { lessonId: lessons[35].id, type: "SELECT", question: "Identify the subject in 'ರಾಮು ಅನ್ನ ತಿನ್ನುತ್ತಿದ್ದಾನೆ'", order: 10 }
    ]).returning();

    // Helper function to generate options for Telugu challenges
    const createTeluguOptions = (challengeId: number, question: string) => {
      // Extract what we're asking about from the question
      const isAboutSound = question.toLowerCase().includes("sound");
      const isAboutLetter = question.toLowerCase().includes("letter");
      const isAboutVowels = question.toLowerCase().includes("vowel");
      const isAboutConsonants = question.toLowerCase().includes("consonant");
      const isTeluguVocabularyQuestion = question.toLowerCase().includes("telugu word for") || 
                                          (question.toLowerCase().includes("mean") && question.match(/[^\u0000-\u007F]/));
      const isTeluguGrammarQuestion = question.toLowerCase().includes("telugu sentence") || 
                                      question.toLowerCase().includes("telugu pronoun") ||
                                      question.toLowerCase().includes("tense") || 
                                      question.toLowerCase().includes("suffix") ||
                                      question.toLowerCase().includes("translate") ||
                                      question.toLowerCase().includes("form of") ||
                                      question.toLowerCase().includes("marker in");
      
      // Telugu characters for options
      const teluguVowels = ["అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ", "ఋ", "ౠ", "ఎ", "ఏ", "ఐ", "ఒ", "ఓ", "ఔ"];
      const teluguConsonants = ["క", "ఖ", "గ", "ఘ", "ఙ", "చ", "ఛ", "జ", "ఝ", "ఞ", "ట", "ఠ", "డ", "ఢ", "ణ", "త", "థ", "ద", "ధ", "న", "ప", "ఫ", "బ", "భ", "మ", "య", "ర", "ల", "వ", "శ", "ష", "స", "హ", "ళ", "క్ష", "ఱ"];
      
      let correctOption = "";
      let incorrectOptions = [];
      
      // For Telugu vocabulary questions
      if (isTeluguVocabularyQuestion) {
        // Common Nouns
        if (question.includes("water") || question.includes("నీరు")) {
          correctOption = question.includes("water") ? "నీరు" : "Water";
          incorrectOptions = question.includes("water") ? 
            ["పుస్తకం", "ఆహారం", "చెట్టు"] : 
            ["Book", "Food", "Tree"];
        } 
        else if (question.includes("food") || question.includes("ఆహారం")) {
          correctOption = question.includes("food") ? "ఆహారం" : "Food";
          incorrectOptions = question.includes("food") ? 
            ["ఇల్లు", "నీరు", "పుస్తకం"] : 
            ["House", "Water", "Book"];
        }
        else if (question.includes("house") || question.includes("ఇల్లు")) {
          correctOption = question.includes("house") ? "ఇల్లు" : "House";
          incorrectOptions = question.includes("house") ? 
            ["చెట్టు", "ఆహారం", "నీరు"] : 
            ["Tree", "Food", "Water"];
        }
        else if (question.includes("book") || question.includes("పుస్తకం")) {
          correctOption = question.includes("book") ? "పుస్తకం" : "Book";
          incorrectOptions = question.includes("book") ? 
            ["చెట్టు", "ఇల్లు", "ఆహారం"] : 
            ["Tree", "House", "Food"];
        }
        else if (question.includes("tree") || question.includes("చెట్టు")) {
          correctOption = question.includes("tree") ? "చెట్టు" : "Tree";
          incorrectOptions = question.includes("tree") ? 
            ["పుస్తకం", "నీరు", "ఇల్లు"] : 
            ["Book", "Water", "House"];
        }
        // Essential Verbs
        else if (question.includes("to go") || question.includes("వెళ్ళు")) {
          correctOption = question.includes("to go") ? "వెళ్ళు" : "To go";
          incorrectOptions = question.includes("to go") ? 
            ["రా", "తిను", "తాగు"] : 
            ["To come", "To eat", "To drink"];
        }
        else if (question.includes("to come") || question.includes("రా")) {
          correctOption = question.includes("to come") ? "రా" : "To come";
          incorrectOptions = question.includes("to come") ? 
            ["వెళ్ళు", "నిద్రపోవు", "తిను"] : 
            ["To go", "To sleep", "To eat"];
        }
        else if (question.includes("to eat") || question.includes("తిను")) {
          correctOption = question.includes("to eat") ? "తిను" : "To eat";
          incorrectOptions = question.includes("to eat") ? 
            ["తాగు", "రా", "నిద్రపోవు"] : 
            ["To drink", "To come", "To sleep"];
        }
        else if (question.includes("to drink") || question.includes("తాగు")) {
          correctOption = question.includes("to drink") ? "తాగు" : "To drink";
          incorrectOptions = question.includes("to drink") ? 
            ["తిను", "వెళ్ళు", "రా"] : 
            ["To eat", "To go", "To come"];
        }
        else if (question.includes("to sleep") || question.includes("నిద్రపోవు")) {
          correctOption = question.includes("to sleep") ? "నిద్రపోవు" : "To sleep";
          incorrectOptions = question.includes("to sleep") ? 
            ["వెళ్ళు", "తాగు", "తిను"] : 
            ["To go", "To drink", "To eat"];
        }
        // Colors
        else if (question.includes("red") || question.includes("ఎరుపు")) {
          correctOption = question.includes("red") ? "ఎరుపు" : "Red";
          incorrectOptions = question.includes("red") ? 
            ["నీలం", "ఆకుపచ్చ", "పసుపు"] : 
            ["Blue", "Green", "Yellow"];
        }
        else if (question.includes("blue") || question.includes("నీలం")) {
          correctOption = question.includes("blue") ? "నీలం" : "Blue";
          incorrectOptions = question.includes("blue") ? 
            ["ఎరుపు", "నలుపు", "ఆకుపచ్చ"] : 
            ["Red", "Black", "Green"];
        }
        else if (question.includes("green") || question.includes("ఆకుపచ్చ")) {
          correctOption = question.includes("green") ? "ఆకుపచ్చ" : "Green";
          incorrectOptions = question.includes("green") ? 
            ["పసుపు", "నీలం", "నలుపు"] : 
            ["Yellow", "Blue", "Black"];
        }
        else if (question.includes("yellow") || question.includes("పసుపు")) {
          correctOption = question.includes("yellow") ? "పసుపు" : "Yellow";
          incorrectOptions = question.includes("yellow") ? 
            ["ఎరుపు", "నలుపు", "నీలం"] : 
            ["Red", "Black", "Blue"];
        }
        else if (question.includes("black") || question.includes("నలుపు")) {
          correctOption = question.includes("black") ? "నలుపు" : "Black";
          incorrectOptions = question.includes("black") ? 
            ["ఆకుపచ్చ", "పసుపు", "ఎరుపు"] : 
            ["Green", "Yellow", "Red"];
        }
        // Family
        else if (question.includes("mother") || question.includes("అమ్మ")) {
          correctOption = question.includes("mother") ? "అమ్మ" : "Mother";
          incorrectOptions = question.includes("mother") ? 
            ["నాన్న", "అక్క", "తాత"] : 
            ["Father", "Sister", "Grandfather"];
        }
        else if (question.includes("father") || question.includes("నాన్న")) {
          correctOption = question.includes("father") ? "నాన్న" : "Father";
          incorrectOptions = question.includes("father") ? 
            ["అమ్మ", "అన్న", "తాత"] : 
            ["Mother", "Brother", "Grandfather"];
        }
        else if (question.includes("sister") || (question.includes("అక్క") || question.includes("చెల్లి"))) {
          correctOption = question.includes("sister") ? "అక్క/చెల్లి" : "Sister";
          incorrectOptions = question.includes("sister") ? 
            ["అన్న/తమ్ముడు", "అమ్మ", "నాన్న"] : 
            ["Brother", "Mother", "Father"];
        }
        else if (question.includes("brother") || (question.includes("అన్న") || question.includes("తమ్ముడు"))) {
          correctOption = question.includes("brother") ? "అన్న/తమ్ముడు" : "Brother";
          incorrectOptions = question.includes("brother") ? 
            ["అక్క/చెల్లి", "తాత", "నాన్న"] : 
            ["Sister", "Grandfather", "Father"];
        }
        else if (question.includes("grandfather") || question.includes("తాత")) {
          correctOption = question.includes("grandfather") ? "తాత" : "Grandfather";
          incorrectOptions = question.includes("grandfather") ? 
            ["నాన్న", "అమ్మ", "అక్క/చెల్లి"] : 
            ["Father", "Mother", "Sister"];
        }
        // Food and Dining
        else if (question.includes("rice") || question.includes("అన్నం")) {
          correctOption = question.includes("rice") ? "అన్నం" : "Rice";
          incorrectOptions = question.includes("rice") ? 
            ["కూర", "పండు", "మిఠాయి"] : 
            ["Curry", "Fruit", "Sweets"];
        }
        else if (question.includes("curry") || question.includes("కూర")) {
          correctOption = question.includes("curry") ? "కూర" : "Curry";
          incorrectOptions = question.includes("curry") ? 
            ["అన్నం", "కూరగాయలు", "మిఠాయి"] : 
            ["Rice", "Vegetable", "Sweets"];
        }
        else if (question.includes("vegetable") || question.includes("కూరగాయలు")) {
          correctOption = question.includes("vegetable") ? "కూరగాయలు" : "Vegetable";
          incorrectOptions = question.includes("vegetable") ? 
            ["పండు", "అన్నం", "కూర"] : 
            ["Fruit", "Rice", "Curry"];
        }
        else if (question.includes("fruit") || question.includes("పండు")) {
          correctOption = question.includes("fruit") ? "పండు" : "Fruit";
          incorrectOptions = question.includes("fruit") ? 
            ["కూరగాయలు", "మిఠాయి", "అన్నం"] : 
            ["Vegetable", "Sweets", "Rice"];
        }
        else if (question.includes("sweets") || question.includes("మిఠాయి")) {
          correctOption = question.includes("sweets") ? "మిఠాయి" : "Sweets";
          incorrectOptions = question.includes("sweets") ? 
            ["చపాతి", "అన్నం", "కూర"] : 
            ["Chapati", "Rice", "Curry"];
        }
        else {
          // For any other vocabulary questions not specifically handled
          correctOption = "General Telugu Term";
          incorrectOptions = ["Wrong Option 1", "Wrong Option 2", "Wrong Option 3"];
        }
      }
      // Grammar questions for Telugu
      else if (question.toLowerCase().includes("telugu sentence") || 
              question.toLowerCase().includes("telugu pronoun") ||
              question.toLowerCase().includes("tense") || 
              question.toLowerCase().includes("suffix") ||
              question.toLowerCase().includes("translate") ||
              question.toLowerCase().includes("form of") ||
              question.toLowerCase().includes("marker in")) {
        
        // Basic Sentence Structure
        if (question.includes("typical word order")) {
          correctOption = "Subject-Object-Verb (SOV)";
          incorrectOptions = ["Subject-Verb-Object (SVO)", "Verb-Subject-Object (VSO)", "Object-Subject-Verb (OSV)"];
        }
        else if (question.includes("verb placement")) {
          correctOption = "At the end of the sentence";
          incorrectOptions = ["At the beginning of the sentence", "After the subject", "Before the object"];
        }
        // Pronouns
        else if (question.includes("I") && question.includes("pronoun")) {
          correctOption = "నేను (nēnu)";
          incorrectOptions = ["నువ్వు (nuvvu)", "అతను (atanu)", "ఆమె (āme)"];
        }
        else if (question.includes("you") && question.includes("pronoun")) {
          correctOption = "నువ్వు (nuvvu)";
          incorrectOptions = ["నేను (nēnu)", "మీరు (mīru)", "వారు (vāru)"];
        }
        else if (question.includes("he") && question.includes("pronoun")) {
          correctOption = "అతను (atanu)";
          incorrectOptions = ["ఆమె (āme)", "నేను (nēnu)", "వారు (vāru)"];
        }
        else if (question.includes("she") && question.includes("pronoun")) {
          correctOption = "ఆమె (āme)";
          incorrectOptions = ["అతను (atanu)", "నీవు (nīvu)", "మేము (mēmu)"];
        }
        // Present Tense
        else if (question.includes("present tense") && question.includes("marker")) {
          correctOption = "-తున్నా (-tunnā)";
          incorrectOptions = ["-తా (-tā)", "-ను (-nu)", "-ము (-mu)"];
        }
        else if (question.includes("present tense") && question.includes("example")) {
          correctOption = "నేను తింటున్నాను (nēnu tiṇṭunnānu) - I am eating";
          incorrectOptions = [
            "నేను తిన్నాను (nēnu tinnānu) - I ate", 
            "నేను తింటాను (nēnu tiṇṭānu) - I will eat", 
            "నేను తినలేదు (nēnu tinalēdu) - I did not eat"
          ];
        }
        // Past Tense
        else if (question.includes("past tense") && question.includes("marker")) {
          correctOption = "-ఆను (-ānu)";
          incorrectOptions = ["-తున్నా (-tunnā)", "-తా (-tā)", "-తారు (-tāru)"];
        }
        else if (question.includes("past tense") && question.includes("example")) {
          correctOption = "నేను తిన్నాను (nēnu tinnānu) - I ate";
          incorrectOptions = [
            "నేను తింటున్నాను (nēnu tiṇṭunnānu) - I am eating", 
            "నేను తింటాను (nēnu tiṇṭānu) - I will eat", 
            "నేను తినలేదు (nēnu tinalēdu) - I did not eat"
          ];
        }
        // Future Tense
        else if (question.includes("future tense") && question.includes("marker")) {
          correctOption = "-తా (-tā)";
          incorrectOptions = ["-ఆను (-ānu)", "-తున్నా (-tunnā)", "-ను (-nu)"];
        }
        else if (question.includes("future tense") && question.includes("example")) {
          correctOption = "నేను తింటాను (nēnu tiṇṭānu) - I will eat";
          incorrectOptions = [
            "నేను తిన్నాను (nēnu tinnānu) - I ate", 
            "నేను తింటున్నాను (nēnu tiṇṭunnānu) - I am eating", 
            "నేను తినలేదు (nēnu tinalēdu) - I did not eat"
          ];
        }
        else {
          // Default for other grammar questions
          correctOption = "Telugu grammar rule";
          incorrectOptions = ["Incorrect rule 1", "Incorrect rule 2", "Incorrect rule 3"];
        }
      }
      // For letter questions, use actual Telugu letters as options
      else if (isAboutLetter && question.includes("'a'")) {
        correctOption = "అ";
        // Select 3 random different Telugu vowels that are not the correct option
        incorrectOptions = getRandomItems(teluguVowels.filter(v => v !== "అ"), 3);
      } else if (isAboutLetter && question.includes("'i'")) {
        correctOption = "ఇ";
        incorrectOptions = getRandomItems(teluguVowels.filter(v => v !== "ఇ"), 3);
      } else if (isAboutLetter && question.includes("'u'")) {
        correctOption = "ఉ";
        incorrectOptions = getRandomItems(teluguVowels.filter(v => v !== "ఉ"), 3);
      } else if (isAboutLetter && question.includes("'e'")) {
        correctOption = "ఎ";
        incorrectOptions = getRandomItems(teluguVowels.filter(v => v !== "ఎ"), 3);
      } else if (isAboutLetter && question.includes("'o'")) {
        correctOption = "ఒ";
        incorrectOptions = getRandomItems(teluguVowels.filter(v => v !== "ఒ"), 3);
      } else if (isAboutLetter && question.includes("'aa'")) {
        correctOption = "ఆ";
        incorrectOptions = getRandomItems(teluguVowels.filter(v => v !== "ఆ"), 3);
      } else if (isAboutLetter && question.includes("'ee'")) {
        correctOption = "ఈ";
        incorrectOptions = getRandomItems(teluguVowels.filter(v => v !== "ఈ"), 3);
      } else if (isAboutLetter && question.includes("'oo'")) {
        correctOption = "ఊ";
        incorrectOptions = getRandomItems(teluguVowels.filter(v => v !== "ఊ"), 3);
      } else if (isAboutLetter && question.includes("'ai'")) {
        correctOption = "ఐ";
        incorrectOptions = getRandomItems(teluguVowels.filter(v => v !== "ఐ"), 3);
      } else if (isAboutLetter && question.includes("'au'")) {
        correctOption = "ఔ";
        incorrectOptions = getRandomItems(teluguVowels.filter(v => v !== "ఔ"), 3);
      } else if (isAboutSound && question.includes("అ")) {
        correctOption = "Short 'a'";
        incorrectOptions = ["Long 'aa'", "Short 'i'", "Long 'ee'"];
      } else if (isAboutSound && question.includes("ఇ")) {
        correctOption = "Short 'i'";
        incorrectOptions = ["Long 'ee'", "Short 'u'", "Long 'oo'"];
      } else if (isAboutSound && question.includes("ఉ")) {
        correctOption = "Short 'u'";
        incorrectOptions = ["Long 'oo'", "Short 'e'", "Long 'ee'"];
      } else if (isAboutSound && question.includes("ఎ")) {
        correctOption = "Short 'e'";
        incorrectOptions = ["Long 'ee'", "Short 'o'", "Long 'oo'"];
      } else if (isAboutSound && question.includes("ఒ")) {
        correctOption = "Short 'o'";
        incorrectOptions = ["Long 'oo'", "Short 'a'", "Long 'aa'"];
      } else if (isAboutSound && question.includes("ఆ")) {
        correctOption = "Long 'aa'";
        incorrectOptions = ["Short 'a'", "Long 'ee'", "Short 'i'"];
      } else if (isAboutSound && question.includes("ఈ")) {
        correctOption = "Long 'ee'";
        incorrectOptions = ["Short 'i'", "Long 'aa'", "Short 'u'"];
      } else if (isAboutSound && question.includes("ఊ")) {
        correctOption = "Long 'oo'";
        incorrectOptions = ["Short 'u'", "Long 'ee'", "Short 'o'"];
      } else if (isAboutSound && question.includes("ఏ")) {
        correctOption = "Long 'ee'";
        incorrectOptions = ["Short 'e'", "Long 'aa'", "Short 'o'"];
      } else if (isAboutSound && question.includes("ఓ")) {
        correctOption = "Long 'oo'";
        incorrectOptions = ["Short 'o'", "Long 'aa'", "Short 'a'"];
      } else if (isAboutSound && question.includes("ఐ")) {
        correctOption = "'ai' as in 'aisle'";
        incorrectOptions = ["'a' as in 'cat'", "'i' as in 'sit'", "'e' as in 'set'"];
      } else if (isAboutSound && question.includes("ఔ")) {
        correctOption = "'au' as in 'house'";
        incorrectOptions = ["'o' as in 'go'", "'u' as in 'put'", "'au' as in 'caught'"];
      } else if (question.includes("longer") && question.includes("అ") && question.includes("ఆ")) {
        correctOption = "ఆ";
        incorrectOptions = ["అ", "ఇ", "ఈ"];
      } else if (question.includes("longer") && question.includes("ఇ") && question.includes("ఈ")) {
        correctOption = "ఈ";
        incorrectOptions = ["ఇ", "ఉ", "ఊ"];
      } else if (question.includes("combination") && question.includes("అ") && question.includes("ఇ")) {
        correctOption = "ఐ";
        incorrectOptions = ["ఎ", "ఏ", "ఔ"];
      } else if (question.includes("combination") && question.includes("అ") && question.includes("ఉ")) {
        correctOption = "ఔ";
        incorrectOptions = ["ఒ", "ఓ", "ఐ"];
      } else if (question.includes("made of") && question.includes("ఐ")) {
        correctOption = "అ + ఇ";
        incorrectOptions = ["అ + ఉ", "అ + ఎ", "అ + ఒ"];
      } else if (question.includes("made of") && question.includes("ఔ")) {
        correctOption = "అ + ఉ";
        incorrectOptions = ["అ + ఇ", "అ + ఎ", "అ + ఒ"];
      } else {
        // For cases that don't match specific patterns, use general Telugu characters
        correctOption = getRandomItems(teluguVowels, 1)[0];
        incorrectOptions = getRandomItems(teluguVowels.filter(v => v !== correctOption).concat(teluguConsonants), 3);
      }
      
      return [
        { challengeId, text: correctOption, correct: true },
        { challengeId, text: incorrectOptions[0], correct: false },
        { challengeId, text: incorrectOptions[1], correct: false },
        { challengeId, text: incorrectOptions[2], correct: false },
      ];
    };
    
    // Helper function to generate options for Kannada challenges
    const createKannadaOptions = (challengeId: number, question: string) => {
      // Extract what we're asking about from the question
      const isAboutSound = question.toLowerCase().includes("sound");
      const isAboutLetter = question.toLowerCase().includes("letter");
      const isAboutVowels = question.toLowerCase().includes("vowel");
      const isAboutConsonants = question.toLowerCase().includes("consonant");
      
      // Kannada characters for options
      const kannadaVowels = ["ಅ", "ಆ", "ಇ", "ಈ", "ಉ", "ಊ", "ಋ", "ೠ", "ಎ", "ಏ", "ಐ", "ಒ", "ಓ", "ಔ"];
      const kannadaConsonants = ["ಕ", "ಖ", "ಗ", "ಘ", "ಙ", "ಚ", "ಛ", "ಜ", "ಝ", "ಞ", "ಟ", "ಠ", "ಡ", "ಢ", "ಣ", "ತ", "ಥ", "ದ", "ಧ", "ನ", "ಪ", "ಫ", "ಬ", "ಭ", "ಮ", "ಯ", "ರ", "ಲ", "ವ", "ಶ", "ಷ", "ಸ", "ಹ", "ಳ", "ಕ್ಷ", "ಱ"];
      
      let correctOption = "";
      let incorrectOptions = [];
      
      // For letter questions, use actual Kannada letters as options
      if (isAboutLetter && question.includes("'a'")) {
        correctOption = "ಅ";
        // Select 3 random different Kannada vowels that are not the correct option
        incorrectOptions = getRandomItems(kannadaVowels.filter(v => v !== "ಅ"), 3);
      } else if (isAboutLetter && question.includes("'i'")) {
        correctOption = "ಇ";
        incorrectOptions = getRandomItems(kannadaVowels.filter(v => v !== "ಇ"), 3);
      } else if (isAboutLetter && question.includes("'u'")) {
        correctOption = "ಉ";
        incorrectOptions = getRandomItems(kannadaVowels.filter(v => v !== "ಉ"), 3);
      } else if (isAboutLetter && question.includes("'e'")) {
        correctOption = "ಎ";
        incorrectOptions = getRandomItems(kannadaVowels.filter(v => v !== "ಎ"), 3);
      } else if (isAboutLetter && question.includes("'o'")) {
        correctOption = "ಒ";
        incorrectOptions = getRandomItems(kannadaVowels.filter(v => v !== "ಒ"), 3);
      } else if (isAboutLetter && question.includes("'aa'")) {
        correctOption = "ಆ";
        incorrectOptions = getRandomItems(kannadaVowels.filter(v => v !== "ಆ"), 3);
      } else if (isAboutLetter && question.includes("'ee'")) {
        correctOption = "ಈ";
        incorrectOptions = getRandomItems(kannadaVowels.filter(v => v !== "ಈ"), 3);
      } else if (isAboutLetter && question.includes("'oo'")) {
        correctOption = "ಊ";
        incorrectOptions = getRandomItems(kannadaVowels.filter(v => v !== "ಊ"), 3);
      } else if (isAboutLetter && question.includes("'ai'")) {
        correctOption = "ಐ";
        incorrectOptions = getRandomItems(kannadaVowels.filter(v => v !== "ಐ"), 3);
      } else if (isAboutLetter && question.includes("'au'")) {
        correctOption = "ಔ";
        incorrectOptions = getRandomItems(kannadaVowels.filter(v => v !== "ಔ"), 3);
      } else if (isAboutSound && question.includes("ಅ")) {
        correctOption = "Short 'a'";
        incorrectOptions = ["Long 'aa'", "Short 'i'", "Long 'ee'"];
      } else if (isAboutSound && question.includes("ಇ")) {
        correctOption = "Short 'i'";
        incorrectOptions = ["Long 'ee'", "Short 'u'", "Long 'oo'"];
      } else if (isAboutSound && question.includes("ಉ")) {
        correctOption = "Short 'u'";
        incorrectOptions = ["Long 'oo'", "Short 'e'", "Long 'ee'"];
      } else if (isAboutSound && question.includes("ಎ")) {
        correctOption = "Short 'e'";
        incorrectOptions = ["Long 'ee'", "Short 'o'", "Long 'oo'"];
      } else if (isAboutSound && question.includes("ಒ")) {
        correctOption = "Short 'o'";
        incorrectOptions = ["Long 'oo'", "Short 'a'", "Long 'aa'"];
      } else if (isAboutSound && question.includes("ಆ")) {
        correctOption = "Long 'aa'";
        incorrectOptions = ["Short 'a'", "Long 'ee'", "Short 'i'"];
      } else if (isAboutSound && question.includes("ಈ")) {
        correctOption = "Long 'ee'";
        incorrectOptions = ["Short 'i'", "Long 'aa'", "Short 'u'"];
      } else if (isAboutSound && question.includes("ಊ")) {
        correctOption = "Long 'oo'";
        incorrectOptions = ["Short 'u'", "Long 'ee'", "Short 'o'"];
      } else if (isAboutSound && question.includes("ಏ")) {
        correctOption = "Long 'ee'";
        incorrectOptions = ["Short 'e'", "Long 'aa'", "Short 'o'"];
      } else if (isAboutSound && question.includes("ಓ")) {
        correctOption = "Long 'oo'";
        incorrectOptions = ["Short 'o'", "Long 'aa'", "Short 'a'"];
      } else if (isAboutSound && question.includes("ಐ")) {
        correctOption = "'ai' as in 'aisle'";
        incorrectOptions = ["'a' as in 'cat'", "'i' as in 'sit'", "'e' as in 'set'"];
      } else if (isAboutSound && question.includes("ಔ")) {
        correctOption = "'au' as in 'house'";
        incorrectOptions = ["'o' as in 'go'", "'u' as in 'put'", "'au' as in 'caught'"];
      } else if (question.includes("longer") && question.includes("ಅ") && question.includes("ಆ")) {
        correctOption = "ಆ";
        incorrectOptions = ["ಅ", "ಇ", "ಈ"];
      } else if (question.includes("longer") && question.includes("ಇ") && question.includes("ಈ")) {
        correctOption = "ಈ";
        incorrectOptions = ["ಇ", "ಉ", "ಊ"];
      } else if (question.includes("combination") && question.includes("ಅ") && question.includes("ಇ")) {
        correctOption = "ಐ";
        incorrectOptions = ["ಎ", "ಏ", "ಔ"];
      } else if (question.includes("combination") && question.includes("ಅ") && question.includes("ಉ")) {
        correctOption = "ಔ";
        incorrectOptions = ["ಒ", "ಓ", "ಐ"];
      } else if (question.includes("made of") && question.includes("ಐ")) {
        correctOption = "ಅ + ಇ";
        incorrectOptions = ["ಅ + ಉ", "ಅ + ಎ", "ಅ + ಒ"];
      } else if (question.includes("made of") && question.includes("ಔ")) {
        correctOption = "ಅ + ಉ";
        incorrectOptions = ["ಅ + ಇ", "ಅ + ಎ", "ಅ + ಒ"];
      } else {
        // For cases that don't match specific patterns, use general Kannada characters
        correctOption = getRandomItems(kannadaVowels, 1)[0];
        incorrectOptions = getRandomItems(kannadaVowels.filter(v => v !== correctOption).concat(kannadaConsonants), 3);
      }
      
      return [
        { challengeId, text: correctOption, correct: true },
        { challengeId, text: incorrectOptions[0], correct: false },
        { challengeId, text: incorrectOptions[1], correct: false },
        { challengeId, text: incorrectOptions[2], correct: false },
      ];
    };
    
    // Helper function to get random items from an array
    function getRandomItems(array: any[], count: number) {
      const shuffled = [...array].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
    
    // Generate options for all challenges
    const allOptions = [];
    
    // Add the original options for first 10 Telugu challenges and first 10 Kannada challenges
    const originalOptions = [
      // Telugu Short Vowels - Question 1
      { challengeId: challenges[0].id, text: "అ", correct: true },
      { challengeId: challenges[0].id, text: "ఆ", correct: false },
      { challengeId: challenges[0].id, text: "ఇ", correct: false },
      { challengeId: challenges[0].id, text: "ఈ", correct: false },
      
      // Question 2
      { challengeId: challenges[1].id, text: "ఇ", correct: true },
      { challengeId: challenges[1].id, text: "ఈ", correct: false },
      { challengeId: challenges[1].id, text: "ఉ", correct: false },
      { challengeId: challenges[1].id, text: "ఊ", correct: false },
      
      // Question 3
      { challengeId: challenges[2].id, text: "ఉ", correct: true },
      { challengeId: challenges[2].id, text: "ఊ", correct: false },
      { challengeId: challenges[2].id, text: "ఎ", correct: false },
      { challengeId: challenges[2].id, text: "ఏ", correct: false },
      
      // Question 4
      { challengeId: challenges[3].id, text: "ఎ", correct: true },
      { challengeId: challenges[3].id, text: "ఏ", correct: false },
      { challengeId: challenges[3].id, text: "ఒ", correct: false },
      { challengeId: challenges[3].id, text: "ఓ", correct: false },
      
      // Question 5
      { challengeId: challenges[4].id, text: "ఒ", correct: true },
      { challengeId: challenges[4].id, text: "ఓ", correct: false },
      { challengeId: challenges[4].id, text: "అ", correct: false },
      { challengeId: challenges[4].id, text: "ఆ", correct: false },

      // Question 6
      { challengeId: challenges[5].id, text: "Short 'a'", correct: true },
      { challengeId: challenges[5].id, text: "Long 'aa'", correct: false },
      { challengeId: challenges[5].id, text: "Short 'i'", correct: false },
      { challengeId: challenges[5].id, text: "Long 'ee'", correct: false },

      // Question 7
      { challengeId: challenges[6].id, text: "Short 'i'", correct: true },
      { challengeId: challenges[6].id, text: "Long 'ee'", correct: false },
      { challengeId: challenges[6].id, text: "Short 'u'", correct: false },
      { challengeId: challenges[6].id, text: "Long 'oo'", correct: false },

      // Question 8
      { challengeId: challenges[7].id, text: "Short 'u'", correct: true },
      { challengeId: challenges[7].id, text: "Long 'oo'", correct: false },
      { challengeId: challenges[7].id, text: "Short 'e'", correct: false },
      { challengeId: challenges[7].id, text: "Long 'ee'", correct: false },

      // Question 9
      { challengeId: challenges[8].id, text: "Short 'e'", correct: true },
      { challengeId: challenges[8].id, text: "Long 'ee'", correct: false },
      { challengeId: challenges[8].id, text: "Short 'o'", correct: false },
      { challengeId: challenges[8].id, text: "Long 'oo'", correct: false },

      // Question 10
      { challengeId: challenges[9].id, text: "Short 'o'", correct: true },
      { challengeId: challenges[9].id, text: "Long 'oo'", correct: false },
      { challengeId: challenges[9].id, text: "Short 'a'", correct: false },
      { challengeId: challenges[9].id, text: "Long 'aa'", correct: false },

      // Kannada Short Vowels - Question 1
      { challengeId: challenges[30].id, text: "ಅ", correct: true },
      { challengeId: challenges[30].id, text: "ಆ", correct: false },
      { challengeId: challenges[30].id, text: "ಇ", correct: false },
      { challengeId: challenges[30].id, text: "ಈ", correct: false },
      
      // Question 2
      { challengeId: challenges[31].id, text: "ಇ", correct: true },
      { challengeId: challenges[31].id, text: "ಈ", correct: false },
      { challengeId: challenges[31].id, text: "ಉ", correct: false },
      { challengeId: challenges[31].id, text: "ಊ", correct: false },
      
      // Question 3
      { challengeId: challenges[32].id, text: "ಉ", correct: true },
      { challengeId: challenges[32].id, text: "ಊ", correct: false },
      { challengeId: challenges[32].id, text: "ಎ", correct: false },
      { challengeId: challenges[32].id, text: "ಏ", correct: false },
      
      // Question 4
      { challengeId: challenges[33].id, text: "ಎ", correct: true },
      { challengeId: challenges[33].id, text: "ಏ", correct: false },
      { challengeId: challenges[33].id, text: "ಒ", correct: false },
      { challengeId: challenges[33].id, text: "ಓ", correct: false },
      
      // Question 5
      { challengeId: challenges[34].id, text: "ಒ", correct: true },
      { challengeId: challenges[34].id, text: "ಓ", correct: false },
      { challengeId: challenges[34].id, text: "ಅ", correct: false },
      { challengeId: challenges[34].id, text: "ಆ", correct: false },

      // Question 6
      { challengeId: challenges[35].id, text: "Short 'a'", correct: true },
      { challengeId: challenges[35].id, text: "Long 'aa'", correct: false },
      { challengeId: challenges[35].id, text: "Short 'i'", correct: false },
      { challengeId: challenges[35].id, text: "Long 'ee'", correct: false },

      // Question 7
      { challengeId: challenges[36].id, text: "Short 'i'", correct: true },
      { challengeId: challenges[36].id, text: "Long 'ee'", correct: false },
      { challengeId: challenges[36].id, text: "Short 'u'", correct: false },
      { challengeId: challenges[36].id, text: "Long 'oo'", correct: false },

      // Question 8
      { challengeId: challenges[37].id, text: "Short 'u'", correct: true },
      { challengeId: challenges[37].id, text: "Long 'oo'", correct: false },
      { challengeId: challenges[37].id, text: "Short 'e'", correct: false },
      { challengeId: challenges[37].id, text: "Long 'ee'", correct: false },

      // Question 9
      { challengeId: challenges[38].id, text: "Short 'e'", correct: true },
      { challengeId: challenges[38].id, text: "Long 'ee'", correct: false },
      { challengeId: challenges[38].id, text: "Short 'o'", correct: false },
      { challengeId: challenges[38].id, text: "Long 'oo'", correct: false },

      // Question 10
      { challengeId: challenges[39].id, text: "Short 'o'", correct: true },
      { challengeId: challenges[39].id, text: "Long 'oo'", correct: false },
      { challengeId: challenges[39].id, text: "Short 'a'", correct: false },
      { challengeId: challenges[39].id, text: "Long 'aa'", correct: false }
    ];
    
    // Insert original options first
    await db.insert(schema.challengeOptions).values(originalOptions);
    
    // Generate new options for remaining challenges (starting from index 10)
    const challengesWithMissingOptions = challenges.filter((challenge, index) => {
      // Skip the first 10 Telugu and first 10 Kannada challenges
      return !(index < 10 || (index >= 30 && index < 40));
    });
    
    // Generate options for remaining challenges
    for (const challenge of challengesWithMissingOptions) {
      const question = challenge.question;
      
      // Determine if it's Telugu or Kannada based on lesson ID
      const lessonId = challenge.lessonId;
      const isTeluguLesson = lessonId <= lessons[9].id; // First 10 lessons are Telugu
      const isKannadaLesson = lessonId > lessons[9].id && lessonId <= lessons[19].id; // Next 10 lessons are Kannada
      
      const options = isTeluguLesson 
        ? createTeluguOptions(challenge.id, question)
        : createKannadaOptions(challenge.id, question);
        
      allOptions.push(...options);
    }
    
    // Add missing challenges for lesson 94 (Kannada Sibilants & Aspirate)
    console.log("Adding missing challenges for lesson 94 (Kannada Sibilants & Aspirate)");
    const kannadaSibilantsAspiratesChallenges = await db.insert(schema.challenges).values([
      { lessonId: lessons[19].id, type: "SELECT", question: "What is the Kannada letter 'ಶ' called?", order: 1 },
      { lessonId: lessons[19].id, type: "SELECT", question: "What is the Kannada letter 'ಷ' called?", order: 2 },
      { lessonId: lessons[19].id, type: "SELECT", question: "What is the Kannada letter 'ಸ' called?", order: 3 },
      { lessonId: lessons[19].id, type: "SELECT", question: "What is the Kannada letter 'ಹ' called?", order: 4 },
      { lessonId: lessons[19].id, type: "SELECT", question: "How do you pronounce 'ಶ'?", order: 5 },
      { lessonId: lessons[19].id, type: "SELECT", question: "How do you pronounce 'ಷ'?", order: 6 },
      { lessonId: lessons[19].id, type: "SELECT", question: "How do you pronounce 'ಸ'?", order: 7 },
      { lessonId: lessons[19].id, type: "SELECT", question: "How do you pronounce 'ಹ'?", order: 8 },
      { lessonId: lessons[19].id, type: "SELECT", question: "Which letter is used for the 'ha' sound in Kannada?", order: 9 },
      { lessonId: lessons[19].id, type: "SELECT", question: "Which of these is NOT a sibilant in Kannada?", order: 10 }
    ]).returning();

    // Add options for Kannada Sibilants & Aspirates challenges
    const kannadaSibilantsAspiratesOptions = [];
    for (const challenge of kannadaSibilantsAspiratesChallenges) {
      const options = createKannadaOptions(challenge.id, challenge.question);
      kannadaSibilantsAspiratesOptions.push(...options);
    }
    
    // Add Telugu Semivowels challenges if missing
    console.log("Adding challenges for lesson 9 (Telugu Semivowels)");
    const teluguSemivowelsChallenges = await db.insert(schema.challenges).values([
      { lessonId: lessons[8].id, type: "SELECT", question: "Which is the Telugu letter for 'ya'?", order: 1 },
      { lessonId: lessons[8].id, type: "SELECT", question: "Which is the Telugu letter for 'ra'?", order: 2 },
      { lessonId: lessons[8].id, type: "SELECT", question: "Which is the Telugu letter for 'la'?", order: 3 },
      { lessonId: lessons[8].id, type: "SELECT", question: "Which is the Telugu letter for 'va'?", order: 4 },
      { lessonId: lessons[8].id, type: "SELECT", question: "How do you pronounce 'య'?", order: 5 },
      { lessonId: lessons[8].id, type: "SELECT", question: "How do you pronounce 'ర'?", order: 6 },
      { lessonId: lessons[8].id, type: "SELECT", question: "How do you pronounce 'ల'?", order: 7 },
      { lessonId: lessons[8].id, type: "SELECT", question: "How do you pronounce 'వ'?", order: 8 },
      { lessonId: lessons[8].id, type: "SELECT", question: "Which letter makes a 'v' sound in Telugu?", order: 9 },
      { lessonId: lessons[8].id, type: "SELECT", question: "Which letter makes an 'r' sound in Telugu?", order: 10 }
    ]).returning();

    // Add options for Telugu Semivowels challenges
    const teluguSemivowelsOptions = [];
    for (const challenge of teluguSemivowelsChallenges) {
      const options = createTeluguOptions(challenge.id, challenge.question);
      teluguSemivowelsOptions.push(...options);
    }
    
    // Add Telugu Sibilants & Aspirate challenges
    console.log("Adding challenges for lesson 10 (Telugu Sibilants & Aspirate)");
    const teluguSibilantsAspiratesChallenges = await db.insert(schema.challenges).values([
      { lessonId: lessons[9].id, type: "SELECT", question: "Which is the Telugu letter for 'sha'?", order: 1 },
      { lessonId: lessons[9].id, type: "SELECT", question: "Which is the Telugu letter for 'sha' (retroflex)?", order: 2 },
      { lessonId: lessons[9].id, type: "SELECT", question: "Which is the Telugu letter for 'sa'?", order: 3 },
      { lessonId: lessons[9].id, type: "SELECT", question: "Which is the Telugu letter for 'ha'?", order: 4 },
      { lessonId: lessons[9].id, type: "SELECT", question: "How do you pronounce 'శ'?", order: 5 },
      { lessonId: lessons[9].id, type: "SELECT", question: "How do you pronounce 'ష'?", order: 6 },
      { lessonId: lessons[9].id, type: "SELECT", question: "How do you pronounce 'స'?", order: 7 },
      { lessonId: lessons[9].id, type: "SELECT", question: "How do you pronounce 'హ'?", order: 8 },
      { lessonId: lessons[9].id, type: "SELECT", question: "Which letter is used for the 'ha' sound in Telugu?", order: 9 },
      { lessonId: lessons[9].id, type: "SELECT", question: "Which of these is NOT a sibilant in Telugu?", order: 10 }
    ]).returning();
    
    // Add options for Telugu Sibilants & Aspirate challenges
    const teluguSibilantsAspiratesOptions = [];
    for (const challenge of teluguSibilantsAspiratesChallenges) {
      const options = createTeluguOptions(challenge.id, challenge.question);
      teluguSibilantsAspiratesOptions.push(...options);
    }
    
    // Add Kannada Semivowels challenges
    console.log("Adding challenges for lesson 19 (Kannada Semivowels)");
    const kannadaSemivowelsChallenges = await db.insert(schema.challenges).values([
      { lessonId: lessons[18].id, type: "SELECT", question: "Which is the Kannada letter for 'ya'?", order: 1 },
      { lessonId: lessons[18].id, type: "SELECT", question: "Which is the Kannada letter for 'ra'?", order: 2 },
      { lessonId: lessons[18].id, type: "SELECT", question: "Which is the Kannada letter for 'la'?", order: 3 },
      { lessonId: lessons[18].id, type: "SELECT", question: "Which is the Kannada letter for 'va'?", order: 4 },
      { lessonId: lessons[18].id, type: "SELECT", question: "How do you pronounce 'ಯ'?", order: 5 },
      { lessonId: lessons[18].id, type: "SELECT", question: "How do you pronounce 'ರ'?", order: 6 },
      { lessonId: lessons[18].id, type: "SELECT", question: "How do you pronounce 'ಲ'?", order: 7 },
      { lessonId: lessons[18].id, type: "SELECT", question: "How do you pronounce 'ವ'?", order: 8 },
      { lessonId: lessons[18].id, type: "SELECT", question: "Which letter makes a 'v' sound in Kannada?", order: 9 },
      { lessonId: lessons[18].id, type: "SELECT", question: "Which letter makes an 'r' sound in Kannada?", order: 10 }
    ]).returning();
    
    // Add options for Kannada Semivowels challenges
    const kannadaSemivowelsOptions = [];
    for (const challenge of kannadaSemivowelsChallenges) {
      const options = createKannadaOptions(challenge.id, challenge.question);
      kannadaSemivowelsOptions.push(...options);
    }
    
    // Insert all the new options
    if (allOptions.length > 0) {
      await db.insert(schema.challengeOptions).values(allOptions);
    }
    
    // Insert options for the lessons we just added
    const additionalOptions = [
      ...kannadaSibilantsAspiratesOptions,
      ...teluguSemivowelsOptions,
      ...teluguSibilantsAspiratesOptions,
      ...kannadaSemivowelsOptions
    ];
    
    if (additionalOptions.length > 0) {
      console.log(`Adding ${additionalOptions.length} options for newly created challenges`);
      await db.insert(schema.challengeOptions).values(additionalOptions);
    }

    // Final check to ensure ALL lessons have challenges
    console.log("Performing final check for lessons without challenges...");
    
    // Get all lessons from the database
    const allLessons = await db.select().from(schema.lessons);
    console.log(`Total lessons in database: ${allLessons.length}`);
    
    // For each lesson, check if it has challenges
    for (const lesson of allLessons) {
      const challengesForLesson = await db.select().from(schema.challenges).where(eq(schema.challenges.lessonId, lesson.id));
      
      if (challengesForLesson.length === 0) {
        console.log(`Found lesson ${lesson.id} (${lesson.title}) without challenges. Adding challenges now...`);
        
        // Get the unit for this lesson to determine if it's Telugu or Kannada
        const unit = await db.query.units.findFirst({
          where: eq(schema.units.id, lesson.unitId)
        });
        
        // Determine if it's Telugu or Kannada based on the unit's courseId
        const isTeluguLesson = unit?.courseId === courses[0].id || lesson.title.includes("Telugu");
        const isKannadaLesson = unit?.courseId === courses[1].id || lesson.title.includes("Kannada");
        
        console.log(`Lesson ${lesson.id} (${lesson.title}) is ${isTeluguLesson ? 'Telugu' : isKannadaLesson ? 'Kannada' : 'Unknown'}`);
        
        let newChallenges: any[] = [];
        
        // For Lesson 164 and any other problematic Telugu lessons that have Kannada content
        if (lesson.id === 164 || (lesson.title.toLowerCase().includes("palatal") && isTeluguLesson)) {
          console.log(`Creating Telugu-specific challenges for lesson ${lesson.id}: ${lesson.title}`);
          
          if (lesson.title.includes("Palatal Consonants")) {
            console.log(`Adding Telugu palatal consonant challenges for lesson ${lesson.id}`);
            
            const challenges = await db.insert(schema.challenges).values([
              { lessonId: lesson.id, type: "SELECT", question: "Which is the Telugu letter for 'cha'?", order: 1 },
              { lessonId: lesson.id, type: "SELECT", question: "Which is the Telugu letter for 'chha'?", order: 2 },
              { lessonId: lesson.id, type: "SELECT", question: "Which is the Telugu letter for 'ja'?", order: 3 },
              { lessonId: lesson.id, type: "SELECT", question: "Which is the Telugu letter for 'jha'?", order: 4 },
              { lessonId: lesson.id, type: "SELECT", question: "How do you pronounce 'చ'?", order: 5 },
              { lessonId: lesson.id, type: "SELECT", question: "How do you pronounce 'ఛ'?", order: 6 },
              { lessonId: lesson.id, type: "SELECT", question: "How do you pronounce 'జ'?", order: 7 },
              { lessonId: lesson.id, type: "SELECT", question: "How do you pronounce 'ఝ'?", order: 8 },
              { lessonId: lesson.id, type: "SELECT", question: "Which letter makes a 'ch' sound in Telugu?", order: 9 },
              { lessonId: lesson.id, type: "SELECT", question: "Which letter makes a 'j' sound in Telugu?", order: 10 }
            ]).returning();

            newChallenges = challenges;
          } else {
            // Fallback for other Telugu lessons
            newChallenges = await db.insert(schema.challenges).values([
              { lessonId: lesson.id, type: "SELECT", question: "Which Telugu character is this?", order: 1 },
              { lessonId: lesson.id, type: "SELECT", question: "How do you write this sound in Telugu?", order: 2 },
              { lessonId: lesson.id, type: "SELECT", question: "What is the correct pronunciation of this Telugu character?", order: 3 },
              { lessonId: lesson.id, type: "SELECT", question: "Which of these is a Telugu character?", order: 4 },
              { lessonId: lesson.id, type: "SELECT", question: "Match the Telugu character to its pronunciation", order: 5 },
              { lessonId: lesson.id, type: "SELECT", question: "What sound does this Telugu character make?", order: 6 },
              { lessonId: lesson.id, type: "SELECT", question: "Which Telugu character makes this sound?", order: 7 },
              { lessonId: lesson.id, type: "SELECT", question: "Identify the correct Telugu character", order: 8 },
              { lessonId: lesson.id, type: "SELECT", question: "What is this Telugu character called?", order: 9 },
              { lessonId: lesson.id, type: "SELECT", question: "Choose the correct Telugu character for this word", order: 10 }
            ]).returning();
          }
        }
        else if (lesson.id === 94 || (lesson.title.toLowerCase().includes("sibilant") && isKannadaLesson)) {
          // Special case for Lesson 94 (Kannada Sibilants & Aspirate)
          console.log(`Adding specific challenges for lesson ${lesson.id} (Kannada Sibilants & Aspirate)`);
          newChallenges = await db.insert(schema.challenges).values([
            { lessonId: lesson.id, type: "SELECT", question: "What is the Kannada letter 'ಶ' called?", order: 1 },
            { lessonId: lesson.id, type: "SELECT", question: "What is the Kannada letter 'ಷ' called?", order: 2 },
            { lessonId: lesson.id, type: "SELECT", question: "What is the Kannada letter 'ಸ' called?", order: 3 },
            { lessonId: lesson.id, type: "SELECT", question: "What is the Kannada letter 'ಹ' called?", order: 4 },
            { lessonId: lesson.id, type: "SELECT", question: "How do you pronounce 'ಶ'?", order: 5 },
            { lessonId: lesson.id, type: "SELECT", question: "How do you pronounce 'ಷ'?", order: 6 },
            { lessonId: lesson.id, type: "SELECT", question: "How do you pronounce 'ಸ'?", order: 7 },
            { lessonId: lesson.id, type: "SELECT", question: "How do you pronounce 'ಹ'?", order: 8 },
            { lessonId: lesson.id, type: "SELECT", question: "Which letter is used for the 'ha' sound in Kannada?", order: 9 },
            { lessonId: lesson.id, type: "SELECT", question: "Which of these is NOT a sibilant in Kannada?", order: 10 }
          ]).returning();
        } else if (lesson.id === 124 || (lesson.title.toLowerCase().includes("semivowel") && isTeluguLesson)) {
          // Special case for Lesson 124 (might be Telugu Semivowels)
          console.log(`Adding specific challenges for lesson ${lesson.id} (Telugu Semivowels)`);
          newChallenges = await db.insert(schema.challenges).values([
            { lessonId: lesson.id, type: "SELECT", question: "Which is the Telugu letter for 'ya'?", order: 1 },
            { lessonId: lesson.id, type: "SELECT", question: "Which is the Telugu letter for 'ra'?", order: 2 },
            { lessonId: lesson.id, type: "SELECT", question: "Which is the Telugu letter for 'la'?", order: 3 },
            { lessonId: lesson.id, type: "SELECT", question: "Which is the Telugu letter for 'va'?", order: 4 },
            { lessonId: lesson.id, type: "SELECT", question: "How do you pronounce 'య'?", order: 5 },
            { lessonId: lesson.id, type: "SELECT", question: "How do you pronounce 'ర'?", order: 6 },
            { lessonId: lesson.id, type: "SELECT", question: "How do you pronounce 'ల'?", order: 7 },
            { lessonId: lesson.id, type: "SELECT", question: "How do you pronounce 'వ'?", order: 8 },
            { lessonId: lesson.id, type: "SELECT", question: "Which letter makes a 'v' sound in Telugu?", order: 9 },
            { lessonId: lesson.id, type: "SELECT", question: "Which letter makes an 'r' sound in Telugu?", order: 10 }
          ]).returning();
        } else if (isTeluguLesson) {
          // Instead of generic challenges, create specific meaningful Telugu challenges based on lesson title
          console.log(`Adding specific Telugu challenges for lesson ${lesson.id} (${lesson.title})`);
          
          if (lesson.title.toLowerCase().includes("vowel")) {
            // Telugu vowel-specific challenges
            newChallenges = await db.insert(schema.challenges).values([
              { lessonId: lesson.id, type: "SELECT", question: "Which is the Telugu vowel shown here?", order: 1 },
              { lessonId: lesson.id, type: "SELECT", question: "Match the Telugu vowel to its sound", order: 2 },
              { lessonId: lesson.id, type: "SELECT", question: "How is this Telugu vowel pronounced?", order: 3 },
              { lessonId: lesson.id, type: "SELECT", question: "Select the correct transliteration for this Telugu vowel", order: 4 },
              { lessonId: lesson.id, type: "SELECT", question: "Which Telugu word contains this vowel sound?", order: 5 },
              { lessonId: lesson.id, type: "SELECT", question: "Is this a short or long vowel in Telugu?", order: 6 },
              { lessonId: lesson.id, type: "SELECT", question: "What is the name of this Telugu vowel?", order: 7 },
              { lessonId: lesson.id, type: "SELECT", question: "Which vowel comes after this in the Telugu alphabet?", order: 8 },
              { lessonId: lesson.id, type: "SELECT", question: "Select the word that begins with this Telugu vowel", order: 9 },
              { lessonId: lesson.id, type: "SELECT", question: "Which of these is NOT a Telugu vowel?", order: 10 }
            ]).returning();
          } 
          else if (lesson.title.toLowerCase().includes("consonant")) {
            // Telugu consonant-specific challenges
            let consonantType = "";
            if (lesson.title.toLowerCase().includes("velar")) {
              consonantType = "velar (క-వర్గం)";
            } else if (lesson.title.toLowerCase().includes("palatal")) {
              consonantType = "palatal (చ-వర్గం)";
            } else if (lesson.title.toLowerCase().includes("retroflex")) {
              consonantType = "retroflex (ట-వర్గం)";
            } else if (lesson.title.toLowerCase().includes("dental")) {
              consonantType = "dental (త-వర్గం)";
            } else if (lesson.title.toLowerCase().includes("labial")) {
              consonantType = "labial (ప-వర్గం)";
            } else {
              consonantType = "consonant";
            }
            
            newChallenges = await db.insert(schema.challenges).values([
              { lessonId: lesson.id, type: "SELECT", question: `Which is the Telugu ${consonantType} consonant shown here?`, order: 1 },
              { lessonId: lesson.id, type: "SELECT", question: `Match this Telugu ${consonantType} consonant to its sound`, order: 2 },
              { lessonId: lesson.id, type: "SELECT", question: `How is this Telugu ${consonantType} consonant pronounced?`, order: 3 },
              { lessonId: lesson.id, type: "SELECT", question: `Select the correct transliteration for this Telugu ${consonantType} consonant`, order: 4 },
              { lessonId: lesson.id, type: "SELECT", question: `Which Telugu word contains this ${consonantType} consonant?`, order: 5 },
              { lessonId: lesson.id, type: "SELECT", question: `Is this consonant aspirated or unaspirated in Telugu?`, order: 6 },
              { lessonId: lesson.id, type: "SELECT", question: `What is the name of this Telugu ${consonantType} consonant?`, order: 7 },
              { lessonId: lesson.id, type: "SELECT", question: `Which ${consonantType} consonant comes after this in the Telugu alphabet?`, order: 8 },
              { lessonId: lesson.id, type: "SELECT", question: `Select the word that begins with this Telugu ${consonantType} consonant`, order: 9 },
              { lessonId: lesson.id, type: "SELECT", question: `Which of these is NOT a Telugu ${consonantType} consonant?`, order: 10 }
            ]).returning();
          }
          else if (lesson.title.toLowerCase().includes("conversation") || lesson.title.toLowerCase().includes("phrase")) {
            // Telugu conversation/phrases challenges
            newChallenges = await db.insert(schema.challenges).values([
              { lessonId: lesson.id, type: "SELECT", question: "How do you say 'hello' in Telugu?", order: 1 },
              { lessonId: lesson.id, type: "SELECT", question: "What does 'నమస్కారం' mean in English?", order: 2 },
              { lessonId: lesson.id, type: "SELECT", question: "Choose the correct Telugu phrase for 'How are you?'", order: 3 },
              { lessonId: lesson.id, type: "SELECT", question: "What does 'మీరు ఎలా ఉన్నారు?' mean?", order: 4 },
              { lessonId: lesson.id, type: "SELECT", question: "Select the Telugu phrase for 'My name is...'", order: 5 },
              { lessonId: lesson.id, type: "SELECT", question: "What is the meaning of 'నాకు తెలుగు నేర్చుకోవాలనుంది'?", order: 6 },
              { lessonId: lesson.id, type: "SELECT", question: "Choose the correct phrase for 'Thank you' in Telugu", order: 7 },
              { lessonId: lesson.id, type: "SELECT", question: "What does 'ధన్యవాదాలు' mean?", order: 8 },
              { lessonId: lesson.id, type: "SELECT", question: "How do you say 'goodbye' in Telugu?", order: 9 },
              { lessonId: lesson.id, type: "SELECT", question: "What does 'శుభోదయం' mean in English?", order: 10 }
            ]).returning();
          }
          else if (lesson.title.toLowerCase().includes("script") || lesson.title.toLowerCase().includes("alphabet")) {
            // Telugu script/alphabet challenges
            newChallenges = await db.insert(schema.challenges).values([
              { lessonId: lesson.id, type: "SELECT", question: "What is the Telugu script derived from?", order: 1 },
              { lessonId: lesson.id, type: "SELECT", question: "How many vowels are in the Telugu alphabet?", order: 2 },
              { lessonId: lesson.id, type: "SELECT", question: "How many consonants are in the Telugu alphabet?", order: 3 },
              { lessonId: lesson.id, type: "SELECT", question: "What is special about Telugu script compared to other Indian scripts?", order: 4 },
              { lessonId: lesson.id, type: "SELECT", question: "Which of these is a unique feature of Telugu script?", order: 5 },
              { lessonId: lesson.id, type: "SELECT", question: "How are vowel signs attached to consonants in Telugu?", order: 6 },
              { lessonId: lesson.id, type: "SELECT", question: "What is a 'gunintam' in Telugu script?", order: 7 },
              { lessonId: lesson.id, type: "SELECT", question: "Which direction is Telugu written in?", order: 8 },
              { lessonId: lesson.id, type: "SELECT", question: "In what century did the modern Telugu script develop?", order: 9 },
              { lessonId: lesson.id, type: "SELECT", question: "What do Telugu speakers call their language and script?", order: 10 }
            ]).returning();
          }
          else if (lesson.title.toLowerCase().includes("number") || lesson.title.toLowerCase().includes("counting")) {
            // Telugu numbers challenges
            newChallenges = await db.insert(schema.challenges).values([
              { lessonId: lesson.id, type: "SELECT", question: "What is the Telugu word for 'one'?", order: 1 },
              { lessonId: lesson.id, type: "SELECT", question: "Select the correct number for 'రెండు'", order: 2 },
              { lessonId: lesson.id, type: "SELECT", question: "How do you say 'five' in Telugu?", order: 3 },
              { lessonId: lesson.id, type: "SELECT", question: "What does 'పది' mean?", order: 4 },
              { lessonId: lesson.id, type: "SELECT", question: "Which is the Telugu word for 'twenty'?", order: 5 },
              { lessonId: lesson.id, type: "SELECT", question: "Select the correct number for 'నూరు'", order: 6 },
              { lessonId: lesson.id, type: "SELECT", question: "How do you say '50' in Telugu?", order: 7 },
              { lessonId: lesson.id, type: "SELECT", question: "What is the Telugu word for 'hundred'?", order: 8 },
              { lessonId: lesson.id, type: "SELECT", question: "How do you express 'first' (ordinal) in Telugu?", order: 9 },
              { lessonId: lesson.id, type: "SELECT", question: "What is special about the number system in Telugu?", order: 10 }
            ]).returning();
          }
          else {
            // Default meaningful Telugu challenges for any other Telugu lesson
            newChallenges = await db.insert(schema.challenges).values([
              { lessonId: lesson.id, type: "SELECT", question: "Which Telugu letter makes this sound?", order: 1 },
              { lessonId: lesson.id, type: "SELECT", question: "How do you write this Telugu character correctly?", order: 2 },
              { lessonId: lesson.id, type: "SELECT", question: "Match the Telugu letter to its sound", order: 3 },
              { lessonId: lesson.id, type: "SELECT", question: "What is the meaning of this Telugu word?", order: 4 },
              { lessonId: lesson.id, type: "SELECT", question: "Select the correct Telugu translation", order: 5 },
              { lessonId: lesson.id, type: "SELECT", question: "How would you say this phrase in Telugu?", order: 6 },
              { lessonId: lesson.id, type: "SELECT", question: "Which Telugu word best completes this sentence?", order: 7 },
              { lessonId: lesson.id, type: "SELECT", question: "What is the grammatical function of this Telugu suffix?", order: 8 },
              { lessonId: lesson.id, type: "SELECT", question: "Choose the correct form of this Telugu verb", order: 9 },
              { lessonId: lesson.id, type: "SELECT", question: "Which Telugu dialect is this word from?", order: 10 }
            ]).returning();
          }
        } else if (isKannadaLesson) {
          // Instead of generic challenges, create specific meaningful Kannada challenges based on lesson title
          console.log(`Adding specific Kannada challenges for lesson ${lesson.id} (${lesson.title})`);
          
          if (lesson.title.toLowerCase().includes("vowel")) {
            // Kannada vowel-specific challenges
            newChallenges = await db.insert(schema.challenges).values([
              { lessonId: lesson.id, type: "SELECT", question: "Which is the Kannada vowel shown here?", order: 1 },
              { lessonId: lesson.id, type: "SELECT", question: "Match the Kannada vowel to its sound", order: 2 },
              { lessonId: lesson.id, type: "SELECT", question: "How is this Kannada vowel pronounced?", order: 3 },
              { lessonId: lesson.id, type: "SELECT", question: "Select the correct transliteration for this Kannada vowel", order: 4 },
              { lessonId: lesson.id, type: "SELECT", question: "Which Kannada word contains this vowel sound?", order: 5 },
              { lessonId: lesson.id, type: "SELECT", question: "Is this a short or long vowel in Kannada?", order: 6 },
              { lessonId: lesson.id, type: "SELECT", question: "What is the name of this Kannada vowel?", order: 7 },
              { lessonId: lesson.id, type: "SELECT", question: "Which vowel comes after this in the Kannada alphabet?", order: 8 },
              { lessonId: lesson.id, type: "SELECT", question: "Select the word that begins with this Kannada vowel", order: 9 },
              { lessonId: lesson.id, type: "SELECT", question: "Which of these is NOT a Kannada vowel?", order: 10 }
            ]).returning();
          } 
          else if (lesson.title.toLowerCase().includes("consonant")) {
            // Kannada consonant-specific challenges
            let consonantType = "";
            if (lesson.title.toLowerCase().includes("velar")) {
              consonantType = "velar (ಕವರ್ಗ)";
            } else if (lesson.title.toLowerCase().includes("palatal")) {
              consonantType = "palatal (ಚವರ್ಗ)";
            } else if (lesson.title.toLowerCase().includes("retroflex")) {
              consonantType = "retroflex (ಟವರ್ಗ)";
            } else if (lesson.title.toLowerCase().includes("dental")) {
              consonantType = "dental (ತವರ್ಗ)";
            } else if (lesson.title.toLowerCase().includes("labial")) {
              consonantType = "labial (ಪವರ್ಗ)";
            } else {
              consonantType = "consonant";
            }
            
            newChallenges = await db.insert(schema.challenges).values([
              { lessonId: lesson.id, type: "SELECT", question: `Which is the Kannada ${consonantType} consonant shown here?`, order: 1 },
              { lessonId: lesson.id, type: "SELECT", question: `Match this Kannada ${consonantType} consonant to its sound`, order: 2 },
              { lessonId: lesson.id, type: "SELECT", question: `How is this Kannada ${consonantType} consonant pronounced?`, order: 3 },
              { lessonId: lesson.id, type: "SELECT", question: `Select the correct transliteration for this Kannada ${consonantType} consonant`, order: 4 },
              { lessonId: lesson.id, type: "SELECT", question: `Which Kannada word contains this ${consonantType} consonant?`, order: 5 },
              { lessonId: lesson.id, type: "SELECT", question: `Is this consonant aspirated or unaspirated in Kannada?`, order: 6 },
              { lessonId: lesson.id, type: "SELECT", question: `What is the name of this Kannada ${consonantType} consonant?`, order: 7 },
              { lessonId: lesson.id, type: "SELECT", question: `Which ${consonantType} consonant comes after this in the Kannada alphabet?`, order: 8 },
              { lessonId: lesson.id, type: "SELECT", question: `Select the word that begins with this Kannada ${consonantType} consonant`, order: 9 },
              { lessonId: lesson.id, type: "SELECT", question: `Which of these is NOT a Kannada ${consonantType} consonant?`, order: 10 }
            ]).returning();
          }
          else if (lesson.title.toLowerCase().includes("conversation") || lesson.title.toLowerCase().includes("phrase")) {
            // Kannada conversation/phrases challenges
            newChallenges = await db.insert(schema.challenges).values([
              { lessonId: lesson.id, type: "SELECT", question: "How do you say 'hello' in Kannada?", order: 1 },
              { lessonId: lesson.id, type: "SELECT", question: "What does 'ನಮಸ್ಕಾರ' mean in English?", order: 2 },
              { lessonId: lesson.id, type: "SELECT", question: "Choose the correct Kannada phrase for 'How are you?'", order: 3 },
              { lessonId: lesson.id, type: "SELECT", question: "What does 'ಹೇಗಿದ್ದೀರಾ?' mean?", order: 4 },
              { lessonId: lesson.id, type: "SELECT", question: "Select the Kannada phrase for 'My name is...'", order: 5 },
              { lessonId: lesson.id, type: "SELECT", question: "What is the meaning of 'ನನಗೆ ಕನ್ನಡ ಕಲಿಯಬೇಕು'?", order: 6 },
              { lessonId: lesson.id, type: "SELECT", question: "Choose the correct phrase for 'Thank you' in Kannada", order: 7 },
              { lessonId: lesson.id, type: "SELECT", question: "What does 'ಧನ್ಯವಾದಗಳು' mean?", order: 8 },
              { lessonId: lesson.id, type: "SELECT", question: "How do you say 'goodbye' in Kannada?", order: 9 },
              { lessonId: lesson.id, type: "SELECT", question: "What does 'ಶುಭ ದಿನ' mean in English?", order: 10 }
            ]).returning();
          }
          else if (lesson.title.toLowerCase().includes("script") || lesson.title.toLowerCase().includes("alphabet")) {
            // Kannada script/alphabet challenges
            newChallenges = await db.insert(schema.challenges).values([
              { lessonId: lesson.id, type: "SELECT", question: "What is the Kannada script derived from?", order: 1 },
              { lessonId: lesson.id, type: "SELECT", question: "How many vowels are in the Kannada alphabet?", order: 2 },
              { lessonId: lesson.id, type: "SELECT", question: "How many consonants are in the Kannada alphabet?", order: 3 },
              { lessonId: lesson.id, type: "SELECT", question: "What is special about Kannada script compared to other Indian scripts?", order: 4 },
              { lessonId: lesson.id, type: "SELECT", question: "Which of these is a unique feature of Kannada script?", order: 5 },
              { lessonId: lesson.id, type: "SELECT", question: "How are vowel signs attached to consonants in Kannada?", order: 6 },
              { lessonId: lesson.id, type: "SELECT", question: "What is a 'vattakshara' in Kannada script?", order: 7 },
              { lessonId: lesson.id, type: "SELECT", question: "Which direction is Kannada written in?", order: 8 },
              { lessonId: lesson.id, type: "SELECT", question: "In what century did the modern Kannada script develop?", order: 9 },
              { lessonId: lesson.id, type: "SELECT", question: "What do Kannada speakers call their language and script?", order: 10 }
            ]).returning();
          }
          else if (lesson.title.toLowerCase().includes("number") || lesson.title.toLowerCase().includes("counting")) {
            // Kannada numbers challenges
            newChallenges = await db.insert(schema.challenges).values([
              { lessonId: lesson.id, type: "SELECT", question: "What is the Kannada word for 'one'?", order: 1 },
              { lessonId: lesson.id, type: "SELECT", question: "Select the correct number for 'ಎರಡು'", order: 2 },
              { lessonId: lesson.id, type: "SELECT", question: "How do you say 'five' in Kannada?", order: 3 },
              { lessonId: lesson.id, type: "SELECT", question: "What does 'ಹತ್ತು' mean?", order: 4 },
              { lessonId: lesson.id, type: "SELECT", question: "Which is the Kannada word for 'twenty'?", order: 5 },
              { lessonId: lesson.id, type: "SELECT", question: "Select the correct number for 'ನೂರು'", order: 6 },
              { lessonId: lesson.id, type: "SELECT", question: "How do you say '50' in Kannada?", order: 7 },
              { lessonId: lesson.id, type: "SELECT", question: "What is the Kannada word for 'hundred'?", order: 8 },
              { lessonId: lesson.id, type: "SELECT", question: "How do you express 'first' (ordinal) in Kannada?", order: 9 },
              { lessonId: lesson.id, type: "SELECT", question: "What is special about the number system in Kannada?", order: 10 }
            ]).returning();
          }
          else {
            // Default meaningful Kannada challenges for any other Kannada lesson
            newChallenges = await db.insert(schema.challenges).values([
              { lessonId: lesson.id, type: "SELECT", question: "Which Kannada letter makes this sound?", order: 1 },
              { lessonId: lesson.id, type: "SELECT", question: "How do you write this Kannada character correctly?", order: 2 },
              { lessonId: lesson.id, type: "SELECT", question: "Match the Kannada letter to its sound", order: 3 },
              { lessonId: lesson.id, type: "SELECT", question: "What is the meaning of this Kannada word?", order: 4 },
              { lessonId: lesson.id, type: "SELECT", question: "Select the correct Kannada translation", order: 5 },
              { lessonId: lesson.id, type: "SELECT", question: "How would you say this phrase in Kannada?", order: 6 },
              { lessonId: lesson.id, type: "SELECT", question: "Which Kannada word best completes this sentence?", order: 7 },
              { lessonId: lesson.id, type: "SELECT", question: "What is the grammatical function of this Kannada suffix?", order: 8 },
              { lessonId: lesson.id, type: "SELECT", question: "Choose the correct form of this Kannada verb", order: 9 },
              { lessonId: lesson.id, type: "SELECT", question: "Which Kannada dialect is this word from?", order: 10 }
            ]).returning();
          }
        } else {
          console.log(`Unable to determine language for lesson ${lesson.id}, defaulting to generic challenges`);
          newChallenges = await db.insert(schema.challenges).values([
            { lessonId: lesson.id, type: "SELECT", question: "Select the correct character", order: 1 },
            { lessonId: lesson.id, type: "SELECT", question: "How do you write this sound?", order: 2 },
            { lessonId: lesson.id, type: "SELECT", question: "What is the correct pronunciation?", order: 3 },
            { lessonId: lesson.id, type: "SELECT", question: "Which of these is the correct character?", order: 4 },
            { lessonId: lesson.id, type: "SELECT", question: "Match the character to its pronunciation", order: 5 },
            { lessonId: lesson.id, type: "SELECT", question: "What sound does this character make?", order: 6 },
            { lessonId: lesson.id, type: "SELECT", question: "Which character makes this sound?", order: 7 },
            { lessonId: lesson.id, type: "SELECT", question: "Identify the correct character", order: 8 },
            { lessonId: lesson.id, type: "SELECT", question: "What is this character called?", order: 9 },
            { lessonId: lesson.id, type: "SELECT", question: "Choose the correct character for this word", order: 10 }
          ]).returning();
        }
        
        // Generate options for the new challenges
        const newOptions = [];
        for (const challenge of newChallenges) {
          if (isTeluguLesson) {
            const options = createTeluguOptions(challenge.id, challenge.question);
            newOptions.push(...options);
          } else if (isKannadaLesson) {
            const options = createKannadaOptions(challenge.id, challenge.question);
            newOptions.push(...options);
          } else {
            // Use a mix of Telugu and Kannada options for unknown language lessons
            const useTeluguOptions = Math.random() > 0.5;
            const options = useTeluguOptions ? 
              createTeluguOptions(challenge.id, challenge.question) : 
              createKannadaOptions(challenge.id, challenge.question);
            newOptions.push(...options);
          }
        }
        
        // Insert the options
        if (newOptions.length > 0) {
          console.log(`Adding ${newOptions.length} options for lesson ${lesson.id}`);
          await db.insert(schema.challengeOptions).values(newOptions);
        }
      }
    }

    console.log("✅ Database seeding completed");
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    throw new Error("Failed to seed the database");
  }
};

main().catch((err) => {
  console.error("Failed to seed database:", err);
  process.exit(1);
});
