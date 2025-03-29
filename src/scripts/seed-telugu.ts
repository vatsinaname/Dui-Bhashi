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
 * Helper function to generate options for Telugu challenges
 */
export function createTeluguOptions(challengeId: number, question: string) {
  const isAboutSound = question.toLowerCase().includes("sound");
  const isAboutLetter = question.toLowerCase().includes("letter");
  const isAboutWord = question.toLowerCase().includes("word") || question.toLowerCase().includes("mean");
  const isAboutVerb = question.toLowerCase().includes("verb");
  const isAboutGrammar = question.toLowerCase().includes("grammar") || question.toLowerCase().includes("tense") || question.toLowerCase().includes("sentence");
  
  // Telugu characters for options
  const teluguVowels = ["అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ", "ఋ", "ౠ", "ఎ", "ఏ", "ఐ", "ఒ", "ఓ", "ఔ"];
  const teluguConsonants = ["క", "ఖ", "గ", "ఘ", "ఙ", "చ", "ఛ", "జ", "ఝ", "ఞ", "ట", "ఠ", "డ", "ఢ", "ణ", "త", "థ", "ద", "ధ", "న", "ప", "ఫ", "బ", "భ", "మ", "య", "ర", "ల", "వ", "శ", "ష", "స", "హ", "ళ", "క్ష", "ఱ"];
  
  // Common Telugu words for vocabulary options
  const teluguNouns = ["పుస్తకం (pustakam) - book", "ఇల్లు (illu) - house", "పని (pani) - work", "నీరు (neeru) - water", "భోజనం (bhojanam) - food"];
  const teluguVerbs = ["చేయు (cheyu) - to do", "తిను (tinu) - to eat", "వెళ్ళు (vellu) - to go", "చదువు (chaduvu) - to read", "రాయు (raayu) - to write"];
  const teluguColors = ["ఎరుపు (erupu) - red", "నీలం (neelam) - blue", "పచ్చ (paccha) - green", "పసుపు (pasupu) - yellow", "నలుపు (nalupu) - black"];
  const teluguNumbers = ["ఒకటి (okati) - one", "రెండు (rendu) - two", "మూడు (moodu) - three", "నాలుగు (naalugu) - four", "అయిదు (ayidu) - five"];
  const teluguFamilyTerms = ["అమ్మ (amma) - mother", "నాన్న (naanna) - father", "అక్క (akka) - elder sister", "అన్న (anna) - elder brother", "తమ్ముడు (thammudu) - younger brother"];
  
  // Grammar-related options
  const teluguPronouns = ["నేను (nenu) - I", "నువ్వు (nuvvu) - you", "అతను (atanu) - he", "ఆమె (aame) - she", "వారు (vaaru) - they"];
  const teluguTenses = ["వర్తమాన కాలం (vartamaana kaalam) - present tense", "భూత కాలం (bhuta kaalam) - past tense", "భవిష్యత్ కాలం (bhavishyat kaalam) - future tense"];
  
  let correctOption = "";
  let incorrectOptions: string[] = [];
  
  // Handle specific cases based on the question
  if (isAboutLetter && question.toLowerCase().includes("long 'aa'")) {
    correctOption = "ఆ";
    incorrectOptions = ["అ", "ఇ", "ఈ"];
  } 
  else if (isAboutLetter && question.toLowerCase().includes("short 'a'")) {
    correctOption = "అ";
    incorrectOptions = [teluguVowels[1], teluguVowels[2], teluguVowels[3]];
  }
  else if (isAboutLetter && question.toLowerCase().includes("short 'i'")) {
    correctOption = "ఇ";
    incorrectOptions = ["అ", "ఈ", "ఉ"];
  }
  else if (isAboutLetter && question.toLowerCase().includes("short 'u'")) {
    correctOption = "ఉ";
    incorrectOptions = ["అ", "ఇ", "ఊ"];
  }
  else if (isAboutLetter && question.toLowerCase().includes("short 'e'")) {
    correctOption = "ఎ";
    incorrectOptions = ["అ", "ఏ", "ఒ"];
  }
  else if (isAboutLetter && question.toLowerCase().includes("short 'o'")) {
    correctOption = "ఒ";
    incorrectOptions = ["అ", "ఎ", "ఓ"];
  }
  else if (isAboutSound && question.includes("అ")) {
    correctOption = "Short 'a'";
    incorrectOptions = ["Long 'aa'", "Short 'i'", "Long 'ee'"];
  }
  else if (isAboutSound && question.includes("ఇ")) {
    correctOption = "Short 'i'";
    incorrectOptions = ["Long 'ee'", "Short 'a'", "Short 'u'"];
  }
  else if (isAboutSound && question.includes("ఉ")) {
    correctOption = "Short 'u'";
    incorrectOptions = ["Long 'oo'", "Short 'a'", "Short 'i'"];
  }
  else if (isAboutSound && question.includes("ఎ")) {
    correctOption = "Short 'e'";
    incorrectOptions = ["Long 'ae'", "Short 'a'", "Short 'o'"];
  }
  else if (isAboutSound && question.includes("ఒ")) {
    correctOption = "Short 'o'";
    incorrectOptions = ["Long 'o'", "Short 'a'", "Short 'e'"];
  }
  else if (isAboutLetter && question.toLowerCase().includes("long 'ee'")) {
    correctOption = "ఈ";
    incorrectOptions = ["ఇ", "ఉ", "ఊ"];
  }
  else if (isAboutLetter && question.toLowerCase().includes("long 'oo'")) {
    correctOption = "ఊ";
    incorrectOptions = ["ఉ", "ఇ", "ఈ"];
  }
  else if (isAboutSound && question.includes("ఆ")) {
    correctOption = "Long 'aa'";
    incorrectOptions = ["Short 'a'", "Long 'ee'", "Short 'i'"];
  }
  else if (isAboutSound && question.includes("ఈ")) {
    correctOption = "Long 'ee'";
    incorrectOptions = ["Short 'i'", "Long 'aa'", "Short 'e'"];
  }
  else if (isAboutSound && question.includes("ఊ")) {
    correctOption = "Long 'oo'";
    incorrectOptions = ["Short 'u'", "Long 'ee'", "Short 'o'"];
  }
  else if (isAboutSound && question.includes("ఏ")) {
    correctOption = "Long 'ae'";
    incorrectOptions = ["Short 'e'", "Long 'aa'", "Short 'a'"];
  }
  else if (isAboutSound && question.includes("ఓ")) {
    correctOption = "Long 'o'";
    incorrectOptions = ["Short 'o'", "Long 'oo'", "Short 'u'"];
  }
  else if (isAboutLetter && question.toLowerCase().includes("letter for 'ai'")) {
    correctOption = "ఐ";
    incorrectOptions = ["ఆ", "ఈ", "ఔ"];
  }
  else if (isAboutLetter && question.toLowerCase().includes("letter for 'au'")) {
    correctOption = "ఔ";
    incorrectOptions = ["ఆ", "ఐ", "ఓ"];
  }
  else if (isAboutSound && question.includes("ఐ")) {
    correctOption = "ai (as in 'aisle')";
    incorrectOptions = ["a (as in 'cat')", "ee (as in 'feel')", "au (as in 'cow')"];
  }
  else if (isAboutSound && question.includes("ఔ")) {
    correctOption = "au (as in 'cow')";
    incorrectOptions = ["o (as in 'go')", "ai (as in 'aisle')", "aa (as in 'father')"];
  }
  else if (question.toLowerCase().includes("which is longer")) {
    if (question.includes("అ") && question.includes("ఆ")) {
      correctOption = "ఆ";
      incorrectOptions = ["అ", "They are the same length", "Neither - they represent different sounds"];
    }
    else if (question.includes("ఇ") && question.includes("ఈ")) {
      correctOption = "ఈ";
      incorrectOptions = ["ఇ", "They are the same length", "Neither - they represent different sounds"];
    }
  }
  else if (question.toLowerCase().includes("combination of 'అ' and 'ఇ'")) {
    correctOption = "ఐ";
    incorrectOptions = ["ఔ", "ఏ", "ఓ"];
  }
  else if (question.toLowerCase().includes("combination of 'అ' and 'ఉ'")) {
    correctOption = "ఔ";
    incorrectOptions = ["ఐ", "ఏ", "ఓ"];
  }
  else if (question.toLowerCase().includes("combination of 'అ' and 'ఎ'")) {
    correctOption = "ఐ";
    incorrectOptions = ["ఏ", "ఔ", "ఓ"];
  }
  else if (question.toLowerCase().includes("combination of 'అ' and 'ఒ'")) {
    correctOption = "ఔ";
    incorrectOptions = ["ఐ", "ఏ", "ఓ"];
  }
  else if (question.toLowerCase().includes("what is 'ఐ' made of")) {
    correctOption = "It's a combination of 'అ' and 'ఇ'";
    incorrectOptions = [
      "It's a combination of 'అ' and 'ఉ'",
      "It's a combination of 'అ' and 'ఎ'",
      "It's a unique vowel not made from combinations"
    ];
  }
  else if (question.toLowerCase().includes("what is 'ఔ' made of")) {
    correctOption = "It's a combination of 'అ' and 'ఉ'";
    incorrectOptions = [
      "It's a combination of 'అ' and 'ఇ'", 
      "It's a combination of 'అ' and 'ఒ'",
      "It's a unique vowel not made from combinations"
    ];
  }
  else if (isAboutLetter && question.toLowerCase().includes("క")) {
    correctOption = "క (ka)";
    incorrectOptions = ["ఖ (kha)", "గ (ga)", "ఘ (gha)"];
  }
  else if (isAboutLetter && question.toLowerCase().includes("ఖ")) {
    correctOption = "ఖ (kha)";
    incorrectOptions = ["క (ka)", "గ (ga)", "ఘ (gha)"];
  }
  else if (isAboutLetter && question.toLowerCase().includes("గ")) {
    correctOption = "గ (ga)";
    incorrectOptions = ["క (ka)", "ఖ (kha)", "ఘ (gha)"];
  }
  else if (isAboutLetter && question.toLowerCase().includes("ఘ")) {
    correctOption = "ఘ (gha)";
    incorrectOptions = ["క (ka)", "ఖ (kha)", "గ (ga)"];
  }
  // Vocabulary-related options
  else if (isAboutWord && question.toLowerCase().includes("book")) {
    correctOption = "పుస్తకం (pustakam)";
    incorrectOptions = ["ఇల్లు (illu) - house", "పని (pani) - work", "నీరు (neeru) - water"];
  }
  else if (isAboutWord && question.toLowerCase().includes("house")) {
    correctOption = "ఇల్లు (illu)";
    incorrectOptions = ["పుస్తకం (pustakam) - book", "పని (pani) - work", "నీరు (neeru) - water"];
  }
  else if (isAboutWord && question.toLowerCase().includes("water")) {
    correctOption = "నీరు (neeru)";
    incorrectOptions = ["పుస్తకం (pustakam) - book", "ఇల్లు (illu) - house", "భోజనం (bhojanam) - food"];
  }
  else if (isAboutWord && question.toLowerCase().includes("food")) {
    correctOption = "భోజనం (bhojanam)";
    incorrectOptions = ["పుస్తకం (pustakam) - book", "ఇల్లు (illu) - house", "పని (pani) - work"];
  }
  else if (isAboutWord && question.toLowerCase().includes("work")) {
    correctOption = "పని (pani)";
    incorrectOptions = ["పుస్తకం (pustakam) - book", "ఇల్లు (illu) - house", "నీరు (neeru) - water"];
  }
  else if (question.toLowerCase().includes("what does 'పుస్తకం' mean")) {
    correctOption = "Book";
    incorrectOptions = ["House", "Water", "Work"];
  }
  else if (question.toLowerCase().includes("what does 'ఇల్లు' mean")) {
    correctOption = "House";
    incorrectOptions = ["Book", "Water", "Food"];
  }
  else if (question.toLowerCase().includes("what does 'నీరు' mean")) {
    correctOption = "Water";
    incorrectOptions = ["Book", "House", "Food"];
  }
  else if (question.toLowerCase().includes("what does 'భోజనం' mean")) {
    correctOption = "Food";
    incorrectOptions = ["Book", "House", "Water"];
  }
  else if (question.toLowerCase().includes("what does 'పని' mean")) {
    correctOption = "Work";
    incorrectOptions = ["Book", "House", "Water"];
  }
  else if (isAboutVerb && question.toLowerCase().includes("eat")) {
    correctOption = "తిను (tinu)";
    incorrectOptions = ["చేయు (cheyu) - to do", "వెళ్ళు (vellu) - to go", "చదువు (chaduvu) - to read"];
  }
  else if (isAboutVerb && question.toLowerCase().includes("go")) {
    correctOption = "వెళ్ళు (vellu)";
    incorrectOptions = ["చేయు (cheyu) - to do", "తిను (tinu) - to eat", "చదువు (chaduvu) - to read"];
  }
  else if (isAboutVerb && question.toLowerCase().includes("read")) {
    correctOption = "చదువు (chaduvu)";
    incorrectOptions = ["చేయు (cheyu) - to do", "తిను (tinu) - to eat", "వెళ్ళు (vellu) - to go"];
  }
  else if (isAboutVerb && question.toLowerCase().includes("write")) {
    correctOption = "రాయు (raayu)";
    incorrectOptions = ["చేయు (cheyu) - to do", "తిను (tinu) - to eat", "వెళ్ళు (vellu) - to go"];
  }
  else if (isAboutVerb && question.toLowerCase().includes("do")) {
    correctOption = "చేయు (cheyu)";
    incorrectOptions = ["తిను (tinu) - to eat", "వెళ్ళు (vellu) - to go", "చదువు (chaduvu) - to read"];
  }
  else if (question.toLowerCase().includes("what does 'తిను' mean")) {
    correctOption = "To eat";
    incorrectOptions = ["To go", "To read", "To write"];
  }
  else if (question.toLowerCase().includes("what does 'వెళ్ళు' mean")) {
    correctOption = "To go";
    incorrectOptions = ["To eat", "To read", "To write"];
  }
  else if (question.toLowerCase().includes("what does 'చదువు' mean")) {
    correctOption = "To read";
    incorrectOptions = ["To eat", "To go", "To write"];
  }
  else if (question.toLowerCase().includes("what does 'రాయు' mean")) {
    correctOption = "To write";
    incorrectOptions = ["To eat", "To go", "To read"];
  }
  else if (question.toLowerCase().includes("what does 'చేయు' mean")) {
    correctOption = "To do";
    incorrectOptions = ["To eat", "To go", "To read"];
  }
  else if (isAboutWord && question.toLowerCase().includes("red")) {
    correctOption = "ఎరుపు (erupu)";
    incorrectOptions = ["నీలం (neelam) - blue", "పచ్చ (paccha) - green", "పసుపు (pasupu) - yellow"];
  }
  else if (isAboutWord && question.toLowerCase().includes("blue")) {
    correctOption = "నీలం (neelam)";
    incorrectOptions = ["ఎరుపు (erupu) - red", "పచ్చ (paccha) - green", "పసుపు (pasupu) - yellow"];
  }
  else if (isAboutWord && question.toLowerCase().includes("one")) {
    correctOption = "ఒకటి (okati)";
    incorrectOptions = ["రెండు (rendu) - two", "మూడు (moodu) - three", "నాలుగు (naalugu) - four"];
  }
  else if (isAboutWord && question.toLowerCase().includes("two")) {
    correctOption = "రెండు (rendu)";
    incorrectOptions = ["ఒకటి (okati) - one", "మూడు (moodu) - three", "నాలుగు (naalugu) - four"];
  }
  else if (isAboutWord && question.toLowerCase().includes("three")) {
    correctOption = "మూడు (moodu)";
    incorrectOptions = ["ఒకటి (okati) - one", "రెండు (rendu) - two", "నాలుగు (naalugu) - four"];
  }
  else if (question.toLowerCase().includes("what does 'ఎరుపు' mean")) {
    correctOption = "Red";
    incorrectOptions = ["Blue", "Green", "Yellow"];
  }
  else if (question.toLowerCase().includes("what does 'నీలం' mean")) {
    correctOption = "Blue";
    incorrectOptions = ["Red", "Green", "Yellow"];
  }
  else if (question.toLowerCase().includes("what does 'ఒకటి' mean")) {
    correctOption = "One";
    incorrectOptions = ["Two", "Three", "Four"];
  }
  else if (question.toLowerCase().includes("what does 'రెండు' mean")) {
    correctOption = "Two";
    incorrectOptions = ["One", "Three", "Four"];
  }
  else if (question.toLowerCase().includes("what does 'మూడు' mean")) {
    correctOption = "Three";
    incorrectOptions = ["One", "Two", "Four"];
  }
  else if (question.toLowerCase().includes("what is the telugu word for 'father'")) {
    correctOption = "నాన్న (naanna)";
    incorrectOptions = ["అమ్మ (amma) - mother", "అక్క (akka) - elder sister", "అన్న (anna) - elder brother"];
  }
  else if (question.toLowerCase().includes("what is the telugu word for 'elder sister'")) {
    correctOption = "అక్క (akka)";
    incorrectOptions = ["అమ్మ (amma) - mother", "నాన్న (naanna) - father", "అన్న (anna) - elder brother"];
  }
  else if (question.toLowerCase().includes("what is the telugu word for 'elder brother'")) {
    correctOption = "అన్న (anna)";
    incorrectOptions = ["అమ్మ (amma) - mother", "నాన్న (naanna) - father", "అక్క (akka) - elder sister"];
  }
  else if (question.toLowerCase().includes("what is the telugu word for 'younger brother'")) {
    correctOption = "తమ్ముడు (thammudu)";
    incorrectOptions = ["అమ్మ (amma) - mother", "నాన్న (naanna) - father", "అక్క (akka) - elder sister"];
  }
  else if (question.toLowerCase().includes("what does 'అమ్మ' mean")) {
    correctOption = "Mother";
    incorrectOptions = ["Father", "Elder sister", "Elder brother"];
  }
  else if (question.toLowerCase().includes("what does 'నాన్న' mean")) {
    correctOption = "Father";
    incorrectOptions = ["Mother", "Elder sister", "Elder brother"];
  }
  else if (question.toLowerCase().includes("what does 'అక్క' mean")) {
    correctOption = "Elder sister";
    incorrectOptions = ["Mother", "Father", "Elder brother"];
  }
  else if (question.toLowerCase().includes("what does 'అన్న' mean")) {
    correctOption = "Elder brother";
    incorrectOptions = ["Mother", "Father", "Elder sister"];
  }
  else if (question.toLowerCase().includes("what does 'తమ్ముడు' mean")) {
    correctOption = "Younger brother";
    incorrectOptions = ["Mother", "Father", "Elder sister"];
  }
  else if (isAboutWord && question.toLowerCase().includes("mother")) {
    correctOption = "అమ్మ (amma)";
    incorrectOptions = ["నాన్న (naanna) - father", "అక్క (akka) - elder sister", "అన్న (anna) - elder brother"];
  }
  // Grammar-related options
  else if (question.toLowerCase().includes("word order")) {
    correctOption = "Subject-Object-Verb (SOV)";
    incorrectOptions = ["Subject-Verb-Object (SVO)", "Verb-Subject-Object (VSO)", "Object-Subject-Verb (OSV)"];
  } 
  else if (question.toLowerCase().includes("this is a book")) {
    correctOption = "ఇది ఒక పుస్తకం (idi oka pustakam)";
    incorrectOptions = ["నేను పుస్తకం చదువుతున్నాను (nenu pustakam chaduvutunnaanu) - I am reading a book", "పుస్తకం ఇక్కడ ఉంది (pustakam ikkada undi) - The book is here", "ఇది నా పుస్తకం (idi naa pustakam) - This is my book"];
  }
  else if (question.toLowerCase().includes("i am eating food")) {
    correctOption = "నేను ఆహారం తింటున్నాను (nenu aaharam tintunnaanu)";
    incorrectOptions = ["నేను ఆహారం తిన్నాను (nenu aaharam tinnaanu) - I ate food", "నేను ఆహారం తింటాను (nenu aaharam tintaanu) - I will eat food", "నేను భోజనం చేస్తున్నాను (nenu bhojanam chestunnaanu) - I am having a meal"];
  }
  else if (question.toLowerCase().includes("questions formed")) {
    correctOption = "By adding question words like ఏమిటి (emiti) or ఎందుకు (enduku)";
    incorrectOptions = ["By changing the word order", "By adding a question mark at the end", "By changing the verb form"];
  }
  else if (question.toLowerCase().includes("what is this")) {
    correctOption = "ఇదేమిటి (idemiti)";
    incorrectOptions = ["అదేమిటి (ademiti) - What is that", "ఎక్కడ (ekkada) - Where", "ఎందుకు (enduku) - Why"];
  }
  else if (question.toLowerCase().includes("negative sentence")) {
    correctOption = "By adding the negative suffix -లేదు (-ledu)";
    incorrectOptions = ["By adding the prefix కాదు (kaadu)", "By inverting the subject and object", "By changing the verb to past tense"];
  }
  else if (question.toLowerCase().includes("i don't know")) {
    correctOption = "నాకు తెలియదు (naaku teliyadu)";
    incorrectOptions = [
      "నేను మర్చిపోయాను (nenu marchipoyyaanu) - I forgot",
      "నేను అర్థం చేసుకోలేదు (nenu artham chesukolaedu) - I didn't understand",
      "నేను చెప్పలేను (nenu cheppalenu) - I can't tell"
    ];
  }
  else if (isAboutGrammar && question.toLowerCase().includes("present tense")) {
    correctOption = "వర్తమాన కాలం (vartamaana kaalam)";
    incorrectOptions = ["భూత కాలం (bhuta kaalam) - past tense", "భవిష్యత్ కాలం (bhavishyat kaalam) - future tense", "క్రియ (kriya) - verb"];
  }
  else if (isAboutGrammar && question.toLowerCase().includes("i am")) {
    correctOption = "నేను ఉన్నాను (nenu unnaanu)";
    incorrectOptions = ["నువ్వు ఉన్నావు (nuvvu unnaavu) - you are", "అతను ఉన్నాడు (atanu unnaadu) - he is", "ఆమె ఉంది (aame undi) - she is"];
  }
  else if (question.toLowerCase().includes("role of 'గా'")) {
    correctOption = "Used as an adverbial marker to indicate manner or state";
    incorrectOptions = [
      "Used to indicate possession",
      "Used to indicate location",
      "Used to indicate time"
    ];
  }
  else if (question.toLowerCase().includes("telugu word for 'i'")) {
    correctOption = "నేను (nenu)";
    incorrectOptions = [
      "నువ్వు (nuvvu) - you",
      "అతను (atanu) - he",
      "ఆమె (aame) - she"
    ];
  }
  else if (question.toLowerCase().includes("role of 'కి'")) {
    correctOption = "Used as a dative case marker to indicate recipient or destination";
    incorrectOptions = [
      "Used as a verb tense marker",
      "Used to form questions",
      "Used to indicate possession"
    ];
  }
  else if (question.toLowerCase().includes("role of 'లో'")) {
    correctOption = "Used as a locative case marker to indicate location or place ('in', 'at', 'inside')";
    incorrectOptions = [
      "Used to indicate time",
      "Used to show possession",
      "Used to form questions"
    ];
  }
  else if (question.toLowerCase().includes("word for 'you' (informal)")) {
    correctOption = "నువ్వు (nuvvu)";
    incorrectOptions = [
      "మీరు (meeru) - you (formal)",
      "నేను (nenu) - I",
      "వారు (vaaru) - they"
    ];
  }
  else if (question.toLowerCase().includes("word for 'he'")) {
    correctOption = "అతను (atanu)";
    incorrectOptions = [
      "ఆమె (aame) - she",
      "వారు (vaaru) - they",
      "నేను (nenu) - I"
    ];
  }
  else if (question.toLowerCase().includes("word for 'she'")) {
    correctOption = "ఆమె (aame)";
    incorrectOptions = [
      "అతను (atanu) - he",
      "వారు (vaaru) - they",
      "నువ్వు (nuvvu) - you"
    ];
  }
  else if (question.toLowerCase().includes("word for 'they'")) {
    correctOption = "వారు (vaaru)";
    incorrectOptions = [
      "అతను (atanu) - he",
      "ఆమె (aame) - she",
      "నేను (nenu) - I"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'i am'")) {
    correctOption = "నేను ఉన్నాను (nenu unnaanu)";
    incorrectOptions = [
      "నువ్వు ఉన్నావు (nuvvu unnaavu) - you are",
      "అతను ఉన్నాడు (atanu unnaadu) - he is",
      "ఆమె ఉంది (aame undi) - she is"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'You are'")) {
    correctOption = "నువ్వు ఉన్నావు (nuvvu unnaavu)";
    incorrectOptions = [
      "నేను ఉన్నాను (nenu unnaanu) - I am",
      "అతను ఉన్నాడు (atanu unnaadu) - He is",
      "ఆమె ఉంది (aame undi) - She is"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'He is'")) {
    correctOption = "అతను ఉన్నాడు (atanu unnaadu)";
    incorrectOptions = [
      "నేను ఉన్నాను (nenu unnaanu) - I am",
      "నువ్వు ఉన్నావు (nuvvu unnaavu) - You are",
      "ఆమె ఉంది (aame undi) - She is"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'She is'")) {
    correctOption = "ఆమె ఉంది (aame undi)";
    incorrectOptions = [
      "నేను ఉన్నాను (nenu unnaanu) - I am",
      "నువ్వు ఉన్నావు (nuvvu unnaavu) - You are",
      "అతను ఉన్నాడు (atanu unnaadu) - He is"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'They are'")) {
    correctOption = "వారు ఉన్నారు (vaaru unnaaru)";
    incorrectOptions = [
      "నేను ఉన్నాను (nenu unnaanu) - I am",
      "నువ్వు ఉన్నావు (nuvvu unnaavu) - You are",
      "అతను ఉన్నాడు (atanu unnaadu) - He is"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'i am eating'")) {
    correctOption = "నేను తింటున్నాను (nenu tintunnaanu)";
    incorrectOptions = [
      "నేను తిన్నాను (nenu tinnaanu) - I ate",
      "నేను తింటాను (nenu tintaanu) - I will eat",
      "నేను తినను (nenu tinanu) - I don't eat"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'you are reading'")) {
    correctOption = "నువ్వు చదువుతున్నావు (nuvvu chaduvutunnaavu)";
    incorrectOptions = [
      "నువ్వు చదివావు (nuvvu chadivaavu) - You read",
      "నువ్వు చదువుతావు (nuvvu chaduvutaavu) - You will read",
      "నువ్వు చదవలేదు (nuvvu chadavaledu) - You didn't read"
    ];
  }
  else if (question.toLowerCase().includes("how do you form the past tense")) {
    correctOption = "Add suffix -ను, -వు, -డు, -ది, -రు to the verb stem based on the subject";
    incorrectOptions = [
      "Add prefix తున్నా (present continuous)",
      "Add suffix -తాను to the verb",
      "Change the verb to its root form"
    ];
  }
  else if (question.toLowerCase().includes("how do you form the future tense")) {
    correctOption = "Add suffix -తాను, -తావు, -తాడు, -తుంది, -తారు to the verb stem based on the subject";
    incorrectOptions = [
      "Add prefix పో to the verb",
      "Add suffix -ను to the verb",
      "Use the present tense with రేపు (tomorrow)"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'i ate'")) {
    correctOption = "నేను తిన్నాను (nenu tinnaanu)";
    incorrectOptions = [
      "నేను తింటున్నాను (nenu tintunnaanu) - I am eating",
      "నేను తింటాను (nenu tintaanu) - I will eat",
      "నేను తినలేదు (nenu tinaledu) - I didn't eat"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'you went'")) {
    correctOption = "నువ్వు వెళ్ళావు (nuvvu vellaavu)";
    incorrectOptions = [
      "నువ్వు వెళ్తున్నావు (nuvvu veltunnaavu) - you are going",
      "నువ్వు వెళ్తావు (nuvvu veltaavu) - you will go",
      "నువ్వు వెళ్ళలేదు (nuvvu vellaledu) - you didn't go"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'He read'")) {
    correctOption = "అతను చదివాడు (atanu chadivaadu)";
    incorrectOptions = [
      "అతను చదువుతున్నాడు (atanu chaduvutunnaadu) - he is reading",
      "అతను చదువుతాడు (atanu chaduvutaadu) - he will read",
      "అతను చదవలేదు (atanu chadavaledu) - he didn't read"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'She wrote'")) {
    correctOption = "ఆమె రాసింది (aame raasindi)";
    incorrectOptions = [
      "ఆమె రాస్తోంది (aame raastondi) - She is writing",
      "ఆమె రాస్తుంది (aame raastundi) - She will write",
      "ఆమె రాయలేదు (aame raayaledu) - She didn't write"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'They worked'")) {
    correctOption = "వారు పని చేశారు (vaaru pani chesaaru)";
    incorrectOptions = [
      "వారు పని చేస్తున్నారు (vaaru pani chestunnaaru) - They are working",
      "వారు పని చేస్తారు (vaaru pani chestaaru) - They will work",
      "వారు పని చేయలేదు (vaaru pani cheyaledu) - They didn't work"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'i will eat'")) {
    correctOption = "నేను తింటాను (nenu tintaanu)";
    incorrectOptions = [
      "నేను తింటున్నాను (nenu tintunnaanu) - I am eating",
      "నేను తిన్నాను (nenu tinnaanu) - I ate",
      "నేను తినను (nenu tinanu) - I don't eat"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'You will go'")) {
    correctOption = "నువ్వు వెళ్తావు (nuvvu veltaavu)";
    incorrectOptions = [
      "నువ్వు వెళ్తున్నావు (nuvvu veltunnaavu) - You are going",
      "నువ్వు వెళ్ళావు (nuvvu vellaavu) - You went",
      "నువ్వు వెళ్ళవు (nuvvu vellavu) - You don't go"
    ];
  }
  else if (question.toLowerCase().includes("what is the past tense marker")) {
    correctOption = "-ను (first person), -వు (second person), -డు/-ది (third person)";
    incorrectOptions = [
      "-తున్నా (present continuous)",
      "-తా (future tense)",
      "-లేదు (negative)"
    ];
  }
  else if (question.toLowerCase().includes("what is the future tense marker")) {
    correctOption = "-తా (first person), -తావు (second person), -తాడు/-తుంది (third person)";
    incorrectOptions = [
      "-తున్నా (present continuous)",
      "-ను (past tense)",
      "-లేదు (negative)"
    ];
  }
  else if (question.toLowerCase().includes("how do you say 'I didn't eat'")) {
    correctOption = "నేను తినలేదు (nenu tinaledu)";
    incorrectOptions = [
      "నేను తింటున్నాను (nenu tintunnaanu) - I am eating",
      "నేను తిన్నాను (nenu tinnaanu) - I ate",
      "నేను తినను (nenu tinanu) - I don't eat"
    ];
  } else if (question.toLowerCase().includes("how do you say 'he is going' in telugu")) {
    correctOption = "అతను వెళ్తున్నాడు (atanu veltunnaadu)";
    incorrectOptions = [
      "అతను వెళ్ళాడు (atanu vellaadu) - He went",
      "అతను వెళ్తాడు (atanu veltaadu) - He will go",
      "అతను వెళ్లడు (atanu velladu) - He doesn't go",
    ];
  } else if (question.toLowerCase().includes("word for 'rice'")) {
    correctOption = "అన్నం (annam)";
    incorrectOptions = [
      "కూరగాయలు (kooragaayalu) - vegetable",
      "కారం (kaaram) - spicy",
      "తియ్యని (tiyyani) - sweet"
    ];
  }
  else if (question.toLowerCase().includes("word for 'vegetable'")) {
    correctOption = "కూరగాయలు (kooragaayalu)";
    incorrectOptions = [
      "అన్నం (annam) - rice",
      "కారం (kaaram) - spicy",
      "తియ్యని (tiyyani) - sweet"
    ];
  }
  else if (question.toLowerCase().includes("word for 'spicy'")) {
    correctOption = "కారం (kaaram)";
    incorrectOptions = [
      "అన్నం (annam) - rice",
      "కూరగాయలు (kooragaayalu) - vegetable",
      "తియ్యని (tiyyani) - sweet"
    ];
  }
  else if (question.toLowerCase().includes("word for 'sweet'")) {
    correctOption = "తియ్యని (tiyyani)";
    incorrectOptions = [
      "అన్నం (annam) - rice",
      "కూరగాయలు (kooragaayalu) - vegetable",
      "కారం (kaaram) - spicy"
    ];
  }
  else if (question.toLowerCase().includes("word for 'to cook'")) {
    correctOption = "వండు (vandu)";
    incorrectOptions = [
      "తిను (tinu) - to eat",
      "చేయు (cheyu) - to do",
      "రాయు (raayu) - to write"
    ];
  }
  else if (question.toLowerCase().includes("what does 'అన్నం' mean")) {
    correctOption = "Rice";
    incorrectOptions = ["Vegetable", "Spicy", "Sweet"];
  }
  else if (question.toLowerCase().includes("what does 'కూరగాయలు' mean")) {
    correctOption = "Vegetable";
    incorrectOptions = ["Rice", "Spicy", "Sweet"];
  }
  else if (question.toLowerCase().includes("what does 'కారం' mean")) {
    correctOption = "Spicy";
    incorrectOptions = ["Rice", "Vegetable", "Sweet"];
  }
  else if (question.toLowerCase().includes("what does 'తియ్యని' mean")) {
    correctOption = "Sweet";
    incorrectOptions = ["Rice", "Vegetable", "Spicy"];
  }
  else if (question.toLowerCase().includes("what does 'వండు' mean")) {
    correctOption = "To cook";
    incorrectOptions = ["To eat", "To mix", "To serve"];
  }
  
  // Add pronoun meaning handlers
  else if (question.toLowerCase().includes("what does 'నేను' mean")) {
    correctOption = "I";
    incorrectOptions = ["You", "He", "She"];
  }
  else if (question.toLowerCase().includes("what does 'నువ్వు' mean")) {
    correctOption = "You (informal)";
    incorrectOptions = ["I", "He", "She"];
  }
  else if (question.toLowerCase().includes("what does 'అతను' mean")) {
    correctOption = "He";
    incorrectOptions = ["I", "You", "She"];
  }
  else if (question.toLowerCase().includes("what does 'ఆమె' mean")) {
    correctOption = "She";
    incorrectOptions = ["I", "You", "He"];
  }
  else if (question.toLowerCase().includes("what does 'వారు' mean")) {
    correctOption = "They";
    incorrectOptions = ["I", "You", "He"];
  }
  else if (question.toLowerCase().includes("how do you say 'i am'")) {
    correctOption = "నేను ఉన్నాను (nenu unnaanu)";
    incorrectOptions = [
      "నువ్వు ఉన్నావు (nuvvu unnaavu) - you are",
      "అతను ఉన్నాడు (atanu unnaadu) - he is",
      "ఆమె ఉంది (aame undi) - she is"
    ];
  } else if (question.toLowerCase().includes("how do you say 'you are' in telugu")) {
    correctOption = "నువ్వు ఉన్నావు (nuvvu unnaavu)";
    incorrectOptions = [
      "నేను ఉన్నాను (nenu unnaanu) - I am",
      "అతను ఉన్నాడు (atanu unnaadu) - He is",
      "ఆమె ఉంది (aame undi) - She is"
    ];
  } else if (question.toLowerCase().includes("how do you say 'he is' in telugu")) {
    correctOption = "అతను ఉన్నాడు (atanu unnaadu)";
    incorrectOptions = [
      "నేను ఉన్నాను (nenu unnaanu) - I am",
      "నువ్వు ఉన్నావు (nuvvu unnaavu) - You are",
      "ఆమె ఉంది (aame undi) - She is"
    ];
  } else if (question.toLowerCase().includes("how do you say 'she is' in telugu")) {
    correctOption = "ఆమె ఉంది (aame undi)";
    incorrectOptions = [
      "నేను ఉన్నాను (nenu unnaanu) - I am",
      "నువ్వు ఉన్నావు (nuvvu unnaavu) - You are",
      "అతను ఉన్నాడు (atanu unnaadu) - He is"
    ];
  } else if (question.toLowerCase().includes("how do you say 'they are' in telugu")) {
    correctOption = "వారు ఉన్నారు (vaaru unnaaru)";
    incorrectOptions = [
      "నేను ఉన్నాను (nenu unnaanu) - I am",
      "నువ్వు ఉన్నావు (nuvvu unnaavu) - You are",
      "అతను ఉన్నాడు (atanu unnaadu) - He is"
    ];
  } else if (question.toLowerCase().includes("how do you say 'she is writing' in telugu")) {
    correctOption = "ఆమె రాస్తోంది (aame raastondi)";
    incorrectOptions = [
      "ఆమె తింటోంది (aame tintondi) - She is eating",
      "ఆమె చదువుతోంది (aame chaduvutondi) - She is reading",
      "ఆమె పనిచేస్తోంది (aame panicheestondi) - She is working"
    ];
  } else if (question.toLowerCase().includes("how do you say 'they are working' in telugu")) {
    correctOption = "వారు పనిచేస్తున్నారు (vaaru panicheestunnaaru)";
    incorrectOptions = [
      "వారు తింటున్నారు (vaaru tintunnaaru) - They are eating",
      "వారు చదువుతున్నారు (vaaru chaduvutunnaaru) - They are reading",
      "వారు రాస్తున్నారు (vaaru raastunnaaru) - They are writing"
    ];
  } else if (question.toLowerCase().includes("how do you say 'he read' in telugu")) {
    correctOption = "అతను చదివాడు (atanu chadivaadu)";
    incorrectOptions = [
      "అతను చదువుతున్నాడు (atanu chaduvutunnaadu) - He is reading",
      "అతను చదువుతాడు (atanu chaduvutaadu) - He will read",
      "అతను చదవలేదు (atanu chadavaledu) - He didn't read"
    ];
  } else if (question.toLowerCase().includes("how do you say 'she wrote' in telugu")) {
    correctOption = "ఆమె రాసింది (aame raasindi)";
    incorrectOptions = [
      "ఆమె రాస్తోంది (aame raastondi) - She is writing",
      "ఆమె రాస్తుంది (aame raastundi) - She will write",
      "ఆమె రాయలేదు (aame raayaledu) - She didn't write"
    ];
  } else if (question.toLowerCase().includes("how do you say 'they worked' in telugu")) {
    correctOption = "వారు పని చేశారు (vaaru pani chesaaru)";
    incorrectOptions = [
      "వారు పని చేస్తున్నారు (vaaru pani chestunnaaru) - They are working",
      "వారు పని చేస్తారు (vaaru pani chestaaru) - They will work",
      "వారు పని చేయలేదు (vaaru pani cheyaledu) - They didn't work"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i didn't eat' in telugu")) {
    correctOption = "నేను తినలేదు (nenu tinaledu)";
    incorrectOptions = [
      "నేను తింటున్నాను (nenu tintunnaanu) - I am eating",
      "నేను తిన్నాను (nenu tinnaanu) - I ate",
      "నేను తినను (nenu tinanu) - I don't eat"
    ];
  } else if (question.toLowerCase().includes("how do you say 'did you go?' in telugu")) {
    correctOption = "నువ్వు వెళ్ళావా? (nuvvu vellaavaa?)";
    incorrectOptions = [
      "నువ్వు వెళ్తావా? (nuvvu veltaavaa?) - Will you go?",
      "నువ్వు వెళ్తున్నావా? (nuvvu veltunnaavaa?) - Are you going?",
      "నువ్వు వెళ్ళలేదా? (nuvvu vellaledaa?) - Didn't you go?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'you will go' in telugu")) {
    correctOption = "నువ్వు వెళ్తావు (nuvvu veltaavu)";
    incorrectOptions = [
      "నువ్వు వెళ్తున్నావు (nuvvu veltunnaavu) - You are going",
      "నువ్వు వెళ్ళావు (nuvvu vellaavu) - You went",
      "నువ్వు వెళ్ళవు (nuvvu vellavu) - You don't go"
    ];
  } else if (question.toLowerCase().includes("how do you say 'he will read' in telugu")) {
    correctOption = "అతను చదువుతాడు (atanu chaduvutaadu)";
    incorrectOptions = [
      "అతను చదువుతున్నాడు (atanu chaduvutunnaadu) - He is reading",
      "అతను చదివాడు (atanu chadivaadu) - He read",
      "అతను చదవడు (atanu chadavadu) - He doesn't read"
    ];
  } else if (question.toLowerCase().includes("how do you say 'she will write' in telugu")) {
    correctOption = "ఆమె రాస్తుంది (aame raastundi)";
    incorrectOptions = [
      "ఆమె రాస్తోంది (aame raastondi) - She is writing",
      "ఆమె రాసింది (aame raasindi) - She wrote",
      "ఆమె రాయదు (aame raayadu) - She doesn't write"
    ];
  } else if (question.toLowerCase().includes("how do you say 'they will work' in telugu")) {
    correctOption = "వారు పని చేస్తారు (vaaru pani chestaaru)";
    incorrectOptions = [
      "వారు పని చేస్తున్నారు (vaaru pani chestunnaaru) - They are working",
      "వారు పని చేశారు (vaaru pani chesaaru) - They worked",
      "వారు పని చేయరు (vaaru pani cheyaru) - They don't work"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i will not eat' in telugu")) {
    correctOption = "నేను తినను (nenu tinanu)";
    incorrectOptions = [
      "నేను తింటాను (nenu tintaanu) - I will eat",
      "నేను తింటున్నాను (nenu tintunnaanu) - I am eating",
      "నేను తినలేదు (nenu tinaledu) - I didn't eat"
    ];
  } else if (question.toLowerCase().includes("how do you say 'will you go?' in telugu")) {
    correctOption = "నువ్వు వెళ్తావా? (nuvvu veltaavaa?)";
    incorrectOptions = [
      "నువ్వు వెళ్ళావా? (nuvvu vellaavaa?) - Did you go?",
      "నువ్వు వెళ్తున్నావా? (nuvvu veltunnaavaa?) - Are you going?",
      "నువ్వు వెళ్ళలేదా? (nuvvu vellaledaa?) - Didn't you go?"
    ];
  } else if (question.toLowerCase().includes("how do you form the past tense")) {
    correctOption = "Add suffix -ను, -వు, -డు, -ది, -రు to the verb stem based on the subject";
    incorrectOptions = [
      "Add prefix తున్నా (present continuous)",
      "Add suffix -తాను to the verb",
      "Change the verb to its root form"
    ];
  } else if (question.toLowerCase().includes("how do you say 'will you go?' in telugu")) {
    correctOption = "నువ్వు వెళ్తావా? (nuvvu veltaavaa?)";
    incorrectOptions = [
      "నువ్వు వెళ్ళావా? (nuvvu vellaavaa?) - Did you go?",
      "నువ్వు వెళ్తున్నావా? (nuvvu veltunnaavaa?) - Are you going?",
      "నువ్వు వెళ్ళలేదా? (nuvvu vellaledaa?) - Didn't you go?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'how are you?' in telugu")) {
    correctOption = "మీరు ఎలా ఉన్నారు? (meeru elaa unnaaru?)";
    incorrectOptions = [
      "నమస్కారం (namaskaram) - Hello",
      "మీ పేరు ఏమిటి? (mee peru emiti?) - What is your name?",
      "శుభోదయం (subhodhayam) - Good morning"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i am fine.' in telugu")) {
    correctOption = "నేను బాగున్నాను (nenu baagunnanu)";
    incorrectOptions = [
      "నాకు తెలుగు తెలుసు (naaku telugu telusu) - I know Telugu",
      "ధన్యవాదాలు (dhanyavaadaalu) - Thank you",
      "సంతోషం (santosham) - Happy"
    ];
  } else if (question.toLowerCase().includes("how do you say 'what is your name?' in telugu")) {
    correctOption = "మీ పేరు ఏమిటి? (mee peru emiti?)";
    incorrectOptions = [
      "మీరు ఎలా ఉన్నారు? (meeru elaa unnaaru?) - How are you?",
      "మీకు తెలుగు తెలుసా? (meeku telugu telusaa?) - Do you know Telugu?",
      "మీరు ఎక్కడ నుండి వచ్చారు? (meeru ekkada nundi vacharu?) - Where are you from?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'my name is")) {
    correctOption = "నా పేరు [name] (naa peru [name])";
    incorrectOptions = [
      "నాకు తెలుగు తెలుసు (naaku telugu telusu) - I know Telugu",
      "నేను బాగున్నాను (nenu baagunnanu) - I am fine",
      "నేను వస్తాను (nenu vastaanu) - I will come"
    ];
  } else if (question.toLowerCase().includes("how do you say 'send a message.' in telugu")) {
    correctOption = "సందేశం పంపండి (sandesham pampandi)";
    incorrectOptions = [
      "దయచేసి వచ్చి వెళ్ళండి (dhayachesi vachchi vellandi) - Please come and go",
      "ఇక్కడకు రండి (ikkadaku randi) - Come here",
      "ఫోన్ చేయండి (phone cheyandi) - Make a call"
    ];
  } else if (question.toLowerCase().includes("how do you say 'come here.' in telugu")) {
    correctOption = "ఇక్కడకు రండి (ikkadaku randi)";
    incorrectOptions = [
      "అక్కడకు వెళ్ళండి (akkadaku vellandi) - Go there",
      "దయచేసి కూర్చోండి (dhayachesi koorchoandi) - Please sit down",
      "వెంటనే రండి (ventane randi) - Come immediately"
    ];
  } else if (question.toLowerCase().includes("how do you say 'come immediately.' in telugu")) {
    correctOption = "వెంటనే రండి (ventane randi)";
    incorrectOptions = [
      "ఇప్పుడే రండి (ippude randi) - Come right now",
      "త్వరగా రండి (tvaragaa randi) - Come quickly",
      "ఆలస్యం చేయకండి (aalasyam cheyakandi) - Don't be late"
    ];
  } else if (question.toLowerCase().includes("how do you say 'who is at your house?' in telugu")) {
    correctOption = "మీ ఇంట్లో ఎవరున్నారు? (mee intlo evarunnaaru?)";
    incorrectOptions = [
      "మీ ఇల్లు ఎక్కడ ఉంది? (mee illu ekkada undi?) - Where is your house?",
      "మీరు ఇంట్లో ఉన్నారా? (meeru intlo unnaraa?) - Are you at home?",
      "మీకు ఇల్లు ఉందా? (meeku illu undaa?) - Do you have a house?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'can you speak telugu?' in telugu")) {
    correctOption = "మీకు తెలుగు మాట్లాడటం వచ్చా? (meeku telugu maatlaadatam vachaa?)";
    incorrectOptions = [
      "మీరు తెలుగు నేర్చుకుంటున్నారా? (meeru telugu nerchukuntunaraa?) - Are you learning Telugu?",
      "మీకు తెలుగు అర్థమవుతుందా? (meeku telugu arthamavutundaa?) - Do you understand Telugu?",
      "మీకు తెలుగు రాయడం వచ్చా? (meeku telugu raayaḍam vachaa?) - Can you write Telugu?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i can speak a little.' in telugu")) {
    correctOption = "నేను కొంచెం తెలుగు మాట్లాడగలను (nenu konchem telugu maatlaadagalanu)";
    incorrectOptions = [
      "నాకు తెలుగు చాలా బాగా వచ్చు (naaku telugu chalaa baagaa vachchu) - I can speak Telugu very well",
      "నాకు తెలుగు రాదు (naaku telugu raadhu) - I can't speak Telugu",
      "నేను తెలుగు నేర్చుకుంటున్నాను (nenu telugu nerchukuntunaanu) - I am learning Telugu"
    ];
  }
  
  // Common Questions
  else if (question.toLowerCase().includes("how do you say 'where are you going?' in telugu")) {
    correctOption = "మీరు ఎక్కడికి వెళ్తున్నారు? (meeru ekkadiki veltunnaaru?)";
    incorrectOptions = [
      "మీరు ఎక్కడ నుండి వచ్చారు? (meeru ekkada nundi vacharu?) - Where did you come from?",
      "మీరు ఎప్పుడు వెళ్తారు? (meeru eppudu veltaaru?) - When will you go?",
      "మీరు ఎందుకు వెళ్తున్నారు? (meeru enduku veltunnaaru?) - Why are you going?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'when will you come?' in telugu")) {
    correctOption = "మీరు ఎప్పుడు వస్తారు? (meeru eppudu vastaaru?)";
    incorrectOptions = [
      "మీరు ఎప్పుడు వెళ్తారు? (meeru eppudu veltaaru?) - When will you go?",
      "మీరు ఎందుకు వస్తారు? (meeru enduku vastaaru?) - Why will you come?",
      "మీరు ఎక్కడికి వస్తారు? (meeru ekkadiki vastaaru?) - Where will you come to?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'whose is this?' in telugu")) {
    correctOption = "ఇది ఎవరిది? (idi evaridi?)";
    incorrectOptions = [
      "ఇది ఏమిటి? (idi emiti?) - What is this?",
      "ఇది ఎక్కడ ఉంది? (idi ekkada undi?) - Where is this?",
      "ఇది ఎంత? (idi enta?) - How much is this?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'what are you doing?' in telugu")) {
    correctOption = "మీరు ఏమి చేస్తున్నారు? (meeru emi chestunnaaru?)";
    incorrectOptions = [
      "మీరు ఎక్కడ ఉన్నారు? (meeru ekkada unnaaru?) - Where are you?",
      "మీరు ఏమి చదువుతున్నారు? (meeru emi chaduvutunnaaru?) - What are you reading?",
      "మీరు ఏమి తింటున్నారు? (meeru emi tintunnaaru?) - What are you eating?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'how much is this?' in telugu")) {
    correctOption = "ఇది ఎంత? (idi enta?)";
    incorrectOptions = [
      "ఇది ఏమిటి? (idi emiti?) - What is this?",
      "ఇది ఎవరిది? (idi evaridi?) - Whose is this?",
      "ఇది ఎక్కడ ఉంది? (idi ekkada undi?) - Where is this?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'what happened today?' in telugu")) {
    correctOption = "ఈరోజు ఏమి జరిగింది? (eeroju emi jarigindi?)";
    incorrectOptions = [
      "నిన్న ఏమి జరిగింది? (ninna emi jarigindi?) - What happened yesterday?",
      "రేపు ఏమి జరుగుతుంది? (repu emi jarugutundi?) - What will happen tomorrow?",
      "ఏమి జరుగుతోంది? (emi jarugutoondi?) - What's happening?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'how do you know?' in telugu")) {
    correctOption = "మీకు ఎలా తెలుసు? (meeku elaa telusu?)";
    incorrectOptions = [
      "మీకు తెలుసా? (meeku telusaa?) - Do you know?",
      "మీకు ఏమి తెలుసు? (meeku emi telusu?) - What do you know?",
      "మీకు ఎవరు చెప్పారు? (meeku evaru cheppaaru?) - Who told you?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'do you like it?' in telugu")) {
    correctOption = "మీకు ఇది నచ్చిందా? (meeku idi nachindaa?)";
    incorrectOptions = [
      "మీకు ఇది కావాలా? (meeku idi kaavalaa?) - Do you want this?",
      "మీకు ఇది బాగుందా? (meeku idi baagundaa?) - Is this good for you?",
      "మీకు ఇది అర్థమైందా? (meeku idi arthamayindaa?) - Did you understand this?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'whom should i tell?' in telugu")) {
    correctOption = "నేను ఎవరికి చెప్పాలి? (nenu evariki cheppaali?)";
    incorrectOptions = [
      "నేను ఏమి చెప్పాలి? (nenu emi cheppaali?) - What should I tell?",
      "నేను ఎప్పుడు చెప్పాలి? (nenu eppudu cheppaali?) - When should I tell?",
      "నేను ఎలా చెప్పాలి? (nenu elaa cheppaali?) - How should I tell?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'can i do it?' in telugu")) {
    correctOption = "నేను చేయగలనా? (nenu cheyagalanaa?)";
    incorrectOptions = [
      "నేను వెళ్ళగలనా? (nenu vellagalanaa?) - Can I go?",
      "నేను చేయాలా? (nenu cheyaalaa?) - Should I do it?",
      "నేను అర్థం చేసుకోగలనా? (nenu artham chesukoagalanaa?) - Can I understand it?"
    ];
  }
  
  // Daily Routine Phrases
  else if (question.toLowerCase().includes("how do you say 'did you eat?' in telugu")) {
    correctOption = "మీరు భోజనం చేశారా? (meeru bhojanam chesaaraa?)";
    incorrectOptions = [
      "మీరు తింటున్నారా? (meeru tintunnaaraa?) - Are you eating?",
      "మీకు ఆకలిగా ఉందా? (meeku akaleegaa undaa?) - Are you hungry?",
      "మీరు ఏమి తింటారు? (meeru emi tintaaru?) - What will you eat?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'did you wake up?' in telugu")) {
    correctOption = "మీరు నిద్ర లేచారా? (meeru nidra lecaaraa?)";
    incorrectOptions = [
      "మీరు నిద్రపోతున్నారా? (meeru nidrapoatunnaaraa?) - Are you sleeping?",
      "మీరు అలసిపోయారా? (meeru alasipoyaaraa?) - Are you tired?",
      "మీరు మేల్కొన్నారా? (meeru melkonnaaraa?) - Are you awake?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'is the work finished?' in telugu")) {
    correctOption = "పని అయిపోయిందా? (pani ayipoayindaa?)";
    incorrectOptions = [
      "పని మొదలైందా? (pani modalayindaa?) - Has the work started?",
      "పని చేస్తున్నారా? (pani chestunaraa?) - Are you working?",
      "పని ఏమిటి? (pani emiti?) - What is the work?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'did you take a bath?' in telugu")) {
    correctOption = "మీరు స్నానం చేశారా? (meeru snaanam chesaaraa?)";
    incorrectOptions = [
      "మీరు కడుక్కున్నారా? (meeru kadukkunnaraa?) - Did you wash?",
      "మీరు తయారయ్యారా? (meeru tayaarayyaaraa?) - Are you ready?",
      "మీరు బట్టలు వేసుకున్నారా? (meeru battalu vesukunnaraa?) - Did you dress up?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'what time is it?' in telugu")) {
    correctOption = "ఎంత సమయం అయింది? (enta samayam ayindi?)";
    incorrectOptions = [
      "ఇప్పుడు ఏమి సమయం? (ippudu emi samayam?) - What time is it now?",
      "గంట ఎంత? (ganta enta?) - What is the hour?",
      "ఇప్పుడు ఎంత అయింది? (ippudu enta ayindi?) - What time is it now?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'when will you go?' in telugu")) {
    correctOption = "మీరు ఎప్పుడు వెళ్తారు? (meeru eppudu veltaaru?)";
    incorrectOptions = [
      "మీరు ఎక్కడికి వెళ్తారు? (meeru ekkadiki veltaaru?) - Where will you go?",
      "మీరు ఎందుకు వెళ్తారు? (meeru enduku veltaaru?) - Why will you go?",
      "మీరు ఎవరితో వెళ్తారు? (meeru evarito veltaaru?) - With whom will you go?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'are you at home?' in telugu")) {
    correctOption = "మీరు ఇంట్లో ఉన్నారా? (meeru intlo unnaaraa?)";
    incorrectOptions = [
      "మీరు ఇంటికి వెళ్తున్నారా? (meeru intiki veltunnaaraa?) - Are you going home?",
      "మీ ఇల్లు ఎక్కడ ఉంది? (mee illu ekkada undi?) - Where is your house?",
      "మీరు ఇంట్లో ఉండాలా? (meeru intlo undaalaa?) - Should you be at home?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'please do this work.' in telugu")) {
    correctOption = "దయచేసి ఈ పని చేయండి (dayachesi ee pani cheyandi)";
    incorrectOptions = [
      "ఈ పని చేయగలరా? (ee pani cheyagalaraa?) - Can you do this work?",
      "ఈ పని ఎవరు చేస్తారు? (ee pani evaru chestaaru?) - Who will do this work?",
      "ఈ పని నేను చేయనా? (ee pani nenu cheyanaa?) - Should I do this work?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'get ready.' in telugu")) {
    correctOption = "తయారు కండి (tayaaru kandi)";
    incorrectOptions = [
      "వెళ్ళండి (vellandi) - Go",
      "రండి (randi) - Come",
      "కూర్చోండి (koorchoandi) - Sit down"
    ];
  } else if (question.toLowerCase().includes("how do you say 'where is he?' in telugu")) {
    correctOption = "అతను ఎక్కడ ఉన్నాడు? (atanu ekkada unnaadu?)";
    incorrectOptions = [
      "అతను ఎవరు? (atanu evaru?) - Who is he?",
      "అతను ఏమి చేస్తున్నాడు? (atanu emi chestunnaadu?) - What is he doing?",
      "అతను ఎప్పుడు వస్తాడు? (atanu eppudu vastaadu?) - When will he come?"
    ];
  }
  
  // Expressions of Emotion
  else if (question.toLowerCase().includes("how do you say 'i don't know.' in telugu")) {
    correctOption = "నాకు తెలియదు (naaku teliyadhu)";
    incorrectOptions = [
      "నాకు తెలుసు (naaku telusu) - I know",
      "నాకు అర్థం కాలేదు (naaku artham kaaledhu) - I didn't understand",
      "నేను మర్చిపోయాను (nenu marchipoyaanu) - I forgot"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i like it.' in telugu")) {
    correctOption = "నాకు ఇది నచ్చింది (naaku idi nachindi)";
    incorrectOptions = [
      "నాకు ఇది నచ్చలేదు (naaku idi nachaledu) - I don't like it",
      "నాకు ఇది కావాలి (naaku idi kaavaali) - I want this",
      "నాకు ఇది బాగుంది (naaku idi baagundi) - This is good for me"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i am angry.' in telugu")) {
    correctOption = "నాకు కోపం వచ్చింది (naaku kopam vachindi)";
    incorrectOptions = [
      "నేను బాధగా ఉన్నాను (nenu baadhagaa unnaanu) - I am sad",
      "నేను సంతోషంగా ఉన్నాను (nenu santoshamgaa unnaanu) - I am happy",
      "నేను భయపడుతున్నాను (nenu bhayapadutunnaanu) - I am afraid"
    ];
  } else if (question.toLowerCase().includes("how do you say 'that is very nice.' in telugu")) {
    correctOption = "అది చాలా బాగుంది (adi chalaa baagundi)";
    incorrectOptions = [
      "అది చాలా చెడ్డగా ఉంది (adi chalaa cheddagaa undi) - That is very bad",
      "అది చాలా పెద్దది (adi chalaa peddadi) - That is very big",
      "అది చాలా చిన్నది (adi chalaa chinnadi) - That is very small"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i need to say something.' in telugu")) {
    correctOption = "నేను ఏదో చెప్పాలి (nenu edho cheppaali)";
    incorrectOptions = [
      "నేను ఏదో వినాలి (nenu edho vinaali) - I need to hear something",
      "నేను ఏదో చేయాలి (nenu edho cheyaali) - I need to do something",
      "నేను ఏదో అడగాలి (nenu edho adagaali) - I need to ask something"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i feel sad.' in telugu")) {
    correctOption = "నేను బాధగా ఉన్నాను (nenu baadhagaa unnaanu)";
    incorrectOptions = [
      "నాకు కోపం వచ్చింది (naaku kopam vachindi) - I am angry",
      "నేను సంతోషంగా ఉన్నాను (nenu santoshamgaa unnaanu) - I am happy",
      "నేను భయపడుతున్నాను (nenu bhayapadutunnaanu) - I am afraid"
    ];
  } else if (question.toLowerCase().includes("how do you say 'you are very good.' in telugu")) {
    correctOption = "మీరు చాలా మంచివారు (meeru chalaa manchivaru)";
    incorrectOptions = [
      "మీరు చాలా చెడ్డవారు (meeru chalaa cheddavaru) - You are very bad",
      "మీరు చాలా తెలివైనవారు (meeru chalaa telivainavaru) - You are very smart",
      "మీరు చాలా అందంగా ఉన్నారు (meeru chalaa andangaa unnaaru) - You are very beautiful"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i like you.' in telugu")) {
    correctOption = "నాకు మీరు నచ్చారు (naaku meeru nacharu)";
    incorrectOptions = [
      "నాకు మీరు నచ్చలేదు (naaku meeru nachaledhu) - I don't like you",
      "నేను మిమ్మల్ని ప్రేమిస్తున్నాను (nenu mimmalni premistunnanu) - I love you",
      "నేను మిమ్మల్ని గౌరవిస్తున్నాను (nenu mimmalni gauravistunaanu) - I respect you"
    ];
  } else if (question.toLowerCase().includes("how do you say 'be happy.' in telugu")) {
    correctOption = "సంతోషంగా ఉండండి (santoshamgaa undandi)";
    incorrectOptions = [
      "దుఖపడకండి (dukhpadakandi) - Don't be sad",
      "భయపడకండి (bhayapadakandi) - Don't be afraid",
      "కోపపడకండి (kopapadakandi) - Don't be angry"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i couldn't sleep.' in telugu")) {
    correctOption = "నేను నిద్రపోలేకపోయాను (nenu nidrapolekapoyanu)";
    incorrectOptions = [
      "నేను బాగా నిద్రపోయాను (nenu baagaa nidrapoyaanu) - I slept well",
      "నాకు నిద్ర రావడం లేదు (naaku nidra ravadam ledu) - I'm not able to sleep",
      "నేను నిద్రపోవాలి (nenu nidrapovali) - I need to sleep"
    ];
  }
  
  // Shopping and Transactions
  else if (question.toLowerCase().includes("how do you say 'tell me after weighing this.' in telugu")) {
    correctOption = "దీన్ని తూచి చెప్పండి (deenni toochi cheppandi)";
    incorrectOptions = [
      "దీన్ని చూపించండి (deenni choopinchandi) - Show me this",
      "దీన్ని ఇప్పించండి (deenni ippinchandi) - Give me this",
      "దీన్ని కొలవండి (deenni kolavandi) - Measure this"
    ];
  } else if (question.toLowerCase().includes("how do you say 'reduce this a little.' in telugu")) {
    correctOption = "దీన్ని కొంచెం తగ్గించండి (deenni konchem taggincandi)";
    incorrectOptions = [
      "దీన్ని కొంచెం పెంచండి (deenni konchem penchandi) - Increase this a little",
      "దీన్ని చాలా తగ్గించండి (deenni chalaa taggincandi) - Reduce this a lot",
      "దీన్ని మార్చండి (deenni marcandi) - Change this"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i want to buy this.' in telugu")) {
    correctOption = "నేను దీన్ని కొనాలనుకుంటున్నాను (nenu deenni konaalanukuntunnaanu)";
    incorrectOptions = [
      "నేను దీన్ని అమ్మాలనుకుంటున్నాను (nenu deenni ammaalanukuntunnaanu) - I want to sell this",
      "నేను దీన్ని చూడాలనుకుంటున్నాను (nenu deenni choodaalanukuntunnaanu) - I want to see this",
      "నేను దీన్ని ఇవ్వాలనుకుంటున్నాను (nenu deenni ivvaalanukuntunnaanu) - I want to give this"
    ];
  } else if (question.toLowerCase().includes("how do you say 'where can i find it?' in telugu")) {
    correctOption = "నేను దీన్ని ఎక్కడ కనుగొనగలను? (nenu deenni ekkada kanugonagalanu?)";
    incorrectOptions = [
      "దీని ధర ఎంత? (deeni dhara enta?) - How much does this cost?",
      "దీన్ని మీరు అమ్ముతారా? (deenni meeru ammutaaraa?) - Will you sell this?",
      "దీన్ని ఎలా వాడాలి? (deenni elaa vaadaali?) - How to use this?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i don't need this.' in telugu")) {
    correctOption = "నాకు ఇది అవసరం లేదు (naaku idi avasaram ledu)";
    incorrectOptions = [
      "నాకు ఇది కావాలి (naaku idi kaavaali) - I want this",
      "నాకు ఇది నచ్చింది (naaku idi nachindi) - I like this",
      "నాకు ఇది అర్థం కాలేదు (naaku idi artham kaaledhu) - I don't understand this"
    ];
  } else if (question.toLowerCase().includes("how do you say 'how much does this cost?' in telugu")) {
    correctOption = "దీని ధర ఎంత? (deeni dhara enta?)";
    incorrectOptions = [
      "మీరు ఈ ధర తగ్గించగలరా? (meeru ee dhara taggincagalaraa?) - Can you reduce this price?",
      "ఇది చాలా ఖరీదైనది (idi chalaa khareedainadi) - This is very expensive",
      "ఇది చాలా చౌకైనది (idi chalaa chaukainadi) - This is very cheap"
    ];
  } else if (question.toLowerCase().includes("how do you say 'do you have change?' in telugu")) {
    correctOption = "మీ దగ్గర చిల్లర ఉందా? (mee daggara chillara undaa?)";
    incorrectOptions = [
      "మీ దగ్గర డబ్బు ఉందా? (mee daggara dabbu undaa?) - Do you have money?",
      "మీరు నాకు చిల్లర ఇవ్వగలరా? (meeru naaku chillara ivvagalaraa?) - Can you give me change?",
      "మీరు చిల్లర తీసుకుంటారా? (meeru chillara teesukunataaraa?) - Will you take change?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'can i pay by card?' in telugu")) {
    correctOption = "నేను కార్డుతో చెల్లించవచ్చా? (nenu carduto chellinchavachaa?)";
    incorrectOptions = [
      "నేను నగదుతో చెల్లించవచ్చా? (nenu nagatuto chellinchavachaa?) - Can I pay with cash?",
      "మీరు కార్డు తీసుకుంటారా? (meeru card teesukonataara?) - Do you accept cards?",
      "నా కార్డు పని చేస్తుందా? (naa card pani chestundaa?) - Will my card work?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'it's too expensive.' in telugu")) {
    correctOption = "ఇది చాలా ఖరీదైనది (idi chalaa khareedainadi)";
    incorrectOptions = [
      "ఇది చాలా చౌకైనది (idi chalaa chaukainadi) - This is very cheap",
      "ఇది సరైన ధర (idi saraina dhara) - This is a fair price",
      "ఇది నాకు కొనగలిగేది కాదు (idi naaku konagaligedi kaadu) - I cannot afford this"
    ];
  } else if (question.toLowerCase().includes("how do you say 'do you have any discounts?' in telugu")) {
    correctOption = "మీ దగ్గర ఏవైనా తగ్గింపులు ఉన్నాయా? (mee daggara eevainaa taggimpulu unnaayaa?)";
    incorrectOptions = [
      "మీరు ధర తగ్గించగలరా? (meeru dhara taggincagalaraa?) - Can you reduce the price?",
      "ఇది చివరి ధర ఏమిటి? (idi chivari dhara emiti?) - What is the final price?",
      "ఒక్కొక్కదానికి ఎంత? (okkokkadaaniki enta?) - How much for each one?"
    ];
  }
  
  // Giving and Asking for Directions
  else if (question.toLowerCase().includes("how do you say 'where is the bus station?' in telugu")) {
    correctOption = "బస్సు స్టేషన్ ఎక్కడ ఉంది? (bassu station ekkada undi?)";
    incorrectOptions = [
      "రైలు స్టేషన్ ఎక్కడ ఉంది? (railu station ekkada undi?) - Where is the train station?",
      "ఇక్కడ నుండి బస్సు స్టేషన్ ఎంత దూరం? (ikkada nundi bassu station enta dooram?) - How far is the bus station from here?",
      "ఏ బస్సు తీసుకోవాలి? (ye bassu teesukovaali?) - Which bus should I take?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'go straight ahead.' in telugu")) {
    correctOption = "తిన్నగా వెళ్ళండి (tinnagaa vellandi)";
    incorrectOptions = [
      "కుడి వైపుకి తిరగండి (kudi vaipuki tiragandi) - Turn right",
      "ఎడమ వైపుకి తిరగండి (edama vaipuki tiragandi) - Turn left",
      "ఆగండి (aagandi) - Stop"
    ];
  } else if (question.toLowerCase().includes("how do you say 'turn right.' in telugu")) {
    correctOption = "కుడి వైపుకి తిరగండి (kudi vaipuki tiragandi)";
    incorrectOptions = [
      "ఎడమ వైపుకి తిరగండి (edama vaipuki tiragandi) - Turn left",
      "తిన్నగా వెళ్ళండి (tinnagaa vellandi) - Go straight ahead",
      "వెనక్కి తిరగండి (venakki tiragandi) - Turn back"
    ];
  } else if (question.toLowerCase().includes("how do you say 'turn left.' in telugu")) {
    correctOption = "ఎడమ వైపుకి తిరగండి (edama vaipuki tiragandi)";
    incorrectOptions = [
      "కుడి వైపుకి తిరగండి (kudi vaipuki tiragandi) - Turn right",
      "తిన్నగా వెళ్ళండి (tinnagaa vellandi) - Go straight ahead",
      "వెనక్కి తిరగండి (venakki tiragandi) - Turn back"
    ];
  } else if (question.toLowerCase().includes("how do you say 'it's far from here.' in telugu")) {
    correctOption = "ఇక్కడ నుండి చాలా దూరం (ikkada nundi chalaa dooram)";
    incorrectOptions = [
      "ఇక్కడ నుండి దగ్గరగా ఉంది (ikkada nundi daggaraga undi) - It's near from here",
      "ఇక్కడే ఉంది (ikkade undi) - It's right here",
      "చాలా దూరం కాదు (chalaa dooram kaadu) - It's not very far"
    ];
  } else if (question.toLowerCase().includes("how do you say 'it's near.' in telugu")) {
    correctOption = "అది దగ్గరలో ఉంది (adi daggaralo undi)";
    incorrectOptions = [
      "అది చాలా దూరంలో ఉంది (adi chalaa dooramlo undi) - It's very far",
      "అది ఇక్కడ లేదు (adi ikkada ledu) - It's not here",
      "అది పక్కన లేదు (adi pakkana ledu) - It's not nearby"
    ];
  } else if (question.toLowerCase().includes("how do you say 'can you show me the way?' in telugu")) {
    correctOption = "నాకు దారి చూపించగలరా? (naaku daari choopinchagalaraa?)";
    incorrectOptions = [
      "నాకు ఏది సరైన దారి? (naaku edi saraina daari?) - Which is the right way?",
      "ఎక్కడికి వెళ్ళాలి? (ekkadiki vellaali?) - Where should I go?",
      "ఈ దారి సరైనదేనా? (ee daari sarainadena?) - Is this the right way?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i am lost.' in telugu")) {
    correctOption = "నేను దారి తప్పిపోయాను (nenu daari tappipoyaanu)";
    incorrectOptions = [
      "నాకు దారి తెలియదు (naaku daari teliyadu) - I don't know the way",
      "నేను కొత్తవాడిని (nenu kottavaadini) - I am new here",
      "నేను ఎక్కడ ఉన్నానో తెలియడం లేదు (nenu ekkada unnaano teliyadam ledu) - I don't know where I am"
    ];
  } else if (question.toLowerCase().includes("how do you say 'is it far?' in telugu")) {
    correctOption = "అది దూరమా? (adi dooramaa?)";
    incorrectOptions = [
      "అది దగ్గరా? (adi daggaraa?) - Is it near?",
      "అది ఎంత దూరం? (adi enta dooram?) - How far is it?",
      "అది ఇక్కడ నుండి ఎంత దూరం? (adi ikkada nundi enta dooram?) - How far is it from here?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'how much time will it take?' in telugu")) {
    correctOption = "అది ఎంత సమయం పడుతుంది? (adi enta samayam padutundi?)";
    incorrectOptions = [
      "మనం ఎప్పుడు చేరుకుంటాము? (manam eppudu cherukuntaamu?) - When will we reach?",
      "అది ఎంత దూరం? (adi enta dooram?) - How far is it?",
      "మనం వెంటనే వెళదామా? (manam ventane vellaamaa?) - Shall we go immediately?"
    ];
  }
  
  // Time and Date Expressions
  else if (question.toLowerCase().includes("how do you say 'what time is it now?' in telugu")) {
    correctOption = "ఇప్పుడు ఎంత సమయం అయింది? (ippudu enta samayam ayindi?)";
    incorrectOptions = [
      "ఏ సమయం అయింది? (ye samayam ayindi?) - What time is it?",
      "గంట ఎంత అయింది? (ganta enta ayindi?) - What hour is it?",
      "ఇప్పుడు ఎంత గంటలు? (ippudu enta gantalu?) - How many hours now?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'it's 2 o'clock.' in telugu")) {
    correctOption = "రెండు గంటలు అయింది (rendu gantalu ayindi)";
    incorrectOptions = [
      "మూడు గంటలు అయింది (moodu gantalu ayindi) - It's 3 o'clock",
      "రెండున్నర గంటలు అయింది (rendunnara gantalu ayindi) - It's 2:30",
      "ఒంటి గంట అయింది (onti ganta ayindi) - It's 1 o'clock"
    ];
  } else if (question.toLowerCase().includes("how do you say 'what is the date today?' in telugu")) {
    correctOption = "ఈరోజు తేదీ ఏమిటి? (eeroju tedee emiti?)";
    incorrectOptions = [
      "ఈరోజు ఏ రోజు? (eeroju ye roju?) - What day is today?",
      "నేడు ఏ నెల? (nedu ye nela?) - What month is it today?",
      "ఇవాళ ఏమి రోజు? (ivaala emi roju?) - What day is it today?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i'll meet you tomorrow.' in telugu")) {
    correctOption = "నేను నిన్ను రేపు కలుస్తాను (nenu ninnu repu kalustanu)";
    incorrectOptions = [
      "నేను నిన్ను ఇప్పుడు కలుస్తాను (nenu ninnu ippudu kalustanu) - I'll meet you now",
      "నేను నిన్ను నిన్న కలిశాను (nenu ninnu ninna kalishaanu) - I met you yesterday",
      "నేను నిన్ను వారం తరువాత కలుస్తాను (nenu ninnu vaaram taruvaata kalustanu) - I'll meet you after a week"
    ];
  } else if (question.toLowerCase().includes("how do you say 'let's meet next week.' in telugu")) {
    correctOption = "వచ్చే వారం కలుద్దాం (vachche vaaram kaluddaam)";
    incorrectOptions = [
      "ఈ వారం కలుద్దాం (ee vaaram kaluddaam) - Let's meet this week",
      "రేపు కలుద్దాం (repu kaluddaam) - Let's meet tomorrow",
      "వచ్చే నెల కలుద్దాం (vachche nela kaluddaam) - Let's meet next month"
    ];
  } else if (question.toLowerCase().includes("how do you say 'are you free now?' in telugu")) {
    correctOption = "మీరు ఇప్పుడు ఖాళీగా ఉన్నారా? (meeru ippudu khaleega unnaaraa?)";
    incorrectOptions = [
      "మీరు బిజీగా ఉన్నారా? (meeru bijeega unnaaraa?) - Are you busy?",
      "మీరు రేపు ఖాళీగా ఉంటారా? (meeru repu khaleega untaaraa?) - Will you be free tomorrow?",
      "మీకు సమయం ఉందా? (meeku samayam undaa?) - Do you have time?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i'm running late.' in telugu")) {
    correctOption = "నేను ఆలస్యంగా వస్తున్నాను (nenu aalasyamgaa vastunnaanu)";
    incorrectOptions = [
      "నేను సమయానికి వస్తాను (nenu samayaniki vastaanu) - I'll come on time",
      "నేను త్వరగా వస్తున్నాను (nenu tvaragaa vastunnaanu) - I'm coming quickly",
      "నేను ఇప్పుడే వస్తున్నాను (nenu ippude vastunnaanu) - I'm coming right now"
    ];
  } else if (question.toLowerCase().includes("how do you say 'wait for five minutes.' in telugu")) {
    correctOption = "అయిదు నిమిషాలు వేచి ఉండండి (ayidu nimishaalu vechi undandi)";
    incorrectOptions = [
      "పది నిమిషాలు వేచి ఉండండి (padi nimishaalu vechi undandi) - Wait for ten minutes",
      "వెంటనే రండి (ventane randi) - Come immediately",
      "కొంచెం ఆగండి (konchem aagandi) - Wait a little"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i'll be back soon.' in telugu")) {
    correctOption = "నేను త్వరలో తిరిగి వస్తాను (nenu tvaralo tirigi vastaanu)";
    incorrectOptions = [
      "నేను వెళ్ళిపోతున్నాను (nenu vellipotunnaanu) - I'm leaving",
      "నేను తిరిగి రాను (nenu tirigi raanu) - I won't come back",
      "నేను చాలా సేపు తర్వాత వస్తాను (nenu chaalaa sepu tarvaata vastaanu) - I'll come after a long time"
    ];
  } else if (question.toLowerCase().includes("how do you say 'let's meet tomorrow.' in telugu")) {
    correctOption = "రేపు కలుద్దాం (repu kaluddaam)";
    incorrectOptions = [
      "ఇప్పుడు కలుద్దాం (ippudu kaluddaam) - Let's meet now",
      "నిన్న కలిశాము (ninna kalishaamu) - We met yesterday",
      "వచ్చే వారం కలుద్దాం (vachche vaaram kaluddaam) - Let's meet next week"
    ];
  }
  
  // Travel and Transportation
  else if (question.toLowerCase().includes("how do you say 'where is the train station?' in telugu")) {
    correctOption = "రైలు స్టేషన్ ఎక్కడ ఉంది? (railu station ekkada undi?)";
    incorrectOptions = [
      "బస్సు స్టేషన్ ఎక్కడ ఉంది? (bassu station ekkada undi?) - Where is the bus station?",
      "ఏ రైలు తీసుకోవాలి? (ye railu teesukovaali?) - Which train should I take?",
      "రైలు ఎప్పుడు వస్తుంది? (railu eppudu vastundi?) - When will the train come?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'when does the bus leave?' in telugu")) {
    correctOption = "బస్సు ఎప్పుడు బయలుదేరుతుంది? (bassu eppudu bayaluderuthundi?)";
    incorrectOptions = [
      "బస్సు ఎక్కడికి వెళుతుంది? (bassu ekkadiki veluthundi?) - Where does the bus go?",
      "బస్సు ఎక్కడ ఆగుతుంది? (bassu ekkada aaguthundi?) - Where does the bus stop?",
      "బస్సు టికెట్ ఎంత? (bassu ticket enta?) - How much is the bus ticket?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'how much is the ticket?' in telugu")) {
    correctOption = "టికెట్ ఎంత? (ticket enta?)";
    incorrectOptions = [
      "టికెట్ ఎక్కడ కొనాలి? (ticket ekkada konaali?) - Where to buy the ticket?",
      "నాకు ఒక టికెట్ కావాలి (naaku oka ticket kaavaali) - I need one ticket",
      "టికెట్ దొరుకుతుందా? (ticket dorukutundaa?) - Is the ticket available?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'is this the right bus?' in telugu")) {
    correctOption = "ఇది సరైన బస్సా? (idi saraina bassaa?)";
    incorrectOptions = [
      "ఈ బస్సు ఎక్కడికి వెళుతుంది? (ee bassu ekkadiki veluthundi?) - Where does this bus go?",
      "ఈ బస్సు ఎప్పుడు బయలుదేరుతుంది? (ee bassu eppudu bayaluderuthundi?) - When does this bus leave?",
      "నేను ఏ బస్సు ఎక్కాలి? (nenu ye bassu ekkaali?) - Which bus should I board?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'please stop here.' in telugu")) {
    correctOption = "దయచేసి ఇక్కడ ఆపండి (dayachesi ikkada aapandi)";
    incorrectOptions = [
      "దయచేసి ముందు ఆపండి (dayachesi mundu aapandi) - Please stop ahead",
      "ఇక్కడ దిగాలి (ikkada digaali) - I need to get down here",
      "ఇక్కడ ఆగదు (ikkada aagadu) - It doesn't stop here"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i want to go to the market.' in telugu")) {
    correctOption = "నేను మార్కెట్‌కి వెళ్ళాలనుకుంటున్నాను (nenu market-ki vellaalanukuntunnaanu)";
    incorrectOptions = [
      "నేను ఇంటికి వెళ్ళాలనుకుంటున్నాను (nenu intiki vellaalanukuntunnaanu) - I want to go home",
      "మార్కెట్ ఎక్కడ ఉంది? (market ekkada undi?) - Where is the market?",
      "మార్కెట్‌కి వెళ్ళే దారి ఏది? (market-ki velle daari edi?) - Which way to the market?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'how far is it?' in telugu")) {
    correctOption = "అది ఎంత దూరం? (adi enta dooram?)";
    incorrectOptions = [
      "అది ఎక్కడ ఉంది? (adi ekkada undi?) - Where is it?",
      "అది ఎలా ఉంది? (adi elaa undi?) - How is it?",
      "అది దగ్గరలో ఉందా? (adi daggaralo undaa?) - Is it nearby?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'call a taxi, please.' in telugu")) {
    correctOption = "దయచేసి ఒక టాక్సీని పిలవండి (dayachesi oka taxini pilavandi)";
    incorrectOptions = [
      "టాక్సీ ఎక్కడ దొరుకుతుంది? (taxi ekkada dorukutundi?) - Where can I find a taxi?",
      "టాక్సీ ఎంత అవుతుంది? (taxi enta avutundi?) - How much will the taxi cost?",
      "టాక్సీ నంబర్ ఏమిటి? (taxi number emiti?) - What's the taxi number?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'is there a direct bus?' in telugu")) {
    correctOption = "నేరుగా వెళ్ళే బస్సు ఉందా? (nerugaa velle bassu undaa?)";
    incorrectOptions = [
      "బస్సు మార్చాలా? (bassu maarchaalaa?) - Do I need to change buses?",
      "ఎన్ని బస్సులు మారాలి? (enni bassulu maaraali?) - How many buses do I need to change?",
      "బస్సు ఎప్పుడు వస్తుంది? (bassu eppudu vastundi?) - When will the bus come?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i need to change buses.' in telugu")) {
    correctOption = "నేను బస్సులు మార్చాలి (nenu bassulu maarchaali)";
    incorrectOptions = [
      "నేరుగా వెళ్ళే బస్సు ఉందా? (nerugaa velle bassu undaa?) - Is there a direct bus?",
      "ఏ బస్సు తీసుకోవాలి? (ye bassu teesukovaali?) - Which bus should I take?",
      "బస్సు ఎక్కడ మారాలి? (bassu ekkada maaraali?) - Where should I change the bus?"
    ];
  }
  
  // Health and Emergencies
  else if (question.toLowerCase().includes("how do you say 'i don't feel well.' in telugu")) {
    correctOption = "నాకు బాగా లేదు (naaku baagaa ledu)";
    incorrectOptions = [
      "నాకు జ్వరంగా ఉంది (naaku jwaramgaa undi) - I have a fever",
      "నాకు తలనొప్పిగా ఉంది (naaku talanoppigaa undi) - I have a headache",
      "నేను అనారోగ్యంతో ఉన్నాను (nenu anaarogyamto unnaanu) - I am unwell"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i need a doctor.' in telugu")) {
    correctOption = "నాకు డాక్టర్ కావాలి (naaku doctor kaavaali)";
    incorrectOptions = [
      "డాక్టర్ ఎక్కడ ఉన్నారు? (doctor ekkada unnaaru?) - Where is the doctor?",
      "నాకు ఆసుపత్రికి వెళ్ళాలి (naaku asupathiriki vellaali) - I need to go to the hospital",
      "డాక్టర్ అందుబాటులో ఉన్నారా? (doctor andubaatulo unnaaraa?) - Is the doctor available?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'where is the hospital?' in telugu")) {
    correctOption = "ఆసుపత్రి ఎక్కడ ఉంది? (asupathri ekkada undi?)";
    incorrectOptions = [
      "డాక్టర్ ఎక్కడ ఉన్నారు? (doctor ekkada unnaaru?) - Where is the doctor?",
      "ఆసుపత్రి ఎంత దూరంలో ఉంది? (asupathri enta dooramlo undi?) - How far is the hospital?",
      "ఆసుపత్రికి ఎలా వెళ్ళాలి? (asupathiriki elaa vellaali?) - How to go to the hospital?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i have a headache.' in telugu")) {
    correctOption = "నాకు తలనొప్పిగా ఉంది (naaku talanoppigaa undi)";
    incorrectOptions = [
      "నాకు కడుపునొప్పిగా ఉంది (naaku kadupunoppigaa undi) - I have a stomachache",
      "నాకు జ్వరంగా ఉంది (naaku jwaramgaa undi) - I have a fever",
      "నాకు దగ్గు వస్తోంది (naaku daggu vastondi) - I have a cough"
    ];
  } else if (question.toLowerCase().includes("how do you say 'call an ambulance.' in telugu")) {
    correctOption = "అంబులెన్స్ పిలవండి (ambulance pilavandi)";
    incorrectOptions = [
      "డాక్టర్‌ని పిలవండి (doctorni pilavandi) - Call a doctor",
      "పోలీసులను పిలవండి (polisulanu pilavandi) - Call the police",
      "త్వరగా రండి (tvaragaa randi) - Come quickly"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i need medicine.' in telugu")) {
    correctOption = "నాకు మందులు కావాలి (naaku mandulu kaavaali)";
    incorrectOptions = [
      "మందుల దుకాణం ఎక్కడ? (mandul dukanam ekkada?) - Where is the pharmacy?",
      "ఈ మందు ఎలా వాడాలి? (ee mandu elaa vaadaali?) - How to use this medicine?",
      "మందు ఎంత ఖరీదు? (mandu enta khariidu?) - How much does the medicine cost?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'where is the pharmacy?' in telugu")) {
    correctOption = "మందుల దుకాణం ఎక్కడ ఉంది? (mandul dukanam ekkada undi?)";
    incorrectOptions = [
      "ఆసుపత్రి ఎక్కడ ఉంది? (asupathri ekkada undi?) - Where is the hospital?",
      "మందులు ఎక్కడ దొరుకుతాయి? (mandulu ekkada dorukutaayi?) - Where can I find medicines?",
      "మందు ఖరీదు ఎంత? (mandu khariidu enta?) - How much does the medicine cost?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i'm allergic to this.' in telugu")) {
    correctOption = "నాకు దీని వల్ల అలెర్జీ (naaku deeni valla allergy)";
    incorrectOptions = [
      "నేను దీన్ని తీసుకోలేను (nenu deenni teesukoleanu) - I cannot take this",
      "నాకు దీని వల్ల చర్మం దురద (naaku deeni valla charmam durada) - This gives me skin itching",
      "ఇది నాకు పడదు (idi naaku padadu) - This is not suitable for me"
    ];
  } else if (question.toLowerCase().includes("how do you say 'help me, please.' in telugu")) {
    correctOption = "దయచేసి నాకు సహాయం చేయండి (dayachesi naaku sahaayam cheyandi)";
    incorrectOptions = [
      "నాకు సహాయం కావాలి (naaku sahaayam kaavaali) - I need help",
      "వెంటనే రండి (ventane randi) - Come immediately",
      "దయచేసి నన్ను కాపాడండి (dayachesi nannu kaapaadandi) - Please save me"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i'm feeling better now.' in telugu")) {
    correctOption = "నాకు ఇప్పుడు బాగుంది (naaku ippudu baagundi)";
    incorrectOptions = [
      "నాకు ఇంకా బాగాలేదు (naaku inkaa baagaaledu) - I'm still not well",
      "నేను కోలుకుంటున్నాను (nenu kolukuntunaanu) - I'm recovering",
      "నాకు కొంచెం నయమైంది (naaku konchem nayamaindi) - I'm a little better"
    ];
  }
  
  // Making Plans and Arrangements
  else if (question.toLowerCase().includes("how do you say 'are you free this weekend?' in telugu")) {
    correctOption = "ఈ వారాంతంలో మీరు ఖాళీగా ఉన్నారా? (ee vaaraantamlo meeru khaaliga unnaaraa?)";
    incorrectOptions = [
      "మీరు రేపు ఖాళీగా ఉంటారా? (meeru repu khaaliga untaaraa?) - Are you free tomorrow?",
      "మీరు ఈ వారం బిజీగా ఉన్నారా? (meeru ee vaaram bijeega unnaaraa?) - Are you busy this week?",
      "ఈ వారాంతంలో ఏమైనా ప్లాన్ ఉందా? (ee vaaraantamlo emainaa plan undaa?) - Do you have any plans this weekend?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'would you like to join us?' in telugu")) {
    correctOption = "మీరు మాతో చేరాలనుకుంటున్నారా? (meeru maato cheraalanukuntunaraa?)";
    incorrectOptions = [
      "మీరు రాగలరా? (meeru raagalaraa?) - Can you come?",
      "మీరు వస్తారా? (meeru vastaaraa?) - Will you come?",
      "మీకు మాతో రావాలని ఉందా? (meeku maato raavaalani undaa?) - Do you want to come with us?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'what time should we meet?' in telugu")) {
    correctOption = "మనం ఎంత సమయానికి కలవాలి? (manam enta samayaniki kalavaali?)";
    incorrectOptions = [
      "మనం ఎక్కడ కలవాలి? (manam ekkada kalavaali?) - Where should we meet?",
      "మీరు ఎప్పుడు వస్తారు? (meeru eppudu vastaru?) - When will you come?",
      "మీకు ఏ సమయం అనుకూలం? (meeku ye samayam anukoolam?) - What time is convenient for you?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i'll call you later.' in telugu")) {
    correctOption = "నేను మీకు తర్వాత ఫోన్ చేస్తాను (nenu meeku tarvaata phone chestanu)";
    incorrectOptions = [
      "నేను మిమ్మల్ని తర్వాత కలుస్తాను (nenu mimmalni tarvaata kalustanu) - I'll meet you later",
      "నాకు మీతో మాట్లాడాలి (naaku meetho maatlaadaali) - I need to talk to you",
      "మీరు నాకు ఫోన్ చేయండి (meeru naaku phone cheyandi) - You call me"
    ];
  } else if (question.toLowerCase().includes("how do you say 'let's go to a restaurant.' in telugu")) {
    correctOption = "రెస్టారెంట్‌కి వెళదాం (restaurant-ki velladaam)";
    incorrectOptions = [
      "మీకు ఆకలేస్తోందా? (meeku akalestondaa?) - Are you hungry?",
      "మీరు భోజనం చేశారా? (meeru bhojanam chesaaraa?) - Have you eaten?",
      "మనం బయట భోజనం చేద్దామా? (manam bayata bhojanam cheddaamaa?) - Shall we eat outside?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'do you have any plans?' in telugu")) {
    correctOption = "మీకు ఏవైనా ప్లాన్లు ఉన్నాయా? (meeku yeevainaa plan-lu unnayaa?)";
    incorrectOptions = [
      "మీరు ఏమి చేస్తున్నారు? (meeru emi chestunnaru?) - What are you doing?",
      "మీరు ఖాళీగా ఉన్నారా? (meeru khaaligaa unnaaraa?) - Are you free?",
      "మీరు రాగలరా? (meeru raagalaraa?) - Can you come?"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i'm busy today.' in telugu")) {
    correctOption = "నేను ఈరోజు బిజీగా ఉన్నాను (nenu eeroju bijeegaa unnaanu)";
    incorrectOptions = [
      "నేను ఈరోజు ఖాళీగా ఉన్నాను (nenu eeroju khaaligaa unnaanu) - I'm free today",
      "నాకు ఈరోజు చాలా పని ఉంది (naaku eeroju chalaa pani undi) - I have a lot of work today",
      "నేను ఈరోజు రాలేను (nenu eeroju raalenu) - I can't come today"
    ];
  } else if (question.toLowerCase().includes("how do you say 'i'll be there on time.' in telugu")) {
    correctOption = "నేను సమయానికి అక్కడ ఉంటాను (nenu samayaniki akkada untaanu)";
    incorrectOptions = [
      "నేను ఆలస్యంగా వస్తాను (nenu aalasyangaa vastaanu) - I'll come late",
      "నేను త్వరగా వస్తాను (nenu tvaragaa vastaanu) - I'll come quickly",
      "నేను సరిగ్గా వస్తాను (nenu sariggaa vastaanu) - I'll come exactly"
    ];
  } else if (question.toLowerCase().includes("how do you say 'see you soon.' in telugu")) {
    correctOption = "త్వరలో కలుద్దాం (tvaralo kaluddaam)";
    incorrectOptions = [
      "రేపు కలుద్దాం (repu kaluddaam) - See you tomorrow",
      "మళ్ళీ కలుద్దాం (mallee kaluddaam) - See you again",
      "వీడ్కోలు (veedkolu) - Goodbye"
    ];
  } else {
    // Default to random options if no specific case matches
    console.log(`No specific handler for question: "${question}"`);
    correctOption = teluguVowels[0];
    incorrectOptions = [teluguVowels[1], teluguVowels[2], teluguVowels[3]];
  }
  
  return [
    { challengeId, text: correctOption, correct: true },
    { challengeId, text: incorrectOptions[0], correct: false },
    { challengeId, text: incorrectOptions[1], correct: false },
    { challengeId, text: incorrectOptions[2], correct: false },
  ];
}

/**
 * Creates the Telugu course
 */
export async function createTeluguCourse() {
  console.log("Creating Telugu course...");
  
  const [teluguCourse] = await db.insert(schema.courses).values([
    { title: "Telugu", imageSrc: "/tel.svg" }
  ]).returning();
  
  console.log(`Created Telugu course (ID: ${teluguCourse.id})`);
  return teluguCourse;
}

/**
 * Creates Telugu units
 */
export async function createTeluguUnits(courseId: number) {
  console.log("Creating Telugu units...");
  
  const units = await db.insert(schema.units).values([
    {
      courseId: courseId,
      title: "Telugu Script",
      description: "Learn Telugu alphabet and writing system",
      order: 1,
    },
    {
      courseId: courseId,
      title: "Telugu Vocabulary",
      description: "Learn essential Telugu words and their meanings",
      order: 2,
    },
    {
      courseId: courseId,
      title: "Telugu Basic Grammar",
      description: "Learn fundamental Telugu grammar rules and sentence structure",
      order: 3,
    },
    {
      courseId: courseId,
      title: "Basic Conversations",
      description: "Learn everyday Telugu phrases",
      order: 4,
    }
  ]).returning();
  
  console.log(`Created ${units.length} Telugu units`);
  return units;
}

/**
 * Creates Telugu lessons
 */
export async function createTeluguLessons(units: any[]) {
  console.log("Creating Telugu lessons...");
  
  const scriptUnitId = units[0].id;
  const vocabularyUnitId = units[1].id;
  const grammarUnitId = units[2].id;
  const conversationsUnitId = units[3].id;
  
  const lessons = await db.insert(schema.lessons).values([
    // Telugu Script Unit
    { unitId: scriptUnitId, title: "Short Vowels (హ్రస్వాలు)", order: 1 },
    { unitId: scriptUnitId, title: "Long Vowels (దీర్ఘాలు)", order: 2 },
    { unitId: scriptUnitId, title: "Compound Vowels (ద్విత్వాలు)", order: 3 },
    { unitId: scriptUnitId, title: "Velar Consonants (కవర్గము)", order: 4 },
    { unitId: scriptUnitId, title: "Palatal Consonants (చవర్గము)", order: 5 },
    { unitId: scriptUnitId, title: "Retroflex Consonants (టవర్గము)", order: 6 },
    { unitId: scriptUnitId, title: "Dental Consonants (తవర్గము)", order: 7 },
    { unitId: scriptUnitId, title: "Labial Consonants (పవర్గము)", order: 8 },
    { unitId: scriptUnitId, title: "Semivowels (అంతస్థలు)", order: 9 },
    { unitId: scriptUnitId, title: "Sibilants & Aspirate (ఊష్మాలు)", order: 10 },
    
    // Telugu Vocabulary Unit
    { unitId: vocabularyUnitId, title: "Common Nouns", order: 1 },
    { unitId: vocabularyUnitId, title: "Essential Verbs", order: 2 },
    { unitId: vocabularyUnitId, title: "Colors and Numbers", order: 3 },
    { unitId: vocabularyUnitId, title: "Family and Relationships", order: 4 },
    { unitId: vocabularyUnitId, title: "Food and Dining", order: 5 },
    
    // Telugu Grammar Unit
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
  
  console.log(`Created ${lessons.length} Telugu lessons`);
  return lessons;
}

/**
 * Creates Telugu challenges for script lessons
 */
export async function createTeluguScriptChallenges(lessons: any[]) {
  console.log("Creating Telugu script challenges...");
  
  const challenges = await db.insert(schema.challenges).values([
    // Short Vowels
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
    
    // Long Vowels
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
    
    // Compound Vowels
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
  ]).returning();
  
  console.log(`Created ${challenges.length} Telugu script challenges`);
  return challenges;
}

/**
 * Creates Telugu challenges for all lessons
 */
export async function createTeluguChallenges(lessons: any[]) {
  console.log("Creating Telugu challenges...");
  
  // Group lessons by their types for easier reference
  const scriptLessons = lessons.slice(0, 10);
  const vocabularyLessons = lessons.slice(10, 15);
  const grammarLessons = lessons.slice(15, 20);
  const conversationLessons = lessons.slice(20, 30); // Add this line for conversation lessons
  
  const scriptChallenges = await createTeluguScriptChallenges(scriptLessons);
  const vocabularyChallenges = await createTeluguVocabularyChallenges(vocabularyLessons);
  const grammarChallenges = await createTeluguGrammarChallenges(grammarLessons);
  const conversationChallenges = await createTeluguConversationChallenges(conversationLessons); // Add this line
  
  const allChallenges = [...scriptChallenges, ...vocabularyChallenges, ...grammarChallenges, ...conversationChallenges]; // Update this
  
  console.log(`Created ${allChallenges.length} total Telugu challenges`);
  return allChallenges;
}

/**
 * Creates Telugu vocabulary challenges
 */
export async function createTeluguVocabularyChallenges(lessons: any[]) {
  console.log("Creating Telugu vocabulary challenges...");
  
  // These should correspond to "Common Nouns", "Essential Verbs", "Colors and Numbers", etc.
  const commonNounsLesson = lessons[0];
  const essentialVerbsLesson = lessons[1];
  const colorsNumbersLesson = lessons[2];
  const familyRelationshipsLesson = lessons[3];
  const foodDiningLesson = lessons[4];
  
  const challenges = await db.insert(schema.challenges).values([
    // Common Nouns
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What is the Telugu word for 'book'?", order: 1 },
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What is the Telugu word for 'house'?", order: 2 },
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What is the Telugu word for 'water'?", order: 3 },
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What is the Telugu word for 'food'?", order: 4 },
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What is the Telugu word for 'work'?", order: 5 },
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What does 'పుస్తకం' mean?", order: 6 },
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What does 'ఇల్లు' mean?", order: 7 },
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What does 'నీరు' mean?", order: 8 },
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What does 'భోజనం' mean?", order: 9 },
    { lessonId: commonNounsLesson.id, type: "SELECT", question: "What does 'పని' mean?", order: 10 },
    
    // Essential Verbs
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What is the Telugu verb for 'to eat'?", order: 1 },
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What is the Telugu verb for 'to go'?", order: 2 },
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What is the Telugu verb for 'to read'?", order: 3 },
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What is the Telugu verb for 'to write'?", order: 4 },
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What is the Telugu verb for 'to do'?", order: 5 },
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What does 'తిను' mean?", order: 6 },
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What does 'వెళ్ళు' mean?", order: 7 },
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What does 'చదువు' mean?", order: 8 },
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What does 'రాయు' mean?", order: 9 },
    { lessonId: essentialVerbsLesson.id, type: "SELECT", question: "What does 'చేయు' mean?", order: 10 },
    
    // Colors and Numbers
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What is the Telugu word for 'red'?", order: 1 },
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What is the Telugu word for 'blue'?", order: 2 },
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What is the Telugu word for 'one'?", order: 3 },
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What is the Telugu word for 'two'?", order: 4 },
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What is the Telugu word for 'three'?", order: 5 },
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What does 'ఎరుపు' mean?", order: 6 },
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What does 'నీలం' mean?", order: 7 },
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What does 'ఒకటి' mean?", order: 8 },
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What does 'రెండు' mean?", order: 9 },
    { lessonId: colorsNumbersLesson.id, type: "SELECT", question: "What does 'మూడు' mean?", order: 10 },
    
    // Family and Relationships
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What is the Telugu word for 'mother'?", order: 1 },
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What is the Telugu word for 'father'?", order: 2 },
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What is the Telugu word for 'elder sister'?", order: 3 },
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What is the Telugu word for 'elder brother'?", order: 4 },
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What is the Telugu word for 'younger brother'?", order: 5 },
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What does 'అమ్మ' mean?", order: 6 },
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What does 'నాన్న' mean?", order: 7 },
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What does 'అక్క' mean?", order: 8 },
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What does 'అన్న' mean?", order: 9 },
    { lessonId: familyRelationshipsLesson.id, type: "SELECT", question: "What does 'తమ్ముడు' mean?", order: 10 },
    
    // Food and Dining
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What is the Telugu word for 'rice'?", order: 1 },
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What is the Telugu word for 'vegetable'?", order: 2 },
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What is the Telugu word for 'spicy'?", order: 3 },
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What is the Telugu word for 'sweet'?", order: 4 },
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What is the Telugu word for 'to cook'?", order: 5 },
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What does 'అన్నం' mean?", order: 6 },
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What does 'కూరగాయలు' mean?", order: 7 },
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What does 'కారం' mean?", order: 8 },
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What does 'తియ్యని' mean?", order: 9 },
    { lessonId: foodDiningLesson.id, type: "SELECT", question: "What does 'వండు' mean?", order: 10 },
  ]).returning();
  
  console.log(`Created ${challenges.length} Telugu vocabulary challenges`);
  return challenges;
}

/**
 * Creates Telugu grammar challenges
 */
export async function createTeluguGrammarChallenges(lessons: any[]) {
  console.log("Creating Telugu grammar challenges...");
  
  // These should correspond to "Basic Sentence Structure", "Pronouns", "Present Tense", etc.
  const sentenceStructureLesson = lessons[0];
  const pronounsLesson = lessons[1];
  const presentTenseLesson = lessons[2];
  const pastTenseLesson = lessons[3];
  const futureTenseLesson = lessons[4];
  
  const challenges = await db.insert(schema.challenges).values([
    // Basic Sentence Structure
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "In Telugu, what is the typical word order?", order: 1 },
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "How do you say 'This is a book' in Telugu?", order: 2 },
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "How do you say 'I am eating food' in Telugu?", order: 3 },
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "How are questions formed in Telugu?", order: 4 },
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "How do you say 'What is this?' in Telugu?", order: 5 },
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "What is the role of 'గా' in Telugu sentences?", order: 6 },
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "What is the role of 'కి' in Telugu sentences?", order: 7 },
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "What is the role of 'లో' in Telugu sentences?", order: 8 },
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "How do you form a negative sentence in Telugu?", order: 9 },
    { lessonId: sentenceStructureLesson.id, type: "SELECT", question: "How do you say 'I don't know' in Telugu?", order: 10 },
    
    // Pronouns
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What is the Telugu word for 'I'?", order: 1 },
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What is the Telugu word for 'you' (informal)?", order: 2 },
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What is the Telugu word for 'he'?", order: 3 },
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What is the Telugu word for 'she'?", order: 4 },
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What is the Telugu word for 'they'?", order: 5 },
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What does 'నేను' mean?", order: 6 },
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What does 'నువ్వు' mean?", order: 7 },
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What does 'అతను' mean?", order: 8 },
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What does 'ఆమె' mean?", order: 9 },
    { lessonId: pronounsLesson.id, type: "SELECT", question: "What does 'వారు' mean?", order: 10 },
    
    // Present Tense
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'I am' in Telugu?", order: 1 },
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'You are' in Telugu?", order: 2 },
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'He is' in Telugu?", order: 3 },
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'She is' in Telugu?", order: 4 },
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'They are' in Telugu?", order: 5 },
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'I am eating' in Telugu?", order: 6 },
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'You are reading' in Telugu?", order: 7 },
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'He is going' in Telugu?", order: 8 },
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'She is writing' in Telugu?", order: 9 },
    { lessonId: presentTenseLesson.id, type: "SELECT", question: "How do you say 'They are working' in Telugu?", order: 10 },
    
    // Past Tense
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "How do you form the past tense in Telugu?", order: 1 },
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "How do you say 'I ate' in Telugu?", order: 2 },
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "How do you say 'You went' in Telugu?", order: 3 },
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "How do you say 'He read' in Telugu?", order: 4 },
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "How do you say 'She wrote' in Telugu?", order: 5 },
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "How do you say 'They worked' in Telugu?", order: 6 },
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "What is the past tense marker in Telugu?", order: 7 },
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "How do irregular verbs form the past tense in Telugu?", order: 8 },
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "How do you say 'I didn't eat' in Telugu?", order: 9 },
    { lessonId: pastTenseLesson.id, type: "SELECT", question: "How do you say 'Did you go?' in Telugu?", order: 10 },
    
    // Future Tense
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "How do you form the future tense in Telugu?", order: 1 },
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "How do you say 'I will eat' in Telugu?", order: 2 },
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "How do you say 'You will go' in Telugu?", order: 3 },
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "How do you say 'He will read' in Telugu?", order: 4 },
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "How do you say 'She will write' in Telugu?", order: 5 },
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "How do you say 'They will work' in Telugu?", order: 6 },
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "What is the future tense marker in Telugu?", order: 7 },
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "How do irregular verbs form the future tense in Telugu?", order: 8 },
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "How do you say 'I will not eat' in Telugu?", order: 9 },
    { lessonId: futureTenseLesson.id, type: "SELECT", question: "How do you say 'Will you go?' in Telugu?", order: 10 },
  ]).returning();
  
  console.log(`Created ${challenges.length} Telugu grammar challenges`);
  return challenges;
}

/**
 * Creates Telugu conversation challenges
 */
export async function createTeluguConversationChallenges(lessons: any[]) {
  console.log("Creating Telugu conversation challenges...");
  
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
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'How are you?' in Telugu?", order: 1 },
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'I am fine.' in Telugu?", order: 2 },
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'What is your name?' in Telugu?", order: 3 },
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'My name is [name].' in Telugu?", order: 4 },
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'Send a message.' in Telugu?", order: 5 },
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'Come here.' in Telugu?", order: 6 },
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'Come immediately.' in Telugu?", order: 7 },
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'Who is at your house?' in Telugu?", order: 8 },
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'Can you speak Telugu?' in Telugu?", order: 9 },
    { lessonId: greetingsLesson.id, type: "SELECT", question: "How do you say 'I can speak a little.' in Telugu?", order: 10 },
    
    // Common Questions
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'Where are you going?' in Telugu?", order: 1 },
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'When will you come?' in Telugu?", order: 2 },
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'Whose is this?' in Telugu?", order: 3 },
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'What are you doing?' in Telugu?", order: 4 },
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'How much is this?' in Telugu?", order: 5 },
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'What happened today?' in Telugu?", order: 6 },
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'How do you know?' in Telugu?", order: 7 },
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'Do you like it?' in Telugu?", order: 8 },
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'Whom should I tell?' in Telugu?", order: 9 },
    { lessonId: commonQuestionsLesson.id, type: "SELECT", question: "How do you say 'Can I do it?' in Telugu?", order: 10 },
    
    // Daily Routine Phrases
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'Did you eat?' in Telugu?", order: 1 },
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'Did you wake up?' in Telugu?", order: 2 },
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'Is the work finished?' in Telugu?", order: 3 },
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'Did you take a bath?' in Telugu?", order: 4 },
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'What time is it?' in Telugu?", order: 5 },
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'When will you go?' in Telugu?", order: 6 },
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'Are you at home?' in Telugu?", order: 7 },
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'Please do this work.' in Telugu?", order: 8 },
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'Get ready.' in Telugu?", order: 9 },
    { lessonId: dailyRoutineLesson.id, type: "SELECT", question: "How do you say 'Where is he?' in Telugu?", order: 10 },
    
    // Expressions of Emotion
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'I don't know.' in Telugu?", order: 1 },
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'I like it.' in Telugu?", order: 2 },
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'I am angry.' in Telugu?", order: 3 },
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'That is very nice.' in Telugu?", order: 4 },
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'I need to say something.' in Telugu?", order: 5 },
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'I feel sad.' in Telugu?", order: 6 },
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'You are very good.' in Telugu?", order: 7 },
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'I like you.' in Telugu?", order: 8 },
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'Be happy.' in Telugu?", order: 9 },
    { lessonId: expressionsEmotionLesson.id, type: "SELECT", question: "How do you say 'I couldn't sleep.' in Telugu?", order: 10 },
    
    // Shopping and Transactions
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'Tell me after weighing this.' in Telugu?", order: 1 },
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'Reduce this a little.' in Telugu?", order: 2 },
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'I want to buy this.' in Telugu?", order: 3 },
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'Where can I find it?' in Telugu?", order: 4 },
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'I don't need this.' in Telugu?", order: 5 },
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'How much does this cost?' in Telugu?", order: 6 },
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'Do you have change?' in Telugu?", order: 7 },
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'Can I pay by card?' in Telugu?", order: 8 },
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'It's too expensive.' in Telugu?", order: 9 },
    { lessonId: shoppingLesson.id, type: "SELECT", question: "How do you say 'Do you have any discounts?' in Telugu?", order: 10 },
    
    // Giving and Asking for Directions
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'Where is the bus station?' in Telugu?", order: 1 },
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'Go straight ahead.' in Telugu?", order: 2 },
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'Turn right.' in Telugu?", order: 3 },
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'Turn left.' in Telugu?", order: 4 },
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'It's far from here.' in Telugu?", order: 5 },
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'It's near.' in Telugu?", order: 6 },
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'Can you show me the way?' in Telugu?", order: 7 },
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'I am lost.' in Telugu?", order: 8 },
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'Is it far?' in Telugu?", order: 9 },
    { lessonId: directionsLesson.id, type: "SELECT", question: "How do you say 'How much time will it take?' in Telugu?", order: 10 },
    
    // Time and Date Expressions
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'What time is it now?' in Telugu?", order: 1 },
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'It's 2 o'clock.' in Telugu?", order: 2 },
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'What is the date today?' in Telugu?", order: 3 },
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'I'll meet you tomorrow.' in Telugu?", order: 4 },
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'Let's meet next week.' in Telugu?", order: 5 },
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'Are you free now?' in Telugu?", order: 6 },
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'I'm running late.' in Telugu?", order: 7 },
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'Wait for five minutes.' in Telugu?", order: 8 },
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'I'll be back soon.' in Telugu?", order: 9 },
    { lessonId: timeLesson.id, type: "SELECT", question: "How do you say 'Let's meet tomorrow.' in Telugu?", order: 10 },
    
    // Travel and Transportation
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'Where is the train station?' in Telugu?", order: 1 },
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'When does the bus leave?' in Telugu?", order: 2 },
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'How much is the ticket?' in Telugu?", order: 3 },
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'Is this the right bus?' in Telugu?", order: 4 },
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'Please stop here.' in Telugu?", order: 5 },
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'I want to go to the market.' in Telugu?", order: 6 },
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'How far is it?' in Telugu?", order: 7 },
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'Call a taxi, please.' in Telugu?", order: 8 },
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'Is there a direct bus?' in Telugu?", order: 9 },
    { lessonId: travelLesson.id, type: "SELECT", question: "How do you say 'I need to change buses.' in Telugu?", order: 10 },
    
    // Health and Emergencies
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'I don't feel well.' in Telugu?", order: 1 },
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'I need a doctor.' in Telugu?", order: 2 },
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'Where is the hospital?' in Telugu?", order: 3 },
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'I have a headache.' in Telugu?", order: 4 },
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'Call an ambulance.' in Telugu?", order: 5 },
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'I need medicine.' in Telugu?", order: 6 },
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'Where is the pharmacy?' in Telugu?", order: 7 },
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'I'm allergic to this.' in Telugu?", order: 8 },
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'Help me, please.' in Telugu?", order: 9 },
    { lessonId: healthLesson.id, type: "SELECT", question: "How do you say 'I'm feeling better now.' in Telugu?", order: 10 },
    
    // Making Plans and Arrangements
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'Let's meet tomorrow.' in Telugu?", order: 1 },
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'Are you free this weekend?' in Telugu?", order: 2 },
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'Would you like to join us?' in Telugu?", order: 3 },
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'What time should we meet?' in Telugu?", order: 4 },
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'I'll call you later.' in Telugu?", order: 5 },
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'Let's go to a restaurant.' in Telugu?", order: 6 },
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'Do you have any plans?' in Telugu?", order: 7 },
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'I'm busy today.' in Telugu?", order: 8 },
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'I'll be there on time.' in Telugu?", order: 9 },
    { lessonId: plansLesson.id, type: "SELECT", question: "How do you say 'See you soon.' in Telugu?", order: 10 }
  ]).returning();
  
  console.log(`Created ${challenges.length} Telugu conversation challenges`);
  return challenges;
}

/**
 * Creates options for Telugu challenges
 */
export async function createOptionsForTeluguChallenges(challenges: any[]) {
  console.log("Creating options for Telugu challenges...");
  
  const options = [];
  
  for (const challenge of challenges) {
    const challengeOptions = createTeluguOptions(challenge.id, challenge.question);
    options.push(...challengeOptions);
  }
  
  await addOptionsToDB(options);
  return options;
}

/**
 * Main function to seed Telugu data
 */
export async function seedTeluguData() {
  console.log("🌱 Starting Telugu data seeding...");
  
  try {
    // Create course, units, lessons, and challenges
    const teluguCourse = await createTeluguCourse();
    const teluguUnits = await createTeluguUnits(teluguCourse.id);
    const teluguLessons = await createTeluguLessons(teluguUnits);
    const teluguChallenges = await createTeluguChallenges(teluguLessons);
    
    // Create options for challenges
    await createOptionsForTeluguChallenges(teluguChallenges);
    
    console.log("✅ Telugu data seeding completed");
    return {
      course: teluguCourse,
      units: teluguUnits,
      lessons: teluguLessons,
      challenges: teluguChallenges
    };
  } catch (error) {
    console.error("❌ Telugu data seeding failed:", error);
    throw error;
  }
} 