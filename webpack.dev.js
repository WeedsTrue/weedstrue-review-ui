const { merge } = require('webpack-merge');
// eslint-disable-next-line import/extensions
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  devServer: {
    host: 'local.weedstrue.com',
    port: 8000,
    https: true,
    static: './dist',
    hot: true,
    historyApiFallback: true
  },
  optimization: { splitChunks: { chunks: 'all' } }
});
