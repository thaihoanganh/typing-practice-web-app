import { useContext } from "react";

import { LessonContext } from ".";

export const useLesson = () => {
  const { lessonState } = useContext(LessonContext);

  return {
    lessonState,
  };
};
