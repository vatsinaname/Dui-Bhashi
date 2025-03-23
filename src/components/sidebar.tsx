"use client";

import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";
import { ThemeToggle } from "./theme-toggle";
import { UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { useEffect, useState, ReactNode } from "react";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  const pathname = usePathname();
  const { user } = useUser();
  const [courseTitle, setCourseTitle] = useState<string | null>(null);

  // Fetch active course info
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const response = await fetch('/api/user-progress');
        if (response.ok) {
          const data = await response.json();
          if (data.courseTitle) {
            setCourseTitle(data.courseTitle);
          } else {
            setCourseTitle(null);
          }
        }
      } catch (error) {
        console.error("Failed to fetch active course:", error);
        setCourseTitle(null);
      }
    };

    fetchUserProgress();
  }, [pathname]); // Re-fetch when pathname changes

  return (
    <div className={cn(
      "flex h-full lg:w-[256px] lg:fixed lg:left-0 lg:top-0 flex-col px-4 transition-all dark:bg-slate-950",
      className
    )}>
      <div className="flex items-center justify-between py-4">
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
        <ThemeToggle />
      </div>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem
          label="Learn"
          href="/learn"
          iconSrc="/learn.svg"
          active={pathname === "/learn"}
        />
        {courseTitle && (
          <SidebarItem
            label={`${courseTitle} Alphabet`}
            href="/alphabet"
            iconSrc="/alphabet.svg"
            active={pathname === "/alphabet"}
          />
        )}
        <SidebarItem
          label="Leaderboard"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
          active={pathname === "/leaderboard"}
        />
        <SidebarItem
          label="Quests"
          href="/quests"
          iconSrc="/quests.svg"
          active={pathname === "/quests"}
        />
        <SidebarItem
          label="Shop"
          href="/shop"
          iconSrc="/shop.svg"
          active={pathname === "/shop"}
        />
        {user?.publicMetadata?.admin && (
          <SidebarItem
            label="Admin"
            href="/admin"
            iconSrc="/admin.svg"
            active={pathname === "/admin"}
          />
        )}
      </div>
    </div>
  );
};
