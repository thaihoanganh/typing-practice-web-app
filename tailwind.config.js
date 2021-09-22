const customColor =
	colorName =>
	({ opacityVariable, opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${colorName}), ${opacityValue})`;
		}
		if (opacityVariable !== undefined) {
			return `rgba(var(${colorName}), var(${opacityVariable}, 1))`;
		}
		return `rgb(var(${colorName}))`;
	};

module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: false,
	theme: {
		extend: {},
		screens: {
			desktop: '1024px',
		},
		gridTemplateColumns: {
			5: 'repeat(5, minmax(0, 1fr))',
			60: 'repeat(60, minmax(0, 1fr))',
		},
		gridColumn: {
			'span-1': 'span 1 / span 1',
			'span-2': 'span 2 / span 2',
			'span-3': 'span 3 / span 3',
			'span-4': 'span 4 / span 4',
			'span-5': 'span 5 / span 5',
			'span-6': 'span 6 / span 6',
			'span-7': 'span 7 / span 7',
			'span-8': 'span 8 / span 8',
			'span-9': 'span 9 / span 9',
			'span-10': 'span 10 / span 10',
			'span-11': 'span 11 / span 11',
			'span-12': 'span 12 / span 12',
			'span-20': 'span 20 / span 20',
		},
		spacing: {
			0: '0',
			36: '36px',
			48: '48px',
			56: '56px',
			280: '280px',
			360: '360px',
			640: '640px',
			960: '960px',
			xs: '0.25rem',
			sm: '0.5rem',
			md: '1rem',
			lg: '2rem',
			xl: '4rem',
		},
		opacity: {
			0: '0',
			4: '0.04',
			8: '0.08',
			12: '0.12',
			16: '0.16',
			24: '0.24',
			32: '0.32',
			36: '0.36',
			60: '0.60',
			96: '0.96',
			100: '1',
		},
		colors: {
			primary: customColor('--primary'),
			'contrast-primary': customColor('--contrast-primary'),
			secondary: customColor('--secondary'),
			'contrast-secondary': customColor('--contrast-secondary'),
			danger: customColor('--danger'),
			'contrast-danger': customColor('--contrast-danger'),
		},
		fontSize: {
			heading: '2rem',
			subtitle: '1.5rem',
			body: '1rem',
			button: '0.875rem',
			caption: '0.75rem',
		},
	},
	variants: {
		extend: {
			margin: ['first', 'last'],
			padding: ['first', 'last'],
			borderColor: ['disabled', 'hover', 'focus', 'active'],
			backgroundColor: ['disabled', 'hover', 'focus', 'active'],
			backgroundOpacity: ['disabled', 'hover', 'focus', 'active'],
			textOpacity: ['disabled', 'hover', 'focus', 'active'],
			opacity: ['disabled', 'hover', 'focus', 'active'],
			pointerEvents: ['disabled', 'hover', 'focus', 'active'],
		},
	},
	plugins: [],
};
