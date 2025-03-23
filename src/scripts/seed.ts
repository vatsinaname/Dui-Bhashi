import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
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
      }
    ]).returning();

    const lessons = await db.insert(schema.lessons).values([
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
      { unitId: units[2].id, title: "Short Vowels (ಹ್ರಸ್ವ ಸ್ವರಗಳು)", order: 1 },
      { unitId: units[2].id, title: "Long Vowels (ದೀರ್ಘ ಸ್ವರಗಳು)", order: 2 },
      { unitId: units[2].id, title: "Compound Vowels (ಸಂಯುಕ್ತ ಸ್ವರಗಳು)", order: 3 },
      { unitId: units[2].id, title: "Velar Consonants (ಕವರ್ಗ)", order: 4 },
      { unitId: units[2].id, title: "Palatal Consonants (ಚವರ್ಗ)", order: 5 },
      { unitId: units[2].id, title: "Retroflex Consonants (ಟವರ್ಗ)", order: 6 },
      { unitId: units[2].id, title: "Dental Consonants (ತವರ್ಗ)", order: 7 },
      { unitId: units[2].id, title: "Labial Consonants (ಪವರ್ಗ)", order: 8 },
      { unitId: units[2].id, title: "Semivowels (ಅಂತಃಸ್ಥಗಳು)", order: 9 },
      { unitId: units[2].id, title: "Sibilants & Aspirate (ಊಷ್ಮಾಕ್ಷರಗಳು)", order: 10 }
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
      { lessonId: lessons[18].id, type: "SELECT", question: "Which letter makes an 'r' sound in Kannada?", order: 10 }
    ]).returning();

    // Helper function to generate options for Telugu challenges
    const createTeluguOptions = (challengeId: number, question: string) => {
      // Extract what we're asking about from the question
      const isAboutSound = question.toLowerCase().includes("sound");
      const isAboutLetter = question.toLowerCase().includes("letter");
      const isAboutVowels = question.toLowerCase().includes("vowel");
      const isAboutConsonants = question.toLowerCase().includes("consonant");
      
      // Telugu characters for options
      const teluguVowels = ["అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ", "ఋ", "ౠ", "ఎ", "ఏ", "ఐ", "ఒ", "ఓ", "ఔ"];
      const teluguConsonants = ["క", "ఖ", "గ", "ఘ", "ఙ", "చ", "ఛ", "జ", "ఝ", "ఞ", "ట", "ఠ", "డ", "ఢ", "ణ", "త", "థ", "ద", "ధ", "న", "ప", "ఫ", "బ", "భ", "మ", "య", "ర", "ల", "వ", "శ", "ష", "స", "హ", "ళ", "క్ష", "ఱ"];
      
      let correctOption = "";
      let incorrectOptions = [];
      
      // For letter questions, use actual Telugu letters as options
      if (isAboutLetter && question.includes("'a'")) {
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
        
        // Determine if it's Telugu or Kannada based on the title
        const isTeluguLesson = lesson.title.includes("Telugu") || (!lesson.title.includes("Kannada") && lesson.id < 150);
        
        let newChallenges;
        
        if (lesson.id === 94 || (lesson.title.toLowerCase().includes("sibilant") && lesson.title.toLowerCase().includes("kannada"))) {
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
        } else if (lesson.id === 124 || (lesson.title.toLowerCase().includes("semivowel") && lesson.title.toLowerCase().includes("telugu"))) {
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
          // Generic Telugu challenges for any other Telugu lessons
          console.log(`Adding generic Telugu challenges for lesson ${lesson.id} (${lesson.title})`);
          newChallenges = await db.insert(schema.challenges).values([
            { lessonId: lesson.id, type: "SELECT", question: "Which Telugu character represents this sound?", order: 1 },
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
        } else {
          // Generic Kannada challenges for any other Kannada lessons
          console.log(`Adding generic Kannada challenges for lesson ${lesson.id} (${lesson.title})`);
          newChallenges = await db.insert(schema.challenges).values([
            { lessonId: lesson.id, type: "SELECT", question: "Which Kannada character represents this sound?", order: 1 },
            { lessonId: lesson.id, type: "SELECT", question: "How do you write this sound in Kannada?", order: 2 },
            { lessonId: lesson.id, type: "SELECT", question: "What is the correct pronunciation of this Kannada character?", order: 3 },
            { lessonId: lesson.id, type: "SELECT", question: "Which of these is a Kannada character?", order: 4 },
            { lessonId: lesson.id, type: "SELECT", question: "Match the Kannada character to its pronunciation", order: 5 },
            { lessonId: lesson.id, type: "SELECT", question: "What sound does this Kannada character make?", order: 6 },
            { lessonId: lesson.id, type: "SELECT", question: "Which Kannada character makes this sound?", order: 7 },
            { lessonId: lesson.id, type: "SELECT", question: "Identify the correct Kannada character", order: 8 },
            { lessonId: lesson.id, type: "SELECT", question: "What is this Kannada character called?", order: 9 },
            { lessonId: lesson.id, type: "SELECT", question: "Choose the correct Kannada character for this word", order: 10 }
          ]).returning();
        }
        
        // Generate options for the new challenges
        const newOptions = [];
        for (const challenge of newChallenges) {
          if (isTeluguLesson) {
            const options = createTeluguOptions(challenge.id, challenge.question);
            newOptions.push(...options);
          } else {
            const options = createKannadaOptions(challenge.id, challenge.question);
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
