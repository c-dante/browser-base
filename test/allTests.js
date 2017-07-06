// This is webpacks `require.context` plugin that during compile
// gets a list of the files in the directory matching the regex recursively
console.log(document.querySelector("#mocha"))

/* global require */
const testRequire = require.context('../', true, /\.\/(src|test).*\.spec\.js$/);

// Require everything and put it all into scope
testRequire.keys().map(testRequire);