"use client";
import React, { useEffect, useMemo, useCallback } from "react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useMount, useAudio, useWindowSize, useKey } from "react-use";
import Confetti from "react-confetti";
import Image from "next/image";
import { toast } from "sonner";
import { QuestionBubble } from "./question-bubble";
import { challenges, courses, courseProgress, challengeOptions } from "../../../db/schema";
import { Footer } from "./footer";
import { ResultCard } from "./result-card";
import { useHeartsModal } from "../../../store/use-hearts-modal";
import { CourseType, UserProgressType, CourseProgressType } from "../../../types";
import { usePracticeModal } from "../../../store/use-practice-modal";
import { upsertChallengeProgress } from "../../../actions/challenge-progress";
import { reduceHearts } from "../../../db/user-progress";
import { CulturalQuote } from "../../../components/cultural-quote";
import { teluguQuotes, kannadaQuotes } from "../../../constants/cultural-quotes";
import { cn } from "../../../lib/utils";
import { Challenge } from "./challenge";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

type ChallengeType = typeof challenges.$inferSelect;
type ChallengeOptionType = typeof challengeOptions.$inferSelect;

interface QuizProps {
  challenge: ChallengeType & {
    completed: boolean;
    challengeOptions: ChallengeOptionType[];
  };
  activeCourse: CourseType;
  userProgress: UserProgressType;
  selectedOption: number | null;
  isCorrect: boolean | null;
  onOptionSelect: (id: number) => void;
  onFinish: () => void;
}

