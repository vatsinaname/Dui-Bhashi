"use client";

import { Button } from "@/components/ui/button";
import { BookText } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  title: string;
  description: string;
};

export const UnitBanner = ({ title, description }: Props) => {
  return (
    <div className="flex items-center justify-between rounded-xl border-2 border-[#a78bab] dark:border-blue-800/50 bg-gradient-to-r from-[#e2c6e4] to-[#f0d6f1] dark:from-blue-900 dark:to-indigo-900 p-5 shadow-md">
      <div className="max-w-[80%]">
        <h1 className="line-clamp-1 text-2xl font-bold text-[#6d4b73] dark:text-blue-300 md:text-3xl">
          {title}
        </h1>
        <p className="line-clamp-2 text-base text-[#8d6493] dark:text-blue-400 md:text-lg">
          {description}
        </p>
      </div>
      <div className="hidden h-[120px] w-[120px] items-center justify-center rounded-full bg-[#bd8cbf] dark:bg-blue-700 md:flex">
        <Image
          src="/mascot.png"
          alt="Unit"
          height={100}
          width={100}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default UnitBanner;
