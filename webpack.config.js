var webpack = require('webpack');
var path = require('path');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var libraryName = 'bodydash';
var sourceDir = './src';
var distDir = './dist';
var sourceEntryPoint = './src/index.js';

var plugins = [];
var out;


if (process.argv.indexOf('--prod') != -1 ) {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    out = libraryName.toLowerCase() + '.umd.min.js';
} else {
    out = libraryName.toLowerCase() + '.umd.js';
}


module.exports = {

    entry: sourceEntryPoint,

    devtool: 'source-map',

    output: {

        path: path.resolve(distDir),

        filename: out,

        library: libraryName,

        libraryTarget: 'umd',

        umdNamedDefine: true

    },

    resolve: {

        root: path.resolve(sourceDir),

        extensions: ['', '.js']

    },

    plugins: plugins

};