module.exports = {
    context: __dirname,
    entry: "./app/components/Main.js",
    output: {
        path: __dirname + "/client-react/js",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
};

