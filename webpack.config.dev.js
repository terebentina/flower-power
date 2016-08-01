const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelQuery = {
  presets: ['es2015', 'stage-0', 'react', 'react-hmre'],
};

module.exports = {
  context: __dirname,
  entry: [path.resolve('./src/index.js'), 'webpack-hot-middleware/client'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/build',
    pathinfo: true,
    sourceMapFilename: '[name].map',
  },
  target: 'web',
  devtool: 'cheap-module-eval-source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: [/node_modules/, path.resolve(__dirname, './build')], query: babelQuery },
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'My app',
      template: 'index.ejs',
    }),
  ],
};
