import React from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";

import { FeedWrapper } from "./_components/feed-wrapper";
import { StickyWrapper } from "../../../components/sticky-wrapper";
import { Header } from "./_components/header";
import { UserProgress } from "../../../components/user-progress";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserActiveCoursePoints,
} from "../../../db/queries";
import { Unit } from "./_components/units";
import { Challenges } from "../../../components/quests";
import { Progress } from "@/components/ui/progress";
import { UnitButton } from "./_components/unit-button";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { UnitBanner } from "./_components/unit-banner";
import { auth } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { teluguQuests, kannadaQuests } from "../../../constants";

export const metadata: Metadata = {
  title: "BhashaBird | Learn",
  description: "Learn a new language with BhashaBird",
};

// Define interfaces to properly type the units data
interface UnitData {
  id: number;
  title: string;
  description: string;
  locked?: boolean;
  completed?: boolean;
  progress?: number;
  lessons?: {
    id: number;
    completed: boolean;
  }[];
}

// Helper function to get current achievement title
function getCurrentAchievementTitle(points: number, isTeluguCourse: boolean) {
  const quests = isTeluguCourse ? teluguQuests : kannadaQuests;
  
  // Find the highest achievement level the user has reached
  for (let i = quests.length - 1; i >= 0; i--) {
    if (points >= quests[i].value) {
      return quests[i].title;
    }
  }
  
  // Default to first level if no points yet
  return quests[0].title;
}

