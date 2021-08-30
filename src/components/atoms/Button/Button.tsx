import React, { forwardRef } from 'react';
import classNames from 'classnames';

const COLORS = {
	primary: [
		'bg-primary disabled:bg-opacity-32',
		'bg-contrast-primary bg-opacity-0 hover:bg-opacity-8 focus:bg-opacity-24 active:bg-opacity-32',
		'text-contrast-primary',
	],
	secondary: [
		'bg-primary bg-opacity-8',
		'bg-primary bg-opacity-0 hover:bg-opacity-8 focus:bg-opacity-24 active:bg-opacity-32',
		'text-primary',
	],
	danger: [
		'bg-danger bg-opacity-8',
		'bg-danger bg-opacity-0 hover:bg-opacity-8 focus:bg-opacity-24 active:bg-opacity-32',
		'text-danger',
	],
};

export interface ButtonProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	color?: keyof typeof COLORS;
	fullWitdh?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			children,
			color = 'primary',
			disabled = false,
			fullWitdh,
			type = 'submit',
			...otherProps
		},
		buttonRef
	) => {
		return (
			<button
				className={classNames(
					'relative px-md py-sm rounded disabled:pointer-events-none',
					COLORS[color][0],
					fullWitdh && 'w-full',
					className
				)}
				type={type}
				disabled={false}
				ref={buttonRef}
				{...otherProps}
			>
				<div
					className={classNames('absolute inset-0 rounded', COLORS[color][1])}
					aria-hidden="true"
				/>
				<span
					className={classNames(
						'text-button font-medium',
						COLORS[color][2],
						disabled && color !== 'primary' && 'text-opacity-32'
					)}
				>
					{children}
				</span>
			</button>
		);
	}
);

Button.displayName = 'Button';

export default Button;
