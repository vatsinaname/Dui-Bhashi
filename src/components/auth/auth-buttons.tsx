'use client';

import { SignInButton as ClerkSignInButton, SignUpButton as ClerkSignUpButton, useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

interface AuthButtonProps {
  mode?: "modal" | "redirect";
  children: React.ReactNode;
}

export const SignInButton = ({ mode = "modal", children }: AuthButtonProps) => {
  const { isSignedIn, isLoaded } = useAuth();
  const [mounted, setMounted] = useState(false);
  
  // Only render on client-side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render the sign-in button if already signed in or not yet mounted
  if (!mounted || !isLoaded || isSignedIn) {
    return null;
  }

  // Only render when we're sure the user is not signed in
  return (
    <ClerkSignInButton mode={mode}>
      {children}
    </ClerkSignInButton>
  );
};

export const SignUpButton = ({ mode = "modal", children }: AuthButtonProps) => {
  const { isSignedIn, isLoaded } = useAuth();
  const [mounted, setMounted] = useState(false);
  
  // Only render on client-side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render the sign-up button if already signed in or not yet mounted
  if (!mounted || !isLoaded || isSignedIn) {
    return null;
  }

  // Only render when we're sure the user is not signed in
  return (
    <ClerkSignUpButton mode={mode}>
      {children}
    </ClerkSignUpButton>
  );
};