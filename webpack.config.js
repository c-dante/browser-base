const path = require('path');

module.exports = {
	module:	{
		rules: [
			{
				include: [
					/\/src\//,
					/\.js$/,
				],
				loaders: [ 'babel-loader' ]
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
			'./index.pug',
			'./main.js',
		],
	},
	output: {
		filename: '[name].bundle.js',
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
