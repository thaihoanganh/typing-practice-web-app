type ILessons = {
  name: string;
  data: number[];
  wordLength: {
    length: number;
    density: number;
  }[];
};

type ILessonLevel = {
  name: string;
  accuracy: {
    min: number;
    max: number;
  };
  wpm: {
    min: number;
    max: number;
  };
};

type ILessonConfig = {
  hightPracticeRate: number;
  normalPracticeRate: number;
  lowPracticeRate: number;
  emergencyPracticeRate: number;
};
