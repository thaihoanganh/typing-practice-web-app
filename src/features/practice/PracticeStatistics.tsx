import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

import { getDangerColor } from '@/helpers/color';

import { SettingsContext } from '@/modules/settings';
import { PracticeContext } from '@/modules/practice';

import Keyboard from '@/components/organisms/Keyboard';
import Result from '@/components/organisms/Result';

interface LessonStatisticsChartProps {
	colors: {
		primary: string;
		secondary: string;
	};
	graph: [number, number, number][];
}

const LessonStatisticsChart: React.FC<LessonStatisticsChartProps> = ({
	colors: { primary, secondary },
	graph,
}) => {
	const chartRef: any = useRef(null);
	const [state, setState] = useState({
		isRendered: false,
	});

	useEffect(() => {
		if (!state.isRendered && graph.length && chartRef.current) {
			setState(prevState => ({ ...prevState, isRendered: true }));

			const ctx = chartRef.current.getContext('2d');
			new Chart(ctx, {
				type: 'line',
				data: {
					labels: graph.map(value => value[0]),
					datasets: [
						{
							data: graph.map(value => value[1]),
							label: 'Tốc độ gõ',
							borderWidth: 1,
							pointBorderWidth: 0.5,
							borderColor: primary,
							backgroundColor: primary,
						},
						{
							data: graph.map(value => value[2]),
							label: 'Số ký tự gõ lỗi',
							borderWidth: 1,
							pointBorderWidth: 0.5,
							borderColor: getDangerColor(secondary),
							backgroundColor: getDangerColor(secondary),
						},
					],
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					interaction: {
						mode: 'index',
						intersect: false,
					},
					plugins: {
						legend: {
							display: false,
						},
					},
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [graph]);

	return <canvas className="w-full h-full" ref={chartRef} />;
};

export const PracticeStatistics: React.FC = () => {
	const {
		entity: { theme },
	} = useContext(SettingsContext.initial);

	const {
		entity: {
			statistics: { totalTime, wordsPerMinute, accuracy, graph },
		},
	} = useContext(PracticeContext.initial);

	const ref: React.LegacyRef<HTMLDivElement> = useRef(null);

	useLayoutEffect(() => {
		if (ref.current) {
			ref.current.style.height = ref.current.offsetHeight + 'px';
		}
	}, []);

	return (
		<div ref={ref}>
			{graph.length ? (
				<div className="flex h-full">
					<div className="flex justify-between flex-col w-full desktop:w-280 h-full">
						<Result label="Thời gian gõ" value={`${totalTime} giây`} isCompleted />
						<Result label="Tốc độ gõ" value={`${wordsPerMinute} WPM`} isCompleted />
						<Result label="Độ chính xác" value={`${accuracy * 100} %`} isCompleted />
					</div>
					<div className="flex-grow ml-md">
						<LessonStatisticsChart colors={theme.options[theme.selected].value} graph={graph} />
					</div>
				</div>
			) : (
				<Keyboard />
			)}
		</div>
	);
};

export default PracticeStatistics;
