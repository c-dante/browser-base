import env from 'environment';

import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

export const defaultMiddleware = [
	thunk,
];

if (env.logging) {
	defaultMiddleware.push(createLogger({
		collapsed: true,
	}));
}

export const makeState = (
	reducer,
	middleware = defaultMiddleware,
	initialState = {}
) => createStore(reducer, initialState, applyMiddleware(...middleware));

