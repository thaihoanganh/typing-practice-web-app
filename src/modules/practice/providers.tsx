import React, { createContext, useState, useEffect, useMemo } from "react";

export interface IPracticeState {
  cursonCharacter: number;
  cursonWord: number;
  isCheckAfterWord: boolean;
  isCompleted: boolean;
  isReady: boolean;
  practiceData: {
    characterCode: number;
    isCurson: boolean;
    isIncorrect: boolean;
    typedAt: null | number;
  }[][];
  statistical: {
    accuracy: null | number;
    wpm: null | number;
    totalCharacters: null | number;
    totalWords: null | number;
    totalWordsIncorrect: null | number;
    totalTime: null | number;
  };
}

export interface IPracticeContext {
  practiceState: IPracticeState;
  practiceSetState: React.Dispatch<React.SetStateAction<IPracticeState>>;
}

export const PracticeContext = createContext({} as IPracticeContext);

export const PracticeProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<IPracticeState>({
    cursonCharacter: 0,
    cursonWord: 0,
    isCheckAfterWord: false,
    isCompleted: false,
    isReady: false,
    practiceData: [],
    statistical: {
      accuracy: null,
      wpm: null,
      totalCharacters: null,
      totalWords: null,
      totalWordsIncorrect: null,
      totalTime: null,
    },
  });

  // TODO Thống kê sau khi hoàn thành
  useEffect(() => {}, [state.isCompleted]);

  const exportValue: IPracticeContext = useMemo(() => {
    return {
      practiceState: state,
      practiceSetState: setState,
    };
  }, [state]);

  return <PracticeContext.Provider value={exportValue}>{children}</PracticeContext.Provider>;
};
