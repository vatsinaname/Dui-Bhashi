"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { purchaseHearts } from "../../../../actions/user-progress";
import { Items } from "./items";
import { courses } from "../../../../db/schema";
import { POINTS_TO_REFILL } from "../../../../constants";
import { useRouter } from "next/navigation";
import { useMounted } from "@/hooks/use-mounted";
import { useGetPoints } from "@/hooks/use-get-points";
import { CourseWithHeartsList } from "@/types";
import Image from "next/image";

type Course = typeof courses.$inferSelect;

interface ShopClientProps {
  activeCoursesWithHearts: CourseWithHeartsList;
}

export const ShopClient = ({
  activeCoursesWithHearts,
}: ShopClientProps) => {
  const router = useRouter();
  const mounted = useMounted();
  const { hearts, points, activeCourse } = useGetPoints(activeCoursesWithHearts);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const isTelugu = activeCourse?.title?.toLowerCase().includes("telugu");
  const isKannada = activeCourse?.title?.toLowerCase().includes("kannada");

  const handlePurchase = async () => {
    try {
      setIsPurchasing(true);
      
      toast.info(
        "Items can only be purchased with points you earn from completing lessons!",
        {
          description: isTelugu
            ? "పాఠాలు పూర్తి చేయడం ద్వారా మీరు సంపాదించిన పాయింట్లతో మాత్రమే వస్తువులను కొనుగోలు చేయవచ్చు!"
            : isKannada
            ? "ಪಾಠಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸುವ ಮೂಲಕ ನೀವು ಗಳಿಸಿದ ಅಂಕಗಳೊಂದಿಗೆ ಮಾತ್ರ ವಸ್ತುಗಳನ್ನು ಖರೀದಿಸಬಹುದು!"
            : undefined,
        }
      );
    } catch (error) {
      console.error("Error purchasing item:", error);
      toast.error("Failed to purchase item. Please try again.", {
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  if (!mounted) {
    return null;
  }

  // Check if we have a valid active course before rendering
  if (!activeCourse) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full max-w-[968px] mx-auto flex flex-col">
      <div className="p-6 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/shop.svg" alt="shop" height={32} width={32} className="mr-3" />
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-amber-600">Shop</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Image src="/heart.svg" alt="Hearts" height={24} width={24} className="mr-1" />
            <span className="font-bold text-rose-500">{hearts}</span>
          </div>
          <div className="flex items-center">
            <Image src="/points.svg" alt="Points" height={24} width={24} className="mr-1" />
            <span className="font-bold text-amber-500">{points}</span>
          </div>
        </div>
      </div>
      <div className="flex-1 p-6">
        <Items
          hearts={hearts}
          points={points}
          activeCourse={activeCourse}
          onClick={handlePurchase}
        />
      </div>
    </div>
  );
}; 