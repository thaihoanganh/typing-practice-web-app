import React from 'react';

export const Nav: React.FC = ({ children }) => {
	return <ul className="inline-flex items-center h-full max-h-56">{children}</ul>;
};

export default Nav;
