import { APP_STATUS } from '@/constants/app';
import { INITAL_SETTINGS, SETTING_STORAGE } from '@/constants/settings';

import { clearLocalStorage, readLocalStorage, writeLocalStorage } from '@/helpers/localStorage';

import { ISettingsEntity, SettingsContext, settingsSchema } from '.';

type ILocalSettings = Record<keyof typeof INITAL_SETTINGS, any>;

export type ActionConvertSettings = (payload: { settings: ILocalSettings }) => ISettingsEntity;

export const actionConvertSettings: ActionConvertSettings = ({ settings }) => {
	let settingState = { ...INITAL_SETTINGS };
	let settingKey: keyof typeof settings;

	for (settingKey in settings) {
		if (
			Object.prototype.hasOwnProperty.call(settings, settingKey) &&
			Object.prototype.hasOwnProperty.call(settingState, settingKey)
		) {
			const settingOptionsState: any = settingState[settingKey].options;
			const setting = settings[settingKey];
			settingState[settingKey].selected = setting.selected;

			for (const optionKey in setting.options) {
				if (Object.prototype.hasOwnProperty.call(setting.options, optionKey)) {
					const option = setting.options[optionKey];

					if (
						!settingOptionsState[optionKey] ||
						(settingOptionsState[optionKey] && !settingOptionsState[optionKey].isDefault)
					) {
						settingOptionsState[optionKey].name = option.name;
						settingOptionsState[optionKey].isDefault = false;
						settingOptionsState[optionKey].value = option.value;
					}
				}
			}
		}
	}

	return settingState;
};

export type ActionResetSettings = () => void;

export const actionResetSettings: ActionResetSettings = () => {
	let settings: Partial<ILocalSettings> = {};
	let settingKey: keyof typeof INITAL_SETTINGS;

	for (settingKey in INITAL_SETTINGS) {
		if (Object.prototype.hasOwnProperty.call(INITAL_SETTINGS, settingKey)) {
			const primaryDefault = INITAL_SETTINGS[settingKey].primaryDefault;
			const options: any = INITAL_SETTINGS[settingKey].options;

			settings[settingKey] = {
				selected: primaryDefault,
				options: {},
			};

			let optionKey: string;
			for (optionKey in options) {
				if (Object.prototype.hasOwnProperty.call(options, optionKey)) {
					const option = options[optionKey];

					if (!option.isDefault) {
						settings[settingKey].options[optionKey] = {
							name: option.name,
							value: option.value,
						};
					}
				}
			}
		}
	}

	clearLocalStorage(SETTING_STORAGE);
	writeLocalStorage(SETTING_STORAGE, settings);
};

export type ActionGetSettings = () => void;

export const actionGetSettings: ActionGetSettings = () => {
	const localSettings = readLocalStorage(SETTING_STORAGE);

	try {
		settingsSchema.strictParser(localSettings);

		const settings = actionConvertSettings({ settings: localSettings });
		SettingsContext.setState(prevState => ({
			...prevState,
			status: APP_STATUS.ready,
			entity: settings,
		}));
	} catch (err) {
		actionResetSettings();
		SettingsContext.setState(prevState => ({ ...prevState, status: APP_STATUS.ready }));
	}
};

export type ActionToggleSetting = (payload: {
	settingName: keyof typeof INITAL_SETTINGS;
	settingSelected: string;
}) => {
	error: null | string;
};

export const actionToggleSetting: ActionToggleSetting = ({ settingName, settingSelected }) => {
	const localSettings: ILocalSettings = readLocalStorage(SETTING_STORAGE);

	try {
		settingsSchema.strictParser(localSettings);
		let settings = actionConvertSettings({ settings: localSettings });

		if (settings[settingName].options[settingSelected]) {
			localSettings[settingName].selected = settingSelected;
			settings[settingName].selected = settingSelected;

			SettingsContext.setState(prevState => ({ ...prevState, entity: settings }));
			writeLocalStorage(SETTING_STORAGE, localSettings);

			return { error: null };
		} else {
			throw new Error('error');
		}
	} catch (err) {
		actionResetSettings();
		SettingsContext.setState(prevState => ({ ...prevState, entity: INITAL_SETTINGS }));

		return { error: 'Something Wrong' };
	}
};

export type ActionUpdateSetting = (payload: {
	settingName: keyof typeof INITAL_SETTINGS;
	settingKey: string;
	settingValue: any;
}) => {
	error: null | string;
};

export const actionUpdateSetting: ActionUpdateSetting = ({
	settingName,
	settingKey,
	settingValue,
}) => {
	let localSettings: ILocalSettings = readLocalStorage(SETTING_STORAGE);

	try {
		settingsSchema.strictParser(localSettings);
		let settings = actionConvertSettings({ settings: localSettings });

		if (localSettings[settingName] && settings[settingName]?.options[settingKey]) {
			settingsSchema.children[settingName].children['options'].strictParser({ settingValue });

			localSettings[settingName].options[settingKey].name = settingValue.name;
			localSettings[settingName].options[settingKey].value = settingValue.value;

			settings[settingName].options[settingKey].name = settingValue.name;
			settings[settingName].options[settingKey].value = settingValue.value;

			SettingsContext.setState(prevState => ({ ...prevState, entity: settings }));
			writeLocalStorage(SETTING_STORAGE, localSettings);

			return { error: null };
		} else {
			throw new Error('error');
		}
	} catch (err) {
		actionResetSettings();
		SettingsContext.setState(prevState => ({ ...prevState, entity: INITAL_SETTINGS }));

		return { error: 'Something Wrong' };
	}
};
