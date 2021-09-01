import React, { useRef, useState, useEffect } from 'react';

export const Splash: React.FC = () => {
	const splashRef: any = useRef(null);
	const [keyActive, setKeyActive] = useState(0);

	const getKeyRandom = (min: number, max: number) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		const keyRandom = Math.floor(Math.random() * (max - min) + min);

		if (keyRandom === keyActive) {
			if (keyActive < max) {
				return keyActive + 1;
			} else {
				return 0;
			}
		} else {
			return keyRandom;
		}
	};

	useEffect(() => {
		let timer: any;
		if (splashRef.current) {
			timer = setTimeout(() => {
				const keyRandom = getKeyRandom(0, 12);
				setKeyActive(keyRandom);
			}, 350);

			splashRef.current.childNodes[keyActive].classList.toggle('bg-contrast-secondary');
		}

		return () => {
			clearTimeout(timer);
			if (splashRef.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				splashRef.current.childNodes[keyActive].classList.toggle('bg-contrast-secondary');
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keyActive]);

	return (
		<div
			className="grid grid-cols-5 gap-md w-360 p-md rounded-md border-8 border-contrast-secondary border-opacity-60"
			ref={splashRef}
		>
			<div className="h-36 rounded-sm border-8 border-contrast-secondary border-opacity-60 duration-75" />
			<div className="h-36 rounded-sm border-8 border-contrast-secondary border-opacity-60 duration-75" />
			<div className="h-36 rounded-sm border-8 border-contrast-secondary border-opacity-60 duration-75" />
			<div className="h-36 rounded-sm border-8 border-contrast-secondary border-opacity-60 duration-75" />
			<div className="h-36 rounded-sm border-8 border-contrast-secondary border-opacity-60 duration-75" />
			<div className="h-36 rounded-sm border-8 border-contrast-secondary border-opacity-60 duration-75" />
			<div className="h-36 rounded-sm border-8 border-contrast-secondary border-opacity-60 duration-75" />
			<div className="h-36 rounded-sm border-8 border-contrast-secondary border-opacity-60 duration-75" />
			<div className="h-36 rounded-sm border-8 border-contrast-secondary border-opacity-60 duration-75" />
			<div className="h-36 rounded-sm border-8 border-contrast-secondary border-opacity-60 duration-75" />
			<div className="h-36 rounded-sm border-8 border-contrast-secondary border-opacity-60 duration-75" />
			<div className="col-span-3 h-36 rounded-sm border-8 border-contrast-secondary border-opacity-60 duration-75" />
			<div className="h-36 rounded-sm border-8 border-contrast-secondary border-opacity-60 duration-75" />
		</div>
	);
};

export default Splash;
