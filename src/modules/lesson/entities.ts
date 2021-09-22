export type ILessonEntity = {
	lessonCurrent: number;
	lessonLevelCurrent: number;
	lessonList: {
		isCompleted: boolean;
		character: string;
		levelList: {
			accuracyMin: number;
			wordsPerMinuteMin: number;
		}[];
	}[];
};
