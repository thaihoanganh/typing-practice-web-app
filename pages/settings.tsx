import React from 'react';
import Head from 'next/head';

import {
	SoundSetting,
	ThemeSetting,
	LessonLevelSetting,
	TypingTestLimitSetting,
} from '@/features/settings';
import TypingTestText from '@/features/settings/TypingTestText';

const Settings: React.FC = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Cài đặt</title>
			</Head>
			<div className="p-sm desktop:p-md">
				<div className="my-md">
					<div className="pb-md border-b border-contrast-secondary border-opacity-12">
						<h2 className="text-subtitle text-contrast-secondary text-opacity-60">Cài đặt chung</h2>
					</div>
					<div>
						<SoundSetting />
						<ThemeSetting />
					</div>
				</div>
				<div className="my-md">
					<div className="pb-md border-b border-contrast-secondary border-opacity-12">
						<h2 className="text-subtitle text-contrast-secondary text-opacity-60">
							Luyện tập gõ phím
						</h2>
					</div>
					<div>
						<LessonLevelSetting />
					</div>
				</div>
				<div className="my-md">
					<div className="pb-md border-b border-contrast-secondary border-opacity-12">
						<h2 className="text-subtitle text-contrast-secondary text-opacity-60">
							Kiểm tra tốc độ gõ
						</h2>
					</div>
					<div>
						<TypingTestLimitSetting />
						<TypingTestText />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Settings;
