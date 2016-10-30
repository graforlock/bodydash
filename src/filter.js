//-->>> Filter

function filter(f, xs)
{
    return xs.filter(f);
}

var filter = curry(filter); // Pointfree filter