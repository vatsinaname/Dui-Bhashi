'use client';

import { useUser, SignOutButton } from '@clerk/nextjs';
import { useAuthStatus } from '@/lib/auth-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

export function UserProfile() {
  const { user } = useUser();
  const { isReady } = useAuthStatus();

  if (!isReady) {
    return <Loader className="h-5 w-5 animate-spin text-muted-foreground" />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{user.fullName}</span>
        <span className="text-xs text-gray-500">{user.primaryEmailAddress?.emailAddress}</span>
      </div>
      <Avatar>
        <AvatarImage src={user.imageUrl} />
        <AvatarFallback>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</AvatarFallback>
      </Avatar>
      <SignOutButton>
        <Button variant="outline" size="sm">Sign Out</Button>
      </SignOutButton>
    </div>
  );
} 