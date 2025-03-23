// Alphabet data for Telugu and Kannada

// Types
interface AlphabetCharacter {
  character: string;
  romanized: string;
  pronunciation: string;
  example: {
    word: string;
    meaning: string;
    romanized: string;
  };
  audioSrc?: string; // Optional audio file path
}

// Telugu Alphabet
export const teluguAlphabet: AlphabetCharacter[] = [
  {
    character: "అ",
    romanized: "a",
    pronunciation: "Short 'a' as in 'about'",
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
    example: {
      word: "ఊరు",
      meaning: "Village",
      romanized: "ūru",
    }
  },
  {
    character: "ఎ",
    romanized: "e",
    pronunciation: "Short 'e' as in 'bet'",
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
    example: {
      word: "ఏనుగు",
      meaning: "Elephant",
      romanized: "ēnugu",
    }
  },
  {
    character: "క",
    romanized: "ka",
    pronunciation: "'k' as in 'sky'",
    example: {
      word: "కలం",
      meaning: "Pen",
      romanized: "kalam",
    }
  },
  {
    character: "గ",
    romanized: "ga",
    pronunciation: "'g' as in 'go'",
    example: {
      word: "గుడి",
      meaning: "Temple",
      romanized: "gudi",
    }
  },
  {
    character: "చ",
    romanized: "cha",
    pronunciation: "'ch' as in 'church'",
    example: {
      word: "చదువు",
      meaning: "Education",
      romanized: "chaduvu",
    }
  },
  {
    character: "జ",
    romanized: "ja",
    pronunciation: "'j' as in 'jam'",
    example: {
      word: "జల్లు",
      meaning: "Rain",
      romanized: "jallu",
    }
  }
];

// Kannada Alphabet
export const kannadaAlphabet: AlphabetCharacter[] = [
  {
    character: "ಅ",
    romanized: "a",
    pronunciation: "Short 'a' as in 'about'",
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
    example: {
      word: "ಊರು",
      meaning: "Village",
      romanized: "ūru",
    }
  },
  {
    character: "ಎ",
    romanized: "e",
    pronunciation: "Short 'e' as in 'bet'",
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
    example: {
      word: "ಏಣಿ",
      meaning: "Ladder",
      romanized: "ēni",
    }
  },
  {
    character: "ಕ",
    romanized: "ka",
    pronunciation: "'k' as in 'sky'",
    example: {
      word: "ಕಮಲ",
      meaning: "Lotus",
      romanized: "kamala",
    }
  },
  {
    character: "ಗ",
    romanized: "ga",
    pronunciation: "'g' as in 'go'",
    example: {
      word: "ಗಾಳಿ",
      meaning: "Wind",
      romanized: "gāḷi",
    }
  },
  {
    character: "ಚ",
    romanized: "cha",
    pronunciation: "'ch' as in 'church'",
    example: {
      word: "ಚಂದ್ರ",
      meaning: "Moon",
      romanized: "chandra",
    }
  },
  {
    character: "ಜ",
    romanized: "ja",
    pronunciation: "'j' as in 'jam'",
    example: {
      word: "ಜನ",
      meaning: "People",
      romanized: "jana",
    }
  }
]; 