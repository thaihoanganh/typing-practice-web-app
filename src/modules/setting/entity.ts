export interface ISettingEntity {
  theme: {
    options: {
      brand: string;
    }[];
    selected: number;
  };
  sound: {
    options: string[];
    selected: number;
  };
  lesson: {
    options: ILessons[];
    selected: number;
  };
  level: {
    options: ILessonLevel[];
    selected: number;
  };
}
