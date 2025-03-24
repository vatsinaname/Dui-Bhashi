import React from "react";
import Image from "next/image";
import { MobileSideBar } from "./mobile-sidebar";
import { cn } from "@/lib/utils";

export const MobileHeader = () => {
  return (
    <nav className={cn(
      "fixed top-0 z-50 flex h-[50px] w-full items-center border-b px-6 lg:hidden",
      "bg-darkblue-500 dark:bg-slate-900 dark:border-slate-800"
    )}>
      <MobileSideBar />
      <div className="flex items-center gap-x-2">
        <Image
          src="/Dui.svg"
          alt="Logo"
          height={40}
          width={40}
          className="rounded-full dark:brightness-95"
        />
      </div>
    </nav>
  );
};
