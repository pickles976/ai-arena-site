module.exports = {
    entry: ['./src/editor.js','./src/game.js'],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    devServer: {
        static: {
          directory: __dirname,
        },
        compress: true,
        port: 9000,
    }
}