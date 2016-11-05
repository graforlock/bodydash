var combinators = {

    K: function (a)
    {
        return function ()
        {
            return a;
        }
    },

    S: function (a, b, c)
    {
        return a(c)(b(c))
    },

    I: function (a)
    {
        return a;
    }

};

module.exports = combinators;