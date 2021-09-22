import { mountTest } from '@/helpers/unitTest';
import { Lesson } from '..';

describe('Lesson', () => {
	mountTest(() => (
		<Lesson
			title="title"
			description="description"
			levelList={[
				{
					isCompleted: true,
				},
				{
					isCompleted: false,
				},
			]}
		/>
	));
	mountTest(() => <Lesson title="title" description="description" levelList={[]} />);
	mountTest(() => <Lesson title="title" description="description" levelList={[]} isActive />);
	mountTest(() => <Lesson title="title" description="description" levelList={[]} isShowIcon />);
});
