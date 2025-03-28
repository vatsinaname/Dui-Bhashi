import React from "react";
import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { Flow_Rounded } from "next/font/google";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="h-20 w-full border-b border-[#e1dbd0] px-4 bg-[#f9f7f1] dark:bg-slate-900 dark:border-slate-800 shadow-sm">
      <div
        className="lg:max-w-screen-lg mx-auto flex items-center
       justify-between h-full "
      >
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/favicon.ico" alt="Logo" height={40} width={40} className="mr-4 rounded-md" />
          <h1 className="text-2xl text-blue-900 dark:text-blue-500 tracking-wide font-extrabold">
            BhashaBird
          </h1>
        </div>
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="lg" variant="ghost" className="text-blue-900 hover:text-blue-700 hover:bg-[#e8e4d9] dark:text-blue-400 dark:hover:bg-slate-800">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};
