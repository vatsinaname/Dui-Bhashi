import React from "react";
import { Progress } from "../../../components/ui/progress";
import { useExitModal } from "../../../store/use-exit-modal";
import { InfinityIcon, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

interface Props {
  hearts?: number;
  percentage?: number;
  showProgress?: boolean;
}

export const Header = ({
  hearts = 5,
  percentage = 0,
  showProgress = true,
}: Props) => {
  const { open } = useExitModal();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <nav className="mx-auto flex max-w-[988px] items-center justify-between">
        <Link href="/learn" className="flex items-center gap-x-3">
          <Image src="/mascot.png" alt="Mascot" height={32} width={32} />
          <span className="text-xl font-bold tracking-wide dark:text-white">Dui Bhashi</span>
        </Link>
        <div className="flex items-center gap-x-4">
          {showProgress && (
            <div className="hidden h-4 w-full max-w-[240px] overflow-hidden rounded-full bg-gray-200 md:block dark:bg-gray-800">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          )}
          <Link href="/shop" className="flex items-center gap-x-1">
            <div className="flex items-center">
              <Image src="/heart.svg" alt="Hearts" height={28} width={28} />
              <span className="text-rose-500">{hearts}</span>
            </div>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
    </header>
  );
};
