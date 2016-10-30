//-->>> General Tools
var contracts = require('./contracts');

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
        var funcs = utils.arrayOf(utils.func)([].slice.call(arguments));
        return function ()
        {
            var fargs = arguments;
            for (var i = funcs.length - 1; i >= 0; i -= 1)
            {
                fargs = [funcs[i].apply(this, fargs)];
            }
            return fargs[0];
        }
    },
    mcompose: function (f, g)
    {
        return utils.compose(utils.chain(f), utils.chain(g));
    },
    curry: function (fn)
    {
        var arity = fn.length;
        return getArgs([]);

        function getArgs(totalArgs)
        {
            return function stepTwo()
            {
                var nextTotalArgs = totalArgs.concat([].slice.call(arguments, 0));
                if (nextTotalArgs.length >= arity)
                    return fn.apply(this, nextTotalArgs);
                else
                    return getArgs(nextTotalArgs);
            }
        }
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
            var first = utils.toArray(arguments);
            return function ()
            {
                var second = utils.toArray(arguments);
                return fn.apply(this, concat(second, first));
            };
        };
    },
    join: function (monad)
    {
        return monad.join();
    },
    chain: utils.curry(function (f, m)
    {
        return m.map(f).join();
    }),
    variadic: function (fn)
    {
        if (fn.length < 1) return fn;

        return function ()
        {
            var ordinaryArgs = (1 <= arguments.length ?
                    utils.slice.call(arguments, 0, fn.length - 1) : []),
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

