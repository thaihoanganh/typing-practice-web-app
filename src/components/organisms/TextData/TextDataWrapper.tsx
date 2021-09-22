import React from 'react';
import classNames from 'classnames';

import classes from './style.module.scss';

export interface TextDataWrapperProps {
	column?: number;
}

export const TextDataWrapper: React.FC<TextDataWrapperProps> = ({ children, column }) => {
	return <div className={classNames(classes['text-wrapper-wrapper'])}>{children}</div>;
};

export default TextDataWrapper;
