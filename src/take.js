//-->>> Lazy add-ons
var num = require('./contracts').num,
    curry = require('./utils').curry;

var lazy = {

    take: function(n, xs)
    {
        n = num(n);
        return xs.filter(function (e, i)
        {
            return i < n;
        })
    },

    skip: function(n, xs)
    {
        n = num(n);
        return xs.filter(function (e, i)
        {
            return i > n
        });
    }

};

module.exports = lazy;



