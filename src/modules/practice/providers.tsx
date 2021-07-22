import React, { createContext, useState, useEffect, useMemo } from "react";

export interface IPracticeState {
  cursonCharacter: number;
  cursonWord: number;
  isCheckAfterWord: boolean;
  isCompleted: boolean;
  isReady: boolean;
  isTyping: boolean;
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
    isTyping: false,
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

  useEffect(() => {
    if (state.isCompleted) {
      let totalCharactersIncorrect = 0;
      let totalWordsIncorrect = 0;
      state.practiceData.map((word) => {
        let isIncorrect = false;
        word.map((character) => {
          if (character.isIncorrect) {
            totalCharactersIncorrect += 1;
            isIncorrect = true;
          }
        });
        totalWordsIncorrect += Number(isIncorrect);
      });

      const totalCharacters: any = state.statistical.totalCharacters;
      const totalWords: any = state.statistical.totalWords;
      const timeStart: any = state.practiceData[0][0].typedAt;
      const timeEnd: any = state.practiceData[state.cursonWord][state.cursonCharacter].typedAt;
      const totalTime = (timeEnd - timeStart) / 1000;
      const accuracy = 1 - totalCharactersIncorrect / totalCharacters;
      const wpm = totalWords / (totalTime / 60);

      setState((prevSatte) => ({
        ...prevSatte,
        statistical: {
          ...prevSatte.statistical,
          accuracy,
          wpm,
          totalWordsIncorrect,
          totalTime,
        },
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isCompleted]);

  const exportValue: IPracticeContext = useMemo(() => {
    return {
      practiceState: state,
      practiceSetState: setState,
    };
  }, [state]);

  return <PracticeContext.Provider value={exportValue}>{children}</PracticeContext.Provider>;
};
