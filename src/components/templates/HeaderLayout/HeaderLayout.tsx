import React from 'react';

export interface HeaderLayoutProps {
	logo: React.ReactNode;
	menu: React.ReactNode;
}

export const HeaderLayout: React.FC<HeaderLayoutProps> = ({ logo, menu }) => {
	return (
		<div className="flex items-center justify-between h-full px-sm desktop:px-md">
			<div>{logo}</div>
			<div>{menu}</div>
		</div>
	);
};

export default HeaderLayout;
