import React from 'react';
import Head from 'next/head';

import { PracticeProvider } from '@/modules/practice';

import { PracticeData, PracticeStatistics } from '@/features/practice';
import { SpeedTestController } from '@/features/speedTest';

const SpeedTestPage: React.FC = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Kiểm tra tốc độ gõ</title>
			</Head>
			<PracticeProvider>
				<div className="p-sm desktop:p-md">
					<div className="mt-md">
						<PracticeData />
					</div>
					<div className="mt-md">
						<SpeedTestController />
					</div>
					<div className="mt-lg">
						<PracticeStatistics />
					</div>
				</div>
			</PracticeProvider>
		</React.Fragment>
	);
};

export default SpeedTestPage;
