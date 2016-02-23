module.exports = {

        // base dir for resolving entry option
        context: __dirname,

        entry: './app/js/index',

        output: {
                path: __dirname + '/build',
                filename: 'bundle.js'
        },

        module: {
                loaders: [
                        {
                                test: /\.jsx?$/,
                                exclude: /node_modules/,
                                loader: 'babel-loader',
                                query: {
                                        presets: ['es2015', 'react']
                                }
                        }
                ]
        },

        resolve: {
                moduleDirectories: [ 'node_modules'],
                extensions: ['', '.js', '.jsx']
        }
}