import { number, mixed, ValueType } from 'vcc-schema';

export const lessonStorageSchema = mixed({
	lessonCurrent: number(),
	lessonLevelCurrent: number(),
});
export type ILessonStorage = ValueType<typeof lessonStorageSchema>;
