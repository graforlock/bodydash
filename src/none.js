var Maybe = require('./maybe');

function None(v)
{
    Maybe.call(this, v);
    this.__value = v;
}

None.of = function(v)
{
    return new None(v);
};

None.prototype = Object.create(Maybe.prototype);
None.prototype.constructor = None;

module.exports = None;