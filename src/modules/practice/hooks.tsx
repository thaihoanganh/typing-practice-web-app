import { useContext } from 'react';
import { PracticeContext } from '.';

export const usePractice = () => {
	const { entity, status } = useContext(PracticeContext.initial);

	return {
		practice: entity,
		practiceStatus: status,
	};
};
