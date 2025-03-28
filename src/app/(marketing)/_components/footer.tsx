import React from "react";
import { Button } from "../../../components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden h-20 w-full border-t border-[#e1dbd0] dark:border-slate-800 p-2 lg:block bg-[#ede9df] dark:bg-slate-900 shadow-inner">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        <Button size="lg" variant="ghost" className="w-full text-[#3a3630] hover:bg-[#e8e4d9] dark:text-white dark:hover:bg-slate-800">
          <Image
            src="/dzanutenugu.svg"
            alt="Dzanu Tenugu"
            height={32}
            width={40}
            className="mr-4 rounded-md"
            style={{ width: "auto" }}
          />
          Telugu/తెలుగు
        </Button>
        <Button size="lg" variant="ghost" className="w-full text-[#3a3630] hover:bg-[#e8e4d9] dark:text-white dark:hover:bg-slate-800">
          <Image
            src="/kan.svg"
            alt="Jai Basavanna"
            height={32}
            width={40}
            className="mr-4 rounded-md"
            style={{ width: "auto" }}
          />
          Kannada/ಕನ್ನಡ
        </Button>
        </div>
    </footer>
  );
};
