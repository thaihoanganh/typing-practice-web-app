import React, { useContext, useState } from 'react';
import produce from 'immer';

import {
	ILessonLevelSchema,
	SettingsContext,
	actionToggleSetting,
	actionUpdateSetting,
} from '@/modules/settings';
import { actionSetLesson } from '@/modules/lesson';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Radio from '@/components/atoms/Radio';
import Accordion from '@/components/molecules/Accordion';
import Toast from '@/components/molecules/Toast';

interface LessonLevelSettingState {
	isEdited: boolean;
	option: ILessonLevelSchema;
}

export const LessonLevelSetting: React.FC = () => {
	const {
		lessonLanguage,
		lessonLevel: { options, selected },
	} = useContext(SettingsContext.initial).entity;

	const [state, setState] = useState<LessonLevelSettingState>({
		isEdited: false,
		option: {
			name: options[selected].name,
			value: options[selected].value,
		},
	});

	const handleToggleSetting = (settingSelected: string) => {
		actionSetLesson({
			language: lessonLanguage.options[lessonLanguage.selected].value,
			level: options[settingSelected].value,
		});
		actionToggleSetting({
			settingName: 'lessonLevel',
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
				produce((draft: any) => {
					draft.isEdited = true;
					if (name === 'name') {
						draft.option.name = value;
					} else if (!isNaN(value as any)) {
						if (name === 'accuracyMin' || name === 'accuracyMax') {
							if (value <= 100) draft.option.value[name] = Number(value / 100);
						} else {
							draft.option.value[name] = Number(value);
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
				settingName: 'lessonLevel',
				settingKey: selected,
				settingValue: JSON.parse(JSON.stringify(state.option)),
			});

			if (error) {
				Toast({ message: 'Cập nhật thất bại' });
			} else {
				Toast({ message: 'Cập nhật thành công' });
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
					<path d="M18.9016 13.593C18.8017 13.3739 18.6261 13.1983 18.407 13.0984L17.9937 12.9098C17.2139 12.5539 17.2139 11.4461 17.9937 11.0902L18.407 10.9017C18.6261 10.8017 18.8017 10.6261 18.9016 10.407L19.0902 9.99374C19.4461 9.21391 20.5539 9.21392 20.9098 9.99374L21.0983 10.407C21.1983 10.6261 21.3739 10.8017 21.593 10.9017L22.0063 11.0902C22.7861 11.4461 22.7861 12.5539 22.0063 12.9098L21.593 13.0984C21.3739 13.1983 21.1983 13.3739 21.0983 13.593L20.9098 14.0063C20.5539 14.7861 19.4461 14.7861 19.0902 14.0063L18.9016 13.593ZM4.42357 16.6729C4.77941 17.4528 5.88725 17.4528 6.24309 16.6729L6.43168 16.2596C6.53163 16.0406 6.70726 15.865 6.92631 15.765L7.3396 15.5764C8.11942 15.2206 8.11942 14.1128 7.3396 13.7569L6.92631 13.5683C6.70726 13.4684 6.53163 13.2927 6.43168 13.0737L6.24309 12.6604C5.88725 11.8806 4.77941 11.8806 4.42357 12.6604L4.23498 13.0737C4.13503 13.2927 3.9594 13.4684 3.74035 13.5683L3.32706 13.7569C2.54724 14.1128 2.54724 15.2206 3.32706 15.5764L3.74035 15.765C3.9594 15.865 4.13503 16.0406 4.23498 16.2596L4.42357 16.6729ZM10.4222 9.98546C10.7767 10.7693 11.8899 10.7693 12.2445 9.98546L12.6312 9.1303C12.7314 8.90883 12.9088 8.73142 13.1303 8.63125L13.9855 8.24448C14.7693 7.88995 14.7693 6.77673 13.9855 6.4222L13.1303 6.03542C12.9088 5.93525 12.7314 5.75785 12.6312 5.53637L12.2445 4.68121C11.8899 3.89734 10.7767 3.89734 10.4222 4.68121L10.0354 5.53637C9.93525 5.75785 9.75784 5.93525 9.53637 6.03542L8.68121 6.4222C7.89733 6.77673 7.89733 7.88995 8.68121 8.24448L9.53637 8.63125C9.75784 8.73142 9.93525 8.90883 10.0354 9.1303L10.4222 9.98546ZM5.2923 26.6256C5.68306 27.0164 6.31668 27.0161 6.7071 26.6251L13.2929 20.0283C13.6833 19.6372 14.3169 19.6369 14.7077 20.0277L18.5835 23.9035C18.9903 24.3103 19.6557 24.2908 20.0379 23.8609L30.0401 12.6114C30.3919 12.2157 30.3743 11.6143 29.9998 11.2399L29.5363 10.7763C29.1296 10.3696 28.4644 10.389 28.082 10.8188L20.038 19.8613C19.6556 20.291 18.9904 20.3104 18.5837 19.9037L14.7076 16.0276C14.3169 15.6369 13.6833 15.6371 13.2929 16.0281L4.70616 24.6262C4.31608 25.0168 4.31629 25.6496 4.70663 26.04L5.2923 26.6256Z" />
				</svg>
			}
			isOpen
			title="Cấp độ luyện tập"
		>
			<React.Fragment>
				<div className="flex flex-wrap">
					{Object.keys(options).map((settingKey: string) => (
						<div key={settingKey} className="pt-md mr-md">
							<Radio
								name="lessonLevel"
								defaultChecked={selected === settingKey}
								onClick={() => handleToggleSetting(settingKey)}
								bordered
							>
								{options[settingKey].name}
							</Radio>
						</div>
					))}
				</div>

				<form className="mt-lg" autoComplete="off" onSubmit={handleUpdateSetting}>
					<div className="mt-lg">
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

						<div className="flex flex-wrap">
							<div className="flex flex-wrap w-full mt-md">
								<div className="flex-grow w-full desktop:w-auto">
									<h3 className="text-body text-contrast-secondary text-opacity-60 font-semibold">
										Tốc độ gõ tối thiểu
									</h3>
									<Input
										className="mt-xs"
										name="wordsPerMinuteMin"
										disabled={options[selected].isDefault}
										value={state.option.value.wordsPerMinuteMin}
										suffix="WPM"
										fullWidth
										onChange={handleChange}
									/>
								</div>
								<div className="flex-grow mt-md desktop:mt-0 desktop:ml-md">
									<h3 className="text-body text-contrast-secondary text-opacity-60 font-semibold">
										Tốc độ gõ tối đa
									</h3>
									<Input
										className="mt-xs"
										name="wordsPerMinuteMax"
										disabled={options[selected].isDefault}
										value={state.option.value.wordsPerMinuteMax}
										suffix="WPM"
										fullWidth
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className="flex flex-wrap w-full mt-md">
								<div className="flex-grow w-full desktop:w-auto">
									<h3 className="text-body text-contrast-secondary text-opacity-60 font-semibold">
										Độ chính xác tối thiểu
									</h3>
									<Input
										className="mt-xs"
										name="accuracyMin"
										disabled={options[selected].isDefault}
										value={Math.floor(state.option.value.accuracyMin * 100)}
										suffix="%"
										fullWidth
										onChange={handleChange}
									/>
								</div>
								<div className="flex-grow mt-md desktop:mt-0 desktop:ml-md">
									<h3 className="text-body text-contrast-secondary text-opacity-60 font-semibold">
										Độ chính xác tối đa
									</h3>
									<Input
										className="mt-xs"
										name="accuracyMax"
										disabled={options[selected].isDefault}
										value={Math.floor(state.option.value.accuracyMax * 100)}
										suffix="%"
										fullWidth
										onChange={handleChange}
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
			</React.Fragment>
		</Accordion>
	);
};

export default LessonLevelSetting;
