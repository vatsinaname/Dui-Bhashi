"use client";

import { courses, userProgress } from "@/db/schema";
import { Card } from "./card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) {
      return router.push("/learn");
    }

    startTransition(() => {
      upsertUserProgress(Number(id))
        .then((response) => {
          if (response?.success) {
            router.push("/learn");
            router.refresh();
          }
        })
        .catch(() => toast.error("Something went wrong."));
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          imageSrc={course.imageSrc}
          onClick={() => onClick(Number(course.id))}
          title={course.title}
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
