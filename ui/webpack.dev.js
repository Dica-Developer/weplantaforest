const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var DashboardPlugin = require('webpack-dashboard/plugin');
var path = require('path');

const config = merge(common, {
  mode: 'development',
  output: {
    filename: path.join('js', '[name].dev.js'),
    publicPath: 'http://localhost:8080/'
  },
  optimization: {
    // for dashboard plugin
    minimize: false
  },
  plugins: [
    new DashboardPlugin()
  ],
  devtool: 'eval',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8080,
    compress: false,
    hot: true,
    inline: true,
    historyApiFallback: true,
    progress: true,
    stats: {
      children: false,
      modules: true,
      cached: true,
      colors: true,
      chunk: true
    }
  }
})

module.exports = config;

