export const SETTING_STORAGE = 'settings';

export const INITAL_SETTINGS = {
	sound: {
		primaryDefault: '188faab703f89045dc07a952ab5cf0c8',
		selected: '188faab703f89045dc07a952ab5cf0c8',
		options: {
			'188faab703f89045dc07a952ab5cf0c8': {
				name: 'Tắt',
				isDefault: true,
				value: false,
			},
			eac7b3fa272f9d398333ff0b3a15fee1: {
				name: 'Bật',
				isDefault: true,
				value: true,
			},
		},
	},
	theme: {
		primaryDefault: 'b3d6d80eca2dc66b1e38b27fae59003a',
		selected: 'b3d6d80eca2dc66b1e38b27fae59003a',
		options: {
			b3d6d80eca2dc66b1e38b27fae59003a: {
				name: 'Darkblue',
				isDefault: true,
				value: {
					primary: '#00B464',
					secondary: '#181818',
				},
			},
			'0d603da67a0e45d253678a1acad93fb0': {
				name: 'Tuỳ chỉnh',
				isDefault: false,
				value: {
					primary: '#00B464',
					secondary: '#181818',
				},
			},
		},
	},
	lessonLevel: {
		primaryDefault: '8458d458ac176e75aa7f8fd23bb2f35e',
		selected: '8458d458ac176e75aa7f8fd23bb2f35e',
		options: {
			'8458d458ac176e75aa7f8fd23bb2f35e': {
				name: 'Dễ',
				isDefault: true,
				value: {
					wordsPerMinuteMin: 25,
					wordsPerMinuteMax: 50,
					accuracyMin: 0.85,
					accuracyMax: 1,
				},
			},
			'4c46bcccca08a3d5ea0e50358abf2210': {
				name: 'Trung bình',
				isDefault: true,
				value: {
					wordsPerMinuteMin: 35,
					wordsPerMinuteMax: 70,
					accuracyMin: 0.9,
					accuracyMax: 1,
				},
			},
			'90952876983dfa547b68e0d08fc4650e': {
				name: 'Khó',
				isDefault: true,
				value: {
					wordsPerMinuteMin: 45,
					wordsPerMinuteMax: 90,
					accuracyMin: 0.95,
					accuracyMax: 1,
				},
			},
			d967fca0469829ab077c29a6bea2a2c2: {
				name: 'Tuỳ chỉnh',
				isDefault: false,
				value: {
					wordsPerMinuteMin: 35,
					wordsPerMinuteMax: 70,
					accuracyMin: 0.9,
					accuracyMax: 1,
				},
			},
		},
	},
	lessonLanguage: {
		primaryDefault: '6ce1dcfd035ca15ff545832b6f4ad140',
		selected: '6ce1dcfd035ca15ff545832b6f4ad140',
		options: {
			'6ce1dcfd035ca15ff545832b6f4ad140': {
				name: 'Tiếng việt',
				isDefault: true,
				value: 'abcdef',
			},
			'2e7ee968210f40e464aab5420274ad53': {
				name: 'Tuỳ chỉnh',
				isDefault: false,
				value: 'abcdef',
			},
		},
	},
	typingTestText: {
		primaryDefault: '1da4b7e1a5a3fb394cfbbca37ac0530d',
		selected: '1da4b7e1a5a3fb394cfbbca37ac0530d',
		options: {
			'1da4b7e1a5a3fb394cfbbca37ac0530d': {
				name: '1000 từ tiếng việt phổ biến',
				isDefault: true,
				value: {
					words: 'một hai ba bốn năm',
					isShuffle: true,
					hasUppercase: false,
				},
			},
			a11954db05e3d9d0e071bf508762ccbe: {
				name: 'Tuỳ chỉnh',
				isDefault: false,
				value: {
					words: 'một hai ba bốn năm',
					isShuffle: true,
					hasUppercase: false,
				},
			},
		},
	},
	typingTestLimit: {
		primaryDefault: '9a4565293f609307c8fa9710669e2111',
		selected: '9a4565293f609307c8fa9710669e2111',
		options: {
			'9a4565293f609307c8fa9710669e2111': {
				name: '30 giây',
				isDefault: true,
				value: {
					amount: 30,
					type: 'time',
				},
			},
			'2a4b8e59436c451a0bfba0ed576152f4': {
				name: '60 giây',
				isDefault: true,
				value: {
					amount: 60,
					type: 'time',
				},
			},
			'1a485bff414a002094878f9303c6b611': {
				name: '120 giây',
				isDefault: true,
				value: {
					amount: 120,
					type: 'time',
				},
			},
			f50e7dced8b239b1539a46efb301f030: {
				name: 'Tuỳ chỉnh',
				isDefault: false,
				value: {
					amount: 60,
					type: 'time',
				},
			},
		},
	},
};

/*

{
	sound: {
		"1": md5('SOUND_1"),
		"2": md5("SOUND_2"),
	},
	theme: {
		"1": md5("THEME_1"),
		"2": md5("THEME_2"),
		"custom": md5("THEME_CUSTOM"),
	},
	lessonLevel: {
		"1": md5("LESSON_LEVEL_1"),
		"2": md5("LESSON_LEVEL_2"),
		"3": md5("LESSON_LEVEL_3"),
		"custom": md5("LESSON_LEVEL_CUSTOM"),
	},
	lessonLanguage: {
		"1": md5("LESSON_LANGUAGE_1"),
		"custom": md5("LESSON_LANGUAGE_CUSTOM"),
	},
	typingTestText: {
		"1": md5("TYPING_TEST_TEXT_1"),
		"2": md5("TYPING_TEST_TEXT_2"),
		"custom": md5("TYPING_TEST_TEXT_CUSTOM"),
	},
	typingTestLimit: {
		"1": md5("TYPING_TEST_LIMIT_1"),
		"2": md5("TYPING_TEST_LIMIT_2"),
		"custom": md5("TYPING_TEST_LIMIT_CUSTOM"),
	},
}

*/
