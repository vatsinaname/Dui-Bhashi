"use client";

import { useHeartsModal } from "@/store/use-hearts-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";

export const HeartsModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useHeartsModal();

  useEffect(() => setIsClient(true), []);

  const onClick = () => {
    close();
    router.push("/store");
  };

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-5">
            <Image src="/mascot_bad.svg" alt="Mascot" height={80} width={80} />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            You ran out of hearts!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Get Pro for unlimited hearts, or purchase them in the store
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full flex-col gap-y-4">
            <Button
              variant="primary"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
              size="lg"
              onClick={onClick}
            >
              Get unlimited hearts
            </Button>
            <Button
              onClick={close}
              size="lg"
              variant="outline"
              className="w-full border-2 font-bold border-blue-500 text-blue-700 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950/50"
            >
              Maybe later
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
