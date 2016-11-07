var webpack = require('webpack');
var path = require('path');
var argv = require('yargs').argv;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var config = {
    name: 'bodydash',
    src: './src',
    out: '',
    mainEntry: './src/index.js',
    plugins: []
};


var out,
    outfile = { prod: './dist', dev: './example' };

if (argv.build === "prod")
{
    config.plugins.push(new UglifyJsPlugin({minimize: true}));
    config.out = outfile.prod;
    out = config.name.toLowerCase() + '.umd.min.js';
}
else if (argv.build === "dev")
{
    config.plugins.push( new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['example'] }
    }));
    config.out = outfile.dev;
    out = config.name.toLowerCase() + '.umd.js';
}
else
{
    config.out = outfile.prod;
    out = config.name.toLowerCase() + '.umd.js';
}


module.exports = {

    entry: config.mainEntry,

    devtool: 'source-map',

    output: {

        path: path.resolve(config.out),

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