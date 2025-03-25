import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { QuizWrapper } from "./_components/quiz-wrapper";
import { getLesson, getUserProgress } from "@/db/queries";

// Define the correct challenge type
type ChallengeType = {
  id: number;
  order: number;
  lessonId: number;
  type: "SELECT" | "ASSIST" | "FILL_IN";
  question: string;
  completed: boolean;
  challengeOptions: {
    id: number;
    imageSrc: string | null;
    challengeId: number;
    text: string;
    correct: boolean;
    audioSrc: string | null;
  }[];
};

type UserProgressType = {
  hearts: number;
  points: number;
  activeCourse: {
    id: number;
    title: string;
    imageSrc: string;
  };
  activeCourseId: number | undefined;
  courses: {
    id: number;
    title: string;
    imageSrc: string;
    completed: boolean;
  }[];
};

const LessonPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const lesson = await getLesson(userProgress.activeCourse.id);

  if (!lesson) {
    redirect("/courses");
  }

  const nextChallenge = lesson.challenges.find(challenge => 
    !challenge.completed && 
    (challenge.type === "SELECT" || challenge.type === "ASSIST" || challenge.type === "FILL_IN")
  );
  
  const challenge = (nextChallenge || lesson.challenges[0]) as ChallengeType;

  const isLastChallenge = lesson.challenges.filter(c => !c.completed).length === 1;

  const formattedUserProgress: UserProgressType = {
    hearts: userProgress.hearts ?? 5,
    points: 0,
    activeCourse: userProgress.activeCourse,
    activeCourseId: userProgress.activeCourseId ?? undefined,
    courses: [{
      id: userProgress.activeCourse.id,
      title: userProgress.activeCourse.title,
      imageSrc: userProgress.activeCourse.imageSrc,
      completed: false
    }]
  };

  return (
    <QuizWrapper
      challenge={challenge}
      activeCourse={userProgress.activeCourse}
      userProgress={formattedUserProgress}
      isLastChallenge={isLastChallenge}
      isLessonComplete={false}
    />
  );
};

export default LessonPage;
