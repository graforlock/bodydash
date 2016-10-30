//-->>> Lenses

function lens(set, get)
{
    var f = function (a)
    {
        return get(a);
    };
    f.set = set;
    f.get = function (a)
    {
        return get(a);
    };
    f.modify = function (func, a)
    {
        return set(a, f(get(a)));
    };
    return f;
}

module.exports = lens;