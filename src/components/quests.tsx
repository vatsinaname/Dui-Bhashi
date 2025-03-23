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

export const Quests = ({ points, activeCourse }: Props) => {
  // Determine which quests to display based on course title
  let quests;
  
  if (activeCourse.title.toLowerCase().includes("telugu")) {
    quests = teluguQuests;
  } else if (activeCourse.title.toLowerCase().includes("kannada")) {
    quests = kannadaQuests;
  } else {
    // Fallback to ID-based selection
    quests = activeCourse.id === 1 ? teluguQuests : kannadaQuests;
  }

  return (
    <div className="mb-8 space-y-4 rounded-xl border-2 p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-amber-600">
            Quests
          </h3>
          <Link href="/quests">
            <Button size="sm" variant="primaryOutline">
              View all
            </Button>
          </Link>
        </div>
      </div>
      <ul className="w-full space-y-4">
        {quests.map((quest) => {
          const progress = Math.min((points / quest.value) * 100, 100);
          return (
            <div
              key={quest.value}
              className="flex w-full items-center gap-x-3 border-t-2 p-4"
            >
              <Image src="/points.svg" alt="point" height={60} width={60} />
              <div className="flex w-full flex-col gap-y-2">
                <p className="text-sm font-bold text-neutral-700 dark:text-amber-600">
                  {quest.title}
                </p>
                <Progress 
                  value={progress} 
                  className="h-3 bg-gray-100" 
                />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
