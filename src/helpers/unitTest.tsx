import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

export const mountTest = (Component: React.ComponentType) => {
	describe(`mount and unmount`, () => {
		it(`component could be updated and unmounted without errors`, () => {
			const wrapper = mount(<Component />);
			expect(() => {
				wrapper.setProps({});
				wrapper.unmount();
			}).not.toThrow();
		});
	});
};
