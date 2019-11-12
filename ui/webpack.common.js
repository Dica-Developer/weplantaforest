var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var path = require('path');

const config = {
  entry: path.resolve(__dirname, 'src', 'js', 'app.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    pathinfo: true
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'async',
      minSize: 250000,
      maxSize: 1000000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      minChunks: 1
    }
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
          options: {
            presets: [
              '@babel/preset-react',
              ['env',
              {
                targets: {
                  'chrome': '75'
                }
              }]
            ],
            plugins: ['syntax-dynamic-import'],
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
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
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8080,
    compress: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    progress: true,
    stats: {
      modules: true,
      cached: true,
      colors: true,
      chunk: true
    }
  }
}

module.exports = config;

