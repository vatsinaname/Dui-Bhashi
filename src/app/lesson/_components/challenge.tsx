import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Card } from "./card";

type Props = {
  options: (typeof challengeOptions.$inferSelect)[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption: number | null;
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)["type"];
};

export const Challenge = ({
  onSelect,
  options,
  status,
  type,
  disabled,
  selectedOption,
}: Props) => {
  return (
    <div className="w-full">
      <div className={cn(
        "grid gap-4 grid-cols-2",
        type === "ASSIST" 
          ? "sm:grid-cols-4 sm:gap-5" 
          : "sm:grid-cols-2 max-w-[580px] mx-auto gap-5 mb-6"
      )}>
        {options.map((option) => (
          <Card
            key={option.id}
            id={option.id}
            text={option.text || ""}
            imageSrc={option.imageSrc || ""}
            audioSrc={option.audioSrc || ""}
            selected={selectedOption === option.id}
            onClick={() => onSelect(option.id)}
            status={status}
            disabled={disabled}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};
