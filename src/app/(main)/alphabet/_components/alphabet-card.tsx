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
      className="h-44 relative w-full cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={cn(
        "relative w-full h-full transition-all duration-500 transform-style-3d",
        isFlipped ? "rotate-y-180" : ""
      )}>
        {/* Front of card */}
        <div className={cn(
          "absolute inset-0 w-full h-full bg-white dark:bg-slate-800 rounded-lg border p-3 flex flex-col items-center justify-center",
          "shadow-sm hover:shadow-md transition-shadow backface-hidden"
        )}>
          <span className="text-5xl font-bold mb-2">{character}</span>
          <span className="text-sm font-medium">{romanized}</span>
          {audioSrc && (
            <button 
              className="absolute top-2 right-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              onClick={playAudio}
            >
              <Volume2 size={18} />
            </button>
          )}
        </div>
        
        {/* Back of card */}
        <div className={cn(
          "absolute inset-0 w-full h-full bg-white dark:bg-slate-800 rounded-lg border p-3 flex flex-col",
          "shadow-sm backface-hidden rotate-y-180"
        )}>
          <div className="flex-1 flex flex-col justify-between">
            <div className="mb-2">
              <h3 className="font-bold text-center text-sm mb-0.5">Pronunciation</h3>
              <p className="text-center text-muted-foreground text-xs">{pronunciation}</p>
            </div>
            
            <div className="border-t pt-2">
              <h3 className="font-bold text-center text-sm mb-1">Example</h3>
              <p className="text-center font-medium text-base mb-0.5">{example.word}</p>
              <p className="text-center italic text-xs mb-0.5">{example.romanized}</p>
              <p className="text-center text-muted-foreground text-xs">{example.meaning}</p>
            </div>
          </div>
          
          {audioSrc && (
            <button 
              className="absolute top-2 right-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              onClick={playAudio}
            >
              <Volume2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 