'use client';

import { useAuthStatus } from '@/lib/auth-utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isSignedIn, isReady } = useAuthStatus();
  const router = useRouter();

  useEffect(() => {
    if (isReady && !isSignedIn) {
      router.push('/');
    }
  }, [isReady, isSignedIn, router]);

  if (!isReady) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isSignedIn) {
    return null; // Will redirect in the useEffect
  }

  return <>{children}</>;
} 