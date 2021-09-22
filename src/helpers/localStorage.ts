export const clearLocalStorage = (key: string) => {
	try {
		return window.localStorage.removeItem(key);
	} catch (err) {
		console.log('localStorage write error', err);
	}
};

export const readLocalStorage = (key: string) => {
	try {
		const storedData = window.localStorage.getItem(key);
		if (null === storedData) {
			return null;
		}

		return JSON.parse(storedData) || {};
	} catch (err) {
		console.log('localStorage read error', err);
	}
};

export const writeLocalStorage = (key: string, value: any) => {
	try {
		return window.localStorage.setItem(key, JSON.stringify(value));
	} catch (err) {
		console.log('localStorage write error', err);
	}
};