const LearnPage = async () => {
  const authData = await auth();
  const userId = authData.userId;

  if (!userId) {
    return redirect("/");
  }

  // Fetch units and handle type conversions as needed
  const unitsData = await getUnits();
  const userProgress = await getUserProgress();
  const activePoints = await getUserActiveCoursePoints();

  if (!unitsData.length) {
    return redirect("/learn/0");
  }

  const isTeluguCourse = userProgress?.activeCourse?.title?.toLowerCase().includes("telugu") || false;
  const achievementTitle = getCurrentAchievementTitle(activePoints, isTeluguCourse);

  // Convert and normalize the data to match our interface
  const units: UnitData[] = unitsData.map(unit => ({
    id: unit.id,
    title: unit.title,
    description: unit.description,
    // Add properties that TypeScript complains about with sensible defaults
    completed: false, // Default value
    progress: 0,      // Default value
    locked: false,    // Default value
    lessons: unit.lessons // Include the lessons data from the API response
  }));

  const firstUncompletedUnit = units.find((unit) => !unit.completed);
  const unitInProgress = units.find((unit) => (unit.progress || 0) > 0);

  const activeUnit = firstUncompletedUnit || units[0];

  // Make the title more comprehensive for language units
  let title = activeUnit?.title || "Your Learning Path";
  if (title.includes("Script")) {
    if (title.includes("Telugu")) {
      title = "Learn the Telugu Language";
    } else if (title.includes("Kannada")) {
      title = "Learn the Kannada Language";
    }
  }
  
  const description = activeUnit?.description || "Master the language with structured lessons";

  return (
    <div className="mx-auto flex max-w-[988px] flex-col px-3">
      <div className="flex-1">
        <UnitBanner title={title} description={description} />
        <Separator className="my-6 bg-[#d7c3d9]" />
        <div className="space-y-6">
          <div className="mb-6 rounded-xl border-2 border-[#d7c3d9] dark:border-blue-800/30 bg-[#faf5fb] dark:bg-slate-900 p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-[#6d4b73] dark:text-blue-400">
              Overall Progress
            </h2>
            <div className="mb-3 flex items-center gap-x-4">
              <Progress
                value={
                  (() => {
                    // Calculate a more accurate progress percentage
                    const totalLessons = units.reduce((acc, unit) => {
                      // Count total number of lessons across all units
                      return acc + (unit.lessons?.length || 0);
                    }, 0);
                    
                    // Count completed lessons across all units
                    const completedLessons = units.reduce((acc, unit) => {
                      return acc + (unit.lessons?.filter((lesson) => lesson.completed)?.length || 0);
                    }, 0);
                    
                    // Calculate percentage - if no lessons, return 0
                    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
                  })()
                }
                className="h-3 bg-[#e2c6e4] dark:bg-slate-800"
                indicatorClassName="bg-gradient-to-r from-[#a78bab] to-[#9b6a9b] dark:from-blue-600 dark:to-blue-700"
              />
              <span className="text-sm font-medium text-[#8d6493] dark:text-blue-300">
                {Math.round(
                  (() => {
                    // Calculate a more accurate progress percentage
                    const totalLessons = units.reduce((acc, unit) => {
                      // Count total number of lessons across all units
                      return acc + (unit.lessons?.length || 0);
                    }, 0);
                    
                    // Count completed lessons across all units
                    const completedLessons = units.reduce((acc, unit) => {
                      return acc + (unit.lessons?.filter((lesson) => lesson.completed)?.length || 0);
                    }, 0);
                    
                    // Calculate percentage - if no lessons, return 0
                    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
                  })()
                )}
                %
              </span>
            </div>

            {unitInProgress && !unitInProgress.completed && (
              <div className="flex items-center gap-x-2 text-sm text-[#8d6493] dark:text-blue-300">
                <span>
                  Currently working on:{" "}
                  <span className="font-semibold text-[#6d4b73] dark:text-blue-400">
                    {unitInProgress.title}
                  </span>
                </span>
                <span>
                  ({Math.round((unitInProgress.progress || 0) * 100)}% completed)
                </span>
              </div>
            )}

            {userProgress?.activeCourse && (
              <div className="flex items-center mt-3 gap-x-2 text-sm text-[#8d6493] dark:text-blue-300">
                <span>
                  Current Level: {" "}
                  <span className="font-semibold text-[#6d4b73] dark:text-blue-400">
                    {achievementTitle}
                  </span>
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 pb-10 md:grid-cols-2">
            {units.map((unit, index) => (
              <UnitButton
                key={unit.id}
                id={unit.id}
                index={index + 1}
                title={unit.title}
                description={unit.description}
                locked={unit.locked}
                current={activeUnit?.id === unit.id}
                type={unit.title.includes("Script") ? "script" : "regular"}
              />
            ))}
          </div>

          <Card className="mb-8 border-[#d7c3d9] dark:border-blue-800/30 bg-[#faf5fb] dark:bg-slate-900 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#6d4b73] dark:text-blue-400">
                Learning Tips
              </CardTitle>
              <CardDescription className="text-[#8d6493] dark:text-blue-300">
                Helpful advice for your language journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-x-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#bd8cbf] dark:bg-blue-700">
                  <Image
                    src="/mascot.png"
                    alt="Tip"
                    width={26}
                    height={26}
                  />
                </div>
                <div className="flex-1 text-[#8d6493] dark:text-blue-300">
                  <p className="font-semibold text-[#6d4b73] dark:text-blue-400">Practice daily</p>
                  <p className="text-sm">Consistency is key to language learning</p>
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#bd8cbf] dark:bg-blue-700">
                  <Image
                    src="/mascot.png"
                    alt="Tip"
                    width={26}
                    height={26}
                  />
                </div>
                <div className="flex-1 text-[#8d6493] dark:text-blue-300">
                  <p className="font-semibold text-[#6d4b73] dark:text-blue-400">Use flashcards</p>
                  <p className="text-sm">Review vocabulary between lessons</p>
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#bd8cbf] dark:bg-blue-700">
                  <Image
                    src="/mascot.png"
                    alt="Tip"
                    width={26}
                    height={26}
                  />
                </div>
                <div className="flex-1 text-[#8d6493] dark:text-blue-300">
                  <p className="font-semibold text-[#6d4b73] dark:text-blue-400">Complete challenges</p>
                  <p className="text-sm">Test your skills to reinforce learning</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
