"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";

export const UserAccountNav = () => {
  return (
    <>
      <ClerkLoading>
        <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton afterSignOutUrl="/" />
      </ClerkLoaded>
    </>
  );
}; 