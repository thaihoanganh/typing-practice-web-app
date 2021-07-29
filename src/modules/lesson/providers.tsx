import React, { useState, useEffect, useMemo } from "react";
import { createAppContext } from "@/utils/context";
import { useUser, actionUpdateUser } from "@/modules/user";
import { useSetting } from "@/modules/setting";
import { usePractice } from "@/modules/practice";
import { ILessonEntity, actionSetLesson } from ".";

export interface ILessonState {
  status: "READY" | "LOADING" | "ERROR";
  errorMessage: null | string;
  entity: ILessonEntity;
}

export const LessonContext = createAppContext<ILessonState>();

export const LessonProvider: React.FC = ({ children }) => {
  const { user, userStatus } = useUser();
  const { setting } = useSetting();
  const { practice } = usePractice();
  const { accuracy, wordsPerMinute, totalTime } = practice.statistical;

  const [state, setState] = useState<ILessonState>({
    status: "LOADING",
    errorMessage: null,
    entity: {
      isLessonGuide: false,
      lessonGuideMessage: null,
      minimumAccuracy: null,
      minimumWordsPerMinute: null,
      results: {
        accuracy: null,
        wordsPerMinute: null,
        totalTime: null,
      },
    },
  });

  useEffect(() => {
    if (userStatus) {
      if (state.entity.isLessonGuide) {
        actionSetLesson({
          isNextLesson: true,
        });
      } else {
        actionSetLesson({});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.currentLesson]);

  useEffect(() => {
    const { isLessonGuide, minimumAccuracy, minimumWordsPerMinute } = state.entity;
    if (accuracy !== null && wordsPerMinute !== null && minimumAccuracy !== null && minimumWordsPerMinute !== null) {
      const cloneState = { ...state };

      if (!isLessonGuide && accuracy >= minimumAccuracy && wordsPerMinute >= minimumWordsPerMinute) {
        if (user.currentLesson < setting.lesson.options[setting.lesson.selected].data.length - 1) {
          cloneState.entity.isLessonGuide = true;
          actionUpdateUser({
            currentLesson: user.currentLesson + 1,
          });
        } else {
          actionSetLesson({});
        }
      } else {
        cloneState.entity.isLessonGuide = false;
        actionSetLesson({});
      }

      cloneState.entity.results = {
        ...cloneState.entity.results,
        accuracy,
        wordsPerMinute,
        totalTime,
      };
      setState(cloneState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accuracy, wordsPerMinute, totalTime]);

  const exportValue = useMemo(() => ({ state, setState }), [state]);

  return <LessonContext.Provider value={exportValue}>{children}</LessonContext.Provider>;
};
