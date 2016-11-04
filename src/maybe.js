//-->>> Maybe
var curry = require('./curry');

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
    return this.isNothing() ? None.of(null) : Just.of(f(this.__value));
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


module.exports = Maybe;