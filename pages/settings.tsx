import React from 'react';

import { SoundSetting, ThemeSetting } from '@/features/settings';

const Settings: React.FC = () => {
	return (
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
		</div>
	);
};

export default Settings;
