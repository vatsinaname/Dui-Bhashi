import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  onCheck: () => void;
  status: "correct" | "wrong" | "none" | "completed";
  disabled?: boolean;
  lessonId?: number;
  onContinue?: () => void;
  onFinish?: () => void;
  showContinue?: boolean;
  showFinish?: boolean;
  hideExit?: boolean;
  onExit?: () => void;
  onNext?: () => void;
};

export const Footer = ({ 
  onCheck, 
  status, 
  disabled, 
  lessonId, 
  onContinue, 
  onFinish, 
  showContinue, 
  showFinish,
  hideExit
}: Props) => {
  useKey("Enter", onCheck, {}, [onCheck]);
  const isMobile = useMedia("(max-width:1024px)");

  // Special layout just for completed lessons
  if (status === "completed") {
    return (
      <footer 
        className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 flex items-center justify-end border-t shadow-lg bg-white dark:bg-slate-950 transition-all duration-300"
      >
        <Button
          onClick={onCheck}
          size="lg"
          className="rounded-xl bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold shadow-md"
        >
          Return to courses
        </Button>
        {showFinish && (
          <Button
            onClick={onFinish}
            size="lg"
            className="rounded-xl bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold shadow-md ml-3"
          >
            Finish
          </Button>
        )}
      </footer>
    );
  }

  // Original footer for all other states
  return (
    <footer 
      className={cn(
        "fixed bottom-0 left-0 right-0 p-3 sm:p-4 flex items-center justify-between border-t shadow-lg bg-white dark:bg-slate-950 transition-all duration-300",
        status === "correct" && "border-t-blue-800 dark:border-t-blue-700 bg-blue-50/60 dark:bg-blue-950/40",
        status === "wrong" && "border-t-rose-600 dark:border-t-rose-500 bg-rose-50/60 dark:bg-rose-950/40"
      )}
    >
      <div className="flex items-center gap-x-4">
        {!hideExit && (
          <Button
            size="lg"
            className="rounded-xl font-bold"
            variant="ghost"
            onClick={() => window.location.href = "/learn"}
          >
            <X className="h-6 w-6 mr-2 text-slate-500" />
            <span className="text-slate-800 dark:text-slate-200">Exit</span>
          </Button>
        )}
      </div>
      <div>
        {status === "correct" && (
          <Button
            onClick={onCheck}
            size="lg"
            className="rounded-xl bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold shadow-md"
          >
            Continue
          </Button>
        )}
        {status === "wrong" && (
          <Button
            onClick={onCheck}
            size="lg"
            className="rounded-xl bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold shadow-md"
          >
            Try Again
          </Button>
        )}
        {status === "none" && (
          <Button
            onClick={onCheck}
            size="lg"
            disabled={disabled}
            className={cn(
              "rounded-xl bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold shadow-md",
              disabled && "opacity-50 cursor-not-allowed bg-blue-300 dark:bg-blue-900"
            )}
          >
            Continue
          </Button>
        )}
      </div>
    </footer>
  );
};
