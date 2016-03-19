'use strict'

var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
	context: path.resolve(process.cwd(), 'src'),
	entry: {
		main: ['./index.jade', './main.js']
	},
	output: {
		path: path.resolve(process.cwd(), 'bin'),
		filename: '[name].bundle.js',
		chunkFilename: '[id].js'
	},
	debug: true,
	devtool: 'cheap-source-map',
	resolveLoader: {
		root: process.cwd() + '/node_modules/'
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel', exclude: '/(node_modules|bower_components)/' },
			{ test: /\.tpl\.jade$/, loaders: ['html?removeRedundantAttributes=false', 'jade-html'], exclude: '/(node_modules|bower_components)/' },
			{ test: /[^\.][^t][^p][^l]\.jade$/, loaders: ['file?name=[name].html', 'jade-html'], exclude: '/(node_modules|bower_components)/' },
			{ test: /\.less$/, loaders: ['style', 'css', 'postcss', 'less'], exclude: '/(node_modules|bower_components)/' }
		]
	},
	postcss: () => {
		return [autoprefixer];
	},
	devServer: {
		publicPath: '/',
		outputPath: '/',
		filename: 'app.bundle.js',
		watchOptions: undefined,
		watchDelay: undefined,
		contentBase: path.resolve(process.cwd(), 'src'),
		stats: {
			cached: false,
			cachedAssets: false,
			colors: true
		}
	}
};
