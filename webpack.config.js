var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: process.cwd() + '/src/',
    entry: {
        main: './main.es6.js'
    },
    devtool: 'cheap-source-map',
    output: {
        path: process.cwd() + '/www/bin/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].js'
    },
    resolveLoader: {
        root: process.cwd() + '/node_modules/'
    },
    module: {
        loaders: [
            { test: /\.es6\.js$/, loader: 'babel', exclude: '/(node_modules|bower_components)/' },
            { test: /\.jade$/, loader: 'jade', exclude: '/(node_modules|bower_components)/' },
            { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!less'), exclude: '/(node_modules|bower_components)/' }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css', { allChunks: true })
    ]
};
