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
        return set(a, get(a));
    };
    return f;
}

function Lens()
{

}

/*
function get (f, x)
{
    return compose(Identity.of, chain(f), Constant)(x);
}

function set(f, x)
{
    return compose(Identity.of, chain(f), Identity.of)(x);
} */

module.exports = lens;