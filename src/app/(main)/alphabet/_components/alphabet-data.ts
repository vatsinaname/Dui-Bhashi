// Alphabet data for Telugu and Kannada

// Types
interface AlphabetCharacter {
  character: string;
  romanized: string;
  pronunciation: string;
  category: string;
  example: {
    word: string;
    meaning: string;
    romanized: string;
  };
  audioSrc?: string; // Optional audio file path
}

// Telugu Alphabet
export const teluguAlphabet: AlphabetCharacter[] = [
  // Vowels (Achulu)
  {
    character: "అ",
    romanized: "a",
    pronunciation: "Short 'a' as in 'about'",
    category: "vowel",
    example: {
      word: "అమ్మ",
      meaning: "Mother",
      romanized: "amma",
    }
  },
  {
    character: "ఆ",
    romanized: "ā",
    pronunciation: "Long 'aa' as in 'father'",
    category: "vowel",
    example: {
      word: "ఆవు",
      meaning: "Cow",
      romanized: "āvu",
    }
  },
  {
    character: "ఇ",
    romanized: "i",
    pronunciation: "Short 'i' as in 'sit'",
    category: "vowel",
    example: {
      word: "ఇల్లు",
      meaning: "House",
      romanized: "illu",
    }
  },
  {
    character: "ఈ",
    romanized: "ī",
    pronunciation: "Long 'ee' as in 'meet'",
    category: "vowel",
    example: {
      word: "ఈగ",
      meaning: "Fly (insect)",
      romanized: "īga",
    }
  },
  {
    character: "ఉ",
    romanized: "u",
    pronunciation: "Short 'u' as in 'put'",
    category: "vowel",
    example: {
      word: "ఉడుత",
      meaning: "Squirrel",
      romanized: "uduta",
    }
  },
  {
    character: "ఊ",
    romanized: "ū",
    pronunciation: "Long 'oo' as in 'boot'",
    category: "vowel",
    example: {
      word: "ఊరు",
      meaning: "Village",
      romanized: "ūru",
    }
  },
  {
    character: "ఋ",
    romanized: "ṛ",
    pronunciation: "Rolled 'r' with short 'i'",
    category: "vowel",
    example: {
      word: "ఋషభ",
      meaning: "Rishabh\n(Moral, Musical note)",
      romanized: "ṛṣabha",
    }
  },
  {
    character: "ౠ",
    romanized: "ṝ",
    pronunciation: "Rolled 'r' with long 'ee'",
    category: "vowel",
    example: {
      word: "ౠకారము",
      meaning: "The letter ౠ",
      romanized: "ṝkāramu",
    }
  },
  {
    character: "ఎ",
    romanized: "e",
    pronunciation: "Short 'e' as in 'bet'",
    category: "vowel",
    example: {
      word: "ఎలుక",
      meaning: "Mouse",
      romanized: "eluka",
    }
  },
  {
    character: "ఏ",
    romanized: "ē",
    pronunciation: "Long 'a' as in 'gate'",
    category: "vowel",
    example: {
      word: "ఏనుగు",
      meaning: "Elephant",
      romanized: "ēnugu",
    }
  },
  {
    character: "ఐ",
    romanized: "ai",
    pronunciation: "'ai' as in 'aisle'",
    category: "vowel",
    example: {
      word: "ఐదు",
      meaning: "Five",
      romanized: "aidu",
    }
  },
  {
    character: "ఒ",
    romanized: "o",
    pronunciation: "Short 'o' as in 'pot'",
    category: "vowel",
    example: {
      word: "ఒంటి",
      meaning: "Alone",
      romanized: "oṇṭi",
    }
  },
  {
    character: "ఓ",
    romanized: "ō",
    pronunciation: "Long 'o' as in 'boat'",
    category: "vowel",
    example: {
      word: "ఓడ",
      meaning: "Ship",
      romanized: "ōḍa",
    }
  },
  {
    character: "ఔ",
    romanized: "au",
    pronunciation: "'ou' as in 'out'",
    category: "vowel",
    example: {
      word: "ఔషధం",
      meaning: "Medicine",
      romanized: "auṣadhaṁ",
    }
  },
  {
    character: "అం",
    romanized: "aṁ",
    pronunciation: "Nasal 'n' sound after 'a'",
    category: "vowel",
    example: {
      word: "అంగడి",
      meaning: "Store",
      romanized: "aṁgaḍi",
    }
  },
  {
    character: "అః",
    romanized: "aḥ",
    pronunciation: "Light 'h' sound after 'a'",
    category: "vowel",
    example: {
      word: "దుఃఖం",
      meaning: "Sorrow",
      romanized: "duḥkhaṁ",
    }
  },

  // Consonants (Hallulu)
  // Velar consonants
  {
    character: "క",
    romanized: "ka",
    pronunciation: "'k' as in 'sky'",
    category: "consonant-velar",
    example: {
      word: "కలం",
      meaning: "Pen",
      romanized: "kalam",
    }
  },
  {
    character: "ఖ",
    romanized: "kha",
    pronunciation: "Aspirated 'k'",
    category: "consonant-velar",
    example: {
      word: "ఖరీదు",
      meaning: "Expensive",
      romanized: "kharīdu",
    }
  },
  {
    character: "గ",
    romanized: "ga",
    pronunciation: "'g' as in 'go'",
    category: "consonant-velar",
    example: {
      word: "గుడి",
      meaning: "Temple",
      romanized: "gudi",
    }
  },
  {
    character: "ఘ",
    romanized: "gha",
    pronunciation: "Aspirated 'g'",
    category: "consonant-velar",
    example: {
      word: "ఘంట",
      meaning: "Bell",
      romanized: "ghaṇṭa",
    }
  },
  {
    character: "ఙ",
    romanized: "ṅa",
    pronunciation: "Nasal 'ng' as in 'sing'",
    category: "consonant-velar",
    example: {
      word: "వాఙ్మయం",
      meaning: "Literature",
      romanized: "vāṅmayaṁ",
    }
  },
  
  // Palatal consonants
  {
    character: "చ",
    romanized: "cha",
    pronunciation: "'ch' as in 'church'",
    category: "consonant-palatal",
    example: {
      word: "చదువు",
      meaning: "Education",
      romanized: "chaduvu",
    }
  },
  {
    character: "ఛ",
    romanized: "chha",
    pronunciation: "Aspirated 'ch'",
    category: "consonant-palatal",
    example: {
      word: "ఛాయ",
      meaning: "Shadow",
      romanized: "chhāya",
    }
  },
  {
    character: "జ",
    romanized: "ja",
    pronunciation: "'j' as in 'jam'",
    category: "consonant-palatal",
    example: {
      word: "జల్లు",
      meaning: "Rain",
      romanized: "jallu",
    }
  },
  {
    character: "ఝ",
    romanized: "jha",
    pronunciation: "Aspirated 'j'",
    category: "consonant-palatal",
    example: {
      word: "ఝరీ",
      meaning: "Waterfall",
      romanized: "jharī",
    }
  },
  {
    character: "ఞ",
    romanized: "ña",
    pronunciation: "Nasal 'ny' as in 'canyon'",
    category: "consonant-palatal",
    example: {
      word: "విజ్ఞానం",
      meaning: "Knowledge",
      romanized: "vijñānaṁ",
    }
  },
  
  // Retroflex consonants
  {
    character: "ట",
    romanized: "ṭa",
    pronunciation: "Hard 't' with tongue curled back",
    category: "consonant-retroflex",
    example: {
      word: "టమాటా",
      meaning: "Tomato",
      romanized: "ṭamāṭā",
    }
  },
  {
    character: "ఠ",
    romanized: "ṭha",
    pronunciation: "Aspirated hard 't'",
    category: "consonant-retroflex",
    example: {
      word: "ఠీవి",
      meaning: "Grandeur",
      romanized: "ṭhīvi",
    }
  },
  {
    character: "డ",
    romanized: "ḍa",
    pronunciation: "Hard 'd' with tongue curled back",
    category: "consonant-retroflex",
    example: {
      word: "డబ్బా",
      meaning: "Box",
      romanized: "ḍabbā",
    }
  },
  {
    character: "ఢ",
    romanized: "ḍha",
    pronunciation: "Aspirated hard 'd'",
    category: "consonant-retroflex",
    example: {
      word: "ఢంకా",
      meaning: "Drum",
      romanized: "ḍhaṁkā",
    }
  },
  {
    character: "ణ",
    romanized: "ṇa",
    pronunciation: "Retroflex 'n'",
    category: "consonant-retroflex",
    example: {
      word: "వీణ",
      meaning: "Veena (instrument)",
      romanized: "vīṇa",
    }
  },
  
  // Dental consonants
  {
    character: "త",
    romanized: "ta",
    pronunciation: "Soft 't' with tongue at teeth",
    category: "consonant-dental",
    example: {
      word: "తల",
      meaning: "Head",
      romanized: "tala",
    }
  },
  {
    character: "థ",
    romanized: "tha",
    pronunciation: "Aspirated soft 't'",
    category: "consonant-dental",
    example: {
      word: "కథ",
      meaning: "Story",
      romanized: "katha",
    }
  },
  {
    character: "ద",
    romanized: "da",
    pronunciation: "Soft 'd' with tongue at teeth",
    category: "consonant-dental",
    example: {
      word: "దయ",
      meaning: "Kindness",
      romanized: "daya",
    }
  },
  {
    character: "ధ",
    romanized: "dha",
    pronunciation: "Aspirated soft 'd'",
    category: "consonant-dental",
    example: {
      word: "ధనం",
      meaning: "Wealth",
      romanized: "dhanaṁ",
    }
  },
  {
    character: "న",
    romanized: "na",
    pronunciation: "'n' as in 'net'",
    category: "consonant-dental",
    example: {
      word: "నది",
      meaning: "River",
      romanized: "nadi",
    }
  },
  
  // Labial consonants
  {
    character: "ప",
    romanized: "pa",
    pronunciation: "'p' as in 'spot'",
    category: "consonant-labial",
    example: {
      word: "పండు",
      meaning: "Fruit",
      romanized: "paṇḍu",
    }
  },
  {
    character: "ఫ",
    romanized: "pha",
    pronunciation: "Aspirated 'p'",
    category: "consonant-labial",
    example: {
      word: "ఫలం",
      meaning: "Result",
      romanized: "phalaṁ",
    }
  },
  {
    character: "బ",
    romanized: "ba",
    pronunciation: "'b' as in 'bat'",
    category: "consonant-labial",
    example: {
      word: "బడి",
      meaning: "School",
      romanized: "baḍi",
    }
  },
  {
    character: "భ",
    romanized: "bha",
    pronunciation: "Aspirated 'b'",
    category: "consonant-labial",
    example: {
      word: "భారతం",
      meaning: "India",
      romanized: "bhārataṁ",
    }
  },
  {
    character: "మ",
    romanized: "ma",
    pronunciation: "'m' as in 'mat'",
    category: "consonant-labial",
    example: {
      word: "మనసు",
      meaning: "Mind",
      romanized: "manasu",
    }
  },
  
  // Semivowels and fricatives
  {
    character: "య",
    romanized: "ya",
    pronunciation: "'y' as in 'yes'",
    category: "semivowel",
    example: {
      word: "యువత",
      meaning: "Youth",
      romanized: "yuvata",
    }
  },
  {
    character: "ర",
    romanized: "ra",
    pronunciation: "Rolled 'r'",
    category: "semivowel",
    example: {
      word: "రవి",
      meaning: "Sun",
      romanized: "ravi",
    }
  },
  {
    character: "ల",
    romanized: "la",
    pronunciation: "'l' as in 'love'",
    category: "semivowel",
    example: {
      word: "లేఖ",
      meaning: "Letter",
      romanized: "lēkha",
    }
  },
  {
    character: "వ",
    romanized: "va",
    pronunciation: "'v' closer to 'w'",
    category: "semivowel",
    example: {
      word: "వర్షిత",
      meaning: "Varshitha \n(Blessed by the rain)",
      romanized: "varṣita",
    }
  },
  {
    character: "శ",
    romanized: "śa",
    pronunciation: "'sh' as in 'shade'",
    category: "fricative",
    example: {
      word: "శివుడు",
      meaning: "Lord Shiva",
      romanized: "śivuḍu",
    }
  },
  {
    character: "ష",
    romanized: "ṣa",
    pronunciation: "Harder 'sh' with tongue curled back",
    category: "fricative",
    example: {
      word: "షట్కోణం",
      meaning: "Hexagon",
      romanized: "ṣaṭkōṇaṁ",
    }
  },
  {
    character: "స",
    romanized: "sa",
    pronunciation: "'s' as in 'sun'",
    category: "fricative",
    example: {
      word: "సముద్రం",
      meaning: "Ocean",
      romanized: "samudraṁ",
    }
  },
  {
    character: "హ",
    romanized: "ha",
    pronunciation: "'h' as in 'hat'",
    category: "fricative",
    example: {
      word: "హక్కు",
      meaning: "Right",
      romanized: "hakku",
    }
  },
  {
    character: "ళ",
    romanized: "ḷa",
    pronunciation: "Retroflex 'l' with tongue curled back",
    category: "semivowel",
    example: {
      word: "కళ",
      meaning: "Art",
      romanized: "kaḷa",
    }
  },
  {
    character: "క్ష",
    romanized: "kṣa",
    pronunciation: "'k' + 'sh' combined",
    category: "compound",
    example: {
      word: "క్షమించు",
      meaning: "Forgive",
      romanized: "kṣamiñcu",
    }
  },
  {
    character: "ఱ",
    romanized: "ṟa",
    pronunciation: "Harder trilled 'r'",
    category: "semivowel",
    example: {
      word: "మఱ్ఱి",
      meaning: "Banyan tree",
      romanized: "maṟṟi",
    }
  }
];

