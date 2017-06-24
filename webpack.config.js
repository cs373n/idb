var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './app/static/index.js',
	output: {
		path: path.resolve(__dirname, './app/static/dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
		{ test: /\.(jsx)$/, use: 'babel-loader' },
		{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
		]
	},
	plugins: [new HtmlWebpackPlugin({
		template: 'app/templates/index.html'
	})]
}
