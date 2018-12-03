const HtmlPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

const context = resolve(__dirname, 'src');

module.exports = {
	entry: './',

	context,

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				options: {
					plugins: [
						['@babel/plugin-transform-react-jsx']
					]
				},
				include: context
			},

			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},

	resolve: {
		extensions: ['.js', '.jsx', '.json', '.css']
	},

	plugins: [
		new HtmlPlugin()
	]
};
