import produce from 'immer';

import { APP_STATUS, APP_STORAGE, SETTINGS } from '@/modules/config';
import { SettingsContext, settingsSchema } from '.';

type LocalSettings = Record<keyof typeof SETTINGS, any>;

export function actionConvertSettings(settings: LocalSettings) {
	let settingState = { ...SETTINGS };

	let settingKey: keyof typeof settings;
	for (settingKey in settings) {
		if (
			Object.prototype.hasOwnProperty.call(settings, settingKey) &&
			Object.prototype.hasOwnProperty.call(settingState, settingKey)
		) {
			const settingOptionState: any = settingState[settingKey].options;
			const setting = settings[settingKey];
			settingState[settingKey].selected = setting.selected;

			for (const optionKey in setting.options) {
				if (Object.prototype.hasOwnProperty.call(setting.options, optionKey)) {
					const option = setting.options[optionKey];

					if (
						!settingOptionState[optionKey] ||
						(settingOptionState[optionKey] && !settingOptionState[optionKey].isDefault)
					) {
						settingOptionState[optionKey].name = option.name;
						settingOptionState[optionKey].isDefault = false;
						settingOptionState[optionKey].value = option.value;
					}
				}
			}
		}
	}

	return settingState;
}

export async function actionResetSettings() {
	const { storage } = SettingsContext.getState();
	const settings: Partial<LocalSettings> = {};

	let settingKey: keyof typeof SETTINGS;
	for (settingKey in SETTINGS) {
		if (Object.prototype.hasOwnProperty.call(SETTINGS, settingKey)) {
			const primaryDefault = SETTINGS[settingKey].primaryDefault;
			const options: any = SETTINGS[settingKey].options;

			settings[settingKey] = {};
			settings[settingKey].selected = primaryDefault;
			settings[settingKey].options = {};

			let optionKey: string;
			for (optionKey in options) {
				if (Object.prototype.hasOwnProperty.call(options, optionKey)) {
					const option = options[optionKey];

					if (!option.isDefault) {
						settings[settingKey].options[optionKey] = {};
						settings[settingKey].options[optionKey].name = option.name;
						settings[settingKey].options[optionKey].value = option.value;
					}
				}
			}
		}
	}

	await storage?.clear(APP_STORAGE.collections.settings);
	await storage?.add(APP_STORAGE.collections.settings, settings, 'version_1');
}

export async function actionGetSettings() {
	const { storage } = SettingsContext.getState();

	try {
		const localSetting = await storage?.get(APP_STORAGE.collections.settings, 'version_1');
		settingsSchema.strictParser(localSetting);

		const settings = actionConvertSettings(localSetting);
		SettingsContext.setState(prevState => ({
			...prevState,
			status: APP_STATUS.ready,
			entity: settings,
		}));
	} catch (error) {
		actionResetSettings();
		SettingsContext.setState(prevState => ({ ...prevState, status: APP_STATUS.ready }));
	}
}

export async function actionToggleSetting(
	settingName: keyof typeof SETTINGS,
	settingSelected: string
) {
	const { storage } = SettingsContext.getState();

	try {
		const settings = await storage?.get(APP_STORAGE.collections.settings, 'version_1');
		SettingsContext.setState(
			produce(draft => {
				if (settings && draft.entity[settingName]?.options[settingSelected]) {
					draft.entity[settingName].selected = settingSelected;
					settings[settingName].selected = settingSelected;
					storage?.put(APP_STORAGE.collections.settings, settings, 'version_1');
				}
			})
		);
	} catch (error: any) {
		throw error.format();
	}
}

export async function actionUpdateSetting(
	settingName: keyof typeof SETTINGS,
	settingKey: string,
	settingValue: any
) {
	const { storage } = SettingsContext.getState();

	try {
		const settings = await storage?.get(APP_STORAGE.collections.settings, 'version_1');
		settingsSchema.strictParser(settings);

		if (settings[settingName]?.options[settingKey]) {
			settingsSchema.children[settingName].children['options'].strictParser({ settingValue });

			SettingsContext.setState(
				produce(draft => {
					draft.entity[settingName].options[settingKey].name = settingValue.name;
					draft.entity[settingName].options[settingKey].value = settingValue.value;

					settings[settingName].options[settingKey] = settingValue;
					storage?.put(APP_STORAGE.collections.settings, settings, 'version_1');
				})
			);
		}
	} catch (error: any) {
		throw error.format();
	}
}
