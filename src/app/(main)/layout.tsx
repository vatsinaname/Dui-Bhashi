import React from "react";
import { Sidebar } from "../../components/sidebar";
import { MobileHeader } from "../../components/mobile-header";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className={cn(
        "h-full pt-[50px] lg:pl-[256px] lg:pt-0",
        "bg-[#f5f2e8] dark:bg-slate-950"
      )}>
        <div className="mx-auto h-full max-w-[1065px] pt-6">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
