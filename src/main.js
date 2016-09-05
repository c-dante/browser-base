import './main.scss';

// Build the router
import { createRouter } from 'router5';
import browserPlugin from 'router5/plugins/browser';

const route = (name, path, opts = {}) => ({ path, name, ...opts });

// Define some routes to test
const routes = [
	route('root', '/'),
];

const router = createRouter(routes, {
	defaultRoute: 'root',
}).usePlugin(browserPlugin({
	useHash: true,
	hashPrefix: '!',
}));

// Build state from some defaults
import { makeState, defaultMiddleware } from './util/state';
import { combineReducers } from 'redux';
import { router5Middleware, router5Reducer } from 'redux-router5';


const middleware = defaultMiddleware.concat(router5Middleware(router));

// Base reducer -- publiching route only
const rootReducer = combineReducers({
	route: router5Reducer,
});

// The State object
const state = makeState(rootReducer, middleware);

// Kick off the router
router.start();

console.debug('State => ', state);
