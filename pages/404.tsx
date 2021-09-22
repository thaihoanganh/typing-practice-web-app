import React from 'react';
import Head from 'next/head';

import Splash from '@/components/organisms/Splash';

const PageNotFound: React.FC = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Error 404</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Splash />
		</React.Fragment>
	);
};

export default PageNotFound;
