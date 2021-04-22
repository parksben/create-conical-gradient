const path = require('path');

/** @type {import('webpack').Configuration} */
const config = {
  entry: {
    bundle: path.resolve(__dirname, '../src/demo.js'),
  },
  output: {
    path: path.resolve(__dirname, '../demo'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          }
        },
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts'],
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../demo'),
    compress: true,
    port: 4000,
    hot: true,
  },
};

module.exports = config;
