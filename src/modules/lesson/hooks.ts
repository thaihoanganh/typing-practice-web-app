import { useContext } from "react";
import { LessonContext } from ".";

export const useLesson = () => {
  const { status, errorMessage, entity } = useContext(LessonContext.initial);

  return {
    lessonStatus: status,
    lessonErrorMessage: errorMessage,
    lesson: entity,
  };
};
