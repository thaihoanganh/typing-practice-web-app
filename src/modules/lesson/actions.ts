import produce from 'immer';

import {
	LESSON_STORAGE,
	INITIAL_LESSON_CURRENT,
	TOTAL_WORDS,
	LESSON_FOCUS,
	LESSON_LEVEL,
	WORD_LENGTH_DENSITY,
} from '@/constants/lesson';
import { APP_STATUS } from '@/constants/app';

import { readLocalStorage, writeLocalStorage } from '@/helpers/localStorage';

import { shuffle } from '@/utils/array';
import { round } from '@/utils/number';

import { ILessonStorage, lessonStorageSchema, LessonContext } from '.';

export type ActionCreateLessonList = (payload: {
	lessonCurrent: number;
	lessonLevelCurrent: number;
	language: string;
	level: {
		wordsPerMinuteMin: number;
		wordsPerMinuteMax: number;
		accuracyMin: number;
		accuracyMax: number;
	};
}) => {
	isCompleted: boolean;
	character: string;
	levelList: {
		isCompleted: boolean;
		accuracyMin: number;
		wordsPerMinuteMin: number;
	}[];
}[];
export const actionCreateLessonList: ActionCreateLessonList = ({
	lessonCurrent,
	lessonLevelCurrent,
	language,
	level: { wordsPerMinuteMax, wordsPerMinuteMin, accuracyMin, accuracyMax },
}) => {
	return language.split('').map((value, index) => {
		const countLevels = LESSON_LEVEL.min + Math.floor(index / LESSON_LEVEL.step);
		const levelList = [];
		const isCompleted = index < lessonCurrent;

		for (let i = 0; i < countLevels; i++) {
			levelList.push({
				isCompleted: isCompleted ? true : index === lessonCurrent && i < lessonLevelCurrent,
				accuracyMin: accuracyMin + (accuracyMax - accuracyMin) * (i / (countLevels - 1 || 1)),
				wordsPerMinuteMin: round(
					wordsPerMinuteMin +
						(wordsPerMinuteMax - wordsPerMinuteMin) * (index / (language.length - 1))
				),
			});
		}

		return {
			isCompleted,
			character: value,
			levelList,
		};
	});
};

export type ActionCreateLessonPractice = (payload: {
	lessonCurrent: number;
	language: string;
	characterFocus?: string;
}) => string[][];
export const actionCreateLessonPractice: ActionCreateLessonPractice = ({
	lessonCurrent,
	language,
	characterFocus,
}) => {
	const lessonFocusOther = characterFocus
		? (1 - LESSON_FOCUS.hight - LESSON_FOCUS.normal - LESSON_FOCUS.low - LESSON_FOCUS.focus) /
		  (lessonCurrent + 1)
		: (1 - LESSON_FOCUS.hight - LESSON_FOCUS.normal - LESSON_FOCUS.low) / (lessonCurrent + 1);

	const totalWords =
		TOTAL_WORDS.min +
		Math.ceil(
			(TOTAL_WORDS.max - TOTAL_WORDS.min) * (lessonCurrent / (TOTAL_WORDS.max - TOTAL_WORDS.min))
		);

	const countWordsObject: {
		[prop: string]: number;
	} = WORD_LENGTH_DENSITY.reduce((prev, value) => {
		return { ...prev, [value.length]: Math.ceil(totalWords * value.density) };
	}, {});

	const countCharacters = Object.keys(countWordsObject).reduce((prev, value) => {
		return prev + Number(value) * countWordsObject[value];
	}, 0);

	let characters: any = [];
	for (let i = 0; i <= lessonCurrent; i++) {
		characters = [
			...characters,
			...Array(Math.floor(countCharacters * lessonFocusOther)).fill(language[i]),
		];
	}
	characters = [
		...characters,
		...Array(Math.floor(countCharacters * LESSON_FOCUS.hight)).fill(language[lessonCurrent]),
	];
	characters = [
		...characters,
		...Array(Math.floor(countCharacters * LESSON_FOCUS.normal)).fill(
			language[lessonCurrent - 1] || language[lessonCurrent]
		),
	];
	characters = [
		...characters,
		...Array(Math.floor(countCharacters * LESSON_FOCUS.low)).fill(
			language[lessonCurrent - 2] || language[lessonCurrent]
		),
	];
	if (characterFocus) {
		characters = [
			...characters,
			...Array(Math.floor(countCharacters * LESSON_FOCUS.focus)).fill(characterFocus),
		];
	}
	characters = shuffle(characters);
	if (countCharacters > characters.length) {
		characters = [...characters, ...characters.splice(0, countCharacters - characters.length)];
	}

	let wordsArray: string[][] = [];
	let characterCursor = 0;
	for (const key in countWordsObject) {
		if (Object.prototype.hasOwnProperty.call(countWordsObject, key)) {
			for (let i = 0; i < countWordsObject[key]; i++) {
				wordsArray = [
					...wordsArray,
					[...characters.slice(characterCursor, characterCursor + Number(key)), '\u00A0'],
				];
				characterCursor += Number(key);
			}
		}
	}

	wordsArray = shuffle(wordsArray);

	wordsArray[wordsArray.length - 1] = wordsArray[wordsArray.length - 1].slice(
		0,
		wordsArray[wordsArray.length - 1].length - 1
	);

	return wordsArray;
};

export type ActionSetLesson = (payload: {
	language: string;
	level: {
		wordsPerMinuteMin: number;
		wordsPerMinuteMax: number;
		accuracyMin: number;
		accuracyMax: number;
	};
}) => void;
export const actionSetLesson: ActionSetLesson = ({ language, level }) => {
	let localLessonCurrent: ILessonStorage = readLocalStorage(LESSON_STORAGE);

	try {
		lessonStorageSchema.strictParser(localLessonCurrent);
	} catch (err) {
		localLessonCurrent = INITIAL_LESSON_CURRENT;
		writeLocalStorage(LESSON_STORAGE, INITIAL_LESSON_CURRENT);
	}

	const { lessonCurrent, lessonLevelCurrent } = localLessonCurrent;

	const lessonList = actionCreateLessonList({
		lessonCurrent,
		lessonLevelCurrent,
		language,
		level,
	});

	LessonContext.setState(
		produce(draft => {
			draft.status = APP_STATUS.ready;
			draft.entity = {
				lessonCurrent,
				lessonLevelCurrent,
				lessonList,
			};
		})
	);
};

export type ActionNextLesson = (payload: { language: string }) => string[][];
export const actionNextLesson: ActionNextLesson = ({ language }) => {
	let lessonData: string[][] = [];

	LessonContext.setState(
		produce(draft => {
			const { lessonCurrent, lessonList, lessonLevelCurrent } = draft.entity;

			if (lessonCurrent < language.length - 1) {
				if (lessonLevelCurrent < lessonList[lessonCurrent].levelList.length - 1) {
					draft.entity.lessonLevelCurrent += 1;
				} else if (lessonLevelCurrent === lessonList[lessonCurrent].levelList.length - 1) {
					draft.entity.lessonCurrent += 1;
					draft.entity.lessonLevelCurrent = 0;
				}
			}

			writeLocalStorage(LESSON_STORAGE, {
				lessonCurrent: draft.entity.lessonCurrent,
				lessonLevelCurrent: draft.entity.lessonLevelCurrent,
			});

			lessonData = actionCreateLessonPractice({
				lessonCurrent: draft.entity.lessonCurrent,
				language,
			});
		})
	);

	return lessonData;
};
