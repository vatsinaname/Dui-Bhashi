import React from "react";
import { cn } from "@/lib/utils";

const AlphabetLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn(
      "flex h-full flex-col",
      "bg-white dark:bg-slate-950",
      "transition-colors"
    )}>
      <div className="flex h-full w-full flex-col">
        {children}
      </div>
    </div>
  );
};

export default AlphabetLayout; 