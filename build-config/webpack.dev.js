const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge')

const commonConfig = require('./webpack.common')

module.exports = webpackMerge(commonConfig, {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    hot: true,
    port: 8000 
  },
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({template: './public/index.html'})
  ]
});
