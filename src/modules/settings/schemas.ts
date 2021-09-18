import { string, number, boolean, enumType, mixed, record, ValueType } from 'vcc-schema';

export const soundSchema = mixed({
	name: string().nonempty(),
	value: boolean(),
});

export const themeSchema = mixed({
	name: string().nonempty(),
	value: mixed({
		primary: string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i),
		secondary: string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i),
	}),
});

export const lessonLevelSchema = mixed({
	name: string().nonempty(),
	value: mixed({
		wordsPerMinuteMin: number().min(0),
		wordsPerMinuteMax: number(),
		accuracyMin: number().min(0),
		accuracyMax: number(),
	}).lazy({
		wordsPerMinuteMax: {
			checker: (wordsPerMinuteMax, { wordsPerMinuteMin }) => wordsPerMinuteMax > wordsPerMinuteMin,
			message: 'Tốc độ gõ tối đa phải lớn hơn tốc độ gõ tối thiểu',
		},
		accuracyMax: {
			checker: (accuracyMax, { accuracyMin }) => accuracyMax > accuracyMin,
			message: 'Độ chính xác tối đa phải lớn hơn độ chính xác tối thiểu',
		},
	}),
});

export const lessonLanguageSchema = mixed({
	name: string().nonempty(),
	value: string(),
});

export const typingTestTextSchema = mixed({
	name: string().nonempty(),
	value: mixed({
		words: string(),
		isShuffle: boolean(),
		hasUppercase: boolean(),
	}),
});

export const typingTestLimitSchema = mixed({
	name: string().nonempty(),
	value: mixed({
		amount: number().min(0),
		type: enumType(['time', 'word']),
	}),
});

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

export type ISoundSchema = ValueType<typeof soundSchema>;
export type IThemeSchema = ValueType<typeof themeSchema>;
export type ILessonLevelSchema = ValueType<typeof lessonLevelSchema>;
export type ILessonLanguageSchema = ValueType<typeof lessonLanguageSchema>;
export type ITypingTestTextSchema = ValueType<typeof typingTestTextSchema>;
export type ITypingTestLimitSchema = ValueType<typeof typingTestLimitSchema>;
