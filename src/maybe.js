//-->>> Maybe
var curry = require('./curry'),
    Just = require('./just'),
    None = require('./none');

function Maybe(x)
{
    this.__value = x;
}

Maybe.maybe = curry(function (x, f, m)
{
    return m.isNone() ? None.of(x) : Just.of(f(m.__value));
});

Maybe.of = function (x)
{
    return new Maybe(x);
};

Maybe.prototype.isJust =function ()
{
    return this.constructor === Just;
};

Maybe.prototype.isNone = function ()
{
    return this.constructor === None;
};

Maybe.prototype.isNothing = function()
{
    return (this.__value === null || this.__value === undefined || this.__value !== this.__value);
};

Maybe.prototype.map = function (f)
{
    return this.isNothing ? None.of(null) : Just.of(f(this.__value));
};

Maybe.prototype.join = function ()
{
    return this.isNone() ? None.of(null) : this.__value;
};

Maybe.prototype.ap = function (other)
{
    return other.map(this.__value);
    // Functor requirement: It maps (other Functor's map) over current Functor's __value.
};


module.exports = Maybe;