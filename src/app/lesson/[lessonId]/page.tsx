import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { QuizWrapper } from "../_components/quiz-wrapper";
import { getLesson, getUserProgress, getCourseProgress, getUnits } from "../../../db/queries";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LessonHeader } from "./header";

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

const LessonIdPage = async ({ params }: PageProps) => {
  // First await and extract params before using them
  const resolvedParams = await params;
  const lessonIdParam = resolvedParams?.lessonId;
  
  if (!lessonIdParam) {
    console.error("Missing lessonId parameter");
    return redirect("/learn");
  }
  
  const lessonId = parseInt(lessonIdParam, 10);
  
  if (isNaN(lessonId)) {
    console.error("Invalid lesson ID format");
    return redirect("/learn");
  }
  
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const [userProgress, courseProgress, units] = await Promise.all([
    getUserProgress(),
    getCourseProgress(),
    getUnits()
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    console.error("User progress or active course not found");
    return redirect("/learn");
  }

  try {
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
    
    // Verify lesson belongs to active course
    const activeUnits = units.filter(unit => unit.courseId === userProgress.activeCourseId);
    const activeLessons = activeUnits.flatMap(unit => unit.lessons);
    const isInActiveCourse = activeLessons.some(lesson => lesson.id === lessonId);
    
    if (!isInActiveCourse) {
      console.error(`Lesson ${lessonId} is not part of the active course ${userProgress.activeCourseId}`);
      return <LessonError 
        message="This lesson belongs to a different course than the one you're currently taking."
        debugInfo={{ lessonId, activeCourseId: userProgress.activeCourseId }}
      />;
    }
    
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
    
    // Determine the language of the course
    const courseName = userProgress.activeCourse.title.toLowerCase();
    const isTelugu = courseName.includes("telugu");
    const isKannada = courseName.includes("kannada");
    
    // Double-check using the unit and challenge data
    let detectedLanguage = "Unknown";
    
    // 1. Check from active course
    if (isTelugu) detectedLanguage = "Telugu";
    else if (isKannada) detectedLanguage = "Kannada";
    
    // 2. Verify from lesson unit course
    if (lesson.unit && lesson.unit.course) {
      const unitCourseName = lesson.unit.course.title.toLowerCase();
      const unitLanguage = unitCourseName.includes("telugu") ? "Telugu" : 
                            unitCourseName.includes("kannada") ? "Kannada" : 
                            "Unknown";
      
      // Log if there's a language mismatch
      if (detectedLanguage !== "Unknown" && unitLanguage !== "Unknown" && detectedLanguage !== unitLanguage) {
        console.error(`Language mismatch detected: Active course says ${detectedLanguage} but unit course says ${unitLanguage}`);
      }
    }
    
    // 3. Check challenge question text as a last resort
    const questionText = challenge.question.toLowerCase();
    if (questionText.includes("telugu") && detectedLanguage !== "Telugu") {
      console.warn(`Question mentions Telugu but detected language is ${detectedLanguage}`);
    }
    else if (questionText.includes("kannada") && detectedLanguage !== "Kannada") {
      console.warn(`Question mentions Kannada but detected language is ${detectedLanguage}`);
    }
    
    console.log(`Lesson ${lessonId} language detection: ${detectedLanguage}`);

    // Use the actual challenge ID rather than calculating it based on lesson ID
    // This prevents cross-course mapping issues
    const challengeId = challenge.id;
        
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

    // Format user progress for the quiz component
    const userProgressForQuiz = {
      hearts: userProgress.hearts ?? 5,
      points: courseProgress?.points ?? 0,
      activeCourse: userProgress.activeCourse,
      activeCourseId: userProgress.activeCourseId ?? undefined,
      courses: [{
        id: userProgress.activeCourse.id,
        title: userProgress.activeCourse.title,
        imageSrc: userProgress.activeCourse.imageSrc,
        completed: courseProgress?.activeLesson?.unit?.courseId === userProgress.activeCourseId && isLessonComplete
      }]
    };

    return (
      <QuizWrapper
        challenge={challenge as unknown as SafeChallengeType}
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
