import React from "react";
import { FeedWrapper } from "../../../components/feed-wrapper";
import { Quests } from "../../../components/quests";
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
  title: "Dui-Bhashi | Quests",
  description: "Complete quests and earn points to unlock new levels and courses.",
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
    console.log("Using Telugu quests based on title");
  } else if (userProgress.activeCourse.title.toLowerCase().includes("kannada")) {
    quests = kannadaQuests;
    console.log("Using Kannada quests based on title");
  } else {
    // Fallback to using course ID
    quests = userProgress.activeCourse.id === 1 ? teluguQuests : kannadaQuests;
    console.log(`Using quests based on ID: ${userProgress.activeCourse.id}`);
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={activePoints}
        />
        <Quests points={activePoints} activeCourse={userProgress.activeCourse} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image src="/quests.svg" alt="quests" height={90} width={90} />
          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800 dark:text-amber-600">
            Quests
          </h1>
          <p className="mb-6 text-center text-lg text-muted-foreground">
            Complete quests to earn points and unlock new features.
          </p>
          {quests.map((quest) => {
            const progress = (activePoints / quest.value) * 100;
            return (
              <div
                key={quest.value}
                className="flex w-full items-center gap-x-4 border-t-2 p-4"
              >
                <Image src="/points.svg" alt="point" height={60} width={60} />
                <div className="flex w-full flex-col gap-y-2">
                  <p className="text-base font-bold text-neutral-700 dark:text-amber-600">
                    {quest.title}
                  </p>
                  <Progress value={progress} className="h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
