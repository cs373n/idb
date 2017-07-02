var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './app/static/components/App.js',
	output: {
		path: path.resolve(__dirname, './app/static/dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
		{ test: /\.(js)$/, use: 'babel-loader' },
		{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
		]
	},
	devServer: {
		historyApiFallback: true
	},
	plugins: [new HtmlWebpackPlugin({
		template: 'app/templates/index.html'
		})]
}
