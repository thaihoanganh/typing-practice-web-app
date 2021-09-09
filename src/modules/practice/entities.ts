export interface IPracticeEntity {
	/*
		Cursor of character is typing
	*/
	chracterCursor: number;

	/*
		Cursor of word is typing
	*/
	wordCursor: number;

	/*

	 */
	isCheckAfterWord: boolean;

	/*
		Is the practice test completed
	*/
	isCompleted: boolean;

	/*
		Is the user ready typing
	 */
	isReady: boolean;

	/*
		Is the user typing
	*/
	isTyping: boolean;

	/*
		Practice data
		if the character has not been typed, the character is of type string
	 */
	data: (
		| {
				value: string;
				isIncorrect: boolean;
				typedAt: null | number;
		  }
		| string
	)[][];

	/*
		Practice statistics after typing completed
	*/
	statistics: {
		timeStart: number;
		timeEnd: number;
		totalCharacters: number;
		totalWords: number;
		totalWordsIncorrect: number;
		totalTime: number;
		accuracy: number;
		wordsPerMinute: number;
		mostIncorrectCharacter: string[];
		graph: [number, number, number][];
	};
}
