import React from "react";
import { redirect } from "next/navigation";

import { FeedWrapper } from "./_components/feed-wrapper";
import { StickyWrapper } from "../../../components/sticky-wrapper";
import { Header } from "./_components/header";
import { UserProgress } from "../../../components/user-progress";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from "../../../db/queries";
import { Unit } from "./_components/units";
import { Quests } from "../../../components/quests";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dui-Bhashi | Learn",
  description:
    "Learn a new language with Dui-Bhashi. Choose from a variety of Indian languages and start learning today.",
};

const LearnPage = async () => {
  try {
    const [userProgress, units, courseProgress, lessonPercentage] = await Promise.all([
      getUserProgress(),
      getUnits(),
      getCourseProgress(),
      getLessonPercentage(),
    ]);

    if (!userProgress || !userProgress.activeCourse || !courseProgress) {
      redirect("/courses");
    }

    const { points = 0 } = courseProgress;

    return (
      <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
          <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts ?? 0}
            points={points}
          />
          <Quests points={points} activeCourse={userProgress.activeCourse} />
        </StickyWrapper>
        <FeedWrapper>
          <Header title={userProgress.activeCourse.title} />
          {units.map((unit) => (
            <div key={unit.id} className="mb-10">
              <Unit
                id={unit.id}
                order={unit.order}
                description={unit.description}
                title={unit.title}
                lessons={unit.lessons}
                activeLesson={courseProgress?.activeLesson}
                activeLessonPercentage={lessonPercentage}
              />
            </div>
          ))}
        </FeedWrapper>
      </div>
    );
  } catch (error) {
    console.error("Error in LearnPage:", error);
    redirect("/courses");
  }
};

export default LearnPage;
