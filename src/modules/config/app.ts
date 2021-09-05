import { IDBPDatabase } from 'idb';

export const APP_STATUS = {
	ready: 'READY',
	loading: 'LOADNG',
};

export const APP_STORAGE = {
	name: 'storage',
	collections: {
		settings: 'settings',
		statistics: 'statistics',
	},
};

export type IAppProviderWrapper<T> = {
	status: string;
	entity: T;
	storage: null | IDBPDatabase;
};
