import React, { useContext, useState } from 'react';
import produce from 'immer';

import { SettingsContext, actionToggleSetting, actionUpdateSetting } from '@/modules/settings';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Radio from '@/components/atoms/Radio';
import Accordion from '@/components/molecules/Accordion';
import Checkbox from '@/components/atoms/Checkbox';
import Toast from '@/components/molecules/Toast';

interface TypingTestTextSettingState {
	isEdited: boolean;
	option: any;
}

export const TypingTestText: React.FC = () => {
	const {
		typingTestText: { options, selected },
	} = useContext(SettingsContext.initial).entity;

	const [state, setState] = useState<TypingTestTextSettingState>({
		isEdited: false,
		option: {
			name: options[selected].name,
			value: options[selected].value,
		},
	});

	const handleToggleSetting = (settingSelected: string) => {
		actionToggleSetting({
			settingName: 'typingTestText',
			settingSelected,
		});
		setState({
			isEdited: false,
			option: {
				name: options[settingSelected].name,
				value: options[settingSelected].value,
			},
		});
	};

	const handleChange = (e: any) => {
		const { name, value } = e.target;

		if (options[selected].isDefault === false) {
			setState(
				produce(draft => {
					draft.isEdited = true;
					if (name === 'name') {
						draft.option.name = value;
					} else {
						if (name === 'isShuffle') {
							draft.option.value.isShuffle = e.target.checked;
						} else {
							draft.option.value[name] = value;
						}
					}
				})
			);
		}
	};

	const handleUpdateSetting = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (options[selected].isDefault === false) {
			const { error } = actionUpdateSetting({
				settingName: 'typingTestText',
				settingKey: selected,
				settingValue: JSON.parse(JSON.stringify(state.option)),
			});

			if (error) {
				Toast({ message: 'Cập nhật thất bại' });
			} else {
				Toast({ message: 'Cập nhật thành công' });
				setState(prevState => ({ ...prevState, isEdited: false }));
			}
		}
	};

	return (
		<Accordion
			icon={
				<svg
					className="fill-current text-contrast-secondary text-opacity-96"
					width="32"
					height="32"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M7.99996 22.6666H12L14.6666 17.3333V9.33331H6.66663V17.3333H10.6666L7.99996 22.6666ZM18.6666 22.6666H22.6666L25.3333 17.3333V9.33331H17.3333V17.3333H21.3333L18.6666 22.6666Z" />
				</svg>
			}
			isOpen
			title="Văn bản kiểm tra tốc độ gõ"
		>
			<React.Fragment>
				<div className="flex flex-wrap">
					{Object.keys(options).map((settingKey: string) => (
						<div key={settingKey} className="pt-md mr-md">
							<Radio
								name="typingTestText"
								defaultChecked={selected === settingKey}
								onClick={() => handleToggleSetting(settingKey)}
								bordered
							>
								{options[settingKey].name}
							</Radio>
						</div>
					))}
				</div>

				<form autoComplete="off" onSubmit={handleUpdateSetting}>
					<div className="pt-lg">
						<div>
							<Input
								name="name"
								placeholder="Tên cài đặt"
								autoComplete="off"
								value={state.option.name}
								disabled={options[selected].isDefault}
								fullWidth
								onChange={handleChange}
							/>
						</div>
						<div className="mt-md">
							<h3 className="text-body text-contrast-secondary text-opacity-60 font-semibold">
								Trích dẫn văn bản
							</h3>
							<textarea
								className="w-full h-full py-sm px-md mt-xs border-2 border-contrast-secondary border-opacity-12 rounded focus:outline-none bg-secondary text-contrast-secondary disabled:text-opacity-60 resize-none"
								rows={5}
								name="words"
								value={state.option.value.words}
								disabled={options[selected].isDefault}
								onChange={handleChange}
							></textarea>
						</div>
						<div className="mt-md">
							<Checkbox
								name="isShuffle"
								placeholder="Quote ..."
								checked={state.option.value.isShuffle}
								disabled={options[selected].isDefault}
								onChange={handleChange}
							>
								Xáo trộn các từ
							</Checkbox>
						</div>
					</div>

					<div className="inline-flex w-full desktop:w-auto mt-lg">
						<Button
							type="submit"
							disabled={
								options[selected].isDefault ||
								(options[selected].isDefault === false && state.isEdited === false)
							}
							fullWitdh
						>
							CẬP NHẬT
						</Button>
					</div>
				</form>
			</React.Fragment>
		</Accordion>
	);
};

export default TypingTestText;
