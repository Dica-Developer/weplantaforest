module.exports = (function() {
    var config = {
        'modulesDirectories': ['node_modules']
    };

    // Define entry points
    config.entry = {
        'app': __dirname + '/app/components/Main.js'
    };

    config.output = {
        'path': __dirname + '/client-react/js',
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

    config.devtool = 'eval';

    return config;
})();
