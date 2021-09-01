import React, { useRef, useState } from 'react';
import classNames from 'classnames';

export interface AccordionProps {
	icon: React.ReactNode;
	isOpen?: boolean;
	title: string;
}

const Accordion: React.FC<AccordionProps> = ({ children, icon, isOpen, title }) => {
	const accordionBodyRef: any = useRef(null);
	const [state, setState] = useState({ isOpen });

	const handleClick = () => {
		setState(prevState => ({ isOpen: !prevState.isOpen }));
		accordionBodyRef.current.style.height = state.isOpen
			? '0px'
			: accordionBodyRef.current.scrollHeight + 'px';
	};

	return (
		<div>
			<div className="flex items-center py-sm">
				<div className="w-48">{icon}</div>
				<div className="flex-grow text-contrast-secondary text-subtitle">{title}</div>
				<button className="cursor-pointer" onClick={handleClick}>
					<svg
						className={classNames(
							'fill-current text-contrast-secondary text-opacity-60 duration-300',
							state.isOpen && 'transform rotate-90'
						)}
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M6.93758 19.5229C6.54705 19.9134 6.54705 20.5466 6.93758 20.9371L7.29336 21.2929C7.68389 21.6834 8.31705 21.6834 8.70758 21.2929L17.2934 12.7071C17.6839 12.3166 17.6839 11.6834 17.2934 11.2929L8.70758 2.70711C8.31705 2.31658 7.68389 2.31658 7.29336 2.70711L6.93758 3.06289C6.54705 3.45342 6.54705 4.08658 6.93758 4.47711L13.7534 11.2929C14.1439 11.6834 14.1439 12.3166 13.7534 12.7071L6.93758 19.5229Z" />
					</svg>
				</button>
			</div>

			<div className="overflow-hidden h-0 duration-300" ref={accordionBodyRef}>
				<div className="py-sm">{children}</div>
			</div>
		</div>
	);
};

export default Accordion;
