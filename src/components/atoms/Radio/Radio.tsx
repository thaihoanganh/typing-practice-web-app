import React, { forwardRef } from 'react';
import classNames from 'classnames';

import classes from './style.module.scss';

export interface RadioProps
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	bordered?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
	({ className, children, disabled, bordered, onChange, ...otherProps }, ref) => {
		return (
			<label
				className={classNames(
					classes['radio-wrapper'],
					disabled && classes['radio-wrapper_disabled'],
					bordered && classes['radio-wrapper_bordered']
				)}
			>
				<input
					type="radio"
					className={classNames(classes['radio'])}
					disabled={disabled}
					ref={ref}
					{...otherProps}
				/>
				<span className={classNames(classes['radio-inner'])} />
				{children && <span className={classNames(classes['radio-label'])}>{children}</span>}
			</label>
		);
	}
);

Radio.displayName = 'Radio';

export default Radio;
