import React from "react";
import { redirect } from "next/navigation";
import { UserProgress } from "../../../components/user-progress";
import { getUserProgress, getUserActiveCoursePoints } from "../../../db/queries";
import { AlphabetCards } from "./_components/alphabet-cards";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BhashaBird | Alphabet",
  description: "Learn the alphabet of your chosen language.",
};

const AlphabetPage = async () => {
  // Get user progress and active course points
  const userProgressPromise = getUserProgress();
  const activePointsPromise = getUserActiveCoursePoints();
  
  const [userProgress, activePoints] = await Promise.all([
    userProgressPromise,
    activePointsPromise
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const activeCourse = userProgress.activeCourse;
  
  return (
    <div className="flex flex-col w-full bg-[#ede9df] dark:bg-slate-950">
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-4 pt-4 pb-8">
        <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
          <div className="flex items-center mb-2">
            <Image
              src="/alphabet.svg"
              alt="alphabet"
              height={60}
              width={60}
              className="mr-4"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-[#6d4b73] dark:text-blue-400">
              {activeCourse.title} Alphabet
            </h1>
          </div>
          <p className="text-center md:text-left text-lg text-[#8d6493] dark:text-slate-300">
            Learn the characters, sounds, and writing system of {activeCourse.title}.
          </p>
        </div>
        
        <div className="shrink-0">
          <UserProgress
            activeCourse={activeCourse}
            hearts={userProgress.hearts ?? 0}
            points={activePoints}
          />
        </div>
      </div>
      
      <div className="w-full bg-[#f9f7f1] dark:bg-slate-950 px-2 md:px-4 rounded-lg border border-[#d5c0d6] shadow-sm mx-auto max-w-[98%] mb-8">
        <AlphabetCards courseTitle={activeCourse.title} />
      </div>
    </div>
  );
};

export default AlphabetPage; 