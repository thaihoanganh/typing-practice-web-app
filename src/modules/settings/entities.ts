type ISettingEntityWrapper<T> = {
	primaryDefault: string;
	selected: string;
	options: {
		[prop: string]: {
			name: string;
			isDefault: boolean;
			value: T;
		};
	};
};

export type ISoundEntity = ISettingEntityWrapper<boolean>;

export type IThemeEntity = ISettingEntityWrapper<{
	primary: string;
	secondary: string;
}>;

export type ILessonLevelEntity = ISettingEntityWrapper<{
	wordsPerMinuteMin: number;
	wordsPerMinuteMax: number;
}>;

export type ILessonLanguageEntity = ISettingEntityWrapper<string>;

export type ITypingTestTextEntity = ISettingEntityWrapper<{
	words: string;
	isShuffle: boolean;
	hasUppercase: boolean;
}>;

export type ITypingTestLimitEntity = ISettingEntityWrapper<{
	amount: number;
	type: string;
}>;

export type ISettingsEntity = {
	sound: ISoundEntity;
	theme: IThemeEntity;
	lessonLevel: ILessonLevelEntity;
	lessonLanguage: ILessonLanguageEntity;
	typingTestText: ITypingTestTextEntity;
	typingTestLimit: ITypingTestLimitEntity;
};
