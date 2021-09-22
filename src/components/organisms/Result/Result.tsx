import React from 'react';
import classNames from 'classnames';

export interface ResultProps {
	label: string;
	value: string;
	isCompleted: boolean;
}

export const Result: React.FC<ResultProps> = ({ label, value, isCompleted }) => {
	return (
		<div
			className={classNames(
				'flex justify-between p-md border border-opacity-12 rounded',
				isCompleted ? 'border-contrast-secondary' : 'border-danger'
			)}
		>
			<p className="text-body text-contrast-secondary text-opacity-60">{label}</p>
			<p className="text-body text-contrast-secondary text-opacity-96 font-semibold">{value}</p>
		</div>
	);
};

export default Result;
