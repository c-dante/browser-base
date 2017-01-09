import './main.scss';
import 'webcomponents.js';

const failFn = (x) => console.error('FAILURE', x);
const root = {
	testCallback: (x) => console.debug('testCallback', x),
	newCallback: (x) => console.debug('newCallback', x),
	failFn,
};


class TestElt extends HTMLElement {
	constructor() {
		super();

		console.debug(this);
	}

	static get observedAttributes() {
		return ['callback'];
	}

	attributeChangedCallback(attr, oldValue, newValue) {
		(root[newValue] || failFn)(' :D ');
	}
}

customElements.define('test-elt', TestElt);
