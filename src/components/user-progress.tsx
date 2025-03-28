import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { courses } from "../db/schema";
import { cn } from "@/lib/utils";

type Props = {
  activeCourse: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  className?: string;
};

export const UserProgress = ({
  activeCourse,
  hearts,
  points,
  className,
}: Props) => {
  return (
    <div className={cn("grid grid-cols-3 w-full max-w-md mx-auto items-center gap-x-2", className)}>
      <div className="flex justify-start">
        <Link href="/courses">
          <Button variant="ghost">
            <Image
              src={activeCourse.imageSrc}
              alt={activeCourse.title}
              className="rounded-md border"
              width={32}
              height={32}
            />
          </Button>
        </Link>
      </div>
      
      <div className="flex justify-center">
        <Link href="/shop">
          <Button variant="ghost" className="text-[#9b6a9b] dark:text-blue-400">
            <Image
              src="/points.svg"
              alt="Points"
              width={28}
              height={28}
              className="mr-2"
            />
            {points}
          </Button>
        </Link>
      </div>
      
      <div className="flex justify-end">
        <Link href="/shop">
          <Button variant="ghost" className="text-rose-500">
            <Image
              src="/heart.svg"
              alt="Hearts"
              width={22}
              height={22}
              className="mr-2"
            />
            {hearts}
          </Button>
        </Link>
      </div>
    </div>
  );
};
