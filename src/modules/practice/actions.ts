import produce from 'immer';

import { shuffle, getMostCommon } from '@/utils/array';
import { typingSound } from '@/helpers/sound';
import { SettingsContext } from '@/modules/settings';
import { IPracticeEntity, PracticeContext, INITIAL_PRACTICE_DATA } from '.';

export function actionCreatePracticeData(words: string, isShuffle: boolean) {
	let wordsArray = words.split(' ');

	if (isShuffle) wordsArray = shuffle(wordsArray);

	const practiceData = wordsArray.map((word: string) => {
		return [...word.split(''), '\u00A0'];
	});

	return practiceData;
}

export function actionSetPractice(practiceData: IPracticeEntity['data'], isCheckAfterWord = false) {
	PracticeContext.setState(
		produce(draft => {
			draft.entity = INITIAL_PRACTICE_DATA;
			draft.entity.isCheckAfterWord = isCheckAfterWord;
			draft.entity.data = practiceData;
		})
	);
}

export function actionToggleReadyTyping(isReady?: boolean) {
	PracticeContext.setState(
		produce(draft => {
			draft.entity.isReady = isReady || !draft.entity.isReady;
		})
	);
}

export function actionHandleTyping(draftCharacter: string, draftWord: string) {
	const { entity } = SettingsContext.getState();
	if (entity.sound.options[entity.sound.selected].value) typingSound.play();

	PracticeContext.setState(
		produce(draft => {
			const { wordCursor, isCheckAfterWord, isCompleted, isReady, isTyping, data } = draft.entity;
			const spacingCharacter = ' ';

			if (
				isReady &&
				!isCompleted &&
				typeof draftCharacter == 'string' &&
				typeof draftWord == 'string'
			) {
				const getTimeNow = new Date().getTime();
				const wordCurrent: any = data[wordCursor];

				if (!isTyping) {
					draft.entity.isTyping = true;
					draft.entity.statistics.timeStart = getTimeNow;
				}

				wordCurrent.map((character: any, characterIndex: number) => {
					if (characterIndex < draftWord.length) {
						const isIncorrect =
							character.value !==
							(draftWord[characterIndex] === spacingCharacter
								? '\u00A0'
								: draftWord[characterIndex]);

						if (typeof character == 'object') {
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
						if (!isCheckAfterWord) draft.entity.chracterCursor == 0;
					} else {
						draft.entity.isCompleted = true;
						draft.entity.isReady = false;
						draft.entity.isTyping = false;
						draft.entity.statistics.timeEnd = getTimeNow;
					}
				} else if (!isCheckAfterWord && draftWord.length < wordCurrent.length) {
					draft.entity.chracterCursor += 1;
				}
			}
		})
	);
}

export function actionStopPractice() {
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
}

export function actionPracticeStatistics() {
	PracticeContext.setState(
		produce(draft => {
			const { data, statistics } = draft.entity;

			const words = data.filter(word => typeof word[0] === 'object');
			let charactersIncrrect: string[] = [];

			statistics.totalTime = statistics.timeEnd - statistics.timeStart;
			statistics.totalWords = words.length;

			words.map((word, wordIndex) => {
				statistics.totalCharacters += word.length;
				let charactersIncrrectOfWord: string[] = [];

				const totalTimeTypingWord = word.reduce<number>((totalTime, character: any) => {
					if (character.isIncorrect) charactersIncrrectOfWord.push(character.value);
					return typeof character === 'string' ? totalTime : character.typedAt - totalTime;
				}, 0);

				statistics.graph.push([
					wordIndex + 1,
					1 / (totalTimeTypingWord / 1000 / 60),
					charactersIncrrectOfWord.length,
				]);

				if (charactersIncrrectOfWord.length) {
					statistics.totalWordsIncorrect += 1;
					charactersIncrrect = [...charactersIncrrect, ...charactersIncrrectOfWord];
				}
			});

			statistics.wordsPerMinute = 1 - charactersIncrrect.length / statistics.totalCharacters;
			statistics.accuracy = statistics.totalWords / (statistics.totalTime / 1000 / 60);
			statistics.mostIncorrectCharacter = getMostCommon(charactersIncrrect);
		})
	);
}
