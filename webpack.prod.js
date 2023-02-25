const { merge } = require('webpack-merge');
// eslint-disable-next-line import/extensions
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  devtool: 'source-map'
});
