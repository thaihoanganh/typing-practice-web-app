import React, { useState, useEffect } from 'react';

export interface MainLayoutProps {
	content: React.ReactNode;
	header: React.ReactNode;
	loading: React.ReactNode;
	isLoading: boolean;
}

export interface IMainLayoutState {
	isLoading: boolean;
	timeStart: number;
}

const MINIMUM_LOAD_TIME = 1500;

const MainLayout: React.FC<MainLayoutProps> = ({ header, content, loading, isLoading }) => {
	const [state, setState] = useState<IMainLayoutState>(() => ({
		isLoading,
		timeStart: new Date().getTime(),
	}));

	useEffect(() => {
		let timer: any;
		const getTimeNow = new Date().getTime();

		if (!isLoading) {
			if (getTimeNow - state.timeStart < MINIMUM_LOAD_TIME) {
				timer = setTimeout(() => {
					setState(prevState => ({ ...prevState, isLoading: false }));
				}, MINIMUM_LOAD_TIME - (getTimeNow - state.timeStart));
			} else {
				setState(prevState => ({ ...prevState, isLoading: false }));
			}
		}

		return () => clearTimeout(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	return (
		<div className="min-h-screen top-0 bg-secondary">
			<div className="sticky z-20 top-0 h-56 bg-secondary">
				<div className="desktop:w-960 h-full mx-auto">{header}</div>
			</div>
			<div className="desktop:w-960 mx-auto">{state.isLoading ? loading : content}</div>
		</div>
	);
};

export default MainLayout;
