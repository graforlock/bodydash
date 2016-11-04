var Maybe = require('./maybe');

function Just(v)
{
    Maybe.call(this, v);
    this.__value = v;
}

Just.of = function (v)
{
    return new Just(v);
};

Just.prototype = Object.create(Maybe.prototype);
Just.prototype.constructor = Just;

module.exports = Just;