"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
  label: string;
  iconSrc: string;
  href: string;
  active?: boolean;
};

export const SidebarItem = ({
  label,
  iconSrc,
  href,
  active,
}: Props) => {
  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center gap-x-3 rounded-xl p-4 text-neutral-800 transition-all hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
          active && "bg-slate-100 text-darkblue-900 dark:bg-slate-800 dark:text-white"
        )}
      >
        <Image
          src={iconSrc}
          alt={label}
          height={32}
          width={32}
          className={cn(
            "transition-all",
            active && "filter-none dark:brightness-200"
          )}
        />
        <span className="flex-1 text-base font-bold">{label}</span>
      </div>
    </Link>
  );
};
