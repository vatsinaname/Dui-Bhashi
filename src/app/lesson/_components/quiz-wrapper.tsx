"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Quiz } from "./quiz";
import { challenges, challengeOptions, courses } from "../../../db/schema";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from "@/lib/utils";

// Define UserProgressType here to fix the missing import
type UserProgressType = {
  hearts: number;
  activeCourse: typeof courses.$inferSelect;
  activeCourseId?: number;
  points?: number;
  courses?: Array<{
    id: number;
    title: string;
    imageSrc: string | null;
    completed?: boolean;
  }>;
};

interface QuizWrapperProps {
  challenge: typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  };
  activeCourse: typeof courses.$inferSelect;
  userProgress: UserProgressType;
  isLastChallenge: boolean;
  isLessonComplete: boolean;
}

export const QuizWrapper = ({
  challenge,
  activeCourse,
  userProgress,
  isLastChallenge,
  isLessonComplete,
}: QuizWrapperProps) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [challenges, setChallenges] = useState<any[]>([]);
  const totalQuestions = 10;

  // Fetch all challenges for this lesson when component mounts
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        // Get the lesson ID from the current challenge
        const lessonId = challenge.lessonId;
        
        // Fetch challenges for this lesson from API
        const response = await fetch(`/api/lessons/${lessonId}/challenges`);
        if (!response.ok) {
          throw new Error('Failed to fetch challenges');
        }
        
        const data = await response.json();
        if (data.challenges && data.challenges.length > 0) {
          console.log(`Loaded ${data.challenges.length} challenges for lesson ${lessonId}`);
          setChallenges(data.challenges);
        } else {
          // If no challenges returned, use the current challenge as fallback
          console.log(`No challenges returned from API, using current challenge as fallback`);
          setChallenges([challenge]);
        }
      } catch (error) {
        console.error('Error fetching challenges:', error);
        // Use current challenge as fallback
        setChallenges([challenge]);
      }
    };

    fetchChallenges();
  }, [challenge.lessonId]);

  useEffect(() => {
    // Skip redirection for challenge 221 which is handled with dummy options
    if (challenge.id === 221) {
      console.log("Challenge 221 detected - continuing with dummy options");
      return;
    }
    
    if (!challenge.challengeOptions || challenge.challengeOptions.length === 0) {
      console.log(`Challenge ${challenge.id} has no options`);
      // Wait a moment before redirecting to see if options are added later
      const timer = setTimeout(() => {
        console.log("Options still missing, redirecting to learn page");
        router.push("/learn");
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [challenge.id, challenge.challengeOptions, router]);

  const handleOptionSelect = (optionId: number) => {
    // We need to use the current display challenge, not the initial challenge
    const currentChallenge = getCurrentChallenge();
    
    if (!currentChallenge.challengeOptions || currentChallenge.challengeOptions.length === 0) {
      console.error(`Cannot select option: no options available for challenge ${currentChallenge.id}`);
      return;
    }
    
    setSelectedOption(optionId);
    const option = currentChallenge.challengeOptions.find((opt: any) => opt.id === optionId);
    
    if (!option) {
      console.error(`Option with ID ${optionId} not found in challenge ${currentChallenge.id}`);
      console.log('Available options:', currentChallenge.challengeOptions.map((opt: any) => opt.id));
      
      // Fallback: if we can't find the option, assume it's wrong
      // This prevents errors when option IDs don't match
      setIsCorrect(false);
      return;
    }
    
    setIsCorrect(option.correct || false);
  };

  // Get the current challenge to display
  const getCurrentChallenge = () => {
    // If we have fetched challenges, use them, otherwise use the prop
    if (challenges.length > 0) {
      // Use modulo to cycle through challenges if we have fewer than 10
      const index = currentChallengeIndex % challenges.length;
      return challenges[index];
    }
    return challenge;
  };

  const currentDisplayChallenge = getCurrentChallenge();

  console.log("QuizWrapper rendered with:", {
    hasChallenge: !!challenge,
    challengeId: challenge?.id,
    currentChallengeIndex,
    totalChallenges: challenges.length,
    currentDisplayChallengeId: currentDisplayChallenge?.id,
    hasOptions: !!challenge?.challengeOptions,
    optionsCount: challenge?.challengeOptions?.length,
    activeCourseId: activeCourse?.id,
    isLastChallenge,
    isLessonComplete,
    currentQuestion,
    totalQuestions,
    selectedOption,
    isCorrect,
    is221: challenge?.id === 221
  });

  // Special handling for challenge 221
  if (challenge?.id === 221) {
    console.log("Challenge 221 detected:", {
      question: challenge.question,
      options: challenge.challengeOptions,
      type: challenge.type
    });
  }

  if (!challenge) {
    console.log("No challenge data");
    router.push("/learn");
    return null;
  }

  // Handle dummy challenge (from our fallback mechanism)
  if (challenge.id === -1) {
    console.log("Displaying dummy challenge (lesson under construction)");
    return (
      <div className="h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-[640px] mx-auto mb-6 bg-slate-50 dark:bg-slate-900 rounded-lg shadow-md border border-blue-300 dark:border-blue-900 px-4 py-3">
          <div className="relative h-8 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-blue-800 dark:bg-blue-700 transition-all duration-300 flex items-center justify-center text-white font-bold text-base"
              style={{ width: `0%` }}
            >
              0/10
            </div>
          </div>
        </div>
        <div className="w-full max-w-[640px] aspect-video flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900 rounded-xl shadow-md border border-blue-300 dark:border-blue-900">
          <div className="flex flex-col gap-y-4 items-center">
            <div className="loading-spinner h-12 w-12 border-4 border-blue-800 dark:border-blue-700 border-t-transparent rounded-full animate-spin"></div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              Creating your challenge...
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-center max-w-[400px]">
              Preparing your personalized learning experience.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!challenge.challengeOptions || challenge.challengeOptions.length === 0) {
    return null;
  }

  return (
    <>
      <Quiz
        challenge={currentDisplayChallenge}
        activeCourse={activeCourse}
        userProgress={userProgress}
        selectedOption={selectedOption}
        isCorrect={isCorrect}
        onOptionSelect={handleOptionSelect}
        onFinish={() => {
          setSelectedOption(null);
          setIsCorrect(null);
          
          // Move to the next challenge by incrementing the index
          setCurrentChallengeIndex(prev => prev + 1);
          
          // Also increment the question counter for the progress bar
          setCurrentQuestion(prev => {
            const nextQuestion = prev + 1;
            if (nextQuestion > totalQuestions) {
              console.log("All questions completed, navigating to learn page");
              router.push("/learn");
            } else {
              console.log(`Moving to question ${nextQuestion}, challenge index: ${currentChallengeIndex + 1}`);
            }
            return nextQuestion;
          });
        }}
      />
    </>
  );
}