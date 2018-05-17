const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var path = require('path');

const config = merge(common, {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'js', 'app.js'),
  output: {
    filename: path.join('js', '[name].[hash].js'),
    publicPath: '/'
  },
  devtool: 'nosources-source-map',
})

module.exports = config;

