"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";

export const MobileSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 hover:opacity-75 transition">
        <Menu className={cn(
          "text-white dark:text-white"
        )} />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 dark:bg-slate-950">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
