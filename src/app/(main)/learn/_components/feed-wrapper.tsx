// src/app/(main)/learn/_components/feed-wrapper.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export const FeedWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn(
      "flex-1 px-4",
      "bg-white dark:bg-slate-950",
      "transition-colors"
    )}>
      {children}
    </div>
  );
};