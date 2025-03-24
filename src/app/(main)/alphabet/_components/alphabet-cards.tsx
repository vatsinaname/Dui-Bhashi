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
    switch (category) {
      case "vowel": return "Vowels";
      case "consonant-velar": return "Velar Consonants";
      case "consonant-palatal": return "Palatal Consonants";
      case "consonant-retroflex": return "Retroflex Consonants";
      case "consonant-dental": return "Dental Consonants";
      case "consonant-labial": return "Labial Consonants";
      case "semivowel": return "Semivowels";
      case "fricative": return "Fricatives";
      case "compound": return "Compound Letters";
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
        <div className="space-y-12">
          {categoryOrder.map(category => {
            const charactersInCategory = alphabetByCategory[category];
            if (!charactersInCategory || charactersInCategory.length === 0) return null;
            
            return (
              <div key={category} className="mb-10">
                <h3 className="text-2xl font-semibold mb-5 border-b pb-2 text-blue-800 dark:text-blue-400">
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