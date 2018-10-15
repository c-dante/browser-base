module.exports = {
	parser: false,
	/*
	 * So, after some digging, it looks like CSS is still a god damn mess.
	 *
	 * SugarSS? Sass? Less? How many parsers do we need....?
	 *
	 * cssnext is dead? PostCSS? Compiler chain? What?
	 * So, it's babel, but "stage 0" is "why is this not in the spec...?"
	 *
	 * We'll get there, I'm sure... (no, not sure.)
	 *
	 *
	 * TL;DR:
	 * Stack plugins and work with wild abandon.
	 * I give you the features to start with.
	 * You do you...
	 *
	 * Ones that might be useful:
	 * https://github.com/postcss/postcss-url
	 */
	plugins: {
		'postcss-nested': {},
		'postcss-import': {},
		'postcss-preset-env': {},
	},
};

