const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const plugins = [
	new webpack.SourceMapDevToolPlugin(),
	// https://webpack.js.org/plugins/commons-chunk-plugin/
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: function(module){
			// @todo: do we want to include/exclude vendor CSS?
			if(module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
				return false;
			}
			return module.context && module.context.indexOf('node_modules') !== -1;
		},
	}),
	new webpack.optimize.CommonsChunkPlugin({
		name: 'manifest',
		minChunks: Infinity, // @todo: review
	}),
	new webpack.HashedModuleIdsPlugin(),
	new WebpackChunkHash(),
	new ChunkManifestPlugin({
		filename: 'chunk-manifest.json',
		manifestVariable: 'webpackManifest',
		// inlineManifest: true,
	}),
	// https://github.com/jantimon/html-webpack-plugin
	new HtmlWebpackPlugin({
		title: 'Demo Page',
		chunksSortMode: 'dependency',
	}),
	// https://github.com/numical/script-ext-html-webpack-plugin
	new ScriptExtHtmlWebpackPlugin({
		sync: [
			// @todo: figure out async vendor file D:
			/manifest\..*\.js/,
			/vendor\..*\.js/,
			/main\..*\.js/,
		],
		defaultAttribute: 'async',
	}),
	new HtmlWebpackHarddiskPlugin({
		outputPath: path.resolve(__dirname, 'views'),
	}),
];

if (process.env.NODE_ENV === 'production') {
	plugins.push(
		new UglifyJSPlugin()
	);
}

module.exports = {
	plugins,
	module:	{
		rules: [
			{
				include: [
					/\/src\//,
					/\.js$/,
				],
				loaders: [ 'babel-loader' ],
			},
			{
				test: /\.(ico|eot|woff|woff2|ttf|svg|png|jpg)(\?.*)?$/,
				loaders: ['file-loader?name=[name].[ext]'],
			},
			{
				test: /\.css$/,
				loaders: [ 'postcss-loader' ],
			},
			{
				include: /\.tpl\.(pug|jade)$/,
				loaders: [ 'pug-loader' ],
			},
			{
				include: /index\.(pug|jade)$/,
				loaders: [
					'file-loader?name=[name].html',
					'extract-loader',
					'html-loader',
					'pug-html-loader?exports=false',
				],
			},
			{
				test: /index\.scss$/,
				loaders: [
					'file-loader?name=[name].css',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(sass|scss)$/,
				exclude: /index\.scss$/,
				loaders: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader'
				],
			},
			{
				test: /allTest.js$/,
				loaders: ['mocha-loader'],
			},
		],
	},
	context: path.resolve(process.cwd(), 'src'),
	entry: {
		app: [
			'./index.scss',
			'./main.js',
		],
	},
	output: {
		filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
		path: path.resolve(process.cwd(), 'bin'),
	},
};
