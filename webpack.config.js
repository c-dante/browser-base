const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");



/**
 * splitChunks plugin config -- separate your build into hash-able chunks for loading/caching
 *
 * @see https://webpack.js.org/plugins/split-chunks-plugin/
 * @param {
 * @returns {undefined}
 */
const splitChunks = {
	chunks: 'async',
	minSize: 30000,
	maxSize: 0,
	minChunks: 1,
	maxAsyncRequests: 5,
	maxInitialRequests: 3,
	automaticNameDelimiter: '~',
	name: true,
	cacheGroups: {
		vendors: {
			test: /[\\/]node_modules[\\/]/,
			priority: -10,
		},
		default: {
			minChunks: 2,
			priority: -20,
			reuseExistingChunk: true,
		},
	},
};

// @see https://webpack.js.org/configuration/optimization/
const optimization = {
	splitChunks,
	minimizer: [
		new UglifyJsPlugin(),
		new OptimizeCSSAssetsPlugin({}),
	],
};

// Plugin stack
// @see https://webpack.js.org/guides/development/#choosing-a-development-tool
const plugins = [
	// Required for build
	new HtmlWebpackPlugin({
		title: 'Development',
	}),
	new MiniCssExtractPlugin({
		// Options similar to the same options in webpackOptions.output
		// both options are optional
		filename: "[name].css",
		chunkFilename: "[id].css"
	}),


	// Dev
	new webpack.HotModuleReplacementPlugin(),

	// Compile/prod
	new webpack.HotModuleReplacementPlugin(),
];


/**
 * entry points: src/index
 *
 * @param {
 * @returns {env => webpack config}
 */
module.exports = (env = {}) => {
	// configure plugins/etc for env.prod
	console.log(env);

	const mode = env.production ? 'production' : 'development';

	return {
		mode,
		plugins,
		entry: {
			index: './src/index.js',
		},
		module: {
			rules: [
				// styles
				{
					test: /\.css$/,
					use: [
						// @todo: clean up prod
						env.production ? { loader: MiniCssExtractPlugin.loader } : 'style-loader',
						'css-loader'
					],
				},
				// js / babel
				{
					test: /\.m?js$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				},
			],
		},
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist'),
		},

		// Development settings
		devtool: 'cheap-module-eval-source-map',
		devServer: {
			contentBase: './src',
			hot: true,
			// This is configured to allow client side cors request to some other server
			// @see: https://webpack.js.org/configuration/dev-server/#devserver-proxy
			proxy: {
				'/api': {
					changeOrigin: true,
					target: 'https://api.example.com/',
					pathRewrite: {'^/api' : ''},
					secure: false,
				},
			},
		},
	};
};
