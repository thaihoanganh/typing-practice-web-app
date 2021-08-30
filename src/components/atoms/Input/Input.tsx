import React, { forwardRef, useRef } from 'react';
import classNames from 'classnames';

export interface InputProps
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	fullWidth?: boolean;
	prefix?: any;
	suffix?: any;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{ className, disabled, fullWidth, onBlur, onFocus, prefix, style, suffix, ...otherProps },
		inputRef
	) => {
		const wrapperInputRef: React.LegacyRef<HTMLDivElement> = useRef(null);

		const onToggleFocus = () => {
			if (wrapperInputRef.current) {
				wrapperInputRef.current.classList.toggle('border-contrast-secondary');
				wrapperInputRef.current.classList.toggle('border-primary');
				wrapperInputRef.current.classList.toggle('border-opacity-96');
				wrapperInputRef.current.classList.toggle('hover:border-opacity-96');
			}
		};

		const handleFocusIn = (e: React.FocusEvent<HTMLInputElement>) => {
			if (onFocus) onFocus(e);
			onToggleFocus();
		};

		const handleFocusOut = (e: React.FocusEvent<HTMLInputElement>) => {
			if (onBlur) onBlur(e);
			onToggleFocus();
		};

		return (
			<div
				className={classNames(
					'inline-flex px-md py-sm border-2 rounded border-contrast-secondary border-opacity-12',
					!disabled && 'hover:border-opacity-24',
					fullWidth && 'w-full',
					className
				)}
				ref={wrapperInputRef}
			>
				{prefix && (
					<span
						className={classNames(
							'mr-sm text-body text-contrast-secondary',
							disabled && 'text-opacity-32'
						)}
					>
						{prefix}
					</span>
				)}
				<input
					className={classNames(
						'flex-grow focus:outline-none bg-secondary text-contrast-secondary',
						disabled && 'text-opacity-32'
					)}
					type="text"
					onFocus={handleFocusIn}
					onBlur={handleFocusOut}
					disabled={disabled}
					ref={inputRef}
					{...otherProps}
				/>
				{suffix && (
					<span
						className={classNames(
							'ml-sm text-body-1 text-contrast-secondary',
							disabled && 'text-opacity-32'
						)}
					>
						{suffix}
					</span>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';

export default Input;
