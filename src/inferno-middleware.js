import { toPairs, identical, all } from 'ramda';
import Inferno from 'inferno';
import createElement from 'inferno-create-element';

const objCompare = (prev, next) =>
	all(
		([key, val]) => identical(prev[key], val),
		toPairs(next)
	);

export default (store) => (getState, component, parent) => {
	let lastState = {};
	return store.subscribe(() => {

		const newState = getState(store.getState());

		if (!objCompare(lastState, newState)) {
			lastState = newState;

			Inferno.render(
				createElement(component, newState),
				parent
			);
		}
	});
};
