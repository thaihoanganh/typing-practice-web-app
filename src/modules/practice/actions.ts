import produce from 'immer';

import { APP_STATUS } from '@/constants/app';

import { getMostCommon } from '@/utils/array';
import { round } from '@/utils/number';

import { PracticeContext, INITAL_PRACTICE_STATE } from '.';

export type ActionSetPractice = (payload: { data: string[][] }) => void;
export const actionSetPractice: ActionSetPractice = ({ data }) => {
	PracticeContext.setState(
		produce(draft => {
			draft.status = APP_STATUS.ready;
			draft.entity = { ...INITAL_PRACTICE_STATE, data };
		})
	);
};

export type ActionToggleReady = (payload: { isReady: boolean }) => void;
export const actionToggleReady: ActionToggleReady = ({ isReady }) => {
	PracticeContext.setState(
		produce(draft => {
			draft.entity.isReady = isReady;
		})
	);
};

export type ActionHandleTyping = (payload: { draftWord: string }) => void;
export const actionHandleTyping: ActionHandleTyping = ({ draftWord }) => {
	PracticeContext.setState(
		produce(draft => {
			const { wordCursor, isCompleted, isReady, isTyping, data } = draft.entity;
			const draftCharacter = draftWord[draftWord.length - 1];
			const spacingCharacter = ' ';

			if (isReady && !isCompleted) {
				const getTimeNow = new Date().getTime();
				const wordCurrent: any = data[wordCursor];

				if (!isTyping) {
					draft.entity.isTyping = true;
					draft.entity.statistics.timeStart = getTimeNow;
				}

				wordCurrent.map((character: any, characterIndex: number) => {
					const isIncorrect =
						(typeof character === 'object' ? character.value : character) !==
						((draftWord[characterIndex] || '').trim() || '\u00A0');

					if (characterIndex < draftWord.length) {
						if (typeof character === 'object') {
							wordCurrent[characterIndex].isIncorrect = isIncorrect;
						} else {
							wordCurrent[characterIndex] = {
								value: character,
								isIncorrect,
								typedAt: getTimeNow,
							};
						}
					} else {
						if (spacingCharacter === draftCharacter) {
							wordCurrent[characterIndex] = {
								value: character,
								isIncorrect: true,
								typedAt: null,
							};
						} else if (typeof character == 'object') {
							wordCurrent[characterIndex] = character.value;
						}
					}
				});

				if (spacingCharacter === draftCharacter) {
					if (wordCursor < data.length - 1) {
						draft.entity.wordCursor += 1;
					} else {
						draft.entity.isCompleted = true;
						draft.entity.isReady = false;
						draft.entity.isTyping = false;
						draft.entity.statistics.timeEnd = getTimeNow;
					}
				} else if (draftWord.length < wordCurrent.length) {
					draft.entity.characterCursor = draftWord.length;
				}
			}
		})
	);
};

export type ActionStopPractice = () => void;
export const actionStopPractice = () => {
	PracticeContext.setState(
		produce(draft => {
			const { wordCursor, data } = draft.entity;
			const getTimeNow = new Date().getTime();
			const wordCurrent: any = data[wordCursor];

			wordCurrent.map((character: any, characterIndex: number) => {
				if (typeof character == 'string') {
					wordCurrent[characterIndex] = {
						value: character,
						isIncorrect: true,
						typedAt: null,
					};
				}
			});

			draft.entity.isCompleted = true;
			draft.entity.isReady = false;
			draft.entity.isTyping = false;
			draft.entity.statistics.timeEnd = getTimeNow;
		})
	);
};

export type ActionPracticeStatistics = () => void;
export function actionPracticeStatistics() {
	PracticeContext.setState(
		produce(draft => {
			const { data, statistics } = draft.entity;
			const words = data.filter(word => typeof word[0] === 'object');

			const totalWords = words.length;
			const totalTime = statistics.timeEnd - statistics.timeStart;
			const wordsPerMinute = round(totalWords / (totalTime / 1000 / 60));

			let totalCharacters = 0;
			let totalWordsIncorrect = 0;
			let charactersIncorrect: string[] = [];
			let graph: any = [];

			let totalTimeWord = 0;
			words.map((word, wordIndex) => {
				let charactersIncorrectOfWord: string[] = [];
				totalCharacters += word.length;

				const totalTimeWordArray = word
					.map((character: any) => {
						if (character.isIncorrect) charactersIncorrectOfWord.push(character.value);
						return character.typedAt;
					})
					.filter((typedAt: any) => typeof typedAt === 'number');

				if (totalTimeWordArray.length) {
					totalTimeWord =
						totalTimeWordArray[totalTimeWordArray.length - 1] / 1000 / 60 -
						totalTimeWordArray[0] / 1000 / 60;
				}

				graph.push([wordIndex + 1, 1 / totalTimeWord, charactersIncorrectOfWord.length]);

				if (charactersIncorrectOfWord.length) {
					totalWordsIncorrect += 1;
					charactersIncorrect = [...charactersIncorrect, ...charactersIncorrectOfWord];
				}
			});

			statistics.totalCharacters = totalCharacters;
			statistics.totalWords = totalWords;
			statistics.totalWordsIncorrect = totalWordsIncorrect;
			statistics.totalTime = round(totalTime / 1000);
			statistics.accuracy = round(1 - totalWordsIncorrect / totalWords);
			statistics.wordsPerMinute = wordsPerMinute;
			statistics.mostIncorrectCharacter = getMostCommon(charactersIncorrect);
			statistics.graph = graph;
		})
	);
}
