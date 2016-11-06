//-->>> Lenses
var Identity = require('./identity'),
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
    var object = obj;
    if (obj[key])
    object[key] = obj[key];
    return object;
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