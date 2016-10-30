//-->>> Reduce

function reduce(f, xs)
{
    return xs.reduce(f);
}

var reduce = curry(reduce); // Pointfree reduce