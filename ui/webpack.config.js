var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var inDev = process.env.NODE_ENV === 'development';
var JS_FILE_NAME = inDev ? '[name].dev.js' : '[name].[hash].js';

const config = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'js', 'app.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: inDev ? 'http://localhost:8080/' : '/',
    filename: 'js/' + JS_FILE_NAME
  },
  optimization: {
    runtimeChunk: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'I Plant A Tree',
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: 'body',
      minify: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015']
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              include: /dist/,
              limit: 5000000
            }
          }
        ]
      }
    ]
  },
  devtool: inDev ? 'eval' : 'nosources-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8080,
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  }
}

module.exports = config;

