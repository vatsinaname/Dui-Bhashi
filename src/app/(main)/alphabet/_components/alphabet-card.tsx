"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Volume2 } from "lucide-react";

interface AlphabetCardProps {
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

export const AlphabetCard: React.FC<AlphabetCardProps> = ({ 
  character, 
  romanized, 
  pronunciation, 
  example,
  audioSrc
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.play().catch(console.error);
    }
  };

  return (
    <div 
      className="aspect-square relative h-full w-full cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={cn(
        "relative w-full h-full transition-all duration-500",
        isFlipped ? "rotate-y-180" : ""
      )}>
        {/* Front of card */}
        <div className={cn(
          "absolute inset-0 w-full h-full bg-white dark:bg-slate-800 rounded-xl border-2 p-4 flex flex-col items-center justify-center",
          "shadow-md hover:shadow-lg transition-shadow",
          isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
          <span className="text-6xl font-bold mb-4">{character}</span>
          <span className="text-xl font-medium">{romanized}</span>
          {audioSrc && (
            <button 
              className="absolute top-3 right-3 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              onClick={playAudio}
            >
              <Volume2 size={20} />
            </button>
          )}
        </div>
        
        {/* Back of card */}
        <div className={cn(
          "absolute inset-0 w-full h-full bg-white dark:bg-slate-800 rounded-xl border-2 p-4 flex flex-col",
          "shadow-md",
          isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="text-lg font-bold text-center mb-2">Pronunciation</h3>
            <p className="text-center text-md text-muted-foreground">{pronunciation}</p>
            
            <div className="border-t mt-3 pt-3">
              <h3 className="text-lg font-bold text-center mb-2">Example</h3>
              <p className="text-center text-xl mb-1">{example.word}</p>
              <p className="text-center text-md italic mb-1">{example.romanized}</p>
              <p className="text-center text-md text-muted-foreground">{example.meaning}</p>
            </div>
          </div>
          
          {audioSrc && (
            <button 
              className="absolute top-3 right-3 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              onClick={playAudio}
            >
              <Volume2 size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 