import { shuffle } from '@/utils/array';

export type ActionCreateSpeedTestData = (payload: {
	words: string;
	isShuffle: boolean;
	limit: number;
}) => string[][];
export const actionCreateSpeedTestData: ActionCreateSpeedTestData = ({
	words,
	isShuffle,
	limit,
}) => {
	let data = words.split(' ').map((word: string) => [...word.split(''), '\u00A0']);
	if (isShuffle) data = shuffle(data);
	data = data.slice(0, limit);

	data[data.length - 1] = data[data.length - 1].slice(0, data[data.length - 1].length - 1);
	return data;
};
