import React from "react";
import { FeedWrapper } from "../../../components/feed-wrapper";
import { Challenges } from "../../../components/quests";
import { StickyWrapper } from "../../../components/sticky-wrapper";
import { Progress } from "../../../components/ui/progress";
import { UserProgress } from "../../../components/user-progress";
import { redirect } from "next/navigation";
import { teluguQuests, kannadaQuests } from "../../../constants";
import { 
  getUserProgress,
  getUserActiveCoursePoints
} from "../../../db/queries";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BhashaBird | Challenges",
  description: "Complete challenges to earn XP and unlock new features",
};

const QuestsPage = async () => {
  const userProgressPromise = getUserProgress();
  const activePointsPromise = getUserActiveCoursePoints();
  
  const [userProgress, activePoints] = await Promise.all([
    userProgressPromise,
    activePointsPromise
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  // Determine which quests to display based on course title
  let quests;
  
  if (userProgress.activeCourse.title.toLowerCase().includes("telugu")) {
    quests = teluguQuests;
  } else if (userProgress.activeCourse.title.toLowerCase().includes("kannada")) {
    quests = kannadaQuests;
  } else {
    // Fallback to using course ID
    quests = userProgress.activeCourse.id === 1 ? teluguQuests : kannadaQuests;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex w-full justify-center mb-6">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={activePoints}
        />
      </div>
      <div className="flex w-full flex-col items-center">
        <div className="py-4">
          <Image src="/quests.svg" alt="quests" height={80} width={80} className="transition-transform hover:scale-105" />
        </div>
        <h1 className="my-4 text-center text-2xl font-bold text-[#6d4b73] dark:text-blue-400 font-outfit">
          Challenges
        </h1>
        <p className="mb-8 text-center text-base text-[#8d6493] dark:text-blue-300 max-w-xl mx-auto font-outfit">
          Complete challenges to earn XP and unlock new features.
        </p>
        <div className="w-full space-y-5 max-w-3xl mx-auto">
          {quests.map((quest) => {
            const progress = Math.min((activePoints / quest.value) * 100, 100);
            const isCompleted = activePoints >= quest.value;
            
            return (
              <div
                key={quest.value}
                className={`flex w-full items-center gap-x-5 p-6 rounded-xl border-2 transition-all ${
                  isCompleted 
                    ? "border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-800/30" 
                    : "border-[#e1dbd0] bg-[#f9f7f1] hover:bg-[#f5f2e9] dark:bg-gray-900/50 dark:border-gray-800 dark:hover:bg-gray-900"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <Image 
                    src={isCompleted ? "/checkmark.svg" : "/points.svg"} 
                    alt={isCompleted ? "Completed" : "XP"} 
                    height={48} 
                    width={48} 
                    className={`transition-transform ${isCompleted ? "scale-110" : "hover:scale-105"}`} 
                  />
                </div>
                <div className="flex w-full flex-col gap-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <p className={`text-lg font-bold font-outfit ${
                        isCompleted ? "text-green-600 dark:text-green-400" : "text-[#6d4b73] dark:text-blue-300"
                      }`}>
                        {quest.title}
                      </p>
                      {isCompleted && (
                        <span className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium px-2 py-1 rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
                    <span className={`text-sm font-bold font-outfit mt-1 sm:mt-0 ${
                      isCompleted ? "text-green-600 dark:text-green-400" : "text-[#9b6a9b] dark:text-blue-400"
                    }`}>
                      {Math.min(activePoints, quest.value)}/{quest.value} XP
                    </span>
                  </div>
                  <Progress 
                    value={progress} 
                    className={`h-2.5 bg-[#f0ece3] dark:bg-gray-800 ${
                      isCompleted 
                        ? "[&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-teal-500" 
                        : "[&>div]:bg-gradient-to-r [&>div]:from-[#9b6a9b] [&>div]:to-[#b993bc] dark:[&>div]:from-blue-500 dark:[&>div]:to-indigo-500"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestsPage;
