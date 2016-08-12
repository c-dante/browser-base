'use strict';
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
	module:	{
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
			{ test: /\.(eot|woff|woff2|ttf|svg|png|jpg)(\?.*)?$/, loaders: ['file'] },
			{ test: /\.css$/, loaders: ['style', 'css', 'postcss'] },
			{ test: /\.less$/, loaders: ['style', 'css', 'postcss', 'less'] },
			{ test: /\.tpl\.(pug|jade)$/, loaders: ['html?removeRedundantAttributes=false', 'jade-html'] },
			{ test: /\.tpl\.html$/, loaders: ['html?removeRedundantAttributes=false'] },
			{ test: /[^\.][^t][^p][^l]\.(pug|jade)$/, loaders: ['file?name=[name].html', 'jade-html' ] },
			{ test: /\.(sass|scss)$/, loaders: ['style', 'css', 'postcss', 'sass'] },
			{ test: /[^\.][^t][^p][^l]\.html$/, loaders: ['file?name=[name].[ext]'] }
		]
	},
	postcss: function(){
		return [autoprefixer]
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			// exclude the index entry point
			exclude: /.*index.*$/,
			columns: false,
			filename: '[file].map[query]',
			lineToLine: false,
			module: false
		})
	],
	entry: { app: ['./index.jade', './main.js'] },
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(process.cwd(), 'bin')
	},
	context: path.resolve(process.cwd(), 'src'),
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