export const Quiz = ({
  challenge,
  activeCourse,
  userProgress,
  selectedOption: initialSelectedOption,
  isCorrect: initialIsCorrect,
  onOptionSelect,
  onFinish,
}: QuizProps) => {
  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();
  const { width, height } = useWindowSize();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<number | null>(initialSelectedOption);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(initialIsCorrect);
  const [isLessonComplete, setIsLessonComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hearts, setHearts] = useState(userProgress?.hearts ?? 5);
  const [questionNumber, setQuestionNumber] = useState(1);
  const totalQuestionsPerLesson = 10;
  const [percentage, setPercentage] = useState(() => {
    return challenge?.completed ? 100 : 0;
  });

  useEffect(() => {
    // Display a toast message for challenge 221 to inform users
    if (challenge.id === 221) {
      toast.info(
        "This challenge has limited options due to a database issue. We're working on fixing it.",
        { duration: 4000 }
      );
    }
    
    setSelectedOption(initialSelectedOption);
    setIsCorrect(initialIsCorrect);
  }, [initialSelectedOption, initialIsCorrect, challenge.id]);

  const randomQuote = useMemo(() => {
    let quotes;
    if (activeCourse.title.toLowerCase().includes("telugu")) {
      quotes = teluguQuotes;
    } else if (activeCourse.title.toLowerCase().includes("kannada")) {
      quotes = kannadaQuotes;
    } else {
      quotes = activeCourse.id === 1 ? teluguQuotes : kannadaQuotes;
    }
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }, [activeCourse]);

  const [correctAudio] = useAudio({
    src: "/correct.wav",
    autoPlay: false,
  });

  const [incorrectAudio] = useAudio({
    src: "/incorrect.wav",
    autoPlay: false,
  });

  const [finishAudio] = useAudio({
    src: "/finish.mp3",
    autoPlay: false,
  });

  // Commenting out automatic practice modal popup as it can be annoying
  /*
  useEffect(() => {
    if (challenge?.completed) {
      openPracticeModal();
    }
  }, [challenge?.completed, openPracticeModal]);
  */

  const [isPending, startTransition] = useTransition();
  const options = challenge?.challengeOptions ?? [];
  const correctOption = options.find((option) => option.correct);

  const onSelect = (id: number) => {
    if (isCorrect !== null) return;
    setSelectedOption(id);
    onOptionSelect(id);
  };

  const onContinue = useCallback(async () => {
    if (!selectedOption) return;

    if (isCorrect === null) {
      const isAnswerCorrect = correctOption ? selectedOption === correctOption.id : false;
      setIsCorrect(isAnswerCorrect);

      if (isAnswerCorrect) {
        const audio = new Audio("/correct.wav");
        audio.play().catch(console.error);
        toast.success("+ 10 XP", {
          position: "top-center",
          duration: 1500,
        });
      } else {
        const audio = new Audio("/incorrect.wav");
        audio.play().catch(console.error);
        await reduceHearts(challenge.id);
        setHearts(prev => prev - 1);
        toast.error("Incorrect answer! You lost a heart.", {
          position: "top-center",
          duration: 1500,
        });
        if (hearts <= 1) {
          openHeartsModal();
          return;
        }
      }
      return;
    }

    startTransition(() => {
      upsertChallengeProgress(challenge.id)
        .then(() => {
          if (questionNumber >= totalQuestionsPerLesson) {
            setIsLessonComplete(true);
            setShowConfetti(true);
            const audio = new Audio("/finish.mp3");
            audio.play().catch(console.error);
            return;
          }
          
          setSelectedOption(null);
          setIsCorrect(null);
          setQuestionNumber(prev => prev + 1);
          setPercentage(prev => Math.min(100, (questionNumber * 10)));
          onFinish();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }, [selectedOption, isCorrect, challenge.id, correctOption, hearts, questionNumber, openHeartsModal, onFinish]);

  useKey("Enter", () => {
    void onContinue();
  });

  if (isLessonComplete) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-950">
        {correctAudio}
        {incorrectAudio}
        {finishAudio}
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />
        <div className="mx-auto flex h-full w-full max-w-[988px] flex-col items-center justify-center gap-y-4 px-4 pb-[100px] lg:flex-row lg:items-start lg:gap-x-8 lg:px-8">
          <div className="flex w-full flex-col items-center text-center lg:w-1/2">
            <Image
              src="/finish.svg"
              alt="finish"
              height={80}
              width={80}
              className="hidden dark:invert-[0.2] lg:block"
            />
            <Image
              src="/finish.svg"
              alt="finish"
              height={40}
              width={40}
              className="block dark:invert-[0.2] lg:hidden"
            />
            <h1 className="mt-4 text-xl font-bold text-neutral-700 dark:text-white lg:text-3xl">
              Great Job! <br /> You&apos;ve completed the lesson.
            </h1>
            <div className="mt-6 flex w-full max-w-[300px] items-center justify-center gap-x-4">
              <ResultCard variant="points" value={10} />
              <ResultCard variant="hearts" value={hearts} />
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:self-center">
            <CulturalQuote {...randomQuote} />
          </div>
        </div>
        <Footer
          lessonId={challenge.lessonId}
          status="completed"
          onCheck={() => router.push("/learn")}
        />
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <h2 className="text-xl font-bold text-neutral-700 dark:text-white">Loading challenge...</h2>
          <p className="mt-2 text-muted-foreground">Please wait while we prepare your lesson.</p>
        </div>
      </div>
    );
  }

  const title = challenge.type === "ASSIST" ? "Select the correct meaning" : challenge.question;

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-950">
      <div>
        {correctAudio}
        {incorrectAudio}
        {finishAudio}
      </div>
      
      {/* Header with Exit, Progress and Hearts */}
      <div className="fixed top-0 left-0 right-0 px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm z-10">
        <Link href="/learn" className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          <span className="font-medium">Exit</span>
        </Link>
        
        <div className="flex-1 max-w-[400px] mx-4">
          <div className="relative h-6 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-blue-800 dark:bg-blue-700 transition-all duration-300 flex items-center justify-center text-white font-bold text-xs shadow-inner"
              style={{ width: `${questionNumber * 10}%` }}
            >
              {questionNumber}/{totalQuestionsPerLesson}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Image
            src="/heart.svg"
            alt="Hearts"
            width={24}
            height={24}
            className="drop-shadow-sm"
          />
          <span className="font-bold text-rose-500 text-lg">{hearts}</span>
        </div>
      </div>
      
      {/* Main content area with question and options */}
      <div className="pt-16 pb-32 h-full flex flex-col items-center justify-center">
        <div className="w-full max-w-[640px] mx-auto px-4 flex flex-col gap-y-6">
          <h1 className="text-center text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight py-2">
            {title}
          </h1>
          
          <div className="w-full">
            {challenge.type === "ASSIST" && (
              <QuestionBubble question={challenge.question} />
            )}
            <Challenge
              options={options}
              onSelect={onSelect}
              status={
                isCorrect !== null
                  ? isCorrect
                    ? "correct"
                    : "wrong"
                  : "none"
              }
              selectedOption={selectedOption}
              disabled={isPending}
              type={challenge.type}
            />
          </div>
        </div>
      </div>
      
      <Footer
        disabled={isPending || !selectedOption}
        status={isCorrect !== null ? (isCorrect ? "correct" : "wrong") : "none"}
        onCheck={onContinue}
        showContinue={true}
        hideExit={true}
      />
    </div>
  );
};
