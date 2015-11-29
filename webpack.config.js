var webpack = require('webpack');
var path = require('path');
var production = process.argv.indexOf('--production') !== -1;

var plugins = [
    new webpack.NoErrorsPlugin()
];
if (production) {
    plugins.push(
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: { comments: false },
            compress: { warnings: false },
            minimize: true
        })
    );
}

module.exports = {
    entry: './src/index.js',
    output: {
        path: './public/assets/',
        publicPath: 'assets/',
        filename: 'app' + (production ? '.min' : '') + '.js'
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|dist)/,
            loader: (!production ? 'react-hot!' : '') + 'babel-loader'
        }]
    },
    debug: !production,
    devtool: production ? 'source-map' : 'eval',
    plugins: plugins
};
