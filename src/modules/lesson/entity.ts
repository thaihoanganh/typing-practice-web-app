export interface ILessonEntity {
  isLessonGuide: boolean;
  lessonGuideMessage: null | string;
  minimumAccuracy: null | number;
  minimumWordsPerMinute: null | number;
  results: {
    accuracy: null | number;
    wordsPerMinute: null | number;
    totalTime: null | number;
  };
}
