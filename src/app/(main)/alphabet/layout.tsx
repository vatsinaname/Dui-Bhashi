import React from "react";
import { cn } from "@/lib/utils";

const AlphabetLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col bg-[#ede9df] dark:bg-slate-950 transition-colors">
      {children}
    </div>
  );
};

export default AlphabetLayout; 