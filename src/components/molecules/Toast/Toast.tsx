import React from 'react';
import { render } from 'react-dom';
import classnames from 'classnames';

interface ToastProps {
	message: React.ReactNode;
	description?: React.ReactNode;
	duration?: number;
	isError?: boolean;
	onClick?: () => void;
}
const ToastItem: React.FC<ToastProps> = ({ message, description, isError, onClick }) => {
	const onHandleClick = () => {
		onClick && onClick();
	};

	return (
		<div
			style={{
				width: 220,
			}}
			className="overflow-hidden relative m-md rounded bg-secondary cursor-pointer"
			onClick={onHandleClick}
		>
			<div
				className={classnames(
					'absolate p-sm bg-opacity-8',
					isError ? 'bg-danger' : 'bg-contrast-secondary'
				)}
			>
				<div className={classnames('flex', isError ? 'text-danger' : 'text-contrast-secondary')}>
					<div className="flex items-center">
						{isError ? (
							<svg
								className="fill-current"
								height="24px"
								viewBox="0 0 24 24"
								width="24px"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M12 7c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1zm-.01-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-3h-2v-2h2v2z" />
							</svg>
						) : (
							<svg
								className="fill-current"
								height="24px"
								viewBox="0 0 24 24"
								width="24px"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M0 0h24v24H0V0z" fill="none" />
								<path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71L18 16z" />
							</svg>
						)}
					</div>
					<div className="ml-sm">
						<h3 className="text-body-1 font-semibold">{message}</h3>
						{description && <p className="text-body-2">{description}</p>}
					</div>
				</div>
			</div>
		</div>
	);
};

export const Toast = (props: ToastProps) => {
	let rootToast: any = document.getElementById('root-toast');
	if (!rootToast) {
		rootToast = document.createElement('div');
		rootToast.setAttribute('id', 'root-toast');
		rootToast.className = 'fixed top-0 top-0 right-0 flex flex-col-reverse';
		document.getElementsByTagName('body')[0].append(rootToast);
	}

	const toastItemWrapper = document.createElement('div');
	rootToast.appendChild(toastItemWrapper);

	const onHandleClose = () => {
		rootToast.removeChild(toastItemWrapper);
	};

	setTimeout(() => onHandleClose(), props.duration || 7500);

	render(<ToastItem {...props} />, toastItemWrapper);
};

export default Toast;
