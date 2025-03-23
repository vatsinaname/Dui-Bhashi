import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  question: string;
};

export const QuestionBubble = ({ question }: Props) => {
  return (
    <div className="my-6 flex items-center gap-x-4">
      <Image
        src="/mascot.svg"
        alt="Mascot"
        height={80}
        width={80}
        className="hidden dark:invert-[0.2] lg:block"
      />
      <Image
        src="/mascot.svg"
        alt="Mascot"
        height={40}
        width={40}
        className="block dark:invert-[0.2] lg:hidden"
      />
      <div className={cn(
        "relative rounded-xl border-2 px-4 py-2 text-sm lg:text-base",
        "bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-white"
      )}>
        {question}
        {/* Create Chevron (Bubble) */}
        <div
          className={cn(
            "absolute -left-3 top-1/2 h-0 w-0 -translate-y-1/2 rotate-90 transform",
            "border-x-8 border-t-8 border-x-transparent",
            "dark:border-t-slate-700"
          )}
        />
      </div>
    </div>
  );
};
