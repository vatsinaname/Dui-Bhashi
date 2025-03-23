import React from "react";
import { redirect } from "next/navigation";
import { FeedWrapper } from "../../../components/feed-wrapper";
import { StickyWrapper } from "../../../components/sticky-wrapper";
import { UserProgress } from "../../../components/user-progress";
import {
  getUserProgress,
  getUserActiveCoursePoints
} from "../../../db/queries";
import { Quests } from "../../../components/quests";
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
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={activeCourse}
          hearts={userProgress.hearts ?? 0}
          points={activePoints}
        />
        <Quests points={activePoints} activeCourse={activeCourse} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image
            src="/alphabet.svg"
            alt="alphabet"
            height={90}
            width={90}
            className="mb-4"
          />
          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800 dark:text-blue-400">
            {activeCourse.title} Alphabet
          </h1>
          <p className="mb-8 text-center text-lg text-muted-foreground">
            Learn the characters and sounds of the {activeCourse.title} alphabet.
          </p>
          
          <AlphabetCards courseTitle={activeCourse.title} />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default AlphabetPage; 