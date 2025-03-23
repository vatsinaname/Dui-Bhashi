import React from "react";
import { getLesson, getUserProgress, getCourseProgress } from "../../db/queries";
import { redirect } from "next/navigation";
import { QuizWrapper } from "./_components/quiz-wrapper";

const LessonPage = async () => {
  const [userProgress, courseProgress] = await Promise.all([
    getUserProgress(),
    getCourseProgress(),
  ]);

  if (!userProgress || !courseProgress?.activeLessonId || !userProgress.activeCourse) {
    redirect("/learn");
  }

  const lesson = await getLesson(courseProgress.activeLessonId);

  if (!lesson) {
    redirect("/learn");
  }

  // Find the first uncompleted challenge or use the first one
  const nextChallenge = lesson.challenges.find(challenge => !challenge.completed);
  const challenge = nextChallenge || lesson.challenges[0];

  if (!challenge) {
    redirect("/learn");
  }

  // Check if this is the last challenge in the lesson
  const isLastChallenge = challenge.order === lesson.challenges.length;
  const isLessonComplete = lesson.challenges.every(c => c.completed);

  console.log("Lesson state:", {
    lessonId: lesson.id,
    totalChallenges: lesson.challenges.length,
    currentChallengeOrder: challenge.order,
    isLastChallenge,
    isLessonComplete
  });

  return (
    <QuizWrapper
      challenge={challenge}
      activeCourse={userProgress.activeCourse}
      userProgress={userProgress}
      isLastChallenge={isLastChallenge}
      isLessonComplete={isLessonComplete}
    />
  );
};

export default LessonPage;
