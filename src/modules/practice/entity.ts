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
    wordsPerMinute: null | number;
    totalCharacters: null | number;
    totalWords: null | number;
    totalWordsIncorrect: null | number;
    totalTime: null | number;
  };
}
