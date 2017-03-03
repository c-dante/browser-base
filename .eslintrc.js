'use strict';
module.exports = {
	settings: {
		'import/resolver': 'webpack',
		'import/extensions': ['.js'],
	},
	extends: [
		'airbnb/base',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	root: true,
	parserOptions: {
		ecmaVersion: 6,
		ecmaFeatures: {
			experimentalObjectRestSpread: true
		}
	},
	rules: {
		// 'no-undef': [1, 'always'],
		'prefer-const': [1],

		// use tabs only
		indent: [2, 'tab', { SwitchCase: 1 }],
		'no-tabs': [0],

		// Allow individual symbols / no default export
		// Imports do not need to be at the top of the file
		// New line not required after import
		'import/prefer-default-export': [0],
		'import/first': [0],
		'import/newline-after-import': [0],

		// use one space anywhere we allow space
		'no-multi-spaces': [2],

		// no spaces before a functions parameters.
		// good => `function add(a, b){ ... }`
		// bad => `function add (a, b){ ... }`
		'space-before-function-paren': [2],

		// error if we are reassigning function parameters,
		// allow reassigning props of parameters
		'no-param-reassign': [2, { 'props': false }],

		// warn when you don't dangle a comma in a multiline object or array def
		'comma-dangle': [1, 'always-multiline'],

		// use whatever block padding you want
		'padded-blocks': [0],

		// only provide a radix to parseInt if it is not 10
		radix: [2, 'as-needed'],

		// Allow maths
		'no-plusplus': [0],

		// set max line length and configure to allow normal things
		'max-len': [2, {
			code: 120,
			tabWidth: 2,
			ignoreComments: true,
			ignoreUrls: true,
			ignoreStrings: true,
			ignoreTemplateLiterals: true,
			ignoreRegExpLiterals: true,
		}],
	},
	env: {
		mocha: true,
		browser: true,
	}
};
