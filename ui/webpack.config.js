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
    filename: path.join('js', JS_FILE_NAME)
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'I Plant A Tree',
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: 'body',
      minify: true
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
    compress: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    progress: true,
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: true
    }
  }
}

module.exports = config;

