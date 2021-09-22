import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { APP_STATUS } from '@/constants/app';

import { typingSound } from '@/helpers/sound';

import { actionCreateLessonPractice, actionNextLesson, LessonContext } from '@/modules/lesson';
import {
	actionHandleTyping,
	actionPracticeStatistics,
	actionSetPractice,
	actionToggleReady,
	PracticeContext,
} from '@/modules/practice';
import { SettingsContext } from '@/modules/settings';

import Button from '@/components/atoms/Button';
import TextData, { TextDataInput, TextDataWrapper } from '@/components/organisms/TextData';

export const LessonPractice: React.FC = () => {
	const {
		entity: { lessonLanguage, sound },
	} = useContext(SettingsContext.initial);

	const {
		entity: { lessonCurrent, lessonLevelCurrent, lessonList },
	} = useContext(LessonContext.initial);

	const {
		status: practiceStatus,
		entity: {
			characterCursor,
			wordCursor,
			isCompleted,
			isReady,
			isTyping,
			data,
			statistics: { accuracy, wordsPerMinute, graph },
		},
	} = useContext(PracticeContext.initial);

	const {
		levelList: {
			[lessonLevelCurrent]: { wordsPerMinuteMin, accuracyMin },
		},
	} = lessonList[lessonCurrent];

	const textDataInputRef: any = useRef(null);

	const [state, setState] = useState({
		draftValue: '',
		isResetData: false,
		isNextLesson: false,
	});

	useEffect(() => {
		const data = actionCreateLessonPractice({
			lessonCurrent,
			language: lessonLanguage.options[lessonLanguage.selected].value,
		});
		actionSetPractice({ data });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (graph.length) {
			if (accuracy >= accuracyMin && wordsPerMinute >= wordsPerMinuteMin) {
				setState(prevState => ({ ...prevState, isResetData: true, isNextLesson: true }));
			} else {
				setState(prevState => ({ ...prevState, isResetData: true, isNextLesson: false }));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [graph.length]);

	useEffect(() => {
		if (isCompleted) {
			actionPracticeStatistics();
		}
	}, [isCompleted]);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.isResetData]);

	const onHandleTyping = (e: any) => {
		if (sound.options[sound.selected].value) typingSound.play();

		if (e.nativeEvent.data === ' ') {
			if (e.target.value !== ' ') {
				setState(prevState => ({ ...prevState, draftValue: '' }));
				actionHandleTyping({ draftWord: e.target.value });
			}
		} else {
			setState(prevState => ({ ...prevState, draftValue: e.target.value }));
			actionHandleTyping({ draftWord: e.target.value });
		}
	};

	const handleResetLesson = () => {
		let data: string[][] = [];

		if (state.isNextLesson) {
			data = actionNextLesson({
				language: lessonLanguage.options[lessonLanguage.selected].value,
			});
		} else {
			data = actionCreateLessonPractice({
				lessonCurrent,
				language: lessonLanguage.options[lessonLanguage.selected].value,
			});
		}
		actionSetPractice({ data });
		setState(prevState => ({ ...prevState, isResetData: false, isNextLesson: false }));
	};

	const handleKeyPress = (e: KeyboardEvent) => {
		if (state.isResetData && e.code === 'Enter') {
			handleResetLesson();
			textDataInputRef.current.focus();
		}
	};

	return (
		<React.Fragment>
			<TextDataWrapper>
				{practiceStatus === APP_STATUS.ready && (
					<TextData
						characterCursor={characterCursor}
						wordCursor={wordCursor}
						isReady={isReady}
						isCheckAfterWord={false}
						isCompleted={isCompleted}
						data={data}
					/>
				)}
				{!isCompleted && (
					<TextDataInput
						value={state.draftValue}
						isFocus={isReady}
						onFocus={() => actionToggleReady({ isReady: true })}
						onBlur={() => actionToggleReady({ isReady: false })}
						onChange={onHandleTyping}
						ref={textDataInputRef}
					/>
				)}
			</TextDataWrapper>
			<div className={classNames('flex justify-end mt-md', isTyping && 'invisible')}>
				<Button color="secondary" disabled={!state.isResetData} onClick={handleResetLesson}>
					{state.isNextLesson ? 'Bài học tiếp theo' : 'Luyện tập lại'}
				</Button>
			</div>
		</React.Fragment>
	);
};

export default LessonPractice;
