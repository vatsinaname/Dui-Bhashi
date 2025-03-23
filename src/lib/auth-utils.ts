'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

/**
 * Helper hook that ensures hydration is complete before checking auth state
 * to prevent UI flickering and hydration mismatches.
 */
export function useAuthStatus() {
  const { isSignedIn, isLoaded } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    isSignedIn,
    isLoaded,
    isMounted: mounted,
    isReady: isLoaded && mounted
  };
} 