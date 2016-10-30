//-->>> Maybe

function Maybe(x)
{
    this.__value = x;
}

Maybe.of = function (x)
{
    return new Maybe(x);
};

Maybe.prototype.isNothing = function ()
{
    return (this.__value === null || this.__value === undefined);
};

Maybe.prototype.map = function (f)
{
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
};

Maybe.prototype.join = function ()
{
    return this.isNothing() ? Maybe.of(null) : this.__value;
};

Maybe.prototype.ap = function (other)
{
    return other.map(this.__value);
    // Functor requirement: It maps (other Functor's map) over current Functor's __value.
};

// TODO: Maybe.prototype.ap = function(vs) {
//       return (typeof this.value !== 'function') ? new Maybe(null) : vs.map(this.value);
//     };

var maybe = curry(function (x, f, m)
{
    return m.isNothing() ? x : f(m.__value);
    // Maybe helper for custom value (instead of 'null')
});
