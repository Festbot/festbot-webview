const WebpackDevServer = require('webpack-dev-server'),
	config = require('./webpack.dev.js'),
	webpack = require('webpack'),
	path = require('path'),
	compiler = webpack(config),
	devServer = {
		disableHostCheck: true,
		host: '0.0.0.0',
		port: 3001,
		historyApiFallback: true,
		hot: true,
		hotOnly: true,
		contentBase: path.resolve(path.resolve(__dirname), 'out'),
		publicPath: '/'
	},
	server = new WebpackDevServer(compiler, devServer);

server.listen(3001);
