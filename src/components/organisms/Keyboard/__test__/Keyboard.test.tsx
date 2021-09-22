import { mountTest } from '@/helpers/unitTest';
import { Keyboard } from '..';

describe('Keyboard', () => {
	mountTest(() => <Keyboard keycapActive="A" />);
	mountTest(() => <Keyboard keycapActive={'\u00A0'} />);
	mountTest(() => <Keyboard keycapActive="" />);
});
