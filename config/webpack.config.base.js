const path = require('path');

module.exports = {
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
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../demo'),
    compress: true,
    port: 4000,
    hot: true,
  },
};
