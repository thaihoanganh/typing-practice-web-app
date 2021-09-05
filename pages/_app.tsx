import React from 'react';
import type { AppProps } from 'next/app';

import { APP_STATUS } from '@/modules/config';
import { SettingsProvider, SettingsContext } from '@/modules/settings';

import Nav, { NavItem } from '@/components/molecules/Nav';
import Splash from '@/components/organisms/Splash';
import MainLayout from '@/components/templates/MainLayout';
import HeaderLayout from '@/components/templates/HeaderLayout';
import '../public/styles/globals.scss';

const Header: React.FC = () => {
	return (
		<HeaderLayout
			logo={
				<div>
					<h1 className="text-subtitle text-primary font-semibold">Tapgophim</h1>
				</div>
			}
			menu={
				<Nav>
					<NavItem href="/">
						<svg
							className="fill-current"
							width="21"
							height="14"
							viewBox="0 0 21 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M18.334 0H2.33398C1.23398 0 0.343984 0.9 0.343984 2L0.333984 12C0.333984 13.1 1.23398 14 2.33398 14H18.334C19.434 14 20.334 13.1 20.334 12V2C20.334 0.9 19.434 0 18.334 0ZM9.33398 3H11.334V5H9.33398V3ZM9.33398 6H11.334V8H9.33398V6ZM6.33398 3H8.33398V5H6.33398V3ZM6.33398 6H8.33398V8H6.33398V6ZM5.33398 8H3.33398V6H5.33398V8ZM5.33398 5H3.33398V3H5.33398V5ZM14.334 12H6.33398V10H14.334V12ZM14.334 8H12.334V6H14.334V8ZM14.334 5H12.334V3H14.334V5ZM17.334 8H15.334V6H17.334V8ZM17.334 5H15.334V3H17.334V5Z" />
						</svg>
						<h2 className="hidden desktop:inline ml-sm">Trang chủ</h2>
					</NavItem>
					<NavItem href="/typing-test">
						<svg
							className="fill-current"
							width="19"
							height="21"
							viewBox="0 0 19 21"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M12.334 0H6.33398V2H12.334V0ZM16.364 6.39L17.784 4.97C17.354 4.46 16.884 3.98 16.374 3.56L14.954 4.98C13.404 3.74 11.454 3 9.33398 3C4.36398 3 0.333984 7.03 0.333984 12C0.333984 16.97 4.35398 21 9.33398 21C14.314 21 18.334 16.97 18.334 12C18.334 9.88 17.594 7.93 16.364 6.39ZM9.33398 19C5.46398 19 2.33398 15.87 2.33398 12C2.33398 8.13 5.46398 5 9.33398 5C13.204 5 16.334 8.13 16.334 12C16.334 15.87 13.204 19 9.33398 19ZM9.01398 14H3.68398C4.25398 15.62 5.50398 16.92 7.09398 17.56L6.98398 17.5L9.01398 14ZM14.984 10C14.414 8.4 13.204 7.11 11.644 6.46L9.59398 10H14.984ZM7.94398 17.83C8.39398 17.94 8.85398 18 9.33398 18C10.674 18 11.904 17.55 12.904 16.81L10.794 12.91L7.94398 17.83ZM4.88398 7.99C3.92398 9.05 3.33398 10.46 3.33398 12C3.33398 12.34 3.37398 12.67 3.42398 13H8.14398L4.88398 7.99ZM13.674 16.13C14.704 15.06 15.334 13.6 15.334 12C15.334 11.66 15.294 11.33 15.244 11H10.904L13.674 16.13ZM10.664 6.15C10.234 6.06 9.79398 6 9.33398 6C7.93398 6 6.64398 6.49 5.62398 7.29L7.94398 10.85L10.664 6.15Z" />
						</svg>
						<h2 className="hidden desktop:inline ml-sm">Kiểm tra</h2>
					</NavItem>
					<NavItem href="/settings">
						<svg
							className="fill-current"
							width="19"
							height="20"
							viewBox="0 0 19 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M16.8071 10.936C16.8431 10.636 16.8671 10.324 16.8671 9.99999C16.8671 9.67599 16.8431 9.36399 16.7951 9.06399L18.8231 7.47999C19.0031 7.33599 19.0511 7.07199 18.9431 6.86799L17.0231 3.54399C16.9031 3.32799 16.6511 3.25599 16.4351 3.32799L14.0471 4.28799C13.5431 3.90399 13.0151 3.59199 12.4271 3.35199L12.0671 0.807994C12.0311 0.567994 11.8271 0.399994 11.5871 0.399994H7.7471C7.5071 0.399994 7.3151 0.567994 7.2791 0.807994L6.9191 3.35199C6.3311 3.59199 5.7911 3.91599 5.2991 4.28799L2.9111 3.32799C2.6951 3.24399 2.4431 3.32799 2.3231 3.54399L0.403099 6.86799C0.283099 7.08399 0.331099 7.33599 0.523099 7.47999L2.5511 9.06399C2.5031 9.36399 2.4671 9.68799 2.4671 9.99999C2.4671 10.312 2.4911 10.636 2.5391 10.936L0.511099 12.52C0.331099 12.664 0.283099 12.928 0.391099 13.132L2.3111 16.456C2.4311 16.672 2.6831 16.744 2.8991 16.672L5.2871 15.712C5.7911 16.096 6.3191 16.408 6.9071 16.648L7.2671 19.192C7.3151 19.432 7.5071 19.6 7.7471 19.6H11.5871C11.8271 19.6 12.0311 19.432 12.0551 19.192L12.4151 16.648C13.0031 16.408 13.5431 16.084 14.0351 15.712L16.4231 16.672C16.6391 16.756 16.8911 16.672 17.0111 16.456L18.9311 13.132C19.0511 12.916 19.0031 12.664 18.8111 12.52L16.8071 10.936ZM9.6671 13.6C7.6871 13.6 6.0671 11.98 6.0671 9.99999C6.0671 8.01999 7.6871 6.39999 9.6671 6.39999C11.6471 6.39999 13.2671 8.01999 13.2671 9.99999C13.2671 11.98 11.6471 13.6 9.6671 13.6Z" />
						</svg>
						<h2 className="hidden desktop:inline ml-sm">Cài đặt</h2>
					</NavItem>
				</Nav>
			}
		/>
	);
};

function App({ Component, pageProps }: AppProps) {
	return (
		<SettingsProvider>
			<SettingsContext.initial.Consumer>
				{settingsValue => (
					<MainLayout
						header={<Header />}
						content={<Component {...pageProps} />}
						loading={
							<div className="fixed inset-0 flex items-center justify-center">
								<Splash />
							</div>
						}
						isLoading={APP_STATUS.loading === settingsValue.status}
					/>
				)}
			</SettingsContext.initial.Consumer>
		</SettingsProvider>
	);
}

export default App;
