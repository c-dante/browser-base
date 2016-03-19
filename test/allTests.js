'use strict';

const testRequire = require.context('../src', true, /\.spec\.js$/);

console.log(testRequire.keys());

testRequire.keys().map(testRequire);
