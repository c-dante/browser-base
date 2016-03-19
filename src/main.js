require('./main.less');

console.log('Hello World.');

// Jade example
var exampleJade = require('./example.jade');

document.body.innerHTML = exampleJade({
	name: 'Frank',
	age: Math.floor(1 + Math.random() * 50)
});
