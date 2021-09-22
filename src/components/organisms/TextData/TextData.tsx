import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';

import classes from './style.module.scss';

export interface TextDataProps {
	data: (
		| {
				value: string;
				isIncorrect: boolean;
				typedAt: null | number;
		  }
		| string
	)[][];
	isCompleted: boolean;
	isReady: boolean;
	wordCursor: number;
	characterCursor: number;
}

const TextData: React.FC<TextDataProps> = ({
	data,
	isCompleted,
	isReady,
	wordCursor,
	characterCursor,
}) => {
	const textDataRef: any = useRef(null);
	const textDataScrollRef: any = useRef(null);

	useEffect(() => {
		if (textDataScrollRef.current && textDataScrollRef.current.childNodes[wordCursor].firstChild) {
			const { offsetTop, clientHeight } = textDataScrollRef.current.childNodes[wordCursor];

			if (offsetTop && offsetTop > clientHeight) {
				textDataScrollRef.current.style.top = -offsetTop + clientHeight + 1 + 'px';
			}
		}
	}, [wordCursor]);

	useEffect(() => {
		if (isCompleted) {
			textDataScrollRef.current.style.top = '0px';
		}
	}, [isCompleted]);

	const spacingCharacter = '\u00A0';

	return (
		<div
			className={classNames(
				'relative overflow-hidden w-full h-full',
				isCompleted ? 'overflow-y-auto' : 'overflow-y-hidden'
			)}
			ref={textDataRef}
		>
			<div
				className={classNames('absolute inline-flex flex-wrap duration-200')}
				ref={textDataScrollRef}
			>
				{data.map((word, wordIndex) => (
					<div key={wordIndex} className="inline-flex">
						{word.map((character, characterIndex) => (
							<span
								key={characterIndex}
								className={classNames(
									classes['character'],
									isCompleted
										? typeof character == 'object' &&
												(character.isIncorrect
													? character.value === spacingCharacter
														? classes['character__spacing_incorrect']
														: classes['character__incorrect']
													: classes['character__correct'])
										: wordIndex < wordCursor && typeof character == 'object'
										? character.isIncorrect
											? character.value === spacingCharacter
												? classes['character__spacing_incorrect']
												: classes['character__incorrect']
											: classes['character__correct']
										: wordIndex === wordCursor &&
										  (characterIndex < characterCursor && typeof character == 'object'
												? character.isIncorrect
													? character.value === spacingCharacter
														? classes['character__spacing_incorrect']
														: classes['character__incorrect']
													: classes['character__correct']
												: isReady &&
												  characterIndex === characterCursor &&
												  classes['character__cursor'])
								)}
							>
								{typeof character === 'string' ? character : character.value}
							</span>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default TextData;
