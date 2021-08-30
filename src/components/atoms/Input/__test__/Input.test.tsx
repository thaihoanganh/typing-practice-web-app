import { mountTest } from '@/helpers/unitTest';
import Input from '..';

describe('Input', () => {
	mountTest(Input);
	mountTest(() => <Input disabled />);
	mountTest(() => <Input fullWidth />);
	mountTest(() => <Input prefix="prefix" />);
	mountTest(() => <Input suffix="suffix" />);
});
