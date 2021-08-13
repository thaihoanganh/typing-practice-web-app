import React, { useState, useMemo } from "react";
import { createAppContext } from "@/helpers/context";
import { ISpeedTestEntity } from ".";

export interface ISpeedTestState {
  status: "READY" | "LOADING" | "ERROR";
  errorMessage: null | string;
  entity: ISpeedTestEntity;
}

export const SpeedTestContext = createAppContext<ISpeedTestState>();

export const SpeedTestProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<ISpeedTestState>({
    status: "LOADING",
    errorMessage: null,
    entity: {
      characterCursor: 0,
      wordCursor: 0,
      isCheckAfterWord: false,
      isReady: false,
      isTyping: false,
      isCompleted: false,
      data: [[]],
      statistical: {
        accuracy: null,
        wordsPerMinute: null,
        totalCharacters: null,
        totalWords: null,
        totalWordsIncorrect: null,
        totalTime: null,
      },
    },
  });

  const exportValue = useMemo(() => ({ state, setState }), [state]);

  return <SpeedTestContext.Provider value={exportValue}>{children}</SpeedTestContext.Provider>;
};

export default SpeedTestProvider;
