import { string, number, boolean, enumType, mixed, record, ValueType } from 'vcc-schema';

export const soundSchema = mixed({
	name: string(),
	value: boolean(),
});
export type ISoundSchema = ValueType<typeof soundSchema>;

export const themeSchema = mixed({
	name: string(),
	value: mixed({
		primary: string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i),
		secondary: string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i),
	}),
});
export type IThemeSchema = ValueType<typeof themeSchema>;

export const lessonLevelSchema = mixed({
	name: string(),
	value: mixed({
		wordsPerMinuteMin: number().min(0),
		wordsPerMinuteMax: number(),
	}).lazy({
		wordsPerMinuteMax: {
			checker: (wordsPerMinuteMax, { wordsPerMinuteMin }) => wordsPerMinuteMax > wordsPerMinuteMin,
			message: 'Tốc độ gõ tối đa phải lớn hơn tốc độ gõ tối thiểu',
		},
	}),
});
export type ILessonLevelSchema = ValueType<typeof lessonLevelSchema>;

export const lessonLanguageSchema = mixed({
	name: string(),
	value: string(),
});
export type ILessonLanguageSchema = ValueType<typeof lessonLanguageSchema>;

export const typingTestTextSchema = mixed({
	name: string(),
	value: mixed({
		words: string(),
		isShuffle: boolean(),
		hasUppercase: boolean(),
	}),
});
export type ITypingTestTextSchema = ValueType<typeof typingTestTextSchema>;

export const typingTestLimitSchema = mixed({
	name: string(),
	value: mixed({
		amount: number().min(0),
		type: enumType(['time', 'word']),
	}),
});
export type ITypingTestLimitSchema = ValueType<typeof typingTestLimitSchema>;

export const settingsSchema = mixed({
	sound: mixed({
		selected: string(),
		options: record(soundSchema),
	}),
	theme: mixed({
		selected: string(),
		options: record(themeSchema),
	}),
	lessonLevel: mixed({
		selected: string(),
		options: record(lessonLevelSchema),
	}),
	lessonLanguage: mixed({
		selected: string(),
		options: record(lessonLanguageSchema),
	}),
	typingTestText: mixed({
		selected: string(),
		options: record(typingTestTextSchema),
	}),
	typingTestLimit: mixed({
		selected: string(),
		options: record(typingTestLimitSchema),
	}),
});
