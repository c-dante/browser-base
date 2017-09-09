'use strict';
module.exports = {
	settings: {
		'import/resolver': 'webpack',
		'import/extensions': ['.js'],
	},
	extends: [
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
			experimentalObjectRestSpread: true
		}
	},
	rules: {
		// 'no-undef': [1, 'always'],
		'prefer-const': [1],

		// use tabs only
		'indent': [2, 'tab', {
			SwitchCase: 1,
			VariableDeclarator: 1,
			//outerIIFEBody: 1,
			CallExpression: {
			  arguments: 1,
			},
			FunctionDeclaration: {
				parameters: 1,
				body: 1
			},
			FunctionExpression: {
				parameters: 1,
				body: 1
			}
		}],
		'no-tabs': 0,

		// Prefer individual symbols
		'import/prefer-default-export': 0,

		// use one space anywhere we allow space
		'no-multi-spaces': [2],

		// no spaces before a functions parameters.
		// good => `function add(a, b){ ... }`
		// bad => `function add (a, b){ ... }`
		'space-before-function-paren': [2, {
			anonymous: 'always',
			named: 'never',
			asyncArrow: 'always'
		}],

		// error if we are reassigning function parameters,
		// allow reassigning props of parameters
		'no-param-reassign': [2, { 'props': false }],

		// warn when you don't dangle a comma in a multiline object or array def
		'comma-dangle': [1, 'always-multiline'],

		// use whatever block padding you want
		'padded-blocks': [0],

		// only provide a radix to parseInt if it is not 10
		radix: [2, 'as-needed'],

		// set max line length to a more reasonable number
		'max-len': [2, 120, {
			ignoreComments: true,
			ignoreUrls: true,
			tabWidth: 1,
		}],

		// ensure named imports coupled with named exports
		// https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md#when-not-to-use-it
		'import/named': 0,

		// ensure default import coupled with default export
		// https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/default.md#when-not-to-use-it
		'import/default': 0,

		// https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/namespace.md
		'import/namespace': 0,

		// warn on accessing default export property names that are also named exports
		// https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md
		'import/no-named-as-default-member': 0,

		// warn on accessing default export property names that are also named exports
		// https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
		'import/no-named-as-default': 0,

		// disallow use of console
		'no-console': 1,
	},
	env: {
		"mocha": true,
		"browser": true,
		"es6": true,
		"node": true,
	},
	globals: {}
};
