//-->>> Lenses
var Identity = require('./identity'),
    Constant = require('./constant'),
    compose = require('./core').compose,
    mergeObj = require('./object').mergeObj,
    extendObj = require('./object').extendObj,
    curry = require('./curry'),
    chain = require('./pointfree').chain;

// function lensAdapter(x, key)
// {
//      return compose(extendMany(x /*, partial for y */), x[key]);
// }

var Lens = curry(function Lens(key, f, x)
{
    var copy = extendObj(x);
        copy[key] = f;
    // return compose(mergeObj(x,copy));
    return compose(mergeObj(x), f)(x[key]);
});

var get = curry(function get(f, x)
{
    // return compose(Identity.of, chain(f), Constant)(x[f]);
    return compose(Identity.of, chain(f), Constant)(x);
});

var set = curry(function set(l, f, x)
{
    return compose(Identity.of, chain(l(f)), Identity.of)(x);
});

set(Lens("name"), "ERIK", { name: "Erik" });


module.exports = {get: get, set: set};