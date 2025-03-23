"use client";

import { useState, useEffect } from "react";
import { CourseWithHeartsList } from "@/types";
import { courses } from "@/db/schema";

type Course = typeof courses.$inferSelect;

export const useGetPoints = (activeCoursesWithHearts: CourseWithHeartsList) => {
  const [data, setData] = useState<{
    hearts: number;
    points: number;
    activeCourse: Course | null;
  }>({
    hearts: 0,
    points: 0,
    activeCourse: null,
  });

  useEffect(() => {
    if (activeCoursesWithHearts && activeCoursesWithHearts.length > 0) {
      const firstCourse = activeCoursesWithHearts[0];
      
      setData({
        hearts: firstCourse.hearts,
        points: firstCourse.points,
        activeCourse: firstCourse.course,
      });
    }
  }, [activeCoursesWithHearts]);

  return data;
}; 