import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

import { getUnits } from "@/db/queries";
import { UnitBanner } from "../_components/unit-banner";
import { LessonButton } from "../_components/lesson-button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function UnitPage({ params }: PageProps) {
  // Get the unit ID from params
  const unitId = parseInt(params.id, 10);
  
  if (isNaN(unitId)) {
    return redirect("/learn");
  }

  const authData = await auth();
  const userId = authData.userId;

  if (!userId) {
    return redirect("/");
  }

  // Fetch all units
  const units = await getUnits();
  
  // Find the specific unit
  const unit = units.find(u => u.id === unitId);
  
  if (!unit) {
    return redirect("/learn");
  }

  // Prepare lessons display
  return (
    <div className="mx-auto flex max-w-[988px] flex-col px-3">
      <div className="flex-1">
        <UnitBanner title={unit.title} description={unit.description} />
        <Separator className="my-6 bg-[#d7c3d9]" />
        
        <div className="mb-6 rounded-xl border-2 border-[#d7c3d9] dark:border-blue-800/30 bg-[#faf5fb] dark:bg-slate-900 p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-[#6d4b73] dark:text-blue-400">
            Unit Lessons
          </h2>
          <div className="relative flex flex-col items-center">
            {unit.lessons.map((lesson, index) => {
              // Calculate lesson completion percentage
              const totalChallenges = lesson.challenges.length;
              const completedChallenges = lesson.challenges.filter(
                (challenge) => 
                  challenge.challengeProgress && 
                  challenge.challengeProgress.length > 0 && 
                  challenge.challengeProgress.every(progress => progress.completed)
              ).length;
              
              const percentage = totalChallenges > 0 
                ? Math.round((completedChallenges / totalChallenges) * 100)
                : 0;
              
              return (
                <LessonButton
                  key={lesson.id}
                  id={lesson.id}
                  index={index}
                  totalCount={unit.lessons.length - 1}
                  current={!lesson.completed && !lesson.locked}
                  locked={lesson.locked}
                  percentage={percentage}
                />
              );
            })}
          </div>
        </div>
        
        <Card className="mb-8 border-[#d7c3d9] dark:border-blue-800/30 bg-[#faf5fb] dark:bg-slate-900 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#6d4b73] dark:text-blue-400">
              Unit Overview
            </CardTitle>
            <CardDescription className="text-[#8d6493] dark:text-blue-300">
              Tips for learning this unit's content
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
                <p className="font-semibold text-[#6d4b73] dark:text-blue-400">Start from the beginning</p>
                <p className="text-sm">Complete lessons in order for the best learning experience</p>
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
                <p className="font-semibold text-[#6d4b73] dark:text-blue-400">Practice pronunciation</p>
                <p className="text-sm">Listen carefully to audio examples in each lesson</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 