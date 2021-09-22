import React, { useState, useEffect, useMemo } from 'react';

import { APP_STATUS } from '@/constants/app';
import { INITIAL_LESSON_CURRENT } from '@/constants/lesson';

import { createAppContext } from '@/helpers/context';

import { ISettingsState } from '@/modules/settings';

import { ILessonEntity, actionSetLesson } from '.';

export interface ILessonProps {
	settings: ISettingsState;
}

export interface ILessonState {
	status: string;
	entity: ILessonEntity;
}

export const LessonContext = createAppContext<ILessonState>();

export const LessonProvider: React.FC<ILessonProps> = ({ children, settings }) => {
	const [state, setState] = useState<ILessonState>({
		status: APP_STATUS.loading,
		entity: {
			...INITIAL_LESSON_CURRENT,
			lessonList: [],
		},
	});

	useEffect(() => {
		if (settings.status === APP_STATUS.ready) {
			const { lessonLanguage, lessonLevel } = settings.entity;

			actionSetLesson({
				language: lessonLanguage.options[lessonLanguage.selected].value,
				level: lessonLevel.options[lessonLevel.selected].value,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [settings.status]);

	const exportValue = useMemo(() => ({ state, setState }), [state]);

	return <LessonContext.Provider value={exportValue}>{children}</LessonContext.Provider>;
};
