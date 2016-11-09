//-->>> Lenses
var Identity = require('./identity'),
    Left = require('./left'),
    Right = require('./right'),
    Maybe = require('./maybe'),
    either = require('./either'),
    Id = require('./combinators').I,
    AOUnion = require('./contracts').AOUnion,
    SNUnion = require('./contracts').SNUnion,
    compose = require('./core').compose,
    extend = require('./object').extendTwo,
    cloneArray = require('./array').cloneArray,
    curry = require('./curry');


var Lens = curry(function Lens(key, f, x)
{
    key = SNUnion(key);
    return compose(f(key), lensAdapter)(x);
});

var Adapter = curry(function Adapter(f, g, x)
{
    x = AOUnion(x);
    var Either = null;
    switch ({}.toString.call(x))
    {
        case '[object Object]':
            Either = Left.of(x);
            break;
        case '[object Array]' :
            Either = Right.of(x);
            break;
    }
    return either(f, g, Either);
});

var lensAdapter = Adapter(extend({}), cloneArray);

var _getter = curry(function (key, obj)
{
    var Either = Maybe.of(obj[key]).map(Id).isNone() ? Left.of("No such key.") : Right.of(obj);
    return Either.map(function (o)
    {
        return o[key];
    }).__value;
});

var _setter = curry(function (val, key, obj)
{
    obj[key] = val;
    return obj;

});

var get = function (lens, x)
{
    return compose(Identity.of, lens(_getter))(x);
};

var set = function (lens, rep, x)
{
    return compose(Identity.of, lens(_setter(rep)))(x);
};

module.exports = {get: get, set: set, Lens: Lens};