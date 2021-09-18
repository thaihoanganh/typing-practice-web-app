type ISettingWrapper<T> = {
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

export type ISound = ISettingWrapper<boolean>;

export type ITheme = ISettingWrapper<{
	primary: string;
	secondary: string;
}>;

export type ILessonLevel = ISettingWrapper<{
	wordsPerMinuteMin: number;
	wordsPerMinuteMax: number;
	accuracyMin: number;
	accuracyMax: number;
}>;

export type ILessonLanguage = ISettingWrapper<string>;

export type ITypingTestText = ISettingWrapper<{
	words: string;
	isShuffle: boolean;
	hasUppercase: boolean;
}>;

export type ITypingTestLimit = ISettingWrapper<{
	amount: number;
	type: string;
}>;

export type ISettingsEntity = {
	sound: ISound;
	theme: ITheme;
	lessonLevel: ILessonLevel;
	lessonLanguage: ILessonLanguage;
	typingTestText: ITypingTestText;
	typingTestLimit: ITypingTestLimit;
};
