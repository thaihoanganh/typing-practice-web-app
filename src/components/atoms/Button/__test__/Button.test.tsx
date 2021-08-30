import { mountTest } from '@/helpers/unitTest';
import Button from '..';

describe('Button', () => {
	mountTest(Button);
	mountTest(() => <Button>Button</Button>);
	mountTest(() => <Button disabled>Button</Button>);
	mountTest(() => <Button fullWitdh>Button</Button>);
	mountTest(() => <Button color="primary">Button</Button>);
	mountTest(() => <Button color="secondary">Button</Button>);
	mountTest(() => <Button color="danger">Button</Button>);
});
