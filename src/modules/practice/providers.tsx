import React, { useMemo, useState } from 'react';
import { createAppContext } from '@/helpers/context';

import { APP_STATUS, IAppProviderWrapper } from '@/modules/config';
import { IPracticeEntity } from '.';

export type IPracticeContextState = IAppProviderWrapper<IPracticeEntity>;
export const PracticeContext = createAppContext<IPracticeContextState>();

export const INITIAL_PRACTICE_DATA: IPracticeEntity = {
	chracterCursor: 0,
	wordCursor: 0,
	isCheckAfterWord: false,
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
	const [state, setState] = useState<IPracticeContextState>({
		status: APP_STATUS.loading,
		entity: INITIAL_PRACTICE_DATA,
		storage: null,
	});

	const exportValue = useMemo(() => ({ state, setState }), [state]);

	return <PracticeContext.Provider value={exportValue}>{children}</PracticeContext.Provider>;
};

export default PracticeProvider;
