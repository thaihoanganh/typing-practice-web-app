import React, { useMemo, useState } from 'react';

import { APP_STATUS } from '@/constants/app';

import { createAppContext } from '@/helpers/context';

import { IPracticeEntity } from '.';

export interface IPracticeState {
	status: string;
	entity: IPracticeEntity;
}

export const PracticeContext = createAppContext<IPracticeState>();

export const INITAL_PRACTICE_STATE = {
	characterCursor: 0,
	wordCursor: 0,
	isCompleted: false,
	isReady: false,
	isTyping: false,
	data: [],
	statistics: {
		timeStart: 0,
		timeEnd: 0,
		totalCharacters: 0,
		totalWords: 0,
		totalWordsIncorrect: 0,
		totalTime: 0,
		accuracy: 0,
		wordsPerMinute: 0,
		mostIncorrectCharacter: [],
		graph: [],
	},
};

export const PracticeProvider: React.FC = ({ children }) => {
	const [state, setState] = useState<IPracticeState>({
		status: APP_STATUS.loading,
		entity: INITAL_PRACTICE_STATE,
	});

	const exportValue = useMemo(() => ({ state, setState }), [state]);

	return <PracticeContext.Provider value={exportValue}>{children}</PracticeContext.Provider>;
};
