import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';

import classes from './style.module.scss';

export interface TextDataInputProps
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	isFocus: boolean;
	isShowDraft?: boolean;
	isTyping?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextDataInput = forwardRef<HTMLInputElement, TextDataInputProps>(
	({ isFocus, isShowDraft = true, isTyping, ...otherProps }, ref) => {
		return (
			<div className="absolute inset-0">
				<div
					className={classNames(
						'absolute flex justify-center items-end w-full h-full p-md opacity-0 text-contrast-secondary',
						!isFocus && classes['text-data-input-overlay']
					)}
				>
					{isTyping ? 'Nhấn vào đây để tiếp tục gõ' : 'Nhấn vào đây để bắt đầu gõ'}
				</div>
				<input
					type="text"
					className={classNames(
						'absolute bottom-0 w-full h-full p-sm outline-none opacity-0',
						isFocus && isShowDraft && classes['text-data-input__show-draft']
					)}
					autoComplete="off"
					ref={ref}
					{...otherProps}
				/>
			</div>
		);
	}
);

TextDataInput.displayName = 'TextDataInput';

export default TextDataInput;
