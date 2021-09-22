import react, { useMemo, useState, useEffect } from 'react';

import { APP_STATUS } from '@/constants/app';
import { INITIAL_SETTINGS } from '@/constants/settings';

import { createAppContext } from '@/helpers/context';

import { ISettingsEntity, actionGetSettings } from '.';
import { setGlobalColors } from '@/helpers/color';

export interface ISettingsState {
	status: string;
	entity: ISettingsEntity;
}

export const SettingsContext = createAppContext<ISettingsState>();

export const SettingsProvider: React.FC = ({ children }) => {
	const [state, setState] = useState<ISettingsState>({
		status: APP_STATUS.loading,
		entity: INITIAL_SETTINGS,
	});

	useEffect(() => {
		actionGetSettings();
	}, []);

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
