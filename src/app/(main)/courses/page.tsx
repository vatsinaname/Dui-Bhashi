import React from "react";
import { getCourses, getUserProgress } from "../../../db/queries";
import { List } from "./_components/list";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Dui-Bhashi | Courses",
  description:
    "Learn a new language with Dui-Bhashi. Choose from a variety of Indian languages and start learning today.",
};

const CoursesPage = async () => {
  const coursesData = await getCourses();
  const userProgressData = await getUserProgress();

  return (
    <div className="mx-auto h-full max-w-[912px] px-3">
      <h1 className="text-2xl font-bold text-neutral-700 dark:text-neutral-200">Language Courses</h1>
      <List courses={coursesData} activeCourseId={userProgressData?.activeCourseId} />
    </div>
  );
};

export default CoursesPage;
