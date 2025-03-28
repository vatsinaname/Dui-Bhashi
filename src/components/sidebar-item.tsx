"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  iconSrc?: string;
  icon?: LucideIcon;
  href: string;
  active?: boolean;
};

const LearnIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const LeaderboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 5V11C6 14.314 8.686 17 12 17C15.314 17 18 14.314 18 11V5" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 5C18 3 19 3 20 3C21 3 21.5 4 21 6C20.5 8 19 8.5 18 8" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 5C6 3 5 3 4 3C3 3 2.5 4 3 6C3.5 8 5 8.5 6 8" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 17V20" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 20H16" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 20V22" strokeWidth="2" strokeLinecap="round"/>
    <path d="M15 20V22" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 22H15" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const AlphabetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 6L10 18" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 12H10" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 6V18" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 6H17" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 12H17" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 18H17" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const QuestsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6V18" strokeWidth="1.5" strokeLinecap="round" stroke="currentColor" />
    <path d="M9 6C9 6 11 8 14 6C17 4 18 6 18 6V12C18 12 17 10 14 12C11 14 9 12 9 12V6Z" fill="currentColor" fillOpacity="0.85" />
  </svg>
);

export const SidebarItem = ({
  label,
  iconSrc,
  icon: Icon,
  href,
  active,
}: Props) => {
  const getIcon = () => {
    if (Icon) {
      return (
        <Icon 
          className={cn(
            "w-6 h-6",
            active ? "text-[#9b6a9b] dark:text-blue-400" : "text-slate-600 dark:text-slate-400",
            href === "/quests" && active && "text-[#9b6a9b] dark:text-blue-400"
          )} 
          strokeWidth={1.5}
        />
      );
    }

    if (iconSrc === "/learn.svg") {
      return (
        <div className={cn(
          "h-6 w-6",
          active ? "text-[#9b6a9b] dark:text-blue-400" : "text-slate-600 dark:text-slate-400"
        )}>
          <LearnIcon />
        </div>
      );
    }

    if (iconSrc === "/leaderboard.svg") {
      return (
        <div className={cn(
          "h-6 w-6",
          active ? "text-[#9b6a9b] dark:text-blue-400" : "text-slate-600 dark:text-slate-400"
        )}>
          <LeaderboardIcon />
        </div>
      );
    }

    if (iconSrc === "/alphabet.svg") {
      return (
        <div className={cn(
          "h-6 w-6",
          active ? "text-[#9b6a9b] dark:text-blue-400" : "text-slate-600 dark:text-slate-400"
        )}>
          <AlphabetIcon />
        </div>
      );
    }

    if (iconSrc === "/quests.svg") {
      return (
        <div className={cn(
          "h-6 w-6",
          active ? "text-[#9b6a9b] dark:text-blue-400" : "text-slate-600 dark:text-slate-400"
        )}>
          <QuestsIcon />
        </div>
      );
    }

    // For other SVG icons, continue using img tag
    if (iconSrc) {
      return (
        <div className={cn(
          "h-6 w-6",
          active ? "text-[#9b6a9b] dark:text-blue-400" : "text-slate-600 dark:text-slate-400"
        )}>
          <img
            src={iconSrc}
            alt={label}
            className="h-full w-full"
          />
        </div>
      );
    }

    return null;
  };

  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center gap-x-3 rounded-xl p-4 text-neutral-800 transition-all hover:bg-[#e8e4d9] dark:text-slate-400 dark:hover:bg-slate-800",
          active && "bg-[#f9f7f1] text-[#3a3630] border border-[#d5c0d6] shadow-sm dark:bg-slate-800 dark:text-white dark:border-purple-800/30"
        )}
      >
        {getIcon()}
        <span className={cn(
          "flex-1 text-base font-medium",
          active && "font-semibold"
        )}>{label}</span>
      </div>
    </Link>
  );
};
