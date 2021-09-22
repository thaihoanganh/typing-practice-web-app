import React, { useContext, useEffect } from 'react';

import { SettingsContext } from '@/modules/settings';
import { LessonContext, actionCreateLessonPractice, actionNextLesson } from '@/modules/lesson';
import { PracticeContext, actionSetPractice, actionPracticeStatistics } from '@/modules/practice';

import Button from '@/components/atoms/Button';
import Lesson from '@/components/organisms/Lesson';

export const LessonController: React.FC = () => {
	const { lessonCurrent, lessonLevelCurrent, lessonList } = useContext(
		LessonContext.initial
	).entity;

	const { lessonLanguage } = useContext(SettingsContext.initial).entity;

	const { isCompleted, statistics } = useContext(PracticeContext.initial).entity;

	const {
		character,
		levelList: {
			[lessonLevelCurrent]: { wordsPerMinuteMin, accuracyMin },
		},
	} = lessonList[lessonCurrent];

	useEffect(() => {
		handleSetLessonData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isCompleted) {
			actionPracticeStatistics();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isCompleted]);

	useEffect(() => {
		if (isCompleted) {
			window.addEventListener('keydown', handleKeyPress);
			window.addEventListener('keyup', handleKeyPress);
		}
		return () => {
			if (isCompleted) {
				window.removeEventListener('keydown', handleKeyPress);
				window.removeEventListener('keyup', handleKeyPress);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [statistics.graph]);

	const handleSetLessonData = () => {
		let data: string[][] = [];
		const language = lessonLanguage.options[lessonLanguage.selected].value;

		if (statistics.wordsPerMinute >= wordsPerMinuteMin && statistics.accuracy >= accuracyMin) {
			data = actionNextLesson({ language });
		} else {
			data = actionCreateLessonPractice({ lessonCurrent, language });
		}

		actionSetPractice({ data });
	};

	const handleKeyPress = (e: any) => {
		if (isCompleted && e.code === 'Enter') {
			handleSetLessonData();
		}
	};

	return (
		<React.Fragment>
			<div className="flex justify-end">
				<Button disabled={!isCompleted} onClick={handleSetLessonData}>
					{statistics.wordsPerMinute >= wordsPerMinuteMin && statistics.accuracy >= accuracyMin
						? 'Bài học tiếp theo'
						: 'Luyện tập lại'}
				</Button>
			</div>
			<div className="mt-sm">
				<Lesson
					title={`Tập gõ phím ${String(character).toUpperCase()}`}
					description={`Cấp độ ${
						lessonLevelCurrent + 1
					}, bạn cần đạt tốc độ gõ tối thiểu ${wordsPerMinuteMin}WPM với độ chính xác ${
						accuracyMin * 100
					}%`}
					levelList={lessonList[lessonCurrent].levelList.map((value, index) => ({
						isCompleted: index < lessonLevelCurrent,
					}))}
				/>
			</div>
		</React.Fragment>
	);
};

export default LessonController;
