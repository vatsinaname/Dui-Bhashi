"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL } from "@/constants";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";
import { HeartCrack } from "lucide-react";

type Course = {
  id: number;
  title: string;
};

interface ItemsProps {
  hearts: number;
  points: number;
  activeCourse: Course | null;
  onClick: () => void;
}

export const Items = ({
  hearts,
  points,
  activeCourse,
  onClick
}: ItemsProps) => {
  const [isPending] = useTransition();

  const onClickHandler = () => {
    if (isPending) return;

    // Define messages for each course
    const messages = {
      telugu: { // Telugu course
        text: "హృదయాలను కొనలేము, ప్రేమతో సంపాదించాలి",
        transliteration: "Hrudayalanu konalemu, premato sampadinchaali"
      },
      kannada: { // Kannada course
        text: "ಹೃದಯಗಳನ್ನು ಕೊಳ್ಳಲಾಗುವುದಿಲ್ಲ, ಪ್ರೀತಿಯಿಂದ ಗಳಿಸಬೇಕು",
        transliteration: "Hrudayagalannu kollalaagovudilla, preetiyinda galisabeku"
      },
      // Default message
      default: {
        text: "Hearts cannot be purchased, they must be earned with dedication",
        transliteration: "Keep learning to earn hearts!"
      }
    };

    // Get the appropriate message based on course title
    let message;
    if (activeCourse?.title?.toLowerCase().includes("telugu")) {
      message = messages.telugu;
    } else if (activeCourse?.title?.toLowerCase().includes("kannada")) {
      message = messages.kannada;
    } else {
      // Fallback to ID-based selection or default
      message = activeCourse?.id === 1 ? messages.telugu : 
               activeCourse?.id === 2 ? messages.kannada : messages.default;
    }

    // Display toast notification
    toast(
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold">Hearts can't be bought, they're earned with passion</p>
        <p className="text-base">{message.text}</p>
        <p className="text-base italic">{message.transliteration}</p>
      </div>,
      {
        duration: 4000,
        position: "top-center",
        closeButton: true,
        icon: <HeartCrack className="h-5 w-5 text-red-500" />,
      }
    );
  };

  // Determine if we're in Telugu or Kannada course
  const isTelugu = activeCourse?.title?.toLowerCase().includes("telugu");
  const isKannada = activeCourse?.title?.toLowerCase().includes("kannada");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <div className="relative bg-white dark:bg-slate-800 rounded-xl border-2 p-6 flex flex-col items-center justify-center hover:shadow-md transition">
        <div className="absolute top-2 right-2 bg-amber-100 dark:bg-amber-900 px-3 py-1 rounded-full text-sm">
          {POINTS_TO_REFILL} points
        </div>
        <Image
          src="/heart.svg"
          alt="heart"
          height={60}
          width={60}
          className="mb-4"
        />
        <h3 className="text-xl font-bold mb-2">5 Hearts</h3>
        <p className="text-muted-foreground text-center mb-4">
          {isTelugu
            ? "ప్రయత్నించడానికి మరింత సమయం పొందండి" 
            : isKannada
            ? "ಪ್ರಯತ್ನಿಸಲು ಹೆಚ್ಚಿನ ಸಮಯ ಪಡೆಯಿರಿ"
            : "Get more time to practice"}
        </p>
        <Button
          onClick={onClickHandler}
          variant="default"
          size="lg"
          className="w-full bg-rose-600 hover:bg-rose-500 text-white"
        >
          Purchase
        </Button>
      </div>

      <div className="relative bg-white dark:bg-slate-800 rounded-xl border-2 p-6 flex flex-col items-center justify-center hover:shadow-md transition">
        <div className="absolute top-2 right-2 bg-amber-100 dark:bg-amber-900 px-3 py-1 rounded-full text-sm">
          300 points
        </div>
        <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 mb-4">
          <span className="text-4xl">{isTelugu ? "👑" : "🕺"}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">
          {isTelugu
            ? "Bahubali Avatar" 
            : "Puneeth Rajkumar Avatar"}
        </h3>
        <p className="text-muted-foreground text-center mb-4">
          {isTelugu
            ? "ప్రభాస్ లాగా కనిపించండి" 
            : isKannada
            ? "ಅಪ್ಪು ಅವರಂತೆ ಕಾಣಿಸಿಕೊಳ್ಳಿ"
            : "Look like your favorite actor"}
        </p>
        <Button
          onClick={onClickHandler}
          variant="default"
          size="lg"
          className="w-full bg-blue-800 hover:bg-blue-700 text-white"
        >
          Purchase
        </Button>
      </div>

      <div className="relative bg-white dark:bg-slate-800 rounded-xl border-2 p-6 flex flex-col items-center justify-center hover:shadow-md transition">
        <div className="absolute top-2 right-2 bg-amber-100 dark:bg-amber-900 px-3 py-1 rounded-full text-sm">
          500 points
        </div>
        <div className="rounded-full bg-orange-100 dark:bg-orange-900 p-3 mb-4">
          <span className="text-4xl">{isTelugu ? "🏯" : "🏰"}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">
          {isTelugu
            ? "Charminar Theme" 
            : "Mysore Palace Theme"}
        </h3>
        <p className="text-muted-foreground text-center mb-4">
          {isTelugu
            ? "హైదరాబాద్ చార్మినార్ థీమ్" 
            : isKannada
            ? "ಮೈಸೂರು ಅರಮನೆ ಥೀಮ್"
            : "Beautiful palace theme"}
        </p>
        <Button
          onClick={onClickHandler}
          variant="default"
          size="lg"
          className="w-full bg-orange-600 hover:bg-orange-500 text-white"
        >
          Purchase
        </Button>
      </div>

      <div className="relative bg-white dark:bg-slate-800 rounded-xl border-2 p-6 flex flex-col items-center justify-center hover:shadow-md transition">
        <div className="absolute top-2 right-2 bg-amber-100 dark:bg-amber-900 px-3 py-1 rounded-full text-sm">
          750 points
        </div>
        <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 mb-4">
          <span className="text-4xl">{isTelugu ? "🥘" : "🍲"}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">
          {isTelugu
            ? "Biryani Power-up" 
            : "Bisi Bele Bath Power-up"}
        </h3>
        <p className="text-muted-foreground text-center mb-4">
          {isTelugu
            ? "ధుమ్ ధుమ్ బిర్యాని శక్తి పెంపు" 
            : isKannada
            ? "ಬಿಸಿ ಬೇಳೆ ಬಾತ್ ಪವರ್ ಅಪ್"
            : "Traditional food power-up"}
        </p>
        <Button
          onClick={onClickHandler}
          variant="default"
          size="lg"
          className="w-full bg-green-700 hover:bg-green-600 text-white"
        >
          Purchase
        </Button>
      </div>

      <div className="relative bg-white dark:bg-slate-800 rounded-xl border-2 p-6 flex flex-col items-center justify-center hover:shadow-md transition">
        <div className="absolute top-2 right-2 bg-amber-100 dark:bg-amber-900 px-3 py-1 rounded-full text-sm">
          1000 points
        </div>
        <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3 mb-4">
          <span className="text-4xl">🎬</span>
        </div>
        <h3 className="text-xl font-bold mb-2">
          {isTelugu
            ? "Tollywood Badge" 
            : isKannada
            ? "Sandalwood Badge"
            : "Cinema Badge"}
        </h3>
        <p className="text-muted-foreground text-center mb-4">
          {isTelugu
            ? "సినిమా ఇండస్ట్రీ బ్యాడ్జ్" 
            : isKannada
            ? "ಚಲನಚಿತ್ರ ಉದ್ಯಮ ಬ್ಯಾಡ್ಜ್"
            : "Film Industry Badge"}
        </p>
        <Button
          onClick={onClickHandler}
          variant="default"
          size="lg"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
        >
          Purchase
        </Button>
      </div>

      <div className="relative bg-white dark:bg-slate-800 rounded-xl border-2 p-6 flex flex-col items-center justify-center hover:shadow-md transition">
        <div className="absolute top-2 right-2 bg-amber-100 dark:bg-amber-900 px-3 py-1 rounded-full text-sm">
          2000 points
        </div>
        <div className="rounded-full bg-rose-100 dark:bg-rose-900 p-3 mb-4 relative">
          <span className="text-4xl">❤️</span>
          <span className="absolute -top-2 -right-2 text-xl">∞</span>
        </div>
        <h3 className="text-xl font-bold mb-2">Unlimited Hearts</h3>
        <p className="text-muted-foreground text-center mb-4">
          {isTelugu
            ? "అన్ని పాఠాలకు అపరిమిత ప్రయత్నాలు" 
            : isKannada
            ? "ಎಲ್ಲಾ ಪಾಠಗಳಿಗೆ ಅನಿಯಮಿತ ಪ್ರಯತ್ನಗಳು"
            : "Unlimited attempts for all lessons"}
        </p>
        <Button
          onClick={onClickHandler}
          variant="default"
          size="lg"
          className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white"
        >
          Purchase
        </Button>
      </div>
    </div>
  );
};
