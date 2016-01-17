var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

var webpackConfig = require('./webpack.config');
var devServerConfig = require('./webpack-dev-server.config');


var compiler = webpack(webpackConfig);
var server = new WebpackDevServer(compiler, devServerConfig);


var protocol = 'http';
var port = 8080;
var host = 'localhost';

server.listen(port, host, function(){
  console.log('\n\nServer:' + protocol + '://' + host + ':' + port);
});
