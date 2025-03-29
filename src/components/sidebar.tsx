"use client";

import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";
import { ThemeToggle } from "./theme-toggle";
import { UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { useEffect, useState, ReactNode } from "react";
import { ShoppingCart, Settings, LucideIcon, GraduationCap } from "lucide-react";

type Props = {
  className?: string;
  children?: ReactNode;
};

type SidebarItemProps = {
  label: string;
  href: string;
  active: boolean;
  icon: LucideIcon;
};

export const Sidebar = ({ className }: Props) => {
  const pathname = usePathname();
  const { user } = useUser();
  const [courseTitle, setCourseTitle] = useState<string | null>(null);
  const [achievementTitle, setAchievementTitle] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Fetch active course info with improvement - start loading faster
  useEffect(() => {
    // Immediately check sessionStorage first for cached course title
    if (typeof window !== 'undefined') {
      const cachedTitle = sessionStorage.getItem('activeCourseTitleCache');
      const cachedAchievement = sessionStorage.getItem('achievementTitleCache');
      if (cachedTitle) {
        setCourseTitle(cachedTitle);
      }
      if (cachedAchievement) {
        setAchievementTitle(cachedAchievement);
      }
    }

    const fetchUserProgress = async () => {
      try {
        const response = await fetch('/api/user-progress', {
          cache: 'no-store', // Ensure we get fresh data
          priority: 'high' // Signal this is a high priority fetch
        });
        if (response.ok) {
          const data = await response.json();
          if (data.courseTitle) {
            setCourseTitle(data.courseTitle);
            // Cache the result in sessionStorage for immediate use next time
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('activeCourseTitleCache', data.courseTitle);
            }
          } else {
            setCourseTitle(null);
            // Clear cache if no title
            if (typeof window !== 'undefined') {
              sessionStorage.removeItem('activeCourseTitleCache');
            }
          }
          
          if (data.achievementTitle) {
            setAchievementTitle(data.achievementTitle);
            // Cache the achievement title
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('achievementTitleCache', data.achievementTitle);
            }
          } else {
            setAchievementTitle(null);
            if (typeof window !== 'undefined') {
              sessionStorage.removeItem('achievementTitleCache');
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch active course:", error);
      }
    };

    fetchUserProgress();
  }, [pathname]); // Re-fetch when pathname changes

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={cn(
      "flex h-full lg:w-[256px] lg:fixed lg:left-0 lg:top-0 flex-col px-4 transition-all bg-[#ede9df] dark:bg-slate-950",
      className
    )}>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-x-2">
          <UserButton afterSignOutUrl="/" />
          {achievementTitle && (
            <span className="text-sm font-semibold text-[#9b6a9b] dark:text-blue-400 ml-2">
              {achievementTitle.includes('(') 
                ? achievementTitle.match(/\(([^)]+)\)/)?.[1] || achievementTitle 
                : achievementTitle}
            </span>
          )}
        </div>
        <div className="mr-6">
          <ThemeToggle />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem
          label="Courses"
          href="/courses"
          icon={GraduationCap}
          active={pathname === "/courses"}
        />
        <SidebarItem
          label="Learn"
          href="/learn"
          iconSrc="/learn.svg"
          active={pathname === "/learn"}
        />
        {courseTitle ? (
          <SidebarItem
            label={`${courseTitle} Alphabet`}
            href="/alphabet"
            iconSrc="/alphabet.svg"
            active={pathname === "/alphabet"}
          />
        ) : mounted && pathname !== "/courses" ? (
          <div className="flex items-center gap-x-2 w-full p-2.5 rounded-lg text-muted-foreground">
            <div className="shrink-0 h-5 w-5 mr-2">
              <div className="h-5 w-5 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="w-full h-4 bg-muted rounded animate-pulse"></div>
          </div>
        ) : null}
        
        <SidebarItem
          label="Leaderboard"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
          active={pathname === "/leaderboard"}
        />
        <SidebarItem
          label="Challenges"
          href="/quests"
          iconSrc="/quests.svg"
          active={pathname === "/quests"}
        />
        <SidebarItem
          icon={ShoppingCart}
          label="Rewards"
          href="/shop"
          active={pathname === "/shop"}
        />
        {user?.publicMetadata && (user?.publicMetadata as { admin?: boolean })?.admin && (
          <SidebarItem
            label="Admin"
            href="/admin"
            icon={Settings}
            active={pathname === "/admin"}
          />
        )}
      </div>
    </div>
  );
};
