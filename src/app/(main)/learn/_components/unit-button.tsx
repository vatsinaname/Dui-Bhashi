import Link from "next/link";
import { Check, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  id: number;
  index: number;
  title: string;
  description: string;
  locked?: boolean;
  current?: boolean;
  type?: string;
  imageUrl?: string;
};

export const UnitButton = ({
  id,
  index,
  title,
  description,
  locked,
  current,
  type,
}: Props) => {
  const href = locked ? "#" : `/learn/${id}`;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-start gap-x-4 rounded-xl border-2 p-4 transition-colors",
        locked
          ? "cursor-not-allowed border-neutral-300 bg-neutral-200 hover:bg-neutral-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          : current
          ? "border-[#9b6a9b] bg-[#f5e9f7] hover:bg-[#eddcef] dark:border-blue-800/50 dark:bg-blue-900/30 dark:hover:bg-blue-900/40"
          : "border-[#c8b0cb] bg-[#e9d9eb] hover:bg-[#e1cee3] dark:border-blue-900/30 dark:bg-blue-950/30 dark:hover:bg-blue-950/40"
      )}
    >
      <div
        className={cn(
          "relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2",
          locked
            ? "border-neutral-400 bg-neutral-300 text-neutral-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-500"
            : current
            ? "border-[#9b6a9b] bg-[#bd8cbf] text-white dark:border-blue-700 dark:bg-blue-600"
            : "border-[#9b6a9b] bg-white text-[#9b6a9b] dark:border-blue-700 dark:text-blue-700"
        )}
      >
        {locked ? (
          <Lock className="h-6 w-6" />
        ) : (
          <div className="text-xl font-bold">{index}</div>
        )}
        {!locked && !current && (
          <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#9b6a9b] bg-[#bd8cbf] text-white dark:border-blue-700 dark:bg-blue-600">
            <Check className="h-4 w-4 stroke-[4]" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3
          className={cn(
            "line-clamp-1 text-lg font-bold",
            locked ? "text-neutral-500 dark:text-slate-400" : "text-[#6d4b73] dark:text-blue-300"
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "line-clamp-2 text-sm",
            locked ? "text-neutral-400 dark:text-slate-500" : "text-[#8d6493] dark:text-blue-400"
          )}
        >
          {type === "script" ? "Learn the telugu alphabet and writing system." : description}
        </p>
      </div>
    </Link>
  );
}; 