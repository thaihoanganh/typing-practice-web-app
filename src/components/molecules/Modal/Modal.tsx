import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

export interface ModalProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	isOpen?: boolean;
	onClickOutside?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
	className,
	children,
	isOpen = false,
	onClickOutside,
	...otherProps
}) => {
	const ref: any = useRef();
	const refModal = useRef<HTMLDivElement>(null);

	const [state, setState] = useState({
		isOpen: isOpen,
	});

	useEffect(() => {
		if (!document.getElementById('root-modal')) {
			const rootModal = document.createElement('div');
			rootModal.setAttribute('id', 'root-modal');
			document.getElementsByTagName('body')[0].append(rootModal);
		}
	}, []);

	useEffect(() => {
		if (isOpen) {
			ref.current = document.querySelector('#root-modal');
		}
		setState(prevState => ({ ...prevState, isOpen: isOpen }));
	}, [isOpen]);

	useEffect(() => {
		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);
		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const listener = (event: any) => {
		if (!refModal.current || refModal.current.contains(event.target)) {
			return;
		}
		onClickOutside && onClickOutside();
	};

	const OverLay = (
		<div className="fixed inset-0 bg-contrast-secondary bg-opacity-12">
			<div className={classNames('w-640 mx-auto mt-xl', className)} ref={refModal} {...otherProps}>
				{children}
			</div>
		</div>
	);

	return state.isOpen ? createPortal(OverLay, ref.current) : null;
};

export default Modal;
