var combinators = {

    K: function (a)
    {
        /* Kestrel */
        return function ()
        {
            return a;
        }
    },

    S: function (a, b, c)
    {
        /* Starling */
        return a(c)(b(c))
    },

    I: function (a)
    {
        /* Idiot Bird */
        return a;
    }

};

module.exports = combinators;