import React, { useState, useEffect, useMemo } from 'react';
import { openDB } from 'idb';
import { createAppContext } from '@/helpers/context';
import { setGlobalColors } from '@/helpers/color';
import { IAppProviderWrapper, APP_STATUS, APP_STORAGE, SETTINGS } from '@/modules/config';
import { ISettingsEntity, actionGetSettings } from '.';

export type ISettingProviderState = IAppProviderWrapper<ISettingsEntity>;

export const SettingsContext = createAppContext<ISettingProviderState>();

export const SettingsProvider: React.FC = ({ children }) => {
	const [state, setState] = useState<ISettingProviderState>({
		status: APP_STATUS.loading,
		entity: SETTINGS,
		storage: null,
	});

	useEffect(() => {
		openDB(APP_STORAGE.name, 1, {
			upgrade(storage) {
				storage.createObjectStore(APP_STORAGE.collections.settings);
			},
		}).then(storage => {
			setState(prevState => ({ ...prevState, storage }));
		});
	}, []);

	useEffect(() => {
		if (state.storage !== null) {
			actionGetSettings();
		}
	}, [state.storage]);

	useEffect(() => {
		if (APP_STATUS.ready === state.status) {
			const { primary, secondary } = state.entity.theme.options[state.entity.theme.selected].value;
			setGlobalColors(primary, secondary);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.entity.theme.selected]);

	const exportValue = useMemo(() => ({ state, setState }), [state]);

	return <SettingsContext.Provider value={exportValue}>{children}</SettingsContext.Provider>;
};

export default SettingsProvider;
