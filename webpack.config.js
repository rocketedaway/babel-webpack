const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');

var plugins = [];
var filename = package.name;

var doMinify = process.env.NODE_ENV === 'production';
if (doMinify) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }, output: { comments: false }
        })
    );

    filename += '.min';
}

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: package.babelWebpack.buildFolder,
        filename: filename + '.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    },
    plugins: plugins
 }
