import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

export const defaultMiddleware = [
	createLogger({
		collapsed: true,
	}),
	thunk,
];

export const makeState = (
	reducer,
	middleware = defaultMiddleware,
	initialState = {}
) => createStore(reducer, initialState, applyMiddleware(...middleware));

