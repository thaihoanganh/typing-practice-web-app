import classNames from 'classnames';
import React from 'react';

const LAYOUT_KEYBOARD = [
	{
		keycap: '`',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: '1',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: '2',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: '3',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: '4',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: '5',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: '6',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: '7',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: '8',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: '9',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: '0',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: '-',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: '=',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'backspace',
		classes: 'col-span-8 justify-end',
	},
	{
		keycap: 'tab',
		classes: 'col-span-6 justify-start',
	},
	{
		keycap: 'Q',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'W',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'E',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'R',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'T',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'Y',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'U',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'I',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'O',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'P',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: '[',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: ']',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: '\\',
		classes: 'col-span-6 justify-center',
	},
	{
		keycap: 'caps lock',
		classes: 'col-span-7 justify-start',
	},
	{
		keycap: 'A',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'S',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'D',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'F',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'G',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'H',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'J',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'K',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'L',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: ';',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: "'",
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'enter',
		classes: 'col-span-9 justify-end',
	},
	{
		keycap: 'shift',
		classes: 'col-span-9 justify-start',
	},
	{
		keycap: 'Z',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'X',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'C',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'V',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'B',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'N',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'M',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: ',',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: '.',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: '/',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'shift',
		classes: 'col-span-7 justify-end',
	},
	{
		keycap: null,
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'ctrl',
		classes: 'col-span-5 justify-start',
	},
	{
		keycap: 'fn',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: null,
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'alt',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: '\u00A0',
		classes: 'col-span-20',
	},
	{
		keycap: 'alt',
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: null,
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: 'ctrl',
		classes: 'col-span-7 justify-end',
	},
	{
		keycap: null,
		classes: 'col-span-4 justify-center',
	},
	{
		keycap: null,
		classes: 'col-span-4 justify-center',
	},
];

export interface KeyboardProps {}

export const Keyboard: React.FC<KeyboardProps> = () => {
	return (
		<div className="grid grid-cols-60 gap-sm">
			{LAYOUT_KEYBOARD.map((value, index) => (
				<div
					className={classNames(
						'inline-flex items-center h-48 px-xs desktop:px-sm rounded-sm bg-contrast-secondary text-contrast-secondary text-caption desktop:text-body bg-opacity-4 text-opacity-60',
						value.classes
					)}
					key={index}
				>
					{value.keycap}
				</div>
			))}
		</div>
	);
};

export default Keyboard;
