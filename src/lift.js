//-->>> Lift
var curry = require('./curry');

var lift = {

    liftA2: curry(function (f, functor1, functor2)
    {
        return functor1.map(f).ap(functor2);
    }),

    liftA3: curry(function (f, functor1, functor2, functor3)
    {
        return functor1.map(f).ap(functor2).ap(functor3);
    }),

    liftA4: curry(function (f, functor1, functor2, functor3)
    {
        return functor1.map(f).ap(functor2).ap(functor3);
    })

};

module.exports = lift;