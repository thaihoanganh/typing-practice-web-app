export type ISpeedTestEntity = {
  charactersCursor: number;
  wordCursor: number;
  isCheckAfterWord: boolean;
  isCompleted: boolean;
  isReady: boolean;
  isTyping: boolean;
  data: {
    characters: string;
    isIncorrect: boolean;
    typedAt: null | number;
  }[][];
  statistical: {
    accuracy: null | number;
    wordsPerMinute: null | number;
    totalCharacters: null | number;
    totalWords: null | number;
    totalWordsIncorrect: null | number;
    totalTime: null | number;
  };
};
