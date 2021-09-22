import React, { useContext } from 'react';

import { LessonContext } from '@/modules/lesson';

import Lesson from '@/components/organisms/Lesson';

export const LessonList: React.FC = () => {
	const {
		entity: { lessonCurrent, lessonLevelCurrent, lessonList },
	} = useContext(LessonContext.initial);

	return (
		<React.Fragment>
			<h2 className="text-subtitle text-contrast-secondary text-opacity-60 font-semibold">
				Danh sách bài học
			</h2>

			<div className="mt-md">
				{lessonList.map((value, index) => (
					<Lesson
						key={index}
						title={`Tập gõ phím ${String(value.character).toUpperCase()}`}
						description={`Tốc độ gõ tối thiểu cần đạt ${value.levelList[0].wordsPerMinuteMin}WPM`}
						levelList={value.levelList.map((level, indexLevel) => ({
							isCompleted:
								index < lessonCurrent ||
								(index === lessonCurrent && indexLevel < lessonLevelCurrent),
						}))}
						isActive={index < lessonCurrent}
					/>
				))}
			</div>
		</React.Fragment>
	);
};

export default LessonList;
