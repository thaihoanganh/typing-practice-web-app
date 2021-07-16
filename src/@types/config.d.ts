interface ILessons {
  [language: string]: {
    data: number[];
    wordLength: {
      length: number;
      density: number;
    }[];
  };
}

interface ILessonConfig {
  hightPracticeRate: number;
  normalPracticeRate: number;
  lowPracticeRate: number;
  emergencyPracticeRate: number;
}

interface ILessonLevel {
  [level: string]: {
    accuracy: {
      min: number;
      max: number;
    };
    wpm: {
      min: number;
      max: number;
    };
  };
}
