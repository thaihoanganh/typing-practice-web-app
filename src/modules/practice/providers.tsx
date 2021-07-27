import React, { useState, useEffect, useMemo } from "react";
import { createAppContext } from "@/utils/context";
import { IPracticeEntity, actionPracticeStatistics } from ".";

export interface IPracticeState {
  status: "READY" | "LOADING" | "ERROR";
  errorMessage: null | string;
  entity: IPracticeEntity;
}

export const PracticeContext = createAppContext<IPracticeState>();

export const PracticeProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<IPracticeState>({
    status: "LOADING",
    errorMessage: null,
    entity: {
      cursonCharacter: 0,
      cursonWord: 0,
      isCheckAfterWord: false,
      isCompleted: false,
      isReady: false,
      isTyping: false,
      data: [],
      statistical: {
        accuracy: null,
        wpm: null,
        totalCharacters: null,
        totalWords: null,
        totalWordsIncorrect: null,
        totalTime: null,
      },
    },
  });

  useEffect(() => {
    if (state.entity.isCompleted) {
      actionPracticeStatistics();
    }
  }, [state.entity.isCompleted]);

  const exportValue = useMemo(() => ({ state, setState }), [state]);

  return <PracticeContext.Provider value={exportValue}>{children}</PracticeContext.Provider>;
};
