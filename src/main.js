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


const btn = document.getElementById('goBtn');
const elt = document.querySelector('test-elt');
let i = 1;
const keys = Object.keys(root);
btn.addEventListener('click', () => {
	const nextCallback = keys[i];
	i = (i + 1) % keys.length;
	elt.setAttribute('callback', nextCallback);
});
