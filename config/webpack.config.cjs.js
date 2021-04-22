const path = require('path');
const common = require('./webpack.config.base');

module.exports = Object.assign({}, common, {
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
  mode: 'production',
});
