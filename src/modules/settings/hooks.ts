import { useContext } from 'react';
import { SettingsContext } from '.';

export const useSettings = () => {
	const { entity, status } = useContext(SettingsContext.initial);

	return {
		settings: entity,
		settingsStatus: status,
	};
};
