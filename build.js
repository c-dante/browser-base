const wp = require('webpack');
const merge = require('merge-dirs').default;
const config = require('./webpack.config');
const del = require('del');

console.log('Clearing bin');
del(['./bin']).then(paths =>
	new Promise((res, rej) =>
		wp(config, (err, stats) => {
			if (err) {
				console.error(err);
			}
			if (stats) {
				console.log(stats.toString({
					chunks: true,
					colors: true,
					hash: true,
					timings: true,
					assets: true,
					modules: true,
					children: true
				}));
			}
			console.log('Merging assets');
			merge('./assets', './bin', 'ask');
		})
	)
)

