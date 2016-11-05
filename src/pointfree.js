var curry = require('./curry');

var pointfree = {

    map: curry(function (f, functor)
    {
        return functor.map(f);
    }),

    ap: curry(function (functor1, functor2)
    {
        return functor1.map(functor2.join());
    }),

    chain: curry(function(f, functor)
    {
        return functor.map(f).join();
    })

};

module.exports = pointfree;