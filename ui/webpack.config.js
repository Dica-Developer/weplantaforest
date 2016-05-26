var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var inDev = process.env.NODE_ENV = 'development';

module.exports = (function() {
    var config = {
        'modulesDirectories': ['node_modules']
    };

    // Define entry points
    config.entry = {
        'app': __dirname + '/app/src/app.js'
    };

    config.output = {
        'path': __dirname + '/app/dist/',
        'publicPath': 'http://localhost:8080/',
        'filename': '[name].bundle.js'
    };

    config.module = {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    };

    config.plugins = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
        })
    ];

    if (inDev) {
        config.plugins.push(
           new HtmlWebpackPlugin({
            'template': __dirname + '/app/index.html',
            'inject': 'body',
            'minify': false
           })
        );

        config.devtool = 'cheap-module-eval-source-map';
    }

    config.devServer = {
        contentBase: __dirname + '/app',
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
