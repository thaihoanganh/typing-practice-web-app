import React from 'react';

export interface MainLayoutProps {
	header: React.ReactNode;
	content: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ header, content }) => {
	return (
		<div className="min-h-screen bg-secondary">
			<div className="h-56">
				<div className="desktop:w-960 h-full mx-auto p-md">{header}</div>
			</div>
			<div className="desktop:w-960 mx-auto p-md">{content}</div>
		</div>
	);
};

export default MainLayout;
