const path = require('path'),
	HtmlWebPackPlugin = require('html-webpack-plugin'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: {
		app: ['./src/index.jsx']
	},
	resolve: {
		enforceExtension: false,
		extensions: ['.js', '.jsx'],
		mainFiles: ['index']
	},
	output: {
		path: path.join(__dirname, './out/'),
		filename: '[name].js',
		chunkFilename: '[id].bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
			},
			{
				test: /\.(jsx|js)$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				options: {
					presets: ['env', 'react'],
					cacheDirectory: true,
					plugins: [
						'transform-object-rest-spread',
						'transform-react-jsx',
						'transform-class-properties',
						'transform-async-to-generator',
						'react-hot-loader/babel'
					]
				}
			},
			{
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader'
				],
				test: /\.less$/
			},
			{
				test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
				use: 'file-loader?name=[name].[ext]?[hash]'
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html'
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		})
	]
};
