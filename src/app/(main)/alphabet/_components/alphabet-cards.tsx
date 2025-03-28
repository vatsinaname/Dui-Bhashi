"use client";

import React from "react";
import { AlphabetCard } from "./alphabet-card";
import { teluguAlphabet, kannadaAlphabet } from "./alphabet-data";

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
  audioSrc?: string;
}

interface AlphabetCardsProps {
  courseTitle: string;
}

export const AlphabetCards: React.FC<AlphabetCardsProps> = ({ courseTitle }) => {
  // Determine which alphabet to use based on course title
  const alphabet: AlphabetCharacter[] = courseTitle.toLowerCase().includes("telugu") 
    ? teluguAlphabet 
    : courseTitle.toLowerCase().includes("kannada")
      ? kannadaAlphabet
      : [];
  
  // Group alphabet by category
  const alphabetByCategory = React.useMemo(() => {
    const grouped: Record<string, AlphabetCharacter[]> = {};
    
    alphabet.forEach(char => {
      if (!grouped[char.category]) {
        grouped[char.category] = [];
      }
      grouped[char.category].push(char);
    });
    
    return grouped;
  }, [alphabet]);
  
  // Get a human-readable category name
  const getCategoryTitle = (category: string): string => {
    const isTelugu = courseTitle.toLowerCase().includes("telugu");
    const isKannada = courseTitle.toLowerCase().includes("kannada");
    
    switch (category) {
      case "vowel": 
        return isTelugu ? "Vowels (అచ్చులు - Achulu)" : 
               isKannada ? "Vowels (ಸ್ವರಗಳು - Swaragalu)" :
               "Vowels";
      case "consonant-velar": 
        return isTelugu ? "Velar Consonants (కవర్గము - Kavargamu)" : 
               isKannada ? "Velar Consonants (ಕವರ್ಗ - Kavarga)" :
               "Velar Consonants";
      case "consonant-palatal": 
        return isTelugu ? "Palatal Consonants (చవర్గము - Chavargamu)" : 
               isKannada ? "Palatal Consonants (ಚವರ್ಗ - Chavarga)" :
               "Palatal Consonants";
      case "consonant-retroflex": 
        return isTelugu ? "Retroflex Consonants (టవర్గము - Tavargamu)" : 
               isKannada ? "Retroflex Consonants (ಟವರ್ಗ - Tavarga)" :
               "Retroflex Consonants";
      case "consonant-dental": 
        return isTelugu ? "Dental Consonants (తవర్గము - Tavargamu)" : 
               isKannada ? "Dental Consonants (ತವರ್ಗ - Tavarga)" :
               "Dental Consonants";
      case "consonant-labial": 
        return isTelugu ? "Labial Consonants (పవర్గము - Pavargamu)" : 
               isKannada ? "Labial Consonants (ಪವರ್ಗ - Pavarga)" :
               "Labial Consonants";
      case "semivowel": 
        return isTelugu ? "Semivowels (అంతస్థలు - Antasthalu)" : 
               isKannada ? "Semivowels (ಅಂತಃಸ್ಥಗಳು - Antahsthagalu)" :
               "Semivowels";
      case "fricative": 
        return isTelugu ? "Fricatives (ఊష్మాలు - Ushmalu)" : 
               isKannada ? "Fricatives (ಊಷ್ಮಾಕ್ಷರಗಳು - Ushmaksaragalu)" :
               "Fricatives";
      case "compound": 
        return isTelugu ? "Compound Letters (సంయుక్తాక్షరాలు - Samyuktaksharalu)" : 
               isKannada ? "Compound Letters (ಸಂಯುಕ್ತಾಕ್ಷರಗಳು - Samyuktaksaragalu)" :
               "Compound Letters";
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };
  
  // Order of categories to display
  const categoryOrder = [
    "vowel", 
    "consonant-velar", 
    "consonant-palatal", 
    "consonant-retroflex", 
    "consonant-dental", 
    "consonant-labial", 
    "semivowel", 
    "fricative", 
    "compound"
  ];
  
  return (
    <div className="w-full max-w-7xl mx-auto">
      {alphabet.length === 0 ? (
        <div className="text-center p-8 border-2 border-dashed rounded-xl">
          <p className="text-muted-foreground">
            Alphabet data not available for this language yet.
          </p>
        </div>
      ) : (
        <div className="space-y-12 pt-6">
          {categoryOrder.map((category, index) => {
            const charactersInCategory = alphabetByCategory[category];
            if (!charactersInCategory || charactersInCategory.length === 0) return null;
            
            return (
              <div key={category} className={`mb-10 ${index === 0 ? 'pt-4' : ''}`}>
                <h3 className="text-xl sm:text-2xl font-semibold mb-5 border-b border-[#d7c3d9] pb-2 text-[#6d4b73] dark:text-blue-400 break-words">
                  {getCategoryTitle(category)}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {charactersInCategory.map((char: AlphabetCharacter) => (
                    <AlphabetCard
                      key={char.character}
                      character={char.character}
                      romanized={char.romanized}
                      pronunciation={char.pronunciation}
                      example={char.example}
                      audioSrc={char.audioSrc}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}; 