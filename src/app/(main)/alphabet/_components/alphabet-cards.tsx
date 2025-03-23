"use client";

import React from "react";
import { AlphabetCard } from "./alphabet-card";
import { teluguAlphabet, kannadaAlphabet } from "./alphabet-data";

interface AlphabetCharacter {
  character: string;
  romanized: string;
  pronunciation: string;
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
  
  return (
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {alphabet.map((char: AlphabetCharacter) => (
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
      
      {alphabet.length === 0 && (
        <div className="text-center p-8 border-2 border-dashed rounded-xl">
          <p className="text-muted-foreground">
            Alphabet data not available for this language yet.
          </p>
        </div>
      )}
    </div>
  );
}; 