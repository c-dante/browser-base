import R from 'ramda';
// import env from 'environment';
import './main.scss';

// Build root
const root = document.querySelector('body').appendChild(
	document.createElement('div')
);

// State container
// import createFurnice from './inferno-middleware';
// import { createStore, applyMiddleware } from 'redux';
// import createLogger from 'redux-logger';

// const act = (type, payload, error) => ({
// 	type, payload, error
// });

// const store = createStore(
// 	(state, act) => {
// 		return state;
// 	},
// 	undefined,
// 	applyMiddleware(
// 		createLogger({ collapsed: true })
// 	)
// );

// @todo: how to nicely nest? Do I want to re-make every node every time w/ inferno-hyperscript?
// Right now I'm thinking ngRedux, but with hot component bindings? Maybe?
// @todo: registry of components?
// const furnice = createFurnice(store);

import Inferno from 'inferno';
import h from 'inferno-hyperscript';

const factory = R.curry((errorNode, registry, name, props) =>
	R.pathOr(errorNode, [name], registry)(props)
);

const registry = {};
const makeComponent = factory(
	() => h('div.error', {}, ['ERROR']),
	registry
);
Object.assign(registry, {
	list: (props) => h('ul', {}, props.items.map(props.render)),

// Nested components?
	main: (props) => h('div.main', {}, [
		h('h1', {}, ['Main']),
		makeComponent('list', {
			items: props.items,
			render: item => h('li', {}, [item])
		})
	])
});



// Derp
let x = 0;
const items = [];
setInterval(() => {
	items.push(x++);
	if (items.length > 10) {
		items.shift();
	}
	Inferno.render(makeComponent('main', {
		items
	}), root);
}, 10);






// import createElement from 'inferno-create-element';


// @tood: huh
// const umount = furnice(
// 	// Get state function
// 	(state) => ({
// 		name: 'Frank',
// 		age: 21
// 	}),
// 	// Component
// 	createElement(({ name, age }) => h('span', {
// 		// component hooks
// 		onComponentWillMount() {
// 			console.debug('Mount?')
// 		},
// 		onComponentDidMount() {
// 			console.debug('Mount!', domNode);
// 		},
// 		onComponentShouldUpdate(last, next) {
// 			console.debug('Should', last, next);
// 		},
// 		onComponentWillUpdate(last, next) {
// 			console.debug('Will', last, next);
// 		},
// 		onComponentDidUpdate(last, next) {
// 			console.debug('Did', last, next);
// 		},
// 		onComponentWillUnmount() {
// 			console.debug('umount');
// 		}
// 	}, [
// 		'My name is: ', name, ' and my age is: ', age
// 	])),
// 	// Parent to render
// 	root
// );

// Kick off with an event?
// store.dispatch(act('INIT', {
// 	name: 'Frank',
// 	age: 20
// }));

// console.debug(umount);
