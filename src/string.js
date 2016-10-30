//-->>> String add-ons

function toLower(a)
{
    return a.toLowerCase();
}
function toUpper(a)
{
    return a.toUpperCase();
}

function capitalise(a)
{
    return concat(toUpper(head(a)), a.slice(1));
}

var toLower = curry(toLower), toUpper = curry(toUpper);

function concat(a, b)
{
    return a.concat(b);
}

var concat = curry(concat);