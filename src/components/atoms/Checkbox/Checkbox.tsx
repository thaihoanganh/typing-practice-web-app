import React, { forwardRef } from 'react';
import classNames from 'classnames';

import classes from './style.module.scss';

export interface CheckboxProps
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ className, children, disabled, ...otherProps }, inputRef) => {
		return (
			<label
				className={classNames(
					classes['checkbox-wrapper'],
					disabled && classes['checkbox-wrapper_disabled']
				)}
			>
				<input
					type="checkbox"
					className={classNames(classes['checkbox'])}
					disabled={disabled}
					ref={inputRef}
					{...otherProps}
				/>
				<span className={classNames(classes['checkbox-inner'])} />
				{children && <span className={classNames(classes['checkbox-label'])}>{children}</span>}
			</label>
		);
	}
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
