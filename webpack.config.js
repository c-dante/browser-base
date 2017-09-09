const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');

const entrypoints = {
	app: ['./app.js'],
};

// @todo: pluck from env vars
const debugEnabled = true;
const isProd = false;

const plugins = [
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: function(module){
			if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
				return false;
			}
			return module.context && module.context.indexOf('node_modules') !== -1;
		},
	}),
	new webpack.optimize.CommonsChunkPlugin({
		name: 'manifest',
		minChunks: Infinity,
	}),
	new webpack.HashedModuleIdsPlugin(),
	new WebpackChunkHash(),

	// https://github.com/jantimon/html-webpack-plugin
	new HtmlWebpackPlugin({
		chunksSortMode: 'dependency',
		chunks: ['manifest', 'vendor', 'app'],
		template: 'index.pug'
	}),
	new InlineChunkManifestHtmlWebpackPlugin(),

	//
	// https://github.com/numical/script-ext-html-webpack-plugin
	new ScriptExtHtmlWebpackPlugin({
		sync: [
			/manifest\..*\.js/,
			/vendor\..*\.js/,
			/app\..*\.js/,
		],
		defaultAttribute: 'async',
	}),

	new HtmlWebpackHarddiskPlugin({
		outputPath: path.resolve(__dirname, 'views'),
	}),
	new webpack.LoaderOptionsPlugin({
		debug: debugEnabled,
	}),

	// @todo: these are for dev -- for prod builds, do your own thing
	new webpack.SourceMapDevToolPlugin({
		// exclude the index entry point
		exclude: /.*index.*$/,
		columns: false,
		filename: '[file].map[query]',
		lineToLine: false,
		module: false
	}),
];

module.exports = {
	module:	{
		rules: [
			{
				include: /(src|test).*\.js$/,
				loaders: [ 'babel-loader' ],
			},
			{
				test: path.resolve(process.cwd(), 'src/app.scss'),
				loaders: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader',
				]
			},
			{
				include: /\.tpl\.(pug)$/,
				loaders: [
					'html-loader?removeRedundantAttributes=false',
					'pug-html-loader'
				],
			},
			{
				include: /[^\.][^t][^p][^l]\.pug$/,
				loaders: [
					'pug-loader?exports=false',
				],
			},
			{
				include: /\.json$/,
				loaders: ['json-loader'],
			},
		]
	},
	plugins: plugins,
	entry: entrypoints,
	output: {
		filename: isProd ? '[name].[hash].bundle.js' : '[name].bundle.js',
		path: path.resolve(process.cwd(), 'bin'),
	},
	context: path.resolve(process.cwd(), 'src'),
};
