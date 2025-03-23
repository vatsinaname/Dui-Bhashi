"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-gray-200",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1 bg-blue-500",
        "transition-transform duration-500 ease-in-out"
      )}
      style={{ 
        transform: `translateX(-${100 - (value || 0)}%)`,
        backgroundColor: value === 100 ? '#22c55e' : '#3b82f6'
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
