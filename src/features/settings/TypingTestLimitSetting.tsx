import React, { useContext, useState } from 'react';
import produce from 'immer';

import { SettingsContext, actionToggleSetting, actionUpdateSetting } from '@/modules/settings';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Radio from '@/components/atoms/Radio';
import Accordion from '@/components/molecules/Accordion';
import Toast from '@/components/molecules/Toast';

interface TypingTestLimitSettingState {
	isEdited: boolean;
	option: any;
}

export const TypingTestLimitSetting: React.FC = () => {
	const {
		typingTestLimit: { options, selected },
	} = useContext(SettingsContext.initial).entity;

	const [state, setState] = useState<TypingTestLimitSettingState>({
		isEdited: false,
		option: {
			name: options[selected].name,
			value: options[selected].value,
		},
	});

	const handleToggleSetting = (settingSelected: string) => {
		actionToggleSetting({
			settingName: 'typingTestLimit',
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
						if (name === 'amount' && !isNaN(value as any)) {
							draft.option.value.amount = Number(value);
						} else {
							draft.option.value.type = value;
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
				settingName: 'typingTestLimit',
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
					<path d="M28.6872 8.39296C29.0438 7.97003 28.9893 7.33793 28.5655 6.98234L23.9642 3.12128C23.5419 2.76685 22.9123 2.82118 22.5569 3.24271L22.1261 3.75366C21.7695 4.1766 21.8241 4.80869 22.2478 5.16429L26.8491 9.02535C27.2715 9.37977 27.901 9.32545 28.2564 8.90392L28.6872 8.39296ZM9.74148 5.1618C10.1642 4.8072 10.2199 4.17719 9.86583 3.75397L9.4418 3.24713C9.08736 2.82347 8.45657 2.76742 8.03299 3.12194L3.4363 6.96916C3.0117 7.32454 2.95669 7.95729 3.31361 8.38061L3.74371 8.89074C4.09907 9.31221 4.7285 9.36659 5.15088 9.01231L9.74148 5.1618ZM16.6667 11.6666C16.6667 11.1144 16.219 10.6666 15.6667 10.6666C15.1144 10.6666 14.6667 11.1144 14.6667 11.6666V18.1005C14.6667 18.4517 14.851 18.7772 15.1522 18.958L20.1846 21.9774C20.6359 22.2482 21.2211 22.1041 21.495 21.6548C21.7729 21.1991 21.6247 20.6043 21.1655 20.3322L17.1569 17.9571C16.853 17.7771 16.6667 17.45 16.6667 17.0968V11.6666ZM16 5.33331C9.37333 5.33331 4 10.7066 4 17.3333C4 23.96 9.36 29.3333 16 29.3333C19.1826 29.3333 22.2348 28.069 24.4853 25.8186C26.7357 23.5682 28 20.5159 28 17.3333C28 14.1507 26.7357 11.0985 24.4853 8.84803C22.2348 6.5976 19.1826 5.33331 16 5.33331ZM16 26.6666C10.84 26.6666 6.66667 22.4933 6.66667 17.3333C6.66667 12.1733 10.84 7.99998 16 7.99998C21.16 7.99998 25.3333 12.1733 25.3333 17.3333C25.3333 22.4933 21.16 26.6666 16 26.6666Z" />
				</svg>
			}
			isOpen
			title="Giới hạn kiểm tra tốc độ gõ"
		>
			<React.Fragment>
				<div className="flex flex-wrap">
					{Object.keys(options).map((settingKey: string) => (
						<div key={settingKey} className="pt-md mr-md">
							<Radio
								name="typingTestLimit"
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
								Số lượng
							</h3>
							<div className="flex items-center mt-xs">
								<div className="flex-grow">
									<Input
										name="amount"
										value={state.option.value.amount}
										disabled={options[selected].isDefault}
										suffix={state.option.value.type === 'time' ? 'Giây' : 'Từ'}
										fullWidth
										onChange={handleChange}
									/>
								</div>
								<div className="flex items-center ml-md">
									<Radio
										name="type"
										value="time"
										defaultChecked={state.option.value.type === 'time'}
										disabled={options[selected].isDefault}
										onChange={handleChange}
									>
										Giây
									</Radio>
								</div>
								<div className="flex items-center ml-md">
									<Radio
										name="type"
										value="word"
										defaultChecked={state.option.value.type === 'word'}
										disabled={options[selected].isDefault}
										onChange={handleChange}
									>
										Từ
									</Radio>
								</div>
							</div>
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

export default TypingTestLimitSetting;
