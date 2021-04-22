const path = require('path');
const common = require('./webpack.config.base');
const pkg = require('../package.json');

module.exports = Object.assign({}, common, {
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, '../'),
    filename: pkg.unpkg,
    libraryTarget: 'umd',
    library: 'createConicalGradient',
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  mode: 'production',
});
