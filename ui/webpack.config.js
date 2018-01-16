var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var inDev = process.env.NODE_ENV === 'development';
var JS_FILE_NAME = inDev ? 'js/[name].bundle.js' : 'js/[name].[hash].js';

module.exports = (function() {
  var config = {
  };

  // Define entry points
  config.entry = {
    'app': __dirname + '/src/js/app.js',
    'vendor': [
      'react',
      'react-dom',
      'react-router-component',
      'bootstrap',
      'axios',
      'accounting'
    ]
  };

  config.output = {
    'path': __dirname + '/dist',
    'publicPath': inDev ? 'http://localhost:8080/' : '/',
    'filename': JS_FILE_NAME
  };

  config.module = {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.less$/,
      loader: "style-loader!css-loader!less-loader"
    }, {
      test: /\.(png|jpg)$/,
      include: /dist/,
      loader: 'url-loader?limit=5000000'
    }]
  };

  config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: JS_FILE_NAME }),
    new HtmlWebpackPlugin({
      'template': __dirname + '/src/index.html',
      'inject': 'body',
      'minify': false
    })
  ];

  if (inDev) {
    config.devtool = 'cheap-module-eval-source-map';
  } else {
    config.devtool = 'source-map';
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  config.devServer = {
    contentBase: __dirname + '/dist',
    port: 8080,
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  };

  return config;
})();
