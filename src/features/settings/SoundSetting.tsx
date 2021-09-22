import React, { useContext } from 'react';
import { SettingsContext, actionToggleSetting } from '@/modules/settings';

import Radio from '@/components/atoms/Radio';
import Accordion from '@/components/molecules/Accordion';

export const SoundSetting: React.FC = () => {
	const { options, selected } = useContext(SettingsContext.initial).entity.sound;

	const toggleSoundSetting = (settingSelected: string) => {
		actionToggleSetting({
			settingName: 'sound',
			settingSelected,
		});
	};

	return (
		<Accordion
			icon={
				<svg
					className="fill-current text-contrast-secondary text-opacity-96"
					width="32"
					height="32"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M4 13.3333V18.6667C4 19.4 4.6 20 5.33333 20H9.33333L13.72 24.3867C14.56 25.2267 16 24.6267 16 23.44V8.54666C16 7.35999 14.56 6.75999 13.72 7.59999L9.33333 12H5.33333C4.6 12 4 12.6 4 13.3333ZM22 16C21.9997 14.8828 21.6875 13.7879 21.0986 12.8386C20.5097 11.8892 19.6674 11.1232 18.6667 10.6267V21.36C20.64 20.3867 22 18.36 22 16ZM18.6667 5.93332V6.19999C18.6667 6.70666 19 7.14666 19.4667 7.33332C22.9067 8.70666 25.3333 12.08 25.3333 16C25.3333 19.92 22.9067 23.2933 19.4667 24.6667C18.9867 24.8533 18.6667 25.2933 18.6667 25.8V26.0667C18.6667 26.9067 19.5067 27.4933 20.28 27.2C24.8 25.48 28 21.12 28 16C28 10.88 24.8 6.51999 20.28 4.79999C19.5067 4.49332 18.6667 5.09332 18.6667 5.93332Z" />
				</svg>
			}
			isOpen
			title="Âm thanh"
		>
			<React.Fragment>
				<div className="flex flex-wrap">
					{Object.keys(options).map((settingKey: string) => (
						<div key={settingKey} className="pt-md mr-md">
							<Radio
								name="sound"
								defaultChecked={selected === settingKey}
								onClick={() => toggleSoundSetting(settingKey)}
								bordered
							>
								{options[settingKey].name}
							</Radio>
						</div>
					))}
				</div>
			</React.Fragment>
		</Accordion>
	);
};

export default SoundSetting;
