//-->>> General Tools
var contracts = require('./contracts'),
    array = require('./array'),
    Maybe = require('./maybe'),
    curry = require('./curry');

var core = {
    bind: function (fn, context)
    {
        return function ()
        {
            return fn.apply(context, arguments);
        }
    },
    compose: function ()
    {
        var funcs = contracts.arrayOf(contracts.func)([].slice.call(arguments));
        return function(arg)
        {
            return funcs.reverse().reduce(function(a, b)
            {
                return b(a);
            }, arg);
        }
    },
    mcompose: function (f, g)
    {
        return core.compose(core.chain(f), core.chain(g));
    },
    flatten: function (array)
    {
        return contracts.arr(array).reduce(function (a, b)
        {
            return a.concat(b);
        });
    },

    flip: function (fn)
    {
        return function (first)
        {
            return function (second)
            {
                return fn.call(this, second, first);
            };
        };
    },
    flipMany: function (fn)
    {
        return function ()
        {
            var first = core.toArray(arguments);
            return function ()
            {
                var second = core.toArray(arguments);
                return fn.apply(this, array.concat(second, first));
            };
        };
    },
    id: function (x)
    {
        return x;
    },
    join: function (monad)
    {
        return monad.join();
    },
    chain: curry(function (f, m)
    {
        return m.map(f).join();
    }),
    variadic: function (fn)
    {
        if (fn.length < 1) return fn;

        return function ()
        {
            var ordinaryArgs = (1 <= arguments.length ?
                    core.slice.call(arguments, 0, fn.length - 1) : []),
                restOfTheArgsList = slice.call(arguments, fn.length - 1),
                args = (fn.length <= arguments.length ?
                    ordinaryArgs.concat([restOfTheArgsList]) : []);

            return fn.apply(this, args);
        }
    },
    toArray: function (array)
    {
        return [array];
    },
    safeArray: function (array)
    {
        return new Maybe([].slice.call(array));
    }
};

module.exports = core;

