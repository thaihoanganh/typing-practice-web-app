import { mountTest } from '@/helpers/unitTest';
import Checkbox from '..';

describe('Checkbox', () => {
	mountTest(Checkbox);
	mountTest(() => <Checkbox>Checkbox</Checkbox>);
	mountTest(() => <Checkbox disabled>Checkbox</Checkbox>);
});
