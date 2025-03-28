import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { teluguQuests, kannadaQuests } from "@/constants";
import { Progress } from "./ui/progress";
import { courses } from "@/db/schema";

type Props = {
  points: number;
  activeCourse: typeof courses.$inferSelect;
};

export const Challenges = ({ points, activeCourse }: Props) => {
  // Determine which challenges to display based on course title
  let challenges;
  
  if (activeCourse.title.toLowerCase().includes("telugu")) {
    challenges = teluguQuests;
  } else if (activeCourse.title.toLowerCase().includes("kannada")) {
    challenges = kannadaQuests;
  } else {
    // Fallback to ID-based selection
    challenges = activeCourse.id === 1 ? teluguQuests : kannadaQuests;
  }

  return (
    <div className="mb-8 space-y-4 rounded-xl border border-[#e1dbd0] p-5 shadow-sm bg-[#f0ece3] dark:bg-gray-900 dark:border-gray-800">
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Image src="/quests.svg" alt="Challenges" width={24} height={24} className="opacity-80" />
            <h3 className="text-lg font-bold text-[#3a3630] dark:text-blue-400 tracking-tight font-outfit">
              Challenges
            </h3>
          </div>
          <Link href="/quests">
            <Button size="sm" variant="ghost" className="text-[#9b6a9b] hover:text-[#7d557d] hover:bg-[#e8e4d9] dark:text-blue-400 dark:hover:text-blue-300 text-xs font-medium px-2 h-8 font-outfit">
              VIEW ALL
            </Button>
          </Link>
        </div>
      </div>
      <ul className="w-full space-y-4">
        {challenges.slice(0, 3).map((challenge) => {
          const progress = Math.min((points / challenge.value) * 100, 100);
          const isCompleted = points >= challenge.value;
          
          return (
            <div
              key={challenge.value}
              className="flex w-full items-center gap-x-3 py-2"
            >
              <div className="relative flex-shrink-0">
                <Image 
                  src={isCompleted ? "/checkmark.svg" : "/points.svg"} 
                  alt={isCompleted ? "Completed" : "XP"} 
                  height={26} 
                  width={26} 
                  className="transition-all" 
                />
              </div>
              <div className="flex w-full flex-col gap-y-1.5">
                <div className="flex justify-between items-center">
                  <p className={`text-sm font-medium font-outfit ${isCompleted ? "text-[#9b6a9b] dark:text-blue-400" : "text-[#6d4b73] dark:text-blue-300"}`}>
                    {challenge.title}
                  </p>
                  <span className={`text-xs font-medium font-outfit ${isCompleted ? "text-green-600 dark:text-green-400" : "text-[#9b6a9b] dark:text-blue-400"}`}>
                    {Math.min(points, challenge.value)}/{challenge.value}
                  </span>
                </div>
                <Progress 
                  value={progress} 
                  className={`h-1.5 bg-[#e8e4d9] dark:bg-gray-800 ${
                    isCompleted 
                      ? "[&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-teal-500" 
                      : "[&>div]:bg-gradient-to-r [&>div]:from-[#9b6a9b] [&>div]:to-[#b993bc]"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
