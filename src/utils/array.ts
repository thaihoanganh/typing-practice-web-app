export type IShuffle = (array: any[]) => any[];

export const shuffle: IShuffle = array => {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

export function getMostCommon(array: any[]) {
	let count: any = {};

	array.forEach(value => {
		count[value] = (count[value] || 0) + 1;
	});

	return Object.keys(count).reduce<any[]>((prev: any[], next: any, index: number) => {
		if ((!index || count[next]) > count[prev[0]]) {
			return [next];
		} else {
			if (count[next] === count[prev[0]]) {
				prev.push(next);
			}
			return prev;
		}
	}, []);
}
