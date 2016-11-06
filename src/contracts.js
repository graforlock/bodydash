//--->> Contracts

var contracts = {

    str: function (s)
    {
        if (typeof s === 'string')
            return s;
        else
            throw new TypeError('Error: Input excepts String type');
    },

    classOf: function (s)
    {
        s = contracts.str(s);
        return function (a)
        {
            if ({}.toString.call(a) === '[object ' + s + ']')
                return a;
            else
                throw new TypeError('Error: Input excepts ' + s + ' type');
        }
    },

    typeOf: function (s)
    {
        s = contracts.str(s);
        return function (v)
        {
            if (typeof v === s)
                return v;
            else
                throw new TypeError('Error: Input excepts ' + s + ' type');
        }
    },

    unionOf: function(t)
    {
        t = contracts.strArr(t);
        return function(a)
        {
            for(var i = 0; i < t.length; i++)
            {
                if({}.toString.call(a) === '[object ' + t[i] + ']')
                {
                    return a;
                }
            }
            throw new TypeError('Error: Input excepts union of ' + t.join("|") );
        }
    },

    AOUnion: function(ao)
    {
        return contracts.unionOf(['Array', 'Object'])(ao);
    },

    obj: function (o)
    {
        return contracts.classOf('Object')(o);
    },

    arr: function (a)
    {
        return contracts.classOf('Array')(a);
    },

    func: function (f)
    {
        return contracts.typeOf('function')(f);
    },

    num: function (n)
    {
        return contracts.typeOf('number')(n);
    },

    arrayOf: function (c)
    {
        return function (a)
        {
            return contracts.arr(a).map(c);
        }
    },

    funcArr: function (a)
    {
        return contracts.arrayOf(contracts.func)(a);
    },

    numArr: function (a)
    {
        return contracts.arrayOf(contracts.num)(a);
    },

    strArr: function (a)
    {
        return contracts.arrayOf(contracts.str)(a);
    },

    objArr: function (a)
    {
        return contracts.arrayOf(contracts.obj)(a);
    },

    arrArr: function (a)
    {
        return contracts.arrayOf(contracts.arr)(a);
    }
};

module.exports = contracts;