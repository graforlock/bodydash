//-->>> Lift
var curry = require('./curry');

var lift = {

    liftA1: curry(function(f, functor)
    {
        return functor.map(f);
    }),

    liftA2: curry(function (f, functor1, functor2)
    {
        return functor1.map(f).ap(functor2);
    }),

    liftA3: curry(function (f, functor1, functor2, functor3)
    {
        return functor1.map(f).ap(functor2).ap(functor3);
    }),

    liftA4: curry(function (f, functor1, functor2, functor3, functor4)
    {
        return functor1.map(f).ap(functor2).ap(functor3).ap(functor4);
    })

};

module.exports = lift;