import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { QuizWrapper } from "../_components/quiz-wrapper";
import { getLesson, getUserProgress, getCourseProgress, getUnits } from "../../../db/queries";
import { ChallengeType, UserProgressType } from "../../../types";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    lessonId: string;
  }>;
}

// Create a safe version of the challenge type that allows setting challengeOptions
interface SafeChallengeType {
  id: number;
  lessonId: number;
  type: "SELECT" | "ASSIST" | "FILL_IN";
  order: number;
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
  challengeProgress: any[];
}

// Add a component to show errors
const LessonError = ({ message, debugInfo }: { message: string, debugInfo?: any }) => {
  // Log debug info to console but don't show to user
  if (debugInfo) {
    console.error("Lesson error debug info:", debugInfo);
  }
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-950 p-6">
      <div className="max-w-md text-center">
        <h1 className="mb-6 text-2xl font-bold text-rose-600 dark:text-rose-500">
          Oops! We couldn't load this lesson
        </h1>
        <p className="mb-8 text-lg text-neutral-700 dark:text-neutral-300">
          {message}
        </p>
        <Link 
          href="/learn" 
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3 font-bold text-white transition hover:bg-blue-700"
        >
          Return to lessons
        </Link>
      </div>
    </div>
  );
};

const LessonIdPage = async ({ params }: PageProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const [userProgress, courseProgress, resolvedParams, units] = await Promise.all([
    getUserProgress(),
    getCourseProgress(),
    params,
    getUnits()
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    console.error("User progress or active course not found");
    redirect("/learn");
  }

  try {
    const lessonId = parseInt(resolvedParams.lessonId, 10);

    if (isNaN(lessonId)) {
      console.error("Invalid lesson ID format");
      redirect("/learn");
    }

    console.log(`Attempting to load lesson ID: ${lessonId}`);
    
    // Check if this lesson exists in the units/lessons structure
    const allLessons = units.flatMap(unit => unit.lessons);
    const lessonExists = allLessons.some(lesson => lesson.id === lessonId);
    
    if (!lessonExists) {
      console.error(`Lesson with ID ${lessonId} not found in available lessons`);
      
      // Debug: List all available lesson IDs
      const availableLessonIds = allLessons.map(lesson => lesson.id);
      console.log("Available lesson IDs:", availableLessonIds);
      
      return <LessonError 
        message="This lesson doesn't exist in your current course. Please try another lesson."
        debugInfo={{ lessonId, availableLessons: availableLessonIds }}
      />;
    }
    
    // Find the specific lesson from the units data to check lock status
    const lessonFromUnits = allLessons.find(lesson => lesson.id === lessonId);
    
    // Debug: Log lesson lock status 
    console.log(`Lesson ${lessonId} status:`, {
      exists: !!lessonFromUnits,
      locked: lessonFromUnits?.locked,
      completed: lessonFromUnits?.completed
    });
    
    // If lesson is locked, redirect to learn page
    if (lessonFromUnits?.locked) {
      console.log(`Lesson ${lessonId} is locked. Complete previous lesson first.`);
      return <LessonError 
        message="You need to complete the previous lesson before you can access this one."
        debugInfo={{ lessonId, lessonStatus: lessonFromUnits }}
      />;
    }

    let lesson;
    try {
      lesson = await getLesson(lessonId);
      
      if (!lesson) {
        console.error(`Lesson ${lessonId} data could not be retrieved from database`);
        return <LessonError 
          message="We couldn't load this lesson's data. Please try again later."
          debugInfo={{ lessonId }}
        />;
      }
    } catch (error) {
      console.error(`Error fetching lesson ${lessonId}:`, error);
      return <LessonError 
        message="There was an error loading this lesson. Please try again later."
        debugInfo={{ lessonId, error: error instanceof Error ? error.message : String(error) }}
      />;
    }

    // Verify the lesson belongs to the user's active course
    if (lesson.unit.course.id !== userProgress.activeCourse.id) {
      console.error(`Lesson ${lessonId} belongs to course ${lesson.unit.course.id}, not active course ${userProgress.activeCourse.id}`);
      return <LessonError 
        message="This lesson belongs to a different course than the one you're currently taking."
        debugInfo={{ 
          lessonId, 
          lessonCourseId: lesson.unit.course.id, 
          activeCourseId: userProgress.activeCourse.id 
        }}
      />;
    }

    // Set a fixed number of challenges per lesson
    const fixedChallengesPerLesson = 10;

    // Find the first uncompleted challenge or use the first one
    const nextChallenge = lesson.challenges.find((challenge) => !challenge.completed);
    const challengeData = nextChallenge || lesson.challenges[0];

    if (!challengeData) {
      console.error(`No challenges found for lesson ${lessonId}`);
      return <LessonError 
        message="This lesson doesn't have any challenges yet. Please try another lesson."
        debugInfo={{ lessonId }}
      />;
    }
    
    // Safely cast to our internal challenge type
    const challenge = challengeData as unknown as SafeChallengeType;
    
    // Check if the challenge has options
    if (!challenge.challengeOptions || challenge.challengeOptions.length === 0) {
      console.error(`Challenge ${challenge.id} has no options available`);
      
      // Add more descriptive options based on challenge ID
      let optionText = "Select this option";
      let explanationText = "";
      
      if (challenge.id === 221) {
        optionText = "This challenge is missing options in the database";
        explanationText = "Challenge 221 is known to have missing options";
        console.error("Known issue: Challenge 221 has no options in the database");
      }
      
      // Create dummy options if needed
      challenge.challengeOptions = [
        {
          id: -1,
          challengeId: challenge.id,
          text: optionText,
          correct: true,
          imageSrc: null,
          audioSrc: null
        },
        {
          id: -2,
          challengeId: challenge.id,
          text: explanationText || "Alternative option",
          correct: false,
          imageSrc: null,
          audioSrc: null
        }
      ];
      
      console.log(`Created dummy options for challenge ${challenge.id}:`, challenge.challengeOptions);
    }

    // Calculate lesson progress
    const completedChallenges = lesson.challenges.filter((c) => c.completed).length;
    
    // Determine if this is the last challenge
    // For Telugu course, lessons should be numbered simply from 1, 2, 3...
    // For Kannada course, same structure
    const isTelugu = userProgress.activeCourse.title.toLowerCase().includes("telugu");
    const isKannada = userProgress.activeCourse.title.toLowerCase().includes("kannada");
    
    const challengeId = isTelugu ? 
      (lesson.id * 100) + challenge.order : 
      isKannada ? 
        (lesson.id * 100) + challenge.order : 
        challenge.id;
        
    const progress = Math.min(
      Math.round((completedChallenges / fixedChallengesPerLesson) * 100), 
      100
    );

    const isLastChallenge = completedChallenges >= fixedChallengesPerLesson - 1;
    const isLessonComplete = progress === 100;

    console.log("Lesson state:", {
      lessonId: lesson.id,
      totalChallenges: fixedChallengesPerLesson,
      completedChallenges,
      progress,
      currentChallengeOrder: challenge.order,
      isLastChallenge,
      isLessonComplete,
      courseId: lesson.unit.course.id,
      isTelugu,
      isKannada,
      challengeId,
      challengesAvailable: lesson.challenges.length
    });

    // Cast the userProgress object to match the expected UserProgressType
    const userProgressForQuiz = {
      ...userProgress,
      courseProgresses: userProgress.courseProgresses.map((cp) => ({
        courseId: cp.courseId,
        points: cp.points,
        completed: cp.courseId === userProgress.activeCourseId && isLessonComplete
      }))
    } as UserProgressType;

    return (
      <QuizWrapper
        challenge={challenge as unknown as ChallengeType}
        activeCourse={userProgress.activeCourse}
        userProgress={userProgressForQuiz}
        isLastChallenge={isLastChallenge}
        isLessonComplete={isLessonComplete}
      />
    );
  } catch (error) {
    console.error("Error in lesson page:", error);
    console.error("Error details:", error instanceof Error ? error.message : String(error));
    return <LessonError
      message="Something went wrong while loading this lesson. Please try again later."
      debugInfo={error instanceof Error ? { message: error.message, stack: error.stack } : error}
    />;
  }
};

export default LessonIdPage;
