import Color from 'color';

export const getContrastColor = (colorValue: string) => {
	return Color(colorValue).isLight() ? '#000000' : '#FFFFFF';
};

export const setGlobalColors = (primary: string, secondary: string) => {
	const regex = new RegExp(/^#(?:[0-9a-f]{3}){1,2}$/i);
	if (regex.test(primary) && regex.test(secondary)) {
		const rootStyle = document.documentElement.style;
		rootStyle.setProperty('--primary', Color(primary).array().join(','));
		rootStyle.setProperty('--contrast-primary', Color(getContrastColor(primary)).array().join(','));

		rootStyle.setProperty('--secondary', Color(secondary).array().join(','));
		rootStyle.setProperty(
			'--contrast-secondary',
			Color(getContrastColor(secondary)).array().join(',')
		);
	}
};
