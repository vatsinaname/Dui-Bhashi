import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Header = ({ title }: { title: string }) => {
  return (
    <div
      className={cn(
        "sticky top-0 mb-5 flex items-center justify-between border-b-2",
        "bg-background",
        "pb-3 text-neutral-400 lg:z-50 lg:mt-[-28px] lg:pt-[28px]"
      )}
    >
      <Link href="/courses">
        <Button variant="ghost" size="sm">
          <ArrowLeftIcon className="h-5 w-5 stroke-2 text-neutral-400 dark:text-slate-400" />
        </Button>
      </Link>
      <h1 className="text-lg font-bold text-foreground">{title}</h1>
      <div />
    </div>
  );
};
