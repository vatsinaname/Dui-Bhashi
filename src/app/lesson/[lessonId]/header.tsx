import React from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LessonHeaderProps {
  title: string;
  progress: number;
  courseTitle?: string;
}

export const LessonHeader = ({ 
  title, 
  progress, 
  courseTitle 
}: LessonHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 dark:border-slate-800 dark:bg-slate-950">
      <Link
        href="/learn"
        className="flex items-center gap-x-2 text-slate-800 transition-colors hover:text-slate-600 dark:text-slate-200 dark:hover:text-slate-400"
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="font-semibold">Exit</span>
      </Link>
      
      <div className="flex items-center gap-x-2">
        <div className="text-center">
          <h1 className="text-base font-bold text-slate-800 dark:text-white">
            {title}
          </h1>
          {courseTitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {courseTitle}
            </p>
          )}
        </div>
      </div>
      
      <div className="w-24">
        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800">
          <div 
            className={cn(
              "h-full rounded-full bg-emerald-600 transition-all duration-300",
              progress === 100 && "bg-blue-600"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </header>
  );
}; 