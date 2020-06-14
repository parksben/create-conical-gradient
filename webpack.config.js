const path = require('path');

module.exports = {
  entry: {
    'dist/index': './src/index.js',
    'demo/bundle': './src/demo.js',
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, './demo'),
    compress: true,
    port: 4000,
    hot: true,
  },
};
