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
    icon: "/dui.ico",
  },
};

// This function generates a script to prevent theme flash
function ThemeScript() {
  // Using template literals to create the script content
  const codeToRunOnClient = `
    (function() {
      try {
        const storageKey = "dui-bhashi-theme";
        const theme = localStorage.getItem(storageKey) || "light";
        const root = document.documentElement;
        
        root.classList.remove('light', 'dark');
        
        if (theme === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
          root.classList.add(systemTheme);
        } else {
          root.classList.add(theme);
        }
      } catch (e) {
        console.error("Theme initialization failed:", e);
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: codeToRunOnClient }}
      suppressHydrationWarning
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <ThemeScript />
        </head>
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
