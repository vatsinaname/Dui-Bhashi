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
    <div className="mx-auto flex w-full max-w-[988px] flex-1 flex-col items-center justify-center gap-8 p-6 lg:flex-row lg:gap-12">
      <div className="relative mb-8 h-[240px] w-[240px] lg:mb-0 lg:h-[424px] lg:w-[424px] rounded-2xl overflow-hidden shadow-lg border-4 border-[#e8e4d9] dark:border-slate-800 dark:hidden lg:dark:block transform transition-transform hover:scale-[1.02] duration-300">
        <Image src="/kol.webp" alt="Hero" fill loading="eager" className="object-cover" />
      </div>
      <div className="flex flex-col items-center gap-y-8 max-w-[480px] animate-fade-in">
        <div className="text-center relative">
          <div className="absolute -left-3 -top-3 md:-left-6 md:-top-4 text-2xl md:text-4xl text-blue-600/20 dark:text-blue-500/20 font-serif">"</div>
          <h1 className="text-center font-bold text-[#3a3630] dark:text-neutral-200 lg:leading-tight">
            <span className="text-xl lg:text-2xl block mb-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>Embark on an</span>
            <span className="text-2xl lg:text-4xl text-blue-800 dark:text-blue-400 block mb-1 animate-fade-in" style={{ animationDelay: '0.4s' }}>exquisite expedition</span>
            <span className="text-xl lg:text-2xl block mb-1 animate-fade-in" style={{ animationDelay: '0.6s' }}>of expression with</span>
            <span className="text-2xl lg:text-4xl text-blue-800 dark:text-blue-400 block animate-fade-in" style={{ animationDelay: '0.8s' }}>BhashaBird</span>
          </h1>
          <div className="absolute -right-3 -bottom-4 md:-right-6 md:-bottom-6 text-2xl md:text-4xl text-blue-600/20 dark:text-blue-500/20 font-serif">"</div>
        </div>
        <div className="flex w-full max-w-[330px] flex-col items-center gap-y-3 mt-2">
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
                <Button size="lg" variant="primaryOutline" className="w-full border-[#3a3630] text-[#3a3630] hover:bg-[#e8e4d9] dark:border-neutral-200 dark:text-neutral-200 dark:hover:bg-slate-800">
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
