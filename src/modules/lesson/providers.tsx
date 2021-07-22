import React, { createContext, useState, useEffect, useMemo } from "react";
import { LESSON_CONFIG } from "@/constants/lessons";
import { useUser } from "@/modules/user";
import { useSetting } from "@/modules/setting";
import { usePractice } from "@/modules/practice/hooks";
import { createLesson } from ".";

export interface ILessonState {
  passScoreAccuracy: number;
  passScoreWpm: number;
  results: {
    accuracy: null | number;
    wpm: null | number;
    totalTime: null | number;
  };
}

export interface ILessonContext {
  lessonState: ILessonState;
  setLessonState: React.Dispatch<React.SetStateAction<ILessonState>>;
}

export const LessonContext = createContext({} as ILessonContext);

export const LessonProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<ILessonState>({
    passScoreAccuracy: 1,
    passScoreWpm: 40,
    results: {
      accuracy: null,
      wpm: null,
      totalTime: null,
    },
  });

  const { userState, onHandleUpdateUser } = useUser();
  const { settingState } = useSetting();
  const { practiceState, practiceSetState } = usePractice();
  const { currentLesson } = userState;

  useEffect(() => {
    if (settingState.lesson) {
      setPracticeLesson();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingState.lesson, userState.currentLesson]);

  useEffect(() => {
    const { accuracy, wpm, totalTime } = practiceState.statistical;
    if (accuracy !== null && wpm !== null) {
      setState((prevState) => ({
        ...prevState,
        results: {
          accuracy,
          wpm,
          totalTime,
        },
      }));

      if (settingState && state.passScoreAccuracy <= accuracy && state.passScoreWpm <= wpm) {
        if (userState.currentLesson < settingState.lesson.options[settingState.lesson.selected].data.length - 2) {
          onHandleUpdateUser({
            ...userState,
            currentLesson: userState.currentLesson + 1,
          });
        }
      } else {
        setPracticeLesson();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [practiceState]);

  const setPracticeLesson = () => {
    const totalCharacters = 100;
    const newLesson = createLesson(
      settingState.lesson.options,
      settingState.lesson.selected,
      LESSON_CONFIG,
      currentLesson,
      settingState.level.options,
      settingState.level.selected,
      totalCharacters
    );
    practiceSetState((prevState) => ({
      ...prevState,
      cursonCharacter: 0,
      cursonWord: 0,
      isCompleted: false,
      practiceData: newLesson.lessonData,
      isCheckAfterWord: false,
      statistical: {
        ...prevState.statistical,
        accuracy: null,
        wpm: null,
        totalCharacters,
        totalWords: newLesson.lessonData.length,
        totalWordsIncorrect: null,
        totalTime: null,
      },
    }));
    setState((prevState) => ({
      ...prevState,
      passScoreAccuracy: newLesson.passScoreAccuracy,
      passScoreWpm: newLesson.passScoreWpm,
    }));
  };

  const exportValue = useMemo<ILessonContext>(() => {
    return {
      lessonState: state,
      setLessonState: setState,
    };
  }, [state]);

  return <LessonContext.Provider value={exportValue}>{children}</LessonContext.Provider>;
};
