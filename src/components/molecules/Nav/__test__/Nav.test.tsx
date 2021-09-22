import { mountTest } from '@/helpers/unitTest';
import Nav, { NavItem } from '..';

describe('Modal', () => {
	mountTest(() => <Nav />);
	mountTest(() => (
		<Nav>
			<NavItem href="/#1">NavItem 1</NavItem>
			<NavItem href="/#2">NavItem 2</NavItem>
		</Nav>
	));
});
