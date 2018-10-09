// Simple log -- we got here :0
console.log('source file');


// Demo some modern js features to test babel
const test = {
	...{ a: 19, b: 29 },
	c: 19
};

Promise.resolve(test).then(x => console.log(x));

for (let i in [1, 2, 3, 4, 5]) {
	console.log(i);
}

for (let i of ['a', 'b', 'c']) {
	console.log(i);
}

class TestClass {
	name = 'Public Name';

	#privateAge = 25;

	get [Symbol.toStringTag]() {
		return `TestClass(name=${this.name},privateAge=${this.#privateAge})`;
	}

}
let x = new TestClass();
console.log(x, x.name, x.privateAge, `${x}`);


// Lodash to demo code splitting + libs
import fp from 'lodash/fp';
fp.flow(
	fp.groupBy(x => x % 2 ? 'even' : 'odd'),
	fp.tap(x => console.log('Even/Odd: ', x)),
	fp.mapValues(fp.reduce((a, b) => a + b, 0)),
	fp.tap(x => console.log('Sums: ', x))
)([1, 2, 3, 4, 5]);


// Templates with pug
import pugTpl from './test.tpl.pug';
const elt = document.createElement('div');
elt.innerHTML = pugTpl();
document.body.appendChild(elt);


// CSS, which should get injected as a style or extracted with min in prod
import './index.css';

