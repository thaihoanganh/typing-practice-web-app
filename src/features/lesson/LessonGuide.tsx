import React, { useContext } from 'react';

import { LessonContext } from '@/modules/lesson';

import Lesson from '@/components/organisms/Lesson';

export const LessonGuide: React.FC = () => {
	const {
		entity: { lessonCurrent, lessonLevelCurrent, lessonList },
	} = useContext(LessonContext.initial);

	const {
		character,
		levelList: {
			[lessonLevelCurrent]: { wordsPerMinuteMin, accuracyMin },
		},
	} = lessonList[lessonCurrent];

	return (
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
	);
};

export default LessonGuide;
