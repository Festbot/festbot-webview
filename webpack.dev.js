const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(common, {
	devtool: 'source-map',

	entry: {
		app: [
			'webpack-dev-server/client?http://192.168.1.35:3000',
			'webpack/hot/only-dev-server'
		]
	},
	mode: 'development',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
});
