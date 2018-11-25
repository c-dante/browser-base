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
		// Note on ordering: They claim declaration order, which is awkward for objects...
		// Order matters in this object!!!
		// @see: https://github.com/michael-ciniawsky/postcss-load-config#ordering
		'postcss-import': {}, // import plugin first!!! this is so other plugins are seen after import.
		'postcss-nested': {}, // nesting next, so our imports are followed.
		'postcss-preset-env': {},
	},
};

