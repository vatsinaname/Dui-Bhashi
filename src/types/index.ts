import { challenges, courses, courseProgress } from "../db/schema";

export type ChallengeType = typeof challenges.$inferSelect & {
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

export type CourseType = typeof courses.$inferSelect;

export type CourseProgressType = typeof courseProgress.$inferSelect;

export interface UserProgressType {
  userId: string;
  userName: string;
  userImageSrc: string;
  activeCourseId: number | null;
  hearts: number;
  activeCourse: {
    id: number;
    title: string;
    imageSrc: string;
  } | null;
  courseProgresses: {
    courseId: number;
    points: number;
    completed: boolean;
  }[];
} 