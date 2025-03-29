import { 
  db, 
  schema, 
  eq, 
  getRandomItems, 
  createLessonCourseMap,
  findChallengesWithMissingOptions,
  addOptionsToDB
} from './seed-common';

/**
 * Helper function to generate options for Kannada challenges
 */
export function createKannadaOptions(challengeId: number, question: string) {
  const isAboutSound = question.toLowerCase().includes("sound");
  const isAboutLetter = question.toLowerCase().includes("letter");
  const isAboutWord = question.toLowerCase().includes("word") || question.toLowerCase().includes("mean");
  const isAboutVerb = question.toLowerCase().includes("verb");
  const isAboutGrammar = question.toLowerCase().includes("grammar") || question.toLowerCase().includes("tense") || question.toLowerCase().includes("sentence");
  
  // Kannada characters for options
  const kannadaVowels = ["ಅ", "ಆ", "ಇ", "ಈ", "ಉ", "ಊ", "ಋ", "ೠ", "ಎ", "ಏ", "ಐ", "ಒ", "ಓ", "ಔ"];
  const kannadaConsonants = ["ಕ", "ಖ", "ಗ", "ಘ", "ಙ", "ಚ", "ಛ", "ಜ", "ಝ", "ಞ", "ಟ", "ಠ", "ಡ", "ಢ", "ಣ", "ತ", "ಥ", "ದ", "ಧ", "ನ", "ಪ", "ಫ", "ಬ", "ಭ", "ಮ", "ಯ", "ರ", "ಲ", "ವ", "ಶ", "ಷ", "ಸ", "ಹ", "ಳ", "ಕ್ಷ", "ಱ"];
  
  // Common Kannada words for vocabulary options
  const kannadaNouns = ["ಪುಸ್ತಕ (pustaka) - book", "ಮನೆ (mane) - house", "ಕೆಲಸ (kelasa) - work", "ನೀರು (neeru) - water", "ಆಹಾರ (aahara) - food"];
  const kannadaVerbs = ["ಮಾಡು (maadu) - to do", "ತಿನ್ನು (tinnu) - to eat", "ಹೋಗು (hogu) - to go", "ಓದು (odu) - to read", "ಬರೆ (bare) - to write"];
  const kannadaColors = ["ಕೆಂಪು (kempu) - red", "ನೀಲಿ (neeli) - blue", "ಹಸಿರು (hasiru) - green", "ಹಳದಿ (haladi) - yellow", "ಕಪ್ಪು (kappu) - black"];
  const kannadaNumbers = ["ಒಂದು (ondu) - one", "ಎರಡು (eradu) - two", "ಮೂರು (mooru) - three", "ನಾಲ್ಕು (naalku) - four", "ಐದು (aidu) - five"];
  const kannadaFamilyTerms = ["ಅಮ್ಮ (amma) - mother", "ಅಪ್ಪ (appa) - father", "ಅಕ್ಕ (akka) - elder sister", "ಅಣ್ಣ (anna) - elder brother", "ತಮ್ಮ (tamma) - younger brother"];
  
  // Grammar-related options
  const kannadaPronouns = ["ನಾನು (naanu) - I", "ನೀನು (neenu) - you", "ಅವನು (avanu) - he", "ಅವಳು (avalu) - she", "ಅವರು (avaru) - they"];
  const kannadaTenses = ["ವರ್ತಮಾನ (vartamaana) - present tense", "ಭೂತಕಾಲ (bhutakaala) - past tense", "ಭವಿಷ್ಯತ್ಕಾಲ (bhavishyatkaala) - future tense"];
  
  let correctOption = "";
  let incorrectOptions = [];
  
  // Handle specific cases based on the question
  if (isAboutLetter && question.toLowerCase().includes("long 'aa'")) {
    // Special case for "Which is the Kannada letter for long 'aa'?" question
    console.log(`Creating Kannada options for long 'aa' question: "${question}"`);
    correctOption = "ಆ";
    incorrectOptions = ["ಅ", "ಇ", "ಈ"];
  } 
  else if (isAboutLetter && question.toLowerCase().includes("short 'a'")) {
    correctOption = "ಅ";
    incorrectOptions = [kannadaVowels[1], kannadaVowels[2], kannadaVowels[3]];
  }
  else if (isAboutLetter && question.toLowerCase().includes("short 'i'")) {
    correctOption = "ಇ";
    incorrectOptions = ["ಅ", "ಈ", "ಉ"];
  }
  else if (isAboutLetter && question.toLowerCase().includes("short 'u'")) {
    correctOption = "ಉ";
    incorrectOptions = ["ಅ", "ಇ", "ಊ"];
  }
  else if (isAboutLetter && question.toLowerCase().includes("short 'e'")) {
    correctOption = "ಎ";
    incorrectOptions = ["ಏ", "ಅ", "ಐ"];
  }
  else if (isAboutLetter && question.toLowerCase().includes("short 'o'")) {
    correctOption = "ಒ";
    incorrectOptions = ["ಓ", "ಅ", "ಔ"];
  }
  else if (isAboutLetter && question.toLowerCase().includes("long 'ee'")) {
    correctOption = "ಈ";
    incorrectOptions = ["ಇ", "ಉ", "ಊ"];
  }
  else if (isAboutLetter && question.toLowerCase().includes("long 'oo'")) {
    correctOption = "ಊ";
    incorrectOptions = ["ಉ", "ಇ", "ಈ"];
  }
  else if (isAboutLetter && question.toLowerCase().includes("'ai'")) {
    correctOption = "ಐ";
    incorrectOptions = ["ಅ", "ಇ", "ಎ"];
  }
  else if (isAboutLetter && question.toLowerCase().includes("'au'")) {
    correctOption = "ಔ";
    incorrectOptions = ["ಅ", "ಉ", "ಒ"];
  }
  else if (isAboutSound && question.includes("ಅ")) {
    correctOption = "Short 'a' as in 'about'";
    incorrectOptions = ["Long 'aa' as in 'father'", "Short 'i' as in 'bit'", "Short 'u' as in 'put'"];
  }
  else if (isAboutSound && question.includes("ಇ")) {
    correctOption = "Short 'i' as in 'bit'";
    incorrectOptions = ["Short 'a' as in 'about'", "Long 'ee' as in 'meet'", "Short 'e' as in 'bed'"];
  }
  else if (isAboutSound && question.includes("ಉ")) {
    correctOption = "Short 'u' as in 'put'";
    incorrectOptions = ["Short 'a' as in 'about'", "Long 'oo' as in 'boot'", "Short 'o' as in 'pot'"];
  }
  else if (isAboutSound && question.includes("ಎ")) {
    correctOption = "Short 'e' as in 'bed'";
    incorrectOptions = ["Long 'ae' as in 'made'", "Short 'i' as in 'bit'", "Short 'a' as in 'about'"];
  }
  else if (isAboutSound && question.includes("ಒ")) {
    correctOption = "Short 'o' as in 'pot'";
    incorrectOptions = ["Long 'o' as in 'boat'", "Short 'u' as in 'put'", "Short 'a' as in 'about'"];
  }
  else if (isAboutSound && question.includes("ಈ")) {
    correctOption = "Long 'ee' as in 'meet'";
    incorrectOptions = ["Short 'i' as in 'bit'", "Short 'e' as in 'bed'", "Long 'ae' as in 'made'"];
  }
  else if (isAboutSound && question.includes("ಊ")) {
    correctOption = "Long 'oo' as in 'boot'";
    incorrectOptions = ["Short 'u' as in 'put'", "Short 'o' as in 'pot'", "Long 'o' as in 'boat'"];
  }
  else if (isAboutSound && question.includes("ಏ")) {
    correctOption = "Long 'ae' as in 'made'";
    incorrectOptions = ["Short 'e' as in 'bed'", "Short 'i' as in 'bit'", "Long 'ee' as in 'meet'"];
  }
  else if (isAboutSound && question.includes("ಓ")) {
    correctOption = "Long 'o' as in 'boat'";
    incorrectOptions = ["Short 'o' as in 'pot'", "Short 'u' as in 'put'", "Long 'oo' as in 'boot'"];
  }
  else if (isAboutSound && question.includes("ಐ")) {
    correctOption = "Diphthong 'ai' as in 'aisle'";
    incorrectOptions = ["Short 'i' as in 'bit'", "Long 'ae' as in 'made'", "Long 'ee' as in 'meet'"];
  }
  else if (isAboutSound && question.includes("ಔ")) {
    correctOption = "Diphthong 'au' as in 'house'";
    incorrectOptions = ["Short 'o' as in 'pot'", "Long 'o' as in 'boat'", "Long 'oo' as in 'boot'"];
  }
  else if (question.toLowerCase().includes("which is longer: 'ಅ' or 'ಆ'")) {
    correctOption = "ಆ (long 'aa')";
    incorrectOptions = ["ಅ (short 'a')", "Both are same length", "Neither is longer"];
  }
  else if (question.toLowerCase().includes("which is longer: 'ಇ' or 'ಈ'")) {
    correctOption = "ಈ (long 'ee')";
    incorrectOptions = ["ಇ (short 'i')", "Both are same length", "Neither is longer"];
  }
  else if (question.toLowerCase().includes("which is the combination of 'ಅ' and 'ಇ'")) {
    correctOption = "ಐ";
    incorrectOptions = ["ಔ", "ಏ", "ಓ"];
  }
  else if (question.toLowerCase().includes("which is the combination of 'ಅ' and 'ಉ'")) {
    correctOption = "ಔ";
    incorrectOptions = ["ಐ", "ಏ", "ಓ"];
  }
  else if (question.toLowerCase().includes("which is the combination of 'ಅ' and 'ಎ'")) {
    correctOption = "ಏ";
    incorrectOptions = ["ಐ", "ಔ", "ಓ"];
  }
  else if (question.toLowerCase().includes("which is the combination of 'ಅ' and 'ಒ'")) {
    correctOption = "ಓ";
    incorrectOptions = ["ಐ", "ಔ", "ಏ"];
  }
  else if (question.toLowerCase().includes("what is 'ಐ' made of")) {
    correctOption = "ಅ + ಇ";
    incorrectOptions = ["ಅ + ಉ", "ಅ + ಎ", "ಅ + ಒ"];
  }
  else if (question.toLowerCase().includes("what is 'ಔ' made of")) {
    correctOption = "ಅ + ಉ";
    incorrectOptions = ["ಅ + ಇ", "ಅ + ಎ", "ಅ + ಒ"];
  }
  else if (isAboutSound && question.includes("ಆ")) {
    correctOption = "Long 'aa'";
    incorrectOptions = ["Short 'a'", "Short 'i'", "Long 'ee'"];
  }
  // Vocabulary-related options
  else if (isAboutWord && question.toLowerCase().includes("book")) {
    correctOption = "ಪುಸ್ತಕ (pustaka)";
    incorrectOptions = ["ಮನೆ (mane) - house", "ಕೆಲಸ (kelasa) - work", "ನೀರು (neeru) - water"];
  }
  else if (isAboutVerb && question.toLowerCase().includes("eat")) {
    correctOption = "ತಿನ್ನು (tinnu)";
    incorrectOptions = ["ಮಾಡು (maadu) - to do", "ಹೋಗು (hogu) - to go", "ಓದು (odu) - to read"];
  }
  else if (isAboutWord && question.toLowerCase().includes("red")) {
    correctOption = "ಕೆಂಪು (kempu)";
    incorrectOptions = ["ನೀಲಿ (neeli) - blue", "ಹಸಿರು (hasiru) - green", "ಹಳದಿ (haladi) - yellow"];
  }
  else if (isAboutWord && question.toLowerCase().includes("mother")) {
    correctOption = "ಅಮ್ಮ (amma)";
    incorrectOptions = ["ಅಪ್ಪ (appa) - father", "ಅಕ್ಕ (akka) - elder sister", "ಅಣ್ಣ (anna) - elder brother"];
  }
  // Grammar-related options
  else if (question.toLowerCase().includes("word order")) {
    correctOption = "Subject-Object-Verb (SOV)";
    incorrectOptions = ["Subject-Verb-Object (SVO)", "Verb-Subject-Object (VSO)", "Object-Subject-Verb (OSV)"];
  } 
  else if (question.toLowerCase().includes("this is a book")) {
    correctOption = "ಇದು ಒಂದು ಪುಸ್ತಕ (idu ondu pustaka)";
    incorrectOptions = ["ನಾನು ಪುಸ್ತಕ ಓದುತ್ತಿದ್ದೇನೆ (naanu pustaka oduttiddene) - I am reading a book", "ಪುಸ್ತಕ ಇಲ್ಲಿದೆ (pustaka illide) - The book is here", "ಇದು ನನ್ನ ಪುಸ್ತಕ (idu nanna pustaka) - This is my book"];
  }
  else if (question.toLowerCase().includes("i am eating food")) {
    correctOption = "ನಾನು ಊಟ ಮಾಡುತ್ತಿದ್ದೇನೆ (naanu oota maaduttiddene)";
    incorrectOptions = ["ನಾನು ಊಟ ಮಾಡಿದೆ (naanu oota madide) - I ate food", "ನಾನು ಊಟ ಮಾಡುತ್ತೇನೆ (naanu oota maaduttene) - I will eat food", "ನಾನು ಆಹಾರ ತಿನ್ನುತ್ತಿದ್ದೇನೆ (naanu aahara tinnuttiddene) - I am eating food"];
  }
  else if (question.toLowerCase().includes("questions formed")) {
    correctOption = "By adding question words like ಏನು (enu) or ಯಾಕೆ (yaake)";
    incorrectOptions = ["By changing the word order", "By adding a question mark at the end", "By changing the verb form"];
  }
  else if (question.toLowerCase().includes("what is this")) {
    correctOption = "ಇದು ಏನು (idu enu)";
    incorrectOptions = ["ಅದು ಏನು (adu enu) - What is that", "ಎಲ್ಲಿ (elli) - Where", "ಯಾಕೆ (yaake) - Why"];
  }
  else if (question.toLowerCase().includes("negative sentence")) {
    correctOption = "By adding the negative suffix -ಇಲ್ಲ (-illa)";
    incorrectOptions = ["By adding the prefix ಅಲ್ಲ (alla)", "By inverting the subject and object", "By changing the verb to past tense"];
  }
  else if (question.toLowerCase().includes("i don't know")) {
    correctOption = "ನನಗೆ ಗೊತ್ತಿಲ್ಲ (nanage gottilla)";
    incorrectOptions = ["ನಾನು ಮರೆತುಬಿಟ್ಟೆ (naanu maretubiṭṭe) - I forgot", "ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ (nanage arthavaagalilla) - I didn't understand", "ನಾನು ಹೇಳಲಾರೆ (naanu helaalaare) - I can't tell"];
  }
  else if (isAboutGrammar && question.toLowerCase().includes("present tense")) {
    correctOption = "ವರ್ತಮಾನ (vartamaana)";
    incorrectOptions = ["ಭೂತಕಾಲ (bhutakaala) - past tense", "ಭವಿಷ್ಯತ್ಕಾಲ (bhavishyatkaala) - future tense", "ಕ್ರಿಯಾಪದ (kriyaapada) - verb"];
  }
  else if (isAboutGrammar && question.toLowerCase().includes("i am")) {
    correctOption = "ನಾನು ಇದ್ದೇನೆ (naanu iddene)";
    incorrectOptions = ["ನೀನು ಇದ್ದೀಯಾ (neenu iddeeya) - you are", "ಅವನು ಇದ್ದಾನೆ (avanu iddaane) - he is", "ಅವಳು ಇದ್ದಾಳೆ (avalu iddaale) - she is"];
  }
  // Common Nouns
  else if (question.toLowerCase().includes("word for 'house'")) {
    correctOption = "ಮನೆ (mane)";
    incorrectOptions = ["ಪುಸ್ತಕ (pustaka) - book", "ನೀರು (neeru) - water", "ಆಹಾರ (aahara) - food"];
  }
  else if (question.toLowerCase().includes("word for 'water'")) {
    correctOption = "ನೀರು (neeru)";
    incorrectOptions = ["ಪುಸ್ತಕ (pustaka) - book", "ಮನೆ (mane) - house", "ಆಹಾರ (aahara) - food"];
  }
  else if (question.toLowerCase().includes("word for 'food'")) {
    correctOption = "ಆಹಾರ (aahara)";
    incorrectOptions = ["ಪುಸ್ತಕ (pustaka) - book", "ಮನೆ (mane) - house", "ನೀರು (neeru) - water"];
  }
  else if (question.toLowerCase().includes("word for 'work'")) {
    correctOption = "ಕೆಲಸ (kelasa)";
    incorrectOptions = ["ಪುಸ್ತಕ (pustaka) - book", "ಮನೆ (mane) - house", "ನೀರು (neeru) - water"];
  }
  else if (question.toLowerCase().includes("what does 'ಪುಸ್ತಕ' mean")) {
    correctOption = "Book";
    incorrectOptions = ["House", "Water", "Food"];
  }
  else if (question.toLowerCase().includes("what does 'ಮನೆ' mean")) {
    correctOption = "House";
    incorrectOptions = ["Book", "Water", "Food"];
  }
  else if (question.toLowerCase().includes("what does 'ನೀರು' mean")) {
    correctOption = "Water";
    incorrectOptions = ["Book", "House", "Food"];
  }
  else if (question.toLowerCase().includes("what does 'ಆಹಾರ' mean")) {
    correctOption = "Food";
    incorrectOptions = ["Book", "House", "Water"];
  }
  else if (question.toLowerCase().includes("what does 'ಕೆಲಸ' mean")) {
    correctOption = "Work";
    incorrectOptions = ["Book", "House", "Water"];
  }
  // Essential Verbs
  else if (question.toLowerCase().includes("verb for 'to go'")) {
    correctOption = "ಹೋಗು (hogu)";
    incorrectOptions = ["ತಿನ್ನು (tinnu) - to eat", "ಓದು (odu) - to read", "ಬರೆ (bare) - to write"];
  }
  else if (question.toLowerCase().includes("verb for 'to read'")) {
    correctOption = "ಓದು (odu)";
    incorrectOptions = ["ತಿನ್ನು (tinnu) - to eat", "ಹೋಗು (hogu) - to go", "ಬರೆ (bare) - to write"];
  }
  else if (question.toLowerCase().includes("verb for 'to write'")) {
    correctOption = "ಬರೆ (bare)";
    incorrectOptions = ["ತಿನ್ನು (tinnu) - to eat", "ಹೋಗು (hogu) - to go", "ಓದು (odu) - to read"];
  }
  else if (question.toLowerCase().includes("verb for 'to do'")) {
    correctOption = "ಮಾಡು (maadu)";
    incorrectOptions = ["ತಿನ್ನು (tinnu) - to eat", "ಹೋಗು (hogu) - to go", "ಓದು (odu) - to read"];
  }
  else if (question.toLowerCase().includes("what does 'ತಿನ್ನು' mean")) {
    correctOption = "To eat";
    incorrectOptions = ["To go", "To read", "To write"];
  }
  else if (question.toLowerCase().includes("what does 'ಹೋಗು' mean")) {
    correctOption = "To go";
    incorrectOptions = ["To eat", "To read", "To write"];
  }
  else if (question.toLowerCase().includes("what does 'ಓದು' mean")) {
    correctOption = "To read";
    incorrectOptions = ["To eat", "To go", "To write"];
  }
  else if (question.toLowerCase().includes("what does 'ಬರೆ' mean")) {
    correctOption = "To write";
    incorrectOptions = ["To eat", "To go", "To read"];
  }
  else if (question.toLowerCase().includes("what does 'ಮಾಡು' mean")) {
    correctOption = "To do";
    incorrectOptions = ["To eat", "To go", "To read"];
  }
  // Colors and Numbers
  else if (question.toLowerCase().includes("word for 'red'")) {
    correctOption = "ಕೆಂಪು (kempu)";
    incorrectOptions = ["ನೀಲಿ (neeli) - blue", "ಹಸಿರು (hasiru) - green", "ಹಳದಿ (haladi) - yellow"];
  }
  else if (question.toLowerCase().includes("word for 'blue'")) {
    correctOption = "ನೀಲಿ (neeli)";
    incorrectOptions = ["ಕೆಂಪು (kempu) - red", "ಹಸಿರು (hasiru) - green", "ಹಳದಿ (haladi) - yellow"];
  }
  else if (question.toLowerCase().includes("word for 'one'")) {
    correctOption = "ಒಂದು (ondu)";
    incorrectOptions = ["ಎರಡು (eradu) - two", "ಮೂರು (mooru) - three", "ನಾಲ್ಕು (naalku) - four"];
  }
  else if (question.toLowerCase().includes("word for 'two'")) {
    correctOption = "ಎರಡು (eradu)";
    incorrectOptions = ["ಒಂದು (ondu) - one", "ಮೂರು (mooru) - three", "ನಾಲ್ಕು (naalku) - four"];
  }
  else if (question.toLowerCase().includes("word for 'three'")) {
    correctOption = "ಮೂರು (mooru)";
    incorrectOptions = ["ಒಂದು (ondu) - one", "ಎರಡು (eradu) - two", "ನಾಲ್ಕು (naalku) - four"];
  }
  else if (question.toLowerCase().includes("what does 'ಕೆಂಪು' mean")) {
    correctOption = "Red";
    incorrectOptions = ["Blue", "Green", "Yellow"];
  }
  else if (question.toLowerCase().includes("what does 'ನೀಲಿ' mean")) {
    correctOption = "Blue";
    incorrectOptions = ["Red", "Green", "Yellow"];
  }
  else if (question.toLowerCase().includes("what does 'ಒಂದು' mean")) {
    correctOption = "One";
    incorrectOptions = ["Two", "Three", "Four"];
  }
  else if (question.toLowerCase().includes("what does 'ಎರಡು' mean")) {
    correctOption = "Two";
    incorrectOptions = ["One", "Three", "Four"];
  }
  else if (question.toLowerCase().includes("what does 'ಮೂರು' mean")) {
    correctOption = "Three";
    incorrectOptions = ["One", "Two", "Four"];
  }
  // Family Terms
  else if (question.toLowerCase().includes("word for 'father'")) {
    correctOption = "ಅಪ್ಪ (appa)";
    incorrectOptions = ["ಅಮ್ಮ (amma) - mother", "ಅಕ್ಕ (akka) - elder sister", "ಅಣ್ಣ (anna) - elder brother"];
  }
  else if (question.toLowerCase().includes("word for 'elder sister'")) {
    correctOption = "ಅಕ್ಕ (akka)";
    incorrectOptions = ["ಅಮ್ಮ (amma) - mother", "ಅಪ್ಪ (appa) - father", "ಅಣ್ಣ (anna) - elder brother"];
  }
  else if (question.toLowerCase().includes("word for 'elder brother'")) {
    correctOption = "ಅಣ್ಣ (anna)";
    incorrectOptions = ["ಅಮ್ಮ (amma) - mother", "ಅಪ್ಪ (appa) - father", "ಅಕ್ಕ (akka) - elder sister"];
  }
  else if (question.toLowerCase().includes("word for 'younger brother'")) {
    correctOption = "ತಮ್ಮ (tamma)";
    incorrectOptions = ["ಅಮ್ಮ (amma) - mother", "ಅಪ್ಪ (appa) - father", "ಅಕ್ಕ (akka) - elder sister"];
  }
  else if (question.toLowerCase().includes("what does 'ಅಮ್ಮ' mean")) {
    correctOption = "Mother";
    incorrectOptions = ["Father", "Sister", "Brother"];
  }
  else if (question.toLowerCase().includes("what does 'ಅಪ್ಪ' mean")) {
    correctOption = "Father";
    incorrectOptions = ["Mother", "Sister", "Brother"];
  }
  else if (question.toLowerCase().includes("what does 'ಅಕ್ಕ' mean")) {
    correctOption = "Elder sister";
    incorrectOptions = ["Mother", "Father", "Brother"];
  }
  else if (question.toLowerCase().includes("what does 'ಅಣ್ಣ' mean")) {
    correctOption = "Elder brother";
    incorrectOptions = ["Mother", "Father", "Sister"];
  }
  else if (question.toLowerCase().includes("what does 'ತಮ್ಮ' mean")) {
    correctOption = "Younger brother";
    incorrectOptions = ["Mother", "Father", "Sister"];
  }
  // Food Terms
  else if (question.toLowerCase().includes("word for 'rice'")) {
    correctOption = "ಅನ್ನ (anna)";
    incorrectOptions = ["ತರಕಾರಿ (tarakaari) - vegetable", "ಖಾರ (khaara) - spicy", "ಸಿಹಿ (sihi) - sweet"];
  }
  else if (question.toLowerCase().includes("word for 'vegetable'")) {
    correctOption = "ತರಕಾರಿ (tarakaari)";
    incorrectOptions = ["ಅನ್ನ (anna) - rice", "ಖಾರ (khaara) - spicy", "ಸಿಹಿ (sihi) - sweet"];
  }
  else if (question.toLowerCase().includes("word for 'spicy'")) {
    correctOption = "ಖಾರ (khaara)";
    incorrectOptions = ["ಅನ್ನ (anna) - rice", "ತರಕಾರಿ (tarakaari) - vegetable", "ಸಿಹಿ (sihi) - sweet"];
  }
  else if (question.toLowerCase().includes("word for 'sweet'")) {
    correctOption = "ಸಿಹಿ (sihi)";
    incorrectOptions = ["ಅನ್ನ (anna) - rice", "ತರಕಾರಿ (tarakaari) - vegetable", "ಖಾರ (khaara) - spicy"];
  }
  else if (question.toLowerCase().includes("word for 'to cook'")) {
    correctOption = "ಅಡಿಗೆ ಮಾಡು (adige maadu)";
    incorrectOptions = ["ತಿನ್ನು (tinnu) - to eat", "ಹೋಗು (hogu) - to go", "ಮಾಡು (maadu) - to do"];
  }
  else if (question.toLowerCase().includes("what does 'ಅನ್ನ' mean")) {
    correctOption = "Rice";
    incorrectOptions = ["Vegetable", "Spicy", "Sweet"];
  }
  else if (question.toLowerCase().includes("what does 'ತರಕಾರಿ' mean")) {
    correctOption = "Vegetable";
    incorrectOptions = ["Rice", "Spicy", "Sweet"];
  }
  else if (question.toLowerCase().includes("what does 'ಖಾರ' mean")) {
    correctOption = "Spicy";
    incorrectOptions = ["Rice", "Vegetable", "Sweet"];
  }
  else if (question.toLowerCase().includes("what does 'ಸಿಹಿ' mean")) {
    correctOption = "Sweet";
    incorrectOptions = ["Rice", "Vegetable", "Spicy"];
  }
  else if (question.toLowerCase().includes("what does 'ಅಡಿಗೆ ಮಾಡು' mean")) {
    correctOption = "To cook";
    incorrectOptions = ["To eat", "To serve", "To mix"];
  }
  // Grammar role questions
  else if (question.toLowerCase().includes("role of 'ಆಗಿ'")) {
    correctOption = "Used as 'having become' or to indicate a transformation";
    incorrectOptions = [
      "Used to indicate possession",
      "Used to indicate location",
      "Used to indicate time"
    ];
  }
  else if (question.toLowerCase().includes("role of 'ಗೆ'")) {
    correctOption = "Dative case marker (to/for)";
    incorrectOptions = [
      "Locative case marker (in/at)",
      "Possessive marker (of/belonging to)",
      "Subject marker"
    ];
  }
  else if (question.toLowerCase().includes("role of 'ಅಲ್ಲಿ'")) {
    correctOption = "Locative case marker (in/at/there)";
    incorrectOptions = [
      "Dative case marker (to/for)",
      "Possessive marker (of/belonging to)",
      "Subject marker"
    ];
  }
  // Pronouns
  else if (question.toLowerCase().includes("word for 'i'")) {
    correctOption = "ನಾನು (naanu)";
    incorrectOptions = ["ನೀನು (neenu) - you", "ಅವನು (avanu) - he", "ಅವಳು (avalu) - she"];
  }
  else if (question.toLowerCase().includes("word for 'you'")) {
    correctOption = "ನೀನು (neenu)";
    incorrectOptions = ["ನಾನು (naanu) - I", "ಅವನು (avanu) - he", "ಅವಳು (avalu) - she"];
  }
  else if (question.toLowerCase().includes("word for 'he'")) {
    correctOption = "ಅವನು (avanu)";
    incorrectOptions = ["ನಾನು (naanu) - I", "ನೀನು (neenu) - you", "ಅವಳು (avalu) - she"];
  }
  else if (question.toLowerCase().includes("word for 'she'")) {
    correctOption = "ಅವಳು (avalu)";
    incorrectOptions = ["ನಾನು (naanu) - I", "ನೀನು (neenu) - you", "ಅವನು (avanu) - he"];
  }
  else if (question.toLowerCase().includes("word for 'they'")) {
    correctOption = "ಅವರು (avaru)";
    incorrectOptions = ["ನಾನು (naanu) - I", "ನೀನು (neenu) - you", "ಅವನು (avanu) - he"];
  }
  else if (question.toLowerCase().includes("what does 'ನಾನು' mean")) {
    correctOption = "I";
    incorrectOptions = ["You", "He", "She"];
  }
  else if (question.toLowerCase().includes("what does 'ನೀನು' mean")) {
    correctOption = "You";
    incorrectOptions = ["I", "He", "She"];
  }
  else if (question.toLowerCase().includes("what does 'ಅವನು' mean")) {
    correctOption = "He";
    incorrectOptions = ["I", "You", "She"];
  }
  else if (question.toLowerCase().includes("what does 'ಅವಳು' mean")) {
    correctOption = "She";
    incorrectOptions = ["I", "You", "He"];
  }
  else if (question.toLowerCase().includes("what does 'ಅವರು' mean")) {
    correctOption = "They";
    incorrectOptions = ["I", "You", "He"];
  }
  // Verb Tenses and Sentences
  else if (question.toLowerCase().includes("how do you say 'i am' in kannada")) {
    correctOption = "ನಾನು ಇದ್ದೇನೆ (naanu iddene)";
    incorrectOptions = [
      "ನೀನು ಇದ್ದೀಯಾ (neenu iddeeya) - you are",
      "ಅವನು ಇದ್ದಾನೆ (avanu iddaane) - he is",
      "ಅವಳು ಇದ್ದಾಳೆ (avalu iddaale) - she is"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'you are' in kannada")) {
    correctOption = "ನೀನು ಇದ್ದೀಯಾ (neenu iddeeya)";
    incorrectOptions = [
      "ನಾನು ಇದ್ದೇನೆ (naanu iddene) - I am",
      "ಅವನು ಇದ್ದಾನೆ (avanu iddaane) - he is",
      "ಅವಳು ಇದ್ದಾಳೆ (avalu iddaale) - she is"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'he is' in kannada")) {
    correctOption = "ಅವನು ಇದ್ದಾನೆ (avanu iddaane)";
    incorrectOptions = [
      "ನಾನು ಇದ್ದೇನೆ (naanu iddene) - I am",
      "ನೀನು ಇದ್ದೀಯಾ (neenu iddeeya) - you are",
      "ಅವಳು ಇದ್ದಾಳೆ (avalu iddaale) - she is"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'she is' in kannada")) {
    correctOption = "ಅವಳು ಇದ್ದಾಳೆ (avalu iddaale)";
    incorrectOptions = [
      "ನಾನು ಇದ್ದೇನೆ (naanu iddene) - I am",
      "ನೀನು ಇದ್ದೀಯಾ (neenu iddeeya) - you are",
      "ಅವನು ಇದ್ದಾನೆ (avanu iddaane) - he is"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'they are' in kannada")) {
    correctOption = "ಅವರು ಇದ್ದಾರೆ (avaru iddaare)";
    incorrectOptions = [
      "ನಾನು ಇದ್ದೇನೆ (naanu iddene) - I am",
      "ನೀನು ಇದ್ದೀಯಾ (neenu iddeeya) - you are",
      "ಅವನು ಇದ್ದಾನೆ (avanu iddaane) - he is"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'i am eating' in kannada")) {
    correctOption = "ನಾನು ತಿನ್ನುತ್ತಿದ್ದೇನೆ (naanu tinnuttiddene)";
    incorrectOptions = [
      "ನಾನು ತಿಂದೆ (naanu tinde) - I ate",
      "ನಾನು ತಿನ್ನುತ್ತೇನೆ (naanu tinnutene) - I will eat",
      "ನಾನು ತಿನ್ನುವುದಿಲ್ಲ (naanu tinnuvudilla) - I don't eat"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'you are reading' in kannada")) {
    correctOption = "ನೀನು ಓದುತ್ತಿದ್ದೀಯ (neenu oduttiddeeya)";
    incorrectOptions = [
      "ನೀನು ಓದಿದೆ (neenu odide) - you read",
      "ನೀನು ಓದುತ್ತೀಯ (neenu odutteeya) - you will read",
      "ನೀನು ಓದುವುದಿಲ್ಲ (neenu oduvudilla) - you don't read"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'he is going' in kannada")) {
    correctOption = "ಅವನು ಹೋಗುತ್ತಿದ್ದಾನೆ (avanu hoguttiddaane)";
    incorrectOptions = [
      "ಅವನು ಹೋದನು (avanu hodanu) - he went",
      "ಅವನು ಹೋಗುತ್ತಾನೆ (avanu hoguttaane) - he will go",
      "ಅವನು ಹೋಗುವುದಿಲ್ಲ (avanu hoguvudilla) - he doesn't go"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'she is writing' in kannada")) {
    correctOption = "ಅವಳು ಬರೆಯುತ್ತಿದ್ದಾಳೆ (avalu bareyuttiddaale)";
    incorrectOptions = [
      "ಅವಳು ಬರೆದಳು (avalu baredalu) - she wrote",
      "ಅವಳು ಬರೆಯುತ್ತಾಳೆ (avalu bareyuttaale) - she will write",
      "ಅವಳು ಬರೆಯುವುದಿಲ್ಲ (avalu bareyuvudilla) - she doesn't write"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'they are working' in kannada")) {
    correctOption = "ಅವರು ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದಾರೆ (avaru kelasa maaduttiddaare)";
    incorrectOptions = [
      "ಅವರು ಕೆಲಸ ಮಾಡಿದರು (avaru kelasa maadidaru) - they worked",
      "ಅವರು ಕೆಲಸ ಮಾಡುತ್ತಾರೆ (avaru kelasa maaduttaare) - they will work",
      "ಅವರು ಕೆಲಸ ಮಾಡುವುದಿಲ್ಲ (avaru kelasa maaduvudilla) - they don't work"
    ];
  }
  else if (question.toLowerCase().includes("how do you form the past tense in kannada")) {
    correctOption = "Add suffix -ದೆ, -ದೆ, -ದನು, -ದಳು, -ದರು to the verb stem";
    incorrectOptions = [
      "Add suffix -ತ್ತಿದ್ದೇನೆ to the verb stem (present continuous)",
      "Add suffix -ತ್ತೇನೆ to the verb stem (future tense)",
      "Add suffix -ಉವುದಿಲ್ಲ to the verb stem (negative)"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'i ate' in kannada")) {
    correctOption = "ನಾನು ತಿಂದೆ (naanu tinde)";
    incorrectOptions = [
      "ನಾನು ತಿನ್ನುತ್ತಿದ್ದೇನೆ (naanu tinnuttiddene) - I am eating",
      "ನಾನು ತಿನ್ನುತ್ತೇನೆ (naanu tinnutene) - I will eat",
      "ನಾನು ತಿನ್ನುವುದಿಲ್ಲ (naanu tinnuvudilla) - I don't eat"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'you went' in kannada")) {
    correctOption = "ನೀನು ಹೋದೆ (neenu hode)";
    incorrectOptions = [
      "ನೀನು ಹೋಗುತ್ತಿದ್ದೀಯ (neenu hoguttiddeeya) - you are going",
      "ನೀನು ಹೋಗುತ್ತೀಯ (neenu hogutteeya) - you will go",
      "ನೀನು ಹೋಗುವುದಿಲ್ಲ (neenu hoguvudilla) - you don't go"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'he read' in kannada")) {
    correctOption = "ಅವನು ಓದಿದನು (avanu odidanu)";
    incorrectOptions = [
      "ಅವನು ಓದುತ್ತಿದ್ದಾನೆ (avanu oduttiddaane) - he is reading",
      "ಅವನು ಓದುತ್ತಾನೆ (avanu oduttaane) - he will read",
      "ಅವನು ಓದುವುದಿಲ್ಲ (avanu oduvudilla) - he doesn't read"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'she wrote' in kannada")) {
    correctOption = "ಅವಳು ಬರೆದಳು (avalu baredalu)";
    incorrectOptions = [
      "ಅವಳು ಬರೆಯುತ್ತಿದ್ದಾಳೆ (avalu bareyuttiddaale) - she is writing",
      "ಅವಳು ಬರೆಯುತ್ತಾಳೆ (avalu bareyuttaale) - she will write",
      "ಅವಳು ಬರೆಯುವುದಿಲ್ಲ (avalu bareyuvudilla) - she doesn't write"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'they worked' in kannada")) {
    correctOption = "ಅವರು ಕೆಲಸ ಮಾಡಿದರು (avaru kelasa maadidaru)";
    incorrectOptions = [
      "ಅವರು ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದಾರೆ (avaru kelasa maaduttiddaare) - they are working",
      "ಅವರು ಕೆಲಸ ಮಾಡುತ್ತಾರೆ (avaru kelasa maaduttaare) - they will work",
      "ಅವರು ಕೆಲಸ ಮಾಡುವುದಿಲ್ಲ (avaru kelasa maaduvudilla) - they don't work"
    ];
  }
  else if (question.toLowerCase().includes("what is the past tense marker in kannada")) {
    correctOption = "-ದೆ (1st person), -ದೆ (2nd person), -ದನು/-ದಳು (3rd person)";
    incorrectOptions = [
      "-ತ್ತಿದ್ದೇನೆ (present continuous)",
      "-ತ್ತೇನೆ (future tense)",
      "-ಉವುದಿಲ್ಲ (negative)"
    ];
  }
  else if (question.toLowerCase().includes("how do irregular verbs form the past tense in kannada")) {
    correctOption = "They follow special patterns, often with sound changes in the stem";
    incorrectOptions = [
      "They use different suffixes than regular verbs",
      "They borrow words from Sanskrit",
      "They don't change form at all"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'i didn't eat' in kannada")) {
    correctOption = "ನಾನು ತಿನ್ನಲಿಲ್ಲ (naanu tinnalilla)";
    incorrectOptions = [
      "ನಾನು ತಿನ್ನುತ್ತಿದ್ದೇನೆ (naanu tinnuttiddene) - I am eating",
      "ನಾನು ತಿಂದೆ (naanu tinde) - I ate",
      "ನಾನು ತಿನ್ನುತ್ತೇನೆ (naanu tinnutene) - I will eat"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'did you go?' in kannada")) {
    correctOption = "ನೀನು ಹೋದೆಯಾ? (neenu hodeya?)";
    incorrectOptions = [
      "ನೀನು ಹೋಗುತ್ತಿದ್ದೀಯಾ? (neenu hoguttiddeeya?) - are you going?",
      "ನೀನು ಹೋಗುತ್ತೀಯಾ? (neenu hogutteeya?) - will you go?",
      "ನೀನು ಹೋಗುವುದಿಲ್ಲವೇ? (neenu hoguvudillave?) - won't you go?"
    ];
  }
  else if (question.toLowerCase().includes("how do you form the future tense in kannada")) {
    correctOption = "Add suffix -ತ್ತೇನೆ, -ತ್ತೀಯ, -ತ್ತಾನೆ, -ತ್ತಾಳೆ, -ತ್ತಾರೆ to the verb stem";
    incorrectOptions = [
      "Add suffix -ತ್ತಿದ್ದೇನೆ to the verb stem (present continuous)",
      "Add suffix -ದೆ to the verb stem (past tense)",
      "Add suffix -ಉವುದಿಲ್ಲ to the verb stem (negative)"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'i will eat' in kannada")) {
    correctOption = "ನಾನು ತಿನ್ನುತ್ತೇನೆ (naanu tinnutene)";
    incorrectOptions = [
      "ನಾನು ತಿನ್ನುತ್ತಿದ್ದೇನೆ (naanu tinnuttiddene) - I am eating",
      "ನಾನು ತಿಂದೆ (naanu tinde) - I ate",
      "ನಾನು ತಿನ್ನುವುದಿಲ್ಲ (naanu tinnuvudilla) - I don't eat"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'you will go' in kannada")) {
    correctOption = "ನೀನು ಹೋಗುತ್ತೀಯ (neenu hogutteeya)";
    incorrectOptions = [
      "ನೀನು ಹೋಗುತ್ತಿದ್ದೀಯ (neenu hoguttiddeeya) - you are going",
      "ನೀನು ಹೋದೆ (neenu hode) - you went",
      "ನೀನು ಹೋಗುವುದಿಲ್ಲ (neenu hoguvudilla) - you don't go"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'he will read' in kannada")) {
    correctOption = "ಅವನು ಓದುತ್ತಾನೆ (avanu oduttaane)";
    incorrectOptions = [
      "ಅವನು ಓದುತ್ತಿದ್ದಾನೆ (avanu oduttiddaane) - he is reading",
      "ಅವನು ಓದಿದನು (avanu odidanu) - he read",
      "ಅವನು ಓದುವುದಿಲ್ಲ (avanu oduvudilla) - he doesn't read"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'she will write' in kannada")) {
    correctOption = "ಅವಳು ಬರೆಯುತ್ತಾಳೆ (avalu bareyuttaale)";
    incorrectOptions = [
      "ಅವಳು ಬರೆಯುತ್ತಿದ್ದಾಳೆ (avalu bareyuttiddaale) - she is writing",
      "ಅವಳು ಬರೆದಳು (avalu baredalu) - she wrote",
      "ಅವಳು ಬರೆಯುವುದಿಲ್ಲ (avalu bareyuvudilla) - she doesn't write"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'they will work' in kannada")) {
    correctOption = "ಅವರು ಕೆಲಸ ಮಾಡುತ್ತಾರೆ (avaru kelasa maaduttaare)";
    incorrectOptions = [
      "ಅವರು ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದಾರೆ (avaru kelasa maaduttiddaare) - they are working",
      "ಅವರು ಕೆಲಸ ಮಾಡಿದರು (avaru kelasa maadidaru) - they worked",
      "ಅವರು ಕೆಲಸ ಮಾಡುವುದಿಲ್ಲ (avaru kelasa maaduvudilla) - they don't work"
    ];
  }
  else if (question.toLowerCase().includes("what is the future tense marker in kannada")) {
    correctOption = "-ತ್ತೇನೆ (1st person), -ತ್ತೀಯ (2nd person), -ತ್ತಾನೆ/-ತ್ತಾಳೆ (3rd person)";
    incorrectOptions = [
      "-ತ್ತಿದ್ದೇನೆ (present continuous)",
      "-ದೆ (past tense)",
      "-ಉವುದಿಲ್ಲ (negative)"
    ];
  }
  else if (question.toLowerCase().includes("how do irregular verbs form the future tense in kannada")) {
    correctOption = "They follow special patterns, often with unique suffixes";
    incorrectOptions = [
      "They use past tense forms with auxiliary verbs",
      "They borrow words from Sanskrit",
      "They don't indicate future tense"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'i will not eat' in kannada")) {
    correctOption = "ನಾನು ತಿನ್ನುವುದಿಲ್ಲ (naanu tinnuvudilla)";
    incorrectOptions = [
      "ನಾನು ತಿನ್ನುತ್ತೇನೆ (naanu tinnutene) - I will eat",
      "ನಾನು ತಿನ್ನಲಿಲ್ಲ (naanu tinnalilla) - I didn't eat",
      "ನಾನು ತಿನ್ನುತ್ತಿಲ್ಲ (naanu tinnuttilla) - I am not eating"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'will you go?' in kannada")) {
    correctOption = "ನೀನು ಹೋಗುತ್ತೀಯಾ? (neenu hogutteeya?)";
    incorrectOptions = [
      "ನೀನು ಹೋದೆಯಾ? (neenu hodeya?) - did you go?",
      "ನೀನು ಹೋಗುತ್ತಿದ್ದೀಯಾ? (neenu hoguttiddeeya?) - are you going?",
      "ನೀನು ಹೋಗುವುದಿಲ್ಲವೇ? (neenu hoguvudillave?) - won't you go?"
    ];
  }
  else if (isAboutSound && question.includes("ಆ")) {
    correctOption = "Long 'aa'";
    incorrectOptions = ["Short 'a'", "Short 'i'", "Long 'ee'"];
  }
  else if (question.toLowerCase().includes("how do you say 'where are you going?' in kannada")) {
    correctOption = "ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತಿದ್ದೀರಿ? (neevu ellige hoguttiddiri?)";
    incorrectOptions = [
      "ನೀವು ಎಲ್ಲಿಂದ ಬಂದಿರಿ? (neevu ellinda bandiri?) - Where did you come from?",
      "ನೀವು ಏನು ಮಾಡುತ್ತಿದ್ದೀರಿ? (neevu enu maaduttiddiri?) - What are you doing?",
      "ನೀವು ಯಾವಾಗ ಬರುತ್ತೀರಿ? (neevu yaavaaga baruttiri?) - When will you come?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'when will you come?' in kannada")) {
    correctOption = "ನೀವು ಯಾವಾಗ ಬರುತ್ತೀರಿ? (neevu yaavaaga baruttiri?)";
    incorrectOptions = [
      "ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತಿದ್ದೀರಿ? (neevu ellige hoguttiddiri?) - Where are you going?",
      "ನೀವು ಬರುತ್ತೀರಾ? (neevu baruttiraa?) - Will you come?",
      "ನೀವು ಎಲ್ಲಿದ್ದೀರಿ? (neevu elliddiri?) - Where are you?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'whose is this?' in kannada")) {
    correctOption = "ಇದು ಯಾರದು? (idu yaaradu?)";
    incorrectOptions = [
      "ಇದು ಏನು? (idu enu?) - What is this?",
      "ಇದು ನಿಮ್ಮದೇ? (idu nimmade?) - Is this yours?",
      "ಇದು ಎಲ್ಲಿದೆ? (idu ellide?) - Where is this?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'what are you doing?' in kannada")) {
    correctOption = "ನೀವು ಏನು ಮಾಡುತ್ತಿದ್ದೀರಿ? (neevu enu maaduttiddiri?)";
    incorrectOptions = [
      "ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತಿದ್ದೀರಿ? (neevu ellige hoguttiddiri?) - Where are you going?",
      "ನೀವು ಯಾರು? (neevu yaaru?) - Who are you?",
      "ನೀವು ಏನು ತಿನ್ನುತ್ತಿದ್ದೀರಿ? (neevu enu tinnuttiddiri?) - What are you eating?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'how much is this?' in kannada")) {
    correctOption = "ಇದು ಎಷ್ಟು? (idu eshtu?)";
    incorrectOptions = [
      "ಇದು ಏನು? (idu enu?) - What is this?",
      "ಇದು ಎಲ್ಲಿದೆ? (idu ellide?) - Where is this?",
      "ಇದು ಯಾರದು? (idu yaaradu?) - Whose is this?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'what happened today?' in kannada")) {
    correctOption = "ಇಂದು ಏನಾಯಿತು? (indu enaayitu?)";
    incorrectOptions = [
      "ನಿನ್ನೆ ಏನಾಯಿತು? (ninne enaayitu?) - What happened yesterday?",
      "ನಾಳೆ ಏನು ಮಾಡುತ್ತೀರಿ? (nale enu maaduttiri?) - What will you do tomorrow?",
      "ಇಂದು ಏನು ಮಾಡುತ್ತಿದ್ದೀರಿ? (indu enu maaduttiddiri?) - What are you doing today?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'how do you know?' in kannada")) {
    correctOption = "ನಿಮಗೆ ಹೇಗೆ ಗೊತ್ತು? (nimage hege gottu?)";
    incorrectOptions = [
      "ನಿಮಗೆ ಗೊತ್ತಾ? (nimage gottaa?) - Do you know?",
      "ನಿಮಗೆ ಅರ್ಥವಾಯಿತಾ? (nimage arthavaayitaa?) - Did you understand?",
      "ನಿಮಗೆ ಹೇಳಿದರು? (nimage helidaru?) - Did they tell you?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'do you like it?' in kannada")) {
    correctOption = "ನಿಮಗೆ ಇದು ಇಷ್ಟವಾಗಿದೆಯಾ? (nimage idu ishtavaagideyaa?)";
    incorrectOptions = [
      "ನಿಮಗೆ ಇದು ಬೇಕಾ? (nimage idu bekaa?) - Do you want this?",
      "ನಿಮಗೆ ಇದು ಅರ್ಥವಾಗಿದೆಯಾ? (nimage idu arthavaagideyaa?) - Do you understand this?",
      "ನಿಮಗೆ ಇದು ಗೊತ್ತಾ? (nimage idu gottaa?) - Do you know this?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'whom should i tell?' in kannada")) {
    correctOption = "ನಾನು ಯಾರಿಗೆ ಹೇಳಬೇಕು? (naanu yaarige helabeku?)";
    incorrectOptions = [
      "ನಾನು ಏನು ಹೇಳಬೇಕು? (naanu enu helabeku?) - What should I tell?",
      "ನಾನು ಹೇಗೆ ಹೇಳಬೇಕು? (naanu hege helabeku?) - How should I tell?",
      "ನಾನು ಯಾವಾಗ ಹೇಳಬೇಕು? (naanu yaavaaga helabeku?) - When should I tell?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'can i do it?' in kannada")) {
    correctOption = "ನಾನು ಇದನ್ನು ಮಾಡಬಹುದೇ? (naanu idannu maadabahude?)";
    incorrectOptions = [
      "ನೀನು ಇದನ್ನು ಮಾಡಬಹುದೇ? (neenu idannu maadabahude?) - Can you do it?",
      "ನಾನು ಇದನ್ನು ನೋಡಬಹುದೇ? (naanu idannu nodabahude?) - Can I see it?",
      "ನಾನು ಇದನ್ನು ತೆಗೆದುಕೊಳ್ಳಬಹುದೇ? (naanu idannu tegedukollabaahude?) - Can I take it?"
    ];
  }
  // Daily routine expressions
  else if (question.toLowerCase().includes("how do you say 'did you eat?' in kannada")) {
    correctOption = "ನೀವು ಊಟ ಮಾಡಿದ್ದೀರಾ? (neevu oota maadiddiraa?)";
    incorrectOptions = [
      "ನೀವು ಏನು ತಿಂದಿರಿ? (neevu enu tindiri?) - What did you eat?",
      "ನೀವು ಊಟ ಮಾಡುತ್ತಿದ್ದೀರಾ? (neevu oota maaduttiddiraa?) - Are you eating?",
      "ನೀವು ಹಸಿವಾಗಿದೆಯಾ? (neevu hasivaagideyaa?) - Are you hungry?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'did you wake up?' in kannada")) {
    correctOption = "ನೀವು ಎದ್ದಿದ್ದೀರಾ? (neevu eddiddiraa?)";
    incorrectOptions = [
      "ನೀವು ಮಲಗಿದ್ದೀರಾ? (neevu malagiddiraa?) - Are you sleeping?",
      "ನೀವು ನಿದ್ರೆ ಮಾಡುತ್ತಿದ್ದೀರಾ? (neevu nidre maaduttiddiraa?) - Are you sleeping?",
      "ನೀವು ಎಷ್ಟು ಹೊತ್ತು ನಿದ್ರೆ ಮಾಡಿದಿರಿ? (neevu eshtu hottu nidre maadidiri?) - How long did you sleep?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'is the work finished?' in kannada")) {
    correctOption = "ಕೆಲಸ ಮುಗಿದಿದೆಯಾ? (kelasa mugidideyaa?)";
    incorrectOptions = [
      "ಕೆಲಸ ಪ್ರಾರಂಭವಾಗಿದೆಯಾ? (kelasa praarambhavaagideyaa?) - Has the work started?",
      "ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದೀರಾ? (kelasa maaduttiddiraa?) - Are you working?",
      "ಕೆಲಸ ಹೇಗಿದೆ? (kelasa hegide?) - How is the work?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'did you take a bath?' in kannada")) {
    correctOption = "ನೀವು ಸ್ನಾನ ಮಾಡಿದ್ದೀರಾ? (neevu snaana maadiddiraa?)";
    incorrectOptions = [
      "ನೀವು ಬಟ್ಟೆ ತೊಳೆದಿದ್ದೀರಾ? (neevu batte tolediddiraa?) - Did you wash clothes?",
      "ನೀವು ಮುಖ ತೊಳೆದಿದ್ದೀರಾ? (neevu mukha tolediddiraa?) - Did you wash your face?",
      "ನೀವು ಸ್ನಾನ ಮಾಡುತ್ತೀರಾ? (neevu snaana maaduttiraa?) - Will you take a bath?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'what time is it?' in kannada")) {
    correctOption = "ಈಗ ಎಷ್ಟು ಗಂಟೆ? (iga eshtu gante?)";
    incorrectOptions = [
      "ಸಮಯ ಏನು? (samaya enu?) - What is the time?",
      "ಎಷ್ಟು ಸಮಯವಾಯಿತು? (eshtu samayavaayitu?) - How much time has passed?",
      "ಗಡಿಯಾರ ನೋಡಿ (gadiyaara nodi) - Look at the clock"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'when will you go?' in kannada")) {
    correctOption = "ನೀವು ಯಾವಾಗ ಹೋಗುತ್ತೀರಿ? (neevu yaavaaga hoguttiri?)";
    incorrectOptions = [
      "ನೀವು ಯಾವಾಗ ಬರುತ್ತೀರಿ? (neevu yaavaaga baruttiri?) - When will you come?",
      "ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತೀರಿ? (neevu ellige hoguttiri?) - Where will you go?",
      "ನೀವು ಹೋಗುತ್ತೀರಾ? (neevu hoguttiraa?) - Will you go?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'i like it.' in kannada")) {
    correctOption = "ನನಗೆ ಇದು ಇಷ್ಟವಾಗಿದೆ (nanage idu ishtavaagide)";
    incorrectOptions = [
      "ನನಗೆ ಇದು ಬೇಕು (nanage idu beku) - I want this",
      "ನನಗೆ ಇದು ಅರ್ಥವಾಗಿದೆ (nanage idu arthavaagide) - I understand this",
      "ನನಗೆ ಇದು ಇಷ್ಟವಿಲ್ಲ (nanage idu ishtavilla) - I don't like this"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'i am angry.' in kannada")) {
    correctOption = "ನನಗೆ ಕೋಪ ಬಂದಿದೆ (nanage kopa bandide)";
    incorrectOptions = [
      "ನನಗೆ ಸಂತೋಷವಾಗಿದೆ (nanage santoshavaagide) - I am happy",
      "ನನಗೆ ದುಃಖವಾಗಿದೆ (nanage dukhavaagide) - I am sad",
      "ನನಗೆ ಭಯವಾಗಿದೆ (nanage bhayavaagide) - I am afraid"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'that is very nice.' in kannada")) {
    correctOption = "ಅದು ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ (adu tumbaa chennaagide)";
    incorrectOptions = [
      "ಅದು ತುಂಬಾ ಕೆಟ್ಟದಾಗಿದೆ (adu tumbaa kettadaagide) - That is very bad",
      "ಅದು ಸ್ವಲ್ಪ ಚೆನ್ನಾಗಿದೆ (adu svalpa chennaagide) - That is a little nice",
      "ಅದು ಚೆನ್ನಾಗಿಲ್ಲ (adu chennaagilla) - That is not nice"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'i feel sad.' in kannada")) {
    correctOption = "ನನಗೆ ದುಃಖವಾಗಿದೆ (nanage dukhavaagide)";
    incorrectOptions = [
      "ನನಗೆ ಸಂತೋಷವಾಗಿದೆ (nanage santoshavaagide) - I am happy",
      "ನನಗೆ ಕೋಪ ಬಂದಿದೆ (nanage kopa bandide) - I am angry",
      "ನನಗೆ ಹಸಿವಾಗಿದೆ (nanage hasivaagide) - I am hungry"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'you are very good.' in kannada")) {
    correctOption = "ನೀವು ತುಂಬಾ ಒಳ್ಳೆಯವರು (neevu tumbaa olleyavaru)";
    incorrectOptions = [
      "ನೀವು ತುಂಬಾ ಕೆಟ್ಟವರು (neevu tumbaa kettavaru) - You are very bad",
      "ನೀವು ಒಳ್ಳೆಯವರಲ್ಲ (neevu olleyavaralla) - You are not good",
      "ನೀವು ಸ್ವಲ್ಪ ಒಳ್ಳೆಯವರು (neevu svalpa olleyavaru) - You are a little good"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'i like you.' in kannada")) {
    correctOption = "ನನಗೆ ನೀವು ಇಷ್ಟ (nanage neevu ishta)";
    incorrectOptions = [
      "ನನಗೆ ನೀವು ಇಷ್ಟವಿಲ್ಲ (nanage neevu ishtavilla) - I don't like you",
      "ನನಗೆ ನಿಮ್ಮನ್ನು ನೋಡಲು ಇಷ್ಟ (nanage nimmannu nodalu ishta) - I like to see you",
      "ನಾನು ನಿಮ್ಮನ್ನು ಪ್ರೀತಿಸುತ್ತೇನೆ (naanu nimmannu preetisuttene) - I love you"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'be happy.' in kannada")) {
    correctOption = "ಸಂತೋಷವಾಗಿರಿ (santoshavaagiri)";
    incorrectOptions = [
      "ದುಃಖಿಸಬೇಡಿ (dukhisabedi) - Don't be sad",
      "ನಗುತ್ತಿರಿ (naguttiri) - Keep smiling",
      "ಚಿಂತಿಸಬೇಡಿ (chintisabedi) - Don't worry"
    ];
  }
  // Shopping-related phrases
  else if (question.toLowerCase().includes("how do you say 'i want to buy this.' in kannada")) {
    correctOption = "ನಾನು ಇದನ್ನು ಕೊಳ್ಳಲು ಬಯಸುತ್ತೇನೆ (naanu idannu kollalu bayasuttene)";
    incorrectOptions = [
      "ನನಗೆ ಇದು ಬೇಡ (nanage idu beda) - I don't want this",
      "ಇದರ ಬೆಲೆ ಎಷ್ಟು? (idara bele eshtu?) - How much does this cost?",
      "ಇದನ್ನು ತೋರಿಸಿ (idannu torisi) - Show me this"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'how much does this cost?' in kannada")) {
    correctOption = "ಇದರ ಬೆಲೆ ಎಷ್ಟು? (idara bele eshtu?)";
    incorrectOptions = [
      "ಇದು ದುಬಾರಿ (idu dubaari) - This is expensive",
      "ಇದು ಅಗ್ಗವಾಗಿದೆ (idu aggavaagide) - This is cheap",
      "ಬೆಲೆ ಕಡಿಮೆ ಮಾಡಿ (bele kadime maadi) - Reduce the price"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'do you have any discounts?' in kannada")) {
    correctOption = "ಯಾವುದಾದರೂ ರಿಯಾಯಿತಿ ಇದೆಯಾ? (yaavudaadaru riyaayiti ideyaa?)";
    incorrectOptions = [
      "ಬೆಲೆ ಕಡಿಮೆ ಮಾಡಬಹುದಾ? (bele kadime maadabahudaa?) - Can you reduce the price?",
      "ಇದು ಅಗ್ಗವಿದೆಯಾ? (idu aggavideyaa?) - Is this cheap?",
      "ನಾನು ಚಿಲ್ಲರೆ ಕೊಡಬೇಕಾ? (naanu chillare kodabekaa?) - Should I give change?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'where is the bus station?' in kannada")) {
    correctOption = "ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ? (bas nildaana ellide?)";
    incorrectOptions = [
      "ರೈಲು ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ? (railu nildaana ellide?) - Where is the train station?",
      "ಬಸ್ ಯಾವಾಗ ಬರುತ್ತದೆ? (bas yaavaaga baruttade?) - When will the bus come?",
      "ಬಸ್ ನಿಲ್ಲುತ್ತದೆಯಾ? (bas nilluttadeyaa?) - Will the bus stop?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'go straight ahead.' in kannada")) {
    correctOption = "ನೇರವಾಗಿ ಹೋಗಿ (neravagi hogi)";
    incorrectOptions = [
      "ಬಲಕ್ಕೆ ತಿರುಗಿ (balakke tirugi) - Turn right",
      "ಎಡಕ್ಕೆ ತಿರುಗಿ (edakke tirugi) - Turn left",
      "ಹಿಂದಕ್ಕೆ ಹೋಗಿ (hindakke hogi) - Go back"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'turn right.' in kannada")) {
    correctOption = "ಬಲಕ್ಕೆ ತಿರುಗಿ (balakke tirugi)";
    incorrectOptions = [
      "ಎಡಕ್ಕೆ ತಿರುಗಿ (edakke tirugi) - Turn left",
      "ನೇರವಾಗಿ ಹೋಗಿ (neravagi hogi) - Go straight",
      "ಹಿಂದಕ್ಕೆ ಹೋಗಿ (hindakke hogi) - Go back"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'turn left.' in kannada")) {
    correctOption = "ಎಡಕ್ಕೆ ತಿರುಗಿ (edakke tirugi)";
    incorrectOptions = [
      "ಬಲಕ್ಕೆ ತಿರುಗಿ (balakke tirugi) - Turn right",
      "ನೇರವಾಗಿ ಹೋಗಿ (neravagi hogi) - Go straight",
      "ಹಿಂದಕ್ಕೆ ಹೋಗಿ (hindakke hogi) - Go back"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'it's far from here.' in kannada")) {
    correctOption = "ಇಲ್ಲಿಂದ ದೂರವಿದೆ (illinda dooravide)";
    incorrectOptions = [
      "ಇಲ್ಲಿಗೆ ಹತ್ತಿರವಿದೆ (illige hattiravide) - It's near here",
      "ಇಲ್ಲಿಯೇ ಇದೆ (illiye ide) - It's right here",
      "ಎಷ್ಟು ದೂರವಿದೆ? (eshtu dooravide?) - How far is it?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'it's near.' in kannada")) {
    correctOption = "ಹತ್ತಿರವಿದೆ (hattiravide)";
    incorrectOptions = [
      "ದೂರವಿದೆ (dooravide) - It's far",
      "ಬಹಳ ದೂರವಿದೆ (bahala dooravide) - It's very far",
      "ಎಷ್ಟು ಹತ್ತಿರವಿದೆ? (eshtu hattiravide?) - How near is it?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'how much time will it take?' in kannada")) {
    correctOption = "ಅದಕ್ಕೆ ಎಷ್ಟು ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ? (adakke eshtu samaya tegedukoluttade?)";
    incorrectOptions = [
      "ಎಷ್ಟು ದೂರವಿದೆ? (eshtu dooravide?) - How far is it?",
      "ಅದು ಯಾವಾಗ ಮುಗಿಯುತ್ತದೆ? (adu yaavaaga mugiyuttade?) - When will it end?",
      "ಸಮಯ ಎಷ್ಟಾಗಿದೆ? (samaya eshtaagide?) - What time is it now?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'what time is it now?' in kannada")) {
    correctOption = "ಈಗ ಎಷ್ಟು ಗಂಟೆ? (iga eshtu gante?)";
    incorrectOptions = [
      "ಎಷ್ಟು ಸಮಯವಾಯಿತು? (eshtu samayavaayitu?) - How much time has passed?",
      "ಗಡಿಯಾರವನ್ನು ನೋಡಿ (gadiyaaravannu nodi) - Look at the clock",
      "ಎಷ್ಟು ಹೊತ್ತಾಯಿತು? (eshtu hottaayitu?) - How late is it?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'it's 2 o'clock.' in kannada")) {
    correctOption = "ಎರಡು ಗಂಟೆ (eradu gante)";
    incorrectOptions = [
      "ಒಂದು ಗಂಟೆ (ondu gante) - It's 1 o'clock",
      "ಮೂರು ಗಂಟೆ (mooru gante) - It's 3 o'clock",
      "ನಾಲ್ಕು ಗಂಟೆ (naalku gante) - It's 4 o'clock"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'what is the date today?' in kannada")) {
    correctOption = "ಇಂದು ಏನು ದಿನಾಂಕ? (indu enu dinaanka?)";
    incorrectOptions = [
      "ಇಂದು ಏನು ದಿನ? (indu enu dina?) - What day is today?",
      "ಇಂದು ಏನು ತಿಂಗಳು? (indu enu tingalu?) - What month is it today?",
      "ಈ ವರ್ಷ ಎಷ್ಟು? (ee varsha eshtu?) - What year is this?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'i'll meet you tomorrow.' in kannada")) {
    correctOption = "ನಾನು ನಿಮ್ಮನ್ನು ನಾಳೆ ಭೇಟಿಯಾಗುತ್ತೇನೆ (naanu nimmannu naale bhetiyaaguttene)";
    incorrectOptions = [
      "ನಾನು ನಿಮ್ಮನ್ನು ಇಂದು ಭೇಟಿಯಾಗುತ್ತೇನೆ (naanu nimmannu indu bhetiyaaguttene) - I'll meet you today",
      "ನಾನು ನಿಮ್ಮನ್ನು ನಾಳೆ ಭೇಟಿಯಾಗುವುದಿಲ್ಲ (naanu nimmannu naale bhetiyaaguvudilla) - I won't meet you tomorrow",
      "ನಾನು ನಾಳೆ ಬರುವುದಿಲ್ಲ (naanu naale baruvudilla) - I won't come tomorrow"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'let's meet next week.' in kannada")) {
    correctOption = "ನಾವು ಮುಂದಿನ ವಾರ ಭೇಟಿಯಾಗೋಣ (naavu mundina vaara bhetiyaagona)";
    incorrectOptions = [
      "ನಾವು ಈ ವಾರ ಭೇಟಿಯಾಗೋಣ (naavu ee vaara bhetiyaagona) - Let's meet this week",
      "ನಾವು ಮುಂದಿನ ತಿಂಗಳು ಭೇಟಿಯಾಗೋಣ (naavu mundina tingalu bhetiyaagona) - Let's meet next month",
      "ನಾವು ಮುಂದಿನ ವಾರ ಭೇಟಿಯಾಗುವುದಿಲ್ಲ (naavu mundina vaara bhetiyaaguvudilla) - We won't meet next week"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'are you free now?' in kannada")) {
    correctOption = "ನಿಮಗೆ ಈಗ ಖಾಲಿ ಇದೆಯಾ? (nimage iga khaali ideyaa?)";
    incorrectOptions = [
      "ನಿಮಗೆ ಸಮಯವಿದೆಯಾ? (nimage samayavideyaa?) - Do you have time?",
      "ನೀವು ಬಿಡುವಾಗಿದ್ದೀರಾ? (neevu biduvaagiddiraa?) - Are you free?",
      "ನೀವು ಕೆಲಸದಲ್ಲಿ ಇದ್ದೀರಾ? (neevu kelasadalli iddiraa?) - Are you at work?"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'i'm running late.' in kannada")) {
    correctOption = "ನನಗೆ ತಡವಾಗುತ್ತಿದೆ (nanage tadavaaguttide)";
    incorrectOptions = [
      "ನಾನು ಬೇಗ ಬರುತ್ತೇನೆ (naanu bega baruttene) - I'll come quickly",
      "ನನಗೆ ಸಮಯವಿಲ್ಲ (nanage samayavilla) - I don't have time",
      "ನಾನು ಸರಿಯಾದ ಸಮಯಕ್ಕೆ ಬರುತ್ತೇನೆ (naanu sariyaada samayakke baruttene) - I'll come on time"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'wait for five minutes.' in kannada")) {
    correctOption = "ಐದು ನಿಮಿಷ ಕಾಯಿರಿ (aidu nimisha kaayiri)";
    incorrectOptions = [
      "ಒಂದು ನಿಮಿಷ ಕಾಯಿರಿ (ondu nimisha kaayiri) - Wait for one minute",
      "ಕಾಯಬೇಡಿ (kaayabedi) - Don't wait",
      "ನಾನು ಬೇಗ ಬರುತ್ತೇನೆ (naanu bega baruttene) - I'm coming quickly"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'i'll be back soon.' in kannada")) {
    correctOption = "ನಾನು ಬೇಗನೆ ಹಿಂತಿರುಗಿ ಬರುತ್ತೇನೆ (naanu begane hintirugi baruttene)";
    incorrectOptions = [
      "ನಾನು ವಾಪಸ್ ಬರುವುದಿಲ್ಲ (naanu vaapas baruvudilla) - I won't come back",
      "ನಾನು ತಡವಾಗಿ ಬರುತ್ತೇನೆ (naanu tadavaagi baruttene) - I'll come late",
      "ನೀವು ಇಲ್ಲಿಯೇ ಇರಿ (neevu illiye iri) - You stay here"
    ];
  }
  // Basic Greetings and Common Phrases
  else if (question === "How do you say 'How are you?' in Kannada?") {
    correctOption = "ಹೇಗಿದ್ದೀರಿ? (hegiddiri?)";
    incorrectOptions = [
      "ನಿಮ್ಮ ಹೆಸರೇನು? (nimma hesarenu?) - What is your name?",
      "ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ (naanu chennaagiddene) - I am fine",
      "ಧನ್ಯವಾದಗಳು (dhanyavaadagalu) - Thank you"
    ];
  }
  else if (question === "How do you say 'I am fine.' in Kannada?") {
    correctOption = "ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ (naanu chennaagiddene)";
    incorrectOptions = [
      "ನನಗೆ ಸ್ವಲ್ಪ ಬರುತ್ತದೆ (nanage svalpa baruttade) - I know a little",
      "ನಿಮಗೆ ಹೇಗಿದೆ? (nimage hegide?) - How are you?",
      "ನನಗೆ ಗೊತ್ತಿಲ್ಲ (nanage gottilla) - I don't know"
    ];
  }
  else if (question === "How do you say 'What is your name?' in Kannada?") {
    correctOption = "ನಿಮ್ಮ ಹೆಸರೇನು? (nimma hesarenu?)";
    incorrectOptions = [
      "ನಿಮಗೆ ಹೇಗಿದೆ? (nimage hegide?) - How are you?",
      "ನಿಮ್ಮ ಮನೆ ಎಲ್ಲಿದೆ? (nimma mane ellide?) - Where is your house?",
      "ನನ್ನ ಹೆಸರು (nanna hesaru) - My name is"
    ];
  }
  else if (question === "How do you say 'My name is [name].' in Kannada?") {
    correctOption = "ನನ್ನ ಹೆಸರು [name] (nanna hesaru [name])";
    incorrectOptions = [
      "ನಾನು [name] (naanu [name]) - I am [name]",
      "ನನಗೆ [name] ಎಂದು ಕರೆಯುತ್ತಾರೆ (nanage [name] endu kareyuttaare) - They call me [name]",
      "ನಿಮ್ಮ ಹೆಸರೇನು? (nimma hesarenu?) - What is your name?"
    ];
  }
  else if (question === "How do you say 'Send a message.' in Kannada?") {
    correctOption = "ಸಂದೇಶ ಕಳುಹಿಸಿ (sandesha kaluhisi)";
    incorrectOptions = [
      "ಕರೆ ಮಾಡಿ (kare maadi) - Make a call",
      "ಮೆಸೇಜ್ ಓದಿ (message odi) - Read the message",
      "ಉತ್ತರ ಕೊಡಿ (uttara kodi) - Give a reply"
    ];
  }
  else if (question === "How do you say 'Come here.' in Kannada?") {
    correctOption = "ಇಲ್ಲಿಗೆ ಬನ್ನಿ (illige banni)";
    incorrectOptions = [
      "ಅಲ್ಲಿಗೆ ಹೋಗಿ (allige hogi) - Go there",
      "ಇಲ್ಲಿ ನಿಲ್ಲಿ (illi nilli) - Stand here",
      "ಬೇಗ ಬನ್ನಿ (bega banni) - Come quickly"
    ];
  }
  else if (question === "How do you say 'Come immediately.' in Kannada?") {
    correctOption = "ತಕ್ಷಣ ಬನ್ನಿ (takshana banni)";
    incorrectOptions = [
      "ಸ್ವಲ್ಪ ನಿಧಾನವಾಗಿ ಬನ್ನಿ (svalpa nidhaanavaagi banni) - Come a bit slowly",
      "ನಂತರ ಬನ್ನಿ (nantara banni) - Come later",
      "ಬೇಗ ಹೋಗಿ (bega hogi) - Go quickly"
    ];
  }
  else if (question === "How do you say 'Who is at your house?' in Kannada?") {
    correctOption = "ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಯಾರಿದ್ದಾರೆ? (nimma maneyalli yaariddaare?)";
    incorrectOptions = [
      "ನಿಮ್ಮ ಮನೆ ಎಲ್ಲಿದೆ? (nimma mane ellide?) - Where is your house?",
      "ನಿಮ್ಮ ಮನೆ ಹೇಗಿದೆ? (nimma mane hegide?) - How is your house?",
      "ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಏನಿದೆ? (nimma maneyalli enide?) - What is in your house?"
    ];
  }
  else if (question === "How do you say 'Can you speak Kannada?' in Kannada?") {
    correctOption = "ನಿಮಗೆ ಕನ್ನಡ ಬರುತ್ತಾ? (nimage kannada baruttaa?)";
    incorrectOptions = [
      "ಕನ್ನಡ ಕಲಿಯುತ್ತಿದ್ದೀರಾ? (kannada kaliyuttiddiraa?) - Are you learning Kannada?",
      "ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡೋಣ (kannadadalli maatanaadona) - Let's speak in Kannada",
      "ನಿಮಗೆ ಕನ್ನಡ ಅರ್ಥವಾಗುತ್ತಾ? (nimage kannada arthavaaguttaa?) - Do you understand Kannada?"
    ];
  }
  else if (question === "How do you say 'I can speak a little.' in Kannada?") {
    correctOption = "ನನಗೆ ಸ್ವಲ್ಪ ಬರುತ್ತದೆ (nanage svalpa baruttade)";
    incorrectOptions = [
      "ನನಗೆ ಕನ್ನಡ ಬರುವುದಿಲ್ಲ (nanage kannada baruvudilla) - I cannot speak Kannada",
      "ನನಗೆ ಚೆನ್ನಾಗಿ ಬರುತ್ತದೆ (nanage chennaagi baruttade) - I can speak well",
      "ನಾನು ಕಲಿಯುತ್ತಿದ್ದೇನೆ (naanu kaliyuttiddene) - I am learning"
    ];
  }
  else if (question === "How do you say 'Are you at home?' in Kannada?") {
    correctOption = "ನೀವು ಮನೆಯಲ್ಲಿದ್ದೀರಾ? (neevu maneyalliddiraa?)";
    incorrectOptions = [
      "ನೀವು ಹೊರಗಿದ್ದೀರಾ? (neevu horagiddiraa?) - Are you outside?",
      "ನಿಮ್ಮ ಮನೆ ಎಲ್ಲಿದೆ? (nimma mane ellide?) - Where is your house?",
      "ನೀವು ಮನೆಗೆ ಹೋಗುತ್ತಿದ್ದೀರಾ? (neevu manege hoguttiddiraa?) - Are you going home?"
    ];
  }
  else if (question === "How do you say 'Please do this work.' in Kannada?") {
    correctOption = "ದಯವಿಟ್ಟು ಈ ಕೆಲಸ ಮಾಡಿ (dayavittu ee kelasa maadi)";
    incorrectOptions = [
      "ಈ ಕೆಲಸ ಮುಗಿದಿದೆಯಾ? (ee kelasa mugidideyaa?) - Is this work finished?",
      "ಈ ಕೆಲಸ ಯಾರು ಮಾಡಿದರು? (ee kelasa yaaru maadidaru?) - Who did this work?",
      "ಕೆಲಸ ಹೇಗಿದೆ? (kelasa hegide?) - How is the work?"
    ];
  }
  else if (question === "How do you say 'Get ready.' in Kannada?") {
    correctOption = "ಸಿದ್ಧವಾಗಿ (siddhavaagi)";
    incorrectOptions = [
      "ಬೇಗ ಬನ್ನಿ (bega banni) - Come quickly",
      "ಕಾಯಿರಿ (kaayiri) - Wait",
      "ಮುಗಿಸಿ (mugisi) - Finish"
    ];
  }
  else if (question === "How do you say 'Where is he?' in Kannada?") {
    correctOption = "ಅವನು ಎಲ್ಲಿದ್ದಾನೆ? (avanu elliddaane?)";
    incorrectOptions = [
      "ಅವಳು ಎಲ್ಲಿದ್ದಾಳೆ? (avalu elliddaale?) - Where is she?",
      "ಅವನು ಯಾರು? (avanu yaaru?) - Who is he?",
      "ಅವನು ಹೋದನೇ? (avanu hodane?) - Did he go?"
    ];
  }
  else if (question === "How do you say 'I need to say something.' in Kannada?") {
    correctOption = "ನಾನು ಏನೋ ಹೇಳಬೇಕಾಗಿದೆ (naanu eno helabeekaagide)";
    incorrectOptions = [
      "ನಾನು ಏನೂ ಹೇಳುವುದಿಲ್ಲ (naanu enu heluvudilla) - I won't say anything",
      "ನೀವು ಏನು ಹೇಳುತ್ತೀರಿ? (neevu enu heluttiri?) - What will you say?",
      "ಅವನು ಏನು ಹೇಳಿದನು? (avanu enu helidanu?) - What did he say?"
    ];
  }
  else if (question === "How do you say 'I like it.' in Kannada?") {
    correctOption = "ನನಗೆ ಇದು ಇಷ್ಟವಾಗಿದೆ (nanage idu ishtavaagide)";
    incorrectOptions = [
      "ನನಗೆ ಇದು ಬೇಕು (nanage idu beku) - I want this",
      "ನನಗೆ ಇದು ಅರ್ಥವಾಗಿದೆ (nanage idu arthavaagide) - I understand this",
      "ನನಗೆ ಇದು ಇಷ್ಟವಿಲ್ಲ (nanage idu ishtavilla) - I don't like this"
    ];
  }
  else if (question === "How do you say 'I am angry.' in Kannada?") {
    correctOption = "ನನಗೆ ಕೋಪ ಬಂದಿದೆ (nanage kopa bandide)";
    incorrectOptions = [
      "ನನಗೆ ಸಂತೋಷವಾಗಿದೆ (nanage santoshavaagide) - I am happy",
      "ನನಗೆ ದುಃಖವಾಗಿದೆ (nanage dukhavaagide) - I am sad",
      "ನನಗೆ ಭಯವಾಗಿದೆ (nanage bhayavaagide) - I am afraid"
    ];
  }
  else if (question === "How do you say 'That is very nice.' in Kannada?") {
    correctOption = "ಅದು ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ (adu tumbaa chennaagide)";
    incorrectOptions = [
      "ಅದು ತುಂಬಾ ಕೆಟ್ಟದಾಗಿದೆ (adu tumbaa kettadaagide) - That is very bad",
      "ಅದು ಸ್ವಲ್ಪ ಚೆನ್ನಾಗಿದೆ (adu svalpa chennaagide) - That is a little nice",
      "ಅದು ಚೆನ್ನಾಗಿಲ್ಲ (adu chennaagilla) - That is not nice"
    ];
  }
  else if (question === "How do you say 'I feel sad.' in Kannada?") {
    correctOption = "ನನಗೆ ದುಃಖವಾಗಿದೆ (nanage dukhavaagide)";
    incorrectOptions = [
      "ನನಗೆ ಸಂತೋಷವಾಗಿದೆ (nanage santoshavaagide) - I am happy",
      "ನನಗೆ ಕೋಪ ಬಂದಿದೆ (nanage kopa bandide) - I am angry",
      "ನನಗೆ ಹಸಿವಾಗಿದೆ (nanage hasivaagide) - I am hungry"
    ];
  }
  else if (question === "How do you say 'You are very good.' in Kannada?") {
    correctOption = "ನೀವು ತುಂಬಾ ಒಳ್ಳೆಯವರು (neevu tumbaa olleyavaru)";
    incorrectOptions = [
      "ನೀವು ತುಂಬಾ ಕೆಟ್ಟವರು (neevu tumbaa kettavaru) - You are very bad",
      "ನೀವು ಒಳ್ಳೆಯವರಲ್ಲ (neevu olleyavaralla) - You are not good",
      "ನೀವು ಸ್ವಲ್ಪ ಒಳ್ಳೆಯವರು (neevu svalpa olleyavaru) - You are a little good"
    ];
  }
  else if (question === "How do you say 'I like you.' in Kannada?") {
    correctOption = "ನನಗೆ ನೀವು ಇಷ್ಟ (nanage neevu ishta)";
    incorrectOptions = [
      "ನನಗೆ ನೀವು ಇಷ್ಟವಿಲ್ಲ (nanage neevu ishtavilla) - I don't like you",
      "ನನಗೆ ನಿಮ್ಮನ್ನು ನೋಡಲು ಇಷ್ಟ (nanage nimmannu nodalu ishta) - I like to see you",
      "ನಾನು ನಿಮ್ಮನ್ನು ಪ್ರೀತಿಸುತ್ತೇನೆ (naanu nimmannu preetisuttene) - I love you"
    ];
  }
  else if (question === "How do you say 'Be happy.' in Kannada?") {
    correctOption = "ಸಂತೋಷವಾಗಿರಿ (santoshavaagiri)";
    incorrectOptions = [
      "ದುಃಖಿಸಬೇಡಿ (dukhisabedi) - Don't be sad",
      "ನಗುತ್ತಿರಿ (naguttiri) - Keep smiling",
      "ಚಿಂತಿಸಬೇಡಿ (chintisabedi) - Don't worry"
    ];
  }
  else if (question === "How do you say 'I couldn't sleep.' in Kannada?") {
    correctOption = "ನನಗೆ ನಿದ್ದೆ ಬರಲಿಲ್ಲ (nanage nidde baralilla)";
    incorrectOptions = [
      "ನಾನು ಚೆನ್ನಾಗಿ ನಿದ್ರಿಸಿದೆ (naanu chennaagi nidriside) - I slept well",
      "ನನಗೆ ನಿದ್ದೆ ಬರುತ್ತಿದೆ (nanage nidde baruttide) - I'm feeling sleepy",
      "ನಾನು ನಿದ್ರಿಸಬೇಕು (naanu nidrisabeku) - I need to sleep"
    ];
  }
  // Shopping and Transactions
  else if (question === "How do you say 'Tell me after weighing this.' in Kannada?") {
    correctOption = "ಇದನ್ನು ತೂಕ ಮಾಡಿ ಹೇಳಿ (idannu tooka maadi heli)";
    incorrectOptions = [
      "ಇದರ ಬೆಲೆ ಎಷ್ಟು? (idara bele eshtu?) - How much does this cost?",
      "ಇದನ್ನು ಪ್ಯಾಕ್ ಮಾಡಿ (idannu pack maadi) - Pack this",
      "ಇದು ಎಷ್ಟು ತೂಕ? (idu eshtu tooka?) - How much does this weigh?"
    ];
  }
  else if (question === "How do you say 'Reduce this a little.' in Kannada?") {
    correctOption = "ಇದನ್ನು ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ (idannu svalpa kadime maadi)";
    incorrectOptions = [
      "ಇದನ್ನು ಸ್ವಲ್ಪ ಹೆಚ್ಚು ಮಾಡಿ (idannu svalpa hechchu maadi) - Increase this a little",
      "ಇದರ ಬೆಲೆ ಕಡಿಮೆ ಮಾಡಿ (idara bele kadime maadi) - Reduce the price",
      "ಇದು ಸಾಕಷ್ಟು ಇದೆ (idu saakashtu ide) - This is enough"
    ];
  }
  else if (question === "How do you say 'I want to buy this.' in Kannada?") {
    correctOption = "ನಾನು ಇದನ್ನು ಕೊಳ್ಳಲು ಬಯಸುತ್ತೇನೆ (naanu idannu kollalu bayasuttene)";
    incorrectOptions = [
      "ನನಗೆ ಇದು ಬೇಡ (nanage idu beda) - I don't want this",
      "ಇದರ ಬೆಲೆ ಎಷ್ಟು? (idara bele eshtu?) - How much does this cost?",
      "ಇದನ್ನು ತೋರಿಸಿ (idannu torisi) - Show me this"
    ];
  }
  else if (question === "How do you say 'Where can I find it?' in Kannada?") {
    correctOption = "ಇದು ಎಲ್ಲಿ ಸಿಗುತ್ತದೆ? (idu elli siguttade?)";
    incorrectOptions = [
      "ಇದು ಯಾರ ಬಳಿ ಇದೆ? (idu yaara bali ide?) - Who has this?",
      "ಇದು ಯಾವಾಗ ಸಿಗುತ್ತದೆ? (idu yaavaaga siguttade?) - When can I get it?",
      "ಇದು ಇಲ್ಲಿ ಇದೆಯೇ? (idu illi ideye?) - Is it here?"
    ];
  }
  else if (question === "How do you say 'I don't need this.' in Kannada?") {
    correctOption = "ನನಗೆ ಇದು ಬೇಡ (nanage idu beda)";
    incorrectOptions = [
      "ನನಗೆ ಇದು ಬೇಕು (nanage idu beku) - I want this",
      "ನನಗೆ ಇದು ಇಷ್ಟವಿಲ್ಲ (nanage idu ishtavilla) - I don't like this",
      "ನನಗೆ ಇದು ಸಾಲದು (nanage idu saaladu) - This is not enough for me"
    ];
  }
  else if (question === "How do you say 'How much does this cost?' in Kannada?") {
    correctOption = "ಇದರ ಬೆಲೆ ಎಷ್ಟು? (idara bele eshtu?)";
    incorrectOptions = [
      "ಇದು ದುಬಾರಿ (idu dubaari) - This is expensive",
      "ಇದು ಅಗ್ಗವಾಗಿದೆ (idu aggavaagide) - This is cheap",
      "ಬೆಲೆ ಕಡಿಮೆ ಮಾಡಿ (bele kadime maadi) - Reduce the price"
    ];
  }
  else if (question === "How do you say 'Do you have change?' in Kannada?") {
    correctOption = "ನಿಮ್ಮ ಬಳಿ ಚಿಲ್ಲರೆ ಇದೆಯಾ? (nimma bali chillare ideyaa?)";
    incorrectOptions = [
      "ನಿಮ್ಮ ಬಳಿ ನೋಟು ಇದೆಯಾ? (nimma bali notu ideyaa?) - Do you have notes?",
      "ನಾನು ಚಿಲ್ಲರೆ ಕೊಡಬೇಕಾ? (naanu chillare kodabekaa?) - Should I give change?",
      "ಎಷ್ಟು ಚಿಲ್ಲರೆ ಬೇಕು? (eshtu chillare beku?) - How much change do you need?"
    ];
  }
  else if (question === "How do you say 'Can I pay by card?' in Kannada?") {
    correctOption = "ನಾನು ಕಾರ್ಡಿನಿಂದ ಪಾವತಿಸಬಹುದೇ? (naanu kaardininda paavatisabahude?)";
    incorrectOptions = [
      "ನಿಮ್ಮ ಬಳಿ ಕಾರ್ಡ್ ಇದೆಯಾ? (nimma bali kaard ideyaa?) - Do you have a card?",
      "ನಾನು ನಗದಿನಿಂದ ಪಾವತಿಸುತ್ತೇನೆ (naanu nagadininda paavatisuttene) - I'll pay with cash",
      "ಕಾರ್ಡ್ ಮೆಷಿನ್ ಇದೆಯಾ? (kaard meshin ideyaa?) - Is there a card machine?"
    ];
  }
  else if (question === "How do you say 'It's too expensive.' in Kannada?") {
    correctOption = "ಇದು ತುಂಬಾ ದುಬಾರಿ (idu tumbaa dubaari)";
    incorrectOptions = [
      "ಇದು ಅಗ್ಗವಿದೆ (idu aggavide) - This is cheap",
      "ಇದರ ಬೆಲೆ ಎಷ್ಟು? (idara bele eshtu?) - How much does this cost?",
      "ಬೆಲೆ ಕಡಿಮೆ ಮಾಡಬಹುದೇ? (bele kadime maadabahude?) - Can you reduce the price?"
    ];
  }
  else if (question === "How do you say 'Do you have any discounts?' in Kannada?") {
    correctOption = "ಯಾವುದಾದರೂ ರಿಯಾಯಿತಿ ಇದೆಯಾ? (yaavudaadaru riyaayiti ideyaa?)";
    incorrectOptions = [
      "ಬೆಲೆ ಕಡಿಮೆ ಮಾಡಬಹುದಾ? (bele kadime maadabahudaa?) - Can you reduce the price?",
      "ಇದು ಅಗ್ಗವಿದೆಯಾ? (idu aggavideyaa?) - Is this cheap?",
      "ರಿಯಾಯಿತಿ ಎಷ್ಟು? (riyaayiti eshtu?) - How much is the discount?"
    ];
  }
  // Directions and Locations
  else if (question === "How do you say 'Where is the bus station?' in Kannada?") {
    correctOption = "ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ? (bas nildaana ellide?)";
    incorrectOptions = [
      "ರೈಲು ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ? (railu nildaana ellide?) - Where is the train station?",
      "ಬಸ್ ಯಾವಾಗ ಬರುತ್ತದೆ? (bas yaavaaga baruttade?) - When will the bus come?",
      "ಬಸ್ ನಿಲ್ಲುತ್ತದೆಯಾ? (bas nilluttadeyaa?) - Will the bus stop?"
    ];
  }
  else if (question === "How do you say 'Go straight ahead.' in Kannada?") {
    correctOption = "ನೇರವಾಗಿ ಹೋಗಿ (neravagi hogi)";
    incorrectOptions = [
      "ಬಲಕ್ಕೆ ತಿರುಗಿ (balakke tirugi) - Turn right",
      "ಎಡಕ್ಕೆ ತಿರುಗಿ (edakke tirugi) - Turn left",
      "ಹಿಂದಕ್ಕೆ ಹೋಗಿ (hindakke hogi) - Go back"
    ];
  }
  else if (question === "How do you say 'Turn right.' in Kannada?") {
    correctOption = "ಬಲಕ್ಕೆ ತಿರುಗಿ (balakke tirugi)";
    incorrectOptions = [
      "ಎಡಕ್ಕೆ ತಿರುಗಿ (edakke tirugi) - Turn left",
      "ನೇರವಾಗಿ ಹೋಗಿ (neravagi hogi) - Go straight",
      "ಹಿಂದಕ್ಕೆ ಹೋಗಿ (hindakke hogi) - Go back"
    ];
  }
  else if (question === "How do you say 'Turn left.' in Kannada?") {
    correctOption = "ಎಡಕ್ಕೆ ತಿರುಗಿ (edakke tirugi)";
    incorrectOptions = [
      "ಬಲಕ್ಕೆ ತಿರುಗಿ (balakke tirugi) - Turn right",
      "ನೇರವಾಗಿ ಹೋಗಿ (neravagi hogi) - Go straight",
      "ಹಿಂದಕ್ಕೆ ಹೋಗಿ (hindakke hogi) - Go back"
    ];
  }
  else if (question === "How do you say 'It's far from here.' in Kannada?") {
    correctOption = "ಇಲ್ಲಿಂದ ದೂರವಿದೆ (illinda dooravide)";
    incorrectOptions = [
      "ಇಲ್ಲಿಗೆ ಹತ್ತಿರವಿದೆ (illige hattiravide) - It's near here",
      "ಇಲ್ಲಿಯೇ ಇದೆ (illiye ide) - It's right here",
      "ಎಷ್ಟು ದೂರವಿದೆ? (eshtu dooravide?) - How far is it?"
    ];
  }
  else if (question === "How do you say 'It's near.' in Kannada?") {
    correctOption = "ಹತ್ತಿರವಿದೆ (hattiravide)";
    incorrectOptions = [
      "ದೂರವಿದೆ (dooravide) - It's far",
      "ಬಹಳ ದೂರವಿದೆ (bahala dooravide) - It's very far",
      "ಎಷ್ಟು ಹತ್ತಿರವಿದೆ? (eshtu hattiravide?) - How near is it?"
    ];
  }
  else if (question === "How do you say 'How much time will it take?' in Kannada?") {
    correctOption = "ಅದಕ್ಕೆ ಎಷ್ಟು ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ? (adakke eshtu samaya tegedukoluttade?)";
    incorrectOptions = [
      "ಎಷ್ಟು ದೂರವಿದೆ? (eshtu dooravide?) - How far is it?",
      "ಅದು ಯಾವಾಗ ಮುಗಿಯುತ್ತದೆ? (adu yaavaaga mugiyuttade?) - When will it end?",
      "ಸಮಯ ಎಷ್ಟಾಗಿದೆ? (samaya eshtaagide?) - What time is it now?"
    ];
  }
  else if (question === "How do you say 'What time is it now?' in Kannada?") {
    correctOption = "ಈಗ ಎಷ್ಟು ಗಂಟೆ? (iga eshtu gante?)";
    incorrectOptions = [
      "ಎಷ್ಟು ಸಮಯವಾಯಿತು? (eshtu samayavaayitu?) - How much time has passed?",
      "ಗಡಿಯಾರವನ್ನು ನೋಡಿ (gadiyaaravannu nodi) - Look at the clock",
      "ಎಷ್ಟು ಹೊತ್ತಾಯಿತು? (eshtu hottaayitu?) - How late is it?"
    ];
  }
  else if (question === "How do you say 'It's 2 o'clock.' in Kannada?") {
    correctOption = "ಎರಡು ಗಂಟೆ (eradu gante)";
    incorrectOptions = [
      "ಒಂದು ಗಂಟೆ (ondu gante) - It's 1 o'clock",
      "ಮೂರು ಗಂಟೆ (mooru gante) - It's 3 o'clock",
      "ನಾಲ್ಕು ಗಂಟೆ (naalku gante) - It's 4 o'clock"
    ];
  }
  else if (question === "How do you say 'What is the date today?' in Kannada?") {
    correctOption = "ಇಂದು ಏನು ದಿನಾಂಕ? (indu enu dinaanka?)";
    incorrectOptions = [
      "ಇಂದು ಏನು ದಿನ? (indu enu dina?) - What day is today?",
      "ಇಂದು ಏನು ತಿಂಗಳು? (indu enu tingalu?) - What month is it today?",
      "ಈ ವರ್ಷ ಎಷ್ಟು? (ee varsha eshtu?) - What year is this?"
    ];
  }
  else if (question === "How do you say 'I'll meet you tomorrow.' in Kannada?") {
    correctOption = "ನಾನು ನಿಮ್ಮನ್ನು ನಾಳೆ ಭೇಟಿಯಾಗುತ್ತೇನೆ (naanu nimmannu naale bhetiyaaguttene)";
    incorrectOptions = [
      "ನಾನು ನಿಮ್ಮನ್ನು ಇಂದು ಭೇಟಿಯಾಗುತ್ತೇನೆ (naanu nimmannu indu bhetiyaaguttene) - I'll meet you today",
      "ನಾನು ನಿಮ್ಮನ್ನು ನಾಳೆ ಭೇಟಿಯಾಗುವುದಿಲ್ಲ (naanu nimmannu naale bhetiyaaguvudilla) - I won't meet you tomorrow",
      "ನಾನು ನಾಳೆ ಬರುವುದಿಲ್ಲ (naanu naale baruvudilla) - I won't come tomorrow"
    ];
  }
  else if (question === "How do you say 'Let's meet next week.' in Kannada?") {
    correctOption = "ನಾವು ಮುಂದಿನ ವಾರ ಭೇಟಿಯಾಗೋಣ (naavu mundina vaara bhetiyaagona)";
    incorrectOptions = [
      "ನಾವು ಈ ವಾರ ಭೇಟಿಯಾಗೋಣ (naavu ee vaara bhetiyaagona) - Let's meet this week",
      "ನಾವು ಮುಂದಿನ ತಿಂಗಳು ಭೇಟಿಯಾಗೋಣ (naavu mundina tingalu bhetiyaagona) - Let's meet next month",
      "ನಾವು ಮುಂದಿನ ವಾರ ಭೇಟಿಯಾಗುವುದಿಲ್ಲ (naavu mundina vaara bhetiyaaguvudilla) - We won't meet next week"
    ];
  }
  else if (question === "How do you say 'Are you free now?' in Kannada?") {
    correctOption = "ನಿಮಗೆ ಈಗ ಖಾಲಿ ಇದೆಯಾ? (nimage iga khaali ideyaa?)";
    incorrectOptions = [
      "ನಿಮಗೆ ಸಮಯವಿದೆಯಾ? (nimage samayavideyaa?) - Do you have time?",
      "ನೀವು ಬಿಡುವಾಗಿದ್ದೀರಾ? (neevu biduvaagiddiraa?) - Are you free?",
      "ನೀವು ಕೆಲಸದಲ್ಲಿ ಇದ್ದೀರಾ? (neevu kelasadalli iddiraa?) - Are you at work?"
    ];
  }
  else if (question === "How do you say 'I'm running late.' in Kannada?") {
    correctOption = "ನನಗೆ ತಡವಾಗುತ್ತಿದೆ (nanage tadavaaguttide)";
    incorrectOptions = [
      "ನಾನು ಬೇಗ ಬರುತ್ತೇನೆ (naanu bega baruttene) - I'll come quickly",
      "ನನಗೆ ಸಮಯವಿಲ್ಲ (nanage samayavilla) - I don't have time",
      "ನಾನು ಸರಿಯಾದ ಸಮಯಕ್ಕೆ ಬರುತ್ತೇನೆ (naanu sariyaada samayakke baruttene) - I'll come on time"
    ];
  }
  else if (question === "How do you say 'Wait for five minutes.' in Kannada?") {
    correctOption = "ಐದು ನಿಮಿಷ ಕಾಯಿರಿ (aidu nimisha kaayiri)";
    incorrectOptions = [
      "ಒಂದು ನಿಮಿಷ ಕಾಯಿರಿ (ondu nimisha kaayiri) - Wait for one minute",
      "ಕಾಯಬೇಡಿ (kaayabedi) - Don't wait",
      "ನಾನು ಬೇಗ ಬರುತ್ತೇನೆ (naanu bega baruttene) - I'm coming quickly"
    ];
  }
  else if (question === "How do you say 'I'll be back soon.' in Kannada?") {
    correctOption = "ನಾನು ಬೇಗನೆ ಹಿಂತಿರುಗಿ ಬರುತ್ತೇನೆ (naanu begane hintirugi baruttene)";
    incorrectOptions = [
      "ನಾನು ವಾಪಸ್ ಬರುವುದಿಲ್ಲ (naanu vaapas baruvudilla) - I won't come back",
      "ನಾನು ತಡವಾಗಿ ಬರುತ್ತೇನೆ (naanu tadavaagi baruttene) - I'll come late",
      "ನೀವು ಇಲ್ಲಿಯೇ ಇರಿ (neevu illiye iri) - You stay here"
    ];
  }
  else if (question === "How do you say 'Let's meet tomorrow.' in Kannada?") {
    correctOption = "ನಾವು ನಾಳೆ ಭೇಟಿಯಾಗೋಣ (naavu naale bhetiyaagona)";
    incorrectOptions = [
      "ನಾವು ಇಂದು ಭೇಟಿಯಾಗೋಣ (naavu indu bhetiyaagona) - Let's meet today",
      "ನಾವು ನಾಳೆ ಭೇಟಿಯಾಗುವುದಿಲ್ಲ (naavu naale bhetiyaaguvudilla) - We won't meet tomorrow",
      "ನಾನು ನಾಳೆ ಬರುವುದಿಲ್ಲ (naanu naale baruvudilla) - I won't come tomorrow"
    ];
  }
  else if (question === "How do you say 'Where is the train station?' in Kannada?") {
    correctOption = "ರೈಲು ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ? (railu nildaana ellide?)";
    incorrectOptions = [
      "ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ? (bas nildaana ellide?) - Where is the bus station?",
      "ರೈಲು ಯಾವಾಗ ಬರುತ್ತದೆ? (railu yaavaaga baruttade?) - When will the train come?",
      "ರೈಲು ನಿಲ್ಲುತ್ತದೆಯಾ? (railu nilluttadeyaa?) - Will the train stop?"
    ];
  }
  else if (question === "How do you say 'When does the bus leave?' in Kannada?") {
    correctOption = "ಬಸ್ ಯಾವಾಗ ಹೊರಡುತ್ತದೆ? (bas yaavaaga horaduttade?)";
    incorrectOptions = [
      "ಬಸ್ ಯಾವಾಗ ಬರುತ್ತದೆ? (bas yaavaaga baruttade?) - When does the bus come?",
      "ಬಸ್ ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತದೆ? (bas ellige hoguttade?) - Where does the bus go?",
      "ಬಸ್ ನಿಲ್ಲುತ್ತದೆಯಾ? (bas nilluttadeyaa?) - Will the bus stop?"
    ];
  }
  else if (question === "How do you say 'How much is the ticket?' in Kannada?") {
    correctOption = "ಟಿಕೇಟ್ ಎಷ್ಟು? (tiket eshtu?)";
    incorrectOptions = [
      "ಟಿಕೇಟ್ ಎಲ್ಲಿ ಸಿಗುತ್ತದೆ? (tiket elli siguttade?) - Where can I get the ticket?",
      "ಟಿಕೇಟ್ ಇದೆಯಾ? (tiket ideyaa?) - Is there a ticket?",
      "ಟಿಕೇಟ್ ಬೇಕಾ? (tiket bekaa?) - Do you need a ticket?"
    ];
  }
  else if (question === "How do you say 'Is this the right bus?' in Kannada?") {
    correctOption = "ಇದು ಸರಿಯಾದ ಬಸ್ಸೇ? (idu sariyaada basse?)";
    incorrectOptions = [
      "ಈ ಬಸ್ ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತದೆ? (ee bas ellige hoguttade?) - Where does this bus go?",
      "ಬಸ್ ಬರುತ್ತಿದೆಯಾ? (bas baruttideyaa?) - Is the bus coming?",
      "ಮುಂದಿನ ಬಸ್ ಯಾವಾಗ? (mundina bas yaavaaga?) - When is the next bus?"
    ];
  }
  else if (question === "How do you say 'Please stop here.' in Kannada?") {
    correctOption = "ದಯವಿಟ್ಟು ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ (dayavittu illi nillisi)";
    incorrectOptions = [
      "ಮುಂದೆ ಹೋಗಿ (munde hogi) - Go ahead",
      "ಇಲ್ಲಿ ಇಳಿಯಬೇಕು (illi iliyabeku) - I need to get off here",
      "ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ? (nildaana ellide?) - Where is the station?"
    ];
  }
  else if (question === "How do you say 'I want to go to the market.' in Kannada?") {
    correctOption = "ನಾನು ಮಾರುಕಟ್ಟೆಗೆ ಹೋಗಬೇಕು (naanu maarukattege hogabeku)";
    incorrectOptions = [
      "ಮಾರುಕಟ್ಟೆ ಎಲ್ಲಿದೆ? (maarukatte ellide?) - Where is the market?",
      "ಮಾರುಕಟ್ಟೆ ಯಾವಾಗ ತೆರೆಯುತ್ತದೆ? (maarukatte yaavaaga tereyuttade?) - When does the market open?",
      "ಮಾರುಕಟ್ಟೆ ಬಂದಿದೆಯಾ? (maarukatte bandideyaa?) - Has the market arrived?"
    ];
  }
  else if (question === "How do you say 'How far is it?' in Kannada?") {
    correctOption = "ಅದು ಎಷ್ಟು ದೂರವಿದೆ? (adu eshtu dooravide?)";
    incorrectOptions = [
      "ಅದು ಹತ್ತಿರವಿದೆಯಾ? (adu hattiravideya?) - Is it nearby?",
      "ಎಷ್ಟು ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ? (eshtu samaya tegedukoluttade?) - How much time will it take?",
      "ಅದು ಎಲ್ಲಿದೆ? (adu ellide?) - Where is it?"
    ];
  }
  else if (question === "How do you say 'Call a taxi, please.' in Kannada?") {
    correctOption = "ದಯವಿಟ್ಟು ಟ್ಯಾಕ್ಸಿ ಕರೆಯಿರಿ (dayavittu taxi kareyiri)";
    incorrectOptions = [
      "ಟ್ಯಾಕ್ಸಿ ಎಲ್ಲಿದೆ? (taxi ellide?) - Where is the taxi?",
      "ಟ್ಯಾಕ್ಸಿ ಬೇಕಾ? (taxi bekaa?) - Do you need a taxi?",
      "ಟ್ಯಾಕ್ಸಿ ಎಷ್ಟು? (taxi eshtu?) - How much is the taxi?"
    ];
  }
  else if (question === "How do you say 'Is there a direct bus?' in Kannada?") {
    correctOption = "ನೇರ ಬಸ್ ಇದೆಯಾ? (nera bas ideyaa?)";
    incorrectOptions = [
      "ಬಸ್ ಬದಲಾಯಿಸಬೇಕೇ? (bas badalaayisabeke?) - Do I need to change the bus?",
      "ಬಸ್ ಎಲ್ಲಿದೆ? (bas ellide?) - Where is the bus?",
      "ಬಸ್ ಯಾವಾಗ ಬರುತ್ತದೆ? (bas yaavaaga baruttade?) - When will the bus come?"
    ];
  }
  else if (question === "How do you say 'I need to change buses.' in Kannada?") {
    correctOption = "ನಾನು ಬಸ್ ಬದಲಾಯಿಸಬೇಕು (naanu bas badalaayisabeku)";
    incorrectOptions = [
      "ಇದು ನೇರ ಬಸ್ಸೇ? (idu nera basse?) - Is this a direct bus?",
      "ಬಸ್ ಎಲ್ಲಿ ನಿಲ್ಲುತ್ತದೆ? (bas elli nilluttade?) - Where does the bus stop?",
      "ಮುಂದಿನ ಬಸ್ ಯಾವಾಗ? (mundina bas yaavaaga?) - When is the next bus?"
    ];
  }
  else if (question === "How do you say 'I don't feel well.' in Kannada?") {
    correctOption = "ನನಗೆ ಆರೋಗ್ಯ ಸರಿಯಿಲ್ಲ (nanage aarogya sariyilla)";
    incorrectOptions = [
      "ನನಗೆ ಜ್ವರ ಇದೆ (nanage jvara ide) - I have a fever",
      "ನನಗೆ ನೋವಾಗುತ್ತಿದೆ (nanage novaaguttide) - I'm in pain",
      "ನನಗೆ ಆರೋಗ್ಯ ಚೆನ್ನಾಗಿದೆ (nanage aarogya chennaagide) - I am feeling well"
    ];
  }
  else if (question === "How do you say 'I need a doctor.' in Kannada?") {
    correctOption = "ನನಗೆ ವೈದ್ಯರ ಅಗತ್ಯವಿದೆ (nanage vaidyara agatyavide)";
    incorrectOptions = [
      "ವೈದ್ಯರು ಎಲ್ಲಿದ್ದಾರೆ? (vaidyaru elliddaare?) - Where is the doctor?",
      "ವೈದ್ಯರು ಬರುತ್ತಾರೆಯೇ? (vaidyaru baruttaareye?) - Will the doctor come?",
      "ವೈದ್ಯರು ಇಲ್ಲವೇ? (vaidyaru illave?) - Is there no doctor?"
    ];
  }
  else if (question === "How do you say 'I need to change buses.' in Kannada?") {
    correctOption = "ನಾನು ಬಸ್ ಬದಲಾಯಿಸಬೇಕು (naanu bas badalaayisabeku)";
    incorrectOptions = [
      "ಇದು ನೇರ ಬಸ್ಸೇ? (idu nera basse?) - Is this a direct bus?",
      "ಬಸ್ ಎಲ್ಲಿ ನಿಲ್ಲುತ್ತದೆ? (bas elli nilluttade?) - Where does the bus stop?",
      "ಮುಂದಿನ ಬಸ್ ಯಾವಾಗ? (mundina bas yaavaaga?) - When is the next bus?"
    ];
  }
  else if (question === "How do you say 'I need to change buses.' in Kannada?") {
    correctOption = "ನಾನು ಬಸ್ ಬದಲಾಯಿಸಬೇಕು (naanu bas badalaayisabeku)";
    incorrectOptions = [
      "ಇದು ನೇರ ಬಸ್ಸೇ? (idu nera basse?) - Is this a direct bus?",
      "ಬಸ್ ಎಲ್ಲಿ ನಿಲ್ಲುತ್ತದೆ? (bas elli nilluttade?) - Where does the bus stop?",
      "ಮುಂದಿನ ಬಸ್ ಯಾವಾಗ? (mundina bas yaavaaga?) - When is the next bus?"
    ];
  }
  else if (question === "How do you say 'Where is the hospital?' in Kannada?") {
    correctOption = "ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ? (aspatre ellide?)";
    incorrectOptions = [
      "ಡಾಕ್ಟರ್ ಎಲ್ಲಿದ್ದಾರೆ? (doctor elliddaare?) - Where is the doctor?",
      "ಔಷಧಿ ಅಂಗಡಿ ಎಲ್ಲಿದೆ? (aushadhi angadi ellide?) - Where is the pharmacy?",
      "ಆಸ್ಪತ್ರೆಗೆ ಹೇಗೆ ಹೋಗಬೇಕು? (aspatrege hege hogabeku?) - How to go to the hospital?"
    ];
  }
  else if (question === "How do you say 'I have a headache.' in Kannada?") {
    correctOption = "ನನಗೆ ತಲೆನೋವು ಇದೆ (nanage nenenoovu ide)";
    incorrectOptions = [
      "ನನಗೆ ಜ್ವರ ಇದೆ (nanage jvara ide) - I have a fever",
      "ನನಗೆ ಉಸಿರಾಟದ ತೊಂದರೆ ಇದೆ (nanage usiraatada tondare ide) - I have breathing difficulty",
      "ನನಗೆ ಕೆಮ್ಮು ಇದೆ (nanage kemmu ide) - I have a cough"
    ];
  }
  else if (question === "How do you say 'Call an ambulance.' in Kannada?") {
    correctOption = "ಆಂಬುಲೆನ್ಸ್ ಕರೆಯಿರಿ (ambulens kareyiri)";
    incorrectOptions = [
      "ಡಾಕ್ಟರ್ ಅನ್ನು ಕರೆಯಿರಿ (doctor annu kareyiri) - Call a doctor",
      "ಪೊಲೀಸ್ ಕರೆಯಿರಿ (police kareyiri) - Call the police",
      "ತುರ್ತು ಸಹಾಯ ಬೇಕು (turtu sahaaya beku) - Need emergency help"
    ];
  }
  else if (question === "How do you say 'I need medicine.' in Kannada?") {
    correctOption = "ನನಗೆ ಔಷಧಿ ಬೇಕು (nanage aushadhi beku)";
    incorrectOptions = [
      "ನನಗೆ ಡಾಕ್ಟರ್ ಬೇಕು (nanage doctor beku) - I need a doctor",
      "ನನಗೆ ನೀರು ಬೇಕು (nanage neeru beku) - I need water",
      "ನನಗೆ ವಿಶ್ರಾಂತಿ ಬೇಕು (nanage vishraanti beku) - I need rest"
    ];
  }
  else if (question === "How do you say 'Where is the pharmacy?' in Kannada?") {
    correctOption = "ಔಷಧಿ ಅಂಗಡಿ ಎಲ್ಲಿದೆ? (aushadhi angadi ellide?)";
    incorrectOptions = [
      "ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ? (aspatre ellide?) - Where is the hospital?",
      "ಡಾಕ್ಟರ್ ಎಲ್ಲಿದ್ದಾರೆ? (doctor elliddaare?) - Where is the doctor?",
      "ಔಷಧಿ ಇದೆಯೇ? (aushadhi ideye?) - Do you have medicine?"
    ];
  }
  else if (question === "How do you say 'I'm allergic to this.' in Kannada?") {
    correctOption = "ನನಗೆ ಇದರ ಅಲರ್ಜಿ ಇದೆ (nanage idara allerji ide)";
    incorrectOptions = [
      "ನನಗೆ ಇದು ಇಷ್ಟವಿಲ್ಲ (nanage idu ishtavilla) - I don't like this",
      "ಇದು ನನಗೆ ಒಗ್ಗುವುದಿಲ್ಲ (idu nanage ogguvudilla) - This doesn't suit me",
      "ನಾನು ಇದನ್ನು ತೆಗೆದುಕೊಳ್ಳಲಾರೆ (naanu idannu tegedukollaare) - I cannot take this"
    ];
  }
  else if (question === "How do you say 'Help me, please.' in Kannada?") {
    correctOption = "ದಯವಿಟ್ಟು ನನಗೆ ಸಹಾಯ ಮಾಡಿ (dayavittu nanage sahaaya maadi)";
    incorrectOptions = [
      "ನನಗೆ ಸಹಾಯ ಬೇಕು (nanage sahaaya beku) - I need help",
      "ನನಗೆ ಸಹಾಯ ಮಾಡುವಿರಾ? (nanage sahaaya maaduvira?) - Will you help me?",
      "ದಯವಿಟ್ಟು ಇಲ್ಲಿಗೆ ಬನ್ನಿ (dayavittu illige banni) - Please come here"
    ];
  }
  else if (question === "How do you say 'I'm feeling better now.' in Kannada?") {
    correctOption = "ನನಗೆ ಈಗ ಚೆನ್ನಾಗಿದೆ (nanage iga chennaagide)";
    incorrectOptions = [
      "ನನಗೆ ಇನ್ನೂ ಹುಷಾರಿಲ್ಲ (nanage innu husharilla) - I'm still not well",
      "ನಾನು ಚೇತರಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ (naanu chetarisikolluttiddene) - I'm recovering",
      "ನನಗೆ ವಿಶ್ರಾಂತಿ ಬೇಕು (nanage vishraanti beku) - I need rest"
    ];
  }
  else if (question === "How do you say 'Are you free this weekend?' in Kannada?") {
    correctOption = "ಈ ವಾರಾಂತ್ಯದಲ್ಲಿ ನಿಮಗೆ ಬಿಡುವಿದೆಯೇ? (ee vaaraantyadalli nimage biduvideye?)";
    incorrectOptions = [
      "ನೀವು ಈ ವಾರಾಂತ್ಯದಲ್ಲಿ ಏನು ಮಾಡುತ್ತೀರಿ? (neevu ee vaaraantyadalli enu maadutteeri?) - What are you doing this weekend?",
      "ಈ ವಾರಾಂತ್ಯ ನಮಗೆ ಸಿಗುವಿರಾ? (ee vaaraantya namage siguvira?) - Will you meet us this weekend?",
      "ವಾರಾಂತ್ಯದಲ್ಲಿ ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತೀರಿ? (vaaraantyadalli ellige hogutteeri?) - Where are you going on the weekend?"
    ];
  }
  else if (question === "How do you say 'Would you like to join us?' in Kannada?") {
    correctOption = "ನಮ್ಮೊಂದಿಗೆ ಸೇರಲು ಇಷ್ಟವಿದೆಯೇ? (nammondige seralu ishtavideye?)";
    incorrectOptions = [
      "ನೀವು ಬರುವಿರಾ? (neevu baruvira?) - Will you come?",
      "ನೀವು ನಮ್ಮೊಂದಿಗೆ ಬರುತ್ತೀರಾ? (neevu nammondige barutteeraa?) - Are you coming with us?",
      "ನಿಮಗೆ ಜೊತೆಯಾಗಲು ಸಾಧ್ಯವೇ? (nimage joteyaagalu saadhyave?) - Is it possible for you to accompany us?"
    ];
  }
  else if (question === "How do you say 'What time should we meet?' in Kannada?") {
    correctOption = "ನಾವು ಯಾವ ಸಮಯದಲ್ಲಿ ಭೇಟಿಯಾಗಬೇಕು? (naavu yaava samayadalli bhetiyaagabeku?)";
    incorrectOptions = [
      "ನಾವು ಎಲ್ಲಿ ಭೇಟಿಯಾಗಬೇಕು? (naavu elli bhetiyaagabeku?) - Where should we meet?",
      "ನಾವು ಯಾವಾಗ ಭೇಟಿಯಾಗಬೇಕು? (naavu yaavaaga bhetiyaagabeku?) - When should we meet?",
      "ನಿಮಗೆ ಯಾವ ಸಮಯ ಅನುಕೂಲ? (nimage yaava samaya anukoola?) - What time is convenient for you?"
    ];
  }
  else if (question === "How do you say 'I'll call you later.' in Kannada?") {
    correctOption = "ನಾನು ನಿಮಗೆ ನಂತರ ಕರೆ ಮಾಡುತ್ತೇನೆ (naanu nimage nantara kare maaduttene)";
    incorrectOptions = [
      "ನನಗೆ ಕರೆ ಮಾಡಿ (nanage kare maadi) - Call me",
      "ನಾನು ನಿಮಗೆ ಮತ್ತೆ ಕರೆ ಮಾಡುವುದಿಲ್ಲ (naanu nimage matte kare maaduvudilla) - I won't call you again",
      "ನೀವು ನನಗೆ ಕರೆ ಮಾಡಿ (neevu nanage kare maadi) - You call me"
    ];
  }
  else if (question === "How do you say 'Let's go to a restaurant.' in Kannada?") {
    correctOption = "ನಾವು ಉಪಾಹಾರ ಗೃಹಕ್ಕೆ ಹೋಗೋಣ (naavu upahaara gruhakke hogona)";
    incorrectOptions = [
      "ನೀವು ಹೊರಗೆ ಊಟ ಮಾಡುತ್ತೀರಾ? (neevu horage oota maadutteeraa?) - Do you eat outside?",
      "ನಾನು ಊಟಕ್ಕೆ ಹೋಗುತ್ತೇನೆ (naanu ootakke hoguttene) - I'm going for food",
      "ನಿಮಗೆ ಹಸಿವಾಗಿದೆಯೇ? (nimage hasivaagideye?) - Are you hungry?"
    ];
  }
  else if (question === "How do you say 'Do you have any plans?' in Kannada?") {
    correctOption = "ನಿಮಗೆ ಯಾವುದಾದರೂ ಯೋಜನೆಗಳಿವೆಯೇ? (nimage yaavudaadaru yojanelaiveye?)";
    incorrectOptions = [
      "ನೀವು ಏನು ಮಾಡುತ್ತಿದ್ದೀರಿ? (neevu enu maaduttiddeeri?) - What are you doing?",
      "ನಿಮಗೆ ಸಮಯವಿದೆಯೇ? (nimage samayavideye?) - Do you have time?",
      "ನಾವು ಭೇಟಿಯಾಗಬಹುದೇ? (naavu bhetiyaagabahudu?) - Can we meet?"
    ];
  }
  else if (question === "How do you say 'I'm busy today.' in Kannada?") {
    correctOption = "ನಾನು ಇಂದು ಕಾರ್ಯಮಗ್ನನಾಗಿದ್ದೇನೆ (naanu indu kaaryamagnanagiddene)";
    incorrectOptions = [
      "ನನಗೆ ಇಂದು ಸಮಯವಿಲ್ಲ (nanage indu samayavilla) - I don't have time today",
      "ನಾನು ಇಂದು ಖಾಲಿ ಇದ್ದೇನೆ (naanu indu khaali iddene) - I am free today",
      "ನಾನು ನಾಳೆ ಬರುತ್ತೇನೆ (naanu naale baruttene) - I'll come tomorrow"
    ];
  }
  else if (question === "How do you say 'I'll be there on time.' in Kannada?") {
    correctOption = "ನಾನು ಸರಿಯಾದ ಸಮಯಕ್ಕೆ ಅಲ್ಲಿರುತ್ತೇನೆ (naanu sariyaada samayakke alliruttene)";
    incorrectOptions = [
      "ನನಗೆ ತಡವಾಗುತ್ತದೆ (nanage tadavaaguttade) - I'll be late",
      "ನಾನು ಬರುವುದಿಲ್ಲ (naanu baruvudilla) - I won't come",
      "ನೀವು ನನಗಾಗಿ ಕಾಯಬೇಕು (neevu nanagaagi kaayabeku) - You need to wait for me"
    ];
  }
  else if (question === "How do you say 'See you soon.' in Kannada?") {
    correctOption = "ಶೀಘ್ರದಲ್ಲೇ ಸಿಗೋಣ (sheeghradallee sigona)";
    incorrectOptions = [
      "ಮತ್ತೆ ಸಿಗೋಣ (matte sigona) - See you again",
      "ನಾಳೆ ಸಿಗೋಣ (naale sigona) - See you tomorrow",
      "ಹೋಗಿ ಬರುತ್ತೇನೆ (hogi baruttene) - I'll go and come back"
    ];
  }
  else if (question === "How do you say 'Can you show me the way?' in Kannada?") {
    correctOption = "ನೀವು ನನಗೆ ದಾರಿ ತೋರಿಸಬಹುದೇ? (neevu nanage daari torisabahudeye?)";
    incorrectOptions = [
      "ದಾರಿ ಎಲ್ಲಿದೆ? (daari ellide?) - Where is the way?",
      "ನಾನು ಹೇಗೆ ಹೋಗಬೇಕು? (naanu hege hogabeku?) - How should I go?",
      "ಇದು ಸರಿಯಾದ ದಾರಿಯೇ? (idu sariyaada daariye?) - Is this the right way?"
    ];
  }
  else if (question === "How do you say 'I am lost.' in Kannada?") {
    correctOption = "ನಾನು ದಾರಿ ತಪ್ಪಿದ್ದೇನೆ (naanu daari tappiddene)";
    incorrectOptions = [
      "ನನಗೆ ದಾರಿ ಗೊತ್ತಿಲ್ಲ (nanage daari gottilla) - I don't know the way",
      "ನಾನು ಎಲ್ಲಿದ್ದೇನೆ? (naanu elliddene?) - Where am I?",
      "ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ (dayavittu sahaaya maadi) - Please help me"
    ];
  }
  else if (question === "How do you say 'Is it far?' in Kannada?") {
    correctOption = "ಅದು ದೂರವಿದೆಯೇ? (adu dooravideye?)";
    incorrectOptions = [
      "ಎಷ್ಟು ದೂರವಿದೆ? (eshtu dooravide?) - How far is it?",
      "ಹತ್ತಿರವಿದೆಯೇ? (hattiravideye?) - Is it near?",
      "ನಡೆದು ಹೋಗಬಹುದೇ? (nadedu hogabahudeye?) - Can I walk there?"
    ];
  }
  // Default case - if no specific handler is found, provide random options
  else {
    // Default to random options if no specific case matches
    console.log(`No specific handler for question: "${question}"`);
    correctOption = kannadaVowels[0];
    incorrectOptions = [kannadaVowels[1], kannadaVowels[2], kannadaVowels[3]];
  }
  
  return [
    { challengeId, text: correctOption, correct: true },
    { challengeId, text: incorrectOptions[0], correct: false },
    { challengeId, text: incorrectOptions[1], correct: false },
    { challengeId, text: incorrectOptions[2], correct: false },
  ];
}

/**
 * Creates the Kannada course
 */
export async function createKannadaCourse() {
  console.log("Creating Kannada course...");
  
  const [kannadaCourse] = await db.insert(schema.courses).values([
    { title: "Kannada", imageSrc: "/kan.svg" }
  ]).returning();
  
  console.log(`Created Kannada course (ID: ${kannadaCourse.id})`);
  return kannadaCourse;
}

/**
 * Creates Kannada units
 */
export async function createKannadaUnits(courseId: number) {
  console.log("Creating Kannada units...");
  
  const units = await db.insert(schema.units).values([
    {
      courseId: courseId,
      title: "Kannada Script",
      description: "Learn Kannada alphabet and writing system",
      order: 1,
    },
    {
      courseId: courseId,
      title: "Kannada Vocabulary",
      description: "Learn essential Kannada words and their meanings",
      order: 2,
    },
    {
      courseId: courseId,
      title: "Kannada Basic Grammar",
      description: "Learn fundamental Kannada grammar rules and sentence structure",
      order: 3,
    },
    {
      courseId: courseId,
      title: "Basic Conversations",
      description: "Learn everyday Kannada phrases",
      order: 4,
    }
  ]).returning();
  
  console.log(`Created ${units.length} Kannada units`);
  return units;
}

/**
 * Creates Kannada lessons
 */
export async function createKannadaLessons(units: any[]) {
  console.log("Creating Kannada lessons...");
  
  const scriptUnitId = units[0].id;
  const vocabularyUnitId = units[1].id;
  const grammarUnitId = units[2].id;
  const conversationsUnitId = units[3].id;
  
  const lessons = await db.insert(schema.lessons).values([
    // Kannada Script Unit
    { unitId: scriptUnitId, title: "Short Vowels (ಹ್ರಸ್ವ ಸ್ವರಗಳು)", order: 1 },
    { unitId: scriptUnitId, title: "Long Vowels (ದೀರ್ಘ ಸ್ವರಗಳು)", order: 2 },
    { unitId: scriptUnitId, title: "Compound Vowels (ಸಂಯುಕ್ತ ಸ್ವರಗಳು)", order: 3 },
    { unitId: scriptUnitId, title: "Velar Consonants (ಕವರ್ಗ)", order: 4 },
    { unitId: scriptUnitId, title: "Palatal Consonants (ಚವರ್ಗ)", order: 5 },
    { unitId: scriptUnitId, title: "Retroflex Consonants (ಟವರ್ಗ)", order: 6 },
    { unitId: scriptUnitId, title: "Dental Consonants (ತವರ್ಗ)", order: 7 },
    { unitId: scriptUnitId, title: "Labial Consonants (ಪವರ್ಗ)", order: 8 },
    { unitId: scriptUnitId, title: "Semivowels (ಅಂತಃಸ್ಥಗಳು)", order: 9 },
    { unitId: scriptUnitId, title: "Sibilants & Aspirate (ಊಷ್ಮಾಕ್ಷರಗಳು)", order: 10 },
    
    // Kannada Vocabulary Unit
    { unitId: vocabularyUnitId, title: "Common Nouns", order: 1 },
    { unitId: vocabularyUnitId, title: "Essential Verbs", order: 2 },
    { unitId: vocabularyUnitId, title: "Colors and Numbers", order: 3 },
    { unitId: vocabularyUnitId, title: "Family and Relationships", order: 4 },
    { unitId: vocabularyUnitId, title: "Food and Dining", order: 5 },
    
    // Kannada Grammar Unit
    { unitId: grammarUnitId, title: "Basic Sentence Structure", order: 1 },
    { unitId: grammarUnitId, title: "Pronouns", order: 2 },
    { unitId: grammarUnitId, title: "Present Tense", order: 3 },
    { unitId: grammarUnitId, title: "Past Tense", order: 4 },
    { unitId: grammarUnitId, title: "Future Tense", order: 5 },
    
    // Basic Conversations Unit
    { unitId: conversationsUnitId, title: "Greetings and Introductions", order: 1 },
    { unitId: conversationsUnitId, title: "Common Questions", order: 2 },
    { unitId: conversationsUnitId, title: "Daily Routine Phrases", order: 3 },
    { unitId: conversationsUnitId, title: "Expressions of Emotion", order: 4 },
    { unitId: conversationsUnitId, title: "Shopping and Transactions", order: 5 },
    { unitId: conversationsUnitId, title: "Giving and Asking for Directions", order: 6 },
    { unitId: conversationsUnitId, title: "Time and Date Expressions", order: 7 },
    { unitId: conversationsUnitId, title: "Travel and Transportation", order: 8 },
    { unitId: conversationsUnitId, title: "Health and Emergencies", order: 9 },
    { unitId: conversationsUnitId, title: "Making Plans and Arrangements", order: 10 }
  ]).returning();
  
  console.log(`Created ${lessons.length} Kannada lessons`);
  return lessons;
}

/**
 * Creates Kannada challenges for script lessons
 */
export async function createKannadaScriptChallenges(lessons: any[]) {
  console.log("Creating Kannada script challenges...");
  
  const challenges = await db.insert(schema.challenges).values([
    // Short Vowels
    { lessonId: lessons[0].id, type: "SELECT", question: "Which is the Kannada letter for short 'a'?", order: 1 },
    { lessonId: lessons[0].id, type: "SELECT", question: "Which is the Kannada letter for short 'i'?", order: 2 },
    { lessonId: lessons[0].id, type: "SELECT", question: "Which is the Kannada letter for short 'u'?", order: 3 },
    { lessonId: lessons[0].id, type: "SELECT", question: "Which is the Kannada letter for short 'e'?", order: 4 },
    { lessonId: lessons[0].id, type: "SELECT", question: "Which is the Kannada letter for short 'o'?", order: 5 },
    { lessonId: lessons[0].id, type: "SELECT", question: "What sound does 'ಅ' make?", order: 6 },
    { lessonId: lessons[0].id, type: "SELECT", question: "What sound does 'ಇ' make?", order: 7 },
    { lessonId: lessons[0].id, type: "SELECT", question: "What sound does 'ಉ' make?", order: 8 },
    { lessonId: lessons[0].id, type: "SELECT", question: "What sound does 'ಎ' make?", order: 9 },
    { lessonId: lessons[0].id, type: "SELECT", question: "What sound does 'ಒ' make?", order: 10 },
    
    // Long Vowels
    { lessonId: lessons[1].id, type: "SELECT", question: "Which is the Kannada letter for long 'aa'?", order: 1 },
    { lessonId: lessons[1].id, type: "SELECT", question: "Which is the Kannada letter for long 'ee'?", order: 2 },
    { lessonId: lessons[1].id, type: "SELECT", question: "Which is the Kannada letter for long 'oo'?", order: 3 },
    { lessonId: lessons[1].id, type: "SELECT", question: "What sound does 'ಆ' make?", order: 4 },
    { lessonId: lessons[1].id, type: "SELECT", question: "What sound does 'ಈ' make?", order: 5 },
    { lessonId: lessons[1].id, type: "SELECT", question: "What sound does 'ಊ' make?", order: 6 },
    { lessonId: lessons[1].id, type: "SELECT", question: "What sound does 'ಏ' make?", order: 7 },
    { lessonId: lessons[1].id, type: "SELECT", question: "What sound does 'ಓ' make?", order: 8 },
    { lessonId: lessons[1].id, type: "SELECT", question: "Which is longer: 'ಅ' or 'ಆ'?", order: 9 },
    { lessonId: lessons[1].id, type: "SELECT", question: "Which is longer: 'ಇ' or 'ಈ'?", order: 10 },
    
    // Compound Vowels
    { lessonId: lessons[2].id, type: "SELECT", question: "Which is the Kannada letter for 'ai'?", order: 1 },
    { lessonId: lessons[2].id, type: "SELECT", question: "Which is the Kannada letter for 'au'?", order: 2 },
    { lessonId: lessons[2].id, type: "SELECT", question: "What sound does 'ಐ' make?", order: 3 },
    { lessonId: lessons[2].id, type: "SELECT", question: "What sound does 'ಔ' make?", order: 4 },
    { lessonId: lessons[2].id, type: "SELECT", question: "Which is the combination of 'ಅ' and 'ಇ'?", order: 5 },
    { lessonId: lessons[2].id, type: "SELECT", question: "Which is the combination of 'ಅ' and 'ಉ'?", order: 6 },
    { lessonId: lessons[2].id, type: "SELECT", question: "Which is the combination of 'ಅ' and 'ಎ'?", order: 7 },
    { lessonId: lessons[2].id, type: "SELECT", question: "Which is the combination of 'ಅ' and 'ಒ'?", order: 8 },
    { lessonId: lessons[2].id, type: "SELECT", question: "What is 'ಐ' made of?", order: 9 },
    { lessonId: lessons[2].id, type: "SELECT", question: "What is 'ಔ' made of?", order: 10 },
  ]).returning();
  
  console.log(`Created ${challenges.length} Kannada script challenges`);
  return challenges;
}

/**
 * Creates options for Kannada challenges
 */
export async function createOptionsForKannadaChallenges(challenges: any[]) {
  console.log("Creating options for Kannada challenges...");
  
  const options = [];
  
  for (const challenge of challenges) {
    const challengeOptions = createKannadaOptions(challenge.id, challenge.question);
    options.push(...challengeOptions);
  }
  
  await addOptionsToDB(options);
  return options;
}

/**
 * Creates Kannada challenges for all lessons
 */
export async function createKannadaChallenges(lessons: any[]) {
  console.log("Creating Kannada challenges...");
  
  // Group lessons by their types for easier reference
  const scriptLessons = lessons.slice(0, 10);
  const vocabularyLessons = lessons.slice(10, 15);
  const grammarLessons = lessons.slice(15, 20);
  const conversationLessons = lessons.slice(20, 30); // Add this line for conversation lessons
  
  const scriptChallenges = await createKannadaScriptChallenges(scriptLessons);
  const vocabularyChallenges = await createKannadaVocabularyChallenges(vocabularyLessons);
  const grammarChallenges = await createKannadaGrammarChallenges(grammarLessons);
  const conversationChallenges = await createKannadaConversationChallenges(conversationLessons); // Add this line
  
  const allChallenges = [...scriptChallenges, ...vocabularyChallenges, ...grammarChallenges, ...conversationChallenges]; // Update this
  
  console.log(`Created ${allChallenges.length} total Kannada challenges`);
  return allChallenges;
}

/**
 * Creates Kannada vocabulary challenges
 */
export async function createKannadaVocabularyChallenges(lessons: any[]) {
  console.log("Creating Kannada vocabulary challenges...");
  
  // These should correspond to "Common Nouns", "Essential Verbs", "Colors and Numbers", etc.
  const commonNounsLesson = lessons[0];
  const essentialVerbsLesson = lessons[1];
  const colorsNumbersLesson = lessons[2];
  const familyRelationshipsLesson = lessons[3];
  const foodDiningLesson = lessons[4];
  
  const challenges = await db.insert(schema.challenges).values([
    // Common Nouns
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What is the Kannada word for 'book'?", order: 1 },
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What is the Kannada word for 'house'?", order: 2 },
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What is the Kannada word for 'water'?", order: 3 },
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What is the Kannada word for 'food'?", order: 4 },
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What is the Kannada word for 'work'?", order: 5 },
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What does 'ಪುಸ್ತಕ' mean?", order: 6 },
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What does 'ಮನೆ' mean?", order: 7 },
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What does 'ನೀರು' mean?", order: 8 },
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What does 'ಆಹಾರ' mean?", order: 9 },
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What does 'ಕೆಲಸ' mean?", order: 10 },
    
    // Essential Verbs
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What is the Kannada verb for 'to eat'?", order: 1 },
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What is the Kannada verb for 'to go'?", order: 2 },
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What is the Kannada verb for 'to read'?", order: 3 },
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What is the Kannada verb for 'to write'?", order: 4 },
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What is the Kannada verb for 'to do'?", order: 5 },
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What does 'ತಿನ್ನು' mean?", order: 6 },
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What does 'ಹೋಗು' mean?", order: 7 },
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What does 'ಓದು' mean?", order: 8 },
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What does 'ಬರೆ' mean?", order: 9 },
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What does 'ಮಾಡು' mean?", order: 10 },
    
    // Colors and Numbers
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What is the Kannada word for 'red'?", order: 1 },
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What is the Kannada word for 'blue'?", order: 2 },
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What is the Kannada word for 'one'?", order: 3 },
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What is the Kannada word for 'two'?", order: 4 },
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What is the Kannada word for 'three'?", order: 5 },
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What does 'ಕೆಂಪು' mean?", order: 6 },
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What does 'ನೀಲಿ' mean?", order: 7 },
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What does 'ಒಂದು' mean?", order: 8 },
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What does 'ಎರಡು' mean?", order: 9 },
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What does 'ಮೂರು' mean?", order: 10 },
    
    // Family and Relationships
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What is the Kannada word for 'mother'?", order: 1 },
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What is the Kannada word for 'father'?", order: 2 },
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What is the Kannada word for 'elder sister'?", order: 3 },
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What is the Kannada word for 'elder brother'?", order: 4 },
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What is the Kannada word for 'younger brother'?", order: 5 },
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What does 'ಅಮ್ಮ' mean?", order: 6 },
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What does 'ಅಪ್ಪ' mean?", order: 7 },
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What does 'ಅಕ್ಕ' mean?", order: 8 },
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What does 'ಅಣ್ಣ' mean?", order: 9 },
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What does 'ತಮ್ಮ' mean?", order: 10 },
    
    // Food and Dining
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What is the Kannada word for 'rice'?", order: 1 },
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What is the Kannada word for 'vegetable'?", order: 2 },
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What is the Kannada word for 'spicy'?", order: 3 },
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What is the Kannada word for 'sweet'?", order: 4 },
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What is the Kannada word for 'to cook'?", order: 5 },
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What does 'ಅನ್ನ' mean?", order: 6 },
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What does 'ತರಕಾರಿ' mean?", order: 7 },
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What does 'ಖಾರ' mean?", order: 8 },
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What does 'ಸಿಹಿ' mean?", order: 9 },
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What does 'ಅಡಿಗೆ ಮಾಡು' mean?", order: 10 },
  ]).returning();
  
  console.log(`Created ${challenges.length} Kannada vocabulary challenges`);
  return challenges;
}

/**
 * Creates Kannada grammar challenges
 */
export async function createKannadaGrammarChallenges(lessons: any[]) {
  console.log("Creating Kannada grammar challenges...");
  
  // These should correspond to "Basic Sentence Structure", "Pronouns", "Present Tense", etc.
  const sentenceStructureLesson = lessons[0];
  const pronounsLesson = lessons[1];
  const presentTenseLesson = lessons[2];
  const pastTenseLesson = lessons[3];
  const futureTenseLesson = lessons[4];
  
  const challenges = await db.insert(schema.challenges).values([
    // Basic Sentence Structure
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "In Kannada, what is the typical word order?", order: 1 },
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "How do you say 'This is a book' in Kannada?", order: 2 },
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "How do you say 'I am eating food' in Kannada?", order: 3 },
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "How are questions formed in Kannada?", order: 4 },
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "How do you say 'What is this?' in Kannada?", order: 5 },
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "What is the role of 'ಆಗಿ' in Kannada sentences?", order: 6 },
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "What is the role of 'ಗೆ' in Kannada sentences?", order: 7 },
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "What is the role of 'ಅಲ್ಲಿ' in Kannada sentences?", order: 8 },
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "How do you form a negative sentence in Kannada?", order: 9 },
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "How do you say 'I don't know' in Kannada?", order: 10 },
    
    // Pronouns
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What is the Kannada word for 'I'?", order: 1 },
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What is the Kannada word for 'you' (informal)?", order: 2 },
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What is the Kannada word for 'he'?", order: 3 },
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What is the Kannada word for 'she'?", order: 4 },
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What is the Kannada word for 'they'?", order: 5 },
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What does 'ನಾನು' mean?", order: 6 },
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What does 'ನೀನು' mean?", order: 7 },
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What does 'ಅವನು' mean?", order: 8 },
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What does 'ಅವಳು' mean?", order: 9 },
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What does 'ಅವರು' mean?", order: 10 },
    
    // Present Tense
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'I am' in Kannada?", order: 1 },
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'You are' in Kannada?", order: 2 },
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'He is' in Kannada?", order: 3 },
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'She is' in Kannada?", order: 4 },
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'They are' in Kannada?", order: 5 },
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'I am eating' in Kannada?", order: 6 },
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'You are reading' in Kannada?", order: 7 },
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'He is going' in Kannada?", order: 8 },
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'She is writing' in Kannada?", order: 9 },
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'They are working' in Kannada?", order: 10 },
    
    // Past Tense
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "How do you form the past tense in Kannada?", order: 1 },
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "How do you say 'I ate' in Kannada?", order: 2 },
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "How do you say 'You went' in Kannada?", order: 3 },
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "How do you say 'He read' in Kannada?", order: 4 },
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "How do you say 'She wrote' in Kannada?", order: 5 },
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "How do you say 'They worked' in Kannada?", order: 6 },
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "What is the past tense marker in Kannada?", order: 7 },
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "How do irregular verbs form the past tense in Kannada?", order: 8 },
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "How do you say 'I didn't eat' in Kannada?", order: 9 },
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "How do you say 'Did you go?' in Kannada?", order: 10 },
    
    // Future Tense
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "How do you form the future tense in Kannada?", order: 1 },
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "How do you say 'I will eat' in Kannada?", order: 2 },
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "How do you say 'You will go' in Kannada?", order: 3 },
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "How do you say 'He will read' in Kannada?", order: 4 },
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "How do you say 'She will write' in Kannada?", order: 5 },
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "How do you say 'They will work' in Kannada?", order: 6 },
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "What is the future tense marker in Kannada?", order: 7 },
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "How do irregular verbs form the future tense in Kannada?", order: 8 },
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "How do you say 'I will not eat' in Kannada?", order: 9 },
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "How do you say 'Will you go?' in Kannada?", order: 10 },
  ]).returning();
  
  console.log(`Created ${challenges.length} Kannada grammar challenges`);
  return challenges;
}

/**
 * Creates Kannada conversation challenges
 */
export async function createKannadaConversationChallenges(lessons: any[]) {
  console.log("Creating Kannada conversation challenges...");
  
  // Get the conversation lessons
  const greetingsLesson = lessons[0];
  const commonQuestionsLesson = lessons[1];
  const dailyRoutineLesson = lessons[2];
  const expressionsEmotionLesson = lessons[3];
  const shoppingLesson = lessons[4]; 
  const directionsLesson = lessons[5];
  const timeLesson = lessons[6];
  const travelLesson = lessons[7];
  const healthLesson = lessons[8];
  const plansLesson = lessons[9];
  
  const challenges = await db.insert(schema.challenges).values([
    // Greetings and Introductions
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'How are you?' in Kannada?", order: 1 },
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'I am fine.' in Kannada?", order: 2 },
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'What is your name?' in Kannada?", order: 3 },
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'My name is [name].' in Kannada?", order: 4 },
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'Send a message.' in Kannada?", order: 5 },
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'Come here.' in Kannada?", order: 6 },
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'Come immediately.' in Kannada?", order: 7 },
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'Who is at your house?' in Kannada?", order: 8 },
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'Can you speak Kannada?' in Kannada?", order: 9 },
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'I can speak a little.' in Kannada?", order: 10 },
    
    // Common Questions
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'Where are you going?' in Kannada?", order: 1 },
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'When will you come?' in Kannada?", order: 2 },
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'Whose is this?' in Kannada?", order: 3 },
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'What are you doing?' in Kannada?", order: 4 },
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'How much is this?' in Kannada?", order: 5 },
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'What happened today?' in Kannada?", order: 6 },
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'How do you know?' in Kannada?", order: 7 },
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'Do you like it?' in Kannada?", order: 8 },
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'Whom should I tell?' in Kannada?", order: 9 },
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'Can I do it?' in Kannada?", order: 10 },
    
    // Daily Routine Phrases
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'Did you eat?' in Kannada?", order: 1 },
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'Did you wake up?' in Kannada?", order: 2 },
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'Is the work finished?' in Kannada?", order: 3 },
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'Did you take a bath?' in Kannada?", order: 4 },
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'What time is it?' in Kannada?", order: 5 },
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'When will you go?' in Kannada?", order: 6 },
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'Are you at home?' in Kannada?", order: 7 },
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'Please do this work.' in Kannada?", order: 8 },
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'Get ready.' in Kannada?", order: 9 },
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'Where is he?' in Kannada?", order: 10 },
    
    // Expressions of Emotion
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'I don't know.' in Kannada?", order: 1 },
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'I like it.' in Kannada?", order: 2 },
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'I am angry.' in Kannada?", order: 3 },
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'That is very nice.' in Kannada?", order: 4 },
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'I need to say something.' in Kannada?", order: 5 },
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'I feel sad.' in Kannada?", order: 6 },
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'You are very good.' in Kannada?", order: 7 },
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'I like you.' in Kannada?", order: 8 },
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'Be happy.' in Kannada?", order: 9 },
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'I couldn't sleep.' in Kannada?", order: 10 },
    
    // Shopping and Transactions
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'Tell me after weighing this.' in Kannada?", order: 1 },
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'Reduce this a little.' in Kannada?", order: 2 },
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'I want to buy this.' in Kannada?", order: 3 },
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'Where can I find it?' in Kannada?", order: 4 },
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'I don't need this.' in Kannada?", order: 5 },
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'How much does this cost?' in Kannada?", order: 6 },
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'Do you have change?' in Kannada?", order: 7 },
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'Can I pay by card?' in Kannada?", order: 8 },
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'It's too expensive.' in Kannada?", order: 9 },
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'Do you have any discounts?' in Kannada?", order: 10 },
    
    // Giving and Asking for Directions
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'Where is the bus station?' in Kannada?", order: 1 },
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'Go straight ahead.' in Kannada?", order: 2 },
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'Turn right.' in Kannada?", order: 3 },
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'Turn left.' in Kannada?", order: 4 },
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'It's far from here.' in Kannada?", order: 5 },
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'It's near.' in Kannada?", order: 6 },
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'Can you show me the way?' in Kannada?", order: 7 },
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'I am lost.' in Kannada?", order: 8 },
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'Is it far?' in Kannada?", order: 9 },
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'How much time will it take?' in Kannada?", order: 10 },
    
    // Time and Date Expressions
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'What time is it now?' in Kannada?", order: 1 },
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'It's 2 o'clock.' in Kannada?", order: 2 },
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'What is the date today?' in Kannada?", order: 3 },
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'I'll meet you tomorrow.' in Kannada?", order: 4 },
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'Let's meet next week.' in Kannada?", order: 5 },
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'Are you free now?' in Kannada?", order: 6 },
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'I'm running late.' in Kannada?", order: 7 },
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'Wait for five minutes.' in Kannada?", order: 8 },
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'I'll be back soon.' in Kannada?", order: 9 },
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'Let's meet tomorrow.' in Kannada?", order: 10 },
    
    // Travel and Transportation
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'Where is the train station?' in Kannada?", order: 1 },
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'When does the bus leave?' in Kannada?", order: 2 },
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'How much is the ticket?' in Kannada?", order: 3 },
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'Is this the right bus?' in Kannada?", order: 4 },
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'Please stop here.' in Kannada?", order: 5 },
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'I want to go to the market.' in Kannada?", order: 6 },
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'How far is it?' in Kannada?", order: 7 },
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'Call a taxi, please.' in Kannada?", order: 8 },
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'Is there a direct bus?' in Kannada?", order: 9 },
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'I need to change buses.' in Kannada?", order: 10 },
    
    // Health and Emergencies
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'I don't feel well.' in Kannada?", order: 1 },
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'I need a doctor.' in Kannada?", order: 2 },
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'Where is the hospital?' in Kannada?", order: 3 },
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'I have a headache.' in Kannada?", order: 4 },
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'Call an ambulance.' in Kannada?", order: 5 },
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'I need medicine.' in Kannada?", order: 6 },
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'Where is the pharmacy?' in Kannada?", order: 7 },
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'I'm allergic to this.' in Kannada?", order: 8 },
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'Help me, please.' in Kannada?", order: 9 },
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'I'm feeling better now.' in Kannada?", order: 10 },
    
    // Making Plans and Arrangements
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'Let's meet tomorrow.' in Kannada?", order: 1 },
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'Are you free this weekend?' in Kannada?", order: 2 },
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'Would you like to join us?' in Kannada?", order: 3 },
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'What time should we meet?' in Kannada?", order: 4 },
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'I'll call you later.' in Kannada?", order: 5 },
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'Let's go to a restaurant.' in Kannada?", order: 6 },
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'Do you have any plans?' in Kannada?", order: 7 },
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'I'm busy today.' in Kannada?", order: 8 },
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'I'll be there on time.' in Kannada?", order: 9 },
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'See you soon.' in Kannada?", order: 10 }
  ]).returning();
  
  console.log(`Created ${challenges.length} Kannada conversation challenges`);
  return challenges;
}

/**
 * Main function to seed Kannada data
 */
export async function seedKannadaData() {
  console.log("🌱 Starting Kannada data seeding...");
  
  try {
    // Create course, units, lessons, and challenges
    const kannadaCourse = await createKannadaCourse();
    const kannadaUnits = await createKannadaUnits(kannadaCourse.id);
    const kannadaLessons = await createKannadaLessons(kannadaUnits);
    const kannadaChallenges = await createKannadaChallenges(kannadaLessons);
    
    // Create options for challenges
    await createOptionsForKannadaChallenges(kannadaChallenges);
    
    console.log("✅ Kannada data seeding completed");
    return {
      course: kannadaCourse,
      units: kannadaUnits,
      lessons: kannadaLessons,
      challenges: kannadaChallenges
    };
  } catch (error) {
    console.error("❌ Kannada data seeding failed:", error);
    throw error;
  }
} 