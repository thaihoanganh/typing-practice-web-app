import React, { useContext, useEffect, useRef, useState } from 'react';

import { APP_STATUS } from '@/constants/app';

import { typingSound } from '@/helpers/sound';

import { actionHandleTyping, actionToggleReady, PracticeContext } from '@/modules/practice';
import { SettingsContext } from '@/modules/settings';

import TextData, { TextDataInput, TextDataWrapper } from '@/components/organisms/TextData';

export const PracticeData: React.FC = () => {
	const { sound } = useContext(SettingsContext.initial).entity;

	const {
		status: practiceStatus,
		entity: { characterCursor, wordCursor, isCompleted, isReady, data },
	} = useContext(PracticeContext.initial);

	const textDataInputRef: any = useRef(null);

	const [state, setState] = useState({
		draftValue: '',
	});

	useEffect(() => {
		if (practiceStatus === APP_STATUS.ready && !isCompleted) {
			textDataInputRef.current.focus();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [practiceStatus, isCompleted]);

	useEffect(() => {
		if (isReady) {
			setState(prevState => ({ ...prevState, draftValue: '' }));
		}
	}, [isReady]);

	const onHandleTyping = (e: any) => {
		if (sound.options[sound.selected].value) typingSound.play();

		if (e.nativeEvent.data === ' ') {
			if (e.target.value !== ' ') {
				setState(prevState => ({ ...prevState, draftValue: '' }));
				actionHandleTyping({ draftWord: e.target.value });
			}
		} else {
			setState(prevState => ({ ...prevState, draftValue: e.target.value }));
			actionHandleTyping({ draftWord: e.target.value });
		}
	};

	return (
		<TextDataWrapper>
			{practiceStatus === APP_STATUS.ready && (
				<TextData
					characterCursor={characterCursor}
					wordCursor={wordCursor}
					isReady={isReady}
					isCompleted={isCompleted}
					data={data}
				/>
			)}
			{!isCompleted && (
				<TextDataInput
					value={state.draftValue}
					isFocus={isReady}
					onFocus={() => actionToggleReady({ isReady: true })}
					onBlur={() => actionToggleReady({ isReady: false })}
					onChange={onHandleTyping}
					ref={textDataInputRef}
				/>
			)}
		</TextDataWrapper>
	);
};

export default PracticeData;
