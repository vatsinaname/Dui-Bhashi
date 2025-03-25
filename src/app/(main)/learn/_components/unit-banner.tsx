"use client";

import { Button } from "@/components/ui/button";
import { BookText } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description: string;
};

export const UnitBanner = ({ title, description }: Props) => {
  return (
    <div className={cn(
      "flex items-center justify-between rounded-xl border-2 px-4 py-3",
      "bg-blue-700 text-white hover:bg-blue-600",
      "dark:bg-blue-800 dark:hover:bg-blue-700"
    )}>
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>
      <Link href="/lesson">
        <Button
          size="lg"
          variant="secondary"
          className="hidden border-2 border-b-4 active:border-b-2 xl:flex"
        >
          <BookText className="mr-2" />
          Continue
        </Button>
      </Link>
    </div>
  );
};

export default UnitBanner;
