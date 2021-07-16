export const LESSONS: ILessons = {
  en: {
    data: [
      101, 110, 105, 116, 114, 108, 115, 97, 117, 111, 100, 121, 99, 104, 103, 109, 112, 98, 107,
      118, 119, 102, 122, 120, 113, 106,
    ],
    wordLength: [
      {
        length: 2,
        density: 0.1,
      },
      {
        length: 3,
        density: 0.3,
      },
      {
        length: 4,
        density: 0.3,
      },
      {
        length: 5,
        density: 0.2,
      },
      {
        length: 6,
        density: 0.1,
      },
    ],
  },
};

export const LESSON_CONFIG: ILessonConfig = {
  hightPracticeRate: 0.15,
  normalPracticeRate: 0.1,
  lowPracticeRate: 0.05,
  emergencyPracticeRate: 0.1,
};

export const LESSON_LEVEL: ILessonLevel = {
  easy: {
    accuracy: {
      min: 0.8,
      max: 1,
    },
    wpm: {
      min: 20,
      max: 50,
    },
  },
  normal: {
    accuracy: {
      min: 0.85,
      max: 1,
    },
    wpm: {
      min: 30,
      max: 75,
    },
  },
  hard: {
    accuracy: {
      min: 0.9,
      max: 1,
    },
    wpm: {
      min: 40,
      max: 100,
    },
  },
  custom: {
    accuracy: {
      min: 0.85,
      max: 1,
    },
    wpm: {
      min: 30,
      max: 75,
    },
  },
};
