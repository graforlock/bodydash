var webpack = require('webpack');
var path = require('path');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;


var config = {
    name : 'bodydash',
    src : './src',
    dist : './dist',
    mainEntry : './src/index.js',
    plugins : []
};

var out;

if (process.argv.indexOf('--prod') != -1 ) {
    config.plugins.push(new UglifyJsPlugin({ minimize: true }));
    out = config.name.toLowerCase() + '.umd.min.js';
} else {
    out = config.name.toLowerCase() + '.umd.js';
}


module.exports = {

    entry: config.mainEntry,

    devtool: 'source-map',

    output: {

        path: path.resolve(config.dist),

        filename: out,

        library: config.name,

        libraryTarget: 'umd',

        umdNamedDefine: true

    },

    resolve: {

        root: path.resolve(config.src),

        extensions: ['', '.js']

    },

    plugins: config.plugins

};