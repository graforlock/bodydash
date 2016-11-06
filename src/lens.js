//-->>> Lenses
var Identity = require('./identity'),
    Left = require('./left'),
    Right = require('./right'),
    Maybe = require('./maybe'),
    AOUnion = require('./contracts').AOUnion,
    compose = require('./core').compose,
    extend = require('./object').extendTwo,
    curry = require('./curry');


var Lens = curry(function Lens(key, f, x)
{
    return compose(extend(x), f(key), extend({}))(x);
});

function lensAdapter(x)
{
    x = AOUnion(x);
    if ({}.toString.call(x) === '[object Object]')
    {
        return extend(x);
    }
    else
    {
        return x;
    }
}

var _pass = curry(function get(key, obj)
{
    var Either = Maybe.of(obj[key]).isNone() ? Left.of(obj) : Right.of(obj);
    Either.map(function (o)
    {
        o[key] = obj[key];
        return o;
    });
    return Either.__value;
});

var get = function (lens, x)
{
    return compose(Identity.of, lens(_pass))(x);
};

var set = function (lens, f, x)
{
    return compose(Identity.of, lens(f))(x);
};


module.exports = {get: get, set: set, Lens: Lens};