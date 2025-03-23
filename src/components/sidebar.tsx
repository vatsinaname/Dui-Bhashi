"use client";

import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";
import { ThemeToggle } from "./theme-toggle";
import {
  ClerkLoaded,
  ClerkLoading,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className={cn(
      "flex h-full lg:w-[256px] lg:fixed lg:left-0 lg:top-0 flex-col px-4 transition-all dark:bg-slate-950",
      className
    )}>
      <div className="flex items-center justify-between py-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
        <ThemeToggle />
      </div>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem
          label="Learn"
          href="/learn"
          iconSrc="/learn.svg"
          active={pathname === "/learn"}
        />
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
