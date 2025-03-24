import React from "react";
import { redirect } from "next/navigation";
import { UserProgress } from "../../../components/user-progress";
import { getUserProgress, getUserActiveCoursePoints } from "../../../db/queries";
import { AlphabetCards } from "./_components/alphabet-cards";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dui-Bhashi | Alphabet",
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
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-4 mb-8">
        <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
          <div className="flex items-center mb-2">
            <Image
              src="/alphabet.svg"
              alt="alphabet"
              height={60}
              width={60}
              className="mr-4"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-blue-400">
              {activeCourse.title} Alphabet
            </h1>
          </div>
          <p className="text-center md:text-left text-lg text-muted-foreground">
            Learn the characters and sounds of the {activeCourse.title} alphabet.
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
      
      <div className="w-full bg-white dark:bg-slate-950 px-2 md:px-4">
        <AlphabetCards courseTitle={activeCourse.title} />
      </div>
    </div>
  );
};

export default AlphabetPage; 