var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './app/static/components/App.jsx',
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
}
