import React, { useContext, useState, useEffect } from 'react';
import produce from 'immer';

import { setGlobalColors } from '@/helpers/color';

import {
	IThemeSchema,
	SettingsContext,
	actionToggleSetting,
	actionUpdateSetting,
} from '@/modules/settings';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Radio from '@/components/atoms/Radio';
import Accordion from '@/components/molecules/Accordion';
import Toast from '@/components/molecules/Toast';

interface ThemeSettingState {
	isEdited: boolean;
	option: IThemeSchema;
}

export const ThemeSetting: React.FC = () => {
	const { options, selected } = useContext(SettingsContext.initial).entity.theme;

	const [state, setState] = useState<ThemeSettingState>(() => handleSetStateValue());

	useEffect(() => {
		setState(handleSetStateValue());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected, options[selected]]);

	function handleSetStateValue() {
		return {
			isEdited: false,
			option: {
				name: options[selected].name,
				value: options[selected].value,
			},
		};
	}

	useEffect(() => {
		setGlobalColors(state.option.value.primary, state.option.value.secondary);
	}, [state.option.value.primary, state.option.value.secondary]);

	const toggleThemeSetting = (settingSelected: string) => {
		actionToggleSetting({
			settingName: 'theme',
			settingSelected,
		});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (options[selected].isDefault === false) {
			setState(
				produce((draft: any) => {
					draft.isEdited = true;
					if (name === 'name') {
						draft.option.name = value;
					} else {
						draft.option.value[name] = value;
					}
				})
			);
		}
	};

	const handleUpdateTheme = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (options[selected].isDefault === false) {
			if (options[selected].isDefault === false) {
				const { error } = actionUpdateSetting({
					settingName: 'theme',
					settingKey: selected,
					settingValue: JSON.parse(JSON.stringify(state.option)),
				});

				if (error) {
					Toast({ message: 'Cập nhật thất bại' });
				} else {
					Toast({ message: 'Cập nhật thành công' });
				}
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
					<path d="M16 4C12.8174 4 9.76516 5.26428 7.51472 7.51472C5.26428 9.76515 4 12.8174 4 16C4 19.1826 5.26428 22.2348 7.51472 24.4853C9.76516 26.7357 12.8174 28 16 28C17.1067 28 18 27.1067 18 26C18 25.48 17.8 25.0133 17.48 24.6533C17.1733 24.3067 16.9733 23.84 16.9733 23.3333C16.9733 22.2267 17.8667 21.3333 18.9733 21.3333H21.3333C25.0133 21.3333 28 18.3467 28 14.6667C28 8.77333 22.6267 4 16 4ZM8.66667 16C7.56 16 6.66667 15.1067 6.66667 14C6.66667 12.8933 7.56 12 8.66667 12C9.77333 12 10.6667 12.8933 10.6667 14C10.6667 15.1067 9.77333 16 8.66667 16ZM12.6667 10.6667C11.56 10.6667 10.6667 9.77333 10.6667 8.66667C10.6667 7.56 11.56 6.66667 12.6667 6.66667C13.7733 6.66667 14.6667 7.56 14.6667 8.66667C14.6667 9.77333 13.7733 10.6667 12.6667 10.6667ZM19.3333 10.6667C18.2267 10.6667 17.3333 9.77333 17.3333 8.66667C17.3333 7.56 18.2267 6.66667 19.3333 6.66667C20.44 6.66667 21.3333 7.56 21.3333 8.66667C21.3333 9.77333 20.44 10.6667 19.3333 10.6667ZM23.3333 16C22.2267 16 21.3333 15.1067 21.3333 14C21.3333 12.8933 22.2267 12 23.3333 12C24.44 12 25.3333 12.8933 25.3333 14C25.3333 15.1067 24.44 16 23.3333 16Z" />
				</svg>
			}
			isOpen
			title="Chủ đề"
		>
			<div className="py-sm">
				<div className="flex">
					{Object.keys(options).map((settingKey: string) => (
						<div key={settingKey} className="mr-md">
							<Radio
								name="theme"
								defaultChecked={selected === settingKey}
								onClick={() => toggleThemeSetting(settingKey)}
								bordered
							>
								{options[settingKey].name}
							</Radio>
						</div>
					))}
				</div>

				<form onSubmit={handleUpdateTheme}>
					<div className="mt-lg">
						<div>
							<Input
								name="name"
								placeholder="Tên chủ đề"
								autoComplete="off"
								value={state.option.name}
								disabled={options[selected].isDefault}
								fullWidth
								onChange={handleChange}
							/>
						</div>

						<div className="flex flex-wrap">
							<div className="flex-grow w-full desktop:w-auto mt-md">
								<h3 className="text-body text-contrast-secondary text-opacity-60">Primary</h3>
								<div className="mt-sm">
									<Input
										name="primary"
										autoComplete="off"
										maxLength={7}
										disabled={options[selected].isDefault}
										value={state.option.value.primary}
										onChange={handleChange}
										fullWidth
										suffix={
											<label className="flex h-full pl-sm">
												<input
													type="color"
													className="invisible"
													name="primary"
													disabled={options[selected].isDefault}
													value={state.option.value.primary}
													onChange={handleChange}
												/>
												<div
													className="w-48 h-full border border-contrast-secondary border-opacity-12 rounded"
													style={{ backgroundColor: state.option.value.primary }}
												/>
											</label>
										}
									/>
								</div>
							</div>

							<div className="flex-grow w-full desktop:w-auto mt-md desktop:ml-md">
								<h3 className="text-body text-contrast-secondary text-opacity-60">Secondary</h3>
								<div className="mt-sm">
									<Input
										name="secondary"
										autoComplete="off"
										maxLength={7}
										disabled={options[selected].isDefault}
										value={state.option.value.secondary}
										onChange={handleChange}
										fullWidth
										suffix={
											<label className="flex h-full pl-sm">
												<input
													type="color"
													className="invisible"
													name="secondary"
													disabled={options[selected].isDefault}
													value={state.option.value.secondary}
													onChange={handleChange}
												/>
												<div
													className="w-48 h-full border border-contrast-secondary border-opacity-12 rounded"
													style={{ backgroundColor: state.option.value.secondary }}
												/>
											</label>
										}
									/>
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
			</div>
		</Accordion>
	);
};

export default ThemeSetting;
