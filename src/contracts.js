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

    obj: function (o)
    {
        return utils.classOf('Object')(o);

    },
    arr: function (a)
    {
        return utils.classOf('Array')(a);
    },
    func: function (f)
    {
        return utils.typeOf('function')(f);
    },
    num: function (n)
    {
        return utils.typeOf('number')(n);
    },

    id: function (x)
    {
        return x;
    },

    isArr: function (a)
    {
        if ({}.toString.call(a) === '[object Array]')
            return a;
        else
            return false;
    },

    arrayOf: function (c)
    {
        return function (a)
        {
            return utils.arr(a).map(c);
        }
    },

    funcArr: function (a)
    {
        return utils.arrayOf(utils.func)(a);
    },

    numArr: function (a)
    {
        return utils.arrayOf(utils.num)(a);
    },

    strArr: function (a)
    {
        return utils.arrayOf(utils.str)(a);
    },

    objArr: function (a)
    {
        return utils.arrayOf(utils.obj)(a);
    },

    arrArr: function (a)
    {
        return utils.arrayOf(utils.arr)(a);
    }
};

module.exports = contracts;