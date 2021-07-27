export interface IPracticeEntity {
  cursonCharacter: number;
  cursonWord: number;
  isCheckAfterWord: boolean;
  isCompleted: boolean;
  isReady: boolean;
  isTyping: boolean;
  data: {
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
