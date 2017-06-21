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
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: function(module){
			return module.context && module.context.indexOf('node_modules') !== -1;
		},
	}),
	new webpack.optimize.CommonsChunkPlugin({
		name: 'manifest',
	}),
	// new webpack.HashedModuleIdsPlugin(),
	// new WebpackChunkHash(),
	// new ChunkManifestPlugin({
	// 	filename: 'chunk-manifest.json',
	// 	manifestVariable: 'webpackManifest',
	// 	inlineManifest: true,
	// }),
	new HtmlWebpackPlugin({
		title: 'Demo Page',
	}),
	new ScriptExtHtmlWebpackPlugin({
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
	// devServer: {
	// 	publicPath: '/',
	// 	outputPath: '/',
	// 	filename: 'app.bundle.js',
	// 	watchOptions: undefined,
	// 	watchDelay: undefined,
	// 	contentBase: path.resolve(process.cwd(), 'src'),
	// 	stats: {
	// 		cached: false,
	// 		cachedAssets: false,
	// 		colors: true
	// 	}
	// }
};
