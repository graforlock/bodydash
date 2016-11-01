//--->>> Arrays
var curry = require('./curry'),
    safeProp = require('./object').safeProp;

var array = {

    map: curry(function (f, xs)
    {
        return xs.map(f);
    }),

    filter: curry(function (f, xs)
    {
        return xs.filter(f);
    }),

    reduce: curry(function (f, xs)
    {
        return xs.reduce(f);
    }),

    head: function (xs)
    {
        return xs[0];
    },

    safeHead: safeProp(0),

    last: function (xs)
    {
        return xs[xs.length - 1];
    },

    each: curry(function (cb, array)
    {
        for (var i = 0; i < array.length; i++)
        {
            cb.apply(null, [array[i], i]);
        }
    }),

    slice: [].slice

};

module.exports = array;
