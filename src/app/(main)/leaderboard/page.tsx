import React from "react";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
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
  title: "BhashaBird | Leaderboard",
  description: "See where you stand amongst other language learners on BhashaBird.",
};

// Challenge titles with emojis
const challengeTitles = [
  { threshold: 2500, title: "Language Master", emoji: "👑" },
  { threshold: 1000, title: "Fluent Speaker", emoji: "🌟" },
  { threshold: 500, title: "Advanced Learner", emoji: "🔥" },
  { threshold: 250, title: "Dedicated Student", emoji: "📚" },
  { threshold: 100, title: "Eager Beginner", emoji: "🌱" },
  { threshold: 0, title: "New Explorer", emoji: "🚀" },
];

// Get challenge title based on points
const getChallengeTitle = (points: number) => {
  for (const challenge of challengeTitles) {
    if (points >= challenge.threshold) {
      return challenge;
    }
  }
  return challengeTitles[challengeTitles.length - 1];
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
  
  // Separate top 3 players from the rest
  const topThreePlayers = leaderboard.slice(0, 3);
  const otherPlayers = leaderboard.slice(3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex w-full justify-center mb-6">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={activePoints}
        />
      </div>
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/leaderboard.svg"
          alt="leaderboard"
          height={90}
          width={90}
          className="mb-4"
        />
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-blue-400 mb-2">
          Leaderboard
        </h1>
        <p className="text-base text-muted-foreground text-center max-w-xl mx-auto">
          See where you stand among other learners on BhashaBird.
        </p>
      </div>

      {/* Top 3 Players Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 max-w-4xl mx-auto">
        {topThreePlayers.map((userProgress, index) => {
          const position = index + 1;
          const challenge = getChallengeTitle(userProgress.points);
          
          // Different styling based on position
          const positionClasses = {
            1: "order-2 md:order-2 bg-[#faf5fb] border-[#d5c0d6] transform md:scale-110 z-10 dark:bg-slate-800 dark:border-purple-800/30",
            2: "order-1 md:order-1 bg-[#f7f3f9] border-[#e0d2e1] dark:bg-slate-900 dark:border-purple-800/20",
            3: "order-3 md:order-3 bg-[#f7f3f9] border-[#e0d2e1] dark:bg-slate-900 dark:border-purple-800/20"
          }[position];
          
          const medalEmoji = {
            1: "🥇",
            2: "🥈", 
            3: "🥉"
          }[position];

          return (
            <div
              key={userProgress.userId}
              className={`flex flex-col items-center p-4 rounded-xl border-2 shadow-sm ${positionClasses}`}
            >
              <div className="text-3xl mb-1">{medalEmoji}</div>
              <div className="text-xl font-bold text-[#9b6a9b] dark:text-blue-400 mb-2">{position}</div>
              <Avatar className="h-16 w-16 mb-2 border-2 border-[#d5c0d6] dark:border-blue-800">
                <AvatarImage src={userProgress.userImageSrc} />
              </Avatar>
              <h3 className="text-base font-bold text-neutral-800 dark:text-white mb-1">
                {userProgress.userName}
              </h3>
              <p className="flex items-center text-xs text-[#9b6a9b] dark:text-blue-200 font-medium mb-1">
                <span className="mr-1">{challenge.emoji}</span>
                {challenge.title}
              </p>
              <p className="text-lg text-[#9b6a9b] dark:text-blue-400 font-bold">
                {userProgress.points} XP
              </p>
            </div>
          );
        })}
      </div>

      {/* Other Players List */}
      <div className="w-full bg-[#faf5fb] dark:bg-slate-900 rounded-xl border border-[#e1dbd0] dark:border-gray-800 shadow-sm overflow-hidden max-w-4xl mx-auto">
        <h2 className="text-lg font-bold text-[#6d4b73] dark:text-blue-400 p-3 border-b border-[#e1dbd0] dark:border-gray-800">
          Other Contenders
        </h2>
        
        {otherPlayers.length > 0 ? (
          <div className="divide-y divide-[#e1dbd0] dark:divide-gray-800">
            {otherPlayers.map((userProgress, index) => {
              const position = index + 4; // Start from position 4
              const challenge = getChallengeTitle(userProgress.points);
              
              return (
                <div
                  key={userProgress.userId}
                  className="flex items-center p-3 hover:bg-[#f0ece3]/50 dark:hover:bg-blue-900/20"
                >
                  <p className="w-8 text-center font-bold text-[#9b6a9b] dark:text-blue-400">{position}</p>
                  <Avatar className="ml-1 mr-3 h-10 w-10 border bg-blue-500 dark:bg-blue-700">
                    <AvatarImage src={userProgress.userImageSrc} />
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-neutral-800 dark:text-white">
                      {userProgress.userName}
                    </p>
                    <p className="text-xs text-[#9b6a9b] dark:text-blue-200 font-medium flex items-center">
                      <span className="mr-1">{challenge.emoji}</span>
                      {challenge.title}
                    </p>
                  </div>
                  <p className="text-sm text-[#9b6a9b] dark:text-blue-400 font-medium">{userProgress.points} XP</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="p-6 text-center text-muted-foreground">No other players yet.</p>
        )}
      </div>
    </div>
  );
};

export default LeaderBoardPage;
