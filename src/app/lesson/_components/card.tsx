import Image from "next/image";
import { Check, X } from "lucide-react";

import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useAudio, useKey } from "react-use";
import { useCallback, useEffect } from "react";

type Props = {
  id: number;
  imageSrc: string;
  audioSrc: string;
  text: string;
  shortcut?: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  status?: "correct" | "wrong" | "none" | "pending";
  type: (typeof challenges.$inferSelect)["type"];
};

export const Card = ({
  imageSrc,
  audioSrc,
  text,
  shortcut,
  selected,
  onClick,
  disabled,
  status,
  type,
}: Props) => {
  // Initialize audio elements with default sources if not provided
  const [audio] = useAudio({
    src: audioSrc || "/sounds/silence.mp3",
    autoPlay: false,
  });
  
  const [selectionAudio] = useAudio({
    src: "/sounds/select.mp3",
    autoPlay: false,
  });
  
  const [correctAudio] = useAudio({
    src: "/sounds/correct.mp3",
    autoPlay: false,
  });
  
  const [wrongAudio] = useAudio({
    src: "/sounds/wrong.mp3",
    autoPlay: false,
  });

  useEffect(() => {
    if (!status || !selected) return;

    const playStatusSound = async () => {
      try {
        const audioElement = status === "correct" ? 
          correctAudio : status === "wrong" ? 
          wrongAudio : null;

        if (audioElement && audioElement instanceof HTMLAudioElement) {
          await audioElement.play();
        }
      } catch (error) {
        console.error("Failed to play status sound:", error);
      }
    };
    
    playStatusSound();
  }, [status, selected, correctAudio, wrongAudio]);
  
  const handleClick = useCallback(() => {
    if (disabled) return;

    const playSound = async () => {
      try {
        // Play the card's audio if available
        if (audioSrc && audio instanceof HTMLAudioElement) {
          await audio.play();
        }
        
        // Play selection sound if not already selected
        if (!selected && selectionAudio instanceof HTMLAudioElement) {
          await selectionAudio.play();
        }
      } catch (error) {
        console.error("Failed to play sound:", error);
      }
    };

    playSound();
    onClick();
  }, [disabled, onClick, audio, audioSrc, selected, selectionAudio]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "relative bg-white dark:bg-gray-800 text-black dark:text-white p-2 sm:p-4 rounded-xl border-2 min-h-[120px] w-full flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] hover:bg-slate-50 dark:hover:bg-gray-700/80",
        disabled && "cursor-not-allowed opacity-50 hover:scale-100 hover:shadow-sm",
        selected && status === "none" && "border-blue-800 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/40 shadow-md",
        status === "correct" && selected && "border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 shadow-md",
        status === "wrong" && selected && "border-rose-600 dark:border-rose-500 bg-rose-50 dark:bg-rose-950/40 shadow-md",
        !selected && "border-slate-200 dark:border-slate-700"
      )}
    >
      <div className={cn(
        "text-base sm:text-lg md:text-xl font-medium leading-tight font-sans",
        "whitespace-pre-wrap break-words text-center max-h-full overflow-y-auto px-1"
      )}>
        {text || "Option"}
      </div>
      {selected && status === "correct" && (
        <div className="absolute -top-2 -right-2 flex items-center justify-center bg-emerald-600 dark:bg-emerald-500 rounded-full h-6 w-6 shadow-md">
          <Check className="text-white h-4 w-4" />
        </div>
      )}
      {selected && status === "wrong" && (
        <div className="absolute -top-2 -right-2 flex items-center justify-center bg-rose-600 dark:bg-rose-500 rounded-full h-6 w-6 shadow-md">
          <X className="text-white h-4 w-4" />
        </div>
      )}
      {selected && status === "none" && (
        <div className="absolute -top-2 -right-2 flex items-center justify-center bg-blue-800 dark:bg-blue-700 rounded-full h-6 w-6 shadow-md">
          <Check className="text-white h-4 w-4 opacity-0" />
        </div>
      )}
      {audio}
      {selectionAudio}
      {correctAudio}
      {wrongAudio}
    </button>
  );
};
