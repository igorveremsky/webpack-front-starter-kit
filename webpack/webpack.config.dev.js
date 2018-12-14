const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js'
  },
  devServer: {
		port: 8080,
		compress: true,
		hot: true,
		inline: true,
		contentBase: path.join(__dirname, "../src")
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
		new webpack.HotModuleReplacementPlugin(),
		new LiveReloadPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: path.resolve(__dirname, '../src/assets/js'),
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        }
      },
      {
        test: /\.(js)$/,
        include: path.resolve(__dirname, '../src/assets/js'),
        loader: 'babel-loader'
      },
			{
				test: /\.s?css$/,
				use: [
					{
						// creates style nodes from JS strings
						loader: "style-loader",
						options: {
							sourceMap: true
						}
					},
					{
						// translates CSS into CommonJS
						loader: "css-loader",
						options: {
							sourceMap: true
						}
					},
					{
						// compiles Sass to CSS
						loader: "sass-loader",
						options: {
							outputStyle: 'expanded',
							sourceMap: true,
							sourceMapContents: true
						}
					}
					// Please note we are not running postcss here
				]
			},
    ]
  }
});
