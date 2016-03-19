'use strict';

module.exports = {
	extends: 'airbnb/base',
	root: true,
	rules: {
		// 'no-undef': [1, 'always'],
		'padded-blocks': [1, 'always'],
		indent: [1, 'tab'],
		'prefer-const': [1]
	},
	env: {
		browser: true,
		mocha: true
	}
};
