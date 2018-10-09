console.log('source file');

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

