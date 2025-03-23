import React from "react";
import { FeedWrapper } from "../../../components/feed-wrapper";
import { Quests } from "../../../components/quests";
import { StickyWrapper } from "../../../components/sticky-wrapper";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { Separator } from "../../../components/ui/separator";
import { UserProgress } from "../../../components/user-progress";
import {
  getTopTenUsers,
  getUserProgress,
  getUserActiveCoursePoints
} from "../../../db/queries";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dui-Bhashi | Leaderboard",
  description: "See where you stand among other language learners in the community.",
};

const LeaderBoardPage = async () => {
  // Correctly get user progress data
  const userProgressPromise = getUserProgress();
  const activePointsPromise = getUserActiveCoursePoints();
  
  const [userProgress, activePoints] = await Promise.all([
    userProgressPromise,
    activePointsPromise
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const leaderboard = await getTopTenUsers();

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={activePoints}
        />
        <Quests 
          points={activePoints} 
          activeCourse={userProgress.activeCourse}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image
            src="/leaderboard.svg"
            alt="leaderboard"
            height={90}
            width={90}
          />
          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800 dark:text-blue-400">
            Leaderboard
          </h1>
          <p className="mb-6 text-center text-lg text-muted-foreground">
            See where you stand among other learners in the community.
          </p>
          <Separator className="mb-4 h-0.5 rounded-full" />
          {leaderboard.map((userProgress, index) => (
            <div
              className="flex w-full items-center rounded-xl p-2 px-4 hover:bg-gray-200/50 dark:hover:bg-blue-900/20"
              key={userProgress.userId}
            >
              <p className="mr-4 font-bold text-blue-700 dark:text-blue-400">{index + 1}</p>
              <Avatar className="ml-3 mr-6 h-12 w-12 border bg-blue-500 dark:bg-blue-700">
                <AvatarImage src={userProgress.userImageSrc} />
              </Avatar>
              <p className="flex-1 font-bold text-neutral-800 dark:text-white">
                {userProgress.userName}
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-medium">{userProgress.points} XP</p>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderBoardPage;
