//-->>> Math add-ons
var curry = require('./utils').curry;

var math = {

    add: curry(function(x, y)
    {
        return x + y;
    }),

    subtract: curry(function(x, y)
    {
        return x - y;
    }),

    times: curry(function(x, y)
    {
        return x * y;
    }),

    divide: curry(function(x, y)
    {
        return x / y;
    }),

    square: function(x)
    {
        return x * x;
    },

    cube: function(x)
    {
        return math.square(x) * x;
    },

    plusplus: function(x)
    { // Necessity: you can't pass ++ to the map
        return ++x;
    },

    minusminus: function(x)
    { // Necessity: you can't pass -- to the map
        return --x;
    },

    rand: function(x)
    {
        return Math.floor(Math.random() * x) + 1;
    }

};

module.exports = math;
