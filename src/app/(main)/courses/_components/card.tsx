import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
};

export const Card = ({
  title,
  id,
  imageSrc,
  onClick,
  active,
  disabled,
}: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        `relative flex h-full min-h-[200px] cursor-pointer flex-col
        items-center justify-between rounded-xl border-2 p-3
        bg-white dark:bg-slate-800 shadow-sm transition-all
        hover:shadow-md hover:border-[#bd8cbf] dark:hover:border-blue-700
        hover:translate-y-[-2px]
        dark:border-slate-700 active:translate-y-0`,
        disabled && `pointer-events-none opacity-50`,
        active && `border-[#9b6a9b] dark:border-blue-800 bg-[#faf5fb] dark:bg-slate-900`
      )}
    >
      {active && (
        <div className="absolute top-2 right-2 flex items-center justify-center rounded-full bg-gradient-to-r from-[#9b6a9b] to-[#b993bc] dark:from-blue-700 dark:to-blue-600 p-1">
          <Check className="h-3 w-3 stroke-[4] text-white" />
        </div>
      )}
      <div className="w-full flex-1 flex items-center justify-center py-2">
        <div className="relative h-[80px] w-[100px]">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-contain drop-shadow-md"
          />
        </div>
      </div>
      <div className="w-full rounded-lg bg-[#f9f7f1] dark:bg-slate-700/40 p-2 text-center">
        <p className="font-bold text-[#6d4b73] dark:text-blue-300">{title}</p>
        <p className="text-xs text-[#8d6493] dark:text-blue-400 mt-0.5">
          {active ? "Continue learning" : "Start learning"}
        </p>
      </div>
    </div>
  );
};
