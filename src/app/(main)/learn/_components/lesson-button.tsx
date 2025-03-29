"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Crown, Star } from "lucide-react";
import Link from "next/link";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useTheme } from "@/context/theme-provider";

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
};

export const LessonButton = ({
  id,
  index,
  percentage,
  totalCount,
  current,
  locked,
}: Props) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;
  
  // Use the theme hook from the application's theme provider
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Create a more interesting zigzag pattern with slight variation
  let indentationLevel;

  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex * 0.8;
  } else if (cycleIndex <= 4) {
    indentationLevel = (4 - cycleIndex) * 0.7;
  } else if (cycleIndex <= 6) {
    indentationLevel = (4 - cycleIndex) * 0.9;
  } else {
    indentationLevel = (cycleIndex - 8) * 0.8;
  }

  // Slightly reduce right position for a more balanced layout
  const rightPosition = indentationLevel * 35;

  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  // Use custom icons for different states
  const Icon = isCompleted ? Check : isLast ? Crown : Star;

  // Remove the hash href for completed lessons - allow navigation to all non-locked lessons
  const href = locked ? "#" : `/lesson/${id}`;

  // Define theme-specific colors
  const pathColor = isDarkMode ? "#3B82F6" : "#9b6a9b"; // blue-500 in dark mode, original color in light mode
  const trailColor = isDarkMode ? "#1E293B" : "#e5e7eb"; // slate-800 in dark mode, original color in light mode

  return (
    <Link
      href={href}
      className={cn(
        "transition-opacity",
        locked ? "cursor-not-allowed opacity-50" : "hover:opacity-85"
      )}
    >
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && !isCompleted ? 55 : 22,
        }}
      >
        {current ? (
          <div className="relative h-[102px] w-[102px]">
            <div className="absolute -top-6 left-2.5 z-10 animate-bounce rounded-xl border-2 bg-white dark:bg-slate-900 dark:border-blue-900 px-3 py-2.5 font-medium uppercase tracking-wide text-[#9b6a9b] dark:text-blue-400 shadow-sm">
              Start
              <div
                className="absolute -bottom-2 left-1/2 h-0 w-0 
              -translate-x-1/2 transform border-x-8 border-t-8 border-x-transparent border-t-white dark:border-t-slate-900"
              />
            </div>
            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage}
              styles={{
                path: {
                  stroke: pathColor,
                },
                trail: {
                  stroke: trailColor,
                },
              }}
            >
              <Button
                size="rounded"
                variant={locked ? "locked" : "secondary"}
                className={cn(
                  "h-[70px] w-[70px] border-b-4 shadow-md transition-transform hover:scale-105",
                  !locked && "bg-[#bd8cbf] hover:bg-[#ad7caf] border-[#9b6a9b] dark:bg-blue-600 dark:hover:bg-blue-700 dark:border-blue-700",
                  locked ? "cursor-not-allowed opacity-50 dark:bg-slate-700 dark:border-slate-600" : "hover:opacity-85"
                )}
                disabled={locked}
              >
                <Icon
                  className={cn(
                    "h-10 w-10",
                    locked
                      ? "fill-neutral-400 stroke-neutral-400 text-neutral-400"
                      : "fill-white text-white",
                    isCompleted && "fill-none stroke-[4]",
                  )}
                />
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          <Button
            size="rounded"
            variant={locked ? "locked" : "secondary"}
            className={cn(
              "h-[70px] w-[70px] border-b-4 shadow-md transition-transform hover:scale-105",
              !locked && "bg-[#bd8cbf] hover:bg-[#ad7caf] border-[#9b6a9b] dark:bg-blue-600 dark:hover:bg-blue-700 dark:border-blue-700",
              locked ? "cursor-not-allowed opacity-50 dark:bg-slate-700 dark:border-slate-600" : "hover:opacity-85"
            )}
            disabled={locked}
          >
            <Icon
              className={cn(
                "h-10 w-10",
                locked
                  ? "fill-neutral-400 stroke-neutral-400 text-neutral-400"
                  : "fill-white text-white",
                isCompleted && "fill-none stroke-[4]",
              )}
            />
          </Button>
        )}
      </div>
    </Link>
  );
};
