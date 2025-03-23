"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@/components/auth/auth-buttons";
import { useAuthStatus } from "@/lib/auth-utils";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { isSignedIn, isReady } = useAuthStatus();
  const router = useRouter();

  const handleContinue = () => {
    router.push('/learn');
  };

  return (
    <div className="mx-auto flex w-full max-w-[988px] flex-1 flex-col items-center justify-center gap-2 p-4 lg:flex-row">
      <div className="relative mb-8 h-[240px] w-[240px] lg:mb-0 lg:h-[424px] lg:w-[424px]">
        <Image src="/Kannada gottilla anna.png" alt="Hero" fill loading="eager" />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="max-w-[480px] text-center text-xl font-bold text-neutral-600 lg:text-3xl">
          Learn and master new Indian languages with Dui-Bhashi.
        </h1>
        <div className="flex w-full max-w-[330px] flex-col items-center gap-y-3">
          {!isReady ? (
            <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : isSignedIn ? (
            <Link href="/learn" className="w-full">
              <Button 
                size="lg" 
                className="w-full bg-[#1a365d] text-[#fbbf24] hover:bg-[#1a365d]/90 border-[#0f172a] border-b-4 active:border-b-0"
              >
                CONTINUE LEARNING
              </Button>
            </Link>
          ) : (
            <div className="flex w-full flex-col gap-y-3">
              <SignUpButton mode="modal">
                <Button 
                  size="lg" 
                  className="w-full bg-[#1a365d] text-[#fbbf24] hover:bg-[#1a365d]/90 border-[#0f172a] border-b-4 active:border-b-0"
                >
                  Start Learning
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button size="lg" variant="primaryOutline" className="w-full">
                  I already have an account
                </Button>
              </SignInButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
