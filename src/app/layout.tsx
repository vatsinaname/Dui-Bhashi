import React from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "../components/ui/sonner";
import { ExitModal } from "../components/modal/exit-modal";
import { HeartsModal } from "../components/modal/hearts-modal";
import { PracticeModal } from "../components/modal/practice-modal";

const outfit = Outfit({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-outfit'
});

export const metadata: Metadata = {
  title: "Bhashabird",
  description:
    "Discover Indias's linguistic diversity with BhashaBird.",
  icons: {
    icon: "/favicon.ico",
  },
};

// This function generates a script to prevent theme flash
function ThemeScript() {
  // Using template literals to create the script content
  const codeToRunOnClient = `
    (function() {
      try {
        const storageKey = "dui-bhashi-theme";
        // Default explicitly to light instead of system when no theme is saved
        const theme = localStorage.getItem(storageKey) || "light";
        const root = document.documentElement;
        
        root.classList.remove('light', 'dark');
        
        if (theme === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
          root.classList.add(systemTheme);
        } else {
          root.classList.add(theme);
          
          // Ensure the theme is saved in localStorage for consistency
          if (!localStorage.getItem(storageKey)) {
            localStorage.setItem(storageKey, "light");
          }
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
        <body className={`${outfit.className} ${outfit.variable}`}>
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
