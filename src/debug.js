//-->>> Debug
var utils = require('./utils');

function debug(tag,x) {
        console.log(tag, x);
        return x;
}

module.exports = utils.curry(debug);