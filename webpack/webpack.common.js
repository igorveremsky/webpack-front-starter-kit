const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/assets/js/app.js')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: path.resolve(__dirname, '..') }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, '../public'), to: 'public' }
    ]),
    new HtmlWebpackPlugin({
      title: 'webpack starter kit',
      template: path.resolve(__dirname, '../src/index.html'),
    })
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
			{
				// Load all files as base64 encoding if they are smaller than 8192 bytes
				test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							// On development we want to see where the file is coming from, hence we preserve the [path]
							name: '[path][name].[ext]?hash=[hash:20]',
							limit: 8192
						}
					}
				]
			},
			{
				// Load all images as base64 encoding if they are smaller than 8192 bytes
				test: /\.html$/,
				include: [
					path.resolve(__dirname, '../src/inc')
				],
				use: [
					'html-loader',
				]
			}
    ]
  }
};