// Kannada Alphabet
export const kannadaAlphabet: AlphabetCharacter[] = [
  // Vowels (Swaras)
  {
    character: "ಅ",
    romanized: "a",
    pronunciation: "Short 'a' as in 'about'",
    category: "vowel",
    example: {
      word: "ಅಪ್ಪ",
      meaning: "Father",
      romanized: "appa",
    }
  },
  {
    character: "ಆ",
    romanized: "ā",
    pronunciation: "Long 'aa' as in 'father'",
    category: "vowel",
    example: {
      word: "ಆನೆ",
      meaning: "Elephant",
      romanized: "āne",
    }
  },
  {
    character: "ಇ",
    romanized: "i",
    pronunciation: "Short 'i' as in 'sit'",
    category: "vowel",
    example: {
      word: "ಇಲಿ",
      meaning: "Mouse",
      romanized: "ili",
    }
  },
  {
    character: "ಈ",
    romanized: "ī",
    pronunciation: "Long 'ee' as in 'meet'",
    category: "vowel",
    example: {
      word: "ಈಚಲು",
      meaning: "Feather",
      romanized: "īchalu",
    }
  },
  {
    character: "ಉ",
    romanized: "u",
    pronunciation: "Short 'u' as in 'put'",
    category: "vowel",
    example: {
      word: "ಉಪ್ಪು",
      meaning: "Salt",
      romanized: "uppu",
    }
  },
  {
    character: "ಊ",
    romanized: "ū",
    pronunciation: "Long 'oo' as in 'boot'",
    category: "vowel",
    example: {
      word: "ಊರು",
      meaning: "Village",
      romanized: "ūru",
    }
  },
  {
    character: "ಋ",
    romanized: "ṛ",
    pronunciation: "Rolled 'r' with short 'i'",
    category: "vowel",
    example: {
      word: "ಋಷಿ",
      meaning: "Sage",
      romanized: "ṛṣi",
    }
  },
  {
    character: "ೠ",
    romanized: "ṝ",
    pronunciation: "Rolled 'r' with long 'ee'",
    category: "vowel",
    example: {
      word: "ೠಕಾರ",
      meaning: "The letter ೠ",
      romanized: "ṝkāra",
    }
  },
  {
    character: "ಎ",
    romanized: "e",
    pronunciation: "Short 'e' as in 'bet'",
    category: "vowel",
    example: {
      word: "ಎಲೆ",
      meaning: "Leaf",
      romanized: "ele",
    }
  },
  {
    character: "ಏ",
    romanized: "ē",
    pronunciation: "Long 'a' as in 'gate'",
    category: "vowel",
    example: {
      word: "ಏಣಿ",
      meaning: "Ladder",
      romanized: "ēṇi",
    }
  },
  {
    character: "ಐ",
    romanized: "ai",
    pronunciation: "'ai' as in 'aisle'",
    category: "vowel",
    example: {
      word: "ಐದು",
      meaning: "Five",
      romanized: "aidu",
    }
  },
  {
    character: "ಒ",
    romanized: "o",
    pronunciation: "Short 'o' as in 'pot'",
    category: "vowel",
    example: {
      word: "ಒಂಟಿ",
      meaning: "Alone",
      romanized: "oṇṭi",
    }
  },
  {
    character: "ಓ",
    romanized: "ō",
    pronunciation: "Long 'o' as in 'boat'",
    category: "vowel",
    example: {
      word: "ಓದು",
      meaning: "Read",
      romanized: "ōdu",
    }
  },
  {
    character: "ಔ",
    romanized: "au",
    pronunciation: "'ou' as in 'out'",
    category: "vowel",
    example: {
      word: "ಔಷಧ",
      meaning: "Medicine",
      romanized: "auṣadha",
    }
  },
  {
    character: "ಅಂ",
    romanized: "aṁ",
    pronunciation: "Nasal 'n' sound after 'a'",
    category: "vowel",
    example: {
      word: "ಅಂಗಡಿ",
      meaning: "Shop",
      romanized: "aṁgaḍi",
    }
  },
  {
    character: "ಅಃ",
    romanized: "aḥ",
    pronunciation: "Light 'h' sound after 'a'",
    category: "vowel",
    example: {
      word: "ದುಃಖ",
      meaning: "Sorrow",
      romanized: "duḥkha",
    }
  },

  // Consonants (Vyanjanas)
  // Velar consonants
  {
    character: "ಕ",
    romanized: "ka",
    pronunciation: "'k' as in 'sky'",
    category: "consonant-velar",
    example: {
      word: "ಕಮಲ",
      meaning: "Lotus",
      romanized: "kamala",
    }
  },
  {
    character: "ಖ",
    romanized: "kha",
    pronunciation: "Aspirated 'k'",
    category: "consonant-velar",
    example: {
      word: "ಖರ್ಚು",
      meaning: "Expense",
      romanized: "kharchu",
    }
  },
  {
    character: "ಗ",
    romanized: "ga",
    pronunciation: "'g' as in 'go'",
    category: "consonant-velar",
    example: {
      word: "ಗಾಳಿ",
      meaning: "Wind",
      romanized: "gāḷi",
    }
  },
  {
    character: "ಘ",
    romanized: "gha",
    pronunciation: "Aspirated 'g'",
    category: "consonant-velar",
    example: {
      word: "ಘಂಟೆ",
      meaning: "Bell",
      romanized: "ghaṇṭe",
    }
  },
  {
    character: "ಙ",
    romanized: "ṅa",
    pronunciation: "Nasal 'ng' as in 'sing'",
    category: "consonant-velar",
    example: {
      word: "ತರಂಗ",
      meaning: "Wave",
      romanized: "taraṅga",
    }
  },
  
  // Palatal consonants
  {
    character: "ಚ",
    romanized: "cha",
    pronunciation: "'ch' as in 'church'",
    category: "consonant-palatal",
    example: {
      word: "ಚಂದ್ರ",
      meaning: "Moon",
      romanized: "chandra",
    }
  },
  {
    character: "ಛ",
    romanized: "chha",
    pronunciation: "Aspirated 'ch'",
    category: "consonant-palatal",
    example: {
      word: "ಛಾಯೆ",
      meaning: "Shadow",
      romanized: "chhāye",
    }
  },
  {
    character: "ಜ",
    romanized: "ja",
    pronunciation: "'j' as in 'jam'",
    category: "consonant-palatal",
    example: {
      word: "ಜನ",
      meaning: "People",
      romanized: "jana",
    }
  },
  {
    character: "ಝ",
    romanized: "jha",
    pronunciation: "Aspirated 'j'",
    category: "consonant-palatal",
    example: {
      word: "ಝರಿ",
      meaning: "Waterfall",
      romanized: "jhari",
    }
  },
  {
    character: "ಞ",
    romanized: "ña",
    pronunciation: "Nasal 'ny' as in 'canyon'",
    category: "consonant-palatal",
    example: {
      word: "ಜ್ಞಾನ",
      meaning: "Knowledge",
      romanized: "jñāna",
    }
  },
  
  // Retroflex consonants
  {
    character: "ಟ",
    romanized: "ṭa",
    pronunciation: "Hard 't' with tongue curled back",
    category: "consonant-retroflex",
    example: {
      word: "ಟಮಾಟೊ",
      meaning: "Tomato",
      romanized: "ṭamāṭo",
    }
  },
  {
    character: "ಠ",
    romanized: "ṭha",
    pronunciation: "Aspirated hard 't'",
    category: "consonant-retroflex",
    example: {
      word: "ಠೀವಿ",
      meaning: "Grandeur",
      romanized: "ṭhīvi",
    }
  },
  {
    character: "ಡ",
    romanized: "ḍa",
    pronunciation: "Hard 'd' with tongue curled back",
    category: "consonant-retroflex",
    example: {
      word: "ಡಬ್ಬ",
      meaning: "Box",
      romanized: "ḍabba",
    }
  },
  {
    character: "ಢ",
    romanized: "ḍha",
    pronunciation: "Aspirated hard 'd'",
    category: "consonant-retroflex",
    example: {
      word: "ಢಕ್ಕೆ",
      meaning: "Drum",
      romanized: "ḍhakke",
    }
  },
  {
    character: "ಣ",
    romanized: "ṇa",
    pronunciation: "Retroflex 'n'",
    category: "consonant-retroflex",
    example: {
      word: "ಕರುಣೆ",
      meaning: "Compassion",
      romanized: "karuṇe",
    }
  },
  
  // Dental consonants
  {
    character: "ತ",
    romanized: "ta",
    pronunciation: "Soft 't' with tongue at teeth",
    category: "consonant-dental",
    example: {
      word: "ತಲೆ",
      meaning: "Head",
      romanized: "tale",
    }
  },
  {
    character: "ಥ",
    romanized: "tha",
    pronunciation: "Aspirated soft 't'",
    category: "consonant-dental",
    example: {
      word: "ಕಥೆ",
      meaning: "Story",
      romanized: "kathe",
    }
  },
  {
    character: "ದ",
    romanized: "da",
    pronunciation: "Soft 'd' with tongue at teeth",
    category: "consonant-dental",
    example: {
      word: "ದಯೆ",
      meaning: "Kindness",
      romanized: "daye",
    }
  },
  {
    character: "ಧ",
    romanized: "dha",
    pronunciation: "Aspirated soft 'd'",
    category: "consonant-dental",
    example: {
      word: "ಧನ",
      meaning: "Wealth",
      romanized: "dhana",
    }
  },
  {
    character: "ನ",
    romanized: "na",
    pronunciation: "'n' as in 'net'",
    category: "consonant-dental",
    example: {
      word: "ನದಿ",
      meaning: "River",
      romanized: "nadi",
    }
  },
  
  // Labial consonants
  {
    character: "ಪ",
    romanized: "pa",
    pronunciation: "'p' as in 'spot'",
    category: "consonant-labial",
    example: {
      word: "ಪಕ್ಕ",
      meaning: "Side",
      romanized: "pakka",
    }
  },
  {
    character: "ಫ",
    romanized: "pha",
    pronunciation: "Aspirated 'p'",
    category: "consonant-labial",
    example: {
      word: "ಫಲ",
      meaning: "Fruit",
      romanized: "phala",
    }
  },
  {
    character: "ಬ",
    romanized: "ba",
    pronunciation: "'b' as in 'bat'",
    category: "consonant-labial",
    example: {
      word: "ಬೆಳಕು",
      meaning: "Light",
      romanized: "beḷaku",
    }
  },
  {
    character: "ಭ",
    romanized: "bha",
    pronunciation: "Aspirated 'b'",
    category: "consonant-labial",
    example: {
      word: "ಭಾರತ",
      meaning: "India",
      romanized: "bhārata",
    }
  },
  {
    character: "ಮ",
    romanized: "ma",
    pronunciation: "'m' as in 'mat'",
    category: "consonant-labial",
    example: {
      word: "ಮನಸ್ಸು",
      meaning: "Mind",
      romanized: "manassu",
    }
  },
  
  // Semivowels and fricatives
  {
    character: "ಯ",
    romanized: "ya",
    pronunciation: "'y' as in 'yes'",
    category: "semivowel",
    example: {
      word: "ಯುವಕ",
      meaning: "Young man",
      romanized: "yuvaka",
    }
  },
  {
    character: "ರ",
    romanized: "ra",
    pronunciation: "Rolled 'r'",
    category: "semivowel",
    example: {
      word: "ರವಿ",
      meaning: "Sun",
      romanized: "ravi",
    }
  },
  {
    character: "ಲ",
    romanized: "la",
    pronunciation: "'l' as in 'love'",
    category: "semivowel",
    example: {
      word: "ಲೇಖನ",
      meaning: "Article",
      romanized: "lēkhana",
    }
  },
  {
    character: "ವ",
    romanized: "va",
    pronunciation: "'v' closer to 'w'",
    category: "semivowel",
    example: {
      word: "ವಾರ",
      meaning: "Week",
      romanized: "vāra",
    }
  },
  {
    character: "ಶ",
    romanized: "śa",
    pronunciation: "'sh' as in 'shade'",
    category: "fricative",
    example: {
      word: "ಶಿವ",
      meaning: "Lord Shiva",
      romanized: "śiva",
    }
  },
  {
    character: "ಷ",
    romanized: "ṣa",
    pronunciation: "Harder 'sh' with tongue curled back",
    category: "fricative",
    example: {
      word: "ಷಣ್ಮುಖ",
      meaning: "Six-faced",
      romanized: "ṣaṇmukha",
    }
  },
  {
    character: "ಸ",
    romanized: "sa",
    pronunciation: "'s' as in 'sun'",
    category: "fricative",
    example: {
      word: "ಸಮುದ್ರ",
      meaning: "Ocean",
      romanized: "samudra",
    }
  },
  {
    character: "ಹ",
    romanized: "ha",
    pronunciation: "'h' as in 'hat'",
    category: "fricative",
    example: {
      word: "ಹಕ್ಕು",
      meaning: "Right",
      romanized: "hakku",
    }
  },
  {
    character: "ಳ",
    romanized: "ḷa",
    pronunciation: "Retroflex 'l' with tongue curled back",
    category: "semivowel",
    example: {
      word: "ಕಳೆ",
      meaning: "Art",
      romanized: "kaḷe",
    }
  },
  {
    character: "ಕ್ಷ",
    romanized: "kṣa",
    pronunciation: "'k' + 'sh' combined",
    category: "compound",
    example: {
      word: "ಕ್ಷಮೆ",
      meaning: "Forgiveness",
      romanized: "kṣame",
    }
  },
  {
    character: "ಜ್ಞ",
    romanized: "jña",
    pronunciation: "'j' + 'ny' combined",
    category: "compound",
    example: {
      word: "ಜ್ಞಾನ",
      meaning: "Knowledge",
      romanized: "jñāna",
    }
  }
]; 