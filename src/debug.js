//-->>> Debug
var curry = require('./curry');

function debug(tag,x) {
        console.log(tag, x);
        return x;
}

module.exports = curry(debug);