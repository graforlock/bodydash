//--->>> Curry/Partial Application

function curry(fn)
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
}

module.exports = curry;
