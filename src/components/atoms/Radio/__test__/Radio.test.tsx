import { mountTest } from '@/helpers/unitTest';
import Radio from '..';

describe('Radio', () => {
	mountTest(Radio);
	mountTest(() => <Radio>Radio</Radio>);
	mountTest(() => <Radio disabled>Radio</Radio>);
	mountTest(() => <Radio bordered>Radio</Radio>);
});
