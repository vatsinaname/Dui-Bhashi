import { type } from "os";
import { courses } from "./db/schema";

type Course = typeof courses.$inferSelect;

export type CourseWithHearts = {
  course: Course;
  hearts: number;
  points: number;
};

export type CourseWithHeartsList = CourseWithHearts[]; 