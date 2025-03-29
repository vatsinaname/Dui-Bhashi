import React from "react";
import { getCourses, getUserProgress } from "../../../db/queries";
import { List } from "./_components/list";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "BhashaBird | Courses",
  description:
    "Learn a new language with BhashaBird. Choose from a variety of Indian languages.",
};

const CoursesPage = async () => {
  const coursesData = await getCourses();
  const userProgressData = await getUserProgress();

  return (
    <div className="mx-auto h-full max-w-[988px] px-3">
      <div className="mb-8 rounded-xl border-2 border-[#d7c3d9] dark:border-blue-800/30 bg-[#faf5fb] dark:bg-slate-900 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#6d4b73] dark:text-blue-400 mb-2">Language Courses</h1>
            <p className="text-[#8d6493] dark:text-blue-300 mb-4">
              Begin your journey to fluency with our carefully crafted language learning paths.
              Choose a language and start learning today.
            </p>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-[#bd8cbf] dark:bg-blue-600"></div>
                <span className="text-sm text-[#8d6493] dark:text-blue-300">Structured lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-[#bd8cbf] dark:bg-blue-600"></div>
                <span className="text-sm text-[#8d6493] dark:text-blue-300">Cultural context</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-[#bd8cbf] dark:bg-blue-600"></div>
                <span className="text-sm text-[#8d6493] dark:text-blue-300">Daily practice</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 rounded-full bg-[#e2c6e4]/50 dark:bg-blue-900/20 p-3">
            <Image
              src="/mascot.png"
              alt="BhashaBird Mascot"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-xl font-bold text-[#6d4b73] dark:text-blue-400">Choose Your Language</h2>
          <div className="h-0.5 flex-1 bg-[#e2c6e4] dark:bg-blue-900/30"></div>
        </div>
        <p className="text-[#8d6493] dark:text-blue-300 mb-3">
          Select a language below to begin or continue your learning journey
        </p>
        <List courses={coursesData} activeCourseId={userProgressData?.activeCourseId} />
      </div>
    </div>
  );
};

export default CoursesPage;
