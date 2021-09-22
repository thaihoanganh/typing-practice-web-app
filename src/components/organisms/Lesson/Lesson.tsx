import React, { useLayoutEffect, useRef } from 'react';
import classNames from 'classnames';

export interface LessonProps {
	title: string;
	description: string;
	isActive?: boolean;
	isShowIcon?: boolean;
	levelList: {
		isCompleted: boolean;
	}[];
}

export const Lesson: React.FC<LessonProps> = ({
	title,
	description,
	isActive,
	isShowIcon = true,
	levelList,
}) => {
	const lessonHeadRef: any = useRef(null);
	const lessonBodyRef: any = useRef(null);

	useLayoutEffect(() => {
		if (isShowIcon) {
			lessonHeadRef.current.style.width = lessonBodyRef.current.offsetHeight - 16 + 'px';
			lessonHeadRef.current.style.height = lessonBodyRef.current.offsetHeight - 16 + 'px';
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="flex items-center">
			{isShowIcon && (
				<div
					className={classNames(
						'flex items-center justify-center rounded bg-opacity-8',
						isActive ? 'bg-primary' : 'bg-contrast-secondary'
					)}
					ref={lessonHeadRef}
				>
					<svg
						className={classNames(
							'fill-current',
							isActive ? 'text-primary text-opacity-96' : 'text-contrast-secondary text-opacity-60'
						)}
						width="32"
						height="32"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						{isActive ? (
							<path d="M13.3334 22L21.3334 16L13.3334 10V22ZM16.0001 2.66669C8.64008 2.66669 2.66675 8.64002 2.66675 16C2.66675 23.36 8.64008 29.3334 16.0001 29.3334C23.3601 29.3334 29.3334 23.36 29.3334 16C29.3334 8.64002 23.3601 2.66669 16.0001 2.66669ZM16.0001 26.6667C10.1201 26.6667 5.33341 21.88 5.33341 16C5.33341 10.12 10.1201 5.33335 16.0001 5.33335C21.8801 5.33335 26.6667 10.12 26.6667 16C26.6667 21.88 21.8801 26.6667 16.0001 26.6667Z" />
						) : (
							<path d="M29.3334 16C29.3334 23.36 23.3601 29.3334 16.0001 29.3334C8.64008 29.3334 2.66675 23.36 2.66675 16C2.66675 14.7657 2.84428 13.5797 3.16168 12.4485C3.31117 11.9156 3.8894 11.6462 4.4098 11.8345L5.02693 12.0577C5.54866 12.2464 5.812 12.823 5.67155 13.3598C5.45112 14.2022 5.33341 15.0873 5.33341 16C5.33341 21.88 10.1201 26.6667 16.0001 26.6667C21.8801 26.6667 26.6667 21.88 26.6667 16C26.6667 10.12 21.8801 5.33335 16.0001 5.33335C15.0888 5.33335 14.212 5.45068 13.3746 5.67044C12.8373 5.81145 12.2601 5.54736 12.0721 5.02468L11.8485 4.40332C11.6603 3.88014 11.9342 3.30012 12.4704 3.15295C13.5985 2.84331 14.7792 2.66669 16.0001 2.66669C23.3601 2.66669 29.3334 8.64002 29.3334 16ZM7.33341 5.33335C6.22675 5.33335 5.33341 6.22669 5.33341 7.33335C5.33341 8.44002 6.22675 9.33335 7.33341 9.33335C8.44008 9.33335 9.33341 8.44002 9.33341 7.33335C9.33341 6.22669 8.44008 5.33335 7.33341 5.33335ZM13.6667 21.3334C14.219 21.3334 14.6667 20.8856 14.6667 20.3334V11.6667C14.6667 11.1144 14.219 10.6667 13.6667 10.6667H13.0001C12.4478 10.6667 12.0001 11.1144 12.0001 11.6667V20.3334C12.0001 20.8856 12.4478 21.3334 13.0001 21.3334H13.6667ZM19.0001 21.3334C19.5524 21.3334 20.0001 20.8856 20.0001 20.3334V11.6667C20.0001 11.1144 19.5524 10.6667 19.0001 10.6667H18.3334C17.7811 10.6667 17.3334 11.1144 17.3334 11.6667V20.3334C17.3334 20.8856 17.7811 21.3334 18.3334 21.3334H19.0001Z" />
						)}
					</svg>
				</div>
			)}
			<div className="flex-grow ml-md first:ml-0 p-sm first:p-0" ref={lessonBodyRef}>
				<div>
					<h3 className="text-body text-contrast-secondary text-opacity-60 font-semibold">
						{title}
					</h3>
					<h4 className="mt-xs text-caption text-contrast-secondary text-opacity-60 font-semibold">
						{description}
					</h4>
				</div>
				<div className="flex mt-sm">
					{levelList.map((level, levelIndex) => (
						<div
							key={levelIndex}
							className={classNames(
								'flex-grow h-sm ml-sm first:ml-0 rounded-sm cursor-pointer',
								level.isCompleted
									? 'bg-primary bg-opacity-60'
									: 'bg-contrast-secondary bg-opacity-12'
							)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Lesson;
