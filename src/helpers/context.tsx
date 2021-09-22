import React, { createContext } from 'react';

export function createAppContext<T>(initialState?: Partial<T>): {
	initial: React.Context<T>;
	Provider: (props: {
		value: {
			state: T;
			setState: React.Dispatch<React.SetStateAction<T>>;
		};
		children?: React.ReactNode;
	}) => any;
	getState: () => T;
	setState: React.Dispatch<React.SetStateAction<T>>;
} {
	const Context = createContext({ ...initialState } as T);
	let getContextValue: T;
	let setContextValue: React.Dispatch<React.SetStateAction<T>>;

	const ProviderChildrenWrapper: React.FC = ({ children }) => {
		getContextValue = (Context as any)._currentValue;
		return <React.Fragment>{children}</React.Fragment>;
	};

	return {
		initial: Context,
		// eslint-disable-next-line react/display-name
		Provider: ({ value: { state, setState }, children }) => {
			setContextValue = setState;
			return (
				<Context.Provider value={state}>
					<ProviderChildrenWrapper>{children}</ProviderChildrenWrapper>
				</Context.Provider>
			);
		},
		getState: () => Object.freeze(getContextValue),
		setState: value => setContextValue(value),
	};
}
