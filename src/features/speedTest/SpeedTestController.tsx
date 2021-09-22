import React, { useContext, useState, useEffect } from 'react';

import { SettingsContext, actionToggleSetting } from '@/modules/settings';
import {
	PracticeContext,
	actionSetPractice,
	actionStopPractice,
	actionPracticeStatistics,
} from '@/modules/practice';
import { actionCreateSpeedTestData } from '@/modules/speedTest';

import Button from '@/components/atoms/Button';
import Radio from '@/components/atoms/Radio';

export const SpeedTestController: React.FC = () => {
	const { typingTestLimit, typingTestText } = useContext(SettingsContext.initial).entity;

	const { wordCursor, isCompleted, isTyping } = useContext(PracticeContext.initial).entity;

	const typingTestLimitOption = typingTestLimit.options[typingTestLimit.selected];
	const typingTestTextOption = typingTestText.options[typingTestText.selected];

	const [state, setState] = useState({
		count: 0,
		isTyping: false,
	});

	useEffect(() => {
		handleResetPracticeData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [typingTestLimit.selected]);

	useEffect(() => {
		if (isTyping) {
			setState(prevState => ({ ...prevState, isTyping: true }));
		}
	}, [isTyping]);

	useEffect(() => {
		let timer: any;

		if (typingTestLimitOption.value.type === 'time') {
			if (state.count === typingTestLimitOption.value.amount) {
				actionStopPractice();
			}

			if (state.isTyping && state.count < typingTestLimitOption.value.amount) {
				timer = setTimeout(() => {
					setState(prevState => ({ ...prevState, count: prevState.count + 1 }));
				}, 1000);
			}
		}

		return () => {
			if (typingTestLimitOption.value.type === 'time') {
				clearTimeout(timer);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	useEffect(() => {
		if (state.isTyping && typingTestLimitOption.value.type === 'word') {
			setState(prevState => ({ ...prevState, count: wordCursor }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wordCursor]);

	useEffect(() => {
		if (isCompleted) {
			if (state.isTyping && typingTestLimitOption.value.type === 'word') {
				setState(prevState => ({ ...prevState, count: prevState.count + 1 }));
			}

			actionPracticeStatistics();
		}

		if (isCompleted) {
			window.addEventListener('keydown', handleKeyPress);
			window.addEventListener('keyup', handleKeyPress);
		}
		return () => {
			if (isCompleted) {
				window.removeEventListener('keydown', handleKeyPress);
				window.removeEventListener('keyup', handleKeyPress);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isCompleted]);

	const handleKeyPress = (e: any) => {
		if (isCompleted && e.code === 'Enter') {
			handleResetPracticeData();
		}
	};

	const handleResetPracticeData = () => {
		const data = actionCreateSpeedTestData({
			words: typingTestTextOption.value.words,
			isShuffle: typingTestTextOption.value.isShuffle,
			limit: typingTestLimitOption.value.type === 'time' ? 500 : typingTestLimitOption.value.amount,
		});

		actionSetPractice({ data });
		setState(prevState => ({ ...prevState, count: 0, isTyping: false }));
	};

	const handleToggleSetting = (settingSelected: string) => {
		actionToggleSetting({
			settingName: 'typingTestLimit',
			settingSelected,
		});
	};

	return (
		<div className="pt-sm">
			<div className="flex justify-between">
				<div>
					<h2 className="text-subtitle text-contrast-secondary text-opacity-60">
						{state.count} / {typingTestLimitOption.value.amount}
					</h2>
				</div>
				<div>
					<Button color="secondary" disabled={!isCompleted} onClick={handleResetPracticeData}>
						Bắt đầu lại
					</Button>
				</div>
			</div>

			<div className="flex flex-wrap mt-sm">
				{Object.keys(typingTestLimit.options).map((settingKey: string) => (
					<div key={settingKey} className="pt-md mr-md">
						<Radio
							name="typingTestLimit"
							defaultChecked={typingTestLimit.selected === settingKey}
							onClick={() => handleToggleSetting(settingKey)}
							bordered
						>
							{typingTestLimit.options[settingKey].name}
						</Radio>
					</div>
				))}
			</div>
		</div>
	);
};
