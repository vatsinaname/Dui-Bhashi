import React from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "../components/ui/sonner";
import { ExitModal } from "../components/modal/exit-modal";
import { HeartsModal } from "../components/modal/hearts-modal";
import { PracticeModal } from "../components/modal/practice-modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dui-Bhashi",
  description:
    "Learn any Indian Language on Dui-Bhashi. Start learning.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <Toaster />
            <ExitModal />
            <HeartsModal />
            <PracticeModal />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
