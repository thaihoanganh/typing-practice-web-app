import React from 'react';
import Head from 'next/head';

import { PracticeProvider } from '@/modules/practice';

import { LessonController, LessonList } from '@/features/lesson';
import { PracticeData, PracticeStatistics } from '@/features/practice';

const HomePage: React.FC = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Tập gõ phím</title>
			</Head>
			<PracticeProvider>
				<div className="p-sm desktop:p-md">
					<div className="mt-md">
						<PracticeData />
					</div>
					<div className="mt-md">
						<LessonController />
					</div>
					<div className="mt-md">
						<PracticeStatistics />
					</div>
					<div className="mt-md">
						<LessonList />
					</div>
				</div>
			</PracticeProvider>
		</React.Fragment>
	);
};

export default HomePage;
